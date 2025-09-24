import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Obtener todas las entradas del día actual
    const today = new Date().toISOString().split("T")[0];

    const { data: entries, error: entriesError } = await supabase
      .from("mate_entries")
      .select("*")
      .eq("fecha", today)
      .order("created_at", { ascending: true });

    if (entriesError) {
      console.error("Error fetching entries:", entriesError);
      return NextResponse.json(
        { error: "Error al obtener las entradas" },
        { status: 500 }
      );
    }

    // Obtener el ranking de usuarios
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("nombre, puntos")
      .order("puntos", { ascending: false });

    if (usersError) {
      console.error("Error fetching users:", usersError);
      return NextResponse.json(
        { error: "Error al obtener los usuarios" },
        { status: 500 }
      );
    }

    // Procesar los datos para el formato esperado por el frontend
    const listaDiaria: { [nombre: string]: string[] } = {};
    const ranking: { [nombre: string]: number } = {};

    // Inicializar el ranking con todos los usuarios
    users?.forEach((user) => {
      ranking[user.nombre] = user.puntos || 0;
    });

    // Procesar las entradas del día para crear la lista diaria
    entries?.forEach((entry) => {
      if (!listaDiaria[entry.nombre]) {
        listaDiaria[entry.nombre] = [];
      }
      if (!listaDiaria[entry.nombre].includes(entry.item)) {
        listaDiaria[entry.nombre].push(entry.item);
      }
    });

    return NextResponse.json({
      listaDiaria,
      ranking,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, item } = body;

    if (!nombre || !item) {
      return NextResponse.json(
        { error: "Nombre e item son requeridos" },
        { status: 400 }
      );
    }

    const today = new Date().toISOString().split("T")[0];

    // Verificar si ya existe esta combinación nombre-item para hoy
    const { data: existingEntry, error: checkError } = await supabase
      .from("mate_entries")
      .select("*")
      .eq("nombre", nombre)
      .eq("item", item)
      .eq("fecha", today)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows found
      console.error("Error checking existing entry:", checkError);
      return NextResponse.json(
        { error: "Error al verificar entrada existente" },
        { status: 500 }
      );
    }

    if (existingEntry) {
      return NextResponse.json(
        { error: "Ya agregaste este item hoy" },
        { status: 400 }
      );
    }

    // Crear la nueva entrada
    const { error: insertError } = await supabase.from("mate_entries").insert([
      {
        nombre,
        item,
        fecha: today,
      },
    ]);

    if (insertError) {
      console.error("Error inserting entry:", insertError);
      return NextResponse.json(
        { error: "Error al crear la entrada" },
        { status: 500 }
      );
    }

    // Actualizar el puntaje del usuario (upsert)
    const { error: upsertError } = await supabase
      .from("users")
      .upsert(
        {
          nombre,
          puntos: 1,
        },
        {
          onConflict: "nombre",
          ignoreDuplicates: false,
        }
      )
      .select();

    if (upsertError) {
      console.error("Error upserting user:", upsertError);
      // Incrementar puntos si el usuario ya existe
      const { error: updateError } = await supabase.rpc(
        "increment_user_points",
        {
          user_name: nombre,
        }
      );

      if (updateError) {
        console.error("Error incrementing points:", updateError);
        return NextResponse.json(
          { error: "Error al actualizar puntos" },
          { status: 500 }
        );
      }
    }

    // Obtener los datos actualizados
    return GET();
  } catch (error) {
    console.error("Unexpected error in POST:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

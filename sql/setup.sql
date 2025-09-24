-- sql/setup.sql
-- Script para configurar las tablas en Supabase

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    puntos INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabla de entradas de mate
CREATE TABLE IF NOT EXISTS mate_entries (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    item VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_mate_entries_fecha ON mate_entries(fecha);
CREATE INDEX IF NOT EXISTS idx_mate_entries_nombre ON mate_entries(nombre);
CREATE INDEX IF NOT EXISTS idx_mate_entries_nombre_item_fecha ON mate_entries(nombre, item, fecha);

-- Función para incrementar puntos de usuario
CREATE OR REPLACE FUNCTION increment_user_points(user_name TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE users 
    SET puntos = puntos + 1,
        updated_at = TIMEZONE('utc'::text, NOW())
    WHERE nombre = user_name;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar usuarios iniciales
INSERT INTO users (nombre, puntos) VALUES 
    ('Facundo', 0),
    ('Mateo', 0),
    ('Ana', 0),
    ('Axel', 0)
ON CONFLICT (nombre) DO NOTHING;

-- Habilitar RLS (Row Level Security) - opcional
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE mate_entries ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir acceso público (puedes ajustar según tus necesidades)
CREATE POLICY "Allow public read access on users" ON users
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on users" ON users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on users" ON users
    FOR UPDATE USING (true);

CREATE POLICY "Allow public read access on mate_entries" ON mate_entries
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on mate_entries" ON mate_entries
    FOR INSERT WITH CHECK (true);

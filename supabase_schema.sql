-- Script para crear la tabla de solicitudes de crédito
-- Ejecuta esto en el SQL Editor de tu proyecto Supabase

CREATE TABLE solicitudes_credito (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  cedula TEXT NOT NULL,
  telefono TEXT NOT NULL,
  monto NUMERIC NOT NULL,
  tipo_credito TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'Nuevo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de seguridad RLS (Row Level Security)
-- Permitir que usuarios anónimos inserten datos (útil para el formulario de leads)
ALTER TABLE solicitudes_credito ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserción de prospectos anónimos" 
  ON solicitudes_credito FOR INSERT 
  TO public 
  WITH CHECK (true);

-- Sólo los usuarios autenticados (admin) pueden leer los leads
CREATE POLICY "Permitir lectura sólo a administradores" 
  ON solicitudes_credito FOR SELECT 
  TO authenticated 
  USING (true);

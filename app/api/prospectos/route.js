import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request) {
  try {
    const body = await request.json();
    const { nombre, cedula, telefono, monto, tipo_credito } = body;

    // Validación básica
    if (!nombre || !cedula || !telefono || !monto || !tipo_credito) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios.' },
        { status: 400 }
      );
    }

    // Si no hay variables de entorno, simulamos éxito para desarrollo
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.log('Simulando inserción de lead (Faltan variables de entorno):', body);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      return NextResponse.json({ success: true, message: 'Lead simulado con éxito.' });
    }

    const { data, error } = await supabase
      .from('solicitudes_credito')
      .insert([
        {
          nombre,
          cedula,
          telefono,
          monto: parseFloat(monto),
          tipo_credito,
          estado: 'Nuevo'
        }
      ]);

    if (error) {
      console.error('Error de Supabase:', error);
      throw error;
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Error en API prospectos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al procesar la solicitud.' },
      { status: 500 }
    );
  }
}

import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    const { data, error } = await supabase
      .from('citas')
      .select(`
        id,
        pendiente,
        fecha,
        creacion,
        motif,
        paciente:usuarios!fk_paciente (
          id,
          nombre,
          apellido_p,
          apellido_m,
          user_id
        ),
        doctor:usuarios!fk_doctor (
          id,
          nombre,
          apellido_p,
          apellido_m,
          user_id
        ),
        supervisor:usuarios!fk_supervisor (
          id,
          nombre,
          apellido_p,
          apellido_m,
          user_id
        )
      `);
    if (data) {
      return NextResponse.json({
        ok: true,
        mensaje: "Conexión exitosa",
        data : data,
      });
    } else {
      return NextResponse.json({
        ok: true,
        mensaje: "Conexión exitosa",
        data : error,
      });
    } 
  }
  catch (error) {
    return NextResponse.json({
      ok: false,
      mensaje : error,
    })
  }
}
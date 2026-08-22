import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    const { data, error } = await supabase
      .from('consultas')
      .select(`
        id,
        callid,
        pendiente,
        creacion,
        telemedico:telemedicos!fk_telemedico (
          id,
          fk_user_id,
          creacion,
          usuario:usuarios!fk_user_id (
            id,
            nombre,
            apellido_p,
            apellido_m,
            user_id
          )
        ),
        paciente:pacientes!fk_paciente (
          id,
          fk_user_id,
          creacion,
          usuario:usuarios!fk_user_id (
            id,
            nombre,
            apellido_p,
            apellido_m,
            user_id
          )
        ),
        supervisor:supervisores!fk_supervisor (
          id,
          fk_user_id,
          creacion,
          usuario:usuarios!fk_user_id (
            id,
            nombre,
            apellido_p,
            apellido_m,
            user_id
          )
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
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
        telemedico:telemedicos!fk_consulta_telemedico (
          id,
          fk_telemedic_user_id,
          creacion,
          usuario:usuarios!fk_telemedic_user_id (
            id,
            nombre,
            apellido_p,
            apellido_m,
            uuid
          )
        ),
        paciente:pacientes!fk_consulta_paciente (
          id,
          fk_patient_user_id,
          creacion,
          usuario:usuarios!fk_patient_user_id (
            id,
            nombre,
            apellido_p,
            apellido_m,
            uuid
          )
        ),
        supervisor:supervisores!fk_consulta_supervisor (
          id,
          fk_supervisor_user_id,
          creacion,
          usuario:usuarios!fk_supervisor_user_id (
            id,
            nombre,
            apellido_p,
            apellido_m,
            uuid
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
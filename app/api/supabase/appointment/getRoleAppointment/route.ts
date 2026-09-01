import { supabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request : NextRequest,
){
  try {
    const searchParams = request.nextUrl.searchParams;
    const uuid = searchParams.get('uuid');

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
    `)
    .or(
      `fk_consulta_telemedico.eq.${uuid},` +
      `fk_consulta_paciente.eq.${uuid},` +
      `fk_consulta_supervisor.eq.${uuid}`
    );
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
import { supabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request : NextRequest, 
){
  try {
    const searchParams = request.nextUrl.searchParams;
    const user_id = searchParams.get('user_id');

    const { data, error } = await supabase
      .from('usuarios')
      .select(`
        *,
        supervisor:supervisores!fk_user_id (
          id,
          creacion
        ),
        telemedico:telemedicos!fk_user_id (
          id,
          creacion
        ),
        paciente:pacientes!fk_user_id (
          id,
          creacion
        )
      `)
      .eq('user_id', user_id)
      .single();
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
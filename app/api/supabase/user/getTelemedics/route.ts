import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    const { data, error } = await supabase
    .from('telemedicos')
    .select(`
      id,
      creacion,
      fk_telemedic_user_id,
      usuario:usuarios!fk_telemedic_user_id (
        id,
        nombre,
        apellido_p,
        apellido_m,
        uuid,
        creacion
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
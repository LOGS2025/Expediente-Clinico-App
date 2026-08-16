import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    //const { user_id } = params;

    const { data, error }= await supabase 
      .from('usuarios')
      .select('*')
       .eq('id', 2)
       .single()
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
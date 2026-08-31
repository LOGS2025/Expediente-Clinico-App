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
      .select(`*`)
      .eq('uuid', user_id)
      .single();

    if (error) {
      console.error(error);
    }
    if (data) {
      return NextResponse.json({
        ok: true,
        mensaje: "Conexión exitosa",
        data : data,
      });
    } else {
      return NextResponse.json({
        ok: true,
        mensaje: "Mensaje de error",
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
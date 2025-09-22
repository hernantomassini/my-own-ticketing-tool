import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { DBTableName } from "@/models/enum/db-table-name.model";

export async function GET() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from(DBTableName.Profile)
    .select("id, display_name");

  if (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to load users" }, { status: 500 });
  }

  const users = (data ?? []).map((x) => ({
    id: x.id,
    displayName: x.display_name,
  }));

  return NextResponse.json(users, { status: 200 });
}

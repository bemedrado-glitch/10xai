import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { buildVars, getSampleVars, renderCadenceEmail } from "@/lib/email-template";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as {
    subject?: string;
    body: string;
    lead_id?: string | null;
  };

  if (typeof body.body !== "string") {
    return NextResponse.json({ error: "body required" }, { status: 400 });
  }

  let vars = getSampleVars();
  let usingSample = true;

  if (body.lead_id) {
    const { data: lead } = await supabase
      .from("leads")
      .select("*")
      .eq("id", body.lead_id)
      .single();
    if (lead) {
      vars = buildVars(lead);
      usingSample = false;
    }
  }

  const rendered = renderCadenceEmail({
    subject: body.subject ?? "(no subject)",
    body: body.body,
    vars,
    unsubscribeMailto: "mailto:contato10xai@gmail.com?subject=Unsubscribe",
  });

  return NextResponse.json({
    ...rendered,
    using_sample_data: usingSample,
    sample_vars: usingSample ? vars : undefined,
  });
}

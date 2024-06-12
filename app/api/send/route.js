import EmailTemplate from "@/components/email/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["gpro0150@gmail.com"],
    subject: subject,
    react: EmailTemplate({ name, message }),
  });

  if (error) {
    console.log(error)
    return NextResponse.json({ status: 400 });
  }

  return NextResponse.json({
    status: 200,
    data: data,
  });
}

import mailchimp from "@mailchimp/mailchimp_marketing";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import https from "https";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
});

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const axiosInstance = axios.create({
  httpsAgent: agent,
});

export async function POST(request: Request) {
  const { email_address, merge_fields } = await request.json();

  if (!email_address)
    new Response(JSON.stringify({ error: "Email is required" }));

  try {
    const res = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address,
        merge_fields,
        status: "subscribed",
      }
    );

    return NextResponse.json({
      message: "User created successfully",
      res,
    });
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("Errorttt:", error);

    // Return appropriate error response
    return new Response(JSON.stringify(error));
  }
}

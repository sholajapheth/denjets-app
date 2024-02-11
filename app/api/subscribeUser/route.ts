import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const axiosInstance = axios.create({
  httpsAgent: agent,
});

export default async function POST(
  request: NextRequest,
  response: NextResponse
) {
  // console.log({ email_address });

  // if (!email_address) {
  //   return res.status(400).json({ error: "Email is required" });
  // }

  try {
    const { email_address, merge_fields } = await request.json();

    // Validate email_address
    if (!email_address) {
      return NextResponse.json(
        { message: "Please provide an email address" },
        { status: 400 }
      );
    }

    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const DATACENTER = process.env.MAILCHIMP_API_SERVER;
    const data = {
      email_address,
      merge_fields,
      status: "subscribed",
    };

    const response = await axiosInstance.post(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      data,
      {
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("dataaaa: ", response);

    // Return success response
    return NextResponse.json({
      message: "User created successfully",
      response,
    });
  } catch (error) {
    console.error("Errorttt:", error);

    // Return appropriate error response
    return new Response(JSON.stringify(error));
  }
}

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const axiosInstance = axios.create({
  httpsAgent: agent,
});

export async function POST(request: NextRequest, response: NextResponse) {
  console.log("calledjioucfd");

  const { email, merge_fields } = await request.json();

  console.log("e: ", email);

  // Validate email_address
  if (!email) {
    return NextResponse.json(
      { message: "Please provide an email address" },
      { status: 400 }
    );
  }

  try {
    const listId = process.env.LIST_ID;
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const payload = {
      email_address: email,
      merge_fields,
      status: "subscribed",
    };

    // Send request to Mailchimp
    const { data } = await axiosInstance.post(
      `https://us20.api.mailchimp.com/3.0/lists/${listId}/members`,
      payload,
      {
        headers: {
          Authorization: `Basic ${apiKey}`,
        },
      }
    );

    console.log("dataaaa: ", data);

    // Return success response
    return NextResponse.json({
      message: "User created successfully",
      response,
    });
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("Errorttt:", error.response.data);

    // Return appropriate error response
    return new NextResponse(JSON.stringify(error.response.data));
  }
}

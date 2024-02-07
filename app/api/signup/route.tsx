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
  try {
    const { email_address, merge_fields } = await request.json();

    // Validate email_address
    if (!email_address) {
      return NextResponse.json(
        { message: "Please provide an email address" },
        { status: 400 }
      );
    }

    const listId = process.env.LIST_ID;
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const payload = {
      email_address,
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

    console.log("dataaaa: ", response);

    // Return success response
    return NextResponse.json({
      message: "User created successfully",
      response,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Errorttt:", error);

    // Return appropriate error response
    return new Response(JSON.stringify(error));
  }
}

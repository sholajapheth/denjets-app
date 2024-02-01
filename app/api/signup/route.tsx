import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email_address, merge_fields } = await request.json();

    // Validate email_address
    if (!email_address) {
      return NextResponse.json(
        { message: "Please provide an email address" },
        { status: 400 }
      );
    }

    const listId = "7d5286fbea";
    const apiKey = "e8f9465d2429113f3fd099317f6a9d05-us20";
    const payload = {
      email_address,
      merge_fields,
      status: "subscribed",
    };

    // Send request to Mailchimp
    const { data } = await axios.post(
      `https://us20.api.mailchimp.com/3.0/lists/${listId}/members`,
      payload,
      {
        headers: {
          Authorization: `Basic ${apiKey}`,
        },
      }
    );

    // Return success response
    return NextResponse.json({ message: "User created successfully", data });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error:", error);

    // Return appropriate error response
    return NextResponse.json(
      "An error occurred while processing the request",
      {}
    );
  }
}

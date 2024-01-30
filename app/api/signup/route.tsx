import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email_address, merge_fields } = await request.json();
  const listId = "7d5286fbea";
  const apiKey = "e8f9465d2429113f3fd099317f6a9d05-us20";

  if (!email_address) {
    return NextResponse.error;
    // return {
    //   statusCode: 400,
    //   body: JSON.stringify({ message: "Please provide an email address" }),
    // };
  }

  try {
    const payload = {
      email_address,
      merge_fields,
      status: "subscribed",
    };

    const { data } = await axios.post(
      `https://us20.api.mailchimp.com/3.0/lists/${listId}/members`,
      payload,
      {
        headers: {
          Authorization: `Basic ${apiKey}`,
        },
      }
    );

    return NextResponse.json({ message: "User created successfully", data });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Error", error });
    // console.log(`Error: ${error?.response?.data.detail}`);
  }
}

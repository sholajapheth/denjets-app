import axios from "axios";

const handler = async (data: {
  email_address: string;
  merge_fields: {
    FNAME: string;
    LNAME: string;
  };
  context?: any;
  callback?: any;
}) => {
  const listId = "7d5286fbea";
  const apiKey = "e8f9465d2429113f3fd099317f6a9d05-us20";

  const { email_address, merge_fields } = data;
  console.log("body", data);

  if (!email_address) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Please provide an email address" }),
    };
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

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    // console.log(`Error: ${error?.response?.data.detail}`);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
export { handler };

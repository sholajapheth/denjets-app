"use client";
import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { handler } from "@/functions/add-suscriber";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  // const [isSignedUp, setIsSignedUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useRouter();

  const subscribeUser = async (values: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    // this is where your mailchimp request is made

    setLoading(true);

    try {
      console.log("val: ", values);

      const res = await axios.post("/api/signup", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert(res.data.detail ? res.data.detail : res?.data?.message);
      console.log("res: ", res.data.message);
      setLoading(false);
      nav.back();

      return res.data; // Optionally return data
    } catch (error) {
      // Handle errors here
      console.error("Error occurred:", error);
      setLoading(false);
      throw error; // Optionally rethrow the error
    }
  };

  const signUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too short")
      .max(20, "Too long!")
      .required("First Name is required"),
    lastName: Yup.string().min(3, "Too short").max(20, "Too long!"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
  });

  // const submitForm = async (values: {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  // }) => {
  //   const { firstName, lastName, email } = values;
  //   try {
  //     const payload = {
  //       merge_fields: {
  //         FNAME: firstName,
  //         LNAME: lastName,
  //       },
  //       email_address: email,
  //     };

  //     const registerUser = async () => {
  //       const env = process.env.NODE_ENV;
  //       const baseUrl =
  //         env == "development"
  //           ? process.env.NEXT_PUBLIC_BASE_URL
  //           : "https://denjets-app.vercel.app";
  //       const response = await fetch(`${baseUrl}/api/signup`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(payload),
  //       });
  //       return response.json();
  //     };

  //     const response = await registerUser();

  //     alert(response.message);
  //     // setIsSignedUp(true);
  //   } catch (error) {
  //     console.log("error: ", error);
  //     // alert("Email already subscribed!");
  //   }
  // };

  return (
    <div className="w-full h-screen text-black flex items-center justify-center relative">
      <div className="bg-white shadow-md w-[95%] md:w-[50%] lg:w-[40%] rounded-md p-6  md:p-8 bg-opacity-95 relative overflow-hidden">
        <div className="overlay">
          <Formik
            initialValues={{ firstName: "", lastName: "", email: "" }}
            validationSchema={signUpSchema}
            onSubmit={subscribeUser}
          >
            {(formik) => (
              <Form className="form">
                <div className="">
                  <Link href="/" passHref>
                    <Image
                      src={"/denjets.png"}
                      alt="Vercel Logo"
                      className=""
                      width={150}
                      height={24}
                      priority
                    />
                  </Link>

                  <h2 className="text-2xl font-bold text-white mb-4">
                    Lets get in touch
                  </h2>
                </div>
                <div className="bg-white w-full rounded-md p-4 my-4">
                  <div className="mb-4">
                    <Field
                      id="firstName"
                      placeholder="First Name"
                      name="firstName"
                      className="border-black border-2 w-full p-4 rounded-md"
                    />
                    <ErrorMessage
                      name="firstName"
                      className="text-red-500"
                      component="div"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      id="lastName"
                      placeholder="Last Name"
                      name="lastName"
                      className="border-black border-2 w-full p-4 rounded-md"
                    />
                    <ErrorMessage
                      name="lastName"
                      className="text-red-500"
                      component="div"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      id="email"
                      placeholder="Email"
                      name="email"
                      className="border-black border-2 w-full p-4 rounded-md"
                    />
                    <ErrorMessage
                      name="email"
                      className="text-red-500"
                      component="div"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 bg-green-600 w-full cursor-pointer hover:bg-green-500 hover:scale-x-95 rounded-md hover:bg-opacity-90 transition-all duration-300"
                  disabled={!formik.isValid || !formik.dirty || loading}
                >
                  {loading ? "working..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Page;

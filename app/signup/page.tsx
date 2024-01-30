"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { handler } from "@/functions/add-suscriber";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);

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

  const submitForm = async (values: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    // console.log(values);
    const { firstName, lastName, email } = values;
    try {
      const payload = {
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
        email_address: email,
      };

      const registerUser = async () => {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        return response;
      };

      const response = await registerUser();

      console.log(response);
      setIsSignedUp(true);
    } catch (error) {
      // console.log("error: ", error.message);
      alert("Email already subscribed!");
    }
  };

  return (
    <div className="w-full h-screen text-black flex items-center justify-center relative">
      <div className="bg-[url('../public/plane.png')] bg-opacity-20 bg-no-repeat  absolute -z-40 w-full h-screen"></div>
      <div className="bg-black w-[95%] md:w-[50%] lg:w-[40%] rounded-md p-6  md:p-8 bg-opacity-95 relative overflow-hidden">
        <div className="absolute h-[4em] w-[4em]  -top-[2em] -right-[2em] bg-green-500" />
        <div className="absolute h-[6em] w-[6em]  bottom-[4em] md:bottom-[5em] -left-[4em] md:-left-[3em] rounded-full bg-green-500 shadow-md" />
        <div className="overlay">
          <Formik
            initialValues={{ firstName: "", lastName: "", email: "" }}
            validationSchema={signUpSchema}
            onSubmit={submitForm}
          >
            {(formik) => (
              <Form className="form">
                <div className="">
                  <Link href="/" passHref>
                    <Image
                      src={"/denjets.png"}
                      alt="Vercel Logo"
                      className="dark:invert"
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
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Sign Up
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

"use client"; // Ensure this component runs on the client side
import React, { useState } from "react";
import Section from "../../components/Layout";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "../public/assets/feedbak.com.svg";
import SideLayout from "@/components/SideLayout";
import useFeedback from "@/hooks/useFeedback";
import Spinner from "@/components/Loader";
import Profile from "@/components/Profile";
import * as yup from "yup";

const Feedback = () => {
  const [feedback, setFeedback] = useState<string>();
  const { loading, handleSubmitFeedback } = useFeedback();
  const [errors, setErrors] = useState<Record<string, string>>({});
  console.log(errors.feedback);


  const getValidationSchema = () => {
    const baseSchema = {
      feedback: yup
        .string()
        .required("Feedback is required") // Ensures the field is not empty.
        .trim("Feedback cannot consist of only whitespace") // Removes leading/trailing whitespace.
        .strict() // Enforces the `trim` rule strictly.
        .min(10, "Feedback must be at least 10 characters long") // Prevents extremely short feedback.
        .max(500, "Feedback cannot exceed 500 characters") // Limits overly long feedback.
        .matches(/^[a-zA-Z0-9\s.,!?()-]+$/, "Feedback contains invalid characters") // Ensures only valid characters.
    };

    return yup.object().shape(baseSchema);
  };

  const validateForm = async () => {
    const schema = getValidationSchema();
    try {
      await schema.validate({ feedback }, { abortEarly: false }); // Ensures all errors are captured.
      setErrors({});
      return true;
    } catch (validationErrors) {
      console.log(validationErrors); // Log to inspect the error structure
      const newErrors: Record<string, string> = {};
      // Ensure validationErrors.inner exists and contains errors.
      if ((validationErrors as yup.ValidationError).inner) {
        (validationErrors as yup.ValidationError).inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
      }
      setErrors(newErrors);
      return false;
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      await handleSubmitFeedback(feedback || "");
      setFeedback("")
    }


  }



  return (
    <SideLayout>

      <Profile onSelectForm={undefined} />
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
        <Section
            heading="Feedback"
            classnames="flex-col justify-start items-center w-[65%] h-[35vh]"
          >
            <div className="">
              <div className="col-span-2 z-50">
                <form
                  onSubmit={handleSubmit}
                >
                  <div className={`max-w-full  mr-10 ml-10`}>
                    <label
                      htmlFor="phone-input"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only"
                    >
                      Phone Number
                    </label>
                    <div className="flex-1 mb-10">
                      <textarea
                        id="phone"
                        rows={3}
                        className="block w-full p-4 text-sm font-medium text-black border border-gray-300 rounded-lg bg-gray-100 placeholder-gray-400"
                        placeholder={
                          "We’d love to hear your feedback! Help us make the app even better by sharing your thoughts..."
                        }
                        // required
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      {errors.feedback && (
                        <p className="text-red-500 text-sm mt-1 fixed">{errors.feedback}</p>
                      )}

                    </div>
                  </div>
                  <div className="px-10 max-w-sm mb-1">
                    <Button
                      text={loading ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Submitting...</div> : "Submit"}
                      classnames="bg-green-500 hover:bg-green-600 py-3 px-8"
                      type="submit"
                      disabled={loading}
                    />
                  </div>
                </form>
              </div>
              <div className=" w-full ml-8">
                <div className="col-span-3 flex justify-end items-end z-0">
                  <Image
                    src={Hero}
                    alt="Check In & Check Out"
                    className=" w-[25%]  -mt-24 ml-10"
                  />
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </SideLayout>
  );
};

export default Feedback;
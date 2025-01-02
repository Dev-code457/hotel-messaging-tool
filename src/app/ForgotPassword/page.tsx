"use client";
import React, { useState } from "react";
import Section from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "@/app/public/assets/forgot password.svg";
import SideLayout from "@/components/SideLayout";
import useForgotPassword from "@/hooks/useForgotpassword"; 
import Spinner from "@/components/Loader";
import * as yup from "yup";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword, loading } = useForgotPassword();

  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
    const getValidationSchema = () => {
      const baseSchema = {
        email: yup.string().email("Invalid email format").required("Email is required"),

      };
  
      return yup.object().shape(baseSchema);
    };
  
  
  
  const validateForm = async () => {
    const schema = getValidationSchema();
    try {
      await schema.validate(
        { email },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors: Record<string, string> = {};
      (validationErrors as yup.ValidationError).inner.forEach((error) => {
        if (error.path) {
          newErrors[error.path] = error.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  };
  
  
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault(); // Prevent default form submission
  
      const isValid = await validateForm();
      if (isValid) {
        await forgotPassword(email);
        setEmail("");
      }
    };
  

  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <Section
            heading="Forgot Password"
            classnames="flex-col justify-start items-center w-[65%] h-[35vh] space-x-6"
          >
            <div className="grid grid-cols-2 gap-4 mb-10 z-20">
              <div className="col-span-1">
                <form onSubmit={handleSubmit}>
                  <div className="flex-1 mb-6">
                  <Input
                    value={email}
                    required
                    placeHolder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                  {
                    errors.email && (
                      <p className="text-red-500 text-sm mt-1 fixed">{errors.email}</p>
                    )
                  }
                  </div>
                  <div className="flex justify-start pt-6">
                    <Button
                      text={loading ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Submitting...</div> : "Submit"}
                      classnames={`py-4 px-8 bg-green-500 hover:bg-green-600 `}
                      type="submit"
                      disabled={loading} // Disable button during loading
                    />
                  </div>
                </form>
              </div>
              <div className="col-span-1 w-full">
                <div className="flex justify-end items-end absolute">
                  <Image
                    src={Hero}
                    alt="Forgot Password"
                    className="w-[90%] pt-8"
                  />
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </SideLayout>
  );
}

export default ChangePassword;
"use client"
import React, { useState } from "react";
import Hero from "../public/assets/PromotionalMessage.svg";
import Image from "next/image";
import Section from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SideLayout from "@/components/SideLayout";
import useAddNumber from "@/hooks/useAddNumber";
import Spinner from "@/components/Loader";
import Papa from "papaparse";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import Switcher11 from "@/components/Switch";
import { ProfileInfoPopover } from "@/components/Preview";
import Profile from "@/components/Profile";
import * as yup from "yup";

function PromotionalNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const { handleSubmitFeedback, loading, handleSubmitCsvFeedback, bulkLoading } = useAddNumber();
  const [csvData, setCsvData] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({
    phoneNumber: "",
    email: "",
    name: "",
    csvData: "",
  });



  const getValidationSchema = (email: string, name: string) => {
    const schema: Partial<{
      phoneNumber: yup.StringSchema<string>;
      email: yup.StringSchema<string | undefined>;
      name: yup.StringSchema<string | undefined>;
    }> = {
      phoneNumber: yup
        .string()
        .required("Phone Number is required")
        .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
    };
  
    // Only add email validation if there's an email value
    if (email.trim()) {
      schema.email = yup
        .string()
        .email("Invalid email format")
        .required("Email is required");
    }
  
    // Only add name validation if there's a name value
    if (name.trim()) {
      schema.name = yup
        .string()
        .min(2, "Name must be at least 2 characters")
        .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
        .defined();
    }
  
    return yup.object().shape(schema);
  };
  



  const getCsvRowSchema = (row: { email?: string; name?: string; phoneNumber: string }) => {
    // Define schema as a mutable object with string keys and Yup schemas as values
    const schema: Record<string, yup.AnySchema> = {
      phoneNumber: yup
        .string()
        .required("Phone Number is required")
        .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
    };
  
    if (row.email?.trim()) {
      schema.email = yup
        .string()
        .email("Invalid email format")
        .nullable()
        .default(null); // Allows null for optional email
    }
  
    if (row.name?.trim()) {
      schema.name = yup
        .string()
        .min(2, "Name must be at least 2 characters")
        .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces");
    }
  
    return yup.object().shape(schema);
  };
  

  const validateSingleEntry = async () => {
    try {
      const schema = getValidationSchema(email, name);
      await schema.validate(
        { phoneNumber, email, name },
        { abortEarly: false }
      );
      setErrors({ phoneNumber: "", email: "", name: "", csvData: "" });
      return true;
    } catch (validationErrors) {
      const newErrors: { [key: string]: string } = {
        phoneNumber: "",
        email: "",
        name: "",
        csvData: "",
      };

      (validationErrors as yup.ValidationError).inner.forEach((error) => {
        if (error.path) {
          newErrors[error.path] = error.message;
        }
      });

      setErrors({
        phoneNumber: newErrors.phoneNumber || "",
        email: newErrors.email || "",
        name: newErrors.name || "",
        csvData: newErrors.csvData || ""
      });
      return false;
    }
  };

  const validateCSVData = async (data: any[]) => {
    try {
      const validationPromises = data.map((row) => {
        const schema = getCsvRowSchema(row);
        return schema.validate(row, { abortEarly: false });
      });

      await Promise.all(validationPromises);
      setErrors({ phoneNumber: "", email: "", name: "", csvData: "" });
      return true;
    } catch (error) {
      setErrors({
        ...errors,
        csvData: "Invalid data in CSV file. Please check phone numbers and any provided emails/names."
      });
      return false;
    }
  };

  // Rest of the component remains the same...
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateSingleEntry();
    if (isValid) {
      const success = await handleSubmitFeedback(phoneNumber, email, name);
      if (success) {
        setPhoneNumber("");
        setEmail("");
        setName("");
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      parseCSV(file);
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      complete: async (result) => {
        const formattedData = result.data.map((row: any) => ({
          phoneNumber: row["phoneNumber"],
          email: row["email"],
          name: row["name"],
        }));
        setCsvData(formattedData);
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const handleCSVUpload2 = async () => {
    const isValid = await validateCSVData(csvData);
    if (isValid) {
      await handleSubmitCsvFeedback(csvData);
    }
  };

  const handleCSVUpload = async () => {
    if (csvData.length === 0) {
      setErrors({ ...errors, csvData: "Please upload a CSV file first" });
      return;
    }
    const isValid = await validateCSVData(csvData);
    if (isValid) {
      setShowTable(true);
      setErrors({ ...errors, csvData: "" });
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setErrors({ phoneNumber: "", email: "", name: "", csvData: "" });
  };

  return (
    <SideLayout>
      <Profile onSelectForm={undefined} />
      <div className="sm:ml-64 flex justify-center items-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          {isChecked && (
            <div className="flex justify-center items-center top-0 right-0 w-full -mt-20 mb-6">
              <ProfileInfoPopover />
            </div>
          )}

          <div className="flex justify-center items-center -mt-10 w-full mb-10">
            <Switcher11 handleCheckboxChange={handleCheckboxChange} isChecked={isChecked} />
          </div>

          {!isChecked ? (
            <Section heading="Add Promotional Number" classnames="flex-col w-[70%] h-[30vh]">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex justify-center">
                  <div className="flex flex-col w-full p-2">
                    <div className="flex items-center space-x-4 w-full">
                      <div className="flex-1">
                        <Input
                          placeHolder="Enter Number"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          type="tel"
                        />
                        {errors.phoneNumber && (
                          <p className="text-red-500 text-sm mt-1 fixed">{errors.phoneNumber}</p>
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          placeHolder="Enter Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1 fixed">{errors.name}</p>
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          placeHolder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1 fixed">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 max-w-sm mt-4">
                  <Button
                    text={loading ? <div className="flex gap-2 font-bold justify-center items-center"><Spinner /> Submitting...</div> : "Submit"}
                    classnames="py-4 px-8 bg-green-500 hover:bg-green-600 mt-8"
                    type="submit"
                    disabled={loading}
                  />
                </div>
              </form>
              <div className="col-span-2 flex justify-end">
                <Image
                  src={Hero}
                  alt="Promotional Message"
                  className="w-[20%] h-[70%] -mt-24 -mb-8"
                />
              </div>
            </Section>
          ) : (
            <>
              <Section heading="Add Promotional Number" classnames="flex-col w-[70%] h-[30vh]">
                <div className="flex items-center justify-center w-auto">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-black dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-black dark:text-gray-400">CSV (MAX. 2MB)</p>
                      {fileName && <p className="text-xs text-green-500 mt-2">Selected file: {fileName}</p>}
                      {errors.csvData && (
                        <p className="text-red-500 text-sm mt-2">{errors.csvData}</p>
                      )}
                    </div>
                    <input id="dropzone-file" type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
                <div className="px-6 max-w-sm mt-4 justify-end">
                  <Button
                    text={loading ? <div className="flex gap-2 font-bold justify-center items-center"><Spinner /> Uploading...</div> : "Upload"}
                    classnames="py-4 px-8 bg-blue-500 hover:bg-blue-600 mb-10"
                    type="button"
                    onClick={handleCSVUpload}
                    disabled={loading}
                  />
                </div>
              </Section>
            </>
          )}

          {showTable && (
            <div className="w-full flex justify-center items-center">
              <Modal title="CSV Data" onClose={() => setShowTable(false)} onSubmit={handleCSVUpload2} loading={bulkLoading}>
                <Table csvData={csvData} />
              </Modal>
            </div>
          )}
        </div>
      </div>
    </SideLayout>
  );
}

export default PromotionalNumber;
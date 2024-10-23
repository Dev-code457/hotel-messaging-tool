"use client";
import React, { useState } from "react";
import Hero from "../public/assets/PromotionalMessage.svg";
import Image from "next/image";
import Section from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SideLayout from "@/components/SideLayout";
import useAddNumber from "@/hooks/useAddNumber";
import Spinner from "@/components/Loader";
import Papa from "papaparse"
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import Switcher11 from "@/components/Switch";

function PromotionalNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState<string | null>(null); // Add state for file name
  const { handleSubmitFeedback, loading } = useAddNumber();
  const [csvData, setCsvData] = useState<any[]>([]); // Store CSV data
  const [showTable, setShowTable] = useState(false); // Control modal visibility
  const [isChecked, setIsChecked] = useState(false)
  console.log(csvData, "jknasjfnlsad");


  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault(); // Prevent default form submission
    // const success = await handleSubmitFeedback(phoneNumber, email, name);
    // if (success) {
    //   // Optionally clear the inputs if submission was successful
    //   setPhoneNumber("");
    //   setEmail("");
    //   setName("");
    // }

    e.preventDefault()
    setShowTable(true)
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name); // Set the file name
      parseCSV(file); // Parse the CSV file
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data); // Store parsed CSV data
      },
      header: true, // Assuming your CSV has headers
      skipEmptyLines: true,
    });
  };



  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }


  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center items-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
<div className="flex justify-center items-center  -mt-10 w-full mb-10">
          <Switcher11 handleCheckboxChange={handleCheckboxChange} isChecked={isChecked} setIsChecked={setIsChecked} />
          </div>

          {
            !isChecked ? (
              <Section heading="Add Promotional Number" classnames="flex-col w-[70%] h-[40vh]">
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="flex justify-center">
                    <div className="flex items-center space-x-4 w-full p-2">
                      <Input
                        placeHolder="Enter Number"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type="number" // Use 'tel' for phone number
                      />
                      <Input
                        placeHolder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"

                      />
                      <Input
                        placeHolder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"

                      />
                    </div>
                  </div>
                  <div className="px-6 max-w-sm mt-4">
                    <Button
                      text={loading ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Submitting...</div> : "Submit"}
                      classnames={`py-4 px-8 bg-green-500 hover:bg-green-600`}
                      type="submit"
                      disabled={loading}
                    />
                  </div>
                </form>
                <div className="col-span-2 flex justify-end">
                  <Image
                    src={Hero}
                    alt="Promotional Message"
                    className="w-[30%] h-[100%] -mt-24 -mb-8"
                  />
                </div>
              </Section>) : (

              <Section heading="Add Promotional Number" classnames="flex w-[70%] h-[40vh] flex justify-center items-end">
                <div className="flex items-center justify-center w-auto">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[30vh] rounded-lg cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-black dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-black dark:text-gray-400">CSV (MAX. 800x400px)</p>
                      {fileName && <p className="text-xs text-green-500 mt-2">Selected file: {fileName}</p>}
                    </div>
                    <input id="dropzone-file" type="file" accept=".csv, .xls , .xlsx" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
                <div className="px-6 max-w-sm -mt-10 right-0 absolute">
                  <Button
                    text={loading ? <div className={"flex gap-2 font-bold justify-center items-center"}><Spinner /> Submitting...</div> : "Upload"}
                    classnames={`py-4 px-8 bg-blue-500 hover:bg-blue-600`}
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                  />
                </div>
              </Section>
            )

          }






          {/* Modal for showing table */}
          {showTable && (
            <div className="w-full flex justify-center items-center">
              <Modal title="CSV Data" onClose={() => setShowTable(false)}>
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

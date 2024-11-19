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
import Papa from "papaparse";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import Switcher11 from "@/components/Switch";
import { ProfileInfoPopover } from "@/components/Preview";
import Profile from "@/components/Profile"

function PromotionalNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const { resetBulkErrors, bulkErrors, handleSubmitFeedback, loading, handleSubmitCsvFeedback, bulkLoading } = useAddNumber();
  const [csvData, setCsvData] = useState<any[]>([]);



  const [showTable, setShowTable] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmitFeedback(phoneNumber, email, name);
    if (success) {
      setPhoneNumber("");
      setEmail("");
      setName("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      parseCSV(file);
    }
  };
  const parseCSV = (file: File) => {
    Papa.parse(file, {
      complete: (result) => {
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

    await handleSubmitCsvFeedback(csvData);


  };
  const handleCSVUpload = async () => {

    setShowTable(true)

  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SideLayout>
      <Profile onSelectForm={undefined} />

      <div className="sm:ml-64 flex justify-center items-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          {/* {isChecked && (
            <div className="flex justify-center items-center top-0 right-0 w-full  mb-6">
              <ProfileInfoPopover />
            </div>
          )} */}

          <div className="flex justify-center items-center -mt-10 w-full mb-10">
            <Switcher11 handleCheckboxChange={handleCheckboxChange} isChecked={isChecked} />
          </div>

          {!isChecked ? (
            <Section heading="Add Promotional Number" classnames="flex-col w-[70%] h-[35vh]">
              <form onSubmit={handleSubmit} className="w-full ">
                <div className="flex justify-center">
                  <div className="flex items-center space-x-4 w-full p-2">
                    <Input
                      placeHolder="Enter Number"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      type="tel"
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
                    text={loading ? <div className="flex gap-2 font-bold justify-center items-center"><Spinner /> Please Wait...</div> : "Add user"}
                    classnames="py-4 px-8 bg-green-500 hover:bg-green-600"
                    type="submit"
                    disabled={loading}
                  />
                </div>
              </form>
              <div className="col-span-2 flex justify-end">
                <Image
                  src={Hero}
                  alt="Promotional Message"
                  className="w-[25%] h-[100%] -mt-24 -mb-8"
                />
              </div>
            </Section>
          ) : (
            <>
              <Section heading="Add Promotional Number" classnames="flex w-[70%] h-[35vh] justify-center items-end">
                <div className="flex items-center justify-center w-auto">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[30vh] rounded-lg cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-black dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-black dark:text-gray-400">CSV (MAX. 2MB)</p>
                      {fileName && <p className="text-xs text-green-500 mt-2">Selected file: {fileName}</p>}
                    </div>
                    <input id="dropzone-file" type="file" accept=".csv, .xls, .xlsx" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
                <div className="px-6 max-w-sm -mt-10 right-0 absolute">
                  <Button
                    text={loading ? <div className="flex gap-2 font-bold justify-center items-center"><Spinner /> Uploading...</div> : "Preview"}
                    classnames="py-4 px-8 bg-blue-500 hover:bg-blue-600"
                    type="button"
                    onClick={handleCSVUpload}
                    disabled={loading}
                  />
                </div>
              </Section>
              <div className="fixed">
                {bulkErrors.length > 0 && (
                  <div className="mt-6 w-full max-w-md mx-auto p-6">
                    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md relative">
                      <strong className="font-bold">Error Details:</strong>
                      <p className="mt-1">We encountered {bulkErrors.length} errors during the upload:</p>
                      <button
                        onClick={() => resetBulkErrors()}
                        className="absolute top-2 right-2 text-red-600 hover:text-red-800 focus:outline-none"
                      >
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <ul className="mt-3 bg-white border border-gray-200 rounded-lg shadow p-4 max-h-48 overflow-y-auto">
                      {bulkErrors.map((error, index) => (
                        <li
                          key={index}
                          className="text-sm text-red-600 flex items-start mb-2 last:mb-0"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14m0-14.14L4.93 19.07"
                            />
                          </svg>
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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

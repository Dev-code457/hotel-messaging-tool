import React, { useState } from "react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import Preview from "@/app/public/assets/Preview2.png";
import Image from "next/image";

export function ProfileInfoPopover() {
    const [openPopover, setOpenPopover] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };

    const handleImageClick = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            {/* Warning and Popover */}
            <Popover open={openPopover} handler={setOpenPopover}>


                <PopoverHandler {...triggers}>
                    <Button
                        size="sm"
                        className=" bg-gray-50 hover:shadow-none shadow-none transition-all" ripple={false}
                        aria-label="Information about required CSV format"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                        <div className="p-4 text-sm text-black bg-yellow-50 border-l-8 border-yellow-500 rounded-md shadow-md transition-all">
                            <p>Hover TO Check</p>

                            <p className="font-medium">
                                Please upload the CSV file in the following format:
                                <span className="text-red-500">
                                    {" "} SNo, email, phoneNumber, name

                                </span>
                                {" "}
                                <span className=" text-gray-600">
                                    Any other format will cause the upload process to be rejected.
                                </span>
                            </p>

                        </div>
                    </Button>
                </PopoverHandler>

                {/* Popover Content */}
                <PopoverContent className="z-[999] w-[100%] md:w-[40%] p-4 bg-white shadow-lg rounded-md transition-all"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <div className="flex justify-center items-center">
                        <Image
                            src={Preview}
                            alt="CSV Format Preview"
                            className="cursor-pointer rounded-lg object-cover hover:shadow-lg transition-all"
                            onClick={handleImageClick}
                        />
                    </div>
                </PopoverContent>
            </Popover>

            {/* Modal for Enlarged Image */}
            <Dialog open={openModal} handler={closeModal} size="lg" className="rounded-lg "  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <DialogBody className="p-0 "  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Image
                        src={Preview}
                        alt="CSV Format Preview"
                        className="h-full w-full rounded-lg object-cover"
                    />
                </DialogBody>
            </Dialog>
        </>
    );
}
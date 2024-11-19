import React from "react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Typography,
} from "@material-tailwind/react";

export function ProfileInfoPopover() {
    const [openPopover, setOpenPopover] = React.useState<boolean>(false);

    // Event handlers for mouse events
    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };

    return (
        <Popover open={openPopover} handler={setOpenPopover}>
            <PopoverHandler {...triggers}>
                <Button
                    size="sm"
                    className="px-0 py-0 rotate-90 bg-gray-50 shadow-none hover:shadow-none hover:ring-white"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} ripple={undefined}                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6 text-green-700 font-bold"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                        />
                    </svg>
                </Button>
            </PopoverHandler>

            <PopoverContent
                 placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} className="z-50 max-w-[15rem]"
                {...triggers} // Spread event handlers here
            >
                <Typography variant="small" color="black" className="text-black font-bold"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                This message will be sent to a random set of customers, based on the number you choose
                </Typography>
            </PopoverContent>
        </Popover>
    );
}

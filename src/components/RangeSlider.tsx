import React, { useState } from "react";

// Add a prop type definition
interface RangeSliderProps {
  onValueChange: (value: number) => void;
  value: number // Define a callback type for value changes
}

const RangeSlider: React.FC<RangeSliderProps> = ({ onValueChange, value }) => {


  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    let adjustedValue;

    if (newValue < 200) {
      adjustedValue = newValue - (newValue % 10);
    } else {
      adjustedValue = newValue - (newValue % 20);
    }


    onValueChange(adjustedValue);
  };

  return (
    <div className="relative flex w-full items-center justify-center space-x-4">
      {/* Vertical label */}
      <div className="flex  items-center -rotate-90 space-x-2 absolute mr-5">
        <span className="text-center text-sm font-semibold text-black">
          Number
        </span>
        <span className="text-center text-sm font-semibold text-black">of</span>
        <span className="text-center text-sm font-semibold text-black">
          recipients
        </span>
      </div>

      {/* Slider and value display */}
      <div className="flex flex-col items-center space-y-4">
        <div
          className="text-center rounded-full text-lg font-bold text-green-600"
          style={{
            minWidth: "80px",
          }}
        >
          {value}
        </div>

        <input
          id="vertical-range-input"
          type="range"
          value={value}
          min="0"
          max="500"
          step="1"
          onChange={handleSliderChange}
          className="w-4 h-full bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none"
          style={{
            // writingMode: "bt-lr",
            WebkitAppearance: "slider-vertical",
            background: "lightgreen",
            height: "300px", // Adjusted for better vertical height
          }}
        />
      </div>
    </div>
  );
};

export default RangeSlider;

const Switcher11 = ({
  isChecked,
  handleCheckboxChange
}: {
  isChecked: boolean;
  handleCheckboxChange: () => void;
}) => {
  return (
    <label className="themeSwitcherTwo w-[60%] justify-between shadow-card relative inline-flex cursor-pointer select-none items-center rounded-md p-1 m-6">
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span
        className={`flex items-center space-x-[6px] py-2 px-[18px] text-lg font-medium ml-16 ${!isChecked ? 'text-blue-700 border-b-2 border-b-blue-700' : 'text-green-600'
          }`}
      >
        Add Number Manually
      </span>
      <span
        className={`flex items-center space-x-[6px] py-2 px-[18px] text-lg font-medium mr-16 ${isChecked ? 'text-blue-700 border-b-2 border-b-blue-700' : 'text-green-600'
          }`}
      >
        Upload CSV File
      </span>
    </label>
  );
};

export default Switcher11;

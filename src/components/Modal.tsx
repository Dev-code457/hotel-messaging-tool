import React from "react";
import Button from "./Button";

interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    onSubmit: () => void;
    loading: boolean
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, onSubmit, loading }) => {
    return (
        <div className="sm:ml-64 fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50 overflow-y-visible">
            <div className="bg-gray-50 rounded-lg shadow-lg w-[80%] ">
                <div className="flex justify-between items-center px-4 py-2 border-b border-black">
                    <div>  <h3 className="text-lg font-semibold text-black">{title}</h3></div>
                    <div className="">
                        <Button
                            text={loading ? "...saving" : "Upload"}
                            classnames={`bg-green-500 hover:bg-green-600 rounded-lg mr-6`}
                            type="submit"
                            disabled={loading}
                            onClick={onSubmit}

                        />
                        <button
                            onClick={onClose}
                            className="text-black hover:text-gray-600 transition-colors duration-300"
                        >
                            ✕
                        </button>
                    </div>
                </div>
                <div className="p-4">{children}</div>
            </div>

        </div>
    );
};

export default Modal;

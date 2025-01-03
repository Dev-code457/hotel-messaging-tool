import React from 'react';

interface ErrorSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  invalidPhones: string[];
  invalidEmails: string[];
  existingNumbers: string[];
  successCount: number;
}

const ErrorSummary = ({ 
  isOpen, 
  onClose, 
  invalidPhones, 
  invalidEmails, 
  existingNumbers,
  successCount 
}: ErrorSummaryProps) => {
  if (!isOpen) return null;

  const hasErrors = invalidPhones.length > 0 || invalidEmails.length > 0 || existingNumbers.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 relative">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upload Summary</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Success Message */}
          {successCount > 0 && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-green-800 font-medium">Success</div>
              <div className="text-green-700">
                Successfully added {successCount} customer{successCount !== 1 ? 's' : ''}.
              </div>
            </div>
          )}

          {/* Error Summary */}
          {hasErrors && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-red-800 font-medium">Upload Completed with Errors</div>
              <div className="text-red-700">
                Please review the following issues:
              </div>
            </div>
          )}

          {/* Scrollable Content */}
          <div className="max-h-[400px] overflow-y-auto border rounded-lg p-4">
            {/* Invalid Phone Numbers */}
            {invalidPhones.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-red-600">
                  Invalid Phone Numbers ({invalidPhones.length})
                </h3>
                <div className="space-y-2">
                  {invalidPhones.map((error, index) => (
                    <div 
                      key={index}
                      className="p-2 bg-red-50 rounded text-sm text-red-700"
                    >
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Invalid Emails */}
            {invalidEmails.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-yellow-600">
                  Invalid Emails ({invalidEmails.length})
                </h3>
                <div className="space-y-2">
                  {invalidEmails.map((error, index) => (
                    <div 
                      key={index}
                      className="p-2 bg-yellow-50 rounded text-sm text-yellow-700"
                    >
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Existing Numbers */}
            {existingNumbers.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-blue-600">
                  Duplicate Entries ({existingNumbers.length})
                </h3>
                <div className="space-y-2">
                  {existingNumbers.map((error, index) => (
                    <div 
                      key={index}
                      className="p-2 bg-blue-50 rounded text-sm text-blue-700"
                    >
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorSummary;
import { ExclamationIcon } from "@heroicons/react/outline";
import { useContext, useState } from "react";
import ToastContext from "contexts/ToastContext";
import Button from "components/Button";
import { Link } from "react-router-dom";

const DeleteAccount = () => {
  const { showToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      // Perform account deletion logic
      showToast("Account deleted successfully", "success");
      // Redirect to home or login page
    } catch (error) {
      console.error("Failed to delete account", error);
      showToast("Failed to delete account", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-center h-full">
      <div className="p-6 bg-white shadow-md rounded-lg w-96">
        <div className="flex items-center justify-center">
          <ExclamationIcon className="h-10 w-10 text-yellow-500" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800 text-center">
          Delete Account
        </h2>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <Button
            onClick={handleDeleteAccount}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Account"}
          </Button>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;

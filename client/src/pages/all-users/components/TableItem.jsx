import React, { useState, useEffect } from "react";

const TableItem = ({
  user,
  onSendFriendRequest,
  onCancelFriendRequest,
  friendshipStatus,
}) => {
  const { _id, username } = user;
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    setIsFriendRequestSent(friendshipStatus === "pending");
  }, [friendshipStatus]);

  const handleButtonClick = async () => {
    try {
      if (isFriendRequestSent) {
        await onCancelFriendRequest(_id);
      } else {
        await onSendFriendRequest(_id);
      }
      setIsFriendRequestSent(!isFriendRequestSent);
    } catch (error) {
      console.error("Error handling friend request:", error);
      setError("Something went wrong. Please try again."); 
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {username ?? "Anonim"}
            </th>
            <td className="px-6 py-4 text-right">
              <button
                type="button"
                onClick={handleButtonClick}
                className={`focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 transition ${
                  isFriendRequestSent
                    ? "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    : "bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                }`}
              >
                {isFriendRequestSent ? "Cancel Request" : "Add to Friends"}
              </button>
              {error && (
                <div className="text-red-500 mt-2 text-sm">{error}</div> // Display error message
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableItem;

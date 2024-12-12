import React from 'react';

const FriendCard = () => {
  return (
    <div className="relative overflow-x-auto px-10 py-10">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td className="px-6 py-4 text-right">
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 transition dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Delete from Friends
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FriendCard;

import axios from 'axios';
import React, { useState } from 'react'

const RequestCard = (request) => {
    const [requestStatus, setRequestStatus] = useState('');

    const handleAcceptRequest = async () => {
      try {
        const data = await axios.patch(
        `${BASE_URL}/friendship/${requestId}/accept`, {}, { withCredentials: true });
        setRequestStatus('Accepted');
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleRejectRequest = async () => {
      try {
        const data = await axios.patch(`${BASE_URL}/friendship/${requestId}/reject`, {}, { withCredentials: true });
        setRequestStatus('Rejected');
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
  
  return (
    <tr className="bg-white dark:bg-gray-800">
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      {request.sender.username}
    </th>
    <td className="px-2 py-4 text-right">
      <button
        type="button"
        className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={handleAcceptRequest}
        disabled={acceptMutation.isLoading && loadingRequestId === request._id}
      >
        {acceptMutation.isLoading && loadingRequestId === request._id
          ? "Sending..."
          : "Add as Friend"}
      </button>

      <button
        type="button"
        className="ml-4 focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 transition dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={handleRejectRequest}
        disabled={rejectMutation.isLoading && loadingRequestId === request._id}
      >
        {rejectMutation.isLoading && loadingRequestId === request._id
          ? "Sending..."
          : "Ignore"}
      </button>
    </td>
  </tr>
  )
}

export default RequestCard

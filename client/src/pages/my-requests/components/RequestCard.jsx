import { BASE_URL } from '@/constants';
import axios from 'axios';
import React, { useState } from 'react';


const RequestCard = ({ request, onRequestAccepted, onRequestRejected }) => {
  const [loadingRequestId, setLoadingRequestId] = useState(null);

  const handleAcceptRequest = async (requestId) => {
    try {
      setLoadingRequestId(requestId);
      const response = await axios.patch(
        `${BASE_URL}/friendship/${requestId}/accept`, 
        {}, 
        { withCredentials: true }
      );
      onRequestAccepted(requestId); 
      setLoadingRequestId(null);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setLoadingRequestId(null);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      setLoadingRequestId(requestId);
      const response = await axios.patch(
        `${BASE_URL}/friendship/${requestId}/reject`, 
        {}, 
        { withCredentials: true }
      );
      onRequestRejected(requestId);  // Notify parent component to remove request
      setLoadingRequestId(null);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setLoadingRequestId(null);
    }
  };

  return (
    <tr className="bg-white dark:bg-gray-800">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {request.sender.username}
      </th>
      <td className="px-2 py-4 text-right">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => handleAcceptRequest(request._id)}
          disabled={loadingRequestId === request._id}
        >
          {loadingRequestId === request._id ? "Accepting..." : "Add as Friend"}
        </button>

        <button
          type="button"
          className="ml-4 focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 transition dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={() => handleRejectRequest(request._id)}
          disabled={loadingRequestId === request._id}
        >
          {loadingRequestId === request._id ? "İgnoring..." : "Ignore"}
        </button>
      </td>
    </tr>
  );
};

export default RequestCard;

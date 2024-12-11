import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFriendRequests, acceptFriendRequest, rejectFriendRequest } from "@/services/friendship"; 

const ErrorMessage = ({ message }) => (
  <div className="text-red-600 font-medium py-4 text-center">
    Error: {message}
  </div>
);

const GettingFriendRequestPage = () => {
  const queryClient = useQueryClient();
  const [loadingRequestId, setLoadingRequestId] = useState(null);

  const userToken = localStorage.getItem("userToken");  // Get the token from localStorage

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: () => getFriendRequests(userToken),
  });

  const acceptMutation = useMutation({
    mutationFn: acceptFriendRequest,
    onMutate: (variables) => {
      setLoadingRequestId(variables.requestId);
    },
    onSettled: () => {
      setLoadingRequestId(null);
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
    onError: (error) => {
      console.error("Error accepting friend request:", error);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectFriendRequest,
    onMutate: (variables) => {
      setLoadingRequestId(variables.requestId);
    },
    onSettled: () => {
      setLoadingRequestId(null);
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
    onError: (error) => {
      console.error("Error rejecting friend request:", error);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <ErrorMessage message={error.message} />;

  const handleRequestAction = (requestId, action) => {
    if (action === "accept") {
      acceptMutation.mutate({ requestId });
    } else if (action === "reject") {
      rejectMutation.mutate({ requestId });
    }
  };

  return (
    <div className="relative overflow-x-auto px-10 py-10">
      {data && data.requests && data.requests.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {data.requests.map((request) => (
              <tr key={request._id} className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {request.sender.username} {/* Display sender's username */}
                </th>
                <td className="px-2 py-4 text-right">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => handleRequestAction(request._id, "accept")}
                    disabled={acceptMutation.isLoading && loadingRequestId === request._id}
                  >
                    {acceptMutation.isLoading && loadingRequestId === request._id
                      ? "Sending..."
                      : "Add as Friend"}
                  </button>
  
                  <button
                    type="button"
                    className="ml-4 focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 transition dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => handleRequestAction(request._id, "reject")}
                    disabled={rejectMutation.isLoading && loadingRequestId === request._id}
                  >
                    {rejectMutation.isLoading && loadingRequestId === request._id
                      ? "Sending..."
                      : "Ignore"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg font-medium text-gray-600">No friend requests</p>
        </div>
      )}
    </div>
  );
};


export default GettingFriendRequestPage;


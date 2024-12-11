import React from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { USER_QUERY_KEY } from "@/constants/query-keys";
import Spinner from "@/components/shared/spinner";
import { getUsers } from "@/services/user";
import UserSearch from "./components/UserSearch";
import { sendFriendRequest } from "@/services/friendship";
import { retractFriendRequest } from "@/services/friendship";  // Ensure this function exists
import TableItem from "./components/TableItem";
import { toast } from "react-toastify";

const SearchAllUsersPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [USER_QUERY_KEY, search, sort],
    queryFn: ({ pageParam = 1 }) => getUsers({ pageParam, search, sort }),
    getNextPageParam: (lastPage) => {
      const { totalCount, page, limit } = lastPage;
      return totalCount > page * limit ? page + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

  const pages = data?.pages ?? [];

  const handleSendFriendRequest = async (friendId) => {
    try {
      await sendFriendRequest(friendId);
      toast.success("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error(error?.response?.data?.message || "Failed to send friend request.");
    }
  };

  const handleCancelFriendRequest = async (friendId) => {
    try {
      await retractFriendRequest(friendId);
      toast.success("Friend request canceled!");
    } catch (error) {
      console.error("Error canceling friend request:", error);
      toast.error(error?.response?.data?.message || "Failed to cancel friend request.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size={48} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: {error.message || "An unexpected error occurred."}
      </div>
    );
  }

  return (
    <div className="p-10">
      <UserSearch />
      <InfiniteScroll
        dataLength={pages.flatMap((page) => page.data).length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <div className="text-center">
            <Spinner size={24} />
          </div>
        }
        endMessage={
          pages.length > 0 && (
            <p className="text-muted-foreground font-semibold text-sm text-center">
              You reached the end
            </p>
          )
        }
        className="flex flex-col gap-5"
      >
        {pages.flatMap((page) =>
          page.data.map((user) => (
            <TableItem
              key={user._id}
              user={user}
              friendshipStatus={user.friendshipStatus}  // Ensure this field exists in user object
              onSendFriendRequest={handleSendFriendRequest} // Pass the send function as well
              onCancelFriendRequest={handleCancelFriendRequest}
            />
          ))
        )}
      </InfiniteScroll>
    </div>
  );
};

export default SearchAllUsersPage;

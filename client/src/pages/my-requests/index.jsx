import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import {
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
} from "@/services/friendship";
import RequestCard from "./components/RequestCard";
import { INVITE_QUERY_KEY } from "@/constants/query-keys";
import RequestsWrapper from "./components/RequestsWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/shared/spinner";

const ErrorMessage = ({ message }) => (
  <div className="text-red-600 font-medium py-4 text-center">
    Error: {message}
  </div>
);

const GettingFriendRequestPage = () => {

  const { data, isError, error, fetchNextPage, hasNextPage } =
  useInfiniteQuery({
    queryKey: [INVITE_QUERY_KEY],
    queryFn: ({ pageParam }) => getFriendRequests({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { count, page, limit } = lastPage;
      const hasMore = count > page * limit;
      return hasMore ? page + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

const { pages } = data ?? {};

if (isError) {
  return <div>Error: {error.message}</div>;
}

console.log(pages);


  return (
    <div className="relative overflow-x-auto px-10 py-10">
      <RequestsWrapper>
      <InfiniteScroll
          dataLength={pages?.length ?? 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Spinner size={24} />}
          endMessage={
            <p className="text-muted-foreground font-semibold text-sm text-center mt-5">
              Yay! You have seen it all
            </p>
          }
        >
          {({ isLoading, data, error }) => {
            if (isLoading) return <div className="text-center py-10">Loading...</div>;
            if (error) return <ErrorMessage message={error.message} />;
            return (
              data?.requests?.map((request) => (
                <RequestCard key={request._id} request={request} />
              ))
            );
          }}
        </InfiniteScroll>
      </RequestsWrapper>
    </div>
  );
};

export default GettingFriendRequestPage;

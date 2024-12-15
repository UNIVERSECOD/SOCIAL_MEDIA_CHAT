import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFriendRequests } from "@/services/friendship";
import RequestCard from "./components/RequestCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/shared/spinner";
import { FRİEND_QUERY_KEY } from "@/constants/query-keys";

const GettingFriendRequestPage = () => {
  const { data, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery(
    {
      queryKey: [FRİEND_QUERY_KEY],
      queryFn: ({ pageParam }) => getFriendRequests({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { count, page, limit } = lastPage;
        const hasMore = count > page * limit;
        return hasMore ? page + 1 : undefined;
      },
      refetchOnWindowFocus: false,
    }
  );

  const { pages } = data ?? {};

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleRequestAccepted = (requestId) => {
    const updatedPages = pages.map((page) => ({
      ...page,
      requests: page.requests.filter((req) => req._id !== requestId),
    }));
  };

  const handleRequestRejected = (requestId) => {
    const updatedPages = pages.map((page) => ({
      ...page,
      requests: page.requests.filter((req) => req._id !== requestId),
    }));
  };

  return (
    <div className="relative overflow-x-auto px-10 py-10">
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
        {pages?.length === 0 ? (
          <div className="text-center text-gray-500">
            No Friend reqeust
          </div>
        ) : (
          pages?.flatMap((page) =>
            page.requests?.length > 0 ? (
              page.requests.map((request) => (
                <RequestCard
                  key={request._id}
                  request={request}
                  onRequestAccepted={handleRequestAccepted}
                  onRequestRejected={handleRequestRejected}
                />
              ))
            ) : (
              <div className="text-center text-gray-500">
                No Friend reqeust
              </div>
            )
          )
        )}
      </InfiniteScroll>
    </div>
  );
};

export default GettingFriendRequestPage;

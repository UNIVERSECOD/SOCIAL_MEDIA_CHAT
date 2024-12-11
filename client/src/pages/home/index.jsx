import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { PostCard } from "@/components/shared/post-card";
import { getPosts } from "@/services/posts";
import { PostsWrapper } from "./components/PostsWrapper";
import { PostsFilter } from "./components/Filter";
import { Heading } from "./components/Heading";

import Spinner from "@/components/shared/spinner";
import { POST_QUERY_KEY } from "@/constants/query-keys";

const HomePage = () => {
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
    queryKey: [POST_QUERY_KEY, search, sort],
    queryFn: ({ pageParam }) => getPosts({ pageParam, search, sort }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { totalCount, page, limit } = lastPage;
      const hasMore = totalCount > page * limit;
      return hasMore ? page + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

  const pages = data?.pages ?? [];

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto max-w-screen-lg px-4 md:px-10 py-10 bg-black">
      <Heading total={pages[0]?.totalCount ?? 0} />
      <PostsFilter />
      <PostsWrapper>
        <InfiniteScroll
          dataLength={pages.flatMap((page) => page.items).length}
          next={fetchNextPage}
          hasMore={hasNextPage || isFetchingNextPage}
          loader={
            <div className="text-center">
              <Spinner size={24} />
            </div>
          }
          endMessage={
            pages.length > 0 && (
              <p className="text-muted-foreground font-semibold text-sm text-center">
                Yay! You have seen it all
              </p>
            )
          }
          className="flex flex-col gap-5"
        >
          {pages.flatMap((page) =>
            page.items.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </InfiniteScroll>
        {isLoading && (
          <div className="flex flex-col gap-5">
            <PostCard.Skeleton />
            <PostCard.Skeleton />
          </div>
        )}
      </PostsWrapper>
    </div>
  );
};

export default HomePage;

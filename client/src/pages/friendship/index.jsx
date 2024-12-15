import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllFriends } from '@/services/friendship';
import FriendCard from './componenets/FriendCard';
import { MY_FRİEND_QUERY_KEY } from "@/constants/query-keys";


const MyFriendsPage = () => {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [MY_FRİEND_QUERY_KEY],
    queryFn: ({ pageParam = 1 }) => getAllFriends({ pageParam }),
    getNextPageParam: (lastPage) => {
      const { count, page, limit } = lastPage;
      const hasMore = count > page * limit;
      return hasMore ? page + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

  console.log(data);
  

  const friends = data?.pages?.flatMap((page) => page.friends) ?? [];

  if (isLoading) {
    return <div className="text-center">Loading</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600">{error?.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">My Friends</h1>

      {friends?.length ? (
        friends.map((friend, index) => (
          friend && friend._id ? (
            <FriendCard key={friend._id} friend={friend} />
          ) : (
            <div key={index} className="text-center text-gray-600 mt-4">
              You dont have friends
            </div>
          )
        ))
      ) : (
        <div className="text-center text-gray-600 mt-4">You dont have friends</div>
      )}

      {/* Növbəti səhifəni yükləmək */}
      {hasNextPage && (
        <button
          onClick={fetchNextPage}
          className="w-full mt-4 p-2 bg-blue-600 text-white"
        >
          Daha çox yüklə
        </button>
      )}
    </div>
  );
};

export default MyFriendsPage;

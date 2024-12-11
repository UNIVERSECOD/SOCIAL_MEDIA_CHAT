import React from "react";
import CurrentUserCard from "./components/CurrentUserCard";
import Conversations from "./components/Conversations";

const ChatPage = () => {
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">QuickChat</div>
          </div>
          <CurrentUserCard />
          <Conversations />
        </div>
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {[
                    "Hey How are you today?",
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsa commodi illum saepe numquam maxime asperiores voluptate sit, minima perspiciatis.",
                    "I'm ok what about you?",
                    "Lorem ipsum dolor sit amet consectetur adipisicing. ?",
                    "Lorem ipsum dolor sit amet !",
                    "Lorem ipsum dolor sit, amet consectetur adipisicing. ?",
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, in.",
                  ].map((message, index) => (
                    <div
                      key={index}
                      className={`col-start-${
                        index % 2 === 0 ? 1 : 6
                      } col-end-${index % 2 === 0 ? 8 : 13} p-3 rounded-lg`}
                    >
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          A
                        </div>
                        <div
                          className={`relative ml-3 text-sm ${
                            index % 2 === 0 ? "bg-white" : "bg-indigo-100"
                          } py-2 px-4 shadow rounded-xl`}
                        >
                          <div>{message}</div>
                          {index === 5 && (
                            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                              Seen
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div className="flex flex-row items-center">
                        <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </button>
                        <div className="flex flex-row items-center space-x-px ml-4">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-${
                                i + 1
                              } w-1 bg-gray-500 rounded-lg`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

"use client";
import React from "react";

const ErrorForWebSocket = () => {
  return (
    <div>
      <div className="alert flex items-center bg-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
        <svg
          className="w-6 h-6 mr-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <div>
          <h3 className="text-lg font-medium">
            {" "}
            Real-time chatting is not available due to lack of WebSocket support
            on Vercel.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ErrorForWebSocket;

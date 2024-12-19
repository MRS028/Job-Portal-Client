import React from "react";

const Loading = () => {
  return (
    <div className="col-span-full min-h-screen text-center mt-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
  );
};

export default Loading;

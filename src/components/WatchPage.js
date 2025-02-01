import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiOptions } from "../utils/constants";
import { useSearchParams } from "react-router";

export const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [ytData, setYtData] = useState(null);
  const [videoNotAvailable, setVideoNotAvailable] = useState(false);

  useEffect(() => {
    getYtData();
  }, []);

  const getYtData = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          searchParams.get("v") +
          "/videos?language=en-US",
        apiOptions
      );
      const json = await response.json();
      if (json?.results && json.results.length > 0) {
        const trailer = json.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer && trailer.key) {
          setYtData(trailer.key);
        } else {
          setVideoNotAvailable(true);
        }
      } else {
        setVideoNotAvailable(true);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
      setVideoNotAvailable(true);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-screen">
        {ytData ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${ytData}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : videoNotAvailable ? (
          <div className="text-center px-4 bg-black h-screen py-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Video Unavailable
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              The video is currently not available. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition duration-300"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-4 animate-pulse">
              Loading Video...
            </div>
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

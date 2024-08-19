import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";

import { signOutUserStart, signOutUserSuccess } from "../redux/user/userSlice";

import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  const capitalizeWords = (string) => {
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        {capitalizeWords(currentUser.username)}
      </h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        {/* <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        /> */}
        {/* <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button> */}
        {currentUser.email === "admin@gmail.com" && (
          <Link
            className="bg-blue-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
            to={"/admin"}
          >
            Go to Admin Page
          </Link>
        )}
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
        <button
          onClick={handleSignOut}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign out
        </button>
        <button
          type="button"
          onClick={handleShowListings}
          className="bg-orange-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Show Listings
        </button>
        
      </form>
      <div className="flex justify-between mt-5">
        {/* <span className="text-red-700 cursor-pointer">Delete account</span> */}
        {/* <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span> */}
      </div>
      {/* <button
        onClick={handleShowListings}
        className="bg-orange-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
      >
        Show Listings
      </button> */}
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                {/* <button className='text-green-700 uppercase'>Edit</button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

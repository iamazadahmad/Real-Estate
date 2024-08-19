import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./componetnts/Header";
import PrivateRoute from "./componetnts/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import Footer from "./componetnts/Footer";
import Consult from "./pages/Consult";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/consult" element={<Consult />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/admin" element={<Admin/>}/>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

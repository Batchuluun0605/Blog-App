"use client";

// import "./globals.css";
import "./style.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Write from "./pages/Write";
import { useEffect } from "react";
import { AuthContextProvider } from "./context/authContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function RootLayout({ children, className }) {
  useEffect(() => {
    document.title = "Blog App";
  }, []);
  return (
    <html lang="en">
      <body className={className}>
        <AuthContextProvider>
          <div className="App">
            <div className="container">
              <RouterProvider router={router}>{children}</RouterProvider>
            </div>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home/Home";
import Mainlayout from "../Layouts/Mainlayout";
import Register from "../pages/Register/Register";
import SignIn from "../pages/Register/SignIn";
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/Job Apply/JobApply";
import MyApplications from "../pages/My-Applications/MyApplications";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AddJob from "../pages/Add Job/AddJob";
import MyPostedJobs from "../pages/MyPostedJob/MyPostedJobs";
import ViewApplications from "../pages/ViewApplications/ViewApplications";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://job-portal-server-taupe.vercel.app/jobs/${params.id}`),
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivateRoute>
            <JobApply></JobApply>
          </PrivateRoute>
        ),
      },
      {
        path: "/myApplications",
        element: (
          <PrivateRoute>
            <MyApplications></MyApplications>
          </PrivateRoute>
        ),
      },
      {
        path: "/MyPostedJobs",
        element: (
          <PrivateRoute>
            <MyPostedJobs></MyPostedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/addjob",
        element: (
          <PrivateRoute>
            <AddJob></AddJob>
          </PrivateRoute>
        ),
      },
      {
        path: "/viewApplications/:job_id",
        element: (
          <PrivateRoute>
            <ViewApplications></ViewApplications>
          </PrivateRoute>
        ),
        loader: ({params}) => fetch(`https://job-portal-server-taupe.vercel.app/job-applications/job/${params.job_id}`)
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default Router;

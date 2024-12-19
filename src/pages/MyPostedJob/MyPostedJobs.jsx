import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyPostedJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/jobs?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, [user.email]);

  const handleUpdate = (jobId) => {
    // console.log("Update job with ID:", jobId);
  };

  const handleDelete = async (jobId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // Optimistic UI update: Immediately remove job from the UI
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

        const response = await fetch(`http://localhost:3000/jobs/${jobId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete job");
        }

        const data = await response.json();

        if (data.deleteCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your job has been deleted.",
            icon: "success",
          });
        } else {
          throw new Error("Failed to delete job");
        }
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      fetchJobs();
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the job.",
        icon: "error",
      });
    }
  };
  


  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        My Posted Jobs
      </h2>
      <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border px-4 py-2">SL</th>
            <th className="border px-4 py-2">Job Title</th>
            <th className="border px-4 py-2">Job Type</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Requirements</th>
            <th className="border px-4 py-2">Salary</th>
            <th className="border px-4 py-2">Deadline</th>
            <th className="border px-4 py-2">Application Count</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={job._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{job.title}</td>
              <td className="border px-4 py-2">{job.jobType}</td>
              <td className="border px-4 py-2">{job.location}</td>
              <td className="border px-4 py-2">{job.requirements}</td>
              <td className="border px-4 py-2">
                 {job.salaryRange.min} - {job.salaryRange.max} {job.salaryRange.currency}
              </td>
              <td className="border px-4 py-2">{job.applicationDeadline} </td>
              <td className="border px-4 py-2"> {job.applicationCount>0 ? <Link to= {`/viewApplications/${job._id}`} className="btn bg-green-500">View({job.applicationCount})</Link> : <button className="btn bg-red-300">Null</button>}</td>
              <td className="border px-4 py-2 flex justify-end space-x-3">
                <button
                  onClick={() => handleUpdate(job._id)}
                  className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                >
                  <FaEdit className="inline-block" />
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  <FaTrashAlt className="inline-block" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default MyPostedJobs;

import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loading from "../Loader/Loading";

const MyApplications = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/job-applications?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      });
  }, [user.email]);

  const handleDetails = (jobId) => {
    navigate("/");
    alert(`Details for Job ID: ${jobId}`);
    // You can navigate to a details page using React Router or display a modal
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-11/12 mx-auto mb-5">
      {loading ? <Loading></Loading> :
      jobs.length > 0 ? (
        jobs.map((job, index) => (
          <div
            key={job._id}
            className="border shadow-lg rounded-lg p-4 bg-white flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{job.position}</h2>
                <p className="text-sm text-gray-500">{job.company}</p>
              </div>
              <img
                src={job.company_logo}
                alt={`${job.company} logo`}
                className="w-12 h-12 object-cover rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium text-gray-600">Applicant Name:</div>
              <div>{job.name}</div>

              <div className="font-medium text-gray-600">Email:</div>
              <div className="flex items-center gap-2">
                <MdOutlineEmail className="text-blue-600" />
                {job.applicant_email}
              </div>

              <div className="font-medium text-gray-600">Phone:</div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-green-600" />
                {job.phone}
              </div>

              <div className="font-medium text-gray-600">LinkedIn:</div>
              <div className="flex items-center gap-2">
                <FaLinkedin className="text-blue-800" />
                {job.linkedin}
              </div>

              <div className="font-medium text-gray-600">GitHub:</div>
              <div className="flex items-center gap-2">
                <FaGithub className="text-gray-700" />
                {job.github}
              </div>

              <div className="font-medium text-gray-600">Location:</div>
              <div>{job.location || "Not Provided"}</div>
            </div>
            <div>
              <p className="font-medium text-gray-600">About:</p>
              <p className="text-gray-700">{job.about}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Job Title:</span> {job.title}
              </p>
            </div>
            <div className="text-right">
              <button
                onClick={() => handleDetails(job._id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center col-span-full text-gray-600">
          No job applications found.
        </p>
      )}
    </div>
  );
};

export default MyApplications;

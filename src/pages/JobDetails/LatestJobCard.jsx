import React from "react";
import { FaClock } from "react-icons/fa"; // React Icons
import { FiMapPin } from "react-icons/fi";
import { MdWork } from "react-icons/md";
import { Link } from "react-router-dom";

const LatestJobCard = ({ job }) => {
  const {
    title,
    _id,
    company,
    company_logo,
    location,
    requirements,
    description,
    salaryRange,
  } = job;
  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-200 card-body">
      {/* Logo & Title */}
      <div className="flex items-center gap-3 mb-2">
        <img
          src={company_logo}
          alt="FlyChat Logo"
          className="w-12 h-12 rounded-lg"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{company}</h3>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <FiMapPin />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Job Title */}
      <h4 className="text-base font-bold text-gray-800 mb-2">{title}</h4>

      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <MdWork className="text-gray-500 text-lg" />
        <span>Part Time</span>
        <FaClock className="text-gray-500 text-lg" />
        <span> 2 months ago</span>
      </div>

      {/* <p className="text-gray-500 text-sm mb-4">{description}</p> */}

      {/* <div className="flex gap-2 mb-4">
        <span className=" flex gap-2  flex-wrap text-gray-700">
          {requirements.map((skill,index) => (
            <p key={index} className="border rounded-md text-center px-2 hover:text-blue-500 hover:bg-gray-300">
              {skill}
            </p>
          ))}
        </span>
      </div> */}

      <div className=" font-bold text-blue-500 mb-4">
        <p>
          Salary: {salaryRange.min} - {salaryRange.max} BDT{" "}
          <span className=" text-gray-500"> /Monthly</span>
        </p>
      </div>

      <Link to={`/jobs/${_id}`}>
        <button className="btn btn-primary w-full bg-base-100 text-base-content rounded-lg hover:bg-indigo-400">
          Details
        </button>{" "}
      </Link>
    </div>
  );
};

export default LatestJobCard;

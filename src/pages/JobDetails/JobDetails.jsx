import React from 'react';
import { FaClock, FaRegClock } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { Link, useLoaderData } from 'react-router-dom';
import { MdWork } from "react-icons/md";

const JobDetails = () => {
    const { title,
        _id,hr_email,hr_name,
        company,status,
        applicationDeadline,
        company_logo,
        location,
        requirements,
        description,
        salaryRange,} = useLoaderData();
    // console.log(job

    return (
        <div className="border border-gray-200 rounded-lg shadow-md p-6 bg-white max-w-4xl mx-auto my-10">
      {/* Top Section */}
      <div className="flex items-start justify-between">
        {/* Logo and Company */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
            <img
              src={company_logo}
              alt="Company Logo"
              className="w-8 h-8 object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{company}</h3>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <FiMapPin className="text-gray-500" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex gap-2">
          <span className=" grid grid-cols-2 gap-2 text-gray-700 rounded-lg">
          {requirements.map((skill,index) => (
            <p key={index} className="border  rounded-md text-center px-2 hover:text-blue-500 hover:bg-gray-300">
              {skill}
            </p>
          ))}
          </span>
         
        </div>
      </div>

      {/* Job Title */}
      <h2 className="text-xl font-bold text-gray-800 mt-4">
            {title}
      </h2>

      {/* Job Type */}
      <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
       <MdWork className="text-gray-500 text-lg" />
               <span>Part Time</span>
               <FaClock className="text-gray-500 text-lg" />
               <span> 2 months ago</span>
      </div>

      {/* Description */}
      <div className='mt-2 text-gray-600 text-sm'>

      <p className=''><span className='font-semibold'>HR Name:</span> {hr_name}</p>
      <p><span className='font-semibold'>HR Email:</span> <a href="https://mail.google.com/" target='blank' className='hover:underline hover:text-blue-500'>{hr_email}</a></p>
      <p className="text-gray-600  ">
        <span className='font-semibold'>Description:</span>
       {description}
      </p>
      </div>
      

      <div className='mt-2'>
        <p><span className='font-semibold'>Status:</span> <span className='text-lime-500'>{status}</span></p>
        <p className='text-sm text-gray-600 '><span className='font-semibold'>DeadLine:</span> <span className='text-red-500'>{ applicationDeadline}</span></p>

      </div>

      {/* Salary & Apply */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-indigo-600 text-xl font-bold">
        <p>
          Salary: {salaryRange.min} - {salaryRange.max} BDT
          <span className=" text-gray-500"> /Monthly</span>
        </p>
        </div>
        <Link
         to={`/jobApply/${_id}`}
          className="text-blue-500 hover:underline text-sm font-medium"
        >
          Apply Now
        </Link>
      </div>
    </div>
    );
};

export default JobDetails;
import { div, object } from "motion/react-client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddJob = () => {
  const {user} = useAuth();

  // console.log(user.email)
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(formData);

    const initialData = Object.fromEntries(formData.entries());
    // console.log(initialData);
    const { min, max, currency,...newJob } = initialData;
    
    
    // console.log(newJob);

    newJob.salaryRange = {min : parseInt(min,10), max: parseInt(max), currency };
    newJob.requirements = newJob.requirements.split(",");
    newJob.responsibilities = newJob.responsibilities.split(",");
    console.log(newJob);

    const isValid = Object.values(newJob).every(value => value && (Array.isArray(value) ? value.length : true));

  if (!isValid || newJob.salaryRange.min <= 0 || newJob.salaryRange.max <= 0 || newJob.salaryRange.min >= newJob.salaryRange.max) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill in all required fields with valid data.",
    });
    return;
  }

    fetch("https://job-portal-server-taupe.vercel.app/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/MyPostedJobs");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to add the job. Please try again.",
          });
        }
        console.log(data);
      });
  };

  return (
    <div className="w-11/12 mx-auto mt-5 border rounded-lg mb-5">
      <form
        onSubmit={handleSubmit}
        className="p-4 space-y-4 bg-white shadow rounded-md"
      >
        <div>
          <label className="font-bold">Job Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            placeholder="e.g., Project Manager"
          />
        </div>
        <div>
          <label className="font-bold">Location</label>
          <input
            type="text"
            name="location"
            className="input input-bordered w-full"
            placeholder="e.g., Mirpur, Dhaka"
          />
        </div>
        <div>
          <label className="font-bold">Job Type</label>
          <select name="jobType" className="select select-bordered w-full">
            <option value="">Select Job Type</option>
            <option value="Hybrid">Intern</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
        <div>
          <label className="font-bold">Category</label>
          <input
            type="text"
            name="category"
            className="input input-bordered w-full"
            placeholder="e.g., Management"
          />
        </div>
        <div>
          <label className="font-bold">Application Deadline</label>
          <input
            type="date"
            name="applicationDeadline"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="font-bold">Salary Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="min"
              className="input input-bordered w-1/2"
              placeholder="Min Salary"
            />
            <input
              type="number"
              name="max"
              className="input input-bordered w-1/2"
              placeholder="Max Salary"
            />{" "}
            <div className="form-control"></div>
          </div>
        </div>
        <div>
          <label className="font-bold">Currency</label>
          <select
            name="currency"
            className="select  input input-bordered w-full"
            id=""
          >
            <option disabled selected>
              Currency
            </option>
            <option>BDT</option>
            <option>USD</option>
            <option>INR</option>
          </select>
        </div>
        <div>
          <label className="font-bold">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Job Description"
          ></textarea>
        </div>
        <div>
          <label className="font-bold">Requirements</label>
          <input
            type="text"
            name="requirements"
            className="input input-bordered w-full"
            placeholder="Comma-separated requirements"
          />
        </div>
        <div>
          <label className="font-bold">Responsibilities</label>
          <input
            type="text"
            name="responsibilities"
            className="input input-bordered w-full"
            placeholder="Comma-separated responsibilities"
          />
        </div>
        <div>
          <label className="font-bold">HR Email</label>
          <input
            type="email"
            name="hr_email"
            defaultValue={user?.email} readOnly
            className="input input-bordered w-full"
            placeholder="HR Email"
          />
        </div>
        <div>
          <label className="font-bold">HR Name</label>
          <input
          defaultValue={user?.displayName} readOnly
            type="text"
            name="hr_name"
            className="input input-bordered w-full"
            placeholder="HR Name"
          />
        </div>
        <div>
          <label className="font-bold">Company Logo URL</label>
          <input
            type="text"
            name="company_logo"
            className="input input-bordered w-full"
            placeholder="Logo URL"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;

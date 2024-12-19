import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const JobApply = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  //   console.log(user);
  // console.log(id);

  const submitJobApplication = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const photo = form.photo.value;
    const resume = form.resume.value;
    const position = form.position.value;
    const about = form.about.value;
    const linkedin = form.linkedin.value;
    const github = form.github.value;
    // console.log({
    //   name,
    //   email,
    //   phone,
    //   photo,
    //   resume,
    //   position,
    //   about,
    //   linkedin,
    //   github,
    // });

    const jobApplication = {
      job_id: id,
      applicant_email: user?.email,
      name,
      phone,
      photo,
      resume,
      position,
      about,
      linkedin,
      github,
    };
    if (!name || !phone || !photo || !resume || !position || !about) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields and upload files.",
      });
      return;
    }



    // console.log(jobApplication.job_id)

    fetch("http://localhost:3000/job-applications", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobApplication),
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
          navigate("/myApplications");
        }
        console.log(data);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 border bg-white shadow-lg rounded-lg mb-5">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Job Application Form
      </h2>
      <form className="space-y-6" onSubmit={submitJobApplication}>
        {/* Full Name */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
          defaultValue={user.displayName}
          readOnly
            type="text"
            id="fullName"
            name="name"
            placeholder="Enter your full name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            className="input input-bordered w-full"
          />
        </div>
        {/* LinkedIn Profile */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="linkedin"
          >
            LinkedIn Profile
          </label>
          <input
            id="linkedin"
            name="linkedin"
            placeholder="Enter your LinkedIn profile link"
            className="input input-bordered w-full"
          />
        </div>

        {/* GitHub Profile */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="github"
          >
            GitHub Profile
          </label>
          <input
            id="github"
            name="github"
            placeholder="Enter your GitHub profile link"
            className="input input-bordered w-full"
          />
        </div>
        {/* Upload Photo */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="photo"
          >
            Upload Your Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Upload Resume */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="resume"
          >
            Upload Resume
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Position */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="position"
          >
            Position Applying For
          </label>
          <select
            id="position"
            name="position"
            className="select select-bordered w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select a position
            </option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
            <option>UI/UX Designer</option>
            <option>Mobile App Developer</option>
            <option>DevOps Engineer</option>
            <option>Teaching Assistant</option>
            <option>Data Scientist</option>
            <option>Finance Manager</option>
            <option>Marketing Specialist</option>
          </select>
        </div>

        {/* About You*/}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="coverLetter"
          >
            About You
          </label>
          <textarea
            id="coverLetter"
            name="about"
            placeholder="Write something special about you"
            className="textarea textarea-bordered w-full h-32"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApply;

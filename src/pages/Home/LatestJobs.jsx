import React, { useEffect, useState } from "react";
import LatestJobCard from "../JobDetails/LatestJobCard";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("https://job-portal-server-taupe.vercel.app/jobs?sort=false")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, []);

  return (
    <>
      <div className="">
        <div className="text-center text-3xl">
          <h1>Latest Jobs</h1>
        </div>
        <div className="grid p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
          {jobs.map((job) => (
            <LatestJobCard key={job._id} job={job}></LatestJobCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default LatestJobs;

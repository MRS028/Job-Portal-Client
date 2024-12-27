import React, { useState } from "react";
import useJobs from "../../hooks/useJobs";
import LatestJobCard from "../JobDetails/LatestJobCard";
import { BiSearch, BiSearchAlt } from "react-icons/bi";

const AllJobs = () => {
  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState("");
  const { jobs, loading } = useJobs(sort,search);

  //   console.log(jobs);
  //   console.log(sort);

  return (
    <div>
      <h1 className="py-5 text-4xl text-center font-bold">All Jobs</h1>
      <div className="w-11/12 mx-auto  py-5 p-3 flex items-center gap-5 ">
        <button
          onClick={() => setSort(!sort)}
          className={`btn btn-neutral ${sort && "btn-success"}`}
        >
          {sort === true ? "Sorted By Salary" : "Sort By Salary"}
        </button>
        <BiSearch></BiSearch>
        <input
          type="text"
          onKeyUp={(e)=>setSearch(e.target.value)}
          placeholder="Search Your Job by location"
          className="input w-full max-w-2xl"
        ></input>
      </div>
      <div className="grid p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
        {jobs.map((job) => (
          <LatestJobCard key={job._id} job={job}></LatestJobCard>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;

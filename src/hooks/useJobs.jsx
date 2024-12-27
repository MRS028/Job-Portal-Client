import axios from "axios";
import React, { useEffect, useState } from "react";

const useJobs = (sort,search) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://job-portal-server-taupe.vercel.app/jobs?sort=${sort}&search=${search}`).then((res) => {
    //   console.log(res.data);
      setJobs(res.data); 
      setLoading(false);
    });
  }, [sort,search]);
  return {jobs, loading};
};

export default useJobs;

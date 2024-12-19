import { tr } from 'motion/react-client';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewApplications = () => {
    const applications = useLoaderData();
    return (
        <div>
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
      Applications For this Job:{applications.length}
      </h2>
      <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border px-4 py-2">SL</th>
            <th className="border px-4 py-2">Applicant Name</th>
            <th className="border px-4 py-2">Applicant Email</th>
            
            <th className="border px-4 py-2">Applicant Phone</th>
            <th className="border px-4 py-2">Position</th>
            
          </tr>
        </thead>
        <tbody>
          {
            applications.map((job,index) => <tr key={job._id}>
                <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{job.name}</td>
              <td className="border px-4 py-2">{job.applicant_email}</td>
              <td className="border px-4 py-2">{job.phone}</td>
              <td className="border px-4 py-2">{job.position}</td>
              
              

                </tr>
          

          )}
        </tbody>
      </table>
      </div>
    </div>
        </div>
    );
};

export default ViewApplications;
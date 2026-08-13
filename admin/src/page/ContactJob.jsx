import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ContactJob = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

const fetchContactJobs = useCallback(async () => {
  setLoading(true);

  try {
    const response = await axios.get(
      `${backendURL}/api/contact`
    );

    setJobData(response?.data?.data || []);
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch contact jobs"
    );
  } finally {
    setLoading(false);
  }
}, [backendURL]);

useEffect(() => {
  fetchContactJobs();
}, [fetchContactJobs]);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${backendURL}/api/contact/${id}/status`, { status });
      toast.success(`Status marked as ${status}`);
      fetchContactJobs();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = (id) => {
    toast.info(
      <div className="flex flex-col gap-3">
        <p className="font-medium">Delete this application?</p>
        <div className="flex gap-3">
          <button
            className="px-4 py-1 text-white bg-red-600 rounded hover:bg-red-700"
            onClick={async () => {
              try {
                await axios.delete(`${backendURL}/api/contact/${id}`);
                toast.dismiss();
                toast.success("Application deleted successfully");
                fetchContactJobs();
              } catch {
                toast.error("Failed to delete application");
              }
            }}
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };


  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-semibold md:text-2xl">
        Job Applications
      </h2>
      {loading && (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-blue-900 rounded-full border-t-white animate-spin"></div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="text-sm uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Phone</th>
              <th className="px-4 py-3 border">Position</th>
              <th className="px-4 py-3 border">Resume</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {jobData.length === 0 && !loading && (
              <tr>
                <td colSpan="7" className="py-6 text-center">
                  No applications found
                </td>
              </tr>
            )}

            {jobData.map((job) => (
              <tr key={job._id} className="transition hover:bg-gray-50">
                <td className="px-4 py-2 border">{job.fullName}</td>
                <td className="px-4 py-2 border">{job.email}</td>
                <td className="px-4 py-2 border">{job.phone}</td>
                <td className="px-4 py-2 border">{job.position}</td>

                <td className="px-4 py-2 border">
                  <a
                    href={`${job?.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        job.status === "Read"
                          ? "bg-green-100 text-green-700"
                          : job.status === "Replied"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2 px-4 py-2 border">
                  <button
                    onClick={() => updateStatus(job._id, "Read")}
                    className="px-3 py-1 text-xs text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Read
                  </button>
                  <button
                    onClick={() => updateStatus(job._id, "Replied")}
                    className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Replied
                  </button>
                  <button
                    onClick={() => updateStatus(job._id, "Pending")}
                    className="px-3 py-1 text-xs text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
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

export default ContactJob;

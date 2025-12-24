import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ContactJob = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const fetchContactJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendURL}/api/contact`);
      setJobData(response?.data?.data || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch contact jobs");
    } finally {
      setLoading(false);
    }
  };

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
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
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
            className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  useEffect(() => {
    fetchContactJobs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        Job Applications
      </h2>
      {loading && (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-blue-900 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gray-100 text-sm uppercase">
            <tr>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Phone</th>
              <th className="py-3 px-4 border">Position</th>
              <th className="py-3 px-4 border">Resume</th>
              <th className="py-3 px-4 border">Status</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {jobData.length === 0 && !loading && (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No applications found
                </td>
              </tr>
            )}

            {jobData.map((job) => (
              <tr key={job._id} className="hover:bg-gray-50 transition">
                <td className="py-2 px-4 border">{job.fullName}</td>
                <td className="py-2 px-4 border">{job.email}</td>
                <td className="py-2 px-4 border">{job.phone}</td>
                <td className="py-2 px-4 border">{job.position}</td>

                <td className="py-2 px-4 border">
                  <a
                    href={`${job?.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
                <td className="py-2 px-4 border">
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
                <td className="py-2 px-4 border flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(job._id, "Read")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Read
                  </button>
                  <button
                    onClick={() => updateStatus(job._id, "Replied")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Replied
                  </button>
                  <button
                    onClick={() => updateStatus(job._id, "Pending")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
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

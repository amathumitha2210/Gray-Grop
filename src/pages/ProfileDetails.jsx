import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../redux/profileSlice";
import { motion } from "framer-motion";

const ProfileDetailsPage = () => {
  const { id } = useParams(); // Get the profile ID from the URL
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.profiles);

  // Fetch profiles if not already loaded
  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchProfiles());
    }
  }, [dispatch, data]);

  // Find the profile with the matching ID
  const profile = data.find((p) => p.client_id === id);

  // Display loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-xl font-semibold text-purple-700">Loading...</div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  // Display profile not found state
  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-xl font-semibold text-purple-900">
          Profile not found.
        </div>
      </div>
    );
  }

  // Display profile details
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <h1 className="text-4xl font-bold text-center text-purple-900 mb-8">
        Profile Details
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Fixed-size image container */}
        <div className="w-full h-64 overflow-hidden">
          <img
            src={profile.client_profile_url || "https://via.placeholder.com/400"}
            alt={profile.client_name || "Unknown"}
            className="w-full h-full object-cover" // Ensure the image covers the container
          />
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-purple-900">
            {profile.client_name || "Unknown"}
          </h2>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">Contact:</span>{" "}
            {profile.client_mobile || "N/A"}
          </p>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">Location:</span>{" "}
            {profile.client_city || "N/A"}
          </p>

          {/* Back Button */}
          <div className="mt-6">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              Back to Listing
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileDetailsPage;
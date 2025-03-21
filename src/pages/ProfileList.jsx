import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../redux/profileSlice";
import ProfileCard from "../components/ProfileCard";
import { motion, AnimatePresence } from "framer-motion";

const ProfileListingPage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.profiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 6;

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchProfiles());
    }
  }, [dispatch, data.length]);

  // Debounce the search query to prevent unnecessary filtering on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filter profiles using useMemo for performance
  const filteredProfiles = useMemo(
    () =>
      data.filter((profile) =>
        profile.client_name.toLowerCase().includes(debouncedQuery.toLowerCase())
      ),
    [data, debouncedQuery]
  );

  // Pagination logic
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = useMemo(
    () => filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile),
    [filteredProfiles, indexOfFirstProfile, indexOfLastProfile]
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-xl font-semibold text-purple-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <h1 className="text-4xl font-bold text-center text-purple-900 mb-8">
        Profile Listing
      </h1>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="w-full max-w-md px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <br></br>
      

      {/* Profile Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {currentProfiles.length > 0 ? (
            currentProfiles.map((profile) => (
              <motion.div
                key={profile.client_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ProfileCard profile={profile} />
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-gray-600 text-center col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No profiles found.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {filteredProfiles.length > profilesPerPage &&
          Array.from({
            length: Math.ceil(filteredProfiles.length / profilesPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 border border-purple-300"
              } hover:bg-purple-700 hover:text-white transition-colors duration-300`}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default ProfileListingPage;

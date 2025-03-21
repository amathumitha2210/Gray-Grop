import { Link } from "react-router-dom";

const ProfileCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      {/* Fixed-size image container */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={profile.client_profile_url || "https://via.placeholder.com/150"}
          alt={profile.client_name || "Unknown"}
          className="w-full h-full object-cover" // Ensure the image covers the container
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-purple-900">
          {profile.client_name || "Unknown"}
        </h2>
        {/* Updated "View Details" Button */}
        <Link
          to={`/profile/${profile.client_id}`}
          className="mt-4 inline-block w-full text-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
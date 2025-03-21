import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileListingPage from "./pages/ProfileList";
import ProfileDetailsPage from "./pages/ProfileDetails";
import "./styles/tailwind.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileListingPage />} />
        <Route path="/profile/:id" element={<ProfileDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;



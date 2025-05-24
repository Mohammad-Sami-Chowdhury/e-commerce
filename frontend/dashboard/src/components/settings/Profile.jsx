import { useEffect, useState } from "react";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", avatar: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;
        const decoded = jwtDecode(token);
        const userId = decoded._id || decoded.id;
        const res = await axios.get(
          `http://localhost:5000/api/v1/users/getsingleuser/${userId}`
        );
        setUser({
          name: res.data.name || res.data.firstName || "No Name",
          email: res.data.email || "No Email",
          avatar:
            res.data.avatar || "https://randomuser.me/api/portraits/men/3.jpg",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src={user.avatar}
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-400">{user.name}</h3>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
        Edit Profile
      </button>
    </SettingSection>
  );
};
export default Profile;

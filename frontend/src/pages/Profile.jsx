import { useState, useEffect } from "react";
import "../styles/Profile.css";
import { useUser } from "../context/UserContext";

// 🧬 Profile Page Component
const Profile = () => {
  const { user, setUser, token } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    age: "",
    gender: "Male",
    email: "",
    mobile: "",
    bloodGroup: "A+",
    dietType: "Vegetarian",
    sleepHours: "",
   
    goal: "",
    currentConditions: "",
    healthStatus: "Good",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load profile");
        setFormData(data);
        setUser(data);
      } catch (err) {
        console.error("Error loading profile:", err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProfile();
    else setLoading(false);
  }, [token, setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      setFormData((prev) => ({ ...prev, dob: value, age }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Profile update failed");
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      alert("✅ Profile updated!");
    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert("❌ " + err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!token || !user) return <p>You must be logged in to view this page.</p>;

  return (
    <div className="profile-page">
      <h1>🧬 Your Health Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-row">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
          <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />
          <input name="age" type="number" value={formData.age} readOnly placeholder="Age" />
        </div>

        <div className="form-row">
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            name="email"
            type="email"
            value={formData.email}
            readOnly // ⛔ Cannot be edited
            placeholder="Email"
          />
          <input
            name="mobile"
            type="text"
            maxLength={10}
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
          />
        </div>

        <div className="form-row">
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
            <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
          </select>
          <select name="dietType" value={formData.dietType} onChange={handleChange}>
            <option>Vegetarian</option>
            <option>Non-Vegetarian</option>
            <option>Vegan</option>
          </select>
          <input
            name="sleepHours"
            type="number"
            min="0"
            value={formData.sleepHours}
            onChange={handleChange}
            placeholder="Sleep (hrs/day)"
          />
          
        </div>

        <textarea name="goal" value={formData.goal} onChange={handleChange} placeholder="Your current health goal" />
        <textarea
          name="currentConditions"
          value={formData.currentConditions}
          onChange={handleChange}
          placeholder="Any existing medical conditions?"
        />

        <div className="form-row">
          <select name="healthStatus" value={formData.healthStatus} onChange={handleChange}>
            <option>Excellent</option>
            <option>Good</option>
            <option>Average</option>
            <option>Poor</option>
          </select>
        </div>
        <small className="health-info">
          💡 <strong>Health Status:</strong> This reflects your own view of your current well-being. It helps us tune
          suggestions & predictions with your baseline in mind.
        </small>

        <button type="submit">💾 Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;

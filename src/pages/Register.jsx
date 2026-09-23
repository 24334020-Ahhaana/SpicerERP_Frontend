import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Register() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);


  // ===============================
  // HANDLE INPUT
  // ===============================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // ===============================
  // REGISTER
  // ===============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");


    // Check passwords
    if (formData.password !== formData.confirmPassword) {

      setMessage("Passwords do not match");

      return;
    }


    try {

      setLoading(true);


      const response = await axios.post(
        "https://spicererp-backend.onrender.com/api/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        }
      );


      setMessage(response.data.message);


      // Go to login page
      setTimeout(() => {

        navigate("/login");

      }, 1500);


    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <div style={styles.logo}>
          SPICER
        </div>


        <h1 style={styles.heading}>
          Create Account
        </h1>


        <p style={styles.subtitle}>
          Register for SpicerERP
        </p>


        <form onSubmit={handleSubmit}>


          {/* USERNAME */}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />


          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />


          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />


          {/* CONFIRM PASSWORD */}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />


          {/* REGISTER BUTTON */}

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >

            {loading ? "Registering..." : "Register"}

          </button>


        </form>


        {/* MESSAGE */}

        {message && (

          <p style={styles.message}>
            {message}
          </p>

        )}


        {/* LOGIN LINK */}

        <p style={styles.bottomText}>

          Already have an account?{" "}

          <Link
            to="/login"
            style={styles.link}
          >
            Login
          </Link>

        </p>


      </div>

    </div>

  );
}


// ===============================
// STYLES
// ===============================

const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #4b0082, #2563eb)",
    padding: "20px"
  },


  card: {
    width: "380px",
    maxWidth: "100%",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow:
      "0 15px 40px rgba(0, 0, 0, 0.25)",
    textAlign: "center",
    boxSizing: "border-box"
  },


  logo: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#4b0082",
    letterSpacing: "2px",
    marginBottom: "10px"
  },


  heading: {
    margin: "10px 0",
    color: "#222"
  },


  subtitle: {
    color: "#777",
    marginBottom: "25px"
  },


  input: {
    width: "100%",
    padding: "13px",
    marginBottom: "14px",
    border:
      "1px solid #d0d0d0",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none"
  },


  button: {
    width: "100%",
    padding: "13px",
    marginTop: "5px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4b0082",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },


  message: {
    marginTop: "18px",
    color: "#4b0082",
    fontWeight: "bold"
  },


  bottomText: {
    marginTop: "25px",
    color: "#555"
  },


  link: {
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none"
  }

};


export default Register;
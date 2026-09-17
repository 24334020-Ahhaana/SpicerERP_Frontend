import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Login() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: "",
    password: ""
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
  // LOGIN
  // ===============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");


    try {

      setLoading(true);


      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username: formData.username,
          password: formData.password
        }
      );


      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.token
      );


      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      setMessage(response.data.message);


      // Go to home page
      setTimeout(() => {

        navigate("/");

      }, 1000);


    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Login failed"
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
          Welcome Back
        </h1>


        <p style={styles.subtitle}>
          Login to SpicerERP
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


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >

            {loading ? "Logging in..." : "Login"}

          </button>


        </form>


        {/* MESSAGE */}

        {message && (

          <p style={styles.message}>
            {message}
          </p>

        )}


        {/* REGISTER LINK */}

        <p style={styles.bottomText}>

          Don't have an account?{" "}

          <Link
            to="/register"
            style={styles.link}
          >
            Register
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
      "linear-gradient(135deg, #2563eb, #4b0082)",
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
    backgroundColor: "#2563eb",
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


export default Login;
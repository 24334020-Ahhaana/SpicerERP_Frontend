import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";


// ===============================
// HOME PAGE
// ===============================

function Home() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/login";

  };


  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1>
          Welcome to SpicerERP
        </h1>


        {user && (

          <p>
            Welcome, <strong>{user.username}</strong>
          </p>

        )}


        <button
          onClick={handleLogout}
          style={styles.button}
        >
          Logout
        </button>

      </div>

    </div>

  );

}


// ===============================
// APP
// ===============================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* UNKNOWN URL */}

        <Route
          path="*"
          element={
            <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>

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
      "linear-gradient(135deg, #4b0082, #2563eb)"
  },


  card: {
    backgroundColor: "white",
    padding: "50px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow:
      "0 15px 40px rgba(0, 0, 0, 0.25)"
  },


  button: {
    marginTop: "20px",
    padding: "12px 30px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4b0082",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  }

};


export default App;
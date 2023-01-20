import { getAuth, signOut } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  async function fetchUser() {
    const user = auth.currentUser;
    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      const data = docSnap.data();
      setIsAdmin(data?.admin);
    }
  }
  auth.onAuthStateChanged((user) => {
    setIsLoggedIn(!!user);
    if (user) {
      fetchUser();
    } else {
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    }
  });
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        {isAdmin ? <Link to="/admin">Admin</Link> : null}
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <Button
            sx={{ flex: 1, justifyContent: "flex-end" }}
            onClick={() => {
              signOut(auth);
            }}
            color="inherit"
          >
            Logout
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

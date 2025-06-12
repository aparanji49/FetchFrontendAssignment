import img1 from "../assets/dog.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import Button from "@mui/material/Button";
// import { Button } from "@chakra-ui/react";
import { logout } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
const Header: React.FC = () => {
  const user = localStorage.getItem("user");

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      console.log(user);
      await logout();
      localStorage.removeItem("fetch_username");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error('Login Expired. Please Login again');
      navigate("/");
    }
  };

  return (
    <>
      {/* Header Layout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Logo and Title */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={img1} height={60} alt="Dog Logo" />
          <h3 style={{ marginLeft: "5px" }}>Pawfect Match</h3>
        </div>

        {/* Right: User Info (only if logged in) */}
        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link to={"/favorites"}>Favorites</Link>
            {/* <FontAwesomeIcon icon={faUser} />
            <span>{user}</span> */}

            <AccountCircleIcon />
            <Typography variant="body2">{user}</Typography>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                borderColor: "#00B6F1",
                color: "#00B6F1",
                "&:hover": {
                  backgroundColor: "#00B6F1",
                  color: "white",
                  borderColor: "#00B6F1",
                },
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;

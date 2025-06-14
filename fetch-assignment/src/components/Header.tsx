import img1 from "../assets/dog.png";
import { logout } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
import { primaryButton} from '../styles/buttonStyles';
const Header: React.FC = () => {
  const user = localStorage.getItem("fetch_username");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("fetch_username");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Login expired. Please login again.");
      navigate("/");
    }
  };

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 2,
        borderBottom: "1px solid #e0e0e0", // subtle divider
        bgcolor: "#fff",
      }}
    >
      {/* Logo and Title */}
      <Box
        onClick={() => navigate("/search")}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <img src={img1} height={50} alt="Dog Logo" />
        <Typography
          variant="h6"
          sx={{
            ml: 1,
            fontWeight: 600,
            color: "#000",
            userSelect: "none",
          }}
        >
          Pawfect Match
        </Typography>
      </Box>

      {/* Right side: Links and Logout */}
      {user && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link
            to="/favorites"
            style={{
              fontWeight: 500,
              color: "#444",
            }}
          >
            Favorites
          </Link>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccountCircleIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {user}
            </Typography>
          </Box>

          <Button
            onClick={handleLogout}
            sx={
             primaryButton
            }
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;

import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { Fragment, useContext } from "react";
import { ColorModeContext, tokens } from "../../contexts/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import { axiosPrivate } from "../../api/axios";

function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const { auth, setAuth, setLocalAuthData } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    axiosPrivate.get("/api/auth/logout");
    await setAuth({});
    await setLocalAuthData({});
    await navigate("/");
  };

  return (
    <Box display={"flex"} justifyContent="space-between" p={2}>
      <Box display={"flex"}>
        {/* Search Bar */}
        {/* <Box
          display={"flex"}
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder={"Search"} />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchOutlinedIcon />
          </IconButton>
        </Box> */}
        {/* Home */}
        {/* <IconButton
          onClick={() => {
            Object.keys(auth).length === 0
              ? navigate("/", { replace: true })
              : navigate("/dashboard", { replace: true });
          }}
        >
          <HomeOutlinedIcon />
        </IconButton> */}
      </Box>
      {/* Icons */}
      <Box display={"flex"}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "light" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        {Object.keys(auth).length === 0 ? (
          <IconButton
            onClick={() => {
              navigate("/login", { replace: true });
            }}
          >
            <LoginOutlinedIcon />
          </IconButton>
        ) : (
          <Fragment>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>

            <IconButton LinkComponent={Link} to="/user">
              <PersonOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleLogout();
              }}
            >
              <LogoutOutlinedIcon />
            </IconButton>
          </Fragment>
        )}
      </Box>
    </Box>
  );
}

export default Topbar;

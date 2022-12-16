import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../contexts/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import "react-pro-sidebar/dist/css/styles.css";
import useAuth from "../../hooks/useAuth";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  setSidebarSelected,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSidebarSelected(title);
        setSelected(title);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [sidebarselected, setSidebarSelected] = useLocalStorage(
    "sidebarselected",
    ""
  );

  useEffect(() => {
    if (sidebarselected !== "") setSelected(sidebarselected);
    return () => setSidebarSelected("Dashboard");
  }, []);
  const { auth } = useAuth();

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Pharma Admin
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* USER  */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"content"}
              >
                <img
                  alt="profile-user"
                  width={"100px"}
                  height={"100px"}
                  style={{ cursor: "pointer", borderRadius: "5px" }}
                  src={`../../../assets/user.png`}
                />
              </Box>
              <Box textAlign={"center"}>
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {auth.username}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  User Role
                </Typography>
              </Box>
            </Box>
          )}

          {/*  Menu items */}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              setSidebarSelected={setSidebarSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                mx: "15px 0 5px 20px",
                textAlign: isCollapsed ? "center" : null,
              }}
            >
              Data
            </Typography>
            <SubMenu title="Employees" icon={<BadgeOutlinedIcon />}>
              <Item
                title="List"
                to="/employees"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                setSidebarSelected={setSidebarSelected}
              />
              <Item
                title="Add New"
                to="/employees/addnew"
                icon={<PersonAddOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                setSidebarSelected={setSidebarSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

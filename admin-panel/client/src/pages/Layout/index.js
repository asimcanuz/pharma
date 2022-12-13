import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "../../components/Topbar";

export default function Layout(params) {
  return (
    <main className="content">
      {/* TOPBAR */}
      <Topbar />
      <Box m="20px">
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Outlet />
        </Box>
      </Box>
    </main>
  );
}

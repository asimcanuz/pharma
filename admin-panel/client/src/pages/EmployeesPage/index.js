import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../contexts/theme";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UpdateIcon from "@mui/icons-material/UpdateOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import useAuth from "../../hooks/useAuth";
function EmployeesPage() {
  const [employees, setEmployees] = useState();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, setLocalAuth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEmployees = async () => {
      try {
        const response = await axiosPrivate.get("/employee", {
          signal: controller.signal,
        });
        isMounted && setEmployees(response.data);
      } catch (err) {
        console.error(err);
        setAuth({});
        setLocalAuth({});
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getEmployees();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastname",
      headerName: "Last Name",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Options",
      headerName: "Options",
      headerAlign: "left",
      align: "left",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width={"100%"}
            m="0 auto"
            p={"5px"}
            display="flex"
            justifyContent={"flex-end"}
            rowGap={"6px"}
          >
            <Button
              variant="contained"
              startIcon={<UpdateIcon />}
              sx={{ background: colors.greenAccent[400], mr: "6px" }}
              LinkComponent={Link}
              to={`/employees/${id}`}
            >
              Update
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              sx={{ background: colors.redAccent[400] }}
            >
              <Typography sx={{ mr: 2, display: { sm: "none", md: "block" } }}>
                Delete
              </Typography>
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title={"Employees"} subTitle="Your employees" />
      <Box m={"40px 0 0 0"}>
        <Box
          m="40px 0 0 0"
          height={"75vh"}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              background: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              background: colors.blueAccent[700],
            },
          }}
        >
          {employees && <DataGrid rows={employees} columns={columns} />}
        </Box>
      </Box>
    </Box>
  );
}

export default EmployeesPage;

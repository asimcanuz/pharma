import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../contexts/theme";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UpdateIcon from "@mui/icons-material/UpdateOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlined from "@mui/icons-material/AddOutlined";

import useAuth from "../../hooks/useAuth";
import SnackBar from "../../components/SnackBar";
const delete_uri = "/employee/delete";

function EmployeesPage() {
  const [employees, setEmployees] = useState();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, setLocalAuth } = useAuth();

  const [updateAlert, setUpdateAlert] = useState({
    isOpen: false,
    transition: "fade",
    name: "update",
    message: "",
  });
  const handleDelete = async (id) => {
    const controller = new AbortController();

    try {
      const response = await axiosPrivate.delete(delete_uri + `/${id}`, {
        signal: controller.signal,
      });
      if (response.status === 200) {
        setUpdateAlert({
          ...updateAlert,
          isOpen: true,
          message: "Delete successful",
          type: "alert",
          severity: "success",
        });
      }
      const _employees = employees.filter((emp) => emp.id !== id);
      setEmployees(_employees);
    } catch (err) {
      setUpdateAlert({
        ...updateAlert,
        isOpen: true,
        message: "Delete error",
        type: "alert",
        severity: "error",
      });
    }
  };
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
              onClick={() => handleDelete(id)}
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
        <Box display={"flex"} justifyContent="end">
          <Button
            variant="contained"
            sx={{ background: colors.greenAccent[600], mr: "6px" }}
            startIcon={<AddOutlined />}
            LinkComponent={Link}
            to={`/employees/addnew`}
          >
            Add New Employee
          </Button>
        </Box>
        <Box
          m="20px 0 0 0"
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
        <SnackBar
          isOpen={updateAlert.isOpen}
          onClose={() => setUpdateAlert({ ...updateAlert, isOpen: false })}
          message={updateAlert.message}
          name={updateAlert.name}
          type={updateAlert.type}
          transition={"fade"}
          severity={updateAlert.severity}
        />
      </Box>
    </Box>
  );
}

export default EmployeesPage;

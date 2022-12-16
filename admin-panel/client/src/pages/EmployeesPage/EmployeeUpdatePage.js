import { useTheme } from "@emotion/react";
import { Box, Button, Fade, TextField, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../contexts/theme";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { employeeData, getEmployeeAsync } from "../../features/employeeSlice";
import SnackBar from "../../components/SnackBar";
const getOne = "/employee";
const update = "/employee/update";
const delete_uri = "/employee/delete";

const employeeSchema = yup.object().shape({
  firstname: yup.string().required("required"),
  lastname: yup.string().required("required"),
});

function EmployeeUpdatePage() {
  const employee = useSelector(employeeData);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { setAuth, setLocalAuth } = useAuth();
  const dispatch = useDispatch();

  const [updateAlert, setUpdateAlert] = useState({
    isOpen: false,
    transition: "fade",
    name: "update",
    message: "",
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEmployeeById = async () => {
      try {
        const response = await axiosPrivate.get(getOne + `/${id}`, {
          signal: controller.signal,
        });
        isMounted && dispatch(getEmployeeAsync(response));
        if (response.status === 200) {
        }
      } catch (err) {
        console.error(err);
        setAuth({});
        setLocalAuth({});
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getEmployeeById();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleDelete = async () => {
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
        navigate("/employees", { replace: true });
      }
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
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = async (values) => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.put(update + `/${id}`, values, {
        signal: controller.signal,
      });
      if (response.status === 200) {
        setUpdateAlert({
          ...updateAlert,
          isOpen: true,
          message: "Update successful",
          type: "alert",
          severity: "success",
        });
      }
    } catch (err) {
      console.error(err);
      setAuth({});
      setLocalAuth({});
      navigate("/login", { state: { from: location }, replace: true });
      setUpdateAlert({
        ...updateAlert,
        isOpen: true,
        message: "Update error",
        type: "alert",
        severity: "error",
      });
    }
  };
  return (
    <Box m="20px">
      <Header title={"Update Employee"} subTitle={"Update a Employee"} />
      {employee && (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={employee}
          validationSchema={employeeSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display={"grid"}
                gap="30px"
                gridTemplateColumns={"repeat(4,minmax(0,1fr))"}
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="standard"
                  type={"text"}
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstname}
                  name="firstname"
                  error={!!touched.firstname && !!errors.firstname}
                  helperText={touched.firstname && errors.firstname}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="standard"
                  type={"text"}
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
                  name="lastname"
                  error={!!touched.lastname && !!errors.lastname}
                  helperText={touched.lastname && errors.lastname}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
              <Box display={"flex"} justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Update User
                </Button>
                <Button
                  type="button"
                  color="error"
                  variant="contained"
                  onClick={handleDelete}
                >
                  Delete User
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
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
  );
}

export default EmployeeUpdatePage;

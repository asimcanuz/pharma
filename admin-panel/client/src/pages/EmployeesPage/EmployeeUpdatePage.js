import { useTheme } from "@emotion/react";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../contexts/theme";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import * as yup from "yup";
import { Formik } from "formik";

const employeeSchema = yup.object().shape({
  firstname: yup.string().required("required"),
  lastname: yup.string().required("required"),
});

function EmployeeUpdatePage() {
  const [employee, setEmployee] = useState();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { setAuth, setLocalAuth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEmployeeById = async () => {
      try {
        const response = await axiosPrivate.get(`/employee/${id}`, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setEmployee(response.data);
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
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
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
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
}

export default EmployeeUpdatePage;

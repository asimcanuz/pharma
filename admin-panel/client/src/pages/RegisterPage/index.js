import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useState } from "react";
import { tokens } from "../../contexts/theme";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as yup from "yup";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const REGISTER_URL = "/auth/register";
const LOGIN_URL = "/auth/login";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link component={RouterLink} color="inherit" to={"/"}>
        Pharma
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const initialValues = {
  username: "",
  password: "",
  firstname: "",
  email: "",
  lastname: "",
};

const loginSchema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
  firstname: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  email: yup.string().email("Invalid email format").required("Required"),
});

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};
function RegisterPage() {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || "/dashboard";
  const [auth, setLocalAuth] = useLocalStorage("auth", {});
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(REGISTER_URL, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 201) {
        const loginResponse = await axios.post(LOGIN_URL, values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const authObj = {
          username: values.username,
          password: values.password,
          accessToken: loginResponse.data.accessToken,
          refreshToken: loginResponse.data.refreshToken,
        };
        setAuth(authObj);
        setLocalAuth(authObj);
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component={motion.div}
        animate={{
          transition: {
            staggerChildren: 0.55,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={animate}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Head */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: color.greenAccent[400] }}>
                <LockOutlinedIcon sx={{ color: color.grey[900] }} />
              </Avatar>
              <Typography component={"h1"} variant="h5">
                Sign Up
              </Typography>
            </Box>

            <Formik
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={loginSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <Box component={"form"} onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        sx={{ borderColor: color.grey[100] }}
                        variant="filled"
                        type={"text"}
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                        id="firstname"
                        label="First Name"
                        name="firstname"
                        value={values.firstname}
                        error={!!touched.firstname && !!errors.firstname}
                        helperText={touched.firstname && errors.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        sx={{ borderColor: color.grey[100] }}
                        variant="filled"
                        type={"text"}
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lastname"
                        value={values.lastname}
                        error={!!touched.lastname && !!errors.lastname}
                        helperText={touched.lastname && errors.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        sx={{ borderColor: color.grey[100] }}
                        variant="filled"
                        type={"text"}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        value={values.username}
                        error={!!touched.username && !!errors.username}
                        helperText={touched.username && errors.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        sx={{ borderColor: color.grey[100] }}
                        variant="filled"
                        type={"text"}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={values.email}
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type={showPassword ? "text" : "password"}
                        margin="normal"
                        variant="filled"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        value={values.password}
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value="allowExtraEmails" color="primary" />
                        }
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          background: color.greenAccent[400],
                        }}
                      >
                        Sign Up
                      </Button>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link
                          component={RouterLink}
                          to="/login"
                          sx={{
                            color: color.grey["600"],
                            "$:active": { color: color.grey["600"] },
                            "$:focused": { color: color.grey["600"] },
                          }}
                        >
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Formik>
            <Copyright sx={{ mt: 8, mb: 4, color: color.grey["600"] }} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;

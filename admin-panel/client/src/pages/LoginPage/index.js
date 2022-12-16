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
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";
import * as yup from "yup";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useLocalStorage } from "../../hooks/useLocalStorage";

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
};

const loginSchema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
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
function LoginPage() {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || "/dashboard";
  const [localAuth, setLocalAuth] = useLocalStorage("auth", {});
  const [error, setError] = useState({ err: false, message: "" });
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(LOGIN_URL, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const authObj = {
        username: values.username,
        password: values.password,
        accessToken: response.data.accessToken,
      };
      setAuth(authObj);
      setLocalAuth(authObj);
      setError({ err: false, message: "" });

      navigate(from, { replace: true });
    } catch (err) {
      setError({ err: true, message: err.response.data.message });
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
                Sign in
              </Typography>
            </Box>

            {error.err && (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setError({ err: false, message: "" });
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity="error"
                sx={{ marginTop: "12px" }}
              >
                {error.message}
              </Alert>
            )}

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
                <Box component={"form"} onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    sx={{ borderColor: color.grey[100] }}
                    variant="filled"
                    type={"text"}
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="username"
                    id="username"
                    label="Username"
                    name="username"
                    value={values.username}
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    variant="filled"
                    required
                    fullWidth
                    autoComplete="password"
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
                  <FormControlLabel
                    disabled
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: color.greenAccent[400],
                    }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        component={RouterLink}
                        to="#"
                        sx={{
                          color: color.grey["600"],
                          "$:active": { color: color.grey["600"] },
                          "$:focused": { color: color.grey["600"] },
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        component={RouterLink}
                        to="/register"
                        sx={{
                          color: color.grey["600"],
                          "$:active": { color: color.grey["600"] },
                          "$:focused": { color: color.grey["600"] },
                        }}
                      >
                        Don't have an account? Sign Up
                      </Link>
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

export default LoginPage;

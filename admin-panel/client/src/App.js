import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { ColorModeContext, useMode } from "./contexts/theme";
import useAuth from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeUpdatePage from "./pages/EmployeesPage/EmployeeUpdatePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfile from "./pages/UserProfile";
import PrivateRoute from "./Routes/PrivateRoutes";
import EmployeeAddNewPage from "./pages/EmployeesPage/EmployeeAddNewPage";

// create a query client
const queryClient = new QueryClient();

function App() {
  const [theme, colorMode] = useMode();
  const { auth } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {auth.username && <Sidebar />}
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/user"
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/employees"
                  element={
                    <PrivateRoute>
                      <EmployeesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/employees/:id"
                  element={
                    <PrivateRoute>
                      <EmployeeUpdatePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/employees/addnew"
                  element={
                    <PrivateRoute>
                      <EmployeeAddNewPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/test"
                  element={
                    <PrivateRoute>
                      <div>test</div>
                    </PrivateRoute>
                  }
                />
              </Route>
            </Routes>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

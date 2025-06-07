import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./pages/login";
import { CreateShift } from "./ShiftAssignment/CreateShift";
import Dashboard from "./pages/dashboard";
import { ViewAllShiftTable } from "./ShiftAssignment/ViewShiftTable";

import AddStaff from "./pages/addStaff";
import ViewStaff from "./pages/Viewstaff";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
      dark: "#1976D2",
      light: "#64B5F6",
    },
    secondary: {
      main: "#4CAF50",
      dark: "#388E3C",
      light: "#81C784",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});
const useAuth = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return { isAuthenticated };
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
const NotFound = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center",
    }}
  >
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/login" style={{ color: "#2196F3", textDecoration: "none" }}>
      Go to Login
    </a>
  </div>
);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scheduler"
              element={
                <ProtectedRoute>
                  <CreateShift />
                </ProtectedRoute>
              }
            />

            <Route
              path="/viewSifts"
              element={
                <ProtectedRoute>
                  <ViewAllShiftTable />
                </ProtectedRoute>
              }
            />

            <Route path="/staff" element={<ViewStaff />} />
            <Route path="/createstaff" element={<AddStaff />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

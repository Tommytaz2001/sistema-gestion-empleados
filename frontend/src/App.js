import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout'; 

import Empleados from './pages/Empleados';
import Sucursales from './pages/Sucursales';
import Asignaciones from './pages/Asignaciones';
import Dashboard from './pages/Dashboard'; // Importar Dashboard

const theme = createTheme({
  palette: {
    primary: {
      main: '#673AB7',
    },
    secondary: {
      main: '#4CAF50',
    },
    background: {
      default: '#F4F6F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="/asignaciones" element={<Asignaciones />} />
            <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Cambiar ruta por defecto a dashboard */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

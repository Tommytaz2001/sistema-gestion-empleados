import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, Typography, Box, CircularProgress, Paper } from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const StatCard = ({ title, value, icon, subtitle, color, sx }) => (
  <Card sx={{
    display: 'flex',
    alignItems: 'center',
    p: 2,
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    width: '100%', // Ocupar todo el ancho del Grid item
    height: '100%', // Ocupar toda la altura del Grid item (para alineación)
    ...sx // Permitir pasar sx adicionales
  }}>
    <Box sx={{ 
      mr: 2, 
      p: 1.5, 
      borderRadius: '50%', 
      backgroundColor: `${color || '#673AB7'}20` // Light background for icon
    }}>
      {React.cloneElement(icon, { sx: { fontSize: '2rem', color: color || '#673AB7' } })}
    </Box>
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{value}</Typography>
      <Typography variant="body2" color="textSecondary">{title}</Typography>
      {subtitle && <Typography variant="caption" color="textSecondary">{subtitle}</Typography>}
    </Box>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [empleadosRecientes, setEmpleadosRecientes] = useState([]);
  const [sucursalesConEmpleados, setSucursalesConEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const statsRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/stats`);
        setStats(statsRes.data);

        const empleadosRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/empleados-recientes`);
        setEmpleadosRecientes(empleadosRes.data);

        const sucursalesRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/sucursales-con-empleados`);
        setSucursalesConEmpleados(sucursalesRes.data);

      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}> {/* Padding añadido aquí */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4 }}>
        Resumen general del sistema de gestión
      </Typography>

      {/* Sección de Estadísticas */}
      {stats && (
        <Grid container width={"100%"} spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <StatCard title="Total Empleados" value={stats.totalEmpleados} icon={<PeopleOutlineIcon />} subtitle="Empleados registrados" color="#2196F3" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <StatCard title="Total Sucursales" value={stats.totalSucursales} icon={<BusinessCenterIcon />} subtitle="Sucursales activas" color="#4CAF50" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <StatCard title="Asignaciones Activas" value={stats.asignacionesActivas} icon={<AssignmentTurnedInIcon />} subtitle="Asignaciones vigentes" color="#FF9800" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <StatCard title="Empleados Asignados" value={stats.empleadosAsignados} icon={<TrendingUpIcon />} subtitle="Con asignación activa" color="#E91E63" />
          </Grid>
        </Grid>
      )}

      {/* Sección de Empleados Recientes y Sucursales */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Empleados Recientes</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Últimos empleados registrados</Typography>
            {empleadosRecientes.length > 0 ? (
              empleadosRecientes.map(emp => (
                <Box key={emp.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, pb: 1.5, borderBottom: '1px solid #eee', '&:last-child': { borderBottom: 0, mb:0, pb:0 } }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>{emp.nombre} {emp.apellido}</Typography>
                    <Typography variant="body2" color="textSecondary">{emp.email}</Typography> {/* Podría ser el puesto si lo tuviéramos */}
                  </Box>
                  <Typography variant="body2" color="textSecondary">{new Date(emp.creado_en).toLocaleDateString()}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No hay empleados recientes.</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Sucursales</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Lista de sucursales disponibles</Typography>
            {sucursalesConEmpleados.length > 0 ? (
              sucursalesConEmpleados.map(suc => (
                <Box key={suc.sucursal_id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee', '&:last-child': { borderBottom: 0, mb:0, pb:0 } }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>{suc.sucursal_nombre}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>{suc.sucursal_direccion}</Typography>
                  {suc.empleados_asignados && suc.empleados_asignados.length > 0 && (
                    <Typography variant="caption" color="textSecondary">
                      Empleados: {suc.empleados_asignados.map(e => `${e.nombre} ${e.apellido}`).join(', ')}
                    </Typography>
                  )}
                </Box>
              ))
            ) : (
              <Typography>No hay sucursales para mostrar.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

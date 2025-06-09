import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, CssBaseline, Typography, AppBar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Icono para Dashboard
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' }, // Nueva ruta
  { text: 'Empleados', icon: <PeopleIcon />, path: '/empleados' },
  { text: 'Sucursales', icon: <BusinessIcon />, path: '/sucursales' },
  { text: 'Asignaciones', icon: <AssignmentIndIcon />, path: '/asignaciones' },
];

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed"
        sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: '#FFFFFF', // Fondo blanco para AppBar
            color: '#333333', // Color de texto oscuro para AppBar
            boxShadow: 'none', // Sin sombra para un look más plano como en la imagen del dashboard
            borderBottom: '1px solid #E0E0E0' // Borde inferior sutil
        }}
      >
        <Toolbar>
          {/* El título ahora estará en cada página, como 'Dashboard' */}
          {/* Si se desea un título global aquí, se puede reactivar */}
          {/* <Typography variant="h6" noWrap component="div">Sistema CRUD</Typography> */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#F8F9FA', // Color de fondo del sidebar similar al de la imagen
            borderRight: '1px solid #E0E0E0' // Borde sutil
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', pl: 2, height: '64px', borderBottom: '1px solid #E0E0E0' }}> 
          {/* Aquí podría ir un logo si se tuviera */}
          <Typography variant="h6" noWrap component="div" sx={{ color: '#333333', fontWeight: 'bold' }}>
            Sistema CRUD
          </Typography>
        </Toolbar>
        <Box sx={{ pt: 1, pl:1, pr:1 }}>
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', padding: '8px 16px' }}>
            Gestión
          </Typography>
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItem 
              button 
              key={item.text} 
              component={RouterLink} 
              to={item.path} 
              sx={{
                margin: '4px 8px',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)', // Hover más sutil y genérico
                },
                '&.Mui-selected': {
                  backgroundColor: theme => theme.palette.primary.main + '20', // Fondo con opacidad del color primario
                  color: theme => theme.palette.primary.main,
                  '& .MuiListItemIcon-root': {
                    color: theme => theme.palette.primary.main,
                  },
                  '&:hover': {
                    backgroundColor: theme => theme.palette.primary.main + '30',
                  }
                },
                '& .MuiListItemIcon-root': {
                  minWidth: '40px',
                  color: '#555555' // Color de icono por defecto
                }
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: '#333333' }}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', marginTop: '64px' }} // Padding eliminado, se gestionará por página
      >
        {children}
      </Box>
    </Box>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Select, 
  MenuItem, 
  Box 
} from '@mui/material';
import axios from 'axios';

function Asignaciones() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    empleado_id: '',
    sucursal_id: ''
  });

  useEffect(() => {
    fetchAsignaciones();
    fetchEmpleados();
    fetchSucursales();
  }, []);

  const fetchAsignaciones = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/empleados`);
      // response.data es un array de empleados, donde cada empleado tiene una propiedad 'sucursales'
      // que es un array de las sucursales asignadas.
      setAsignaciones(response.data || []); 
    } catch (error) {
      console.error('Error al cargar asignaciones:', error);
      setAsignaciones([]); // En caso de error, establecer un array vacío
    }
  };

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/empleados`);
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al cargar empleados:', error);
    }
  };

  const fetchSucursales = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/sucursales`);
      setSucursales(response.data);
    } catch (error) {
      console.error('Error al cargar sucursales:', error);
    }
  };

  const handleOpenDialog = () => {
    setFormData({
      empleado_id: '',
      sucursal_id: ''
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/empleados/${formData.empleado_id}/sucursales/${formData.sucursal_id}`
      );
      fetchAsignaciones();
      handleCloseDialog();
    } catch (error) {
      console.error('Error al asignar sucursal:', error);
    }
  };

  const handleDelete = async (empleadoId, sucursalId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta asignación?')) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/empleados/${empleadoId}/sucursales/${sucursalId}`
        );
        fetchAsignaciones();
      } catch (error) {
        console.error('Error al eliminar asignación:', error);
      }
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Asignar Sucursal
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Empleado</TableCell>
                <TableCell>Sucursal</TableCell>
                <TableCell>Fecha Asignación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {asignaciones.map((empleado) => (
                empleado.sucursales && empleado.sucursales.map((sucursal) => (
                  <TableRow key={`${empleado.id}-${sucursal.id}`}>
                    <TableCell>
                      {empleado.nombre} {empleado.apellido}
                    </TableCell>
                    <TableCell>{sucursal.nombre}</TableCell>
                    <TableCell>{new Date(sucursal.fecha_asignacion).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={() => handleDelete(empleado.id, sucursal.id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Asignar Sucursal</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Select
                name="empleado_id"
                label="Empleado"
                value={formData.empleado_id}
                onChange={handleChange}
                fullWidth
                required
              >
                {empleados.map((empleado) => (
                  <MenuItem key={empleado.id} value={empleado.id}>
                    {empleado.nombre} {empleado.apellido}
                  </MenuItem>
                ))}
              </Select>
              <Select
                name="sucursal_id"
                label="Sucursal"
                value={formData.sucursal_id}
                onChange={handleChange}
                fullWidth
                required
              >
                {sucursales.map((sucursal) => (
                  <MenuItem key={sucursal.id} value={sucursal.id}>
                    {sucursal.nombre}
                  </MenuItem>
                ))}
              </Select>
              <Button 
                variant="contained" 
                color="primary" 
                type="submit"
                sx={{ mt: 2 }}
              >
                Asignar
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Asignaciones;

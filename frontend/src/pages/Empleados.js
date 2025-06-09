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
  TextField,
  Box,
  Typography
} from '@mui/material';
import axios from 'axios';

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fecha_nacimiento: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + '/api/empleados');
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al cargar empleados:', error);
    }
  };

  const handleOpenDialog = (id = null) => {
    if (id) {
      const empleado = empleados.find(e => e.id === id);
      setFormData({
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        email: empleado.email,
        telefono: empleado.telefono,
        fecha_nacimiento: empleado.fecha_nacimiento ? new Date(empleado.fecha_nacimiento).toISOString().split('T')[0] : '' // Formatear para input date
      });
      setEditId(id);
    } else {
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        fecha_nacimiento: ''
      });
      setEditId(null);
    }
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
      if (editId) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/empleados/${editId}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/empleados`, formData);
      }
      fetchEmpleados();
      handleCloseDialog();
    } catch (error) {
      console.error('Error al guardar empleado:', error);
      alert('Error al guardar empleado. Verifique los datos e intente de nuevo.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/empleados/${id}`);
        fetchEmpleados();
        alert('Empleado eliminado correctamente.');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert('Error al eliminar el empleado.');
        }
        console.error('Error al eliminar empleado:', error);
      }
    }
  };

  return (
    <Container sx={{ pt: 3, pb: 3 }}> {/* Padding vertical añadido aquí */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Gestión de Empleados
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          Agregar Empleado
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Fecha Nacimiento</TableCell>
              <TableCell sx={{ textAlign: 'right'}}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empleados.map((empleado) => (
              <TableRow key={empleado.id}>
                <TableCell>{empleado.nombre}</TableCell>
                <TableCell>{empleado.apellido}</TableCell>
                <TableCell>{empleado.email}</TableCell>
                <TableCell>{empleado.telefono}</TableCell>
                <TableCell>{empleado.fecha_nacimiento ? new Date(empleado.fecha_nacimiento).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell sx={{ textAlign: 'right'}}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenDialog(empleado.id)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(empleado.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editId ? 'Editar Empleado' : 'Nuevo Empleado'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}> {/* pt:1 para espacio post DialogTitle*/}
              <TextField
                name="nombre"
                label="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="apellido"
                label="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="telefono"
                label="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="fecha_nacimiento"
                label="Fecha de Nacimiento"
                type="date"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2}}>
                <Button onClick={handleCloseDialog} color="secondary">
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {editId ? 'Actualizar' : 'Guardar'}
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Empleados;
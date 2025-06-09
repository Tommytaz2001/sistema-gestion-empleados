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

function Sucursales() {
  const [sucursales, setSucursales] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSucursales();
  }, []);

  const fetchSucursales = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/sucursales`);
      setSucursales(response.data);
    } catch (error) {
      console.error('Error al cargar sucursales:', error);
    }
  };

  const handleOpenDialog = (id = null) => {
    if (id) {
      const sucursal = sucursales.find(s => s.id === id);
      setFormData({
        nombre: sucursal.nombre,
        direccion: sucursal.direccion,
        telefono: sucursal.telefono
      });
      setEditId(id);
    } else {
      setFormData({
        nombre: '',
        direccion: '',
        telefono: ''
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
        await axios.put(`${process.env.REACT_APP_API_URL}/api/sucursales/${editId}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/sucursales`, formData);
      }
      fetchSucursales();
      handleCloseDialog();
    } catch (error) {
      console.error('Error al guardar sucursal:', error);
      alert('Error al guardar la sucursal. Verifique los datos.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta sucursal?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/sucursales/${id}`);
        fetchSucursales();
        alert('Sucursal eliminada correctamente.');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert('Error al eliminar la sucursal.');
        }
        console.error('Error al eliminar sucursal:', error);
      }
    }
  };

  return (
    <Container sx={{ pt: 3, pb: 3 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Gestión de Sucursales
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          Agregar Sucursal
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell sx={{ textAlign: 'right'}}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sucursales.map((sucursal) => (
              <TableRow key={sucursal.id}>
                <TableCell>{sucursal.nombre}</TableCell>
                <TableCell>{sucursal.direccion}</TableCell>
                <TableCell>{sucursal.telefono}</TableCell>
                <TableCell sx={{ textAlign: 'right'}}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenDialog(sucursal.id)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(sucursal.id)}
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
          {editId ? 'Editar Sucursal' : 'Nueva Sucursal'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                name="nombre"
                label="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="direccion"
                label="Dirección"
                value={formData.direccion}
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

export default Sucursales;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL === 'true'
});

// Helper functions to check for active assignments
const tieneAsignacionesEmpleado = async (empleadoId) => {
  const result = await pool.query(
    'SELECT COUNT(*) FROM empleados_sucursales WHERE empleado_id = $1',
    [empleadoId]
  );
  return parseInt(result.rows[0].count) > 0;
};

const tieneAsignacionesSucursal = async (sucursalId) => {
  const result = await pool.query(
    'SELECT COUNT(*) FROM empleados_sucursales WHERE sucursal_id = $1',
    [sucursalId]
  );
  return parseInt(result.rows[0].count) > 0;
};

// Rutas para Sucursales
app.get('/api/sucursales', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sucursales ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/sucursales', async (req, res) => {
    try {
        const { nombre, direccion, telefono } = req.body;
        const result = await pool.query(
            'INSERT INTO sucursales (nombre, direccion, telefono) VALUES ($1, $2, $3) RETURNING *',
            [nombre, direccion, telefono]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/sucursales/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, telefono } = req.body;
        const result = await pool.query(
            'UPDATE sucursales SET nombre=$1, direccion=$2, telefono=$3 WHERE id=$4 RETURNING *',
            [nombre, direccion, telefono, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/sucursales/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Verificar si la sucursal tiene asignaciones
        if (await tieneAsignacionesSucursal(id)) {
            return res.status(400).json({ 
                error: 'No se puede eliminar la sucursal porque tiene asignaciones activas. Elimine primero las asignaciones.' 
            });
        }
        await pool.query('DELETE FROM sucursales WHERE id=$1', [id]);
        res.json({ message: 'Sucursal eliminada' });
    } catch (err) {
        console.error('Error en DELETE /api/sucursales/:id:', err);
        res.status(500).json({ error: err.message });
    }
});

// Rutas para Empleados
app.get('/api/empleados', async (req, res) => {
    try {
        const query = `
            SELECT
                e.*,
                COALESCE(
                    (
                        SELECT json_agg(
                            json_build_object(
                                'id', s.id,
                                'nombre', s.nombre,
                                'direccion', s.direccion,
                                'telefono', s.telefono,
                                'fecha_asignacion', es.fecha_asignacion
                            )
                        ORDER BY s.nombre
                        )
                        FROM empleados_sucursales es
                        JOIN sucursales s ON es.sucursal_id = s.id
                        WHERE es.empleado_id = e.id
                    ),
                    '[]'::json
                ) AS sucursales
            FROM
                empleados e
            ORDER BY
                e.id DESC;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en GET /api/empleados:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/empleados', async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, fecha_nacimiento } = req.body;
        const result = await pool.query(
            'INSERT INTO empleados (nombre, apellido, email, telefono, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, apellido, email, telefono, fecha_nacimiento]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/empleados/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email, telefono, fecha_nacimiento } = req.body;
        const result = await pool.query(
            'UPDATE empleados SET nombre=$1, apellido=$2, email=$3, telefono=$4, fecha_nacimiento=$5 WHERE id=$6 RETURNING *',
            [nombre, apellido, email, telefono, fecha_nacimiento, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/empleados/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Verificar si el empleado tiene asignaciones
        if (await tieneAsignacionesEmpleado(id)) {
            return res.status(400).json({ 
                error: 'No se puede eliminar el empleado porque tiene asignaciones activas. Elimine primero las asignaciones.' 
            });
        }
        await pool.query('DELETE FROM empleados WHERE id=$1', [id]);
        res.json({ message: 'Empleado eliminado' });
    } catch (err) {
        console.error('Error en DELETE /api/empleados/:id:', err);
        res.status(500).json({ error: err.message });
    }
});

// Rutas para asignación de empleados a sucursales
app.post('/api/empleados/:empleadoId/sucursales/:sucursalId', async (req, res) => {
    try {
        const { empleadoId, sucursalId } = req.params;
        const result = await pool.query(
            'INSERT INTO empleados_sucursales (empleado_id, sucursal_id) VALUES ($1, $2) RETURNING *',
            [empleadoId, sucursalId]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/empleados/:empleadoId/sucursales/:sucursalId', async (req, res) => {
    try {
        const { empleadoId, sucursalId } = req.params;
        await pool.query(
            'DELETE FROM empleados_sucursales WHERE empleado_id=$1 AND sucursal_id=$2',
            [empleadoId, sucursalId]
        );
        res.json({ message: 'Asignación eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rutas para el Dashboard

// Endpoint para estadísticas generales
app.get('/api/dashboard/stats', async (req, res) => {
    try {
        const totalEmpleadosPromise = pool.query('SELECT COUNT(*) AS total FROM empleados');
        const totalSucursalesPromise = pool.query('SELECT COUNT(*) AS total FROM sucursales');
        const asignacionesActivasPromise = pool.query('SELECT COUNT(*) AS total FROM empleados_sucursales');
        const empleadosAsignadosPromise = pool.query('SELECT COUNT(DISTINCT empleado_id) AS total FROM empleados_sucursales');

        const [totalEmpleadosRes, totalSucursalesRes, asignacionesActivasRes, empleadosAsignadosRes] = await Promise.all([
            totalEmpleadosPromise,
            totalSucursalesPromise,
            asignacionesActivasPromise,
            empleadosAsignadosPromise
        ]);

        res.json({
            totalEmpleados: parseInt(totalEmpleadosRes.rows[0].total),
            totalSucursales: parseInt(totalSucursalesRes.rows[0].total),
            asignacionesActivas: parseInt(asignacionesActivasRes.rows[0].total),
            empleadosAsignados: parseInt(empleadosAsignadosRes.rows[0].total)
        });
    } catch (err) {
        console.error('Error en GET /api/dashboard/stats:', err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint para empleados recientes (últimos 5)
app.get('/api/dashboard/empleados-recientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nombre, apellido, email, fecha_nacimiento, creado_en FROM empleados ORDER BY creado_en DESC LIMIT 5');
        res.json(result.rows);
    } catch (err) {
        console.error('Error en GET /api/dashboard/empleados-recientes:', err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint para sucursales con algunos empleados asignados (últimas 3 sucursales, con hasta 3 empleados cada una)
app.get('/api/dashboard/sucursales-con-empleados', async (req, res) => {
    try {
        const query = `
            SELECT 
                s.id AS sucursal_id, 
                s.nombre AS sucursal_nombre, 
                s.direccion AS sucursal_direccion,
                COALESCE(
                    (
                        SELECT json_agg(
                            json_build_object('id', e.id, 'nombre', e.nombre, 'apellido', e.apellido)
                        ORDER BY e.nombre
                        )
                        FROM (
                            SELECT e_inner.id, e_inner.nombre, e_inner.apellido
                            FROM empleados e_inner
                            JOIN empleados_sucursales es_inner ON e_inner.id = es_inner.empleado_id
                            WHERE es_inner.sucursal_id = s.id
                            ORDER BY e_inner.nombre
                            LIMIT 3 -- Mostrar hasta 3 empleados por sucursal
                        ) e
                    ), 
                    '[]'::json
                ) AS empleados_asignados
            FROM sucursales s
            ORDER BY s.creado_en DESC
            LIMIT 3; -- Mostrar las últimas 3 sucursales
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en GET /api/dashboard/sucursales-con-empleados:', err);
        res.status(500).json({ error: err.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

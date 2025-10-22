const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// --- EJS and Static Files Configuration ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// --- Robust Database Connection ---
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true ,
    charset: 'utf8mb4'
};

let db;

function connectToDatabase() {
    console.log('Attempting database connection...');
    db = mysql.createPool(dbConfig);

    db.getConnection((err, connection) => {
        if (err) {
            console.error('[ERROR] Database connection failed:', err.message);
            console.log('Retrying connection in 5 seconds...');
            setTimeout(connectToDatabase, 5000); // Retry after 5 seconds
            return;
        }
        if (connection) {
            console.log('✅ Successfully connected to the database!');
            connection.release();
        }
    });

    db.on('error', (err) => {
        console.error('[ERROR] Database pool error:', err);
    });
}

connectToDatabase();


function fixEncoding(str) {
    if (typeof str !== 'string') return str;
    try {
        return Buffer.from(str, 'binary').toString('utf8');
    } catch {
        return str;
    }
}

function fixEncodingInObject(obj) {
    if (Array.isArray(obj)) {
        return obj.map(fixEncodingInObject);
    } else if (obj && typeof obj === 'object') {
        const fixed = {};
        for (const key in obj) {
            fixed[key] = fixEncodingInObject(obj[key]);
        }
        return fixed;
    } else {
        return fixEncoding(obj);
    }
}

// --- Routes ---

// Route to display users
app.get('/', (req, res) => {
    if (!db) return res.status(500).send('Database connection not established.');
    const query = 'SELECT * FROM usuarios ORDER BY id DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).send('Server error while fetching users.');
        }
        const fixedResults = fixEncodingInObject(results);
        res.render('index', { usuarios: fixedResults });
    });
});

// Route to display all products
app.get('/datos', (req, res) => {
    if (!db) return res.status(500).send('Database connection not established.');
    const query = 'SELECT p.*, u.nombre_completo AS autor FROM productos p JOIN usuarios u ON p.usuario_id = u.id ORDER BY p.id DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send('Server error while fetching products.');
        }
        const fixedResults = fixEncodingInObject(results);
        res.render('datos', { productos: fixedResults });
    });
});

// Ruta para agregar un nuevo producto
app.post('/agregar-producto', (req, res) => {
    if (!db) {
        return res.status(500).send('La conexión con la base de datos no está establecida.');
    }

    // 1. Extraer los datos del cuerpo de la solicitud (formulario)
    const { nombre_producto, descripcion, precio, stock, fecha_lanzamiento, usuario_id } = req.body;

    // 2. Manejar el valor del checkbox. Si no está marcado, no se envía, por lo que será 'undefined'.
    const es_disponible = req.body.es_disponible ? true : false;

    // 3. Crear un objeto con los datos del nuevo producto
    const nuevoProducto = {
        nombre_producto,
        descripcion,
        precio,
        stock,
        es_disponible,
        fecha_lanzamiento,
        usuario_id
    };

    // 4. Definir la consulta SQL para insertar los datos
    const query = 'INSERT INTO productos SET ?';

    // 5. Ejecutar la consulta
    db.query(query, nuevoProducto, (err, result) => {
        if (err) {
            // Manejo de errores
            console.error('Error al insertar el producto en la base de datos:', err);
            return res.status(500).send('Error al guardar el producto. Por favor, inténtelo de nuevo.');
        }
        
        // 6. Si todo sale bien, registrar en consola y redirigir
        console.log(`✅ Producto '${nombre_producto}' agregado con éxito con el ID: ${result.insertId}`);
        res.redirect('/datos');
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server is listening on http://localhost:${port}`);
});

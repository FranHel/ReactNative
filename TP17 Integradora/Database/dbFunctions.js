const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./dbConfig');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint para agregar un nuevo jugador
app.post('/create', (req, res) => {
  const nuevoJugador = req.body;

  const query = 'INSERT INTO jugadores SET ?';

  dbConnection.query(query, nuevoJugador, (err, result) => {
    if (err) {
      console.error('Error al agregar jugador:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
});

// Endpoint para obtener todos los jugadores
app.get('/read', (req, res) => {
  const query = 'SELECT * FROM jugadores';

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener jugadores:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(results);
    }
  });
});

app.get('/read/argentina', (req, res) => {
  const query = 'SELECT * FROM jugadores WHERE Nacionalidad = "Argentina"';

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener jugadores argentinos:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(results);
    }
  });
});

app.get('/read/weight', (req, res) => {
  const query = 'SELECT * FROM jugadores WHERE Peso BETWEEN 75 AND 80';

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener jugadores por peso:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(results);
    }
  });
});

app.get('/read/tallest', (req, res) => {
  const query = 'SELECT * FROM jugadores ORDER BY Estatura DESC LIMIT 1';

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener el jugador más alto:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(results);
    }
  });
});

// Endpoint para actualizar un jugador por ID
app.put('/update/:id', (req, res) => {
  const jugadorId = req.params.id;
  const jugadorActualizado = req.body;

  const query = 'UPDATE jugadores SET ? WHERE id = ?';

  dbConnection.query(query, [jugadorActualizado, jugadorId], (err) => {
    if (err) {
      console.error('Error al actualizar jugador:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.sendStatus(204);
    }
  });
});

// Endpoint para eliminar un jugador por ID
app.delete('/delete/:id', (req, res) => {
  const jugadorId = req.params.id;

  const query = 'DELETE FROM jugadores WHERE id = ?';

  dbConnection.query(query, jugadorId, (err) => {
    if (err) {
      console.error('Error al eliminar jugador:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

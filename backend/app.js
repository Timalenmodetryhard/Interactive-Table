require('dotenv').config({ path: '../.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const config = require('./config/db');
const tableRoutes = require('./routes/table');
const PORT = process.env.PORT_BACKEND || 3000;
const PORT_FRONTEND = process.env.PORT_FRONTEND || 3005

const app = express();

app.use(express.json());

// Connexion à MongoDB
mongoose.connect(config.uri, {
  serverSelectionTimeoutMS: 5000, // Temps limite pour sélectionner un serveur
})
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

// Configuration CORS
app.use(cors({
  origin: `http://localhost:${PORT_FRONTEND}`, // Adresse du frontend
  methods: ['GET', 'POST', 'DELETE'],       // Méthodes autorisées
}));

// Routes
app.use('/table', tableRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

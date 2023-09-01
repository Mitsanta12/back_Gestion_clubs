const db = require('../db.js'); 

// Fonction pour créer une nouvelle cotisation
async function createCotisation(req, res) {
  const cotisation = req.body;
  try {
    const newCotisation = await db.none('INSERT INTO cotisations (montant, date, membre_id) VALUES ($1, $2, $3)', [cotisation.montant, cotisation.date, cotisation.membre_id]);
    res.status(201).json(newCotisation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la cotisation' });
  }
}

// Fonction pour obtenir la liste des cotisations
async function getCotisations(req, res) {
  try {
    const cotisations = await db.any('SELECT * FROM cotisations');
    res.status(200).json(cotisations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cotisations' });
  }
}
module.exports = {
  createCotisation,
  getCotisations
};

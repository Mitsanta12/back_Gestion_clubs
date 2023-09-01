const db = require('../db.js');

// Fonction pour créer un nouvel événement
async function createEvenement(req, res) {
  const evenement = req.body;
  try {
    const newEvenement = await db.none('INSERT INTO evenements (nom, date, club_id) VALUES ($1, $2, $3)', [evenement.nom, evenement.date, evenement.club_id]);
    res.status(201).json(newEvenement);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'événement' });
  }
}

// Fonction pour obtenir la liste des événements
async function getEvenements(req, res) {
  try {
    const evenements = await db.any('SELECT * FROM evenements');
    res.status(200).json(evenements);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
  }
}

// Fonction pour obtenir les détails d'un événement par son ID
async function getEvenementById(req, res) {
  const evenementId = req.params.evenement_id;
  try {
    const evenement = await db.one('SELECT * FROM evenements WHERE id = $1', evenementId);
    res.status(200).json(evenement);
  } catch (error) {
    res.status(404).json({ message: 'Événement non trouvé' });
  }
}

// Fonction pour mettre à jour les informations d'un événement
async function updateEvenement(req, res) {
  const evenementId = req.params.evenement_id;
  const updatedEvenement = req.body;
  try {
    const updated = await db.result('UPDATE evenements SET nom=$1, date=$2, club_id=$3 WHERE id=$4', [updatedEvenement.nom, updatedEvenement.date, updatedEvenement.club_id, evenementId]);
    if (updated.rowCount === 0) {
      throw new Error('Événement non trouvé');
    }
    res.status(200).json(updatedEvenement);
  } catch (error) {
    res.status(404).json({ message: 'Événement non trouvé' });
  }
}

// Fonction pour supprimer un événement
async function deleteEvenement(req, res) {
  const evenementId = req.params.evenement_id;
  try {
    const deleted = await db.result('DELETE FROM evenements WHERE id = $1', evenementId);
    if (deleted.rowCount === 0) {
      throw new Error('Événement non trouvé');
    }
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Événement non trouvé' });
  }
}

module.exports = {
  createEvenement,
  getEvenements,
  getEvenementById,
  updateEvenement,
  deleteEvenement
};

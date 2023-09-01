const db = require('../db.js'); 

// Fonction pour créer une nouvelle annonce
async function createAnnonce(req, res) {
  const annonce = req.body;
  try {
    const newAnnonce = await db.none('INSERT INTO annonces (titre, contenu, club_id) VALUES ($1, $2, $3)', [annonce.titre, annonce.contenu, annonce.club_id]);
    res.status(201).json(newAnnonce);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'annonce' });
  }
}

// Fonction pour obtenir la liste des annonces
async function getAnnonces(req, res) {
  try {
    const annonces = await db.any('SELECT * FROM annonces');
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des annonces' });
  }
}

// Fonction pour obtenir les détails d'une annonce par son ID
async function getAnnonceById(req, res) {
  const annonceId = req.params.annonce_id;
  try {
    const annonce = await db.one('SELECT * FROM annonces WHERE annonce_id = $1', annonceId);
    res.status(200).json(annonce); 
  } catch (error) {
    res.status(404).json({ message: 'Annonce non trouvé' });
  }
}

// Fonction pour mettre à jour les informations d'une annonce
async function updateAnnonce(req, res) {
  const annonceId = req.params.annonce_id;
  const updatedAnnonce = req.body;
  try {
    const updated = await db.result('UPDATE annonces SET titre=$1, contenu=$2, club_id=$3 WHERE annonce_id=$4', [updatedAnnonce.titre, updatedAnnonce.contenu, updatedAnnonce.club_id, annonceId]);
    if (updated.rowCount === 0) {
      throw new Error('Annonce non trouvée');
    }
    res.status(200).json(updatedAnnonce);
  } catch (error) {
    res.status(404).json({ message: 'Annonce non trouvée' });
  }
}


// Fonction pour supprimer une annonce
async function deleteAnnonce(req, res) {
  const annonceId = req.params.annonce_id;
  try {
    const deleted = await db.result('DELETE FROM annonces WHERE annonce_id = $1', annonceId);
    if (deleted.rowCount === 0) {
      throw new Error('Annonce non trouvée');
    }
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Annonce non trouvée' });
  }
}

module.exports = {
  createAnnonce,
  getAnnonces,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce
};

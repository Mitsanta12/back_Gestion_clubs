const db = require('../db.js'); 
// Fonction pour créer un nouveau club
async function createClub(req, res) {
  const club = req.body;
  try {
    const newClub = await db.none('INSERT INTO clubs (nom, description, responsable_name) VALUES ($1, $2, $3)', [club.nom, club.description, club.responsable_name]);
    res.status(201).json(newClub);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du club' });
  }
}

// Fonction pour obtenir la liste des clubs
async function getClubs(req, res) {
  try {
    const clubs = await db.any('SELECT * FROM clubs');
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des clubs' });
  }
}

// Fonction pour obtenir les détails d'un club par son ID
async function getClubById(req, res) {
  const clubId = req.params.club_id;
  try {
    const club = await db.one('SELECT * FROM clubs WHERE club_id = $1', clubId);
    res.status(200).json(club);
  } catch (error) {
    res.status(404).json({ message: 'Club non trouvé' });
  }
}

// Fonction pour mettre à jour les informations d'un club
async function updateClub(req, res) {
  const clubId = req.params.club_id;
  const updatedClub = req.body;
  try {
    const updated = await db.result('UPDATE clubs SET nom=$1, description=$2, responsable_name=$3 WHERE club_id=$4', [updatedClub.nom, updatedClub.description, updatedClub.responsable_name, clubId]);
    if (updated.rowCount === 0) {
      throw new Error('Club non trouvé');
    }
    res.status(200).json(updatedClub);
  } catch (error) {
    res.status(404).json({ message: 'Club non trouvé' });
  }
}


async function deleteClub(req, res) {
  const clubId = req.params.club_id;
  try {
    // Supprimer les membres associés au club
    await db.query('DELETE FROM members WHERE club_id = $1', clubId);

    // Ensuite, supprimer le club
    const deleted = await db.result('DELETE FROM clubs WHERE club_id = $1', clubId);
    if (deleted.rowCount === 0) {
      throw new Error('Club non trouvé');
    }

    console.log('Club et membres associés supprimés avec succès');
    res.status(204).send();
  } catch (error) {
    console.error('Erreur lors de la suppression du club :', error);
    res.status(404).json({ message: 'Club non trouvé' });
  }
}



module.exports = {
  createClub,
  getClubs,
  getClubById,
  updateClub,
  deleteClub
};

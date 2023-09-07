const db = require('../db.js'); 

async function createMember(req, res) {
  const member = req.body;

  // Validation des données 
  if (!member.nom || !member.prenom || !member.email || !member.numero_telephone || !member.club_id) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  try {
    const newMember = await db.none(
      'INSERT INTO members (nom, prenom, email, numero_telephone, club_id) VALUES ($1, $2, $3, $4, $5)',
      [member.nom, member.prenom, member.email, member.numero_telephone, member.club_id]
    );
    res.status(201).json(newMember);
  } catch (error) {
    console.error('Erreur lors de la création du membre :', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du membre.' });
  }
}


async function getMembers(req, res) {
  try {
    const members = await db.any('SELECT * FROM members');
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving members' });
  }
}

async function getMemberById(req, res) {
  const memberId = req.params.member_id;
  try {
    const member = await db.one('SELECT * FROM members WHERE member_id = $1', memberId);
    res.status(200).json(member);
  } catch (error) {
    res.status(404).json({ message: 'Member not found' });
  }
}

async function updateMember(req, res) {
  const memberId = req.params.member_id;
  const updatedMember = req.body;
  try {
    const updated = await db.result('UPDATE members SET nom=$1, prenom=$2, club_id=$3 WHERE member_id=$4', [updatedMember.nom, updatedMember.prenom, updatedMember.club_id, memberId]);
    if (updated.rowCount === 0) {
      throw new Error('Member not found');
    }
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(404).json({ message: 'Member not found' });
  }
}

async function deleteMember(req, res) {
  const memberId = req.params.member_id;
  try {
    const deleted = await db.result('DELETE FROM members WHERE member_id = $1', memberId);
    if (deleted.rowCount === 0) {
      throw new Error('Member not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Member not found' });
  }
}

async function getMembersByClub(req, res) {
  const clubId = req.params.club_id;
  try {
    const members = await db.any('SELECT * FROM members WHERE club_id = $1', clubId);
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving members' });
  }
}

module.exports = {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
  getMembersByClub 
};

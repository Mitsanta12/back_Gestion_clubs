const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const clubsController = require('./Controllers/clubsController');
const membersController = require('./Controllers/membersController'); 
const cotisationsController = require('./Controllers/cotisationsController');
const evenementsController = require('./Controllers/evenementsController');
const annoncesController = require('./Controllers/annoncesController');
//http://127.0.0.1:5500/

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send("Bienvenue sur l'API de CotiCota, utiliser les endpoint pour tout consulter exemples: /clubs ");
});

// Routes des clubs
app.post('/create_club', clubsController.createClub);
app.get('/clubs', clubsController.getClubs);
app.get('/clubs/:club_id', clubsController.getClubById);
app.put('/edit_club/:club_id', clubsController.updateClub);
app.delete('/delete_clubs/:club_id', clubsController.deleteClub);

// Routes des membres
app.post('/create_members', membersController.createMember);
app.get('/members', membersController.getMembers);
app.get('/members/:member_id', membersController.getMemberById);
app.put('/members/:member_id', membersController.updateMember);
app.delete('/members/:member_id', membersController.deleteMember);
app.get('/members/clubs/:club_id', membersController.getMembersByClub);


// Routes des cotisations
app.post('/cotisations', cotisationsController.createCotisation);
app.get('/cotisations', cotisationsController.getCotisations);

// Routes des événements
app.post('/evenements', evenementsController.createEvenement);
app.get('/evenements', evenementsController.getEvenements);
app.get('/evenements/:evenement_id', evenementsController.getEvenementById);
app.put('/evenements/:evenement_id', evenementsController.updateEvenement);
app.delete('/evenements/:evenement_id', evenementsController.deleteEvenement);

// Routes des annonces
app.post('/annonces', annoncesController.createAnnonce);
app.get('/annonces', annoncesController.getAnnonces);
app.delete('/annonces/:annonce_id', annoncesController.deleteAnnonce);
app.get('/annonces/:annonce_id', annoncesController.getAnnonceById);
app.put('/edit_annonce/:annonce_id', annoncesController.updateAnnonce);




// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});

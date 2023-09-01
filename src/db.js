const pgp = require('pg-promise')();

const connectionOptions = {
    host: 'localhost',
    port: 5432,
    database: 'coticota',
    user: 'postgres',
    password: 'NY AINA@2022'
  };
  

const db = pgp(connectionOptions);

// Ajoutez un console.log pour afficher un message de connexion réussie
db.connect()
  .then(obj => {
    console.log('Connecté à la base de données');
    obj.done(); // Libère le connecteur de la piscine
  })
  .catch(error => {
    console.error('Erreur de connexion à la base de données:', error);
  });
module.exports = db;

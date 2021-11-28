const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompanySchema = new Schema({
  siren: String,
  nic: String,
  siret: String,
  dateCreationEtablissement: String,
  dateDernierTraitementEtablissement: String,
  typeVoieEtablissement: String,
  libelleVoieEtablissement: String,
  codePostalEtablisssement: String,
  dateDebut: String,
  etatAdministratifEtablisssement: String,
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = { Company };

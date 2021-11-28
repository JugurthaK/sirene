const csvLineToJson = (line) => {
  const [
    siren,
    nic,
    siret,
    dateCreationEtablissement,
    dateDernierTraitementEtablissement,
    typeVoieEtablissement,
    libelleVoieEtablissement,
    codePostalEtablissement,
    libelleCommuneEtablissement,
    codeCommuneEtablissement,
    dateDebut,
    etatAdministratifEtablissement,
  ] = line.split(',');

  return {
    siren,
    nic,
    siret,
    dateCreationEtablissement,
    dateDernierTraitementEtablissement,
    typeVoieEtablissement,
    libelleVoieEtablissement,
    codePostalEtablissement,
    libelleCommuneEtablissement,
    codeCommuneEtablissement,
    dateDebut,
    etatAdministratifEtablissement,
  };
};

module.exports = csvLineToJson;

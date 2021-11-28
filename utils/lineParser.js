const csvLineToJson = (row) => {
  var res = row.split(',');

  const result = {
    siren: res[0] || undefined,
    nic: res[1] || undefined,
    siret: res[2] || undefined,
    dateCreationEtablissement: res[4] || undefined,
    dateDernierTraitementEtablissement: res[8] || undefined,
    typeVoieEtablissement: res[14] || undefined,
    libelleVoieEtablissement: res[15] || undefined,
    codePostalEtablisssement: res[16] || undefined,
    dateDebut: res[39] || undefined,
    etatAdministratifEtablisssement: res[40] || undefined,
  };
  return result;
};

module.exports = csvLineToJson;

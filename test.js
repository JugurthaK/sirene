const lineParser = require('./utils/lineParser');

const line =
  '000325175,00016,00032517500016,O,2000-09-26,,,3212ZZ,2015-03-18T00:58:59,false,3,,,,,MANIHI COTE MONTAGNE TUAMOTU,98770,MANIHI,,,98727,,,,,,,,,,,,,,,,,,,2009-05-27,F,,,,,32.12Z,NAFRev2,N';

const res = { insertOne: lineParser(line) };

console.log(res);

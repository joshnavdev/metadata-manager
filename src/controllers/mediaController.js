// const exifParser = require('exif-parser');
// const { ExifImage } = require('exif');

const piexif = require('piexifjs');
// const parser = require('xml2json');
const jsontoxml = require('jsontoxml');

async function getMetadata(req, res) {
  const { buffer } = req.file;

  const imageData = `data:image/jpeg;base64,${buffer.toString('base64')}`;

  const exifObj = piexif.load(imageData);

  res.json(exifObj.Exif);
}

async function setMetadata(req, res) {
  const { buffer } = req.file;

  // Convierto el buffer en base64
  const imageData = `data:image/jpeg;base64,${buffer.toString('base64')}`;
  // Obtengo la metadata en un object
  const exifObj = piexif.load(imageData);
  // Obtener xml from data
  const data = Object.assign({}, req.body);
  data.InfoAutoPopulated = true;
  data.PhotoType = 'SCPhoto';
  const fullData = { ChildPhotoMetaData: [data] };

  const xmlData = jsontoxml(fullData, { xmlHeader: true });

  const fullXml = xmlData.replace(
    /<ChildPhotoMetaData>/,
    '<ChildPhotoMetaData xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">',
  );
  exifObj.Exif[piexif.ExifIFD.UserComment] = fullXml;
  // Cambio el object a string para insertarlo a la imagen
  const exifStr = piexif.dump(exifObj);

  // inserto metadataa 'exiftStr' a la iamgen y obtenego la data en bintario base64
  const newImage = piexif.insert(exifStr, imageData);

  const bufferImage = Buffer.from(newImage.replace('data:image/jpeg;base64,', ''), 'base64');

  res.contentType('image/jpeg');
  res.send(bufferImage);
}

module.exports = {
  getMetadata,
  setMetadata,
};

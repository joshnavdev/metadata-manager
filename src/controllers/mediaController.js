// const exifParser = require('exif-parser');
// const { ExifImage } = require('exif');

const _ = require('lodash');
const piexif = require('piexifjs');
// const parser = require('xml2json');
const jsontoxml = require('jsontoxml');

async function getMetadata(req, res) {
  const { buffer } = req.file;
  console.log(req.file);

  if (!_.includes(req.file.mimetype, 'jpeg')) {
    return res.status(400).json({ message: 'La imagen debe ser JPEG' });
  }

  const imageData = `data:image/jpeg;base64,${buffer.toString('base64')}`;

  const exifObj = piexif.load(imageData);

  return res.json(exifObj.Exif);
}

async function setMetadata(req, res) {
  const { buffer } = req.file;

  if (!_.includes(req.file.mimetype, 'jpeg')) {
    return res.status(400).json({ message: 'La imagen debe ser JPEG' });
  }

  // Convierto el buffer en base64
  const imageData = `data:image/jpeg;base64,${buffer.toString('base64')}`;
  // Obtengo la metadata en un object
  const exifObj = piexif.load(imageData);
  // Obtener xml from data
  const data = Object.assign({}, req.body);
  data.InfoAutoPopulated = true;
  data.PhotoType = req.body.PhotoType || 'SCPhoto';

  const type = req.body.type || 'ChildPhotoMetaData';
  const fullData = { [type]: [data] };

  const xmlData = jsontoxml(fullData, { xmlHeader: true });

  const fullXml = xmlData.replace(
    `<${type}>`,
    `<${type} xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">`,
  );
  exifObj.Exif[piexif.ExifIFD.UserComment] = fullXml;
  // Cambio el object a string para insertarlo a la imagen
  const exifStr = piexif.dump(exifObj);

  // inserto metadataa 'exiftStr' a la iamgen y obtenego la data en bintario base64
  const newImage = piexif.insert(exifStr, imageData);

  const bufferImage = Buffer.from(newImage.replace('data:image/jpeg;base64,', ''), 'base64');

  res.contentType('image/jpeg');
  return res.send(bufferImage);
}

async function cropImage(req, res) {
  res.json('cropImage');
}

module.exports = {
  getMetadata,
  setMetadata,
  cropImage,
};

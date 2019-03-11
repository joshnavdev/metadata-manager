async function getMetadata(req, res) {
  res.json('getMetadata');
}

async function setMetadata(req, res) {
  res.json('setMetadata');
}

module.exports = {
  getMetadata,
  setMetadata,
}

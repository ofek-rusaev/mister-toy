const toyService = require('./toy.service')

async function getToy(req, res) {
    const toy = await toyService.getById(req.params.id)
    res.send(toy)
}
  
async function addToy(req, res) {
    var toy = req.body;
    toy = await toyService.add(toy)
    // TODO - need to find aboutUser
    res.send(toy)
}

async function getToys(req, res) {
    // console.log('getToys', req.query);
    const toys = await toyService.query(req.query)
    res.send(toys)
}

async function deleteToy(req, res) {
    await toyService.remove(req.params.id)
    res.end()
}

async function updateToy(req, res) {
    const toy = req.body;
    await toyService.update(toy)
    res.send(toy)
}

module.exports = {
    getToy,
    getToys,
    deleteToy,
    updateToy,
    addToy
}
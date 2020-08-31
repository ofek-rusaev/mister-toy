
const dbService = require('../../services/db.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    console.log('query filterBy: ', filterBy);
    
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('toy')
    try {
        // const toys = await collection.find(criteria).collation({locale: "en" }).toArray();
        const toys = await collection.find(criteria).toArray();
        if (filterBy.sort) toys.sort(_dynamicSort(filterBy.sort));
        return toys;
    } catch (err) {
        console.log('ERROR: cannot find toys')
        throw err;
    }
}

async function getById(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        const toy = await collection.findOne({"_id":ObjectId(toyId)})
        delete toy.password

        toy.givenReviews = await reviewService.query({byToyId: ObjectId(toy._id) })
        toy.givenReviews = toy.givenReviews.map(review => {
            delete review.byToy
            return review
        })


        return toy
    } catch (err) {
        console.log(`ERROR: while finding toy ${toyId}`)
        throw err;
    }
}
async function getByEmail(email) {
    const collection = await dbService.getCollection('toy')
    try {
        const toy = await collection.findOne({email})
        return toy
    } catch (err) {
        console.log(`ERROR: while finding toy ${email}`)
        throw err;
    }
}

async function remove(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        await collection.deleteOne({"_id":ObjectId(toyId)})
    } catch (err) {
        console.log(`ERROR: cannot remove toy ${toyId}`)
        throw err;
    }
}

async function update(toy) {
    const collection = await dbService.getCollection('toy')
    toy._id = ObjectId(toy._id);

    try {
        await collection.replaceOne({"_id":toy._id}, {$set : toy})
        return toy
    } catch (err) {
        console.log(`ERROR: cannot update toy ${toy._id}`)
        throw err;
    }
}

async function add(toy) {
    const collection = await dbService.getCollection('toy')
    try {
        await collection.insertOne(toy);
        return toy;
    } catch (err) {
        console.log(`ERROR: cannot insert toy`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    var criteria = {$and: []};
    if (filterBy.name) {
        criteria.$and.push({'name': filterBy.name})
    }
    if (filterBy.type) {
        criteria.$and.push({'type': filterBy.type})
    }
    if (filterBy.inStock) {
        criteria.$and.push({'inStock': filterBy.inStock})
    }
    if (criteria.$and.length === 0) {
        criteria = {}
    }
    // const criteria = {}
    return criteria;
}

function _dynamicSort(property) {
    property = property.toLowerCase()
    // if (property === 'created') property = 'createdAt'
    return function (a, b) {
        if (property === 'name')  return (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : (a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : 0;
        // else if (property === 'createdAt') return -1
        else return a[property] - b[property]
    }
}

import axios from 'axios';
// const baseUrl = (process.env.NODE_ENV !== 'development') ? '/api/toy' : '//localhost:3000/api/toy';
const baseUrl = (process.env.NODE_ENV !== 'development') ? '/api/toy' : '//localhost:3030/api/toy';
// const baseUrl = '//localhost:3000/api/toy';
// const baseUrl = '/api/toy';

import httpService from './http-service';


export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
}


// TODO: support paging and filtering and sorting
function query(filterBy, sortBy = '') {
    console.log('FILTER FRON :', filterBy, sortBy);
    
    var queryStr = '?'
    if (filterBy.name) queryStr += `&name=${filterBy.name}`
    if (filterBy.type) queryStr += `&type=${filterBy.type}`
    if (filterBy.inStock === false || filterBy.inStock === true) queryStr += `&inStock=${filterBy.inStock}`
    if (sortBy) queryStr += `&sort=${sortBy}`
    
    return httpService.get(`toy${queryStr}`)
}

function getById(id) {
    return httpService.get(`toy/${id}`)
}

function remove(id) {
    return httpService.delete(`toy/${id}`)
}

// function remove(id) {
//     return axios.delete(`${baseUrl}/${id}`)
// }

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post(`toy/`, toy)
    }
}

function getEmptyToy(toyDetails) {
    return {
        name: toyDetails.name,
        price: 123,
        type: toyDetails.type,
        createdAt: Date.now(),
        inStock: true,
        url: ''
    }
}


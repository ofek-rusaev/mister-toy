import httpService from './http-service'

export default {
    add,
    query,
    remove
}

function query() {
    return httpService.get('review')
}

function remove(reviewId) {
    return httpService.delete(`review/${reviewId}`)
}
function add(review) {
    return httpService.post(`review`, review)
}




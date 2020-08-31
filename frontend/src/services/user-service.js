import httpService from './http-service';
import localStorageService from './local-storage.service';

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getNickname
}

function getNickname() {
    let nickname = localStorageService.load('nickname');
    if (!nickname) {
        nickname = prompt('your nickname?');
        localStorageService.store('nickname', nickname)
    }
    return nickname;
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

function update(user) {
    return httpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}
async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}
function getUsers() {
    return httpService.get('user')
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}
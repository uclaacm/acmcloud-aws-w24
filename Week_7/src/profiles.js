import axios from "axios";

// TODO: Replace this with live endpoint
const API_ENDPOINT = ""

export const BLANK_USER = {
    "password": "",
    "bio": "",
    "friends": [],
    "username": "",
    "details": {
        "School": ""
    },
    "name": ""
}

export function updateUser(userDetails){
    axios.put(API_ENDPOINT + "/user", userDetails)
}

export function addFriend(currId, friendId, updateUser){
    axios.post(API_ENDPOINT + "/addfriend/" + currId + "/" + friendId)
    .then(getUser(currId, updateUser));
}

export function removeFriend(currId, friendId, updateUser){
    axios.post(API_ENDPOINT + "/removefriend/" + currId + "/" + friendId)
    .then(getUser(currId, updateUser));
}

export function tryLogin(username, password, onSuccess){
    axios(API_ENDPOINT + "/login/" + username + "/" + password)
    .then(res => (res.status == 200) ? onSuccess(res.data) : null);
}

export function trySignUp(details, onSuccess){
    axios.put(API_ENDPOINT + "/user", details)
    .then(res => (res.status == 200) ? onSuccess(details) : null);
}

export function getUser(userId, setFunction) {
    axios.get(API_ENDPOINT + "/user/" + userId)
    .then(res => (res.status == 200) ? setFunction(res.data) : null);
}

export function getUsers(userIds, setFunction){
    axios.get(API_ENDPOINT + "/users/" + JSON.stringify(userIds))
    .then(res => (res.status == 200) ? setFunction(res.data) : null);
}

export function getAllUserIds(setFunction) {
    axios.get(API_ENDPOINT + "/allusers")
    .then(res => (res.status == 200) ? setFunction(res.data) : null);
}
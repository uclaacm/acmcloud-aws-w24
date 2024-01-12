const API_ENDPOINT = "https://rlfieizsjg.execute-api.us-east-1.amazonaws.com"
// NOTE: THIS WILL BE REPLACED WITH A PERSISTANT DATABASE LATER!

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

let temp = [
    {
        "password": "1234",
        "bio": "This is my bio!",
        "friends": [
            "jb123"
        ],
        "username": "daniel",
        "details": {
            "School": "UCLA"
        },
        "name": "Daniel Yang"
    },
    {
        "password": "1234",
        "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
        "friends": [
            "jneusc",
            "daniel",
            "ssub"
        ],
        "username": "jb123",
        "details": {
            "Favorite Food": "Cake",
            "School": "UCLA",
            "Favorite Color": "#ffffff"
        },
        "name": "Joe Bruin"
    },
    {
        "password": "1234",
        "bio": "This is my bio! I'm an ACM Cloud Officer!",
        "friends": [
            "jb123"
        ],
        "username": "ssub",
        "details": {
            "School": "UCLA"
        },
        "name": "Satyen Subramaniam"
    },
    {
        "password": "1234",
        "bio": "I wish I went to UCLA!",
        "friends": [
            "jb123"
        ],
        "username": "jneusc",
        "details": {
            "School": "USC",
            "Favorite Color": "Red"
        },
        "name": "Jane USC"
    }
];

let DATABASE = {
    'jb123': {
        'username': 'jb123',
        'password': '1234',
        'name': 'Joe Bruin',
        'details': {
            'School': "UCLA",
            'Favorite Color': '#ffffff',
            'Favorite Food': 'Cake'
        },
        'friends': ['jneusc', 'daniel', 'ssub'],
        'bio': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
    },
    'jneusc': {
        'username': 'jneusc',
        'password': '1234',
        'name': 'Jane Usc',
        'details': {
            'School': "USC",
            'Favorite Color': 'Red'
        },
        'friends': ['jb123'],
        'bio': "I wish I went to UCLA!"
    },
    'daniel': {
        'username': 'daniel',
        'password': '1234',
        'name': 'Daniel Yang',
        'details': {
            'School': "UCLA",
        },
        'friends': ['jb123'],
        'bio': "This is my bio!"
    },
    'ssub': {
        'username': 'ssub',
        'password': '1234',
        'name': 'Satyen Subramaniam',
        'details': {
            'School': "UCLA",
        },
        'friends': ['jb123'],
        'bio': "This is my bio! I'm an ACM Cloud Officer!"
    }
}


export function updateUser(userId, userDetails){
    if (Object.keys(DATABASE).includes(userId)){
        DATABASE[userId] = userDetails
    }
}

export function addUser(username, password, name, bio){
    if (Object.keys(DATABASE).includes(username)){
        return false;
    }

    DATABASE[username] = {
        'username': username,
        'password': password,
        'name': name,
        'details': {},
        'friends': [],
        'bio': ""
    }

    return true;
}

export function addFriend(currId, friendId){
    if (!Object.keys(DATABASE).includes(currId) || !Object.keys(DATABASE).includes(friendId)) {
        return;
    }

    if (DATABASE[currId]['friends'].includes(friendId)) {
        return;
    }

    console.log('ADDING');
    DATABASE[currId]['friends'] = DATABASE[currId]['friends'].concat([friendId]);
    DATABASE[friendId]['friends'] = DATABASE[friendId]['friends'].concat([currId]);
}

export function removeFriend(currId, friendId){
    if (!Object.keys(DATABASE).includes(currId) || !Object.keys(DATABASE).includes(friendId)) {
        return;
    }

    if (!DATABASE[currId]['friends'].includes(friendId)) {
        return;
    }

    console.log('REMOVING');
    DATABASE[currId]['friends'] = DATABASE[currId]['friends'].filter(x => x != friendId);
    DATABASE[friendId]['friends'] = DATABASE[friendId]['friends'].filter(x => x != currId);
}

export function tryLogin(username, password){
    return Object.keys(DATABASE).includes(username) && DATABASE[username]['password'] == password;
}

export async function getUser(userId, setFunction) {
    const response = await fetch(API_ENDPOINT + "/user/" + userId, {method: 'GET'});
    console.log(await response.json()); 
    setFunction(DATABASE[userId]);
}

export async function getAllUserIds(setFunction) {
    const response = await fetch(API_ENDPOINT + "/allusers", {method: 'GET'});
    setFunction(await response.json());  
}
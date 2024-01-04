// NOTE: THIS WILL BE REPLACED WITH A PERSISTANT DATABASE LATER!
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

export function setUser(userId, userDetails){
    if (Object.keys(DATABASE).includes(currId)){
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

export function getUser(userid) {
    return DATABASE[userid];
}

export function getAllUserIds() {
    return Object.keys(DATABASE);
}
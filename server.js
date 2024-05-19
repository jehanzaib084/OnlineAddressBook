const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const jsonfile = require('jsonfile');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const USERS_FILE = 'users.json';

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000, // 10 minutes
        path: '/',
    }
}));


function getUsers() {
    try {
        const users = jsonfile.readFileSync(USERS_FILE);
        return users;
    } catch (err) {
        console.error('Error reading users file:', err);
        return [];
    }
}

function saveUsers(users) {
    try {
        jsonfile.writeFileSync(USERS_FILE, users, { spaces: 2 });
    } catch (err) {
        console.error('Error writing users file:', err);
    }
}

function generateUserId() {
    const users = getUsers();
    if (users.length === 0) {
        return 1;
    }
    return users[users.length - 1].id + 1;
}

function checkLogin(req, res, next) {
    if (req.session.loggedIn) {
        return next();
    }
    res.redirect('/login');
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/home', (req, res) => {
    const users = getUsers();
    const loggedIn = req.session.loggedIn;
    res.render('home', { users, loggedIn });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin123') {
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect('/home');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.get('/add', checkLogin, (req, res) => {
    res.render('add');
});

app.post('/add', checkLogin, (req, res) => {
    const newUser = req.body;
    newUser.id = generateUserId();

    const users = getUsers();
    users.push(newUser);
    saveUsers(users);
    res.redirect('/home');
});

app.get('/update', checkLogin, (req, res) => {
    const userId = req.query.id;
    const users = getUsers();
    const user = users.find(user => user.id == userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.render('update', { user });
});

app.post('/update', checkLogin, (req, res) => {
    const updatedUser = req.body;
    const users = getUsers();
    const index = users.findIndex(user => user.id == updatedUser.id);
    if (index === -1) {
        return res.status(404).send('User not found');
    }
    users[index] = updatedUser;
    saveUsers(users);
    res.redirect('/home');
});

app.post('/delete', checkLogin, (req, res) => {
    const userId = req.body.id;
    let users = getUsers();
    users = users.filter(user => user.id != userId);
    saveUsers(users);
    res.redirect('/home');
});

app.get('/show', (req, res) => {
    const userId = req.query.id;
    const users = getUsers();
    const user = users.find(user => user.id == userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.render('show', { user });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

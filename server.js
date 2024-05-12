const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const USERS_FILE = 'users.json';

function getUsers() {
    try {
        const users = jsonfile.readFileSync(USERS_FILE);
        return users;
    } catch (err) {
        // console.error('Error reading users file:', err);
        return [];
    }
}

function saveUsers(users) {
    try {
        jsonfile.writeFileSync(USERS_FILE, users, { spaces: 2 });
        // console.log('Saved users:', users);
    } catch (err) {
        // console.error('Error writing users file:', err);
    }
}

function generateUserId() {
    const users = getUsers();
    if (users.length === 0) {
        return 1;
    }
    return users[users.length - 1].id + 1;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'views','index.html'));
});

app.get('/home', (req, res) => {
    const users = getUsers();
    // console.log('Users:', users);
    res.render('home', { users });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const newUser = req.body;
    newUser.id = parseInt(generateUserId()); // Convert to integer
    // console.log('New user:', newUser);
    const users = getUsers();
    users.push(newUser);
    saveUsers(users);
    res.redirect('/home');
});
  

app.get('/update', (req, res) => {
    const userId = req.query.id;
    const users = getUsers();
    // console.log('Users:', users);
    const user = users.find(user => user.id === parseInt(userId));
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    // console.log('User:', user);
    res.render('update', { user });
});


app.post('/update', (req, res) => {
    const updatedUser = req.body;
    updatedUser.id = parseInt(updatedUser.id); // Convert to integer
    // console.log('Updated user:', updatedUser);
    const users = getUsers();
    const index = users.findIndex(user => user.id === updatedUser.id); // No need to parse here
    if (index === -1) {
        res.status(404).send('User not found');
        return;
    }
    users[index] = updatedUser;
    saveUsers(users);
    res.redirect('/home');
});


app.post('/delete', (req, res) => {
    const userId = parseInt(req.body.id);
    // console.log('Deleted user ID:', userId);
    let users = getUsers();
    users = users.filter(user => user.id !== userId);
    saveUsers(users);
    res.redirect('/home');
});


app.get('/show', (req, res) => {
    const userId = parseInt(req.query.id);
    // console.log('User ID:', userId);
    const users = getUsers();
    // console.log('Users:', users);
    const user = users.find(user => user.id === userId);
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    // console.log('User:', user);
    res.render('show', { user });
});

const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/users', (req, res) => {
  const users = [
    {
      username: 'tony-stark',
      displayName: 'Tony Stark'
    },
    {
      username: 'spider-man',
      displayName: 'Spider-Man'
    }
  ];
  res.json(users);
});

app.get('/api/users/:username', (req, res) => {
  const users = [
    {
      username: 'tony-stark',
      displayName: 'Tony Stark'
    },
    {
      username: 'spider-man',
      displayName: 'Spider-Man'
    }
  ];
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    if (u.username === req.params.username) {
      return res.json(u);
    }
  }
  res.status(401).json({});
});

app.post('/api/users/register', (req, res) => {
  // who cares what they send
  res.json({ message: 'User created succesfully.', accessToken: 'asdf234.asdf235.asdf' });
});

app.post('/api/users/login', (req, res) => {
  // who cares what they send
  res.json({ accessToken: 'asdf234.asdf235.asdf' });
});

app.post('/api/users/validate', (req, res) => {
  // who cares what they send
  res.json({ username: '', displayName: '' });
});

app.listen(PORT, () => console.log(`Brackette Mock-Server listening on port ${PORT}!`));

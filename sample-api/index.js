const express = require("express")
const cors = require("cors")
const lowDb = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const bodyParser = require("body-parser")
const { nanoid } = require("nanoid")
const db = lowDb(new FileSync('db.json'))
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { log } = require("console")
let rawdata = fs.readFileSync('db.json');
let routes = JSON.parse(rawdata);
const axios = require('axios');

const PORT = 3000;

db.defaults({ products: [] }).write()

const app = express()

const modules = Object.keys(routes)

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(`<h2 align="center" style="margin-top: 100px;">Longdh</h2>`)
 
})

app.post('/api/v1/login', (req, res) => {
  const { email, password } = req.body;
  //const user = db.get('users').find(u => u.email === email && u.password === password)
  const user = db.get(`users`).find({ email: email, password: password })
  const data = db.get(`users`).find({ email: email }).value()
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Đăng nhập thất bại'
    });
  }

  const token = jwt.sign({ email, password }, 'my-secret-key', { expiresIn: '5m' });

  return res.status(200).json({
    success: true,
    message: 'Đăng nhập thành công.',
    user: data,
    token
  });
});
app.post('/api/v1/forgot-pass', (req, res) => { 
    const  email = req.body;
    const data = db.get('users').find(email).value()
    return res.status(200).json({
      success: true,
      message: 'Confirm thành công.',
      user: data
    });
    // return res.json(data)
    
})
app.put(`/api/v1/forgot-pass/:id`, (req, res) => { 
  const note  = req.body;
  db.get(`users`).find({ id: req.params.id }).assign(note).write();
  res.json({ success: true })
})

modules.forEach(moduleName => {
  app.get(`/api/v1/${moduleName}`, (req, res) => {
    const data = db.get(`${moduleName}`).value()
    return res.json(data)
  })
  
  app.get(`/api/v1/${moduleName}/:id`, (req, res) => {
    const data = db.get(`${moduleName}`).find({ id: req.params.id })
    return res.json(data)
  })
  
  app.post(`/api/v1/${moduleName}`, (req, res) => {
    const note = req.body
    db.get(`${moduleName}`).push({
      ...note, id: nanoid()
    }).write()
  
    res.json({
      success: true,
      data : res.data
    })
  })
  
  app.put(`/api/v1/${moduleName}/:id`, (req, res) => {
      const note = req.body
      db.get(`${moduleName}`).find({ id: req.params.id }).assign(note).write();
    
      res.json({ success: true })
  })
  
  app.delete(`/api/v1/${moduleName}/:id`, (req, res) => {
    db.get(`${moduleName}`).remove({ id: req.params.id }).write();
    res.json({ success: true })
  })

 
})
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/steins-gate', async (req, res) => {
  const url = 'https://hummingbirdv1.p.rapidapi.com/anime/steins-gate';
  const options = {
    headers: {
      'X-RapidAPI-Key': 'dde66f0561msh324e6dc8a212669p1f94d2jsna8556e10d67a',
      'X-RapidAPI-Host': 'hummingbirdv1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.get(url, options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, ()=> {
  console.log(`Backend is running on http://localhost:${PORT}`)
})

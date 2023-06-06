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

const PORT = 8004;

db.defaults({ products: [] }).write()

const app = express()

const modules = Object.keys(routes)

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  const data = db.get('users').find({ email: 'test@gmail.com' }).value()
  res.send(`<h2 align="center" style="margin-top: 100px;">Longdh</h2>`)
 
})

app.post('/api/v1/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.get('users').find(u => u.email === email && u.password === password)
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




app.listen(PORT, ()=> {
  console.log(`Backend is running on http://localhost:${PORT}`)
})

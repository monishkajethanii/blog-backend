const express = require('express');
const router = require('./routes/router');
const authCheck = require('./middleware/auth');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(authCheck)                              // to add middleware
app.use(express.json())                         // allow response body data
app.use(express.urlencoded({extended:true}));   

app.use('/api',router)                          // api routes

app.listen(5000, ()=>{
    console.log('server started at port 5000')  // server running at 5000
})
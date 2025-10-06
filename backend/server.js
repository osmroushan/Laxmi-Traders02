require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const submissions = require('./routes/submissions');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.use('/api/submissions', submissions);
const PORT = process.env.PORT || 4000;
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log('Server running on', PORT));
  }).catch(err=>{
    console.error('MongoDB error', err);
    app.listen(PORT, ()=> console.log('Server running (no DB) on', PORT));
  });
} else {
  app.listen(PORT, ()=> console.log('Server running on', PORT));
}
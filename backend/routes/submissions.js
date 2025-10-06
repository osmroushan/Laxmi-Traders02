const express = require('express');
const router = express.Router();
const multer = require('multer');
const Submission = require('../models/Submission');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname,'..','uploads');
    if(!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
router.post('/', upload.fields([{name:'profile'},{name:'signature'}]), async (req,res)=>{
  try{
    const data = req.body;
    const education = data.education ? JSON.parse(data.education) : {};
    const doc = new Submission({
      fullname: data.fullname,
      fathername: data.fathername,
      dob: data.dob,
      gender: data.gender,
      marital_status: data.marital_status,
      category: data.category,
      mobile: data.mobile,
      whatsapp: data.whatsapp,
      email: data.email,
      present_address1: data.present_address1,
      present_address2: data.present_address2,
      present_state: data.present_state,
      present_district: data.present_district,
      present_block: data.present_block,
      present_pincode: data.present_pincode,
      permanent_address1: data.permanent_address1,
      permanent_address2: data.permanent_address2,
      permanent_state: data.permanent_state,
      permanent_district: data.permanent_district,
      permanent_block: data.permanent_block,
      permanent_pincode: data.permanent_pincode,
      post: data.post,
      education,
      profile_path: req.files['profile'] ? req.files['profile'][0].path : null,
      signature_path: req.files['signature'] ? req.files['signature'][0].path : null
    });
    await doc.save();
    // generate certificate HTML
    const templatePath = path.join(__dirname,'..','templates','certificate.html');
    let html = fs.readFileSync(templatePath,'utf8');
    html = html.replace(/%%FULLNAME%%/g, doc.fullname || '---')
      .replace(/%%FATHER%%/g, doc.fathername || '---')
      .replace(/%%POST%%/g, doc.post || '---')
      .replace(/%%ID%%/g, String(doc._id))
      .replace(/%%DATE%%/g, new Date().toLocaleDateString());
    // if images available, use absolute file:// URLs
    if(doc.profile_path) html = html.replace(/%%PROFILE%%/g, 'file://'+path.resolve(doc.profile_path));
    else html = html.replace(/%%PROFILE%%/g, '');
    if(doc.signature_path) html = html.replace(/%%SIGN%%/g, 'file://'+path.resolve(doc.signature_path));
    else html = html.replace(/%%SIGN%%/g, '');
    // launch puppeteer and make pdf
    const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfPath = path.join(__dirname,'..','uploads', `certificate-${doc._id}.pdf`);
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: {top: '20mm', bottom: '20mm'} });
    await browser.close();
    doc.pdf_path = pdfPath;
    await doc.save();
    // optional email to admin
    if(process.env.SEND_EMAIL === 'true') {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      });
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `New submission: ${doc.fullname}`,
        text: `New submission received. ID: ${doc._id}`,
        attachments: pdfPath ? [{ path: pdfPath }] : []
      });
    }
    res.json({ ok:true, id: doc._id, pdf: `/uploads/${path.basename(pdfPath)}` });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});
router.get('/', async (req,res)=>{
  if(req.query.admin !== process.env.ADMIN_KEY) return res.status(401).json({error:'unauthorized'});
  const list = await Submission.find().sort({createdAt:-1});
  res.json(list);
});
module.exports = router;
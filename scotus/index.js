const express = require('express')
const path = require('path')

const app = express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))

const mongoose = require('mongoose');

let db, cases, search

mongoose.connect('mongodb://localhost/case_database', 
    {
     useNewUrlParser: true,
     useUnifiedTopology: true,
    })

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const Cases = require('./models/Cases.js')

const play = require('audio-play');
const load = require('audio-loader');
	
app.listen(4000, () => {
   console.log('App listening on port 4000')
})

/*
app.get('/',(req,res) => {
  res.render('index');
})
*/
app.get("/",(req,res) => {
  //res.sendFile(path.resolve(__dirname, 'pages/adv_search.html'))
  res.render("index")
})

app.get("/case_landing",(req, res) => {
  //res.sendFile(__dirname, 'pages/case_landing.html'))
  res.render("case_landing");
})

app.get("/argument", function(req, res, next) {
    res.locals.query = "/media/" + req.query.audio + ".mp3";
   //const play_audio = load(afile).then(play);
  //res.sendFile(__dirname, 'pages/argument.html'))
  res.render('argument');
})
/*
app.post("/search",async (req, res) => {
  res.redirect('adv_search')
})


app.get("/adv_search", (req,res) => {
  var term_s = req.body.searchAll
  var name_s = req.body.searchAll
  var question_s = req.body.searchAll
  var description_s = req.body.searchAll
  const case_search = Cases.find({
   $or: [
   { name: { $regex: name_s, $options: 'imx' } },
   { term: term_s },
   { question: { $regex: question_s, $options: 'imx' } },
   { description: { $regex: description_s, $options: 'imx' } }
   ]
   })
  console.log(case_search)
  res.render("adv_search", {
     case_search: case_search
  })
})
*/

app.post('/adv_search',async (req,res) => {
   var term_s = req.body.term
   var name_s = req.body.name
   var question_s = req.body.question
   var description_s = req.body.description
   if(term_s == '') term_s = "'" + "'";
   if(name_s == '') name_s = "'" + "'";
   if(question_s == '') question_s = "'" + "'";
   if(description_s == '') description_s = "''";
   console.log(req.body)
 /*  if(req.body.searchAll == '') {
      term_s = req.body.term
      name_s = req.body.name
      question_s = req.body.question
      description_s = req.body.description
      if(term_s == '') term_s = "'" + "'";
      if(name_s == '') name_s = "'" + "'";
      if(question_s == '') question_s = "'" + "'";
      if(description_s == '') description_s = "''";
   } else {
	term_s = req.body.searchAll
        name_s = req.body.searchAll
   	question_s = req.body.searchAll
   	description_s = req.body.searchAll
   } */ 
   const case_search = await Cases.find({
   $or: [
   { name: { $regex: name_s, $options: 'imx' } },
   { term: term_s },
   { question: { $regex: question_s, $options: 'imx' } },
   { description: { $regex: description_s, $options: 'imx' } }
   ]  
   });

   console.log(case_search)
   res.render("adv_search",{
      case_search: case_search
  });
})	

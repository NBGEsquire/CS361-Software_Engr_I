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

app.get("/argument",(req, res) => {
  //res.sendFile(__dirname, 'pages/argument.html'))
  res.render("argument");
})

/*
app.post("/cases/search",async (req,res) => {
  console.log(req.body)
  res.redirect("/")
})
*/

app.post('/adv_search/:page',async function(req,res) {
   var term_s = req.body.term
   var name_s = req.body.name 
   var question_s = req.body.question
   var description_s = req.body.description
   console.log(req.body)
   if(term_s == '') term_s = "'" + "'"; 
   if(name_s == '') name_s = "'" + "'"; 
   if(question_s == '') question_s = "'" + "'";
   if(description_s == '') description_s = "''";
   console.log(name_s)
   const case_search = await Cases.find({
   $or: [
   { name: { $regex: name_s, $options: 'imx' } },
   { term: term_s },
   { question: { $regex: question_s, $options: 'imx' } },
   { description: { $regex: description_s, $options: 'imx' } }
   ]
   /* name: { $regex: name_s,$options: 'imx' },*/  
})
  /*  const case_agg = .aggregate([
     {
       $project: {
         name: 1,
         term: 1,
         question: { $trim: { input: "$question", chars: "</p>" } },
         description: 1
       }
     }
  ]) */	
  var perPage = 9
  var page = req.params.page || 1
  Case
    .find(case_search)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, products) {
        Case.count().exec(function(err, count) {
           if (err) return next(err)
           console.log(case_search)
           res.render("adv_search",{
               case_search: case_search,
               current: page,
               pages: Math.ceil(count / perPage)
           })
        })
     })
})	

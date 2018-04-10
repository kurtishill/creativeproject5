// Express Setup
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

let mathQuiz = [];
let mathId = 0;
mathQuiz.push({id:mathId++,question:"1 + 1 = ?",choices:[{choice:"3",correct:false,num:0},{choice:"4",correct:false,num:1},
  {choice:"1",correct:false,num:2},{choice:"2",correct:true,num:3}],correct:0});
mathQuiz.push({id:mathId++,question:"What number is 4?", choices:[{choice:"two",correct:false,num:0},{choice:"one",correct:false,num:1},
  {choice:"four",correct:true,num:2},{choice:"six",correct:false,num:3}],correct:0});
mathQuiz.push({id:mathId++,question:"2 + 5 = ?",choices:[{choice:"7",correct:true,num:0},{choice:"5",correct:false,num:1},
  {choice:"6",correct:false,num:2},{choice:"9",correct:false,num:3}],correct:0});
mathQuiz.push({id:mathId++,question:"What number is 8?",choices:[{choice:"one",correct:false,num:0},{choice:"eight",correct:true,num:1},
  {choice:"seven",correct:false,num:2},{choice:"nine",correct:false,num:3}],correct:0});
mathQuiz.push({id:mathId++,question:"3 + 3 = ?",choices:[{choice:"3",correct:false,num:0},{choice:"7",correct:false,num:1},
  {choice:"5",correct:false,num:2},{choice:"6",correct:true,num:3}],correct:0});
mathQuiz.push({id:mathId++,question:"4 - 1 = ?",choices:[{choice:"2",correct:false,num:0},{choice:"3",correct:true,num:1},
  {choice:"5",correct:false,num:2},{choice:"7",correct:false,num:3}],correct:0});
mathQuiz.push({id:mathId++,question:"What number is 10?",choices:[{choice:"ten",correct:true,num:0},{choice:"eleven",correct:false,num:1},
  {choice:"seven",correct:false,num:2},{choice:"three",correct:false,num:3}],correct:0});
mathQuiz.push({id:mathId++,question:"8 - 3 = ?",choices:[{choice:"4",correct:false,num:0},{choice:"3",correct:false,num:1},
  {choice:"5",correct:true,num:2},{choice:"11",correct:false,num:3}],correct:0});
mathQuiz.push({id:mathId++,question:"6 + 4 = ?",choices:[{choice:"6",correct:false,num:0},{choice:"10",correct:true,num:1},
  {choice:"16",correct:false,num:2},{choice:"2",correct:false,num:3}],correct:0});
mathQuiz.push({id:mathId++,question:"5 - 5 = ?",choices:[{choice:"1",correct:false,num:0},{choice:"2",correct:false,num:1},
  {choice:"0",correct:true,num:2},{choice:"10",correct:false,num:3}],correct:0});

let colorQuiz = [];
let colorId = 0;
colorQuiz.push({id:colorId++,question:"./static/images/black.png",choices:[{choice:"White",correct:false,num:0},
  {choice:"Blue",correct:false,num:1},{choice:"Black",correct:true,num:2}],correct:0});
colorQuiz.push({id:colorId++,question:"./static/images/blue.png",choices:[{choice:"Blue",correct:true,num:0},
  {choice:"Red",correct:false,num:1},{choice:"Purple",correct:false,num:2}],correct:0});
colorQuiz.push({id:colorId++,question:"./static/images/green.jpg",choices:[{choice:"Green",correct:true,num:0},
  {choice:"Yellow",correct:false,num:1},{choice:"Orange",correct:false,num:2}],correct:0});
colorQuiz.push({id:colorId++,question:"./static/images/orange.jpg",choices:[{choice:"Green",correct:false,num:0},
  {choice:"Yellow",correct:false,num:1},{choice:"Orange",correct:true,num:2}],correct:0});
colorQuiz.push({id:colorId++,question:"./static/images/purple.png",choices:[{choice:"Blue",correct:false,num:0},
  {choice:"Purple",correct:true,num:1},{choice:"Black",correct:false,num:2}],correct:0});
colorQuiz.push({id:colorId++,question:"./static/images/red.jpg",choices:[{choice:"Red",correct:true,num:0},
  {choice:"Blue",correct:false,num:1},{choice:"Purple",correct:false,num:2}],correct:0});
colorQuiz.push({id:colorId++,question:"./static/images/turquoise.jpeg",choices:[{choice:"Blue",correct:false,num:0},
  {choice:"Turquoise",correct:true,num:1},{choice:"Green",correct:false,num:2}],correct:0});
colorQuiz.push({id:colorId++,question:"./static/images/yellow.jpg",choices:[{choice:"Orange",correct:false,num:0},
  {choice:"White",correct:false,num:1},{choice:"Yellow",correct:true,num:2}],correct:0});

let animalQuiz = [];
let animalId = 0;
animalQuiz.push({id:animalId++,question:"./static/images/elephant.jpg",choices:[{choice:"Giraffe",correct:false,num:0},
  {choice:"Bear",correct:false,num:1},{choice:"Elephant",correct:true,num:2}],correct:0});
animalQuiz.push({id:animalId++,question:"./static/images/grizzlybear.jpg",choices:[{choice:"Grizzly Bear",correct:true,num:0},
  {choice:"Polar Bear",correct:false,num:1},{choice:"Rhino",correct:false,num:2}],correct:0});
animalQuiz.push({id:animalId++,question:"./static/images/lion.jpg",choices:[{choice:"Tiger",correct:false,num:0},
  {choice:"Lion",correct:true,num:1},{choice:"Bear",correct:false,num:2}],correct:0});
animalQuiz.push({id:animalId++,question:"./static/images/monkey.jpeg",choices:[{choice:"Snake",correct:false,num:0},
  {choice:"Human",correct:false,num:1},{choice:"Monkey",correct:true,num:2}],correct:0});
animalQuiz.push({id:animalId++,question:"./static/images/panda.jpg",choices:[{choice:"Panda Bear",correct:true,num:0},
  {choice:"Black Bear",correct:false,num:1},{choice:"Grizzly Bear",correct:false,num:2}],correct:0});
animalQuiz.push({id:animalId++,question:"./static/images/penguin.jpg",choices:[{choice:"Chicken",correct:false,num:0},
  {choice:"Penguin",correct:true,num:1},{choice:"Blue Bird",correct:false,num:2}],correct:0});
animalQuiz.push({id:animalId++,question:"./static/images/rhino.jpg",choices:[{choice:"Hippo",correct:false,num:0},
  {choice:"Elephant",correct:false,num:1},{choice:"Rhino",correct:true,num:2}],correct:0});
animalQuiz.push({id:animalId++,question:"./static/images/tiger.jpg",choices:[{choice:"Tiger",correct:true,num:0},
  {choice:"Lion",correct:false,num:1},{choice:"Cheetah",correct:false,num:2}],correct:0});
animalQuiz.push({id:animalId++,question:"./static/images/tortoise.jpg",choices:[{choice:"Tortoise",correct:true,num:0},
  {choice:"Lizard",correct:false,num:1},{choice:"Snake",correct:false,num:2}],correct:0});
animalQuiz.push({id:animalId++,question:"./static/images/zebra.jpg",choices:[{choice:"Horse",correct:false,num:0},
  {choice:"Zebra",correct:true,num:1},{choice:"Tiger",correct:false,num:2}],correct:0});

let publicQuizzes = [];
let userQuizzes = [];
let userQuiz = [];

// TAKE QUIZ //

app.post('/api/quiz/', (req, res) => {
  let type = req.body.type;
  if (type === 'math')
    res.send(mathQuiz);
  else if (type === "color")
    res.send(colorQuiz);
  else if (type === "animal")
    res.send(animalQuiz);
  else if (type === "user")
    res.send(userQuiz.quiz);
});

app.post('/api/newquiz/', (req, res) => {
  let type = req.body.type;
  if (type === "math") {
    for (var i = 0; i < mathQuiz.length; i++) {
      mathQuiz[i].correct = 0;
    }
    res.send(mathQuiz);
  }
  else if (type === "color") {
    for (var i = 0; i < colorQuiz.length; i++) {
      colorQuiz[i].correct = 0;
    }
    res.send(colorQuiz);
  }
  else if (type === "animal") {
    for (var i = 0; i < animalQuiz.length; i++) {
      animalQuiz[i].correct = 0;
    }
    res.send(animalQuiz);
  }
  else if (type === "user") {
    for (var i = 0; i < userQuiz.quiz.length; i++) {
      userQuiz.quiz[i].correct = 0;
    }
    res.send(userQuiz.quiz);
  }
});

app.put("/api/quiz/:id", (req, res) => {
  let type = req.body.type;
  let id = parseInt(req.params.id);
  if (type === "math") {
    let item = mathQuiz[id];
    item.correct = req.body.correct;
    mathQuiz[id] = item;
  }
  else if (type === "color") {
    let item = colorQuiz[id];
    item.correct = req.body.correct;
    colorQuiz[id] = item;
  }
  else if (type === "animal") {
    let item = animalQuiz[id];
    item.correct = req.body.correct;
    animalQuiz[id] = item;
  }
  else if (type === "user") {
    let item = userQuiz.quiz[id];
    item.correct = req.body.correct;
    userQuiz.quiz[id] = item;
  }
  res.sendStatus(200);
});

// PUBLIC QUIZ LIST //

function getQuizzesHelper(obj) {
  quizzes = [];
    for (var i = 0; i < obj.length; i++) {
      let quiz = {name: obj[i].name, subject: obj[i].subject, quiz: JSON.parse(obj[i].quiz), public: obj[i].public};
      quizzes.push(quiz);
    }
    return quizzes;
}

app.post("/api/quiz/publicquizzes/", (req, res) => {
  let subject = req.body.subject;
  if (subject === undefined || subject === '') {
    knex.where('public', true).select().from('quizzes').then(obj => {
      publicQuizzes = getQuizzesHelper(obj);
      res.send(publicQuizzes);
    });
  }
  else {
    knex.where(function() {
      this
        .where('public', true)
        .andWhere('subject', subject)
    }).select().from('quizzes').then(obj => {
      publicQuizzes = getQuizzesHelper(obj);
      res.send(publicQuizzes);
    });
  }
});

// USER QUIZ LIST //

app.post("/api/quiz/userquizzes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let subject = req.body.subject;
  if (subject === undefined || subject === '') {
      knex.where('user_id', id).select().from('quizzes').then(obj => {
      userQuizzes = getQuizzesHelper(obj);
      res.send(userQuizzes);
    });
  }
  else {
    knex.where(function() {
      this
        .where('user_id', id)
        .andWhere('subject', subject)
    }).select().from('quizzes').then(obj => {
      userQuizzes = getQuizzesHelper(obj);
      res.send(userQuizzes);
    });
  }
});

app.delete("/api/quiz/:name/user/:id", (req, res) => {
  let name = req.params.name;
  let id = parseInt(req.params.id);
  knex('quizzes').where(function() {
    this
      .where('user_id', id)
      .andWhere('name', name)
    }).del()
  .then(obj => {
    for (var i = 0; i < userQuizzes.length; i++) {
      if (userQuizzes[i].name === name) {
        removeIndex = i;
        break;
      }
    }
    if (removeIndex === -1) {
      res.status(404).send("Sorry, that item doesn't exist");
      return;
    }
    userQuizzes.splice(removeIndex, 1);
    console.log("Success while deleting user quiz");
    res.sendStatus(200);
  });
});

// TAKE QUIZ //

app.post("/api/quiz/takequiz/", (req, res) => {
  userQuiz = req.body.quiz;
  res.sendStatus(200);
});

// MAKE QUIZ //

app.post("/api/quiz/makequiz/:id", (req, res) => {
  let quizInfo = req.body.quiz;
  let id = parseInt(req.params.id);
  console.log(id);
  knex('quizzes').where('name', quizInfo.name).first().then(quiz => {
    console.log(quiz);
    if (quiz !== undefined) {
      if (quiz.name === quizInfo.name) {
        return res.status(409).send("Quiz name already used. Please choose another");
        throw new Error('abort');
      }
    }
  });
  knex('quizzes').insert({name: quizInfo.name, subject: quizInfo.subject, quiz: JSON.stringify(quizInfo.quiz), public: quizInfo.public, user_id: id
  }).then(quiz => {
    console.log("Success while inserting quiz into database");;
  });
});

// REGISTER AND LOGIN //

app.post('/api/login', (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:user});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});


app.post('/api/users', (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('username',req.body.username).first();
  }).then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({email: req.body.email, hash: hash, username:req.body.username});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first();
  }).then(user => {
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
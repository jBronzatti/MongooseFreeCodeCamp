require('dotenv').config();
const mongoose = require("mongoose")
const mySecret = process.env['MONGO_URI']
const Schema = mongoose.Schema;
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: { type:String,  required:true},
  age: { type:Number },
  favoriteFoods: [{ type:String }]
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const Thor = new Person({name:'Thor',age:5,favoriteFoods:['apple','beef','meat']})
  Thor.save(function(err,data){
    if (err) return console.log(err);
    done(null,data);
  }) 
};

let arrayOfPeople = [
  {name:'Loki',age:1,favoriteFoods:['cheese','plastic','dust']},
  {name:'Pri',age:47,favoriteFoods:['japanese','lamem','yakisoba']},
  {name:'Dad',age:50,favoriteFoods:['barbecue','feijoada','japanese']}
  ]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(err, people){
    if (err) return handleError(err);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, function(err, personFound){
    if(err) return console.log(err);
    done(null, personFound);  
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},function(err,foodFound){
    if (err) return console.log(err)
    done(null,foodFound)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId,function(err,id){
    if (err) return console.log(err)
    done(null,id)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,function(err,obj){
    if (err) return handleError(err);
    obj.favoriteFoods.push(foodToAdd);
    obj.save((err,updatedPerson)=>{
      if (err) handleError(err);
      done(null,updatedPerson);  
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},function(err,updatedDoc){
    if (err) return console.log(err);
    done(null,updatedDoc)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err,deletedPerson){
    if (err) return handleError(err)
    done(null,deletedPerson)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},function(err,removedDoc){
    if (err) return handleError(err)
    done(null,removedDoc)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name:1}).limit(2).select({age:0}).exec(function(err,people){
    if (err) handleError(err);
    done(null,people)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;




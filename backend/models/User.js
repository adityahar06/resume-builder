const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
 institution:String,
 fieldofstude:String,
 degree:String,
 overallCGPA:String,
 tenthpercentage:String,
 twelvethpercentage:String,
 startYear:String,
 endYear:String,
});

const projectschema =new mongoose.Schema({
  title:String,
  link:String,
  description:String,
});

const reviewschema=new mongoose.Schema({
    rating:Number,
    reviewtext:String,
})

const experienceschema=new mongoose.Schema({
    experienceType:String,
    companyName:String,
    companyLocation:String,
    startYear:String,
    endYear:String,
    description:String, 
})



const userSchema = new mongoose.Schema({

  email: { type: String, required: true },
  password: { type: String, required: true },
  name:String,
  proffession:String,
  resumeformemail:String,
  city:String,
  phone:{type:Number, max:999999999, min:1000000000},
  linkedin:String,
  education:{type:[educationSchema]},
  skills:[String],
  languagesSelected:[String],
  project:{type:[projectschema]},
  experience:{type:[experienceschema]},
  professionalSummary:String,
});
const User = mongoose.model('User', userSchema);
const reviewsection=mongoose.model('Review',reviewschema);

module.exports = {User,reviewsection};
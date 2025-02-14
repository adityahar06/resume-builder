const express = require('express');
// const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Ensure this file exports a valid DB connection function
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const {User} = require('./models/User');
const {reviewsection} = require('./models/User');
const bodyParser=require('body-parser')


// Load environment variables
// dotenv.config();

// Connect to the database



// Initialize Express app
const app = express();




// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// API routes
// app.use('/api/users', userRoutes); // Route for user-related APIs

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

app.post('/register',async(req,res)=>{
    const{email,password}=req.body;
    console.log(req.body);
    const user=await User.create({
        email:email,
        password:password
    }
    )
     res.status(201).json({success:true});

    console.log("data created in database");
      
       
    
})

app.post('/login',async(req,res)=>{
 const{email,password}=req.body;
 console.log(req.body);
 const user=await User.findOne({
    email:email,
    password:password,
 })
 if(!user){
    return res.json({success:false ,message:'user not found'})
 }
 else{
    return res.json({success:true,user:user})
 }
})

// app.post('/home',async(req,res)=>{
//     const {name,course,email,password}=req.body;
    
//     const newuser=await User.findOneAndUpdate({
//         email:email,
//         password:password,
//     },{
//         name:name,
//         course:course
//     },
//     { new: true })
//     console.log(newuser);
//     console.log("data updated")
//   return res.status(201).json({success:true,user:newuser});
// })

//name proffession city email phone linkedin
app.post('/personalpg-homepg', async (req, res) => {
    console.log('Received body:', req.body); 
  
    const { name, proffession, city, resumeformemail, phone, linkedin, email, password } = req.body;
  
    
      const newuser1 = await User.findOneAndUpdate(
        { email: email, password: password },
        {
          name: name,
          proffession: proffession,
          city: city,
          resumeformemail: resumeformemail,
          phone: phone,
          linkedin: linkedin,
        },
        { new: true }
      );
  
      console.log(newuser1); // Log the updated user
      console.log('Data updated from personal pg');
  
      return res.status(201).json({ success: true, user: newuser1 });
   
  });

  app.post('/educationpg-homepg', async (req, res) => {
    console.log('Received body:', req.body); 
  
    const {email,password,education} = req.body;
  
    
      const newuser2 = await User.findOneAndUpdate(
        { email: email, password: password },
        {
            $push: { education: { $each: education } }
        },
        { new: true, upsert: true }
      );
  
      console.log(newuser2); // Log the updated user
      console.log('Data updated from personal pg');
  
      return res.status(201).json({ success: true, user: newuser2 });
   
  });


  app.post('/skillpg-homepg', async (req, res) => {
    console.log('Received body:', req.body); 
  
    const {email,password,skills,languagesSelected} = req.body;
    console.log("skills added are",skills)
  
    
      const newuser3 = await User.findOneAndUpdate(
        { email: email, password: password },
        {
            $push: {
                skills: { $each: skills },          
                languagesSelected: { $each: languagesSelected } 
            }
        },
        { new: true }
      );
  
   console.log(newuser3) // Log the updated user
      console.log('Data updated from personal pg');
  
      return res.status(201).json({ success: true, user: newuser3 });
   
  });

  app.post('/projectpg-homepg', async (req, res) => {
    console.log('Received body:', req.body); 
  
    const {email,password,project} = req.body;
  
    
      const newuser3 = await User.findOneAndUpdate(
        { email: email, password: password },
        {
            $push: { project: { $each: project } }
        },
        { new: true }
      );
  
      console.log(newuser3); // Log the updated user
      console.log('Data updated from personal pg');
  
      return res.status(201).json({ success: true, user: newuser3 });
   
  });


  app.post('/reviewpg-homepg', async (req, res) => {
    const { reviewText, rating } = req.body;
  
    try {
      const newReview = await reviewsection.create({
        rating: rating,
        reviewtext: reviewText,
      });
  
      console.log(newReview); // Log the created review
      console.log('Data updated from personal pg');
  
      return res.status(201).json({ success: true, review: newReview });
    } catch (error) {
      console.error('Error creating review:', error);
      return res.status(500).json({ success: false, message: 'Error creating review' });
    }
  });
  
  app.get('/reviews', async (req, res) => {
    try {
      const reviews = await reviewsection.find(); 
      return res.status(200).json({ success: true, reviews: reviews });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ success: false, message: 'Error fetching reviews' });
    }
  });

  app.post('/experiencepg-homepg', async (req, res) => {
    console.log('Received body:', req.body); 
  
    const {experience,professionalSummary,email,password} = req.body;
  
    
      const newuser3 = await User.findOneAndUpdate(
        { email: email, password: password },
        {
            $push: { experience: { $each: experience } },
            professionalSummary:professionalSummary,
        },
        { new: true }
      );
  
      console.log(newuser3); // Log the updated user
      console.log('Data updated from experience pg');
  
      return res.status(201).json({ success: true, user: newuser3 });
   
  });

  app.post('/api/education', async (req, res) => {
    console.log('Received body:', req.body); 
  
    const {email,password,educationEntries} = req.body;
  
    
      const newuser3 = await User.findOneAndUpdate(
        { email: email, password: password },
        {
            $push: { education: { $each:educationEntries  } },
           
        },
        { new: true }
      );
  
      console.log(newuser3); // Log the updated user
      console.log('Data updated from experience pg');
  
      return res.status(201).json({ success: true, user: newuser3 });
   
  });
  


  

// Define the port
const PORT = 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ,${PORT}`);
});
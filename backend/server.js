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

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
  }

  const user = await User.create({ email, password });
  return res.status(201).json({ success: true, user });
});


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
   // getting the ai refiend data
   // getting he description form the project-pg and getting in backend and sendont to openai
const fetch = require('node-fetch');

app.post("/ai-refined-data", async (req, res) => {
  const userDescription = req.body.description;

  if (!userDescription || userDescription.trim() === "") {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    const cohereApiKey = "k0pWeEsBzU76FtEt7boaD6LBkChm3M7wz8pVuXSR"; // Replace with your actual Cohere API key

    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cohereApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command", // You can also try "command-nightly"
        prompt: `Improve the following project description professionally and concisely:\n\n${userDescription}`,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.generations && data.generations.length > 0) {
      const refined = data.generations[0].text.trim();
      res.json({ refined });
    } else {
      return res.status(500).json({
        error: "Unexpected response from Cohere",
        response: data,
      });
    }
  } catch (error) {
    console.error("Cohere API error:", error.message);
    res.status(500).json({ error: "Something went wrong with Cohere" });
  }
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
  
  app.post('/google-login', async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({ email, password });
    }

    return res.json({ success: true, user });
});

app.get("/", (req, res) => {
  res.send("🚀 Backend server is live!");
});

// Define the port
const PORT = 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
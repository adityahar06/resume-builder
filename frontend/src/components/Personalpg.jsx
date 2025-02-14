import Womenimg from "../../public/Girl.jpg"
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Resume from "./Resume";


const Personalpg = () => {
  const navigate = useNavigate();
  const location=useLocation()
  const data=location.state ||{}
  console.log('the data belongs to ',data)
 

  const[name,setname]=useState(data.user.name||'')
  const[proffession,setproffession]=useState(data.user.proffession||'')
  const[city,setcity]=useState(data.user.city||'')
  const[resumeformemail,setresumeformemail]=useState(data.user.resumeformemail||'')
  const[phone,setphone]=useState(data.user.phone||'')
  const[linkedin,setlinkedin]=useState(data.user.linkedin||'')
  
  const personalpgformsubmithandler=async(e)=>{
    e.preventDefault()
    const formdata1={name,proffession,city,resumeformemail,phone,linkedin,email:data.user.email,password:data.user.password}
    console.log('formdata1 is' ,formdata1)
    try {
      const response = await fetch('http://localhost:5000/personalpg-homepg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata1),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (data.success) {
        // On success, navigate to homepage and pass the user details
        navigate('/Educationpage', {
          state: {user: data.user }, // Send the user data as props to homepage
        });
 
      } else {
        alert(data.message); // Show error message if login failed
      }
    } catch (error) {
      console.error('Error submitting login form:', error);
    }
   
     
  }
 
  const homepagehandler=(e)=>{
    navigate('/')
  }
  const resetform=()=>{
    setname('');
    setproffession('');
    setcity('');
    setresumeformemail('');
    setphone('');
    setlinkedin('');

  }
  //name proffession city email phone linkedin


  return (
    <div className="flex flex-col items-center max-w-6xl mx-auto px-6 py-8">
      {/* Main Container with Personal Form & Resume Side by Side */}
      <div className="flex flex-col lg:flex-row w-[90vw] max-w-[1100px] gap-6">
        
        {/* Personal Form - Left Side */}
        <div className="w-full lg:w-1/2 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-gray-700 mb-3">Personal Details</h1>
          <p className="text-gray-500 mb-5">Fill in your details</p>

          <form className="space-y-5" onSubmit={personalpgformsubmithandler}>
            <div className="flex gap-5">
              {/* Left Side */}
              <div className="w-1/2">
                {/* Profile Image */}
                <div className="flex justify-center mb-5">
                  <img src={Womenimg} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" />
                </div>

                {/* Name */}
                <div>
                  <label className="block font-semibold text-gray-600">Name</label>
                  <input type="text" placeholder="Mayank Jha" value={name} onChange={(e)=>{setname(e.target.value)}} className="w-full px-3 py-2 border rounded-md" />
                </div>
                {/* Profession */}
                <div>
                  <label className="block font-semibold text-gray-600">Profession</label>
                  <input type="text" placeholder="Software Engineer" value={proffession} onChange={(e)=>{setproffession(e.target.value)}} className="w-full px-3 py-2 border rounded-md" />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-semibold text-gray-600">Email *</label>
                  <input type="email" placeholder="mayank.jha@example.com" value={resumeformemail} onChange={(e)=>{setresumeformemail(e.target.value)}} className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>

              {/* Right Side */}
              <div className="w-1/2">
                {/* City */}
                <div>
                  <label className="block font-semibold text-gray-600">City</label>
                  <input type="text" placeholder="San Francisco" value={city} onChange={(e)=>{setcity(e.target.value)}} className="w-full px-3 py-2 border rounded-md" />
                </div>
                {/* Phone */}
                <div>
                  <label className="block font-semibold text-gray-600">Phone</label>
                  <input type="text" placeholder="(123) 456-7890" value={phone} onChange={(e)=>{setphone(e.target.value)}} className="w-full px-3 py-2 border rounded-md" />
                </div>
                {/* LinkedIn */}
                <div>
                  <label className="block font-semibold text-gray-600">LinkedIn</label>
                  <input type="text" placeholder="linkedin.com/in/johndoe" value={linkedin} onChange={(e)=>{setlinkedin(e.target.value)}} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <button 
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition mt-2"
              
            >
              Next: Education Page
            </button>
              </div>
            </div>
          </form>

          {/* Buttons Beneath Personal Form */}
          <div className="w-full flex justify-center gap-4 mt-6">
            {/* <button className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition">
              Preview
            </button> */}
             <button 
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition mt-2"
              onClick={resetform}
            >
              Reset Form
            </button>
           
            <button 
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
              onClick={(e)=>homepagehandler(e)}
            >
              Previous: Home Page
            </button>
          </div>
        </div>

        {/* Resume Preview - Right Side with Horizontal Slide */}
        <div className="w-full lg:w-1/2 p-6 bg-gray-100 shadow-lg rounded-lg flex flex-col overflow-hidden">
          {/* Horizontal Scroll Container for Resume */}
          <div className="overflow-x-auto flex gap-5 w-full">
            <div className="flex-shrink-0 w-full max-w-[1000px]">
             <>
             <div className="w-[60vw] h-[90vh] max-w-[1000px] overflow-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-left">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold">{name||'Mayank Jha'}</h1>
          <h2 className="text-xl text-gray-700">{proffession||'Software Engineer'}</h2>
          <p className="text-sm text-gray-600">Email:{resumeformemail||' mayank.jha@example.com'} | Phone:{phone||'(123) 456-7890'}</p>
          <p className="text-sm text-gray-600">LinkedIn: {linkedin||'linkedin.com/in/johndoe'}</p>
        </div>
        <hr className="mb-5" />
        
        {/* Professional Summary */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
          <p className="text-sm text-gray-700">
            Experienced Software Engineer with a passion for building innovative web applications and solving complex problems. Strong background in full-stack development and Agile methodologies.
          </p>
        </div>

        {/* Skills */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
          <ul className="list-none pl-0">
            <li className="text-sm text-gray-700">JavaScript, React, Node.js</li>
            <li className="text-sm text-gray-700">HTML, CSS, Sass</li>
            <li className="text-sm text-gray-700">SQL, MongoDB, PostgreSQL</li>
            <li className="text-sm text-gray-700">Git, Docker, Kubernetes</li>
          </ul>
        </div>
        <hr className="mb-5" />

        {/* Professional Experience */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Professional Experience</h3>
          <div className="mb-5">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">Software Engineer - ABC Corp</h4>
              <span className="text-sm text-gray-500">2015-2020</span>
            </div>
            <p className="text-sm text-gray-700">ABC Corp, San Francisco, CA</p>
            <ul className="list-disc pl-5">
              <li className="text-sm text-gray-700">Developed and maintained full-stack web applications using React, Node.js, and MongoDB.</li>
              <li className="text-sm text-gray-700">Collaborated with cross-functional teams to deliver product features on time and within scope.</li>
              <li className="text-sm text-gray-700">Improved application performance by optimizing front-end code and backend API calls.</li>
            </ul>
          </div>
          <div className="mb-5">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">Junior Developer - XYZ Ltd</h4>
              <span className="text-sm text-gray-500">2012-2015</span>
            </div>
            <p className="text-sm text-gray-700">XYZ Ltd, New York, NY</p>
            <ul className="list-disc pl-5">
              <li className="text-sm text-gray-700">Assisted in developing dynamic websites and applications for various clients.</li>
              <li className="text-sm text-gray-700">Wrote clean, maintainable code for front-end and back-end systems.</li>
            </ul>
          </div>
        </div>

        <hr className="mb-5" />

        {/* Education */}
        <div  className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-gray-300 pb-2">
            Education
          </h3>

          {data.user.education.length > 0 ? (
            <div className="mt-4">
              {data.user.education.map((entry, index) => (
                <div key={index} className="mb-5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-purple-700">
                      {entry.degree || "Degree Not Specified"}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {entry.startYear || "Start Year"} - {entry.endYear || "End Year"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{entry.institution || "Institution Not Provided"}</p>

                  <p className="text-sm text-gray-700">
                    <span className="text-gray-500 font-medium">Field of Study:</span> {entry.fieldofstudy || "N/A"}
                  </p>

                  <ul className="list-disc pl-5 mt-2">
                    <li className="text-sm text-gray-700">
                      <span className="text-gray-500 font-medium">10th Percentage:</span> {entry.tenthpercentage || "N/A"}
                    </li>
                    <li className="text-sm text-gray-700">
                      <span className="text-gray-500 font-medium">12th Percentage:</span> {entry.twelvethpercentage || "N/A"}
                    </li>
                    <li className="text-sm text-gray-700">
                      <span className="text-gray-500 font-medium">Overall CGPA:</span> {entry.overallCGPA || "N/A"}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 mt-3">No education data available.</p>
          )}

          <hr className="mb-5" />
        </div>

        {/* Certifications */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
          <ul className="list-none pl-0">
            <li className="text-sm text-gray-700">Certified JavaScript Developer - JavaScript Institute</li>
            <li className="text-sm text-gray-700">React Developer Certification - FreeCodeCamp</li>
          </ul>
        </div>

        <hr className="mb-5" />

        {/* Projects */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <div className="mb-5">
            <h4 className="text-lg font-semibold">
              <a href="https://your-portfolio-link.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                Personal Portfolio Website
              </a>
            </h4>
            <p className="text-sm text-gray-700">Created a personal portfolio website using HTML, CSS, and JavaScript to showcase my work and achievements.</p>
          </div>
          <div className="mb-5">
            <h4 className="text-lg font-semibold">
              <a href="https://task-management-app.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                Task Management App
              </a>
            </h4>
            <p className="text-sm text-gray-700">A task management application built with React and Firebase to manage tasks efficiently.</p>
          </div>
        </div>
        <hr className="mb-5" />

        {/* Languages */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
          <ul className="list-none pl-0">
            <li className="text-sm text-gray-700">English (Fluent)</li>
            <li className="text-sm text-gray-700">Spanish (Intermediate)</li>
          </ul>
        </div>
      </div>
    </div>
             </>
            </div>
            {/* Add more resume components here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalpg;























// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// import "./Personalpg.css";

// const Personalpg = () => {
//   const navigate = useNavigate();

//   // const [formData, setFormData] = useState({
//   //   firstName: "",
//   //   surname: "",
//   //   profession: "",
//   //   city: "",
//   //   country: "",
//   //   pinCode: "",
//   //   phone: "",
//   //   email: "",
//   // });

//   const[firstName,setfirstName]=useState('')
//   const[surname,setsurname]=useState('')
//   const[profession,setprofession]=useState('')
//   const[city,setcity]=useState('')
//   const[country,setcountry]=useState('')
//   const[pinCode,setpinCode]=useState('')
//   const[phone,setphone]=useState('')
//   const[email,setemail]=useState('')



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//    const formdata={firstName,surname,profession,city,country,pinCode,phone,email}


    
//     };

//   return (
//     <div className="form-container">
//       <h1 className="form-title">Let's Get Personal!</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-content">
//           <div className="form-left">
//             <div className="form-group">
//               <label>First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={firstName}
//                 onChange={(e)=>{setfirstName(e.target.value)}}
//                 placeholder="e.g. Isha"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Surname</label>
//               <input
//                 type="text"
//                 name="surname"
//                 value={surname}
//                 onChange={(e)=>{setsurname(e.target.value)}}
//                 placeholder="e.g. Singh"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Profession</label>
//               <input
//                 type="text"
//                 name="profession"
//                 value={profession}
//                 onChange={(e)=>{setprofession(e.target.value)}}
//                 placeholder="e.g. Software Engineer"
//                 required
//               />
//             </div>
//           </div>
//           <div className="form-right">
//             <div className="form-group">
//               <label>City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={city}
//                 onChange={(e)=>{setcity(e.target.value)}}
//                 placeholder="e.g. New Delhi"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Country</label>
//               <input
//                 type="text"
//                 name="country"
//                 value={country}
//                 onChange={(e)=>{setcountry(e.target.value)}}
//                 placeholder="e.g. India"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Pin Code</label>
//               <input
//                 type="text"
//                 name="pinCode"
//                 value={pinCode}
//                 onChange={(e)=>{setpinCode(e.target.value)}}
//                 placeholder="e.g. 110034"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={phone}
//                 onChange={(e)=>{setphone(e.target.value)}}
//                 placeholder="e.g. +91 22 1234 5677"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={(e)=>{setemail(e.target.value)}}
//                 placeholder="e.g. IshaSingh@sample.in"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//         <button type="submit" className="next-btn">
//           Submit and Next: Education
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Personalpg;
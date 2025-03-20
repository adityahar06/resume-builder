import React, { useState, useRef } from "react";
import Resume from "./Resume";
import { useLocation, useNavigate } from "react-router-dom";

const Educationpg = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};
  console.log(data);
  const [educationEntries, setEducationEntries] = useState([
    { institution: "", fieldofstudy: "", degree: "", overallCGPA: "", tenthpercentage: "", twelvethpercentage: "", startYear: "", endYear: "" },
  ]);
  const handleDelete = (index) => {
    setEducationEntries(educationEntries.filter((_, i) => i !== index));
  };

 

  const handleChange = (index, event) => {
    const newEntries = [...educationEntries];
    newEntries[index][event.target.name] = event.target.value;
    setEducationEntries(newEntries);
  };

  const handleAddEntry = () => {
  

    
    setEducationEntries([
      ...educationEntries,
      { institution: "", fieldofstudy: "", degree: "", overallCGPA: "", tenthpercentage: "", twelvethpercentage: "", startYear: "", endYear: "" },
    ]);
  };

  const handleSubmit = async () => {

    const formdata={email:data.user.email,password:data.user.password,educationEntries}
    try {
      const response = await fetch("http://localhost:5000/api/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const result = await response.json();
      if (result.success) {
       navigate('/Skillpg',{
        state:{user:result.user}
       })
      } else {
        alert("Failed to save education details.");
      }
    } catch (error) {
      console.error("Error submitting education details:", error);
      alert("Error submitting education details.");
    }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 w-full h-screen bg-gray-100 overflow-y-auto">
      
      {/* Left Section - Education Form */}
      <div className="w-full p-6 md:p-10 lg:p-16 bg-white md:border-r border-gray-300 overflow-y-auto h-full">
        <h2 className="text-center text-3xl font-bold text-purple-700">
          Tell us about your education
        </h2>
        <p className="text-center text-lg text-gray-700">
          Enter your education details, even if you are currently studying or did not graduate.
        </p>

        {educationEntries.map((entry, index) => (
          <div key={index} className="w-full p-7 mt-7 rounded-lg border border-gray-300 shadow-lg bg-gray-50">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Left Side */}
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block font-semibold text-gray-700">Institution</label>
                  <input
                    type="text"
                    name="institution"
                    value={entry.institution}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. BIT Mesra/D.A.V"
                    className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={entry.degree}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. B.Tech"
                    className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">Field of Study</label>
                  <input
                    type="text"
                    name="fieldofstudy"
                    value={entry.fieldofstudy}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. CSE"
                    className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">Overall CGPA</label>
                  <input
                    type="text"
                    name="overallCGPA"
                    value={entry.overallCGPA}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your CGPA"
                    className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block font-semibold text-gray-700">10th Percentage</label>
                  <input
                    type="text"
                    name="tenthpercentage"
                    value={entry.tenthpercentage}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your 10th percentage"
                    className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">12th Percentage</label>
                  <input
                    type="text"
                    name="twelvethpercentage"
                    value={entry.twelvethpercentage}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your 12th percentage"
                    className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">Start Year</label>
                  <input
                    type="text"
                    name="startYear"
                    value={entry.startYear}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. 2020"
                    className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">End Year</label>
                  <input
                    type="text"
                    name="endYear"
                    value={entry.endYear}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. 2024"
                    className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </form>
            

            {/* (+ Add More Education) Button - Centered Inside the Form */}
            <div className="flex justify-center gap-4 mt-5">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-800"
                onClick={handleAddEntry}
              >
                + Add More Education
              </button>
              {educationEntries.length > 1 && (
              <button 
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-800"
                onClick={() => handleDelete(educationEntries.length - 1)}
              >
               Delete
              </button>
                )}
            </div>
          </div>
        ))}

        {/* Buttons Section */}
        <div className="flex justify-between mt-5">
          <button className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-700" onClick={() => navigate("/personaldetails")}>
            Back: Personal Details
          </button>

          <button className="bg-purple-700 text-white px-8 py-3 rounded-lg hover:bg-purple-900" onClick={handleSubmit}>
            Next: Skills
          </button>
        </div>
      </div>

      {/* Right Section - Resume Preview */}
      <div className="w-full p-6 md:p-10 lg:p-16 bg-white overflow-y-auto h-full md:col-span-1">
        <>
        <div className="w-[60vw] h-[90vh] max-w-[1000px] overflow-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-left">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold">{data.user.name}</h1>
          <h2 className="text-xl text-gray-700">{data.user.proffession}</h2>
          <p className="text-sm text-gray-600">Email: {data.user.email} | Phone:{data.user.phone}</p>
          <p className="text-sm text-gray-600">LinkedIn: {data.user.linkedin}</p>
        </div>
        <hr className="mb-5" />

        {/* Professional Summary */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
          <p className="text-sm text-gray-700">
           {data.user.professionalSummary}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                {data.user.skills.map((skill) => (
                  <p key={skill} className="text-sm text-gray-700">{skill}</p>
                ))}
              </div>
              <hr className="mb-5" />

        {/* Professional Experience */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Professional Experience</h3>
          {data.user.experience.map((experience)=>(
             <div className="mb-5">
             <div className="flex justify-between items-center">
               <h4 className="text-lg font-semibold">{experience.experienceType} -{experience.companyName}</h4>
               <span className="text-sm text-gray-500">{experience.startYear}-{experience.endYear}</span>
             </div>
             <p className="text-sm text-gray-700">{experience.companyName}, {experience.companyLocation}</p>
             
              <p className="text-sm text-gray-700">{experience.description}</p>
            
           </div>

          ))}
         
          {/* <div className="mb-5">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">Junior Developer - XYZ Ltd</h4>
              <span className="text-sm text-gray-500">2012-2015</span>
            </div>
            <p className="text-sm text-gray-700">XYZ Ltd, New York, NY</p>
            <ul className="list-disc pl-5">
              <li className="text-sm text-gray-700">Assisted in developing dynamic websites and applications for various clients.</li>
              <li className="text-sm text-gray-700">Wrote clean, maintainable code for front-end and back-end systems.</li>
            </ul>
          </div> */}
        </div>

        <hr className="mb-5" />

        {/* Education */}
        <div  className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-gray-300 pb-2">
            Education
          </h3>

          {educationEntries.length > 0 ? (
            <div className="mt-4">
              {educationEntries.map((entry, index) => (
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
   {data.user.project.map((project)=>(
     <div className="mb-5">
     <h4 className="text-lg font-semibold">
       <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
         {project.title}
       </a>
     </h4>
     <p className="text-sm text-gray-700">{project.description}</p>
   </div>

   ))}
  </div>
  <hr className="mb-5" />

        {/* Languages */}
        <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
                {data.user.languagesSelected.map((language) => (
                  <p key={language} className="text-sm text-gray-700">{language}</p>
                ))}
              </div>
      </div>
    </div>
        </>
      </div>
      
    </div>
  );
};

export default Educationpg;
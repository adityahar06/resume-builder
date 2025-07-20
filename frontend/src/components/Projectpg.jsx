import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Resume from './Resume';

const Projectpg = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log("data in projects page", data);
 
  const [projects, setProjects] = useState(data.user.project || [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A personal portfolio website to showcase my skills and projects.",
      link: "https://myportfolio.com",
    },
    {
      id: 2,
      title: "E-commerce App",
      description: "An e-commerce platform with product listing, cart, and payment gateway integration.",
      link: "https://ecommerceapp.com",
    },
  ]);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  // Store the updated data for resume page
  const [dataforresume, setDataForResume] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "link") {
      setLink(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };
 // doing this from backend side means getting reonse form bakcned 
 const [isLoading, setIsLoading] = useState(false); // already present or add this at top

const handleopenai = async () => {
  if (!description.trim()) {
    alert("Please enter a description.");
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:5000/ai-refined-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    const data = await response.json();
    if (data.refined) {
      setDescription(data.refined);
    } else {
      alert("AI could not refine the description.");
    }
  } catch (err) {
    console.error("AI refinement error:", err);
    alert("Something went wrong while refining the description.");
  } finally {
    setIsLoading(false);
  }
};

 

  const addprojectsbtnhandler = async (e) => {
    e.preventDefault();

    if (!title || !link || !description) return;

    const newProject = { title, link, description };

    const formData = { email: data.user.email, password: data.user.password, project: [newProject] };
    console.log("form data in project page", formData);

    try {
      const response = await fetch('http://localhost:5000/projectpg-homepg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log('project page backend response:', responseData);

      if (responseData.success) {
        // Update local projects array with the new project
        setProjects([...projects, { id: projects.length + 1, ...newProject }]);

        // Clear form fields
        setTitle("");
        setLink("");
        setDescription("");

        // Store the updated data for resume page
        setDataForResume(responseData);
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const skillsbtnhandler = () => {
    console.log("data for resume", dataforresume);
    navigate('/experiencepg', {
      state: { user: dataforresume.user }, // Pass the updated data to Resume page
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 p-4">
      <div className="w-full max-w-xl bg-stone-100 bg-opacity-100 p-7 rounded-lg shadow-lg border-gray-900">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Project Manager
        </h1>
        {/* Form Section */}
        <form onSubmit={addprojectsbtnhandler} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-800">
              Project Name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="Enter project name"
              className="mt-1 w-full px-3 py-2 bg-gray-200 border border-purple-700 rounded focus:outline-none focus:ring-2  focus:ring-purple-600  text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-900">
              Project Link
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={link}
              onChange={handleChange}
              placeholder="Enter project link"
              className="mt-1 w-full px-3 py-2 bg-gray-200 border border-purple-700 rounded focus:outline-none focus:ring-2  focus:ring-purple-600  text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
              Project Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Enter project description"
              rows="3"
              className="mt-1 w-full px-3 py-2 bg-gray-200 border border-purple-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-700 resize-none"
            ></textarea>
          </div>
          {/* here will be the button when user clicked the descripion will be sent to gpt and then refined and given by it  */}
          <button
             type="button"
             onClick={handleopenai}
           disabled={isLoading}
             className={`px-3 py-1 rounded text-white text-sm transition ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-800"
            }`}
            >
              {isLoading ? "Refining..." : "✨ Refine with AI"}
            </button>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-900 transition"
          >
            Add More Project
          </button>
        </form>

        {/* Project List Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Projects</h2>
          {projects.length === 0 ? (
            <p className="text-gray-400">No projects added yet.</p>
          ) : (
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project.id} className="p-4 bg-purple-300 rounded">
                  <h3 className="text-xl font-bold text-gray-600">{project.title}</h3>
                  <p className="text-gray-600 mt-1">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:underline mt-2 inline-block"
                  >
                    Visit Project
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={skillsbtnhandler}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition "
          >
            Go to Experience Page
          </button>
        </div>
      </div>
      <div className="w-full p-6 md:p-10 lg:p-16 bg-purple-100 overflow-y-auto h-full md:col-span-1">
        <div
          className="h-full overflow-y-auto p-4 border border-gray-300 shadow-lg rounded-lg"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", position: "sticky", top: "0" }}
        >
          <>
          <div className="w-[60vw] h-[90vh] max-w-[1000px] overflow-auto p-6 bg-white rounded-lg shadow-lg">
<div className="text-left">
  {/* Header */}
  <div className="mb-5">
    <h1 className="text-2xl font-bold">{data.user.name}</h1>
    <h2 className="text-xl text-gray-700">{data.user.proffession}</h2>
    <p className="text-sm text-gray-600">Email: {data.user.email}  Phone:{data.user.phone}</p>
    <p className="text-sm text-gray-600">LinkedIn:{data.user.linkedin}</p>
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
                {data.user.skills.map((skill, index) => (
                  <p key={`${skill}-${index}`} className="text-sm text-gray-700">{skill}</p>
                ))}
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
   {projects.map((project)=>(
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
                {data.user.languagesSelected.map((language, index) => (
                   <p key={`${language}-${index}`} className="text-sm text-gray-700">{language}</p>
               ))}
              </div>
</div>
</div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Projectpg;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Skillpg = () => {
  const location = useLocation();
  const data = location.state;
  console.log("data received in skills pg ", data);

  console.log(data.user.skills);

  const [skills, setSkills] = useState(data.user.skills || ["Root-cause analysis", "Project management"]);
  const [languagesSelected, setLanguagesSelected] = useState(data.user.languagesSelected || ["English"]);
  const navigate = useNavigate();

  const expertRecommended = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
  ];

  const predefinedSkills = [
    "Communication Skills",
    "Teamwork",
    "Problem-solving",
    "Adaptability",
    "Critical Thinking",
    "Time Management",
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Ruby",
    "PHP",
    "Go",
    "Swift",
    "Kotlin",
    "HTML",
    "CSS",
    "React.js",
    "Angular",
    "Vue.js",
    "Next.js",
    "Node.js",
    "Bootstrap",
    "Tailwind CSS",
  ];

  const predefinedLanguages = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Japanese",
    "Russian",
    "Portuguese",
    "Arabic",
  ];

  // Functions for managing skills
  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // Functions for managing languages
  const addLanguage = (language) => {
    if (language && !languagesSelected.includes(language)) {
      setLanguagesSelected([...languagesSelected, language]);
    }
  };

  const removeLanguage = (language) => {
    setLanguagesSelected(languagesSelected.filter((l) => l !== language));
  };

  const projectsbtnhandler = async () => {
    const formdata3 = { email: data.user.email, password: data.user.password, skills, languagesSelected };
    console.log('formdata3 is', formdata3);

    try {
      const response = await fetch('http://localhost:5000/skillpg-homepg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata3),
      });

      const data1 = await response.json();
      console.log('skill button response:', data1);

      if (data1.success) {
        navigate('/Projectpg', {
          state: { user: data1.user },
        });
        console.log("response from backend after skills btn ", data1);
      } else {
        alert(data1.message);
      }
    } catch (error) {
      console.error('Error submitting login form:', error);
    }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 w-full h-screen overflow-y-auto">
      {/* Left Section - Scrollable Skills and Languages Form */}
      <div className="w-full p-6 md:p-10 lg:p-16 bg-stone-50 md:border-r border-gray-300 overflow-y-auto h-full">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold text-purple-700">
          Time to Highlight Your Skills and Languages
        </h2>
        <p className="text-center text-sm sm:text-base lg:text-lg text-gray-500">
          Choose from our pre-written examples below or write your own.
        </p>

        {/* Skills Section */}
        <div className="w-full p-6 mt-6 rounded-lg bg-white border border-gray-300 shadow-md border-purple-700">
          <h3 className="text-lg font-semibold mb-3">Choose Predefined Skills</h3>
          <select
            className="w-full p-2 sm:p-3 border border-gray-400 rounded-lg focus:outline-none"
            onChange={(e) => addSkill(e.target.value)}
          >
            <option value="">Select a skill</option>
            {predefinedSkills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        {/* Your Skills Section */}
        <div className="w-full p-6 mt-6 bg-white rounded-lg border border-purple-700 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Your Skills</h3>
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-purple-200 p-4 rounded-lg"
              >
                <span>{skill}</span>
                <button
                  className="text-red-500 font-semibold hover:underline"
                  onClick={() => removeSkill(skill)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div className="w-full p-6 mt-6 bg-white rounded-lg border border-gray-300 shadow-md border-purple-700">
          <h3 className="text-lg font-semibold mb-4">Add Language</h3>
          <select
            className="w-full p-2 sm:p-3 border border-gray-400 rounded-lg focus:outline-none"
            onChange={(e) => addLanguage(e.target.value)}
          >
            <option value="">Select a language</option>
            {predefinedLanguages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Your Languages Section */}
        <div className="w-full p-6 mt-6 bg-white rounded-lg border border-purple-700 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Your Languages</h3>
          <div className="space-y-2">
            {languagesSelected.map((language, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-purple-200 p-4 rounded-lg"
              >
                <span>{language}</span>
                <button
                  className="text-red-500 font-semibold hover:underline"
                  onClick={() => removeLanguage(language)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-5">
          <button
            className="bg-purple-600 text-gray-100 px-6 py-2 rounded-lg border border-gray-100 hover:bg-purple-800"
            onClick={() => navigate("/Educationpg")}
          >
            Back: Education
          </button>
          <button
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-800"
            onClick={projectsbtnhandler}
          >
            Next: Projects
          </button>
        </div>
      </div>

      {/* Right Section - Fixed Resume Preview */}
      <div className="w-full p-6 md:p-10 lg:p-16 bg-stone-50 overflow-y-auto h-full md:col-span-1">
        <div
          className="h-full overflow-y-auto p-4 border border-gray-300 shadow-lg rounded-lg"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="w-[60vw] h-[90vh] max-w-[1000px] overflow-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="text-left">
              {/* Header */}
              <div className="mb-5">
                <h1 className="text-2xl font-bold">{data.user.name}</h1>
                <h2 className="text-xl text-gray-700">{data.user.proffession}</h2>
                <p className="text-sm text-gray-600">Email: {data.user.resumeformemail}  Phone:{data.user.phone}</p>
                <p className="text-sm text-gray-600">LinkedIn: {data.user.linkedin}</p>
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
                {skills.map((skill) => (
                  <p key={skill} className="text-sm text-gray-700">{skill}</p>
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
                {languagesSelected.map((language) => (
                  <p key={language} className="text-sm text-gray-700">{language}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hide Scrollbar for the entire page */}
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
        body {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Skillpg;
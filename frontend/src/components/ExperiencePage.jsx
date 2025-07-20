import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Resume from "./Resume";

const ExperiencePage = () => {
  const navigate = useNavigate();

  const location = useLocation()
  const data = location.state;
  console.log("data received in experience page", data);
  const [isLoading, setIsLoading] = useState(false); // already present or add this at top

 const handleopenai = async (index = null) => {
  let textToRefine;

  if (index !== null) {
    textToRefine = experiences[index].description;
  } else {
    textToRefine = professionalSummary;
  }

  if (!textToRefine.trim()) {
    alert("Please enter text to refine.");
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:5000/ai-refined-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: textToRefine }),
    });

    const data = await response.json();
    if (data.refined) {
      if (index !== null) {
        const updatedExperiences = [...experiences];
        updatedExperiences[index].description = data.refined;
        setExperiences(updatedExperiences);
      } else {
        setProfessionalSummary(data.refined);
      }
    } else {
      alert("AI could not refine the text.");
    }
  } catch (err) {
    console.error("AI refinement error:", err);
    alert("Something went wrong while refining.");
  } finally {
    setIsLoading(false);
  }
};


  const [experiences, setExperiences] = useState(data.user.experience || [
    {
      experienceType: "",
      companyName: "",
      companyLocation: "",
      startYear: "",
      endYear: "",
      description: "",
    },
  ]);

  const [professionalSummary, setProfessionalSummary] = useState(data.user.professionalSummary || "");

  const handleChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        experienceType: "",
        companyName: "",
        companyLocation: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ]);
  };
  console.log("experiences are", experiences);

  const [formDataResponse, setFormDataResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const experience of experiences) {
      if (
        !experience.experienceType ||
        !experience.companyName ||
        !experience.companyLocation ||
        !experience.startYear ||
        !experience.endYear ||
        !experience.description
      ) {
        alert("All fields are required for each experience!");
        return;
      }
    }

    const formdata = { experience: experiences, professionalSummary: professionalSummary, email: data.user.email, password: data.user.password };
    console.log("form data in experience page", formdata);

    try {
      const response = await fetch('http://localhost:5000/experiencepg-homepg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });



      const responseData = await response.json();
      console.log('experience page backend response:', responseData);

      if (responseData.success) {
        // Update local projects array with the new project
        setFormDataResponse(responseData);
        console.log("congrats");
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }




    // console.log("Experience Data Submitted:", experiences);
    // console.log("Professional Summary Submitted:", professionalSummary);
    // alert("Experience details and professional summary submitted successfully!");
  };

  const resumebtnhandler = () => {
    navigate('/Resume', {
      state: { user: formDataResponse.user },
    });

  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center bg-stone-100 p-8 border-black">
      {/* Left Section */}
      <div className="w-full md:w-1/2 max-w-xl bg-stone-100 p-8 rounded-lg shadow-xl border-gray-400 border-1 mx-auto md:ml-8 lg:ml-30 overflow-y-auto max-h-screen">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
          Experience Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="space-y-6 border p-4 rounded-lg bg-white shadow-md mb-4"
            >
              {/* Experience Type Section */}
              <div>
                <label className="block text-lg font-semibold text-purple-900 mb-2">
                  Role/Position:
                </label>
                <input
                  type="text"
                  value={experience.experienceType}
                  onChange={(e) =>
                    handleChange(index, "experienceType", e.target.value)
                  }
                  placeholder="Enter your role or position"
                  className="w-full px-4 py-2 bg-gray-100 border-2 border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                />
              </div>

              {/* Company Name Section */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Company Name:
                </label>
                <input
                  type="text"
                  value={experience.companyName}
                  onChange={(e) =>
                    handleChange(index, "companyName", e.target.value)
                  }
                  placeholder="Enter your company name"
                  className="w-full px-4 py-2 bg-gray-100 border-2 border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                />
              </div>

              {/* Company Location Section */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Company Location:
                </label>
                <input
                  type="text"
                  value={experience.companyLocation}
                  onChange={(e) =>
                    handleChange(index, "companyLocation", e.target.value)
                  }
                  placeholder="Enter your company location"
                  className="w-full px-4 py-2 bg-gray-100 border-2 border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                />
              </div>

              {/* Start and End Year Section */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Start Year:
                </label>
                <input
                  type="number"
                  value={experience.startYear}
                  onChange={(e) =>
                    handleChange(index, "startYear", e.target.value)
                  }
                  min="1900"
                  placeholder="Enter start year"
                  className="w-full px-4 py-2 bg-gray-100 border-2 border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  End Year:
                </label>
                <input
                  type="number"
                  value={experience.endYear}
                  onChange={(e) =>
                    handleChange(index, "endYear", e.target.value)
                  }
                  min="1900"
                  placeholder="Enter end year"
                  className="w-full px-4 py-2 bg-gray-100 border-2 border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                />
              </div>

              {/* Description Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-lg font-semibold text-gray-800">
                    Describe Your Experience:
                  </label>
                  <button
                    type="button"
                    onClick={() => handleopenai(index)}
                    className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-800 text-sm"
                  >
                    Refine with AI
                  </button>
                </div>

                <textarea
                  value={experience.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  placeholder="Enter details about your experience"
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-100 border-2 border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 resize-none"
                ></textarea>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="w-full py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-900 transition"
          >
            Add
          </button>

          {/* Professional Summary Section */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-lg font-semibold text-gray-800">
                Professional Summary:
              </label>
              <button
                type="button"
                onClick={() => handleopenai(null)}
                className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-800 text-sm"
              >
                Refine with AI
              </button>
            </div>
            <textarea
              value={professionalSummary}
              onChange={(e) => setProfessionalSummary(e.target.value)}
              placeholder="Add professional summary"
              rows="4"
              className="w-full px-4 py-2 bg-gray-100 border-2 border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-800 transition"
          >
            Submit Experience
          </button>
        </form>

        {/* Navigation Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={resumebtnhandler}
            className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-900 transition"
          >
            Go to Skills
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-16 bg-stone-100 overflow-y-auto h-full">
        <div
          className="h-full overflow-y-auto p-4 border border-gray-300 shadow-lg rounded-lg"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            position: "sticky",
            top: "0",
          }}
        >
          <>
            <div className="w-[60vw] h-[90vh] max-w-[1000px] overflow-auto p-6 bg-white rounded-lg shadow-lg">
              <div className="text-left">
                {/* Header */}
                <div className="mb-5">
                  <h1 className="text-2xl font-bold">{data.user.name}</h1>
                  <h2 className="text-xl text-gray-700">{data.user.proffession}</h2>
                  <p className="text-sm text-gray-600">Email: {data.user.email} | Phone:{data.user.phone}</p>
                  <p className="text-sm text-gray-600">LinkedIn:{data.user.linkedin}</p>
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
                  {experiences.map((experience) => (
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
                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-gray-700"><strong>Bachelor of Science in Computer Science</strong></p>
                    <span className="text-sm text-gray-500">2013-2017</span>
                  </div>
                  <p className="text-sm text-gray-700">University of California, Berkeley — Berkeley, CA</p>
                  <p className="text-sm text-gray-700">Graduated: May 2017</p>
                  <p className="text-sm text-gray-700">Dean’s List, 2015-2017</p>
                  <p className="text-sm text-gray-700">Relevant Coursework: Data Structures, Web Development, Algorithms, Database Management</p>
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
                  {data.user.project.map((project) => (
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
    </div>
  );
};

export default ExperiencePage;
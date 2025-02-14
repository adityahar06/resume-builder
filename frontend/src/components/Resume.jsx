// import React from "react";
// import { useLocation } from "react-router-dom";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";

// const Resume = () => {
//   const location = useLocation();
//   const data = location.state;
//   console.log(data);

//   const downloadPDF = () => {
//     const input = document.getElementById("resume-content");
    
//     html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();

//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;

//       const ratio = imgWidth / imgHeight;
//       const newWidth = pdfWidth;
//       const newHeight = pdfWidth / ratio; // Maintain aspect ratio

//       pdf.addImage(imgData, "PNG", 0, 0, newWidth, newHeight);
//       pdf.save("resume.pdf");
//     });
//   };

//   return (
//     <div className="w-full h-screen flex justify-center items-center bg-gray-100">
//       <div
//         id="resume-content"
//         className="w-[210mm] h-[297mm] max-w-[800px] p-6 border shadow-md scale-90"
//         style={{ transform: "scale(0.8)", transformOrigin: "top center" }}
//       >
//         <div className="text-left text-sm">
//           {/* Header */}
//           <div className="mb-3">
//             <h1 className="text-xl font-bold">{data.user.name}</h1>
//             <h2 className="text-lg">{data.user.proffession}</h2>
//             <p>Email: {data.user.email} | Phone: {data.user.phone}</p>
//             <p>LinkedIn: {data.user.linkedin}</p>
//           </div>
//           <hr className="mb-3" />

//           {/* Professional Summary */}
//           <div className="mb-3">
//             <h3 className="font-semibold">Professional Summary</h3>
//             <p>
//               Experienced Software Engineer passionate about innovative web apps and problem-solving.
//             </p>
//           </div>

//           {/* Skills */}
//           <div className="mb-3">
//             <h3 className="font-semibold">Skills</h3>
//             <ul>
//               {data.user.skills.map((skill, index) => (
//                 <li key={index}>{skill}</li>
//               ))}
//             </ul>
//           </div>
//           <hr className="mb-3" />

//           {/* Education */}
//           <div className="mb-3">
//             <h3 className="font-semibold">Education</h3>
//             {data.user.education.map((edu, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <p>
//                   <strong>{edu.degree} in {edu.fieldofstudy}</strong>
//                 </p>
//                 <span>{edu.startingyear}-{edu.passingyear}</span>
//               </div>
//             ))}
//           </div>

//           {/* Certifications */}
//           <div className="mb-3">
//             <h3 className="font-semibold">Certifications</h3>
//             <ul>
//               <li>JavaScript Developer - JavaScript Institute</li>
//               <li>React Developer Certification - FreeCodeCamp</li>
//             </ul>
//           </div>
//           <hr className="mb-3" />

//           {/* Projects */}
//           <div className="mb-3">
//             <h3 className="font-semibold">Projects</h3>
//             {data.user.project.map((project, index) => (
//               <div key={index} className="mb-2">
//                 <h4 className="font-semibold">
//                   <a href={project.link} target="_blank">{project.title}</a>
//                 </h4>
//                 <p>{project.description}</p>
//               </div>
//             ))}
//           </div>
//           <hr className="mb-3" />

//           {/* Languages */}
//           <div className="mb-3">
//             <h3 className="font-semibold">Languages</h3>
//             <ul>
//               {data.user.languagesSelected.map((lang, index) => (
//                 <li key={index}>{lang}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Download Button */}
//       <div className="mt-5 text-center">
//         <button
//           onClick={downloadPDF}
//           className="px-3 py-1 text-sm border rounded-lg transition"
//         >
//           Download PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Resume;



import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Resume = () => {
  const location = useLocation();
  const data = location.state;
  console.log("resume page data is ", data);

  const downloadPDF = () => {
    const input = document.getElementById("resume-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the image of the resume content
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Now handle the clickable links for projects
      let yOffset = 250; // Initial Y position for projects

      data.user.project.forEach((project) => {
        // Adding clickable project link directly on the project title
        pdf.textWithLink(
          project.title, // The text for the link
          10, // X-coordinate position of the text
          yOffset, // Y-coordinate position of the text
          { url: project.link } // The URL of the link
        );
        
        // Increase the Y-offset for the next project
        yOffset += 10;  // Adjust the spacing between projects as needed
      });

      pdf.save("resume.pdf");
    });
  };

  return (
    <div>
      {/* The content that will be captured */}
      <div
        className="w-[210mm] h-[297mm] max-w-[1000px] overflow-auto p-6 border rounded shadow-md"
        id="resume-content"
      >
        <div className="text-left">
          {/* Header */}
          <div className="mb-5 text-center">
            <h1 className="text-2xl font-bold">{data.user.name}</h1>
            <h2 className="text-xl">{data.user.proffession}</h2>
            <p className="text-sm">Email: {data.user.email} | Phone: {data.user.phone}</p>
            <p className="text-sm">LinkedIn: {data.user.linkedin}</p>
          </div>
          <hr className="mb-5" />

          {/* Professional Summary */}
          <div className="mb-5">
            <h3 className="text-lg font-semibold">Professional Summary</h3>
            <p className="text-sm">
              Experienced Software Engineer with a passion for building innovative web applications and solving
              complex problems. Strong background in full-stack development and Agile methodologies.
            </p>
          </div>

          {/* Skills */}
          <div className="mb-5">
            <h3 className="text-lg font-semibold">Skills</h3>
            <ul className="flex flex-wrap pl-0">
              {data.user.skills.map((skill) => (
                <li className="flex items-center text-sm mr-6" key={skill}>
                  <span className="mr-2">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <hr className="mb-5" />

          {/* Professional Experience */}
          <div className="mb-5">
            <h3 className="text-lg font-semibold">Professional Experience</h3>
            {data.user.experience.map((job, index) => (
              <div className="mb-5" key={index}>
                <h4 className="text-lg font-semibold">
                  {job.experienceType} - {job.companyName}
                </h4>
                <p className="text-sm">{job.startYear}-{job.endYear} | {job.companyLocation}</p>
              </div>
            ))}
          </div>
          <hr className="mb-5" />

          {/* Education */}
          <div  className="mb-5">
          <h3 className="text-lg font-semibold  border-b-2  pb-2">
            Education
          </h3>

          {data.user.education.length > 0 ? (
            <div className="mt-4">
              {data.user.education.map((entry, index) => (
                <div key={index} className="mb-5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold ">
                      {entry.degree || "Degree Not Specified"}
                    </h4>
                    <span className="text-sm ">
                      {entry.startYear || "Start Year"} - {entry.endYear || "End Year"}
                    </span>
                  </div>
                  <p className="text-sm ">{entry.institution || "Institution Not Provided"}</p>

                  <p className="text-sm ">
                    <span className=" font-medium">Field of Study:</span> {entry.fieldofstudy || "N/A"}
                  </p>

                  <ul className="list-disc pl-5 mt-2">
                    <li className="text-sm ">
                      <span className=" font-medium">10th Percentage:</span> {entry.tenthpercentage || "N/A"}
                    </li>
                    <li className="text-sm ">
                      <span className=" font-medium">12th Percentage:</span> {entry.twelvethpercentage || "N/A"}
                    </li>
                    <li className="text-sm ">
                      <span className="font-medium">Overall CGPA:</span> {entry.overallCGPA || "N/A"}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm  mt-3">No education data available.</p>
          )}

          <hr className="mb-5" />
        </div>
          
          <hr className="mb-5" />
          
          {/* Certifications */}
          <div className="mb-5">
            <h3 className="text-lg font-semibold">Certifications</h3>
          </div>

          <hr className="mb-5" />
          
          {/* Projects */}
          <div className="mb-5">
            <h3 className="text-lg font-semibold">Projects</h3>
            {data.user.project.map((project) => (
              <div className="mb-5" key={project.title}>
                <h4 className="text-lg font-semibold">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </h4>
                <p className="text-sm">{project.description}</p>
              </div>
            ))}
          </div>
          
          <hr className="mb-5" />
          
          {/* Languages */}
          <div className="mb-5">
            <h3 className="text-lg font-semibold">Languages</h3>
            <ul className="list-disc pl-5">
              {data.user.languagesSelected.map((language) => (
                <li className="text-sm" key={language}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The button that will not appear in the PDF */}
      <div className="mt-5 text-center">
        <button
          onClick={downloadPDF}
          className="px-4 py-2 border rounded-lg transition"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Resume;
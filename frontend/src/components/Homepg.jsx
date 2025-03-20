import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BoyImage from '../../public/Women.jpg';

// import Resume from "../../public/Resume.jpeg";


const Homepg = () => {
  const [user, setUser] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([    // Store reviews
    {
      rating: 5,
      text: "This resume builder is the best! It helped me create a professional resume easily."
    }
  ]);

  console.log("the reviews are",reviews);

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();
    const formData = { email: loginEmail, password: loginPassword };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        navigate('/Personalpg', {
          state: { user: data.user },
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  const registeruser = async (e) => {
    e.preventDefault();
    setUser('login');
    const formData = { email: registerEmail, password: registerPassword };

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        console.log("User created successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  // Handle Review Submission
  const submitReview = async(e) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim() === "") {
      alert("Please provide a rating and review text.");
      return;
    }

    const formdata={reviewText,rating};
   
    console.log("review is",formdata);


    try {
      const response = await fetch('http://localhost:5000/reviewpg-homepg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

      const responseData = await response.json();
      console.log('reviewpage backend response:', responseData);

      if (responseData.success) {


        
       
        setReviewText("");  
        setRating(0); 
        window.location.reload();
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }




  
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        
        const response = await fetch('http://localhost:5000/reviews'); 
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const createresume = () => {
    navigate('/Personalpg', {
      state: { user: data.user },
    });
  };

  const Logout = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navigation Bar */}
      <nav className="bg-[#f6f1f9] text-black p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-800">Resume <span className="text-red">Builder</span></h1>
          <div className="space-x-4">
            <a href="/" className="text-black hover:underline">Contact us</a>
            <a href="#about" className="text-black hover:underline">About</a>
            <a href="#features" className="text-black hover:underline">Template</a>
            <button onClick={Logout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 hover:underline">Logout</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-row gap-10 w-full h-full justify-center items-center p-4 sm:p-8">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-black text-center">
            Resume <span className="text-red" style={{ color: '#8f00ff' }}>Builder</span>
          </h1>
          <p className="text-2xl sm:text-3xl text-[#5e2a8c] mt-4 text-center">Build your Dreams</p>
          <p className="italic text-lg sm:text-xl text-black mt-6 text-center">"Your resume is your first impression - make it count."</p>
          <p className="text-lg sm:text-xl text-[#5e2a8c] mt-6 text-center leading-relaxed">
            Start building your perfect resume with ease using our resume builder. A well-crafted resume opens doors to better opportunities. Make your first impression count!
          </p>

          {/* buttons */}
          <div className="flex gap-25 mt-22">
            <button onClick={createresume} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
              Create Resume
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
              Update Resume
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full">
          <img
            src={BoyImage}
            alt="Woman working on laptop"
            className="w-3/4 md:w-2/3 lg:w-1/1 h-auto object-contain"
          />
        </div>
      </div>

      {/* Review Section */}
      <section className="bg-white p-8 mt-10 rounded-lg shadow-lg mx-4 sm:mx-10 lg:mx-32">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#5e2a8c]">Customer Reviews</h2>
        
        {/* Displaying Reviews */}
        <div className="flex flex-col space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-300 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex justify-start items-center space-x-2">
                {/* Star Rating */}
                {[...Array(5)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    className={`w-6 h-6 ${starIndex < review.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15.27l4.18 2.73-1.64-5.45L18 7.45l-5.46-.47L10 2 7.46 6.98 2 7.45l4.46 5.1L5.82 18z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mt-2">{review.reviewtext}</p>
            </div>
          ))}
        </div>

        {/* Review Form */}
        <form className="mt-6" onSubmit={submitReview}>
          <h3 className="text-2xl font-semibold text-[#5e2a8c] mb-3">Write a Review</h3>
          <div className="flex justify-start items-center space-x-2 mb-4">
            {/* Star Rating for Review */}
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${index < rating ? 'text-yellow-500' : 'text-gray-400'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                onClick={() => setRating(index + 1)}
              >
                <path d="M10 15.27l4.18 2.73-1.64-5.45L18 7.45l-5.46-.47L10 2 7.46 6.98 2 7.45l4.46 5.1L5.82 18z" />
              </svg>
            ))}
          </div>
          <textarea
            className="w-full p-4 rounded-lg resize-none border-2 border-gray-300 focus:outline-none focus:border-purple-500"
            rows="4"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className="w-full">
            <button
              type="submit"
              className="mt-4 px-8 mx-auto bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all duration-300"
            >
              Submit Review
            </button>
          </div>
        </form>
      </section>

      {/* Footer Bar */}
      <footer className="bg-[#f6f1f9] text-black p-4 mt-auto">
        <div className="text-center">
          <p>&copy; 2025 Resume Builder. All rights reserved. @Gaurav @Mayank @Aditya</p>
          <div className="space-x-4">
            <a href="#privacy" className="text-black hover:underline">Privacy Policy</a>
            <a href="#terms" className="text-black hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepg;
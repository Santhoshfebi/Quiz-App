// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";


// export default function Welcome() {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [place, setPlace] = useState("");
//   const navigate = useNavigate();
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const scheduledTime = new Date("2025-10-08T18:00:00"); // YYYY-MM-DDTHH:MM:SS
//   const [isQuizAvailable, setIsQuizAvailable] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();
//       setCurrentTime(now);
//       setIsQuizAvailable(now >= scheduledTime);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleStart = () => {
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!name || !phone || !place) {
//       alert("Please fill all fields");
//       return;
//     }
//     if (!phoneRegex.test(phone)) {
//       alert("Please enter a valid 10-digit phone number");
//       return;
//     }
//     navigate("/quiz", { state: { name, phone, place } });
//   };

//   return (
//     <div className="flex flex-col md:flex-row items-start justify-center min-h-screen bg-gray-50 p-4">
//       {/* Left: Input Form */}
//       <div className=" mt-20 w-96 bg-white p-6 rounded-2xl shadow-lg space-y-4">
//        <h1 className="text-2xl font-bold text-center">Welcome to the Quiz!</h1>
//        <p className="text-center">Enjoy the Quiz...!</p>
//        <h5 className="text-xl font-bold text-center">Chapter: Mock Round</h5>
//        <input
//          type="text"
//          placeholder="Your Name"
//          value={name}
//          onChange={(e) => setName(e.target.value)}
//          className="w-full border px-3 py-2 rounded-lg "
//        />
//        <input
//        type="tel"
//          placeholder="Phone Number"
//          value={phone}
//          onChange={(e) => setPhone(e.target.value)}
//          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//          maxLength={10}/>
//        <input
//        type="text" 
//          placeholder="Division"
//          value={place}
//          onChange={(e) => setPlace(e.target.value)}
//          className="w-full border px-3 py-2 rounded-lg "
//        />
//        <button
//          onClick={handleStart}
//          className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-green-600"
//        >
//          Start Quiz
//        </button>
//      </div>

//       {/* Right: Tips Section */}
//       <div className="md:ml-8 mt-20 md:mt-20 bg-white p-6 rounded-2xl shadow-md w-full md:w-1/3">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">💡 Quiz Tips</h2>
//         <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm leading-relaxed">
//           <li>ஒவ்வொரு கேள்விக்கும் பதில் சொல்ல 20 விநாடிகள் மட்டுமே உண்டு.</li>
//           <li>ஒரு முறை தேர்ந்தெடுத்த பதிலை மாற்ற முடியாது.</li>
//           <li>அனைத்து கேள்விகளுக்கும் பதில் சொல்ல முயலுங்கள்.</li>
//           <li>சரியான பதில்களுக்கு மதிப்பெண் வழங்கப்படும்.</li>
//           <li>முடிவில் உங்கள் ரேங்க் மற்றும் முன்னணி பட்டியல் காணலாம்.</li>
//         </ul>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en"); // 🌐 default English

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ta" : "en"));
  };

  const handleStart = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!name || !phone || !place) {
      alert(language === "en" ? "Please fill all fields" : "எல்லா புலங்களையும் நிரப்பவும்");
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert(language === "en" ? "Please enter a valid 10-digit phone number" : "தயவுசெய்து செல்லுபடியாகும் 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்");
      return;
    }
    navigate("/quiz", { state: { name, phone, place, language } });
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-center min-h-screen bg-gray-50 p-4">
      
      {/* Left: Input Form */}
      <div className="mt-20 w-96 bg-white p-6 rounded-2xl shadow-lg space-y-4">
        {/* 🌐 Language Toggle */}
        

        <h1 className="text-2xl font-bold text-center">
          {language === "en" ? "Welcome to the Quiz...!" : "வினாடி வினாவிற்கு வருக...!"}
        </h1>
        <p className="text-center">
          {language === "en" ? "Enjoy the Quiz Lets get Started...!" : "வினாடி வினாவை அனுபவிக்கவும்...!"}
        </p>
        <h5 className="text-xl font-bold text-center">
          {language === "en" ? "Chapter: Mock Round" : "அத்தியாயம்: மொக் சுற்று"}
        </h5>

        <input
          type="text"
          placeholder={language === "en" ? "Your Name" : "உங்கள் பெயர்"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <input
          type="tel"
          placeholder={language === "en" ? "Phone Number" : "தொலைபேசி எண்"}
          value={phone}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, "");
            setPhone(val);
          }}
          maxLength={10}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder={language === "en" ? "Division / Place" : "இடம்"}
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <div className="flex justify-center">
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-gray-400 transition"
          >
            {language === "en" ? "தமிழில் காண்க" : "View in English"}
          </button>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-green-600"
        >
          {language === "en" ? "Start Quiz" : "வினாடி வினாவை தொடங்கு"}
        </button>
      </div>

      {/* Right: Tips Section */}
      <div className="md:ml-8 mt-20 md:mt-20 bg-white p-6 rounded-2xl shadow-md w-full md:w-1/3">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {language === "en" ? "💡 Quiz Tips" : "💡 வினா குறிப்புகள்"}
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm leading-relaxed">
          <li>{language === "en" ? "Each question has only 20 seconds." : "ஒவ்வொரு கேள்விக்கும் 20 விநாடிகள் மட்டுமே உண்டு."}</li>
          <li>{language === "en" ? "Once selected, answers cannot be changed." : "ஒருமுறை தேர்ந்தெடுத்த பதிலை மாற்ற முடியாது."}</li>
          <li>{language === "en" ? "Try to answer all questions." : "அனைத்து கேள்விகளுக்கும் பதில் சொல்ல முயலுங்கள்."}</li>
          <li>{language === "en" ? "Correct answers are scored." : "சரியான பதில்களுக்கு மதிப்பெண் வழங்கப்படும்."}</li>
          <li>{language === "en" ? "Your rank and leaderboard will be displayed at the end." : "முடிவில் உங்கள் ரேங்க் மற்றும் முன்னணி பட்டியல் காணலாம்."}</li>
        </ul>
      </div>
    </div>
  );
}

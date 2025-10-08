// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Welcome() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [place, setPlace] = useState("");

//   const handleStart = () => {
//      const phoneRegex = /^[0-9]{10}$/;
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
//     <div className="mx-auto mt-20 w-96 bg-white p-6 rounded-2xl shadow-lg space-y-4">
//       <h1 className="text-2xl font-bold text-center">Welcome to the Quiz!</h1>
//       <p className="text-center">Enjoy the Quiz...!</p>
//       <h5 className="text-xl font-bold text-center">Chapter: Mock Round</h5>
//       <input
//         type="text"
//         placeholder="Your Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full border px-3 py-2 rounded-lg "
//       />
//       <input
//       type="tel"
//         placeholder="Phone Number"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//         maxLength={10}/>
//       <input
//       type="text" 
//         placeholder="Division"
//         value={place}
//         onChange={(e) => setPlace(e.target.value)}
//         className="w-full border px-3 py-2 rounded-lg "
//       />
//       <button
//         onClick={handleStart}
//         className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-green-600"
//       >
//         Start Quiz
//       </button>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!name || !phone || !place) {
      alert("Please fill all fields");
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    navigate("/quiz", { state: { name, phone, place } });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Left: Input Form */}
      <div className=" mt-20 w-96 bg-white p-6 rounded-2xl shadow-lg space-y-4">
       <h1 className="text-2xl font-bold text-center">Welcome to the Quiz!</h1>
       <p className="text-center">Enjoy the Quiz...!</p>
       <h5 className="text-xl font-bold text-center">Chapter: Mock Round</h5>
       <input
         type="text"
         placeholder="Your Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
         className="w-full border px-3 py-2 rounded-lg "
       />
       <input
       type="tel"
         placeholder="Phone Number"
         value={phone}
         onChange={(e) => setPhone(e.target.value)}
         className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
         maxLength={10}/>
       <input
       type="text" 
         placeholder="Division"
         value={place}
         onChange={(e) => setPlace(e.target.value)}
         className="w-full border px-3 py-2 rounded-lg "
       />
       <button
         onClick={handleStart}
         className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-green-600"
       >
         Start Quiz
       </button>
     </div>

      {/* Right: Tips Section */}
      <div className="md:ml-8 mt-8 md:mt-0 bg-white p-6 rounded-2xl shadow-md w-full md:w-1/3">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">💡 Quiz Tips</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm leading-relaxed">
          <li>ஒவ்வொரு கேள்விக்கும் பதில் சொல்ல 20 விநாடிகள் மட்டுமே உண்டு.</li>
          <li>ஒரு முறை தேர்ந்தெடுத்த பதிலை மாற்ற முடியாது.</li>
          <li>அனைத்து கேள்விகளுக்கும் பதில் சொல்ல முயலுங்கள்.</li>
          <li>சரியான பதில்களுக்கு மதிப்பெண் வழங்கப்படும்.</li>
          <li>முடிவில் உங்கள் ரேங்க் மற்றும் முன்னணி பட்டியல் காணலாம்.</li>
        </ul>
      </div>
    </div>
  );
}

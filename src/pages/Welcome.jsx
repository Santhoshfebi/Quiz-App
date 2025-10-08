import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");

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
    <div className="mx-auto mt-20 w-96 bg-white p-6 rounded-2xl shadow-lg space-y-4">
      <h1 className="text-2xl font-bold text-center">Welcome to the Quiz!</h1>
      <p className="text-center">Enjoy the Quiz...!</p>
      <h5 className="text-xl font-bold text-center">Chapter: GENESIS</h5>
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
  );
}

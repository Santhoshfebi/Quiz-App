// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { questions } from "../data/questions";
// import { supabase } from "../supabaseClient"; // ✅ import Supabase client

// export default function Quiz() {
//   const [current, setCurrent] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(20); // ⏱ 20s per question
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const participant = state || {};

//   const q = questions[current];

//   // 🕒 Timer
//   useEffect(() => {
//     if (timeLeft <= 0) {
//       // show correct answer before moving on
//       setShowAnswer(true);
//       setTimeout(() => handleNext(true), 700);
//       return;
//     }

//     if (showAnswer) return; // stop countdown if answer shown

//     const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, showAnswer]);

//   // ✅ Move to next or finish
//   const handleNext = async (auto = false, selectedOption = null) => {
//     let updatedScore = score;

//     if (!auto && selectedOption === q.answer) {
//       updatedScore += 1;
//     }

//     // Last question — save to Supabase
//     if (current >= questions.length - 1) {
//       try {
//         const { error } = await supabase.from("participants").insert([
//           {
//             name: participant.name,
//             phone: participant.phone,
//             place: participant.place,
//             score: updatedScore,
//             total: questions.length,
//           },
//         ]);
//         if (error) console.error("❌ Supabase insert error:", error);
//       } catch (err) {
//         console.error("⚠️ Error saving participant:", err);
//       }

//       navigate("/result", {
//         state: { ...participant, score: updatedScore, total: questions.length },
//       });
//     } else {
//       setCurrent((prev) => prev + 1);
//       setSelected(null);
//       setShowAnswer(false);
//       setTimeLeft(20);
//       setScore(updatedScore);
//     }
//   };

//   // ✅ When selecting an answer
//   const handleSelect = (option) => {
//     setSelected(option);
//     setShowAnswer(true);
//     // delay before next
//     setTimeout(() => handleNext(false, option), 700);
//   };

//   const timePercent = (timeLeft / 20) * 100;

//   return (
//     <div className="md:w-3/4 w-96 mx-auto mt-20 bg-white p-6 rounded-2xl shadow-lg">
//       {/* 🧍 Participant Name */}
//       <div className="md:justify-evenly md:flex text-center mb-4 font-semibold text-lg  ">
//          <p>Participant: <span className="text-blue-950">{participant.name}</span></p>
//                <h5 className="text-xl font-bold text-center">Chapter: Mock Round</h5>
//          <div className="font-medium text-gray-700">Questions : {current + 1} / {questions.length}</div>
//        </div>

//       {/* Question Info */}
//       <div className="flex justify-end mb-2 font-medium text-gray-700">
//         <span className="text-red-600 font-semibold">⏱️ : {timeLeft}s</span>
//       </div>

//       {/* Timer Progress Bar */}
//       <div className="w-full bg-gray-200 h-3 rounded mb-3">
//         <div
//           className="h-3 bg-green-500 rounded transition-all duration-1000 ease-linear"
//           style={{ width: `${timePercent}%` }}
//         />
//       </div>

//       {/* Question */}
//       <h2 className="text-lg font-semibold mb-4">{q.question_en}</h2>
//       <h2 className="text-lg font-semibold mb-4">{q.question_ta}</h2>


//       {/* Options */}
//       <div className="space-y-3 mb-4">
//         {q.options_en.map((option) => {
//           let cls =
//             "w-full px-4 py-2 border rounded-lg transition-all duration-200 ";
//           if (showAnswer) {
//             if (option === q.answer) cls += "bg-green-500 text-white";
//             else if (selected === option) cls += "bg-red-500 text-white";
//             else cls += "opacity-70";
//           } else if (selected === option) cls += "bg-blue-500 text-white";
//           else cls += "hover:bg-gray-100";

//           return (
//             <button
//               key={option}
//               onClick={() => handleSelect(option)}
//               disabled={showAnswer}
//               className={cls}
//             >
//               {option}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { questions } from "../data/questions";
import { supabase } from "../supabaseClient";

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();
  const { state } = useLocation();
  const participant = state || {};

  const q = questions[current];
  const correctAnswer = language === "en" ? q.answer_en : q.answer_ta;

  // 🕒 Timer logic
  useEffect(() => {
    if (showAnswer) return;
    if (timeLeft <= 0) {
      setShowAnswer(true);
      setTimeout(() => handleNext(true), 700);
      return;
    }

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showAnswer]);

  // ➡️ Next question or submit
  const handleNext = async (auto = false, selectedOption = null) => {
    let updatedScore = score;
    if (!auto && selectedOption === correctAnswer) {
      updatedScore += 1;
    }

    if (current >= questions.length - 1) {
      if (hasSubmitted) return;
      setHasSubmitted(true);

      try {
        const { error } = await supabase.from("participants").insert([
          {
            name: participant.name,
            phone: participant.phone,
            place: participant.place,
            score: updatedScore,
            total: questions.length,
          },
        ]);
        if (error) console.error("Supabase insert error:", error);
      } catch (err) {
        console.error("Error saving participant:", err);
      }

      navigate("/result", {
        state: { ...participant, score: updatedScore, total: questions.length },
      });
    } else {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setShowAnswer(false);
      setTimeLeft(20);
      setScore(updatedScore);
    }
  };

  // 🧩 Select answer
  const handleSelect = (option) => {
    setSelected(option);
    setShowAnswer(true);
    setTimeout(() => handleNext(false, option), 700);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ta" : "en"));
  };

  const timePercent = (timeLeft / 20) * 100;

  return (
    <div className="md:w-3/4 w-96 mx-auto mt-20 bg-white p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 text-lg font-semibold">
        <p>
          👤 Participant:{" "}
          <span className="text-blue-950">{participant.name}</span>
        </p>
        <h5 className="text-xl font-bold text-center">📖 Chapter: Mock Round</h5>
        <div className="text-gray-700">
          Question: {current + 1} / {questions.length}
        </div>
      </div>

      {/* 🌐 Language toggle */}
      <div className="flex justify-end mb-3">
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {language === "en" ? "தமிழில் காண்க" : "View in English"}
        </button>
      </div>

      {/* Timer */}
      <div className="flex justify-end mb-2 font-medium text-gray-700">
        <span className="text-red-600 font-semibold">⏱️ : {timeLeft}s</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-3 rounded mb-3">
        <div
          className="h-3 bg-green-500 rounded transition-all duration-1000 ease-linear"
          style={{ width: `${timePercent}%` }}
        />
      </div>

      {/* Question */}
      <h2 className="text-lg font-semibold mb-2">
        {language === "en" ? q.question_en : q.question_ta}
      </h2>

      {/* Options */}
      <div className="space-y-3 mb-4">
        {(language === "en" ? q.options_en : q.options_ta).map((option, idx) => {
          let cls =
            "w-full px-4 py-2 border rounded-lg transition-all duration-200 ";

          if (showAnswer) {
            if (option === correctAnswer) cls += "bg-green-500 text-white"; // ✅ correct
            else if (selected === option && option !== correctAnswer)
              cls += "bg-red-500 text-white"; // ❌ wrong
            else cls += "opacity-70";
          } else if (selected === option) cls += "bg-blue-500 text-white";
          else cls += "hover:bg-gray-100";

          return (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              disabled={showAnswer}
              className={cls}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* ✅ Show correct answer when user is wrong */}
      {showAnswer && selected !== correctAnswer && (
        <div className="text-center mt-4 text-green-600 font-semibold">
          {language === "en"
            ? `✅ Correct Answer: ${q.answer_en}`
            : `✅ சரியான பதில்: ${q.answer_ta}`}
        </div>
      )}
    </div>
  );
}

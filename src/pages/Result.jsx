// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { supabase } from "../supabaseClient";

// export default function Result() {
//   const navigate = useNavigate();

//   // 🔹 Get participant info from navigation state
//   const { state } = useLocation();
//   const { name, phone, place, score, total } = state || {};

//   // 🔹 State to store top 3 players
//   const [topPlayers, setTopPlayers] = useState([]);

//   // 🔹 useEffect to insert participant & fetch top 3 winners
//   useEffect(() => {
//     const saveAndFetch = async () => {
//       if (!name || !phone || !place) return; // prevent null inserts

//       try {
//         // Insert participant
//         const { data: insertData, error: insertError } = await supabase
//           .from("participants")
//           .insert([{ name, phone, place, score, total }]);
//         if (insertError) throw insertError;

//         // Fetch top 3 winners
//         const { data: topData, error: fetchError } = await supabase
//           .from("participants")
//           .select("*")
//           .order("score", { ascending: false })
//           .order("created_at", { ascending: true })
//           .limit(3);
//         if (fetchError) throw fetchError;

//         setTopPlayers(topData);
//       } catch (error) {
//         console.error("Error saving or fetching participants:", error);
//       }
//     };

//     saveAndFetch();
//   }, [name, phone, place, score, total]); // runs once on mount

//   return (
//     <div>
//       <h1>Result Page</h1>
//       <p>Name: {name}</p>
//       <p>Score: {score} / {total}</p>

//       <ul>
//         {topPlayers.map((p, index) => (
//           <li key={p.id}>{p.name} - {p.score}/{p.total}</li>
//         ))}
//       </ul>
      
      

//     </div>
    
//   );
// }


// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { supabase } from "../supabaseClient";

// export default function Result() {
//   const navigate = useNavigate();

//   // 🔹 Get participant info from navigation state
//   const { state } = useLocation();
//   const { name, phone, place, score, total } = state || {};

//   // 🔹 State to store top 3 players
//   const [topPlayers, setTopPlayers] = useState([]);

//   // 🔹 useEffect to insert participant & fetch top 3 winners
//   useEffect(() => {
//     const saveAndFetch = async () => {
//       if (!name || !phone || !place) return; // prevent null inserts

//       try {
//         // Insert participant
//         const { data: insertData, error: insertError } = await supabase
//           .from("results")
//           .insert([{ name, phone, place, score, total }]);
//         if (insertError) throw insertError;

//         // Fetch top 3 winners
//         const { data: topData, error: fetchError } = await supabase
//           .from("results")
//           .select("*")
//           .order("score", { ascending: false })
//           .order("created_at", { ascending: true }) // tiebreaker
//           .limit(3);
//         if (fetchError) throw fetchError;

//         setTopPlayers(topData);
//       } catch (error) {
//         console.error("Error saving or fetching participants:", error);
//       }
//     };

//     saveAndFetch();
//   }, [name, phone, place, score, total]);

//   // 🔹 Function to get medal badges
//   const getBadge = (index) => {
//     if (index === 0) return "🥇";
//     if (index === 1) return "🥈";
//     if (index === 2) return "🥉";
//     return "";
//   };

//   if (!name || !phone || !place) {
//     return (
//       <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg text-center">
//         <h1 className="text-xl font-bold text-red-500">
//           Participant info missing!
//         </h1>
//         <button
//           className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           onClick={() => navigate("/")}
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-2xl shadow-lg space-y-6">
//       <h1 className="text-3xl font-bold text-center">🎉 Quiz Completed!</h1>
//       <p className="text-xl font-bold text-center">கலந்து கொண்டதற்கு நன்றி கர்த்தர் உங்களை ஆசீர்வதிப்பாராக.</p>
 
//       <div className="text-left space-y-1">
//         <p><strong>Name:</strong> {name}</p>
//         <p><strong>Phone:</strong> {phone}</p>
//         <p><strong>Division:</strong> {place}</p>
//       </div>

//       <p className="text-xl mt-4 text-center">
//         You scored <strong>{score}</strong> out of <strong>{total}</strong>
//       </p>

//       {/* Top 3 leaderboard */}
//       <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
//         <h2 className="text-lg font-semibold text-center mb-2 text-yellow-600">
//           🏆 Top 3 Winners
//         </h2>
//         <ul className="space-y-2">
//           {topPlayers.map((p, index) => (
//             <li
//               key={p.id}
//               className="flex justify-between items-center border-b py-1 last:border-b-0"
//             >
//               <span>{getBadge(index)} {p.name} ({p.place})</span>
//               <span>{p.score}/{p.total}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <button
//         onClick={() => navigate("/")}
//         className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 w-full"
//       >
//         Play Again
//       </button>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { name, phone, place, score, total } = state || {};
  const [topPlayers, setTopPlayers] = useState([]);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch leaderboard + rank
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Fetch all participants sorted by score
        const { data: allPlayers, error } = await supabase
          .from("participants")
          .select("*")
          .order("score", { ascending: false })
          .order("created_at", { ascending: true });

        if (error) throw error;

        // Calculate rank
        const playerIndex = allPlayers.findIndex(
          (p) =>
            p.name === name &&
            p.phone === phone &&
            p.place === place &&
            p.score === score
        );
        setRank(playerIndex >= 0 ? playerIndex + 1 : "N/A");

        // Get top 3
        const topThree = allPlayers.slice(0, 5);
        setTopPlayers(topThree);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [name, phone, place, score]);

  if (loading)
    return (
      <div className=" mt-10 "><DotLottieReact
      src="https://lottie.host/3695126e-4a51-4de3-84e9-b5b77db17695/TP1TtYQU4O.lottie"
      loop
      autoplay
    /></div>
    );

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg space-y-6 mb-5">
      <h1 className="text-3xl font-bold text-center">🎉 Quiz Completed!</h1>
      <p className="text-xl  text-center">கலந்து கொண்டதற்கு நன்றி கர்த்தர் உங்களை ஆசீர்வதிப்பாராக.</p>
      {/* ✅ Participant Info */}
      <div className="mb-4 text-left space-y-1 flex justify-evenly">
        <p className="text-lg font-semibold text-gray-800">
          {name} ({place})
        </p> 
        <p className="text-lg text-center font-semibold text-gray-800 mb-6">
        🏆 Your Rank:{" "}
        <span className="text-blue-600">
          {rank !== "N/A" ? `#${rank}` : "Unranked"}
        </span>
      </p>
      </div>

      {/* ✅ Score */}
      <p className="text-2xl mt-4 text-green-600 text-center">
         You scored <strong>{score}</strong> out of <strong>{total}</strong>
       </p>

      {/* ✅ Rank */}
      

      {/* ✅ Top 3 Leaderboard */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
        <h4 className="text-lg font-semibold text-center mb-2 text-yellow-600">🏆 Top Scorers</h4>
        <div className="space-y-2">
          {topPlayers.map((player, idx) => {
            const badge =
              idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx === 3 ? "🏅" : idx === 4 ? "🏅" : "";
            return (
              <div
                key={player.id}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{badge}</span>
                  <span className="font-medium">{player.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Restart Button */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
  {/* Play Again Button */}
  {/* <button
    onClick={() => navigate("/")}
    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
  >
    Play Again
  </button> */}

  {/* WhatsApp Button */}
  <button
    onClick={() =>
      window.open("https://chat.whatsapp.com/GEnGf9jl2SP7EfBRpCnqva?mode=wwt", "_blank")
    }
    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
  >
    💬 Join WhatsApp
  </button>
</div>
  
    </div>
  );
}

import { useState, useEffect } from "react";

const PickedYes: React.FC = () => {
    const [confirmed, setConfirmed] = useState(false);
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

    useEffect(() => {
        const img = new Image();
        img.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpobjZ0bmZidXphY3ZidXp6cHZ4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHgmZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/MDJ9IbxxvDUQM/giphy.gif"
    }, []);

    const activities = [
        "🍿 Watch a Movie",
        "🛍️ Window Shopping",
        "☕ Coffee Date",
        "🍽️ Romantic Dinner",
        "🎡 Amusement Park",
        "🍦 Ice Cream Walk",
        "🎮 Arcade Games"
    ];

    const toggleActivity = ( activity: string) => {
        if (selectedActivities.includes(activity)) {
            setSelectedActivities(selectedActivities.filter((a) => a !== activity));
        } else if (selectedActivities.length < 3) {
            setSelectedActivities([...selectedActivities, activity]);
        }
    };

        if(confirmed) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4 text-center">
                    <img 
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpobjZ0bmZidXphY3ZidXp6cHZ4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHgmZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/MDJ9IbxxvDUQM/giphy.gif" 
                    className="rounded-lg shadow-lg w-64 mb-6" 
                    alt="Happy cat"
                    />
                    <h1 className="text-4xl font-bold text-pink-600 animate-bounce">See you on Feb 14, my lovee!</h1>
                    <div className="mt-4 p-4 bg-white rounded-lg shadow-md border border-pink-200">
                        <p className="font-semibold text-slate-700">Our Plan:</p>
                        {selectedActivities.map(a => <p key={a} className="text-pink-500">{a}</p>)}
                    </div>
                </div>
            );
        }
        
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-6 text-slate-800">
                <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border-4 border-pink-200">
                    <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">Plan our Date!</h1>
                    
                    <div className="space-y-4 mb-8">
                    <div>
                        <label className="block font-bold mb-1">What time?</label>
                        <input type="time" className="w-full p-2 border-2 border-pink-100 rounded-lg focus:outline-pink-400" />
                    </div>
                    
                    <div>
                        <label className="block font-bold mb-1">Meeting Place?</label>
                        <input type="text" placeholder="Where should I pick you up?" className="w-full p-2 border-2 border-pink-100 rounded-lg focus:outline-pink-400" />
                    </div>

                    <div>
                        <label className="block font-bold mb-2">Activities (Pick 1-3):</label>
                        <div className="grid grid-cols-1 gap-2">
                        {activities.map((activity) => (
                            <button
                            key={activity}
                            onClick={() => toggleActivity(activity)}
                            className={`p-2 rounded-xl border-2 transition-all ${
                                selectedActivities.includes(activity)
                                ? "bg-pink-500 border-pink-600 text-white"
                                : "bg-pink-50 border-pink-100 text-slate-600 hover:border-pink-300"
                            }`}
                            >
                            {activity}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>

                <button disabled={selectedActivities.length === 0} onClick={() => setConfirmed(true)} 
                    className={`w-full py-3 rounded-full font-bold text-white shadow-lg transition-transform active:scale-95 ${
                        selectedActivities.length > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                        Confirm Date
                </button>
            </div>
        </div>
        );
};

export default PickedYes;
import { useState, useEffect } from "react";
import PickedYes from "./PickedYes";
import TrackingEye from "./TrackingEye";

const ValentinesPage: React.FC = () => {
  const [noCount, setNoCount] = useState<number>(0);
  const [yesPressed, setYesPressed] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  
  // States for cursor tracking and horror timing
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [horrorSequence, setHorrorSequence] = useState(0);

  const phrases = [
    "No", "Are you sure?", "Really sure?", "Sure na sure?", "Last chance!", 
    "OK...", "You might regret this!", "No more chances", 
    "Are you absolutely sure?", "Pagtarung ba", "Shibal",
    "Cold kayka ba", "haha samoka", "Tagae ko chance plss", 
    "di ka maluoy sako :(", "...",
  ];

  const handleNoClick = () => setNoCount((prev) => prev + 1);
  const handleOpenEnvelope = () => setIsOpen(true);
  const closeNote = () => setIsAsking(true);

  const isHorrorMode = noCount >= phrases.length;
  const yesButtonSize = noCount * 20 + 16;

  useEffect(() => {
    if (isHorrorMode && !yesPressed) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isHorrorMode, yesPressed]);

  useEffect(() => {
    if (isHorrorMode) {
      const timer1 = setTimeout(() => setHorrorSequence(1), 1000);
      const timer2 = setTimeout(() => setHorrorSequence(2), 2500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isHorrorMode]);

  if (yesPressed) return <PickedYes />;

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen w-full p-4 transition-colors duration-[2000ms] ease-in ${isHorrorMode ? 'bg-black overflow-hidden' : 'bg-pink-100'}`}>
      
      {!isAsking ? (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl pt-32">
          <div 
            className={`relative w-full max-w-lg h-72 bg-pink-300 rounded-b-2xl shadow-2xl cursor-pointer transition-transform duration-1000 ease-in-out ${
              isOpen ? 'translate-y-80' : '' 
            }`}
            onClick={!isOpen ? handleOpenEnvelope : undefined}
            style={{ perspective: '1200px' }}
          >
            <div className="absolute inset-0 bg-pink-300 rounded-b-2xl z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.15)]"
                 style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 100%, 100% 0, 50% 50%)' }}>
            </div>
          
            <div 
              className={`absolute top-0 left-0 w-full h-full bg-pink-400 rounded-t-2xl origin-top transition-all duration-700 ${
                isOpen ? 'rotate-x-180 z-10' : 'z-40'
              }`}
              style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0)' }}
            ></div>

            <div className={`absolute left-4 right-4 bottom-4 p-8 shadow-sm transition-all duration-1000 z-20 rounded-md max-h-[65vh] overflow-y-auto ${
              isOpen ? '-translate-y-105 scale-105' : 'translate-y-0 opacity-0'
            }`}
            style={{ 
              backgroundColor: '#fffcf5',
              backgroundImage: `url("https://www.transparenttextures.com/patterns/lined-paper-2.png")` 
            }}>
              {isOpen && (
                <button 
                  onClick={(e) => { e.stopPropagation(); closeNote(); }} 
                  className="absolute top-2 right-4 text-pink-300 hover:text-pink-600 font-bold text-2xl"
                >✕</button>
              )}
              
              <h2 className="text-pink-600 font-serif italic text-2xl mb-4 text-left border-b border-pink-100 pb-2">My Dearest,</h2>
              
              <div className="text-gray-700 text-base leading-relaxed text-left font-sans space-y-4">
                <p>My Dearest, every single moment we spend together feels like a beautiful dream that I 
                  never want to wake up from. You make my world infinitely brighter just by being in it, 
                  and I find myself smiling at the randomest times just thinking about your laugh. 
                  I’ve realized that my favorite place in the whole world isn’t a location, 
                  but simply wherever you are. Your kindness, your strength, and the way you see 
                  the beauty in everything inspire me to be a better man every day.</p>
                
                <div className="pt-6 text-right">
                  <p className="text-gray-500 text-xs italic mb-1">Yours truly,</p>
                  <p className="text-pink-600 text-3xl font-['Dancing_Script'] font-bold">Akii</p>
                </div>
              </div>
            </div>
          </div>
          
          {!isOpen && (
            <p className="mt-24 text-pink-500 font-bold animate-bounce text-2xl tracking-widest">
              Click to open 💌
            </p>
          )}
        </div>

      ) : (
        <div className="z-10 flex flex-col items-center max-w-md w-full text-center">
          {isHorrorMode && (
            <>
              <img 
                  src="/babadook.jpg" 
                  className={`fixed left-0 top-0 h-full w-1/2 object-contain pointer-events-none z-0 mix-blend-screen transition-opacity duration-[5000ms] ease-in-out ${
                      horrorSequence >= 2 ? 'opacity-30' : 'opacity-0'
                  }`}
                  alt="horror-bg"

              />
              <div className={`fixed left-0 top-0 h-full w-1/2 pointer-events-none z-10 transition-opacity duration-1000 ${
                horrorSequence >= 2 ? 'opacity-100' : 'opacity-0'
              }`}>
                {/* Change position of the eye */}
                <TrackingEye top="41.0%" left="37.8%" mousePos={mousePos} />
                <TrackingEye top="40.5%" left="54.2%" mousePos={mousePos} />
              </div>
            </>
          )}
          <img 
            className={`h-48 w-48 object-cover rounded-lg shadow-md mb-6 transition-all duration-[2000ms] ${
                isHorrorMode ? 'grayscale brightness-50 scale-125' : ''
            } ${isHorrorMode && horrorSequence < 1 ? 'opacity-0' : 'opacity-100'}`}
            src={isHorrorMode ? "/creepy.gif" : "cat-flowers.gif"} 
            alt="valentine-visuals"
          />  

          <h1 className={`text-3xl md:text-4xl font-bold mb-8 transition-opacity duration-1000 ${
            isHorrorMode ? 'text-red-900 font-serif tracking-widest uppercase' : 'text-slate-800'
          } ${isHorrorMode && horrorSequence < 1 ? 'opacity-0' : 'opacity-100'}`}>
            {isHorrorMode ? "THERE IS NO OTHER WAY." : "Will you be my Valentine?"}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 w-full px-4">
            <button 
              className={`font-bold py-2 px-6 rounded-lg transition-all shadow-xl active:scale-90 ${
                isHorrorMode 
                  ? 'fixed z-50 bg-red-950 text-red-500 border border-red-900 pointer-events-auto cursor-pointer' 
                  : 'bg-green-500 text-white relative'
              } ${isHorrorMode && horrorSequence < 1 ? 'opacity-0' : 'opacity-100'}`}
              style={isHorrorMode ? {
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
                transform: `translate(-50%, -50%)`,
                fontSize: '2rem',
                padding: '2rem 4rem',
                transition: 'none' 
              } : {
                fontSize: `${yesButtonSize}px`
              }}
              onClick={() => setYesPressed(true)}
            >
              YES
            </button>

            {!isHorrorMode && (
              <button 
                className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg active:scale-95 transition-all" 
                onClick={handleNoClick}
              >
                {phrases[noCount]}
              </button>
            )}
          </div>

          {isHorrorMode && (
             <p className={`mt-12 text-xs italic animate-pulse text-red-600 transition-opacity duration-1000 ${
                horrorSequence >= 2 ? 'opacity-30' : 'opacity-0'
             }`}>
                He's been waiting for you.
             </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ValentinesPage;
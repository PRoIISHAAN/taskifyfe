import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import sparkleAnimation from "../miscelnaeous/crackle animation.json";

export default function CheckboxWithSparkle({ 
  completedState, 
  setCompletedState,
  checkboxSize = 16,
  animationScale = 0.5,
  className = ""
}) {
  const sparkleRef = useRef(null);
  const animationInstance = useRef(null);
  const previousStateRef = useRef(completedState);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const wasUnchecked = !previousStateRef.current;
    const isNowChecked = completedState;
    const shouldPlayAnimation = wasUnchecked && isNowChecked && !hasAnimatedRef.current;

    if (shouldPlayAnimation && sparkleRef.current) {
      // Destroy previous animation if exists
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }

      // Create new animation
      animationInstance.current = lottie.loadAnimation({
        container: sparkleRef.current,
        animationData: sparkleAnimation,
        renderer: "svg",
        loop: false,
        autoplay: true,
      });

      // Mark that we've animated for this checked state
      hasAnimatedRef.current = true;
    }

    // Update previous state
    previousStateRef.current = completedState;

    // Reset animation flag when unchecked
    if (!completedState) {
      hasAnimatedRef.current = false;
    }

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
        animationInstance.current = null;
      }
    };
  }, [completedState]);

  const animationSize = Math.max(64, checkboxSize * 3.5) * animationScale;
  const offset = animationSize / 2 - checkboxSize / 2;

  return (
    <label className={`flex items-center cursor-pointer relative ${className}`}>
      <input
        type="checkbox"
        checked={completedState}
        onChange={(e) => setCompletedState(e.target.checked)}
        className="sr-only"
      />
      
      <div
        className={`rounded-full border-[1.5px] flex items-center justify-center transition-all duration-200 relative
          ${completedState ? "bg-green-500 border-green-500" : "border-gray-400 hover:border-gray-500"}
        `}
        style={{
          width: `${checkboxSize}px`,
          height: `${checkboxSize}px`
        }}
      >
        
        {completedState && (
          <svg
            className="text-white transition-opacity duration-200"
            fill="currentColor"
            viewBox="0 0 20 20"
            style={{
              width: `${checkboxSize * 0.75}px`,
              height: `${checkboxSize * 0.75}px`
            }}
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Animation container - always present when checked */}
      {completedState && (
        <div
          ref={sparkleRef}
          className="absolute pointer-events-none z-0"
          style={{
            width: `${animationSize}px`,
            height: `${animationSize}px`,
            top: `-${offset}px`,
            left: `-${offset}px`,
            transform: 'scale(1)', 
          }}
        />
      )}
    </label>
  );
}

// Demo component to show the fix
export function CheckboxDemo() {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true); // Pre-checked
  const [checkbox3, setCheckbox3] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-sm max-w-md">
        <h2 className="text-xl font-semibold mb-4">Fixed Animation Trigger</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <CheckboxWithSparkle 
              completedState={checkbox1} 
              setCompletedState={setCheckbox1}
            />
            <span className="text-sm">Initially unchecked - will animate when checked ✨</span>
          </div>

          <div className="flex items-center space-x-3">
            <CheckboxWithSparkle 
              completedState={checkbox2} 
              setCompletedState={setCheckbox2}
            />
            <span className="text-sm">Initially checked - no animation on load ❌</span>
          </div>

          <div className="flex items-center space-x-3">
            <CheckboxWithSparkle 
              completedState={checkbox3} 
              setCompletedState={setCheckbox3}
            />
            <span className="text-sm">Try checking this one 👆</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test Modal Scenario
          </button>
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded text-sm text-green-800">
          <strong>✅ Fixed:</strong> Animation only plays when state changes from unchecked → checked
        </div>

        <div className="mt-2 p-3 bg-blue-50 rounded text-sm text-blue-800">
          <strong>How it works:</strong>
          <ul className="mt-1 ml-4 list-disc text-xs">
            <li>Tracks previous state with useRef</li>
            <li>Only animates on transition: false → true</li>
            <li>Prevents duplicate animations</li>
            <li>No animation on initial render</li>
          </ul>
        </div>
      </div>

      {/* Modal simulation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Modal with Pre-checked Box</h3>
            <div className="flex items-center space-x-3 mb-4">
              <CheckboxWithSparkle 
                completedState={true} // Pre-checked in modal
                setCompletedState={() => {}} // Read-only for demo
              />
              <span className="text-sm">This is pre-checked but won't animate</span>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <CheckboxWithSparkle 
                completedState={false} // Unchecked in modal
                setCompletedState={() => {}} // This will animate when checked
              />
              <span className="text-sm">This one will animate when you check it</span>
            </div>
            <button 
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
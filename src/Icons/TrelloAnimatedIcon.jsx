import { useEffect, useRef, useState } from 'react';

export const TrelloLogoAnimated = ({ className = "", width = 120, height = 120, showText = true }) => {
  const logoRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate dimensions based on aspect ratio
  const aspectRatio = showText ? 70/24 : 1; // 2.917:1 for text, 1:1 for icon only
  
  let finalWidth, finalHeight;
  
  if (width && height) {
    // Both provided
    finalWidth = width;
    finalHeight = height;
  } else if (width) {
    // Only width provided - calculate height
    finalWidth = width;
    finalHeight = width / aspectRatio;
  } else if (height) {
    // Only height provided - calculate width
    finalHeight = height;
    finalWidth = height * aspectRatio;
  } else {
    // Neither provided - use defaults
    finalWidth = showText ? 140 : 48;
    finalHeight = showText ? 48 : 48;
  }

  // Original values from your SVG
  const originalLeftHeight = 13.803;
  const originalRightHeight = 8.3366;
  const totalHeight = originalLeftHeight + originalRightHeight; // 22.1396

  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const duration = 1000; // 1 second cycle
    const timeProgress = (elapsed % duration) / duration;
    
    // Create smooth sine wave
    const wave = Math.sin(timeProgress * Math.PI * 2);
    
    // Perfect height swap animation
    // Left card: goes from originalLeftHeight (13.803) to originalRightHeight (8.3366)
    // Right card: goes from originalRightHeight (8.3366) to originalLeftHeight (13.803)
    
    // Convert wave from -1,1 to 0,1 for easier interpolation
    const animationProgress = (wave + 1) / 2;
    
    // Interpolate between original heights
    const currentLeftHeight = originalLeftHeight - (animationProgress * (originalLeftHeight - originalRightHeight));
    const currentRightHeight = originalRightHeight + (animationProgress * (originalLeftHeight - originalRightHeight));
    
    // Apply the heights
    if (leftCardRef.current && rightCardRef.current) {
      leftCardRef.current.setAttribute('height', currentLeftHeight.toString());
      rightCardRef.current.setAttribute('height', currentRightHeight.toString());
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (!animationRef.current) {
      startTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Reset to original heights
    if (leftCardRef.current && rightCardRef.current) {
      leftCardRef.current.setAttribute('height', originalLeftHeight.toString());
      rightCardRef.current.setAttribute('height', originalRightHeight.toString());
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    startAnimation();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    stopAnimation();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`inline-block cursor-pointer transition-transform duration-200 leading-none ${className}`}>
      <svg
        ref={logoRef}
        width={finalWidth}
        height={finalHeight}
        viewBox={showText ? "0 0 70 24" : "0 0 24 24"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="select-none block"
      >
        <defs>
          <symbol id="logo-glyph">
            <g>
              <path
                d="M0 5C0 2.23858 2.23858 0 5 0H19C21.7614 0 24 2.23858 24 5V19C24 21.7614 21.7614 24 19 24H5C2.23858 24 0 21.7614 0 19V5Z"
                fill="#0055CC"
              />
              <rect
                ref={leftCardRef}
                x="4.43101"
                y="4.43101"
                width="5.90729"
                height="13.803"
                rx="0.947869"
                ry="0.947869"
                fill="#FFFFFF"
              />
              <rect
                ref={rightCardRef}
                x="13.6617"
                y="4.43101"
                width="5.90729"
                height="8.3366"
                rx="0.947869"
                ry="0.947869"
                fill="#FFFFFF"
              />
            </g>
          </symbol>
          {showText && (
            <symbol id="logo-text">
              <path
                d="M33.623 17V8.74219H30.6289V7.13574H38.5518V8.74219H35.5576V17H33.623ZM39.3857 17V9.50098H41.252V10.6562H41.375C41.498 10.2507 41.7236 9.9362 42.0518 9.71289C42.3844 9.48958 42.7946 9.37793 43.2822 9.37793C43.4144 9.37793 43.5443 9.38704 43.6719 9.40527C43.7995 9.41895 43.9089 9.43945 44 9.4668V11.1143C43.8587 11.0778 43.7129 11.0505 43.5625 11.0322C43.4167 11.014 43.2686 11.0049 43.1182 11.0049C42.7399 11.0049 42.4095 11.0755 42.127 11.2168C41.849 11.3581 41.6325 11.5586 41.4775 11.8184C41.3271 12.0736 41.252 12.3789 41.252 12.7344V17H39.3857ZM48.4434 17.1572C47.6868 17.1572 47.0374 17 46.4951 16.6855C45.9528 16.3665 45.5358 15.9176 45.2441 15.3389C44.9525 14.7555 44.8066 14.0651 44.8066 13.2676V13.2607C44.8066 12.4632 44.9525 11.7728 45.2441 11.1895C45.5358 10.6016 45.9482 10.1481 46.4814 9.8291C47.0146 9.50553 47.6413 9.34375 48.3613 9.34375C49.0814 9.34375 49.7035 9.50098 50.2275 9.81543C50.7562 10.1253 51.1618 10.5628 51.4443 11.1279C51.7269 11.693 51.8682 12.3538 51.8682 13.1104V13.7051H45.7432V12.502H50.9658L50.0771 13.6299V12.8848C50.0771 12.4154 50.0065 12.0257 49.8652 11.7158C49.724 11.4014 49.5257 11.1644 49.2705 11.0049C49.0153 10.8454 48.7214 10.7656 48.3887 10.7656C48.056 10.7656 47.7598 10.8477 47.5 11.0117C47.2402 11.1758 47.0352 11.415 46.8848 11.7295C46.7389 12.0439 46.666 12.429 46.666 12.8848V13.6367C46.666 14.0788 46.7389 14.457 46.8848 14.7715C47.0306 15.0814 47.238 15.3184 47.5068 15.4824C47.7803 15.6465 48.1038 15.7285 48.4775 15.7285C48.7783 15.7285 49.0335 15.6852 49.2432 15.5986C49.4574 15.512 49.6283 15.4095 49.7559 15.291C49.888 15.168 49.9792 15.0563 50.0293 14.9561L50.0498 14.9082H51.7998L51.7861 14.9766C51.7269 15.2135 51.6175 15.4596 51.458 15.7148C51.3031 15.9701 51.0911 16.207 50.8223 16.4258C50.5534 16.64 50.2207 16.8154 49.8242 16.9521C49.4323 17.0889 48.972 17.1572 48.4434 17.1572ZM53.6045 17V6.61621H55.4707V17H53.6045ZM57.6514 17V6.61621H59.5176V17H57.6514ZM64.918 17.1572C64.1569 17.1572 63.5029 17.0023 62.9561 16.6924C62.4092 16.3779 61.9876 15.929 61.6914 15.3457C61.3997 14.7624 61.2539 14.0651 61.2539 13.2539V13.2402C61.2539 12.4336 61.402 11.7409 61.6982 11.1621C61.9945 10.5788 62.416 10.1299 62.9629 9.81543C63.5143 9.50098 64.166 9.34375 64.918 9.34375C65.6745 9.34375 66.3262 9.50098 66.873 9.81543C67.4199 10.1253 67.8415 10.5719 68.1377 11.1553C68.4339 11.7386 68.582 12.4336 68.582 13.2402V13.2539C68.582 14.0651 68.4339 14.7624 68.1377 15.3457C67.846 15.929 67.4268 16.3779 66.8799 16.6924C66.333 17.0023 65.679 17.1572 64.918 17.1572ZM64.918 15.6738C65.2917 15.6738 65.6061 15.5781 65.8613 15.3867C66.1211 15.1908 66.3193 14.9128 66.4561 14.5527C66.5973 14.1927 66.668 13.7598 66.668 13.2539V13.2402C66.668 12.7344 66.5973 12.3037 66.4561 11.9482C66.3193 11.5882 66.1211 11.3125 65.8613 11.1211C65.6016 10.9251 65.2871 10.8271 64.918 10.8271C64.5488 10.8271 64.2344 10.9251 63.9746 11.1211C63.7148 11.3125 63.5143 11.5882 63.373 11.9482C63.2363 12.3037 63.168 12.7344 63.168 13.2402V13.2539C63.168 13.7643 63.2363 14.1995 63.373 14.5596C63.5098 14.9196 63.708 15.1953 63.9678 15.3867C64.2321 15.5781 64.5488 15.6738 64.918 15.6738Z"
                fill="#FFFFFF"
              />
            </symbol>
          )}
        </defs>
        
        <use href="#logo-glyph" />
        {showText && <use href="#logo-text" />}
      </svg>
    </div>
  );
};

// Example usage component
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        React Trello Logo with Height Animation
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Auto height from width */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold mb-4">Auto Height (width=180)</h3>
          <TrelloLogo width={180} showText={true} />
          <p className="text-sm text-gray-600 mt-2">Height calculated automatically</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold mb-4">Auto Width (height=60)</h3>
          <TrelloLogo height={60} showText={true} />
          <p className="text-sm text-gray-600 mt-2">Width calculated automatically</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold mb-4">Icon Only (width=80)</h3>
          <TrelloLogo width={80} showText={false} />
          <p className="text-sm text-gray-600 mt-2">Square aspect ratio</p>
        </div>
      </div>
      
      {/* With custom styling */}
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-4">Perfect Alignment Test</h3>
        <div className="flex items-center justify-center gap-4">
          <span className="text-gray-600">Left text</span>
          <TrelloLogo width={120} showText={true} />
          <span className="text-gray-600">Right text</span>
        </div>
        <p className="text-gray-600 mt-4">
          No extra margins - perfect for inline alignment
        </p>
      </div>
      
      {/* Usage instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          How to use in your React + Tailwind project:
        </h3>
        <div className="bg-white rounded p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-800">
{`// Auto height from width (recommended)
<TrelloLogo width={160} showText={true} />

// Auto width from height  
<TrelloLogo height={48} showText={true} />

// Icon only (always square)
<TrelloLogo width={64} showText={false} />

// Perfect for inline alignment
<div className="flex items-center gap-2">
  <span>Welcome to</span>
  <TrelloLogo width={100} />
</div>

// No dimensions = defaults (140x48 with text, 48x48 without)
<TrelloLogo showText={true} />`}
          </pre>
        </div>
      </div>
    </div>
  );
};
import React from 'react'
import "./index.css"
import Canvas from "./canvas"
import data from "./data"
import LocomotiveScroll from 'locomotive-scroll'
import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap";

function App() {
  const [active, setActive] = useState(false);
  const boxRef1 = useRef(null);
  const boxRef2 = useRef(null);
  const boxRef3 = useRef(null);
  const boxRef4 = useRef(null);
  const boxRef5 = useRef(null); 
  const boxRef6 = useRef(null);
  const boxRef7 = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const followerRef = useRef(null);

  const typographyRef = useRef(null);
  const [typographyVisible, setTypographyVisible] = useState(false);

  const [loaded, setLoaded] = useState(false);

  const [linesVisible, setLinesVisible] = useState([]);
  const paragraphRef = useRef(null);

  // Individual refs for each role
  const roleRefs = useRef([]);

  const paragraphLines = [
    "At SukritZ, we recognize that our industry can perpetuate harm.",
    "We believe we have to try and reverse some of these imbalances.",
    "That's why we're launching SS36, our local social sustainability hub.",
    "",
    "Through SS36, we reinvest some of our revenue and expertise",
    "into the communities that shape the culture and trends",
    "our field so heavily relies on.",
    "",
    "Our main focus is on bridging gaps for those affected by",
    "systemic obstacles related to race, sexuality, wealth",
    "and gender identity."
  ];

  const roles = [
    "Project Managers",
    "Digital Producers",
    "Designers",
    "Illustrators",
    "Animators",
    "3D Artists",
    "Motion Designers",
    "Developers and Coders",
    "Creative Technologists",
    "Sound Engineers"
  ];

  // Initialize role refs
  useEffect(() => {
    roleRefs.current = roleRefs.current.slice(0, roles.length);
    for (let i = 0; i < roles.length; i++) {
      roleRefs.current[i] = roleRefs.current[i] || React.createRef();
    }
  }, [roles.length]);

  // Handle individual role clicks
  const handleRoleClick = (index, role) => {
    const clickedElement = roleRefs.current[index]?.current;
    
    if (clickedElement) {
      // Add a temporary highlight effect to the clicked role
      gsap.to(clickedElement, {
        backgroundColor: "#fef3c7", // yellow-100
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Reset after animation
      setTimeout(() => {
        gsap.to(clickedElement, {
          backgroundColor: "white",
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }, 300);
    }

    console.log(`Clicked on ${role} at index ${index}`);
  };
 
  useEffect(() => {
    // Initialize LocomotiveScroll
    const locomotiveScroll = new LocomotiveScroll();

    // Mark content as loaded
    setLoaded(true);

    // Mouse follower logic
    const follower = followerRef.current;
    const moveFollower = (e) => {
      follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", moveFollower);

    // Typography animation observer
    const typographyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTypographyVisible(true);
          } else {
            // Reset animation when out of view
            setTypographyVisible(false);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Paragraph lines animation observer
    const paragraphObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate lines one by one with staggered timing
            paragraphLines.forEach((_, index) => {
              setTimeout(() => {
                setLinesVisible(prev => [...prev, index]);
              }, index * 200); // 200ms delay between each line
            });
          } else {
            // Reset animation when out of view
            setLinesVisible([]);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe elements
    if (typographyRef.current) {
      typographyObserver.observe(typographyRef.current);
    }

    if (paragraphRef.current) {
      paragraphObserver.observe(paragraphRef.current);
    }

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", moveFollower);
      if (typographyRef.current) {
        typographyObserver.unobserve(typographyRef.current);
      }
      if (paragraphRef.current) {
        paragraphObserver.unobserve(paragraphRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (!active) {
      // Activate: Set background and animate
      gsap.to(boxRef1.current, {
        backgroundColor: "red",
        duration: 0.5,
      });

      gsap.to(boxRef2.current, {
        backgroundColor: "red",
        duration: 0.5,
      });

      gsap.to(boxRef3.current, {
        backgroundColor: "red",
        duration: 0.5,
      });

      gsap.to(boxRef4.current, {
        backgroundColor: "red",
        duration: 0.5,
      });

      gsap.to(boxRef5.current, {
        backgroundColor: "red",
        duration: 0.5,
      });
     
      gsap.to(boxRef6.current, {
        backgroundColor: "red",
        duration: 0.5,
      });

      gsap.to(boxRef7.current, {
        backgroundColor: "red",
        duration: 0.5,
      });

      // Animate all individual role elements to red
      roleRefs.current.forEach((ref, index) => {
        if (ref && ref.current) {
          gsap.to(ref.current, {
            backgroundColor: "red",
            duration: 0.5,
            delay: index * 0.05, // Staggered animation
          });
        }
      });

    } else {
      // Deactivate: Reset background and scale
      gsap.to(boxRef1.current, {
        backgroundColor: "white",
        duration: 0.5,
        ease: "power.inOut",
      });

      gsap.to(boxRef2.current, {
        backgroundColor: "white",
        duration: 0.5,
        ease: "power.inOut",
      });

      gsap.to(boxRef3.current, {
        backgroundColor: "white",
        duration: 0.5,
        ease: "power.inOut",
      });

      gsap.to(boxRef4.current, {
        backgroundColor: "white",
        duration: 0.5,
        ease: "power.inOut",
      });

      gsap.to(boxRef5.current, {
        backgroundColor: "white",
        duration: 0.5,
        ease: "power.inOut",
      });

      gsap.to(boxRef6.current, {
        backgroundColor: "white",
        duration: 0.5,
        ease: "power.inOut",
      });

      gsap.to(boxRef7.current, {
        backgroundColor: "white",
        duration: 0.5,
        ease: "power.inOut",
      });

      // Reset all individual role elements to white
      roleRefs.current.forEach((ref, index) => {
        if (ref && ref.current) {
          gsap.to(ref.current, {
            backgroundColor: "white",
            duration: 0.5,
            delay: index * 0.05, // Staggered animation
            ease: "power.inOut",
          });
        }
      });
    }
    setActive(!active);
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div
        ref={boxRef1}
        className=" w-full relative min-h-screen  text-black  font-sans">
        {active
          && data[0].map((canvasdets, index) => (
            <Canvas details={canvasdets} />
          ))}
        
        <div className="w-full h-screen text-black relative">
          <nav className=" w-full px-10 py-4 flex justify-between  z-50">
            <div className="text-2xl font-extrabold tracking-wide">SukritZ</div>
            <div className="flex gap-10">
              {["Home", "About", "Contact"].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-lg hover:text-blue-400 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer w-full px-[30%]">
            <div className="text w-[40%]">
              <h3 className="text-4xl leading-[1.2]">
                At SukritZ, we build digital assets and immersive experiences for purposeful brand.
              </h3>
              <p className="text-lg w-[180%] mt-10 font-md">
                We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital
                craft can do for present-day ads and campaigns.
              </p>
              <p className="text-md mt-10">scroll</p>
            </div>
          </div>
        </div>
        <div className="w-full bottom-0 left-0">
          <h1
            onClick={handleClick}
            className="text-[29rem] font-normal tracking-tight leading-none">SukritZ</h1>
        </div>
      </div>

      <div ref={boxRef2}
        className="w-full min-h-screen px-10 py-32 text-white relative z-10">
        {
          active &&
          data[1].map((canvasdets, index) => (
            <Canvas key={index} details={canvasdets} />
          ))}
        <div className="relative z-[1] w-full h-screen text-black mt-32 px-10">
          <div>
            <h1 className="text-8xl tracking-tighter"> What we do</h1>
            <div className="w-full flex justify-end pr-20">
              <p className="text-2xl w-[50%] leading-relaxed mt-20 max-w-xl font-light text-right">
                We provide you with captivating design, interactive animations, reliable code,
                and immaculate project coordination...
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-green-500 pointer-events-none z-[9999] transition-transform duration-75"
      />

      <div ref={boxRef3} className="relative w-full h-screen  overflow-hidden font-sans">
        {active
          && data[2].map((canvasdets, index) => (
            <Canvas details={canvasdets} />
          ))}
        
        {/* Main Typography */}
        <div ref={typographyRef} className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-16">
          {/* Agile */}
          <div
            className={`text-black font-black text-6xl md:text-8xl lg:text-9xl leading-none mb-4 transform transition-all duration-1000 ${typographyVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
              }`}
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.05em'
            }}
          >
            Agile
          </div>

          {/* Innovative */}
          <div
            className={`text-black font-black text-6xl md:text-8xl lg:text-9xl leading-none mb-8 transform transition-all duration-1000 delay-300 ${typographyVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
              }`}
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.05em'
            }}
          >
            Innovative
          </div>

          {/* Cultural */}
          <div
            className={`text-black font-black text-6xl md:text-8xl lg:text-9xl leading-none transform transition-all duration-1000 delay-500 ${typographyVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
              }`}
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.05em'
            }}
          >
            Cultural
          </div>
        </div>
        
        {/* Right Side Content */}
        <div className="absolute right-8 md:right-16 top-0 h-full flex flex-col justify-center max-w-sm">
          <div
            className={`text-black text-sm md:text-base leading-relaxed mb-8 transform transition-all duration-1000 delay-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
          >
            We live and breathe efficiency and are not limited by geography. Local to Amsterdam with hubs in London, Paris, Johannesburg, New York, and beyond, we curate the right team for each project and get moving swiftly.
          </div>

          <div
            className={`text-black text-sm md:text-base leading-relaxed mb-8 transform transition-all duration-1000 delay-1300 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
          >
            We use carefully crafted digital processes and new technology to ensure our initiatives run smoothly, allowing our lean and international team to focus on what matters and maximize speed and opportunity.
          </div>

          <div
            className={`text-black text-sm md:text-base leading-relaxed transform transition-all duration-1000 delay-1500 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
          >
            Progressive and community-focused, we believe in maintaining the status quo by looking to outdated ways. Our people reflect today's realities and stay connected to culture.
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-black rounded-full opacity-20 transform transition-all duration-2000 delay-${1500 + i * 200} ${loaded ? 'opacity-20' : 'opacity-0'
              }`}
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
              animation: loaded ? `particle-float-${i} ${4 + i}s ease-in-out infinite` : 'none'
            }}
          />
        ))}
      </div>

      <div
        ref={(el) => {
          paragraphRef.current = el;
          boxRef4.current = el;
        }}
        className=" relative w-full h-screen  overflow-hidden text-black  mx-auto px-8 py-16 flex flex-col items-center"
      >
        {active
          && data[4].map((canvasdets, index) => (
            <Canvas details={canvasdets} />
          ))}
        <div className="text-lg md:text-xl leading-relaxed space-y-2 text-center max-w-2xl">
          {paragraphLines.map((line, index) => (
            <div
              key={index}
              className={`transform transition-all duration-800 ${linesVisible.includes(index)
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
                }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {line === "" ? (
                <div className="h-4" />
              ) : (
                <p className="text-black font-medium">{line}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div ref={boxRef5} className="w-full bg-white min-h-screen relative">
        {/* Canvas Animation for Roles Section */}
        {active && data[4] && data[4].map((canvasdets, index) => (
          <Canvas key={index} details={canvasdets} />
        ))}
        
        <style jsx>{`
          .role-item {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }

          .role-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background-color: black;
            transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            z-index: 1;
          }

          .role-item:hover::before {
            left: 0;
          }

          .role-content {
            position: relative;
            z-index: 2;
            transition: color 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .role-item:hover .role-content {
            color: white;
          }
        `}</style>

        <div className="max-w-md mx-auto relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h1 className="text-lg font-medium text-gray-900">ROLES OPEN</h1>
            <button className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-xl leading-none">−</span>
            </button>
          </div>
        </div>

        {/* Roles with individual refs */}
        <div ref={boxRef6} className="relative z-10">
          {roles.map((role, index) => (
            <div
              key={role}
              ref={roleRefs.current[index]}
              className="role-item cursor-pointer bg-white border-b border-gray-200 last:border-b-0"
              onClick={() => handleRoleClick(index, role)}
            >
              <div className="max-w-md mx-auto flex items-center justify-between px-6 py-4">
                <span className="role-content text-base font-normal text-gray-900">
                  {role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer ref={boxRef7} className="bg-white pt-24 py-40 pb-16 px-6 relative">
        {/* Canvas Animation for Footer Section */}
        {active && data[4] && data[4].map((canvasdets, index) => (
          <Canvas key={index} details={canvasdets} />
        ))}
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Social Links */}
            <div className="space-y-4">
              <div className="flex space-x-8">
                <a 
                  href="#" 
                  className="text-gray-900 hover:text-gray-600 transition-colors duration-300 text-lg"
                >
                  Linkedin
                </a>
                <a 
                  href="#" 
                  className="text-gray-900 hover:text-gray-600 transition-colors duration-300 text-lg"
                >
                  Instagram
                </a>
              </div>
            </div>
            
            {/* Right Column - Contact Info */}
            <div className="text-right md:text-left">
              <div className="text-gray-900 text-lg mb-2">
                hello@thirtysixstudio.com
              </div>
              <div className="text-gray-900 text-lg">
                Amsterdam and worldwide
              </div>
            </div>
          </div>
          
          {/* Middle Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Copyright */}
            <div>
              <div className="text-gray-900 text-lg mb-2">
                All Rights Reserved
              </div>
              <div className="text-gray-900 text-lg">
                ©2025, Thirtysixstudio
              </div>
            </div>
            
            {/* Right Column - Links and Red Dot */}
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <a 
                  href="#" 
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-300 text-lg underline"
                >
                  PRIVACY STATEMENT ↓
                </a>
                <a 
                  href="#" 
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-300 text-lg underline"
                >
                  BACK TO TOP
                </a>
              </div>
              <div className="w-4 h-4 bg-red-500 rounded-full ml-8"></div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            {/* Left Column - Registration Info */}
            <div className="text-gray-600 text-sm">
              Thirtysixstudio is registered with the Dutch Chamber of<br />
              Commerce under registration number KVK 90310152
            </div>
            
            {/* Right Column - Company Name */}
            <div className="text-right">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-wide">
                Thirtysixstudio
              </h2>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
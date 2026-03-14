import React from 'react'
import { useEffect,useRef,useState } from 'react'
import image from "./image"
import {useGSAP} from "@gsap/react"
import gsap from "gsap";
function Canvas ({details}) {
    const{startIndex,numImages,duration,size,top,left,zIndex}=details;
    const [index,setIndex]=useState({value:details.startIndex});
    const canvasRef=useRef(null);

    useGSAP(()=>{
        gsap.to(index,{
            value:startIndex+numImages-1,
            duration:duration,
            ease:"linear",
            repeat:-1,
            onUpdate:()=>{
                setIndex({value:Math.round(index.value)});
            },
        });
        gsap.from(canvasRef.current,{
          opacity:0,
          
          duration:0.5,
          ease:"power2.inOut",
        });
    });
    useEffect(() => {
      const scale=window.devicePixelRatio;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      const img = new Image();
      img.src = image[index.value];
  
      img.onload = () => {
        // Set canvas dimensions in pixels
        canvas.width = canvas.offsetWidth*scale;
        canvas.height = canvas.offsetHeight*scale;
  
        // Optional: set CSS style width and height
        canvas.style.width = `${canvas.offsetWidth}px`;
        canvas.style.height = `${canvas.offsetHeight}px`;
  
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous image
        ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
      };
    }, [index, size, image]);
  
    return (
      <canvas
      data-scroll
      data-scroll-speed={Math.random().toFixed(1)}
      ref={canvasRef}
     
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: `${zIndex}`,
      }}
      className="absolute"
    />
    
   
  )
}

export default Canvas;
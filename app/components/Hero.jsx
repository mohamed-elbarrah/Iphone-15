"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { heroVideo, smallHeroVideo } from "../utils";

export default function Hero() {

  const [videoSrc, setVideoSrc] = useState(undefined);
  
  useEffect(()=>{
    // Function to set video source based on window size
    const handleVideoSrcSet = () => {
      if(window.innerWidth < 760){
        setVideoSrc(smallHeroVideo);
      } else {
        setVideoSrc(heroVideo);
      }
    };

    handleVideoSrcSet(); // Set initial video source based on current window size
    window.addEventListener('resize', handleVideoSrcSet);

    return () => {
      window.removeEventListener('resize', handleVideoSrcSet)
    }
  },[])

  useEffect(() => {
    gsap.to(".hero-title", { opacity: 1, delay: 2 });
    gsap.to("#cta", { opacity: 1, y: -50, delay: 2 });
  }, []);

  return (
    <section className="w-full bg-balck relative h-screen">
      <div className="h-5/6 w-full flex-center flex-col">
        <p  className="hero-title py-8">Iphone 15 Pro</p>
        <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
          <source src={videoSrc} type="video/mp4"/>
        </video>
      </div>

      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
        <a className="btn" href="#hightlihgts">Buy</a>
        <p className="font-normal text-xl">From 199$/month or 999$</p>
      </div>
    </section>
    
  );
}

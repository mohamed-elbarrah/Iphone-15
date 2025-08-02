import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Model from './components/Model';

export default function Home() {
  return (
    
    <main className="flex flex-col items-center justify-center">
      <div className='container'>
        <NavBar />
        <Hero />
        <Highlights />
        <Model />
      </div>
      </main>

  );
}

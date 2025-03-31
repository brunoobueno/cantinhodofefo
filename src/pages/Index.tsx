
import React from 'react';
import Header from '@/components/Header';
import TimeCounter from '@/components/TimeCounter';
import MessageCarousel from '@/components/MessageCarousel';
import PhotoGallery from '@/components/PhotoGallery';
import StickerGallery from '@/components/StickerGallery';
import ConnectionMeter from '@/components/ConnectionMeter';
import Timeline from '@/components/Timeline';
import FuturePlans from '@/components/FuturePlans';
import RandomAdvice from '@/components/RandomAdvice';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-16">
        <TimeCounter />
        <MessageCarousel />
        <PhotoGallery />
        <StickerGallery />
        <ConnectionMeter />
        <Timeline />
        <FuturePlans />
        <RandomAdvice />
      </main>
      <footer className="text-center text-xs text-love-400 pb-4">
        <p>Feito com ♥ para o nosso amor</p>
      </footer>
    </div>
  );
};

export default Index;

'use client';

import { useState } from 'react';
import { ArrowBigLeft, ArrowBigRight, Fullscreen, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { BigImageView } from '@/components/car/BigImageView';

type CarCardProps = {
  images: string[];
  folder: string;
  mark: string;
};

export function CarImagesCarousel({ images, mark, folder }: CarCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  const increment = () => {
    if (imgIndex >= images.length - 1) setImgIndex(0);
    else setImgIndex((value) => value + 1);
  };
  const decrement = () => {
    if (imgIndex <= 0) setImgIndex(images.length - 1);
    else setImgIndex((value) => value - 1);
  };

  const handleImageLoaded = (url: string) => {
    setImagesLoaded((cur) => {
      return { ...cur, [url]: true };
    });
  };

  const activeImage = images[imgIndex];

  return (
    <>
      <div
        className="absolute left-0 top-0 z-10 flex h-full w-1/3 items-center justify-start bg-black/50 opacity-0
          hover:opacity-100"
        onClick={decrement}
      >
        <ArrowBigLeft className="ml-5 size-9 rounded-full bg-white/50 text-white" />
      </div>

      <div
        className="absolute left-1/3 top-0 z-10 flex h-full w-1/3 items-center justify-center bg-black/50 opacity-0
          hover:opacity-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Fullscreen className="size-9 rounded-full bg-white/50 p-1 text-white" />
      </div>

      <div
        className="absolute right-0 top-0 z-10 flex h-full w-1/3 items-center justify-end bg-black/50 opacity-0
          hover:opacity-100"
        onClick={increment}
      >
        <ArrowBigRight className="mr-5 size-9 rounded-full bg-white/50 text-white" />
      </div>
      {isOpen ? (
        <BigImageView onClose={() => setIsOpen(false)} imageUrl={activeImage} alt={mark} />
      ) : null}

      {!imagesLoaded[activeImage] ? (
        <div className="flex h-full w-full animate-pulse items-center justify-center bg-gray-100 text-gray-600">
          <LoaderCircle className="animate-spin" size={32} />
        </div>
      ) : null}

      <Image
        placeholder="empty"
        src={activeImage}
        alt={mark + ' ' + folder}
        fill
        onLoad={(e) => handleImageLoaded((e.target as HTMLImageElement).src)}
        key={imgIndex}
        className="select-none object-cover"
        sizes="max-width: 378px, 224px"
      />
    </>
  );
}

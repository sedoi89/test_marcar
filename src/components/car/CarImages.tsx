'use client';

import { useEffect, useState } from 'react';
import { ArrowBigLeft, ArrowBigRight, EyeClosed, Fullscreen } from 'lucide-react';
import NextImage from 'next/image';
import { Portal } from '@radix-ui/react-portal';

type CarCardProps = {
  images: string[];
  folder: string;
  mark: string;
};

export function CarImagesClient({ images, mark, folder }: CarCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const increment = () => {
    if (imgIndex === images.length - 1) setImgIndex(0);
    else setImgIndex((value) => value + 1);
  };
  const decrement = () => {
    if (imgIndex === 0) setImgIndex(images.length - 1);
    else setImgIndex((value) => value - 1);
  };
  const preloadImages = (urls: string[]) => {
    urls.forEach((url, id) => {
      if (id === 0) return;
      const img = new Image();
      img.src = url;
    });
  };
  useEffect(() => {
    if (images) {
      preloadImages(images.map((img) => img));
    }
  }, [images]);
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
        <Portal
          className="fixed left-1/2 top-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform
            bg-black/80"
        >
          <NextImage
            src={images[imgIndex]}
            alt={`${mark} ${folder}`}
            fill
            className="relative select-none rounded object-contain p-5 md:p-14"
            sizes="(max-width: 1240px)"
            unoptimized
          />
          <div
            className="group absolute right-7 top-7 z-20 flex size-9 cursor-pointer items-center justify-center
              rounded-full bg-white/90 opacity-30 transition-all duration-200 hover:opacity-100 sm:right-[58px]
              sm:top-[58px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <EyeClosed className="text-white group-hover:text-orange-400" />
          </div>
        </Portal>
      ) : null}
      <NextImage
        src={images[imgIndex]}
        alt={mark + ' ' + folder}
        fill
        className="select-none object-cover"
        sizes="max-wdth: 378px, 224px"
        unoptimized
      />
    </>
  );
}

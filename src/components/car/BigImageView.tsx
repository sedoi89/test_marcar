import { LoaderCircle } from 'lucide-react';
import { Portal } from '@radix-ui/react-portal';
import { ComponentProps, useState } from 'react';
import { cn } from '@/lib/utils';

type BigImageViewProps = {
  alt: string;
  imageUrl: string;
  onClose?: () => void;
} & ComponentProps<'div'>;

export const BigImageView = ({
  imageUrl,
  alt,
  onClose,
  className,
  ...props
}: BigImageViewProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Portal
      className={cn(
        'fixed inset-0 z-50 flex h-screen w-screen items-center justify-center',
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 z-10 bg-black/80" onClick={() => onClose?.()} />
      {!loaded ? (
        <div className="z-10 m-20 flex h-[50%] w-[80%] items-center justify-center bg-gray-100 text-gray-600">
          <LoaderCircle className="animate-spin" size={48} />
        </div>
      ) : null}

      <div className={cn('z-30 block w-full p-16', { hidden: !loaded })}>
        <img
          src={imageUrl}
          alt={alt}
          className="block h-auto w-full object-contain"
          onLoad={() => setLoaded(true)}
          sizes="(max-width: 1240px)"
        />
      </div>
    </Portal>
  );
};

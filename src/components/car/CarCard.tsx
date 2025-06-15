import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Car, Fuel, Star } from 'lucide-react';
import { CarImagesClient } from '@/components/car/CarImages';

type CarCardProps = {
  img: string[];
  folder: string;
  price: number;
  mark: string;
  year: number;
  miles: number;
  fuel: string;
};

export default function CarCard({ img, folder, price, mark, fuel, year, miles }: CarCardProps) {
  return (
    <Card className="relative mx-auto grid w-full grid-rows-2 overflow-hidden rounded-2xl shadow-lg">
      <div className="relative h-56 w-full">
        <CarImagesClient images={img} folder={folder} mark={mark} />
      </div>
      <div
        className="group absolute right-2 top-2 z-20 flex size-9 cursor-pointer items-center justify-center
          rounded-full bg-white/25 opacity-30 transition-all duration-200 hover:opacity-100"
      >
        <Star className="text-gray-600 group-hover:text-orange-400" />
      </div>

      <CardContent
        className="absolute left-1/2 top-[40%] z-20 w-[80%] -translate-x-1/2 transform space-y-3 rounded-2xl
          bg-white/85 p-4"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="line-clamp-2 h-[56px] text-pretty text-xl font-bold">{folder}</h2>
            <p className="text-lg font-semibold text-black">
              {price}
              <span className="text-sm text-gray-600">₽</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {year}
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" /> {fuel}
          </div>
          <div className="flex items-center gap-1">
            <Car className="h-4 w-4" /> Пробег: {miles} км
          </div>
        </div>
      </CardContent>
      <div className="row-start-2 mb-12 mt-auto flex w-full justify-center gap-5 pt-3">
        <Button className="">Подробнее</Button>
        <Button variant="outline" className="">
          Позвонить
        </Button>
      </div>
    </Card>
  );
}

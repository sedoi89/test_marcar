import { Car } from '@/types/сarTypes';
import CarCard from '@/components/car/CarCard';

export default function CarList({ data }: { data: Car[] | undefined }) {
  return (
    <div className="my-6 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data?.map((car) => (
        <CarCard
          key={car.unique_id}
          img={car.images.image}
          folder={car.folder_id}
          price={car.price}
          mark={car.mark_id}
          fuel={car.engine_type}
          miles={car.run}
          year={car.year}
        />
      ))}
    </div>
  );
}

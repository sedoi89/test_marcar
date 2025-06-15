import { fetchCars } from '@/lib/api';
import CarList from '@/components/car/CarList';
import Pagination from '@/components/Pagination';
import { buildQuery } from '@/utils/BuildQyery';
import { SortDropdown } from '@/components/sort/Sort';
import { redirect } from 'next/navigation';

type HomeSearchParams = {
  page: string;
  _sort?: string;
  _order?: string;
};

export async function generateStaticParams() {
  return [
    {
      page: '1',
      _sort: '',
      _order: '',
    },
  ];
}

export default async function Home({ searchParams }: { searchParams: Promise<HomeSearchParams> }) {
  const page = (await searchParams).page;
  const sort = (await searchParams)._sort || '';
  const order = (await searchParams)._order || '';

  if (!page) {
    redirect(buildQuery({ page: 1, sort, order }));
  }

  const carsData = await fetchCars({ page, sort, order });
  return (
    <div className="grid w-full grid-rows-[auto_1fr_auto] justify-items-center gap-16">
      <main className={'flex w-full flex-col items-center justify-center'}>
        <SortDropdown currentSort={sort} currentOrder={order} />
        <CarList data={carsData.data} />
        <Pagination
          page={parseInt(page)}
          totalPages={carsData.meta?.last_page || 1}
          sort={sort}
          order={order}
        />
      </main>
    </div>
  );
}

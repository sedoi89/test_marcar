import Link from 'next/link';
import { buildQuery } from '@/utils/BuildQyery';

interface PaginationProps {
  page: number;
  totalPages: number;
  sort: string;
  order: string;
}

export default function Pagination({ page, totalPages, sort, order }: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-6 flex justify-center">
      {page >= 3 && (
        <Link key={'firstPage'} href={buildQuery({ page: 1, sort, order })}>
          <span
            className={
              'flex w-12 cursor-pointer items-center justify-center rounded-full border bg-white px-4 py-2'
            }
          >
            {1}
          </span>
        </Link>
      )}
      {visiblePages.map((p, idx) =>
        typeof p === 'number' ? (
          <Link key={idx} href={buildQuery({ page: p, sort, order })}>
            <span
              className={`flex w-12 cursor-pointer items-center justify-center rounded-full border px-4 py-2
                ${p === page ? 'bg-gray-600 text-white' : 'bg-white'}`}
            >
              {p}
            </span>
          </Link>
        ) : (
          <span key={idx} className="select-none px-2 py-2 text-gray-500">
            …
          </span>
        ),
      )}
    </div>
  );
}

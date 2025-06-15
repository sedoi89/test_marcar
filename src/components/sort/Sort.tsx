'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  { label: 'По умолчанию', value: 'default' },
  { label: 'Цена: сначала дешёвые', value: 'price-asc', sort: 'price', order: 'asc' },
  { label: 'Цена: сначала дорогие', value: 'price-desc', sort: 'price', order: 'desc' },
];

// Построить query строку
const buildQuery = ({ page, sort, order }: { page: number; sort?: string; order?: string }) => {
  const params = new URLSearchParams();
  params.set('page', page.toString());
  if (sort) params.set('_sort', sort);
  if (order) params.set('_order', order);
  return params;
};

export function SortDropdown({
  currentSort,
  currentOrder,
}: {
  currentSort: string;
  currentOrder: string;
}) {
  const [selected, setSelected] = useState(sortOptions[0]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const found = sortOptions.find((opt) => opt.sort === currentSort && opt.order === currentOrder);
    setSelected(found || sortOptions[0]);
  }, [currentSort, currentOrder]);

  const handleSelect = (option: (typeof sortOptions)[0]) => {
    setSelected(option);
    const params = buildQuery({
      page: 1,
      sort: option.sort,
      order: option.order,
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-5 select-none self-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Сортировка: {selected.label}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSelect(option)}
              className={selected.value === option.value ? 'font-semibold' : ''}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface BuildQueryOptions {
  page?: number;
  sort?: string;
  order?: string;
}

export const buildQuery = ({ page = 1, sort, order }: BuildQueryOptions): string => {
  const params = new URLSearchParams();
  params.set('page', page.toString());
  if (sort) params.set('_sort', sort);
  if (order) params.set('_order', order);

  return `/?${params.toString()}`;
};

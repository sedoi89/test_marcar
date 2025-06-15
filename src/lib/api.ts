import {Car, CarsMeta} from "@/types/сarTypes";

export async function fetchCars({
   page = '1',
   sort = '',
   order = ''
   } : {
    page?: string
    sort?: string
    order?: string
}): Promise<{data: Car[], meta?: CarsMeta}> {
    const params = new URLSearchParams({
        _limit: '12',
        _page: page,
        ...(sort || order ? { _sort: 'price', _order: order } : {})
    })
    const res = await fetch(`https://plex-parser.ru-rating.ru/cars?${params.toString()}`)

    if (!res.ok) {
        throw new Error('Failed to fetch cars')
    }

    return res.json()
}
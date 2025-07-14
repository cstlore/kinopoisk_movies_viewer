import {Movie} from "./Movie";
import {Filters} from "./Filters";

const KINOPOISK_API_KEY = process.env.REACT_APP_KINOPOISK_API_KEY!
const normalize = (response: { docs: any[] }): Movie[] => {
    return response.docs.map((val) => {
        return {
            id: val.id.toString(),
            title: val.name ?? val.alternativeName ?? "—",
            year: val.year,
            rating: val.rating?.kp,
            posterUrl: val.poster?.url
        }
    })
}
export const sendRequest = async (filters: Filters): Promise<Movie[]> => {
    console.log(filters)
    const response = await fetch('/v1.4/movie?' + new URLSearchParams({
        'page': filters.page.toString(),
        'limit': filters.limit.toString(),
        'rating.kp': 'ratingMin' in filters ? `${filters.ratingMin}-${filters.ratingMax}` : '0-10',
        'year': 'yearFrom' in filters ? `${filters.yearFrom}-${filters.yearTo}` : '1874-2050',
        'genres.name': filters.genres?.join(',') ?? ''
    }).toString(), {
        method: 'GET',
        headers: {
            "X-API-KEY": KINOPOISK_API_KEY,
        },
    })
    return normalize(await response.json())
}
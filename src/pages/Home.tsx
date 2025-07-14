import React, {useEffect, useState} from "react";
import {Movie} from "../api/Movie";
import {sendRequest} from "../api/Api";
import MovieCard from "../components/MovieCard";
import FilterPanel from "../components/FilterPanel";
import {Filters} from "../api/Filters";

const Home: React.FC = () => {
    const [movieParams, setMovieParams] = useState<Filters>({
        page: 1,
        limit: 50,
        genres: [],
        ratingMin: 0,
        ratingMax: 10,
        yearFrom: 1874,
        yearTo: 2050
    })
    const [movies, setMovies] = useState<Movie[]>([])
    const [page, setPage] = useState(1)
    useEffect(() => {
        console.log(movieParams)
        setPage(2)
        sendRequest(movieParams).then((res: Movie[]) => {
            setMovies(res)
        })
    }, [movieParams]);
    return (
        <div className="w-[100%] flex flex-col items-center justify-center">
            <FilterPanel movieParams={movieParams} setMovieParams={setMovieParams}/>
            <div
                className="mt-[24px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-[26px] pr-[26px]">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
            <p className="text-center text-[24px] mt-4 mb-4">Все фильмы по данным фильтрам просмотрены / Загрузка...</p>
        </div>
    )
}
export default Home
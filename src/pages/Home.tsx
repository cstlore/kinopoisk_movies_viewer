import React, {useEffect, useRef, useState, RefObject} from "react";
import {Movie} from "../api/Movie";
import {sendRequest} from "../api/Api";
import MovieCard from "../components/MovieCard";
import FilterPanel from "../components/FilterPanel";
import {Filters} from "../api/Filters";

interface UseOnScreenOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}


function useOnScreen<T extends Element>(
    options: UseOnScreenOptions
): [RefObject<T | null>, boolean] {
    const ref = useRef<T>(null);
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting),
            options
        );
        const el = ref.current;
        if (el) observer.observe(el);
        return () => {
            if (el) observer.unobserve(el);
            observer.disconnect();
        };
    }, [ref, options]);
    return [ref, isIntersecting];
}

const Home: React.FC = () => {
    const [ref, isVisible] = useOnScreen<HTMLParagraphElement>({
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    });
    useEffect(() => {
        if (isVisible) {
            let copiedParams = movieParams
            copiedParams.page = page
            sendRequest(copiedParams).then((res: Movie[]) => {
                setMovies([...movies, ...res])
            })
            setPage(prev => prev + 1)
        }
    }, [isVisible]);
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
        let copiedParams = movieParams
        copiedParams.page = 1
        setPage(2)
        sendRequest(copiedParams).then((res: Movie[]) => {
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
            <p className="text-center text-[24px] mt-4 mb-4" ref={ref}>Все фильмы по данным фильтрам просмотрены /
                Загрузка...</p>
        </div>
    )
}
export default Home
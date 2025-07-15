import React, {useEffect, useState} from "react";
import {getMovieDetail} from "../api/Api";
import {useParams} from "react-router-dom";
import {Movie} from "../api/Movie";
import undefinedPoster from "../images/undefinedPoster.png";
import {useLikeContext} from "../contexts/LikesContext";


const MovieDetail: React.FC = () => {
    const {favoriteFilms, setFavoriteFilms} = useLikeContext()
    const {id} = useParams<{
        id: string;
    }>();
    const [movie, setMovie] = useState<Movie>({
        id: '',
        title: '',
        year: 0
    })
    useEffect(() => {
        getMovieDetail(id!).then((res) => {
            setMovie(res)
        })
    }, []);
    return (
        <div className="w-[100%] flex flex-col items-center justify-center">
            <div className="relative">
                <img className="h-[60vh] mt-[20px]" src={movie.posterUrl ?? undefinedPoster} alt={movie.title}/>
                <div
                    className="like_container cursor-pointer absolute w-[100%] bottom-0 h-[94px] transition duration-300 ease-in-out flex items-center justify-end">
                    <div className="w-[48px] h-[48px] mr-[20px] relative like">
                        <svg className="absolute top-0 left-0" width="48" height="48" viewBox="0 0 48 48"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_2165)">
                                <path
                                    d="M33 6C29.52 6 26.18 7.62 24 10.18C21.82 7.62 18.48 6 15 6C8.84 6 4 10.84 4 17C4 24.56 10.8 30.72 21.1 40.08L24 42.7L26.9 40.06C37.2 30.72 44 24.56 44 17C44 10.84 39.16 6 33 6ZM24.2 37.1L24 37.3L23.8 37.1C14.28 28.48 8 22.78 8 17C8 13 11 10 15 10C18.08 10 21.08 11.98 22.14 14.72H25.88C26.92 11.98 29.92 10 33 10C37 10 40 13 40 17C40 22.78 33.72 28.48 24.2 37.1Z"
                                    fill="#F24E1E"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_1_2165">
                                    <rect width="48" height="48" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <svg
                            className={`liked_like absolute top-0 left-0 ${favoriteFilms.map(film => film.id).includes(movie.id) ? '' : 'hover:opacity-[1] opacity-[0]'} transition ease-in-out duration-300`}
                            onClick={() => {
                                if (!favoriteFilms.map(film => film.id).includes(movie.id)) {
                                    localStorage.setItem("favorite", JSON.stringify([...favoriteFilms.map(val => val.id), movie.id]))
                                    setFavoriteFilms([...favoriteFilms, movie])
                                } else {
                                    localStorage.setItem("favorite", JSON.stringify(favoriteFilms.filter((val) => val.id !== movie.id).map(val => val.id)))
                                    setFavoriteFilms(favoriteFilms.filter((val) => val.id !== movie.id))
                                }
                            }} width="48" height="48" viewBox="0 0 48 48"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_2180)">
                                <path
                                    className={`${favoriteFilms.map(film => film.id).includes(movie.id) ? 'fill-[#FF3A00]' : 'fill-[#F24E1E]'}`}
                                    d="M24 42.7L21.1 40.06C10.8 30.72 4 24.56 4 17C4 10.84 8.84 6 15 6C18.48 6 21.82 7.62 24 10.18C26.18 7.62 29.52 6 33 6C39.16 6 44 10.84 44 17C44 24.56 37.2 30.72 26.9 40.08L24 42.7Z"
                                    fill="#F24E1E"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_1_2180">
                                    <rect width="48" height="48" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
            <p className="text-center text-[30px] font-medium mt-[4px]">{movie.title}</p>
            <p className="text-center text-gray-500 text-[14px] font-medium"> {movie.genres
                ?.map((g) => g.name)
                .join(", ")
            }</p>
            <p className="text-center text-gray-500 text-[14px] font-medium">{movie.year}</p>
            <p className="text-[24px] mt-[20px]">🌟{movie.rating === 0 ? '-' : movie.rating}</p>
            <p className="text-gray-400">Рейтинг <span className="text-orange-500">Кино</span><span
                className="text-neutral-600">поиск</span></p>
        </div>
    )
}

export default MovieDetail
import React, {useEffect, useState} from "react";
import {getMovieDetail} from "../api/Api";
import {useParams} from "react-router-dom";
import {Movie} from "../api/Movie";
import undefinedPoster from "../images/undefinedPoster.png";


const MovieDetail: React.FC = () => {
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
            <img className="h-[60vh] mt-[20px]" src={movie.posterUrl ?? undefinedPoster} alt={movie.title}/>
            <p className="text-center text-[30px] font-medium mt-[4px]">{movie.title}</p>
            <p className="text-center text-gray-500 text-[14px] font-medium">{movie.year}</p>
            <p className="text-[24px] mt-[20px]">🌟{movie.rating === 0 ? '-' : movie.rating}</p>
            <p className="text-gray-400">Рейтинг <span className="text-orange-500">Кино</span><span
                className="text-neutral-600">поиск</span></p>
        </div>
    )
}

export default MovieDetail
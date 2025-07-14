import React from 'react';
import {Movie} from '../api/Movie';
import {Link} from 'react-router-dom';
import undefinedPoster from '../images/undefinedPoster.png'

const MovieCard: React.FC<{
    movie: Movie
}> = ({movie}) => {
    return (
        <Link to={`/movie/${movie.id}`}
              className="p-2 flex flex-col items-center justify-center border-stone-400 border-2 rounded-lg bg-stone-100 transition duration-300 ease-in-out hover:bg-stone-200">
            <img className="h-64 w-[180px]" src={movie.posterUrl ?? undefinedPoster} alt={movie.title}/>
            <p className="text-center text-[20px]">{movie.title}</p>
            <p className="text-[24px] mt-auto">🌟{movie.rating === 0 ? '-' : movie.rating}</p>
            <p className="text-gray-400">Рейтинг <span className="text-orange-500">Кино</span><span
                className="text-neutral-600">поиск</span></p>
        </Link>
    )
}
export default MovieCard;
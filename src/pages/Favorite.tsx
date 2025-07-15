import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getMovieDetail} from "../api/Api"
import {Movie} from "../api/Movie";
import {useLikeContext} from "../contexts/LikesContext";
import MovieCard from "../components/MovieCard";

const Favorite: React.FC = () => {
    const {favoriteFilms, setFavoriteFilms} = useLikeContext()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const favIds = JSON.parse(localStorage.getItem('favorite') || '[]') as number[];
        if (favIds.length === 0) {
            setLoading(false);
            return;
        }
        Promise.all(favIds.map(id => getMovieDetail(String(id))))
            .then(results => {
                setFavoriteFilms(results);
            })
            .catch(err => {
                console.error(err);
                setError('Не удалось загрузить избранное');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Загрузка избранного...</p>;
    if (error) return <p>{error}</p>;
    if (favoriteFilms.length === 0) return <p>У вас пока нет избранных фильмов.</p>;

    return (
        <div style={{padding: 20}}>
            <h1>Избранное</h1>
            <div
                className="mt-[24px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-[26px] pr-[26px]">
                {favoriteFilms.map(movie => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    );
};

export default Favorite;

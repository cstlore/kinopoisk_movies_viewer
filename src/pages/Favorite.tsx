import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getMovieDetail} from "../api/Api"
import {Movie} from "../api/Movie";

const Favorite: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const favIds = JSON.parse(localStorage.getItem('favorites') || '[]') as number[];
        if (favIds.length === 0) {
            setLoading(false);
            return;
        }
        Promise.all(favIds.map(id => getMovieDetail(String(id))))
            .then(results => {
                setMovies(results);
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
    if (movies.length === 0) return <p>У вас пока нет избранных фильмов.</p>;

    return (
        <div style={{padding: 20}}>
            <h1>Избранное</h1>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id} style={{marginBottom: 10}}>
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                style={{width: 50, marginRight: 10, verticalAlign: 'middle'}}
                            />
                            {movie.title} ({movie.year})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorite;

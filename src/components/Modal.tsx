import {useLikeContext} from "../contexts/LikesContext";
import React from "react";
import {Movie} from "../api/Movie";

export const Modal: React.FC<{ movie: Movie }> = ({movie}) => {
    const {favoriteFilms, setFavoriteFilms} = useLikeContext()
    return (
        <div id="modal"
             className="w-[100%] h-[100%] invisible flex items-center justify-center absolute backdrop-blur-xl z-[100000]">
            <div className="w-[50%] h-[50%] bg-black flex cursor-pointer">
                <div
                    className="w-[50%] h-[100%] flex items-center justify-center bg-green-500 transition duration-300 ease-in-out hover:bg-green-600"
                    onClick={() => {
                        if (!favoriteFilms.map(film => film.id).includes(movie.id)) {
                            localStorage.setItem("favorite", JSON.stringify([...favoriteFilms.map(val => val.id), movie.id]))
                            setFavoriteFilms([...favoriteFilms, movie])
                        } else {
                            localStorage.setItem("favorite", JSON.stringify(favoriteFilms.filter((val) => val.id !== movie.id).map(val => val.id)))
                            setFavoriteFilms(favoriteFilms.filter((val) => val.id !== movie.id))
                        }
                        (document.querySelector('#modal') as HTMLElement)!.style.visibility = 'hidden'
                    }}>
                    <p className="text-xl text-white font-bold">
                        ПОДТВЕРДИТЬ??
                    </p>
                </div>
                <div
                    className="w-[50%] h-[100%] flex items-center justify-center bg-red-600 transition duration-300 ease-in-out hover:bg-red-700"
                    onClick={() => {
                        (document.querySelector('#modal') as HTMLElement)!.style.visibility = 'hidden'
                    }}>
                    <p className="text-xl text-white font-bold">
                        ОТМЕНА!!
                    </p>
                </div>
            </div>
        </div>
    )
}
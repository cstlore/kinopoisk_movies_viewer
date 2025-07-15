import React, {createContext, useState, ReactNode, Dispatch, SetStateAction, useContext} from "react";
import {Movie} from "../api/Movie";

export interface LikesContextType {
    favoriteFilms: Movie[];
    setFavoriteFilms: Dispatch<SetStateAction<Movie[]>>;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

interface LikesContextProviderProps {
    children: ReactNode;
}

const LikesContextProvider: React.FC<LikesContextProviderProps> = ({children}) => {
    const [favoriteFilms, setFavoriteFilms] = useState<Movie[]>([]);

    return (
        <LikesContext.Provider value={{favoriteFilms, setFavoriteFilms}}>
            {children}
        </LikesContext.Provider>
    );
};

function useLikeContext(): LikesContextType {
    const ctx = useContext(LikesContext);
    if (!ctx) {
        throw new Error("useLikes must be used within LikesContextProvider");
    }
    return ctx;
}

export {useLikeContext, LikesContextProvider};
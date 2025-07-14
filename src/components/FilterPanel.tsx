import React, {useEffect, useState} from 'react';
import {Filters} from "../api/Filters";

const FilterPanel: React.FC<{
    movieParams: Filters,
    setMovieParams: React.Dispatch<React.SetStateAction<Filters>>
}> = ({movieParams, setMovieParams}) => {
    return (
        <div
            className="w-[90%] bg-slate-300 h-[56px] mt-[24px] rounded-2xl flex justify-center items-center gap-[85px]">
            <p className="text-slate-700 font-medium leading-[56px] ml-8 text-[20px]">Фильтры:</p>
            <div className="h-[56px] ml-4 flex items-center justify-center">
                <p className="leading-[56px] mr-[10px]">Год выпуска:</p>
                <input id="yearFrom"
                       className="w-[40px] h-[30px] mr-[2px] text-[14px] font-bold outline-none text-center"
                       placeholder="0"/>
                <p className="text-[24px] leading-[30px]">-</p>
                <input id="yearTo" className="w-[40px] h-[30px] ml-[2px] text-[14px] font-bold outline-none text-center"
                       placeholder="9999"/>
            </div>
            <div className="h-[56px] ml-4 flex items-center justify-center">
                <p className="leading-[56px] mr-[10px]">Рейтинг фильма:</p>
                <p className="text-[24px] leading-[30px]">🌟</p>
                <input id="ratingMin"
                       className="w-[35px] h-[30px] ml-[2px] text-[14px] font-bold outline-none text-center"
                       placeholder="0"/>
                <p className="text-[24px] leading-[30px]">-</p>
                <input id="ratingMax"
                       className="w-[35px] h-[30px] ml-[2px] text-[14px] font-bold outline-none text-center"
                       placeholder="10"/>
            </div>
            <div className="h-[56px] ml-4 flex items-center justify-center">
                <div className="flex flex-col mr-[10px]">
                    <p className="">Выбор жанра:</p>
                    <p className="text-gray-500 text-[14px] text-center">ctrl/shift</p>
                </div>
                <select id="genres" multiple={true} className="h-[80%]">
                    <option value="боевик">Боевик</option>
                    <option value="драма">Драма</option>
                    <option value="комедия">Комедия</option>
                    <option value="триллер">Триллер</option>
                    <option value="мелодрама">Мелодрама</option>
                    <option value="фантастика">Фантастика</option>
                    <option value="аниме">Аниме</option>
                    <option value="фэнтези">Фэнтези</option>
                    <option value="приключения">Приключения</option>
                    <option value="ужасы">Ужасы</option>
                </select>
            </div>
            <div
                className="h-[40px] leading-[40px] pl-[10px] pr-[10px] rounded-xl bg-neutral-50 duration-300 ease-in-out transition hover:bg-neutral-200 hover:scale-[0.95] cursor-pointer"
                onClick={() => {
                    const ratingMin = Number((document.querySelector('#ratingMin') as HTMLInputElement)?.value.length === 0 ? 0 : (document.querySelector('#ratingMin') as HTMLInputElement)?.value)
                    const ratingMax = Number((document.querySelector('#ratingMax') as HTMLInputElement)?.value.length === 0 ? 10 : (document.querySelector('#ratingMax') as HTMLInputElement)?.value)
                    const yearFrom = Number((document.querySelector('#yearFrom') as HTMLInputElement)?.value.length === 0 ? 1874 : (document.querySelector('#yearFrom') as HTMLInputElement)?.value)
                    const yearTo = Number((document.querySelector('#yearTo') as HTMLInputElement)?.value.length === 0 ? 2050 : (document.querySelector('#yearTo') as HTMLInputElement)?.value)
                    const options = (document.querySelector('#genres') as HTMLSelectElement)?.selectedOptions;
                    const genres = Array.from(options).map(({value}) => value);
                    setMovieParams({
                        page: 1,
                        limit: 50,
                        genres: genres,
                        ratingMax: ratingMax,
                        ratingMin: ratingMin,
                        yearTo: yearTo,
                        yearFrom: yearFrom,
                    })
                }}>
                Применить
            </div>
        </div>
    )
};

export default FilterPanel;

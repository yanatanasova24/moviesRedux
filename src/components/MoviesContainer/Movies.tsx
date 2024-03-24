import React, {FC, PropsWithChildren} from 'react';

import {Movie} from "./Movie";
import {IMovie} from "../../interfaces";
import './Movie.css'
import {Pagination} from "../Pagination/Pagination";
import Loader from "../Loader/Loader";

interface IProps extends PropsWithChildren{
    movies:IMovie[],
    page:number,
    total_pages:number
}

const Movies:FC<IProps> = ({movies, page, total_pages,
}) => {

    // const moviesArray = movies?.results;

    return (
        <div className="Movies">
            {!movies ? <Loader/> : movies.map(movie=><Movie key={movie.id} movie={movie}/>)}
            {movies&&<Pagination
                page={page}
                total_pages={total_pages}
            />
            }
        </div>
    );
};

export {Movies};
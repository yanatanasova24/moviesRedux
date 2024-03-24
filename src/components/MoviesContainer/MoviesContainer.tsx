import React, {FC, PropsWithChildren, useEffect} from 'react';

import {useSearchParams} from "react-router-dom";
import {Movies} from "./Movies";
import Loader from "../Loader/Loader";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../store";

interface IProps extends PropsWithChildren{

}

const MoviesContainer:FC<IProps> = () => {

    const {movies, trigger, page, total_pages} = useAppSelector(state => state.movies)
    const dispatch = useAppDispatch();

    const [query, ] = useSearchParams({page:'1'});

    useEffect(() => {
        dispatch(movieActions.getAll({page: query.get('page')}))
    }, [trigger, dispatch, query]);

    return (
        <div>
            {!movies ? <Loader/> : movies&&<Movies
                movies={movies}
                page={page}
                total_pages={total_pages}
                />}
        </div>
    );
};

export {MoviesContainer};
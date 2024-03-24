import React, {useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";

import {Movies} from "../components";
import Loader from "../components/Loader/Loader";
import {useAppDispatch, useAppSelector} from "../hooks";
import {movieActions} from "../store";

const SingleGenrePage = () => {

    const {id} = useParams();

    let {movies, page, total_pages} = useAppSelector(state => state.movies)

    const dispatch = useAppDispatch();

    const [query, ] = useSearchParams({page:'1'});

    useEffect(() => {
        dispatch(movieActions.getMoviesByGenreId({id:+id, page: query.get('page')})

        )
    }, [dispatch, query, id]);

    return (
            <div>
                {!movies ? <Loader/> : <Movies movies={movies} page={page} total_pages={total_pages}/>}
        </div>
    );
};

export {SingleGenrePage};
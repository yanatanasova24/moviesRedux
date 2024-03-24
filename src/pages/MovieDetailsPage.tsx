import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

import {MovieDetails} from "../components";
import Loader from "../components/Loader/Loader";
import {useAppDispatch, useAppSelector} from "../hooks";
import {movieActions} from "../store";

const MovieDetailsPage = () => {
    const {id} = useParams()

    const {movieDetails} = useAppSelector(state => state.movies)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getById(+id))
    }, [dispatch, id]);

    return (
        <div>
            {!movieDetails ? <Loader/> : <MovieDetails movieDetails={movieDetails}/>}
        </div>
    );
};

export {MovieDetailsPage};
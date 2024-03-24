import React, {useEffect} from 'react';


import {GenreBadge} from "../components";
import "../components/Genres/GenreCloud.css"
import Loader from "../components/Loader/Loader";
import {useAppDispatch, useAppSelector} from "../hooks";
import {movieActions} from "../store";

const GenresPage= () => {

    const {genres} = useAppSelector(state => state.movies)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getGenres())
    }, [dispatch]);

    const genresList = genres?.genres;

    return (
        <div className="GenreCloud">
            {!genres ? <Loader/> : genresList.map(genre => <GenreBadge id={genre.id} key={genre.id} name={genre.name}/>)}
        </div>
    );
};

export {GenresPage};
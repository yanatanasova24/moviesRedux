import React, {useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {movieActions} from "../store";
import Loader from "../components/Loader/Loader";
import {Movies} from "../components";
import {SearchInput} from "../components";

const SearchPage = () => {
    let {query:search} = useParams();

    if(search === undefined) search = ''

    let {movies, page, total_pages} = useAppSelector(state => state.movies)

    const dispatch = useAppDispatch();

    const [query, ] = useSearchParams({page:'1'});

    useEffect(() => {
        dispatch(movieActions.getSearchedMovies({query:search, page: query.get('page')})

        )
    }, [dispatch, query, search]);

    console.log(movies)

    return (
        <div>
            <SearchInput/>
            {!search ? <h3 className={'SearchTitle'}>Please, type a keyword</h3> : ''}
            {search && movies.length === 0 && <h3 className={'SearchTitle'}>No movies found matching your request</h3>}
            {!movies ? <Loader/> : <Movies movies={movies} page={page} total_pages={total_pages}/>}
        </div>
    );
};

export {SearchPage};
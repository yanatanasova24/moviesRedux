import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IGenres, IMovie, IMovieDetails, IMovies, IVideo} from "../../interfaces";
import {movieService} from "../../services";

interface IState {
    movies: IMovie[],
    trigger: boolean,
    page: number,
    total_pages:number,
    movieDetails: IMovieDetails,
    genres: IGenres,
    title:string,
    video:IVideo
}

const initialState: IState = {
    movies: [],
    trigger: null,
    page: null,
    total_pages: null,
    movieDetails: null,
    genres: null,
    title: null,
    video: null
};

const getAll = createAsyncThunk<IMovies<IMovie>, {page:string}>(
    'movieSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getById = createAsyncThunk<IMovieDetails, number>(
    'movieSlice/getById',
    async (id, {rejectWithValue}) =>{
        try {
            const {data} = await movieService.getById(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getGenres = createAsyncThunk<IGenres, void>(
    'moviesSlice/getGenres',
    async (_, {rejectWithValue}) =>{
        try {
            const {data} = await movieService.getGenres();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getMoviesByGenreId = createAsyncThunk<IMovies<IMovie>, {id:number, page:string}>(
    'movieSlice/getMoviesByGenreId',
        async ({id, page}, {rejectWithValue}) => {
            try {
                const {data} = await movieService.getMoviesByGenreId(id, page);
                return data
            } catch (e) {
                const err = e as AxiosError
                return rejectWithValue(err.response.data)
            }
        }
)

const getVideo = createAsyncThunk<IVideo, number>(
    'movieSlice/getVideo',
    async (id, {rejectWithValue}) =>{
        try {
            const {data} = await movieService.getVideo(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getSearchedMovies = createAsyncThunk<IMovies<IMovie>, {query:string, page:string}>(
    'movieSlice/getSearchedMovies',
    async ({query, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getSearchedMovies(query, page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)


const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.movies = action.payload.results
                state.page = action.payload.page
                state.total_pages = action.payload.total_pages
                state.title = 'Popular Movies'
            })
            .addCase(getById.fulfilled, (state, action) =>{
                state.movieDetails = action.payload
                state.title = action.payload.title
            })
            .addCase(getGenres.fulfilled, (state, action)=>{
                state.genres = action.payload
                state.title = 'Genres Cloud'
            })
            .addCase(getMoviesByGenreId.fulfilled, (state, action)=>{
                state.movies = action.payload.results
                state.page = action.payload.page
                state.total_pages = action.payload.total_pages

            })
            .addCase(getVideo.fulfilled, (state, action)=>{
                state.video = action.payload
            })
            .addCase(getSearchedMovies.fulfilled, (state, action)=>{
                state.movies = action.payload.results
                state.page = action.payload.page
                state.total_pages = action.payload.total_pages
                state.title = "Search"
            })
})

const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {
    ...actions,
    getAll,
    getById,
    getGenres,
    getMoviesByGenreId,
    getVideo,
    getSearchedMovies
}

export {
    movieReducer,
    movieActions
}
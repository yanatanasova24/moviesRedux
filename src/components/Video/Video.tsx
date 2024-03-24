import React, {FC, PropsWithChildren, useEffect} from 'react';

import "./Video.css"
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../store";

interface IProps extends PropsWithChildren{
    id:number
}

const Video:FC<IProps> = ({id}) => {

    const {video} = useAppSelector(state => state.movies)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getVideo(id))
    }, [dispatch, id]);

    const videoUrl = `https://www.youtube.com/embed/${video?.results[0].key}`

    return (
        <div className="VideoWrap">
            <h4>{video?.results[0].name}</h4>

            {videoUrl&&<iframe width="560"
                    height="315"
                    src={videoUrl}
                    title="Youtube Player"
                    allowFullScreen></iframe>}
        </div>
    );
};

export {Video};
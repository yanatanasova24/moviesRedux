import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";

import './Pagination.css'

interface IProps extends PropsWithChildren{
    page:number,
    total_pages:number
}

const Pagination:FC<IProps> = ({page, total_pages}) => {
    const pageNumbers = [];

    for (let i = 1; i <= total_pages; i++) {
        pageNumbers.push(i);
    }

    const [pageLimit, setPageLimit] = useState(page<=3 ? 3 : page + 1);
    const [minPageLimit, setMinPageLimit] = useState(page>3 ? page - 2 : 0);
    const [prevNext, setPrevNext] = useState({prev: null, next:null})
    const [query,setQuery] = useSearchParams();

    const setPage = (number:number)=>{
        setQuery({page: number.toString()})
    };

    useEffect(() => {
        setPrevNext({prev:page - 1, next:page + 1})
    }, [page, query]);

    const paginate = (page:number) =>{
        setPage(page);
        if(page > 2){
            setPageLimit(page + 1);
            setMinPageLimit(page - 2);
        }
        if(page <= 2){
            setMinPageLimit(0);
            setPageLimit(3);
        }
    }

    const previousPage = () => {
        setPage(page - 1);
        if(page > 2){
            setPageLimit(page);
            setMinPageLimit(page - 3);
        }
        if(page <= 2){
            setMinPageLimit(0);
            setPageLimit(3);
        }
    };

    const nextPage = () => {
        setPage((page + 1))
        if(page > 2){
            setPageLimit(page + 1);
            setMinPageLimit(page - 2);
        }
    };

    let pageIncrementEllipses = null;
    if(total_pages > pageLimit){
        pageIncrementEllipses = <li>&hellip;</li>
    }
    let pageDecremenEllipses = null;
    if(minPageLimit >=1){
        pageDecremenEllipses = <li>&hellip;</li>
    }

    useEffect(() => {
        if(page > 2){
            setPageLimit(page + 1);
            setMinPageLimit(page - 2);
        }
        if(page <= 2){
            setMinPageLimit(0);
            setPageLimit(3);
        }
    }, [page]);

    return (
        <div className="PaginationWrap">
            {pageNumbers.length > 1 &&<div className="PaginationContainer">
                <ul className="Pagination">
                    <button onClick={previousPage} disabled={!prevNext.prev} className="PageNumber">
                        Prev
                    </button>
                    {pageDecremenEllipses}
                    {pageNumbers.map((number) => {
                        if(number <= pageLimit && number > minPageLimit) {
                            return (
                        <li
                            key={number}
                            onClick={() => paginate(number)}
                            className={
                                'PageNumber ' + (number === page ? 'active' : '')
                            }
                        >
                            {number}
                        </li>
                    ); } else{
                                return null;
                            }})}
                    {pageIncrementEllipses}
                    <button onClick={nextPage} disabled={!prevNext.next} className="PageNumber">
                        Next
                    </button>
                </ul>
            </div>}
        </div>
    );
};

export {Pagination};
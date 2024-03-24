import React, {FC, PropsWithChildren} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";

import css from './Header.module.css'
import {ThemeSwitcher} from "../ThemeSwitcher/ThemeSwitcher";
import {useAppSelector} from "../../hooks";

interface IProps extends PropsWithChildren{

}

const Header:FC<IProps> = () => {
    const navigate = useNavigate();
    const {name} = useParams();

    let {title} = useAppSelector(state => state.movies);
    if(title === null && name != null){
        title = name;
    }

    return (
        <div className={css.Header}>
            <div><button onClick={(e)=> {
                e.preventDefault();
                navigate(-1)}}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA/UlEQVR4nO2YvW0CQRQGP+ogIyIjIzNCoh4QRpRgAjdARkhKSAGE14f/GnCAsMZaEVoIdi/gfXinghlpb2/fkyqVSuVfAcyBD+ALmMkJ4JW/jGQsn1jKWD4xVmSAFZdpgI5M5RMTGcsfZCwf9/bhNvm9jOUTQxnL72Qs/wMMZCqf2MpY/gT0ZSqf2MhY/gj0FAHgmXzWigLnYSSHb6CrKADv7gFznI9QAnix/YhbRMS5RgsjYv3ICiNiPSUKIuI95goi4j2nCyLiDTSZETFHysyImEN9RkTctUpGxETmEU3o1eJDLHcfYr1+JeJJTgAL4BN4A6b39qlUKhW14hfWB6JZZTUnTAAAAABJRU5ErkJggg==" alt={"back"}/></button>
                <button onClick={(e)=> {
                    e.preventDefault();
                    navigate('/search/')}}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC9klEQVR4nO2au2tVQRCHN4mkiwYrn1XEKpoiRqxCFDS2ghZqowiptEljYxWLdEIgIEKsbNMFAhIICooiUav4KAJBO21MUDBR7yfDWeEacnf3njvnnkf2+wP2NztndmZ29hgTiUQikUgkEskOYD9wDBgEjgMHgQ5TVYCjwB1gEVhje34Az4C74hRTBYDzwBPSsQRcBDpN2QCOAI/R4QUwYMoCcBlYR5efwE1TdIDbQI3smC7skSBJcu3gvilo2Nea3Mgv4CuwmcIJ46ZgCW89wGhx0DxwAzhUH8q2L7gCzAK/A9YSpw2ZIkBYtn8JnApcrx9YCFjzDdCV/Q79dd7HDNDd5LqdwGTAsbpm8gR46jHwYYvrT3jW/5hbC03S3vrCvrtFjQ5gzqMzrLcrvbJXCz3zATp9wIZDa1pDJ41hiw6j5pW1JI804oOmVjCOW51wXVlrFDe7NfW82Lrt4rBRRHKJp2Ea1NTzYocZrg5PvT4Dnxya57T1nAAnHcZ8MRkAvHZoXshCsyF2jNWIzSxubMCqQ/O0tp4T28u72GcUAXZ5SmF7ByYkDcp3h0FXlfVGHFp/gF5NvSCA5w6jZpW1phxay5pawdjpbSPkStuvpHPAE20PNHTSGDaAmwWNZAg88uiM6OwonXFLHuMmW1z/lmf9lVwfVEjm9nguRRNpjJQpsG2qXIxls7PmBhcyt/chV9q+Js68L+yFd1IeTd6Q5AKZ2/vYsLe60a1zAmmdbamb8iS8rSOx9pc/R7g2g3SLn20OWfU0OS5eFckJ98gHiYS9ee/f2HwgLzd5UKhIGE/52FEpJwzZ0NRAsv3bMjqhS+b2dnSdBmlyxuxNsNdurlxOqLs5Dtv88N7TNC1Lb29L4n/NU6mdUA/QA5wAzgKXgDO2l/AaXBkntAKwxz66lKdEahOdYFIdhx6zw50wY6oI4TlhrbD/F7UxEtr7hFYwJ6yYqoPbCaoPtoXFNloyePn278vvmM1v04JX98xHIpFIJBIx2vwFyuC9DcG7PH8AAAAASUVORK5CYII=" alt={"search"}/></button>
            </div>
            <NavLink to={'movies'}>All Movies</NavLink>
            <div className={css.HeaderTitle}>{title}</div>
            <NavLink to={'genres'}>Genres</NavLink>
            <ThemeSwitcher />
        </div>
    );
};

export {Header};
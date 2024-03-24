import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import "./SearchInput.css"

interface FormValues {
    search: string;
}

const SearchInput = () => {
    const {handleSubmit, register,} = useForm<FormValues>();

    const navigate = useNavigate();
    const search = (searchWord:FormValues)=>{
        navigate(`/search/${searchWord.search}`);
    }

    return (
        <form onSubmit={handleSubmit(search)} className={'Search'}>
            <input type="search" placeholder={'Search...'} {...register('search')}/>
            <button>Search</button>
        </form>
    );
};

export {SearchInput};
import { setFilter } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const AnecdoteFilter = () => {
    const dispatch = useDispatch();

    const style = {
        marginBottom: '10px'
    };

    return (
        <div style={style}>
            filter <input name={'filter'} onChange={(e) => dispatch(setFilter(e.target.value))}/>
        </div>
    );
};

export default AnecdoteFilter;
import { useSelector, useDispatch } from 'react-redux'
import { changeType } from './../store/reducerfortype'


function TypeTab(){
    
    const type = useSelector((state) => state.type.value);
    const dispatch = useDispatch();
    return(
        <>
        <div className="tabs">
            <div id="" className={`tab ${(type == 'tt') ? 'active' : ''}`} onClick={() => dispatch(changeType('tt'))}>TT</div>
            <div id="" className={`tab ${(type == 'cash') ? 'active' : ''}`} onClick={() => dispatch(changeType('cash'))}>Cash</div>
            <div id="" className={`tab ${(type == 'earn') ? 'active' : ''}`} onClick={() => dispatch(changeType('earn'))}>Earn</div>
        </div>
        </>
    )
}
export default TypeTab;
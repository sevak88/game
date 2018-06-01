export default function rates(state = {}, action){
    if(action.type === 'RATES'){
        return{
            ...state,
            ...action.payload.rates,
        }
    }
    return state;
}
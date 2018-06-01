export default function user(state = {}, action){
    if(action.type === 'AUTH'){
        return{
            ...state,
            token: action.payload.token,
            profile: action.payload.profile
        }
    }
    return state;
}
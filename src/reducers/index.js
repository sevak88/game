import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
import user from './user'
import rates from './rates'
export default combineReducers({
    locale,
    user,
    rates
})
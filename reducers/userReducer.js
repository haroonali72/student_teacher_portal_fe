import {LOGIN_SUCCESS, LOGIN_FAIL} from './../actions/type'

const initialState = {
    login : {}
}

export default function(state=initialState, action) {
    //console.log("within userllogin reducer :", action)
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                login : action.payload
            }
        default:
            return state
    }
}
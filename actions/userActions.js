import {LOGIN_SUCCESS, LOGIN_FAIL} from './type'

export const userLogin = (data) => (dispatch) => {
    //console.log("within userllogin actions :", data)
    fetch('http://localhost:9000/login', {
        method : 'POST',
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify({
            "username" : data.username,
            "password" : data.password
        })
    })
        .then(response => response.json())
        .then(loginResponse => dispatch({
            type : FETCH_POSTS,
            payload : loginResponse
        })
    )
}

export const createPost = (postData) => (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/posts',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(post => dispatch({
            type : NEW_POST, 
            payload : post
        })
    )
}
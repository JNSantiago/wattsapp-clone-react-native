const initialState = {
    name: '',
    email: '',
    password: '',
    uid: '',
    status: 0
};

const AuthReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CHANGE_STATUS':
            return { ...state, status: action.payload.status };
        case 'CHANGE_NAME':
            return { ...state, name: action.payload.name };
        case 'CHANGE_EMAIL':
            return { ...state, email: action.payload.email };
        case 'CHANGE_PASSWORD':
            return { ...state, password: action.payload.password };
        case 'CHANGE_UID':
            return { ...state, status: 1, uid: action.payload.uid };
        default:
            return state;
    }
}

export default AuthReducer
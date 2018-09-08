import firebase from './../FirebaseConnection';

export const checkLogin = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                dispatch({
                    type: 'CHANGE_UID',
                    payload: {
                        uid: user.uid
                    }
                });
            }else {
                dispatch({
                    type: 'CHANGE_STATUS',
                    payload: {
                        status: 2
                    }
                });
            }
        })
    }
}

export const signUp = (name, email, password) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                let uid = firebase.auth().currentUser.uid;
                firebase.database().ref('users').child(uid).set({
                    name: name
                });
                
                dispatch({
                    type: 'CHANGE_UID',
                    payload: {
                        uid: uid
                    }
                })
            })
            .catch((error) => {
                switch(error.code) {
                    case 'auth/email-already-in-use':
                        alert('Email já está em uso!');
                        break;
                    case 'auth/invalid-email':
                        alert('Email inválido!');
                        break;
                    case 'auth/operation-not-allowed':
                        alert('Tente novamente mais tarde!')
                        break;
                    case 'auth/weak-password':
                        alert('Senha muito fraca!')
                        break;
                }
            })
    };
};

export const signIn = (email, password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                let uid = firebase.auth().currentUser.uid;
                
                dispatch({
                    type: 'CHANGE_UID',
                    payload: {
                        uid: uid
                    }
                })
            })
            .catch((error) => {
                switch(error.code) {
                    case 'auth/invalid-email':
                        alert('Email inválido!');
                        break;
                    case 'auth/user-disabled':
                        alert('Seu usuário está desativado!')
                        break;
                    case 'auth/user-not-password':
                        alert('Usuário não encontrado!')
                        break;
                    case 'auth/wrong-password':
                        alert('Senha incorreta!')
                        break;
                }
            })
    }
}

export const changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        payload: {
            name: name
        }
    }
};

export const changeEmail = (email) => {
    return {
        type: 'CHANGE_EMAIL',
        payload: {
            email: email
        }
    }
};

export const changePassword = (password) => {
    return {
        type: 'CHANGE_PASSWORD',
        payload: {
            password: password
        }
    }
};
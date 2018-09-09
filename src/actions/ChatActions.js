import firebase from './../FirebaseConnection';

export const getContactList = (uid) => {
    return dispatch => {
        firebase.database().ref('users').orderByChild('name').once('value').then((snapshot) => {
            let users = []
            snapshot.forEach((childItem) => {
                if(childItem.key != uid){
                    users.push({
                        key: childItem.key,
                        name: childItem.val().name
                    })
                }
            })

            dispatch({
                type: 'SET_CONTACT_LIST',
                payload: {
                    users: users
                }
            })
        })
    }
}

export const createChat = (calleruid, receiveruid) => {
    return (dispatch) => {
        let chat = firebase.database().ref('chats').push();
        chat.child('members').child(calleruid).set({
            id: calleruid
        })
        chat.child('members').child(receiveruid).set({
            id: receiveruid
        })

        let chatId = chat.key;
        firebase.database().ref('users')
            .child(calleruid)
            .child('chats')
            .set({
                id: chatId
            })
        
        firebase.database().ref('users')
            .child(receiveruid)
            .child('chats')
            .set({
                id: chatId
            })
        
        dispatc({
            type: 'SET_ACTIVE_CHAT',
            payload: {
                chatId: chatId
            }
        })
    }
}
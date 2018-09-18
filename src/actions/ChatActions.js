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

export const getChatList = (uid) => {
    return dispatch => {
        firebase.database().ref('users').child(uid).child('chats').on('value', (snapshot) => {
            let chats = [];
            snapshot.forEach((childItem) => {
                chats.push({
                    key: childItem.key,
                    title: childItem.val().title
                })
            })

            dispatch({
                type: 'SET_CHATS_LIST',
                payload: {
                    chats: chats
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
        firebase.database().ref('users').child(receiveruid).once('value').then((snapshot) => {
            firebase.database().ref('users')
            .child(calleruid)
            .child('chats')
            .child(chatId)
            .set({
                id: chatId,
                title: snapshot.val().name
            })
        })

        firebase.database().ref('users').child(calleruid).once('value').then((snapshot) => {
            firebase.database().ref('users')
            .child(receiveruid)
            .child('chats')
            .child(chatId)
            .set({
                id: chatId,
                title: snapshot.val().name
            })
        })
        
        dispatch({
            type: 'SET_ACTIVE_CHAT',
            payload: {
                chatId: chatId
            }
        })
    }
}

export const setActiveChat = (chatId) => {
    return {
        type: 'SET_ACTIVE_CHAT',
        payload: {
            chatId: chatId
        }
    }
}

export const sendMessage = (txt, author, activeChat) => {
    return (dispatch) => {
        let currentDate = '';
        let cDate = new Date();
        currentDate = cDate.getFullYear() + '-' + (cDate.getMonth() + 1) + '-' + cDate.getDate() + ' ' + cDate.getHours() + ':' + cDate.getMinutes() + ':' + cDate.getSeconds()
        
        let messageId = firebase.database().ref('chats').child(activeChat).child('messages').push();

        messageId.set({
            date: currentDate,
            m: txt,
            uid: author
        })
    }
}

export const monitorChat = (activeChat) => {
    return (dispatch) => {
        firebase.database().ref('chats').child(activeChat).child('messages').orderByChild('timestamp').on('value', (snapshot) => {
            let arrayMsg = [];
            snapshot.forEach((childItem) => {
                arrayMsg.push({
                    key: childItem.key,
                    date: childItem.val().date,
                    m: childItem.val().m,
                    uid: childItem.val().uid
                })
            });

            dispatch({
                type: 'SET_ACTIVE_CHAT_MESSAGES',
                payload: {
                    'msgs': arrayMsg
                }
            })
        })
    }
}

export const monitorChatOff = (activeChat) => {
    return (dispatch) => {
        firebase.database().ref('chats').child(activeChat).child('messages').off();
    }
}
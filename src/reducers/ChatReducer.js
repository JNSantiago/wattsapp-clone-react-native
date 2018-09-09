const initialState = {
    chats: [],
    contacts: [],
    activeChat: ''
}

const ChatReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_CONTACT_LIST':
            return { ...state, contacts: action.payload.users }
        case 'SET_ACTIVE_CHAT':
            return { ...state, activeChat: action.payload.chatId }
        default:
            return state;
    }
}

export default ChatReducer;
const initialState = {
    chats: [],
    contacts: [],
    activeChat: '',
    activeChatTitle: '',
    activeChatMessages: []
}

const ChatReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_CONTACT_LIST':
            return { ...state, contacts: action.payload.users }
        case 'SET_CHATS_LIST':
            return { ...state, chats: action.payload.chats }
        case 'SET_ACTIVE_CHAT':
            let chatTitle = '';
            for(var i in state.chats){
                if(state.chats[i].key == action.payload.chatId){
                    chatTitle = state.chats[i].title;
                }
            }

            return { ...state, activeChat: action.payload.chatId, activeChatTitle: chatTitle }
        case 'SET_ACTIVE_CHAT_MESSAGES':
            return { ...state, activeChatMessages: action.payload.msgs }
        default:
            return state;
    }
}

export default ChatReducer;
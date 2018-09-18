import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import ConversationsList from './ConversationsList';
import InternalConversation from './InternalConversation';
import Config from './Config';

const ConversationsStackNavigator = StackNavigator({
    ConversationsList: {
        screen: ConversationsList
    },
    /*InternalConversation: {
        screen: InternalConversation,
        navigationOptions: {
            tabBarVisible: false
        }
    }*/
})

export default ConversationsStackNavigator;
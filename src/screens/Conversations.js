import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import ConversationsStackNavigator from './ConversationsStackNavigator';
import ContactList from './ContactList';
import Config from './Config';

const Conversations = TabNavigator({
    ConversationsStack: {
        screen: ConversationsStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Conversas',
            header: null
        }
    },
    ContactList: {
        screen: ContactList
    },
    Config: {
        screen: Config
    }
}, {
    tabBarOptions: {
        style: {
           backgroundColor: '#128C7E',
        },
        indicatorStyle: {
            backgroundColor: '#ECE5DD',
        }
      }
})

export default Conversations;
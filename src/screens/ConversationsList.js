import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { getChatList, setActiveChat } from '../actions/ChatActions';

import ConversationItem from './../components/ConversationsList/ConversationItem';

export class ConversationsList extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.props.getChatList(this.props.uid);

        this.openContactList = this.openContactList.bind(this);
        this.conversationClick = this.conversationClick.bind(this);
    }

    componentDidUpdate() {
        if(this.props.activeChat != '') {
            //window.globalNavigator.navigate('Message');
            this.props.navigation.navigate('InternalConversation', { title: this.props.activeChatTitle });
        }
    }

    openContactList() {
        
    }

    conversationClick(data) {
        this.props.setActiveChat(data.key)
    }

    render() {
        return(
            <View style={ styles.container }>
                <FlatList
                    data={this.props.chats}
                    renderItem={({item}) => <ConversationItem data={item}
                    onPress={this.conversationClick} />
                } />

                <TouchableOpacity
                    onPress={this.openContactList}
                    style={styles.floatButtonStyle}>

                    <Icon name="message"  size={30} color="#ECE5DD" />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        height: '100%'
    },
    floatButtonStyle: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10,
        height:70,
        backgroundColor:'#25D366',
        borderRadius:100,
        alignSelf: 'flex-end',
        marginBottom: 10
    }
});

const mapStateToProps = (state) => {
    return {
        status: state.auth.status,
        uid: state.auth.uid,
        activeChat: state.chat.activeChat,
        chats: state.chat.chats,
        activeChatTitle: state.chat.activeChatTitle
    }
}

const ConversationsListConnect = connect(mapStateToProps, { getChatList, setActiveChat })(ConversationsList);
export default ConversationsListConnect;
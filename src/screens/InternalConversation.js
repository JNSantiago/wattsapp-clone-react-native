import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    BackHandler,
    TouchableHighlight,
    FlatList,
    TextInput,
    ImageBackground,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';

import { setActiveChat, sendMessage, monitorChat, monitorChatOff } from './../actions/ChatActions';

import MessageItem from './../components/InternalConversation/MessageItem';

export class InternalConversation extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
        headerStyle: {
            backgroundColor: '#128C7E', 
            elevation: null
        },
        headerTintColor: '#ECE5DD',
        tabBarVisible: false,
        headerLeft: (
            <TouchableHighlight onPress={() => {
                navigation.state.params.backFunction()
            }}>
                <Image 
                    source={require('react-navigation/src/views/assets/back-icon.png')} 
                    style={{width:25, height: 25, marginLeft:20}} />
            </TouchableHighlight>
        )
    })

    constructor(props) {
        super(props);
        this.state = {
            inputText: ''
        }

        this.openContactList = this.openContactList.bind(this);
        this.backToTheHome = this.backToTheHome.bind(this);
        this.sendMsg = this.sendMsg.bind(this)
    }

    componentDidMount() {
        this.props.navigation.setParams({backFunction: this.backToTheHome});
        BackHandler.addEventListener('hardwareBackPress', this.backToTheHome);

        this.props.monitorChat(this.props.activeChat);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToTheHome);
    }

    backToTheHome() {
        this.props.monitorChatOff(this.props.activeChat);
        this.props.setActiveChat('');
        this.props.navigation.goBack();

        // Para que ele nao feche o aplicativo quando voltar com o botão "físico"
        return true;
    }

    sendMsg() {
        let text = this.state.inputText;
        let state = this.state;
        state.inputText = '';
        this.setState(state);

        this.props.sendMessage(text, this.props.uid, this.props.activeChat);
    }

    openContactList() {
        
    }

    render() {
        let AreaBehavior = Platform.select({ios:'padding', android: null});
        let AreaOffset = Platform.select({ios: 64, android: null})
        return(
            <ImageBackground
                style={{resizeMode: 'stretch', width: '100%', height: '100%', flex: 1 }}
                source={ require('./../assets/img/background_conversation.jpg') }>
                <KeyboardAvoidingView style={{flex: 1}}
                    behavior={AreaBehavior}
                    keyboardVerticalOffset={AreaOffset}>
                    <FlatList
                        ref={(ref) => { this.chatArea = ref }}
                        onContentSizeChange={() => {this.chatArea.scrollToEnd({animated:true})}}
                        onLayout={() => this.chatArea.scrollToEnd({animated: true})}
                        style={styles.chatArea}
                        data={this.props.activeChatMessages}
                        renderItem={({item}) => <MessageItem data={item} me={this.props.uid} />}
                    />

                    <View style={styles.sendArea}>
                        <TextInput 
                            underlineColorAndroid='transparent'
                            placeholder='Digite aqui...'
                            value={this.state.inputText}
                            onChangeText={(inputText) => this.setState({inputText})}
                            style={styles.sendInput}
                        />

                        <TouchableHighlight style={styles.sendButton} onPress={this.sendMsg}>
                            <Icon name="send"  size={20} color="#ECE5DD" />
                        </TouchableHighlight>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    chatArea: {
        flex: 1,
    },
    sendArea: {
        height: 50,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendInput: {
        height: 40,
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginLeft: 6,
        marginRight: 6
    },
    sendButton: {
        width: 40,
        height: 40,
        backgroundColor: '#128C7E',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginLeft: 6,
        marginRight: 6
    }
});

const mapStateToProps = (state) => {
    return {
        status: state.auth.status,
        uid: state.auth.uid,
        activeChat: state.chat.activeChat,
        activeChatMessages: state.chat.activeChatMessages
    }
}

const InternalConversationConnect = connect(mapStateToProps, { setActiveChat, sendMessage, monitorChat, monitorChatOff })(InternalConversation);
export default InternalConversationConnect;
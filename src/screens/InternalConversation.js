import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';

export class InternalConversation extends Component {
    static navigationOptions = {
        title: 'Conversa Interna'
    }

    constructor(props) {
        super(props);

        this.openContactList = this.openContactList.bind(this);
    }

    openContactList() {
        
    }

    render() {
        return(
            <View style={ styles.container }>
                <Text>Conversa Interna</Text>
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
        uid: state.auth.uid
    }
}

const InternalConversationConnect = connect(mapStateToProps, {  })(InternalConversation);
export default InternalConversationConnect;
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Keyboard
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';

export class Conversations extends Component {
    static navigationOptions = {
        title: 'Conversations'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={ styles.container }>
                <Text>Conversations - { this.props.uid }</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    }
});

const mapStateToProps = (state) => {
    return {
        status: state.auth.status,
        uid: state.auth.uid
    }
}

const ConversationsConnect = connect(mapStateToProps, {  })(Conversations);
export default ConversationsConnect;
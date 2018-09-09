import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Image
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';

import { getContactList, createChat } from '../actions/ChatActions';
import ContactItem from './../components/ContactList/ContactItem';

export class ContactList extends Component {
    static navigationOptions = {
        title: 'Wattsapp Clone',
        tabBarLabel: 'Contatos'
    }

    constructor(props) {
        super(props);

        this.props.getContactList(this.props.uid);

        this.contactClick = this.contactClick.bind(this);
    }

    contactClick(item) {
        this.props.createChat(this.props.uid, item.key);

        this.props.navigation.navigate('ConversationsStack');
    }

    render() {
        return(
            <View style={ styles.container }>
                <FlatList
                    data={ this.props.contacts }
                    renderItem={({item}) => <ContactItem data={item}
                    onPress={this.contactClick} />}
                />
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
        uid: state.auth.uid,
        contacts: state.chat.contacts
    }
}

const ContactListConnect = connect(mapStateToProps, { getContactList, createChat })(ContactList);
export default ContactListConnect;
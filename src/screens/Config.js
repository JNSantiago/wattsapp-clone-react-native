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
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { signOut } from '../actions/AuthActions';

export class Config extends Component {
    static navigationOptions = {
        title: 'Wattsapp Clone',
        tabBarLabel: 'Conf'
    }

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.signOut();

        window.globalNavigator.navigate('Home');
        /*
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Home'})
            ]
        }));*/
    }

    render() {
        return(
            <View style={ styles.container }>
                <Button
                    title="Sair"
                    onPress={this.logout} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        height: '100%'
    },
});

const mapStateToProps = (state) => {
    return {
        status: state.auth.status,
        uid: state.auth.uid
    }
}

const ConfigConnect = connect(mapStateToProps, { signOut })(Config);
export default ConfigConnect;
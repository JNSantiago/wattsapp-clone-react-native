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
import { changeEmail, changePassword, signIn } from '../actions/AuthActions';

export class SignIn extends Component {
    static navigationOptions = {
        title: 'Login'
    }

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if(this.props.status == 1) {
            Keyboard.dismiss();
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Conversations'})
                ]
            }))
        }
    }

    render() {
        return(
            <View style={ styles.container }>
                <Text>Login</Text>
                <TextInput 
                    style={styles.textInput} 
                    value={this.props.email} 
                    onChangeText={this.props.changeEmail} />
                <TextInput 
                    secureTextEntry={true} 
                    style={styles.textInput} 
                    value={this.props.password} 
                    onChangeText={this.props.changePassword} />

                <Button
                    onPress={() => this.props.signIn(this.props.email, this.props.password)}
                    title="Entrar" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    textInput: {
        height: 40
    }
});

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        status: state.auth.status
    }
}

const SignInConnect = connect(mapStateToProps, { changeEmail, changePassword, signIn })(SignIn);
export default SignInConnect;
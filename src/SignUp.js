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
import { changeName, changeEmail, changePassword, signUp } from './actions/AuthActions';

export class SignUp extends Component {
    static navigationOptions = {
        title: 'Cadastrar'
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
                <Text>Cadastrar</Text>

                <TextInput 
                    style={styles.textInput} 
                    value={this.props.name} 
                    onChangeText={this.props.changeName} />
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
                    onPress={() => this.props.signUp(this.props.name, this.props.email, this.props.password)}
                    title="Cadastrar" />
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
        name: state.auth.name,
        email: state.auth.email,
        password: state.auth.password,
        status: state.auth.status
    }
}

const SignUpConnect = connect(mapStateToProps, { changeName, changeEmail, changePassword, signUp })(SignUp);
export default SignUpConnect;
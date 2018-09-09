import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';

export class Home extends Component {
    static navigationOptions = {
        title: '',
        header: null
    }

    constructor(props) {
        super(props);

        this.signInButton = this.signInButton.bind(this);
        this.signupButton = this.signupButton.bind(this);
    }

    signInButton() {
        this.props.navigation.navigate('SignIn');
    }

    signupButton() {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return(
            <View style={ styles.container }>
                <Text>Wattsapp Clone</Text>
                <Button
                    onPress={this.signInButton}
                    title="Login" />
                <Button
                    onPress={this.signupButton}
                    title="Cadastrar" />
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
        status: state.auth.status
    }
}

const HomeConnect = connect(mapStateToProps, { checkLogin })(Home);
export default HomeConnect;
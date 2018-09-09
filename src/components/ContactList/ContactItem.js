import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Image
} from 'react-native';

export default class ContactItem extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onPress(this.props.data);
    }
    
    render() {
        return (
            <TouchableHighlight
                underlayColor='#DDDDDD'
                onPress={this.onClick}>
                <View style={styles.containerContactItem} >
                    <View>
                        <Image style={styles.profileImage} source={require('../../assets/img/no-profile-photo.jpg')} />
                    </View>
                    <View>
                        <Text>{this.props.data.name}</Text>
                        <Text>Um Status Qualquer que eu coloquei</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 6
    },
    containerContactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    }
});
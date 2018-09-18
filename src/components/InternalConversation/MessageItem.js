import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Image
} from 'react-native';

export default class MessageItem extends Component {
    constructor(props) {
        super(props);
        let bgColor = '#FFFFFF';
        let align = 'flex-start';
        let txtAlign = 'left';

        if(this.props.data.uid == this.props.me){
            bgColor = '#d5ffc6';
            align = 'flex-end';
        }

        this.state = {
            bgColor: bgColor,
            align: align,
            txtAlign: txtAlign,
            dateMsg: this.getFormattedDate(this.props.data.date)
        }
    }

    getFormattedDate(originalDate){
        let cDate = new Date();
        let mDate = originalDate.split(' ');
        let todayDate = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate();
        let newDate = mDate[1].split(':');
        newDate = ((newDate[0]<10) ? '0'+newDate[0]:newDate[0])+':'+((newDate[1]<10) ? '0'+newDate[1]:newDate[1]);
        if(todayDate != mDate[0]){
            let newDateDays = mDate[0].split('-');
            newDate = newDateDays[2]+'/'+newDateDays[1]+'/'+newDateDays[0]+' '+newDate;
        }
        return newDate;
    }
    // TODO implementar teclado de emoji https://facebook.github.io/react-native/blog/2018/03/22/building-input-accessory-view-for-react-native
    render() {
        return (
            <View style={[styles.area, {alignSelf: this.state.align, backgroundColor:this.state.bgColor}]}>
                <Text style={{textAlign:this.state.txtAlign}}>{this.props.data.m}</Text>
                <Text style={styles.dateTxt}>{this.state.dateMsg}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    area: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#999999',
        padding: 10,
        maxWidth: '80%',
        borderRadius: 5
    },
    dateTxt: {
        fontSize: 11,
        textAlign: 'right'
    }
});
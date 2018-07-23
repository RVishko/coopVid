import React from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import firebase from './firebase'



export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerLeft: null
    };

    constructor() {
        super();

        this.state = {

        }
    }

    logOut(e) {
        const {navigate} = this.props.navigation
        firebase.auth().signOut().then(function() {
            console.log('logout Succsec')
            navigate('Registration');
        }).catch(function(error) {
            // An error happened.

        });
    }


    render() {
        const { navigation } = this.props;
        const email = navigation.getParam('email','NO-EMAIL');
        const uid = navigation.getParam('uid','NO-UID');
            // var displayName = user.displayName;
            // var email = user.email;
            // var emailVerified = user.emailVerified;
            // var photoURL = user.photoURL;
            // var isAnonymous = user.isAnonymous;
            // var uid = user.uid;
        return (
            <View style={styles.container}>
                <Text>{email}</Text>
                <Text>{uid}</Text>
                <Text>hello</Text>
                <Button title='Log out' onPress={this.logOut.bind(this)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

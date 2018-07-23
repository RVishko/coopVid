import React from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewPagerAndroid, WebView} from 'react-native';
import firebase from './firebase'
import {YouTube} from 'react-native-youtube'
import { YouTubeStandaloneAndroid } from 'react-native-youtube';



export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerLeft: null,
        header: null,
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
            navigate('Login');
        }).catch(function(error) {
            // An error happened.

        });
    }



    render() {
        const { navigation } = this.props;
        const email = navigation.getParam('email','NO-EMAIL');
        const uid = navigation.getParam('uid','NO-UID');
        let yourAlert = `alert("hello")`
        return (
                <ViewPagerAndroid
                    style={styles.viewPager}
                    initialPage={1}>
                    <View style={styles.pageStyle} key="1">
                        <Text>First page</Text>
                    </View>
                    <View style={styles.pageStyle} key="2">
                        <Text>Second page</Text>
                        {/*<YouTube*/}
                            {/*apiKey='AIzaSyBEUE7AENYGu8GbNtytt-wXDFk6IdP-TmQ'*/}
                            {/*videoId="KVZ-P-ZI6W4"   // The YouTube video ID*/}
                            {/*play={true}             // control playback of video with true/false*/}
                            {/*fullscreen={true}       // control whether the video should play in fullscreen or inline*/}
                            {/*loop={true}             // control whether the video should loop when ended*/}

                            {/*// onReady={e => this.setState({ isReady: true })}*/}
                            {/*// onChangeState={e => this.setState({ status: e.state })}*/}
                            {/*// onChangeQuality={e => this.setState({ quality: e.quality })}*/}
                            {/*// onError={e => this.setState({ error: e.error })}*/}

                            {/*style={{ alignSelf: 'stretch', height: 300 }}*/}
                        {/*/>*/}
                    </View>
                    <View style={styles.pageStyle} key="3">
                        <Text>{email}</Text>
                        <Text>{uid}</Text>
                        <Button title='Log out' onPress={this.logOut.bind(this)} />
                    </View>
                </ViewPagerAndroid>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },viewPager: {
        flex: 1
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
    }
});

import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ViewPagerAndroid,
    WebView,
    Platform,
    Image, ScrollView, TouchableNativeFeedback, TouchableHighlight, TouchableWithoutFeedback
} from 'react-native';
import firebase from './firebase'
import searchYouTube from 'youtube-search-api-with-axios';
import { Button } from 'react-native-elements';
import {BackHandler} from 'react-native';
import VideoCard  from './VideoCard'
import Dimensions from "react-native";



const API_KEY = 'AIzaSyBEUE7AENYGu8GbNtytt-wXDFk6IdP-TmQ';



export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerLeft: null,
        header: null,

    };

    constructor() {
        super();

        this.state = {
            visible : false,
            searchText: '',
            videos: [],
            currentVideoID: null,

        }
        this.videoPress = this.videoPress.bind(this)
        this.backPress = this.backPress.bind(this)
    }

    componentDidMount(){

        searchYouTube({key: API_KEY, q: this.state.searchText, maxResults: 19}, (videos) => {
            this.setState({videos})
            console.log(videos)
        });
    }


    getStyle(){
        if (this.getOrientation() === 'LANDSCAPE') {
            return landscapeStyles;
        } else {
            return portraitStyles;
        }
    }



    handleChangeSearch(text){
        this.setState({searchText: text})
    }


    Search(){
        searchYouTube({key: API_KEY, q: this.state.searchText, maxResults: 9}, (videos) => {
            this.setState({videos})
        });
    }

    videoPress(id){
        console.log(id);
        this.setState({
            visible: true,
            currentVideoID: id
        })

    }

    backPress() {
        this.setState({
            visible: false,
            currentVideoID: null
        })
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
        const videoList = []
        this.state.videos.map((video) =>{
            let itemVideo = {
                Img: video.snippet.thumbnails.high.url,
                Id: video.id.videoId
            }
            videoList.push(itemVideo)
            console.log(videoList.length)
        });


        // apiKey='AIzaSyBEUE7AENYGu8GbNtytt-wXDFk6IdP-TmQ'
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
                    <View style={ styles.container } key="2" >
                        {!this.state.visible && <View >
                            <View style={{height: 80}}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20
                                }}>
                                <TextInput
                                    type='text'
                                    onChangeText={this.handleChangeSearch.bind(this)}
                                    value={this.state.searchText}
                                    placeholder='video'
                                    style={{color: '#b32a2f',fontWeight: 'bold',borderStyle: 'solid',borderWidth: 5, borderColor: '#b32a2f',paddingLeft: 10,height:50, width:'40%'}}
                                />
                                <Button
                                    title='Search'
                                    titleStyle={styles.text}
                                    buttonStyle={styles.buttons}
                                    onPress={this.Search.bind(this)}
                                />
                                </View>
                            </View>

                            <ScrollView style={styles.contentContainer}>
                                {videoList.map((item,index) =>
                                    <VideoCard item={item} videoPress={this.videoPress}/>
                                )}
                            </ScrollView>

                        </View>}
                        {this.state.visible && <View style={styles.youtubeOver}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'black',
                                    marginTop: 15,
                                    alignItems: 'flex-start',
                                    padding: 10}}
                                onPress={this.backPress}>
                                <Text style={{color: '#ffffff'}}>Back Pls</Text>
                            </TouchableOpacity>
                        </View>}
                        {this.state.visible && <WebView
                            style={ styles.WebViewContainer }
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{uri: `https://www.youtube.com/embed/${this.state.currentVideoID}` }}
                        />}
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
    contentContainer: {
        marginBottom: 100,
        // width: '100%'
    }
    ,container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },viewPager: {
        flex: 1
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
    },
    WebViewContainer: {

        marginTop: (Platform.OS == 'ios') ? 20 : 0,
        zIndex: 0,

    },
    youtubeOver:{
        zIndex: 1,
        height: 150,
        position:'absolute',
        backgroundColor:'#b32a2f',
        height: 150,
        width: '100%',
        opacity: 0.5
    },
    text:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 50,
    },
    buttons: {
        backgroundColor:'#b32a2f',
        width: 150,
        height: 50,
    }
});


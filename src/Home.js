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
    Image, ScrollView, TouchableNativeFeedback, TouchableHighlight, TouchableWithoutFeedback, Modal
} from 'react-native';
import firebase from './firebase'
import searchYouTube from 'youtube-search-api-with-axios';
import {Button, Card} from 'react-native-elements';
import {BackHandler} from 'react-native';
import VideoCard from './VideoCard'
import {Dimensions} from 'react-native'


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
            visible: false,
            visibleWeb: false,
            visibleModal: false,
            searchText: '',
            videos: [],
            currentVideoID: null,
            complete: false,
            canScroll: true,
            currVideo: {},
            allVideos: [],
        }


        this.videoPress = this.videoPress.bind(this)
        this.backPress = this.backPress.bind(this)
        this.plsPress = this.plsPress.bind(this)
        this.onMessageFYT = this.onMessageFYT.bind(this)
        this.onScrollView = this.onScrollView.bind(this)
        this.createPublicRoom = this.createPublicRoom.bind(this)
        this.createPrivateRoom = this.createPrivateRoom.bind(this)
        // this.videoHTMLRender = this.videoHTMLRender.bind(this)
    }

    componentDidMount() {


        searchYouTube({key: API_KEY, q: this.state.searchText, maxResults: 19}, (videos) => {
            const videoList = []
            videos.map((video) => {
                let itemVideo = {
                    Img: video.snippet.thumbnails.high.url,
                    Id: video.id.videoId
                }
                videoList.push(itemVideo)
                this.setState({allVideos: videoList})

            });
        });


    }


    getStyle() {
        if (this.getOrientation() === 'LANDSCAPE') {
            return landscapeStyles;
        } else {
            return portraitStyles;
        }
    }


    handleChangeSearch(text) {
        this.setState({searchText: text})
    }


    Search() {
        searchYouTube({key: API_KEY, q: this.state.searchText, maxResults: 9}, (videos) => {
            this.setState({allVideos: videos})
        });
    }

    videoPress(id) {


        console.log(id);
        let currVideo = {}
        this.state.allVideos.map(video => {
            if (video.Id === id) {
                currVideo = video
            }
        })

        this.setState({
            visible: true,
            currentVideoID: id,
            // canScroll: false,
            currVideo

        })

    }

    onScrollView() {
        this.setState({
            visible: false
        })
    }

    backPress() {
        this.setState({
            currentVideoID: null,
            complete: false,
            canScroll: true,
        })
    }

    plsPress() {
        console.log("OKEY")
        this.setState({complete: true})
    }


    onMessageFYT(e) {
        console.log("On Message", e.nativeEvent.data);
    }

    createPublicRoom(Id) {

        console.log("public", Id)
        this.setState({visibleModal: true})
    }

    createPrivateRoom(Id) {

        console.log("private", Id)
        this.setState({visibleModal: true})
    }


    logOut(e) {
        const {navigate} = this.props.navigation
        firebase.auth().signOut().then(function () {
            console.log('logout Succsec')
            navigate('Login');
        }).catch(function (error) {
            // An error happened.

        });
    }

//     videoHTMLRender(Id) {
//         // let {height, width} = Dimensions.get('window');
//         return `<iframe src="https://www.youtube.com/embed/${Id}?enablejsapi=1" width="640" height="380"></iframe>
//                 <script>
//                 var frame = document.querySelector('iframe');
//                 var message = function(func) {
//                  return JSON.stringify({
//                     event: 'command',
//                     func: func,
//                     args: []
//                     });
//                     };
//                 var execCommand = function(frame) {
//   return function(func) {
//     return function() {
//       frame.contentWindow.postMessage(message(func), '*');
//     };
//   };
// };
//                 var frameCommand = execCommand(frame);
//                 document.addEventListener("message", function(event) {
//     console.log("Received post message", event);
//
//
//     if(event.data === 'playVideo') {
//         frameCommand(event.data)
//          window.postMessage(event.data);
//     }
// }, false);
//
//
//                 </script>`
//     }


    render() {


        const {navigation} = this.props;
        const email = navigation.getParam('email', 'NO-EMAIL');
        const uid = navigation.getParam('uid', 'NO-UID');

        return (
            <ViewPagerAndroid
                style={styles.viewPager}
                initialPage={1}
                scrollEnabled={this.state.canScroll}
                peekEnabled={true}
            >
                <View style={styles.pageStyle} key="1">
                    <Text>First page</Text>
                </View>
                <View style={styles.container} key="2">
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.visibleModal}
                        onRequestClose={() => {
                            this.setState({visibleModal: false})
                        }}>
                        <View>
                            <View
                                style={styles.modal}
                            >
                                <View style={{backgroundColor: '#ffffff', opacity:0.5}}>
                                    <Image
                                        style={{
                                            marginVertical: 25,
                                            alignSelf: 'center',
                                            height: 150,
                                            width: 150,
                                            borderWidth: 1,
                                            borderRadius: 75
                                        }}
                                        source={{uri: this.state.currVideo.Img}}
                                        resizeMode={"cover"}
                                    />
                                </View>

                                <TouchableHighlight
                                    onPress={() => {
                                        this.setState({visibleModal: false})
                                    }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>

                    {!this.state.visibleWeb && <View>
                        <View style={{height: 80}}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                            }}>
                                <TextInput
                                    type='text'
                                    onChangeText={this.handleChangeSearch.bind(this)}
                                    value={this.state.searchText}
                                    placeholder='video'
                                    style={{
                                        color: '#b32a2f',
                                        fontWeight: 'bold',
                                        borderStyle: 'solid',
                                        borderWidth: 5,
                                        borderColor: '#b32a2f',
                                        paddingLeft: 10,
                                        height: 50,
                                        width: '40%'
                                    }}
                                />
                                <Button
                                    title='Search'
                                    titleStyle={styles.text}
                                    buttonStyle={styles.buttons}
                                    onPress={this.Search.bind(this)}
                                />
                            </View>
                        </View>

                        <ScrollView
                            style={{marginBottom: 100}}
                            onScroll={this.onScrollView}
                        >
                            {this.state.allVideos.map((item, index) =>
                                <VideoCard
                                    item={item}
                                    visible={this.state.visible}
                                    currVideo={this.state.currentVideoID}
                                    videoPress={this.videoPress}
                                    createPublic={this.createPublicRoom}
                                    createPrivate={this.createPrivateRoom}
                                />
                            )}
                        </ScrollView>

                    </View>}
                    {this.state.visibleWeb && <View style={styles.youtubeOver}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'black',
                                marginTop: 15,
                                alignItems: 'flex-start',
                                padding: 10
                            }}
                            onPress={this.backPress}>
                            <Text style={{color: '#ffffff'}}>Back Pls</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'black',
                                marginTop: 25,
                                alignItems: 'flex-start',
                                padding: 10
                            }}
                            onPress={this.plsPress}>
                            <Text style={{color: '#ffffff'}}>PRESS PLS</Text>
                        </TouchableOpacity>
                    </View>}
                    {this.state.visibleWeb && <WebView
                        style={styles.WebViewContainer}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        mediaPlaybackRequiresUserAction={false}
                        source={{uri: `https://www.youtube.com/embed/${this.state.currentVideoID}?enablejsapi=1&rel=0`}}
                        onMessage={this.onMessageFYT}
                        ref={(webView) => this.webView = webView}
                    />}
                </View>
                <View style={styles.pageStyle} key="3">
                    <Text>{email}</Text>
                    <Text>{uid}</Text>
                    <Button title='Log out' onPress={this.logOut.bind(this)}/>
                </View>
            </ViewPagerAndroid>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        // alignItems: 'center',
        // justifyContent: 'center',
    }, viewPager: {
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
    youtubeOver: {
        zIndex: 1,
        height: 150,
        position: 'absolute',
        backgroundColor: '#b32a2f',
        height: 150,
        width: '100%',
        opacity: 0.5
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 50,
    },
    buttons: {
        backgroundColor: '#b32a2f',
        width: 150,
        height: 50,
    },
    modal: {
        backgroundColor: '#b32a2f',
        height: '100%',
    }
});


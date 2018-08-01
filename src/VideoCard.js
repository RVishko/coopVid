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
import searchYouTube from 'youtube-api-search';
import {Button} from 'react-native-elements';
import {BackHandler} from 'react-native';
import {Card} from 'react-native-elements'


export default class VideoCard extends React.Component {
    componentDidMount() {
    }

    render() {
        let visible = this.props.currVideo === this.props.item.Id

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 150,
                    backgroundColor: '#b32a2f',
                    width: '100%',
                    marginTop: 25,

                }}
            >
                {(visible && this.props.visible) &&
                <View style={styles.buttonOver}>
                    <TouchableOpacity
                        style={styles.overButton}
                        onPress={()=>this.props.createPublic(this.props.item.Id)}
                    >
                        <Text>Public Room</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.overButton}
                        onPress={()=>this.props.createPrivate(this.props.item.Id)}
                    >
                        <Text>Private Room</Text>
                    </TouchableOpacity>
                </View>}
                <TouchableOpacity
                onPress={() => this.props.videoPress(this.props.item.Id)}
                style={{
                    width: '90%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                <Image style={{width: "90%", height: "100%"}} resizeMode={'cover'} source={{uri: this.props.item.Img}}/>
                </TouchableOpacity>
            </View>


        )
    }


}
const styles = StyleSheet.create({

    buttonOver:{
        zIndex: 1,
        height: 45,
        position:'absolute',
        backgroundColor:'#b32a2f',
        height: 150,
        width: '100%',
        opacity: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overButton:{
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 10,
        fontSize: 20,
    }
});
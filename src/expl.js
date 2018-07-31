import firebase from "./firebase";

handleChangeText(text){
    this.setState({newItem: text})
}

handleClick(e) {
    console.log('clicked')
    let likeArray = [...this.state.likeArray, this.state.newItem];
    this.setState({likeArray, newItem:''});
}

logOut(e) {
    firebase.auth().signOut().then(function() {
        console.log('logout Succsec')
    }).catch(function(error) {
        // An error happened.

    });
}

handleListClick(i,e){
    let likeArray = [...this.state.likeArray.slice(0,i),...this.state.likeArray.slice(i+1)]
    this.setState({likeArray})
}


<View style={styles.container}>
    <Text>hello</Text>
    <TextInput type='text' onChangeText={this.handleChangeText.bind(this)} value={this.state.newItem}/>
    <Button title='Click' onPress={this.handleClick.bind(this)} />
    {this.state.likeArray.map((item, index) => <Text key={index}>{`${index}, ${item}`}</Text>)}
    <Button title='Log out' onPress={this.logOut.bind(this)} />
</View>

{/*<TouchableWithoutFeedback*/}
{/*onPress={()=>this.videoPress(item.Id)}*/}
{/*>*/}
{/*<Image style={{width:'90%',height:360, marginTop: 10 ,resizeMode:'contain'}} source={{uri: item.Img}}/>*/}
{/*</TouchableWithoutFeedback>*/}


<WebView
    style={ styles.WebViewContainer }
    javaScriptEnabled={true}
    domStorageEnabled={true}
    source={{uri: `https://www.youtube.com/embed/${this.state.currentVideoID}` }}
/>
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import firebase from './firebase'
import { Button } from 'react-native-elements';

export default class Login extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    componentDidMount() {
    };

    Login = () => {
        // let provider = new firebase.auth.GoogleAuthProvider();
        console.log('alo')

        // firebase.auth().signInWithPopup(provider).then( (result) => {
        //     console.log(result.user)
        // }).catch( (error) => {
        //     console.log(error)
        // })

    };



    render() {
        return (
            <View style={styles.container}>
                <Button
                    title='Log in'
                    titleStyle={styles.text}
                    buttonStyle={styles.buttons}
                    onPress={this.Login}
                />
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

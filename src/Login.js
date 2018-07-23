import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import firebase from './firebase'
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native'

const Form = t.form.Form;

const User = t.struct({
    email: t.String,
    password: t.String
})

const options = {
    fields: {
        password: {
            password: true,
            secureTextEntry: true
        }
    }
}

export default class Login extends React.Component {
    static navigationOptions = {
        title: 'Login',
        headerLeft: null,
    };

    componentDidMount() {
    };

    Login = () => {
        const value = this.regForm.getValue();
        console.log(value)
        firebase.auth().signInWithEmailAndPassword(value.email, value.password).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });


    };



    render() {
        const {navigate} = this.props.navigation

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // var displayName = user.displayName;
                // var email = user.email;
                // var emailVerified = user.emailVerified;
                // var photoURL = user.photoURL;
                // var isAnonymous = user.isAnonymous;
                // var uid = user.uid;
                // var providerData = user.providerData;
                console.log(user)
                navigate('Home',{
                    email: user.email,
                    uid: user.uid,
                });
            } else {
                // User is signed out.
                // ...
            }
        });

        return (
            <View style={styles.container}>
                <Form
                    type={User}
                    ref={c => this.regForm = c}
                    options={options}
                />
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

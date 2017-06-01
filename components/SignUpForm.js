import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button, Tile } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';
import Spinner from './Spinner';

const ROOT_URL = 'https://us-central1-one-time-password-a6e43.cloudfunctions.net';

class SignUpForm extends Component {
    state = { phone: '', code: '', loading: false, signUp: false, signIn: false };
    
    handleSignUpSubmit = async () => {
        this.setState({ loading: true });
        try {
            await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
            this.setState({ loading: false, signUp: true });
        } catch (err) {
            console.log(err);
            this.setState({ loading: false });
        }
    }

    handleSignInSubmit = async () => {
        this.setState({ loading: true });
        try {
            let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, { 
                phone: this.state.phone, code: this.state.code 
            });
            this.setState({ phone: '', code: '', loading: false });
            try {
                firebase.auth().signInWithCustomToken(data.token);

            } finally {
                this.setState({ signIn: true, signUp: false });
            }

        } catch (err) {
            console.log(err);
            this.setState({ loading: false });
        }
    }

    renderForm() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        if (this.state.signUp) {
            return (
                <View>
                    <View style={{ marginBottom: 10 }}>
                        <FormLabel>Enter Phone Number</FormLabel>
                        <FormInput 
                            value={this.state.phone}
                            onChangeText={phone => this.setState({ phone })}
                        />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <FormLabel>Code</FormLabel>
                        <FormInput 
                            value={this.state.code}
                            onChangeText={code => this.setState({ code })}
                        />
                    </View>
                    <Button onPress={this.handleSignInSubmit} title="Submit" />
                </View>
            );
        }

        if (this.state.signIn) {
            return (
                <Tile
                    imageSrc={{require: ('../assets/icons/app.png')}}
                    title="Sign In Successful"
                    contentContainerStyle={{height: 150}}
                    >
                    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                        <Button title="Sign Out" />
                    </View>
                </Tile>
            );
        }

        return (
            <View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Phone Number</FormLabel>
                    <FormInput 
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />
                </View>
                <Button onPress={this.handleSignUpSubmit} title="Submit" />
            </View>
        );
    }

    render() {
        return (
            <View style={{ width: '95%' }}>
                {this.renderForm()}
            </View>
        );
    }
}

export default SignUpForm;

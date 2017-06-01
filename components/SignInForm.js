import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Spinner from './Spinner';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-one-time-password-a6e43.cloudfunctions.net';

class SignInForm extends Component {
    state = { phone: '', code: '', loading: false };

    handleSubmit = async () => {
        this.setState({ loading: true });
        try {
            let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, { 
                phone: this.state.phone, code: this.state.code 
            });
            this.setState({ phone: '', code: '', loading: false });
            firebase.auth().signInWithCustomToken(data.token);

        } catch (err) {
            console.log(err);
            this.setState({ loading: false });
        }
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={this.handleSubmit} title="Submit" />
        );
    }

    render() {
        return (
            <View style={{ width: '95%' }}>
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
                {this.renderButton()}
            </View>
        );
    }
}

export default SignInForm;

import React from 'react'
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, Button, View, Image, Platform, Alert, AsyncStorage } from 'react-native'
import firebase from 'firebase'

import FormRow from "../components/FormRow"

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "fernando.posser@hotmail.com",
            password: "123456",
            isLoading: false,
            errorMessage: ""
        }
    }

    onChangeHandler(field, value) {
        this.setState({ [field]: value }) //computed property (data binding)
    }

    componentDidMount() {
        
        AsyncStorage.getItem("NotesTimeline::UserData")
        .then((userDataJson) => {
            let userData = JSON.parse(userDataJson)
            if (userData != null) {
                this.access(userData)
            }
        })

        if (!firebase.apps.length) {
            var firebaseConfig = {
                apiKey: "AIzaSyDGP-OAswM1fmB_FqT9yas2mt6886H7RWc",
                authDomain: "ppgca-notes-timeline.firebaseapp.com",
                databaseURL: "https://ppgca-notes-timeline.firebaseio.com",
                projectId: "ppgca-notes-timeline",
                storageBucket: "ppgca-notes-timeline.appspot.com",
                messagingSenderId: "87463867174",
                appId: "1:87463867174:web:5a599b7962b6a0e2fc07e7",
                measurementId: "G-E2NT2KFDV1"
            };
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            // firebase.analytics();
        }
    }

    access(userData) {
        this.setState({ isLoading: false })
        AsyncStorage.setItem('NotesTimeline::UserData', JSON.stringify(userData))
        this.props.navigation.replace("Pessoas")
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case "auth/wrong-password":
                return "Senha incorreta"
            case "auth/invalid-email":
                return "Email incorreto"
            case "auth/user-not-found":
                return "Usuário não encontrado"
            case "auth/user-disabled":
                return "usuário banido, fdp do caralho"
            case "auth/email-already-in-use":
                return "O email já está sendo utilizado"
            case "auth/operation-not-allowed":
                return "Operação não permitida"
            case "auth/weak-password":
                return "Senha muito fraca"
            default:
                "Agora deu merda "
        }
    }

    renderErrorMessage() {
        const { errorMessage } = this.state

        if (errorMessage) {
            Alert.alert(
                "Erro",
                errorMessage.toString(),
                [{
                    text: "ok",
                    onPress: () => { this.setState({ errorMessage: "" }) }
                }]
            )
        }
    }

    login() {
        console.log("logiiiiiiiiin")

        this.setState({ isLoading: true, errorMessage: "" })

        const { email, password } = this.state

        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                console.log("tudo certo")
                this.access(user)
            })
            .catch(error => {
                console.log("deu merda")

                this.setState({
                    errorMessage: this.getMessageByErrorCode(error.code),
                    isLoading: false
                })
            })
    }

    getRegister() {
        const { email, password } = this.state;

        if (!email || !password) {
            Alert.alert(
                "Cadstro",
                "Para cadastro informe email e senha."
            )
            return null
        }

        Alert.alert(
            "Cadastro",
            "Deseja cadastrar usuário com os dados informados?",
            [{
                text: "Cancelar",
                style: "cancel"
            }, {
                text: "Confirmar",
                style: "default",
                onPress: () => { this.register(email, password) }
            }],
        )
    }

    register(email, password) {
        return firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log("a princípio deu")
            this.access(user);
        })
        .catch(error => {
            console.log("erro:" + error)
            this.setState({
                message: this.getMessageByErrorCode(error.code),
                isLoading: false
            })
        })
    }

    renderButton() {
        if (this.state.isLoading) {
            return <ActivityIndicator size="large" style={styles.loading} />
        }

        return (
            <View>
                <View style={styles.btn}>
                    <Button
                        title="Entrar"
                        color="#ff914d"
                        onPress={() => this.login()} />
                </View>
                <View style={styles.btn}>
                    <Button
                        title="Registrar-se"
                        color="#ff914d"
                        onPress={() => this.getRegister()} />
                </View>
            </View>
        )
    }

    render() {
        return (
            // <KeyboardAvoidingView
            //     behavior={Platform.OS == "ios" ? "padding" : "height"}
            //     style={{ flex: 1 }} >
            <ScrollView style={styles.container}>
                <View style={styles.logoView}>
                    <Image
                        source={require("../img/logo.jpg")}
                        style={styles.logo}
                    />
                </View>
                <FormRow>
                    <TextInput
                        style={styles.input}
                        placeholder="user@email.com"
                        keyboardType="email-address"
                        value={this.state.email}
                        onChangeText={value => this.onChangeHandler("email", value)} />
                </FormRow>
                <FormRow>
                    <TextInput
                        style={styles.input}
                        placeholder="password"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler("password", value)} />
                </FormRow>
                {this.renderButton()}
                {this.renderErrorMessage()}
            </ScrollView>
            // </ KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5
    },
    container: {
        paddingRight: 10,
        paddingLeft: 10,
        // paddingTop: 100
    },
    btn: {
        paddingTop: 20,
        fontSize: 10,
        borderRadius: 10
    },
    logo: {
        // aspectRatio: 1,
        resizeMode: "center",
        width: 400,
        height: 400
    },
    logoView: {
        justifyContent: "center",
        alignItems: "center"
    },
    loading: {
        padding: 20
    }
})

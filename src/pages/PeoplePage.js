import React from 'react';
import { Text, ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';

import * as firebase from "firebase"
import "firebase/firestore"

import { FloatingAction } from "react-native-floating-action"

import PeopleList from "../components/PeopleList";


export default class PeoplePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            people: []
        };
    }

    componentDidMount() {
        var db = firebase.database()
        db.ref("/usr/people").on("value", querySnapShot => {
            let data = []
            querySnapShot.forEach((child) => {
                data.push({
                    id: child.val().id,
                    nome: child.val().desc,
                })
            })
            this.setState({
                people: data,
            });
        })
    }

    addPerson() {
        var db = firebase.database()
        db.ref('/usr/people').push({ desc: "yasmin", id: 2 })
            .then(() => { console.log("Inserido com sucesso") })
            .catch(() => { console.log("deu merda ao inserir alguém") })
    }

    render() {

        const actions = [
            {
                text: "Nova pessoa",
                icon: require("../img/icons/add_user.png"),
                name: "btnNovaPessoa",
                position: 2
            }
        ]

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.view}>
                        <Text style={styles.title}>
                            People Page
                        </Text>
                        <PeopleList people={this.state.people} />
                    </View>
                </ScrollView >
                <FloatingAction
                    actions={actions}
                    onPressItem={ name => {
                        console.log(`botão ${name}`)
                        this.addPerson()
                    }}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#ff914d',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: "white",
        fontSize: 36,
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    }
});

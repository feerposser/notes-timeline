import React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';

import people from '../../people.json';
import PeopleList from "../components/PeopleList";

export default class PeoplePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            people: []
        };
    }

    componentDidMount() {
        this.setState({
            people: people,
        });
    }

    render() {
        return (

            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        People Page
                </Text>
                    <PeopleList people={this.state.people} />
                </View>
            </ScrollView >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff914d',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: "white",
        fontSize: 36,
    },
});

//componente people list
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PeopleList = props => {

    const { people } = props;
    const retorno = people.map(person => {
        const { id, nome } = person;
        return (
            <View style={styles.container} key={id}>
                <Text style={[styles.default, styles.id]}>{id}</Text>
                <Text style={[styles.default, styles.nome]}>{nome}</Text>
            </View>
        );
    });

    return (
        <View>
            {retorno}
        </View>
    );
}

const styles = StyleSheet.create({
    default: {
        padding: 20,
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: "white",
        borderStyle: "solid",
        color: "white"
    },
    container: {
        flex: 1,
        flexDirection: "row"
    },
    id: {
        flex: 0.1,
        textAlign: "center"
    },
    nome: {
        color: 'white',
        fontSize: 20,
        flex: 0.9
    },
});

export default PeopleList;
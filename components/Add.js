import { useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, View } from 'react-native';

export default function Add({items, setItems}){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

const save = () => {
    const newPerson = {
        id: items.length + 1,
        lastName: lastName,
        firstName: firstName,
    }
    const tempItems = [...items,newPerson]
    setItems(tempItems)
    setFirstName('')
    setLastName('')
} 

    return (
        <SafeAreaView style={styles.Container}>
            <Search executeSearch={executeSearch} />
            <Add items={items} setItems={setItems} />
        <View style={styles.container}>
            <Textinput
                value={firstName}
                onChangeText={text => setFirstName(text)}
                placeholder='firstName...'
            />
            <Textinput
                value={lastName}
                onChangeText={text => setLastName(text)}
                placeholder='lastName...'
            />
            <Button title='Save' onPress={save}/>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
});
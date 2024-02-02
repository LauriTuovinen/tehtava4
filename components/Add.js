import { useState } from "react";
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function Add({items, setItems,storeData}){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

const save = () => {
    const newPerson = {
        id: items.length + 1,
        lastName: lastName,
        firstName: firstName,
    }
    const tempItems = [...items,newPerson]
    storeData(tempItems)
    setItems(tempItems)
    setFirstName('')
    setLastName('')
} 

    return (
        <View style={styles.container}>
            <TextInput
                value={firstName}
                onChangeText={text => setFirstName(text)}
                placeholder='firstName...'
            />
            <TextInput
                value={lastName}
                onChangeText={text => setLastName(text)}
                placeholder='lastName...'
            />
            <Button title='Save' onPress={save}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 16
    },
});
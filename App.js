import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet, Text, View, image } from 'react-native';
import {DATA} from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';


const STORAGE_KEY = '@persons_key'

const getData = async() => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY)
    const json = JSON.parse(value)
    if (json === NULL) {
      json = []
    }
    console.log(json)
    setItems(json)
  } catch (ex) {
    console.log(ex)
  }
}

useEffect(() => {
  //AsyncStorage.clear()
  setItems(DATA);
  //getData()
}, [])

const storeData = async(value) => {
  try{
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
  } catch (ex) {
    console.log(ex)
  }
}

export default function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const testArray = Array();
    for (let i=0; i<=30; i++){
      testArray.push({id: i,name: 'Test ' + i, image: 'https://reactnative.dev/img/tiny_logo.png'});
    }
    setPersons(testArray);
  },[])

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          persons.map((item) => (
            <View style={styles.rowContainer} key={item.id}>
              <Image 
              source={{
              uri: item.image,
              width: 32,
              height: 32,
              }}
            />
            <Text style={styles.rowText}>{item.name}</Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.StatusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    borderColor: '#CCC',
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  image: {
    marginRight: 16
  },
  rowText: {
    fontSize: 16,
    marginLeft: 5,
    padding: 1
  },
});

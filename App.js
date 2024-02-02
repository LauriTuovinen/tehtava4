import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import {DATA} from './Data';
import Row from './components/Row'
import Add from './components/Add';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import Search from './components/Search';


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


 const storeData = async(value) => {
   try{
     const jsonValue = JSON.stringify(value)
     await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
   } catch (ex) {
     console.log(ex)
   }
 }

// function renderItem({item}){
//   return (<Text>{item.lastname}</Text>);
// }



export default function App() {
  const renderItem = ({item}) => (
  <Text>{item.lastname}</Text>
)
  const [persons, setPersons] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    //setItems(DATA);
    //AsyncStorage.clear()
    getData()
  }, [])

  useEffect(() => {
    const testArray = Array();
    for (let i=0; i<=30; i++){
      testArray.push({id: i,name: 'Test ' + i, image: 'https://reactnative.dev/img/tiny_logo.png'});
    }
    setPersons(testArray);
  },[])

  const executeSearch = (search) => {
    const searchArray = DATA.filter((item) => item.lastname.startsWith(search));
    setItems(searchArray);
  }

  const select = (id) => {
    setSelectedId(id);
  }

  return (
    <View style = {styles.rowContainer}>
      <ScrollView style={styles.rowContainer}>
        <Search executeSearch={executeSearch}/>
        <Add items={items} setItems={setItems} />
        <FlatList
          data = {items}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          renderItem = {({item}) => (
            <Row person={item} selectedId={selectedId} select = {select}/>
          )}
        ></FlatList>
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
    margin: 16,
    borderColor: '#CCC',
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 8
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

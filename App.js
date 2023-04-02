import app from './firebaseConfig'
import {collection, getDocs, getFirestore} from 'firebase/firestore'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View,SafeAreaView,ScrollView} from 'react-native';
import {Button, Card,Text,Appbar} from 'react-native-paper';
import AddPopup from './AddPopup';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const db = getFirestore(app);
  const getData=async()=>{
    let d=[];
    let snapshot = await getDocs(collection(db,'quizes'));
    snapshot.forEach(doc=>{
      d.push(doc.data());
    });
    setQuizes(d);
  }

  useEffect(()=>{
    getData();
  },[]);

  return (
    <NavigationContainer>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
  },
  buttonContainer:{
    padding:'3%',
    justifyContent:'space-evenly',
    paddingTop:'15%',
    flexDirection:'row',
    width:'100%',
  },
  cardContainer:{
    width:'90%',
  },
});


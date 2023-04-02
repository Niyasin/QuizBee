import { useEffect, useState } from 'react';
import app from './firebaseConfig'
import {collection, getDocs, getFirestore} from 'firebase/firestore'
import { StyleSheet, View,SafeAreaView,ScrollView} from 'react-native';
import {Button, Card,Text} from 'react-native-paper';

const Home =({navigation})=>{
    const [quizes,setQuizes] = useState([]);
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

    return(
      <SafeAreaView style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button icon="plus" primary="true" mode='contained' buttonColor='#6096B4' style={{flex:1,marginHorizontal:10}} onPress={()=>{navigation.navigate('Create')}}>New</Button>
            <Button icon="account" primary="true" mode='contained' buttonColor='#6096B4' style={{flex:1,marginHorizontal:10}}>My Quizes</Button>
          </View>
          <Text variant="headlineLarge" style={{fontWeight:'bold',alignSelf:'flex-start',margin:'5%'}}>Popular</Text>
          <ScrollView style={styles.cardContainer}>
            {quizes.map((e,i)=>{
              return(
                <Card key={i}>
                  <Card.Content>
                    <Text variant="displaySmall" style={{fontWeight:'bold'}}>{e.name}</Text>
                    <Text variant="bodyMedium">{e.desc}</Text>
                    <Text variant="bodyLarge" style={{color:'#6096B4',fontWeight:'bold'}}>Time : {e.time} min</Text>
                  </Card.Content>
                </Card>
              )
            })}
          </ScrollView>  
      </SafeAreaView>
    )
  }

  export default Home;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center',
    },
    buttonContainer:{
      padding:'3%',
      justifyContent:'space-evenly',
      flexDirection:'row',
      width:'100%',
    },
    cardContainer:{
      width:'90%',
    },
  });
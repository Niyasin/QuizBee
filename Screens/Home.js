import { useContext } from 'react';
import { StyleSheet, View,SafeAreaView,ScrollView,ImageBackground} from 'react-native';
import {Button, Card,Chip,Text} from 'react-native-paper';
import { createContext, useEffect, useState } from 'react';
import app from '../firebaseConfig'
import {collection, getDocs, getFirestore} from 'firebase/firestore'

const Home =({navigation})=>{
    const [quizes,setQuizes] = useState([]);
    const db = getFirestore(app);

    const getData=async()=>{
      let d=[];
      let snapshot = await getDocs(collection(db,'quizes'));
      snapshot.forEach(doc=>{
        d.push({...doc.data(),id:doc.id});
      });
      setQuizes(d);
    }
    useEffect(()=>{
      navigation.addListener('focus',()=>{
        getData();
      })
    },[navigation]);

    return(
      <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.background} source={require('../assets/bg.jpg')}>

          <Text style={{alignSelf:'flex-start',margin:'5%',fontFamily:'Poppins-bold',fontSize:35}}>Quizzes</Text>
          <View style={styles.buttonContainer}>
            <Button icon="plus" primary="true" mode='contained-tonal'  style={{flex:1,borderRadius:10}} onPress={()=>{navigation.navigate('Create')}}>New</Button>
            <Button icon="account" primary="true" mode='contained-tonal'  style={{flex:1,borderRadius:10}} onPress={()=>{navigation.navigate('Profile',{data:quizes})}}>My Quizes</Button>
          </View>
          <ScrollView style={styles.cardContainer} showsVerticalScrollIndicator={false} overScrollMode="always">
            {quizes.map((e,i)=>{
              return(
                <Card key={i} style={{marginBottom:15}} onPress={()=>{
                  navigation.navigate('Quiz',{quiz:e})
                }} mode='outlined'>
                  <Card.Content>
                    <Text style={{fontFamily:'Poppins-bold',fontSize:30}}>{e.name}</Text>
                    <Text variant="bodyMedium" style={{fontFamily:'Poppins-regular'}}>{e.desc}</Text>
                    <View style={{display:'flex',flexDirection:'row',gap:10,marginTop:10}}>
                      <Chip icon='clock'>{e.time} min</Chip>
                      <Chip icon='menu'>{e.questions.length} questions</Chip>
                    </View>
                  </Card.Content>
                </Card>
              )
            })} 
          </ScrollView>  
        </ImageBackground>
      </SafeAreaView>
    )
  }

  export default Home;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:30,
      backgroundColor: '#fff',
      alignItems:'center',
    },
    background:{
      width:'100%',
      height:'100%',
      resizeMode:'cover',
      flex:1,
      alignItems:'center',
    },
    buttonContainer:{
      display:'flex',
      justifyContent:'space-around',
      flexDirection:'row',
      width:'90%',
      gap:10,
    },
    cardContainer:{
      margin:'5%'
    },
  });
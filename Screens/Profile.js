import { useEffect, useState } from "react";
import { SafeAreaView,View,StyleSheet,ImageBackground, ScrollView} from "react-native";
import {Card,Button,Text, Chip, IconButton} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile({navigation,route}){
    
    
    
    const {data}=route.params;
    const [quizes,setQuizes]= useState([]);
    const [mydata,setMyData]= useState([]);
    useEffect(()=>{
        getData();
    },[])


    useEffect(()=>{
        if(mydata){
            let d =[];
            data.forEach((e,i)=>{
                if(mydata.includes(e.id)){
                    d.push(e);
                }
            });
            setQuizes(d);
        }
    },[mydata])
    

      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@quizes');
          if(value !== null) {
              setMyData(JSON.parse(value));
          }
        }catch(e){}
      }
    return(
        <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.background} source={require('../assets/bg2.jpg')}>
          <ScrollView style={{padding:'5%'}} showsVerticalScrollIndicator={false}>
            {quizes.map((e,i)=>{
              return(
                <Card key={i} style={{marginBottom:15}} mode="outlined" >
                  <Card.Content>
                    <View style={{display:'flex',flexDirection:'row',gap:10,justifyContent:'space-between',alignItems:'center'}}>
                        <Text variant="displaySmall" style={{fontWeight:'bold'}}>{e.name}</Text>
                        <IconButton icon='pencil' mode="contained" onPress={()=>{navigation.navigate('Edit',{quiz:e})}}/>
                    </View>
                    <Text variant="bodyMedium">{e.desc}</Text>
                    <View style={{display:'flex',flexDirection:'row',gap:10,marginTop:20}}>
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



const styles = StyleSheet.create({
  container: {
      flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
  },
  background:{
      width:'100%',
      height:'100%',
      resizeMode:'repeat',
      flex:1,
    },
});
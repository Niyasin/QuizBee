import { useEffect, useState } from "react";
import { SafeAreaView,View,StyleSheet} from "react-native";
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
            {quizes.map((e,i)=>{
              return(
                <Card key={i} style={{marginBottom:15}}>
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
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        WalignItems:'center',
        padding:'5%',
    },
  });
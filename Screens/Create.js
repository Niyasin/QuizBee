import { useRef, useState,useEffect } from "react";
import { View,StyleSheet,SafeAreaView,ScrollView,ImageBackground} from "react-native";
import {Button, Card,Text,TextInput,RadioButton,} from 'react-native-paper';
import {collection,getFirestore,addDoc} from 'firebase/firestore'
import app from '../firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Create({navigation}){
    const [title,setTitle]=useState('');
    const [desc,setDesc]=useState('');
    const [time,setTime]=useState(null);
    const [questions,setQuestions]=useState([]);
    const scrollView = useRef(null);

    const db = getFirestore(app);
    useEffect(()=>{
        navigation.setOptions({
            headerRight:()=>{
                return(
                    <Button mode="contained-tonal" icon='content-save' style={{borderRadius:10}} onPress={()=>{send({
                        name:title,
                        desc,
                        time,
                        questions,
                    })}}>Save</Button>
                )
            }
        })
    },[navigation,desc,time,questions,title])

    const addLocal = async(value) => {
        try {
            let d = await getLocal();
            await AsyncStorage.setItem('@quizes',JSON.stringify([...d,value]))
        }catch(e){}
    }

    const getLocal = async()=>{
        try{
          const value = await AsyncStorage.getItem('@quizes')
          if(value !== null) {
            console.log(value);
            return(JSON.parse(value));
          }else{
            return([]);
          }
        }catch(e) {
            return([]);
        }
    }

    async function send(data){
        if(data.name.length && data.time && data.questions.length){
            try{
               let doc= await addDoc(collection(db,'quizes'),data);
                addLocal(doc.id);
            }catch(e){
            }
            navigation.navigate('Home');
        }
    }
    
    return(
        <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.background} source={require('../assets/bg2.jpg')}>
            <ScrollView style={{paddingHorizontal:'5%'}} ref={scrollView} onContentSizeChange={()=>{scrollView.current.scrollToEnd({animated:true})}} showsVerticalScrollIndicator={false}>
                <TextInput mode="outlined" label="Title" onChangeText={t=>{setTitle(t)}}style={{marginTop:20}} />
                <TextInput mode="outlined" label="Total Time" keyboardType="numeric" onChangeText={t=>{setTime(t)}}/>
                <TextInput mode="outlined" label="Description" numberOfLines={10} multiline={true} onChangeText={t=>{setDesc(t)}}/>
                <Text variant="headlineLarge" style={{paddingVertical:10,fontWeight:'bold'}}>Questions</Text>
                {questions.map((e,i)=>{
                    return(
                    <Card mode="outlined" style={{marginVertical:10}} key={i}>
                        <Card.Title title={'Q'+(i+1)}/>
                        <Card.Content>
                            <TextInput mode="outlined" label="Question" onChangeText={t=>{
                                let q=[...questions];
                                q[i].name=t;
                                setQuestions(q)}
                            }/>
                        
                            <Text variant="headlineSmall" style={{paddingVertical:10,fontWeight:'bold'}}>Options</Text>
                            <RadioButton.Group value={questions[i].ans} onValueChange={v=>{
                                let q=[...questions];
                                q[i].ans=v;
                                setQuestions(q)
                            }}>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value={0}/>
                                    <TextInput style={{width:'88%'}} mode="outlined" label="A" onChangeText={t=>{
                                        let q=[...questions];
                                        q[i].opt[0]=t;
                                        setQuestions(q)}
                                        }/>
                                </View>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value={1}/>
                                    <TextInput style={{width:'88%'}} mode="outlined" label="B" onChangeText={t=>{
                                        let q=[...questions];
                                        q[i].opt[1]=t;
                                        setQuestions(q)}
                                        }/>
                                </View>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value={2}/>
                                    <TextInput style={{width:'88%'}} mode="outlined" label="C" onChangeText={t=>{
                                        let q=[...questions];
                                        q[i].opt[1]=t;
                                        setQuestions(q)}
                                    }/>
                                </View>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value={3}/>
                                    <TextInput style={{width:'88%'}} mode="outlined" label="D" onChangeText={t=>{
                                        let q=[...questions];
                                        q[i].opt[2]=t;
                                        setQuestions(q)}
                                    }/>
                                </View>
                            </RadioButton.Group>

                                <Button mode="contained-tonal" icon='delete' style={{marginVertical:10}} onPress={()=>{
                                    let q=[...questions].filter((e,k)=>{
                                        if(k!=i){return(true)}
                                    });
                                    setQuestions(q)
                                }}>Delete</Button>
                        </Card.Content>
                    </Card>)
                })}
                <Button icon='plus' onPress={()=>{
                    setQuestions([...questions,{
                        q:'',
                        opt:['','','',''],
                        ans:3,
                    }])
                }} style={{marginBottom:20}}>Add Question</Button>

                
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
import { View,StyleSheet,SafeAreaView,ScrollView} from "react-native";
import {Button, Card,Text,TextInput,RadioButton,} from 'react-native-paper';
import { useRef, useState } from "react";
import app from '../firebaseConfig'
import {doc,updateDoc,getFirestore,deleteDoc } from 'firebase/firestore'
export default function Edit({navigation,route}){
    const {quiz}=route.params;
    const [title,setTitle]=useState(quiz.name);
    const [desc,setDesc]=useState(quiz.desc);
    const [time,setTime]=useState(quiz.time);
    const [questions,setQuestions]=useState(quiz.questions);
    const db=getFirestore(app);

    const remove =async()=>{
        try{
            await deleteDoc(doc(db,'quizes',quiz.id));
            await deleteLocal();
            console.log(await getLocal());
            navigation.navigate('Home');
        }catch(e){}
    }
    const send =async()=>{
        if(title.length && time && questions.length){
            try{
               let ref= doc(db,'quizes',quiz.id);
               await updateDoc(ref,{
                name:title,
                desc,
                time,
                questions,
            })
                navigation.navigate('Home');
              }catch(e){}
        }
    }
    const deleteLocal = async() => {
        try {
            let d = await getLocal();
            let n= d.filter(p=>p==quiz.id?false:true);
            await AsyncStorage.setItem('@quizes',JSON.stringify(n))
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
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TextInput mode="outlined" label="Title" onChangeText={t=>{setTitle(t)}} value={quiz.name}/>
                <TextInput mode="outlined" label="Total Time" keyboardType="numeric" onChangeText={t=>{setTime(t)}} value={quiz.time}/>
                <TextInput mode="outlined" label="Description" numberOfLines={10} multiline={true} onChangeText={t=>{setDesc(t)}} value={quiz.desc}/>
                <Button mode="contained" style={{marginVertical:20}} onPress={()=>{remove()}}>Delete Quiz</Button>
                <Text variant="headlineLarge" style={{paddingVertical:10,fontWeight:'bold'}}>Questions</Text>
                {questions.map((e,i)=>{
                    return(

                        <Card mode="outlined" style={{marginVertical:10}} key={i}>
                        <Card.Title title={'Q'+(i+1)}/>
                        <Card.Content>
                            <TextInput mode="outlined" label="Question" value={e.name} onChangeText={t=>{
                                let q=[...questions];
                                q[i].name=t;
                                setQuestions(q)}
                            }/>
                            <Text variant="headlineSmall" style={{paddingVertical:10,fontWeight:'bold'}}>Options</Text>
                            <RadioButton.Group value={e.ans} onValueChange={v=>{
                                let q=[...questions];
                                q[i].ans=v;
                                setQuestions(q)
                            }}>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value={0}/>
                                    <TextInput style={{width:'88%'}} mode="outlined" label="A" value={e.opt[0]} onChangeText={t=>{
                                        let q=[...questions];
                                        q[i].opt[0]=t;
                                        setQuestions(q)}
                                        }/>
                                </View>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value={1}/>
                                    <TextInput style={{width:'88%'}} mode="outlined" label="B" value={e.opt[1]} onChangeText={t=>{
                                        let q=[...questions];
                                        q[i].opt[1]=t;
                                        setQuestions(q)}
                                        }/>
                                </View>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value={2}/>
                                    <TextInput style={{width:'88%'}} mode="outlined" label="C" value={e.opt[3]} onChangeText={t=>{
                                        let q=[...questions];
                                        q[i].opt[1]=t;
                                        setQuestions(q)}
                                        }/>
                                </View>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value={3}/>
                                    <TextInput style={{width:'88%'}} mode="outlined" label="D" value={e.opt[3]} onChangeText={t=>{
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
                    </Card>
                    )
                })}
                <Button mode="contained-tonal" icon='plus' onPress={()=>{
                    setQuestions([...questions,{
                        q:'',
                        opt:['','','',''],
                        ans:3,
                    }])
                }}>Add Question</Button>
                <Button mode="contained" style={{marginVertical:20}} onPress={()=>{send()}}>Update</Button>
            </ScrollView>
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
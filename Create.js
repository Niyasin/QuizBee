import { useRef, useState } from "react";
import { View,StyleSheet,SafeAreaView,ScrollView} from "react-native";
import {Button, Card,Text,TextInput,RadioButton,} from 'react-native-paper';

export default function Create({close}){
    const [title,setTitle]=useState('');
    const [desc,setDesc]=useState('');
    const [time,setTime]=useState('');
    const [questions,setQuestions]=useState([]);
    const scrollView = useRef(null)
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView ref={scrollView} onContentSizeChange={()=>{scrollView.current.scrollToEnd({animated:true})}}>
                <TextInput mode="outlined" label="Title" onChange={t=>{setTitle(t)}}/>
                <TextInput mode="outlined" label="Total Time" keyboardType="numeric" onChange={t=>{setTime(t)}}/>
                <TextInput mode="outlined" label="Description" numberOfLines={10} multiline={true} onChange={t=>{setDesc(t)}}/>
                <Text variant="headlineLarge" style={{paddingVertical:10,fontWeight:'bold'}}>Questions</Text>
                {questions.map((e,i)=>{
                    return(
                    <Card mode="outlined" style={{marginVertical:10}}>
                        <Card.Title title={'Q'+(i+1)}/>
                        <Card.Content>
                            <TextInput mode="outlined" label="Question" onChange={t=>{
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
                                    <TextInput style={{width:'88%'}} mode="outlined" label="A" onChange={t=>{
                                        let q=[...questions];
                                        q[i].opt[0]=t;
                                        setQuestions(q)}
                                        }/>
                                </View>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value={1}/>
                                    <TextInput style={{width:'88%'}} mode="outlined" label="B" onChange={t=>{
                                        let q=[...questions];
                                        q[i].opt[1]=t;
                                        setQuestions(q)}
                                        }/>
                                </View>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value={2}/>
                                    <TextInput style={{width:'88%'}} mode="outlined" label="C" onChange={t=>{
                                        let q=[...questions];
                                        q[i].opt[1]=t;
                                        setQuestions(q)}
                                        }/>
                                </View>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value={3}/>
                                    <TextInput style={{width:'88%'}} mode="outlined" label="D" onChange={t=>{
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
                <Button mode="contained-tonal" icon='plus' onPress={()=>{
                    setQuestions([...questions,{
                        q:'',
                        opt:['','','',''],
                        ans:3,
                    }])
                }}>Add Question</Button>

                <Button mode="contained" style={{marginVertical:20}} onPress={()=>{}}>Submit</Button>
                
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
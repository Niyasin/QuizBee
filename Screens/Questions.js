import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View,SafeAreaView,ScrollView,Image} from 'react-native';
import {Button, Card,Chip,RadioButton,Text} from 'react-native-paper';
export default function QS({quiz,close}){
    const [current,setCurrent]=useState(0);
    const [score,setScore]=useState(0);
    const [visible,setVisibel]=useState(false);
    const [final,setFinal]=useState(false)
    const [time,setTime]=useState(quiz.time*60);
    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(t=>t-1);
            if(time<0){
                clearInterval(timer);
            }
        },1000);
        return ()=>{clearInterval(timer)}
    },[])
    
    const formatTime=(t)=>{
        let mins=parseInt(time/60);
        let sec =time-(mins*60)
        return(`${mins.toLocaleString('en-US',{minimumIntegerDigits:2})}:${sec.toLocaleString('en-US',{minimumIntegerDigits:2})}`);
    }

    const ans=(opt,q,i)=>{
        setVisibel(true);
        if(opt==q.ans){
            setScore(s=>s+10);
        }
        setTimeout(()=>{
            setVisibel(false);
            if(i==quiz.questions.length-1){
                setFinal(true);
            }else{
                setCurrent(c=>c+1)
            }
        },1000);
    }

    return (
        <SafeAreaView style={styles.container}>
            {final?<View style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Image source={require('../assets/final.gif')} style={{width:200,height:200}}/>
                <Text variant='displayMedium' style={{fontWeight:'bold'}}>Score : {score}</Text>
                <Button icon='home'style={{margin:50}} mode='contained' onPress={()=>{close()}}>Back</Button>
            </View>:<>
            <View style={styles.header}>
                <Text variant='headlineMedium' style={{fontWeight:'bold'}}>Question {current}</Text>
                <View style={{display:'flex',flexDirection:'row',gap:10}}>
                    <Chip>{formatTime(time)}</Chip>
                    <Chip onPress={close}>Exit</Chip>
                </View>
            </View>
            <Card>
                <Card.Content>
                    <Text variant='headlineMedium'>{quiz.questions[current].name}</Text>
                </Card.Content>
            </Card>
                <View style={{display:'flex',flexDirection:'column',gap:10,marginTop:20}}>
                    {quiz.questions[current].opt.map((e,i)=>{
                        return(
                            <Button
                             key={i}
                             mode='outlined'
                             onPress={()=>{ans(i,quiz.questions[current],current)}}
                             style={{
                                 backgroundColor:visible?(quiz.questions[current].ans==i?'#74c76188':'#cc3f3f88'):'#fff'}}
                                 >{e}</Button>
                                 )
                                })}
                </View>
                </>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:0,
        left:0,
        zIndex:100,
        width:'100%',
        height:'100%',
        backgroundColor: '#fff',
        WalignItems:'center',
        padding:'5%',
        paddingTop:'10%',
    },
    header:{
        height:50,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
    }
  });
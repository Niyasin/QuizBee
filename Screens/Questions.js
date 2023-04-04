import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View,SafeAreaView,ScrollView,Image, ImageBackground} from 'react-native';
import {Button, Card,Chip,RadioButton,Text} from 'react-native-paper';
export default function QS({quiz,close}){
    const [current,setCurrent]=useState(0);
    const [score,setScore]=useState(0);
    const [visible,setVisibel]=useState(false);
    const [final,setFinal]=useState(false)
    const [time,setTime]=useState(quiz.time*60);
    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(t=>t>1?t-1:setFinal(true));
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
            <ImageBackground source={require('../assets/bg.jpg')} style={styles.background}>
                <View style={{padding:'5%',paddingTop:40}}>

            {final?<View style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Image source={require('../assets/final.gif')} style={{width:300,height:300}}/>
                <Text variant='displayMedium' style={{fontFamily:'Poppins-bold'}}>Score : {score}</Text>
                <Button icon='home'style={{margin:50,borderRadius:10}} mode='contained-tonal' onPress={()=>{close()}}>Back</Button>
            </View>:<>
            
            <View style={styles.header}>
                <Text variant='headlineMedium' style={{fontWeight:'bold'}}>Question {current}</Text>
                <View style={{display:'flex',flexDirection:'row',gap:10}}>
                    <Chip icon='clock'>{formatTime(time)}</Chip>
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
                                 borderColor:visible?(quiz.questions[current].ans==i?'#74c76188':'#cc3f3f88'):'#eee',
                                 borderWidth:2,
                                 borderRadius:10,
                                }}
                                >{e}</Button>
                                )
                            })}
                                <Button mode='contained' style={{marginTop:20,borderRadius:10}} onPress={()=>{ans(-1,quiz.questions[current],current)}}>Skip</Button>
                </View>
                </>}
        </View>
        </ImageBackground>
        </SafeAreaView>
    )
}

  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position:'absolute',
        alignItems:'center',
        top:0,
        width:'100%',
        height:'100%',
        left:0, 
        zIndex:100,
    },
    header:{
        height:50,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20
    },
    background:{
        width:'100%',
        height:'100%',
        resizeMode:'repeat',
        flex:1,
      },
  });
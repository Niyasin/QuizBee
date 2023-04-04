import { useEffect,} from 'react';
import { StyleSheet, View,SafeAreaView,ImageBackground} from 'react-native';
import {Button,Chip,Text,} from 'react-native-paper';

export default function Quiz({navigation,route}){
    const {quiz,start}=route.params;
    useEffect(()=>{
        navigation.setOptions({
            headerTitle:quiz.name,
        })
    },[navigation])
    return(
        <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.background} source={require('../assets/bg2.jpg')}>
            <View style={{padding:'5%'}}>

            <Text variant='displayMedium' style={{fontFamily:'Poppins-bold'}}>{quiz.name}</Text>
            <Text variant='bodyLarge' style={{fontFamily:'Poppins-regular',marginVertical:10}}>{quiz.desc}</Text>
                <View style={{display:'flex',flexDirection:'row',gap:10,marginVertical:10}}>
                    <Chip style={{width:'40%',marginVertical:5}} icon='clock'>Total Time : {quiz.time} min</Chip>
                    <Chip style={{width:'40%',marginVertical:5}} icon='menu'>{quiz.questions.length} Questions</Chip>
                </View>
    
            <Button icon='play' mode='outlined'  style={{marginVertical:10}} onPress={()=>{start(quiz);navigation.navigate('Home')}}>Start</Button>
            </View>
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
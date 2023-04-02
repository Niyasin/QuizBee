import { useEffect } from 'react';
import { StyleSheet, View,SafeAreaView,ScrollView} from 'react-native';
import {Button,Chip, Card,Text} from 'react-native-paper';

export default function Quiz({navigation,route}){
    const {quiz}=route.params;
    useEffect(()=>{
        navigation.setOptions({
            headerTitle:quiz.name,
            headerLeft:()=>{},
        })
    },[navigation])
    return(
        <SafeAreaView style={styles.container}>
            <Text variant='displayMedium' style={{fontWeight:'bold'}}>{quiz.name}</Text>
            <Text variant='bodyMedium'>{quiz.desc}</Text>
                <View style={{display:'flex',flexDirection:'row',gap:10,marginVertical:10}}>
                    <Chip style={{width:'40%',marginVertical:5}} icon='clock'>Total Time : {quiz.time} min</Chip>
                    <Chip style={{width:'40%',marginVertical:5}} icon='menu'>Multiple Choise</Chip>
                </View>
            <Button mode='contained'buttonColor='#0088dd' style={{marginVertical:10}}>Start</Button>

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
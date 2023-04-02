import { View,StyleSheet,SafeAreaView} from "react-native";
import {Button, Card,Text,Appbar} from 'react-native-paper';

export default function Create({close}){
    return(
        <SafeAreaView style={styles.container}>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:0,
        left:0,
        height:'100%',
        width:'100%',
        backgroundColor: '#fff',
        WalignItems:'center',
        zIndex:10,
        paddingTop:'15%',
    },
  });
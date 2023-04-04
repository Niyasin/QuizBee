import Create from './Screens/Create';
import Home from './Screens/Home';
import {NavigationContainer,} from '@react-navigation/native';
import {createNativeStackNavigator,} from '@react-navigation/native-stack';
import Quiz from './Screens/Quiz';
import Questions from './Screens/Questions';
import { useEffect, useState } from 'react';
import Profile from './Screens/Profile';
import Edit from './Screens/Edit';
import * as Font from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
  const [quiz,setQuiz]=useState(null);
  
  useEffect(()=>{
    loadFonts();
  },[])
  
  async function loadFonts() {
    await Font.loadAsync({
      'Poppins-regular': require('./assets/Poppins-Regular.ttf'),
      'Poppins-bold': require('./assets/Poppins-SemiBold.ttf'),
    });
  }

  return (<>
  {quiz?<Questions quiz={quiz} close={()=>{setQuiz(null)}}/>:<></>}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
          <Stack.Screen name='Create' component={Create} />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='Edit' component={Edit} />
          <Stack.Screen name='Quiz' component={Quiz} initialParams={{start:setQuiz}}/>
        </Stack.Navigator>
      </NavigationContainer>
  </>
  );
}





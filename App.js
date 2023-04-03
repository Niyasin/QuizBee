import Create from './Screens/Create';
import Home from './Screens/Home';
import {NavigationContainer,} from '@react-navigation/native';
import {createNativeStackNavigator,} from '@react-navigation/native-stack';
import Quiz from './Screens/Quiz';
import Questions from './Screens/Questions';
import { useEffect, useState } from 'react';
import app from './firebaseConfig'
import  {AsyncStorage} from 'react-native';
import Profile from './Screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  const [quiz,setQuiz]=useState(null);
  useEffect(()=>{
  },[])
  
  return (<>
  {quiz?<Questions quiz={quiz} close={()=>{setQuiz(null)}}/>:<></>}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} options={{title:'QuizBee'}}/>
          <Stack.Screen name='Create' component={Create} />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='Quiz' component={Quiz} initialParams={{start:setQuiz}}/>
        </Stack.Navigator>
      </NavigationContainer>
  </>
  );
}





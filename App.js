import Create from './Screens/Create';
import Home from './Screens/Home';
import {NavigationContainer,} from '@react-navigation/native';
import {createNativeStackNavigator,} from '@react-navigation/native-stack';
import Quiz from './Screens/Quiz';
import Questions from './Screens/Questions';
import { useState } from 'react';

const Stack = createNativeStackNavigator();
export default function App() {
  const [quiz,setQuiz]=useState(null);
  return (<>
  {quiz?<Questions quiz={quiz} close={()=>{setQuiz(null)}}/>:<></>}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} options={{title:'QuizBee'}}/>
          <Stack.Screen name='Create' component={Create} />
          <Stack.Screen name='Quiz' component={Quiz} initialParams={{start:setQuiz}}/>
        </Stack.Navigator>
      </NavigationContainer>
  </>
  );
}





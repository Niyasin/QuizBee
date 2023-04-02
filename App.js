import Create from './Screens/Create';
import Home from './Screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Quiz from './Screens/Quiz';

const Stack = createNativeStackNavigator();

export default function App() {
  


  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} options={{title:'QuizBee'}}/>
          <Stack.Screen name='Create' component={Create} />
          <Stack.Screen name='Quiz' component={Quiz} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}





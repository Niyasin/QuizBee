import Create from './Create';
import Home from './Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{title:'QuizBee'}}/>
      <Stack.Screen name='Create' component={Create} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}





import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import TabNavigator from './src/navigation/TabNavigator';
import SplashScreen from './src/screens/common/SplashScreen';
import CompanyRegisterScreen from './src/screens/company/CompanyRegisterScreen';
import Toast from 'react-native-toast-message';
import CompanyProfileScreen from './src/screens/company/CompanyProfileScreen';
import StudentProfileScreen from './src/screens/student/StudentProfileScreen';
import CompanyHomeScreen from './src/screens/company/CompanyHomeScreen';
import StudentHomeScreen from './src/screens/student/StudentHomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="CompanyProfileScreen" component={CompanyProfileScreen} />
        <Stack.Screen name="CompanyHomeScreen" component={CompanyHomeScreen} />
        <Stack.Screen name="StudentProfileScreen" component={StudentProfileScreen} />
        <Stack.Screen name="CompanyRegister" component={CompanyRegisterScreen} />
        <Stack.Screen name="StudentScreenHome" component={StudentHomeScreen} />
        <Stack.Screen name="StudentHome" component={TabNavigator} />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}

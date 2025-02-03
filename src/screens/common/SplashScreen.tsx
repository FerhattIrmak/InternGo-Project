import { View, Image, StyleSheet, Text } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('StudentHome'); // Giriş yerine doğrudan StudentHome sayfasına yönlendir
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      <Image source={require('../../../assets/images/slogan.png')} style={styles.slogan} />
      {/* <Text style={styles.text}>" İlk adım, Fark yaratır! "</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 410,
    height: 400,
    resizeMode: 'contain',
    marginTop: -100,
  },
  slogan :{
    width: 410,
    height: 50,
    resizeMode: 'contain',
    marginTop: -100,
    opacity: 0.7,
  },
  // text: {
  //   fontWeight: '900',
  //   fontSize: 17,
  //   fontFamily: 'cursive',
  //   marginTop: -50,
  //   bottom: 50,
  // },
});

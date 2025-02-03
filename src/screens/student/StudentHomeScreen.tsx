import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CustomHeader from '../common/CustomHeader'; 

export default function StudentHomeScreen() {
  return (
    <View style={styles.container}>
      {/* Sadece solda logo olacak ve header üst kısmı tüm ekranı kapsayacak şekilde */}
      <CustomHeader
        title="Anasayfa"
        logoSource={require('../../../assets/images/logo.png')} // Logo kaynağını burada ver
        showBackButton={false} // Geri tuşu olmamalı
      />
      
      <Text style={styles.subtitle}>Student Staj fırsatlarını keşfetmeye başla 🚀</Text>

      <Text style={styles.subtitle}>Student Staj fırsatlarını keşfetmeye başla 🚀</Text>

      <Text style={styles.subtitle}>Student Staj fırsatlarını keşfetmeye başla 🚀</Text>

      <Text style={styles.subtitle}>Student Staj fırsatlarını keşfetmeye başla 🚀</Text>

      {/* Çıkış yapmak için buton */}
      <Button title="Çıkış Yap" onPress={() => console.log('Çıkış yapıldı')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
    marginBottom: 20,
  },
});

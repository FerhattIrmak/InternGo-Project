import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CustomHeader from '../common/CustomHeader';

export default function StudentHomeScreen() {
  // Örnek ilan 
  const internshipListings = [
    {
      title: 'Yazılım Geliştirici Stajı',
      company: 'Imona Technologies',
      location: 'Muğla',
      duration: '6 Ay',
      type: 'Ofis',  
      description: 'Yazılım geliştirme süreçlerinde yer alacak, projelerde katkı sağlamak isteyen adaylar.',
    },
    {
      title: 'Frontend Developer Stajı',
      company: 'Tech Studio',
      location: 'İstanbul',
      duration: '3 Ay',
      type: 'Remote',  
      description: 'React, Vue.js gibi frontend teknolojileriyle projelerde yer alacak adaylar arıyoruz.',
    },
    {
      title: 'Mobil Uygulama Geliştirici Stajı',
      company: 'AppTech',
      location: 'Muğla',
      duration: '4 Ay',
      type: 'Ofis',  
      description: 'React Native kullanarak mobil uygulama geliştirme konusunda deneyim kazandıracak staj.',
    },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Anasayfa"
        logoSource={require('../../../assets/images/logo.png')} 
        showBackButton={false} 
      />

      <ScrollView>
        <Text style={styles.subtitle}>Staj fırsatlarını keşfetmeye başla 🚀</Text>

        {internshipListings.map((internship, index) => (
          <View key={index} style={styles.internshipCard}>
            <Text style={styles.internshipTitle}>{internship.title}</Text>
            <Text style={styles.internshipCompany}>{internship.company}</Text>
            <Text style={styles.internshipLocation}>{internship.location} | {internship.duration}</Text>
            <Text style={styles.internshipType}>{internship.type}</Text> {/* Staj türü */}
            <Text style={styles.internshipDescription}>{internship.description}</Text>

            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.buttonText}>İlanı Görüntüle</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 0,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  internshipCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  internshipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  internshipCompany: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  internshipLocation: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  internshipType: {
    fontSize: 14,
    color: '#007BFF', 
    fontWeight: 'bold',
    marginTop: 5,
  },
  internshipDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  viewButton: {
    marginTop: 15,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

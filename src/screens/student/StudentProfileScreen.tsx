import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../common/CustomHeader';
import * as ImagePicker from 'expo-image-picker';

const StudentProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Profilim"
        logoSource={require('../../../assets/images/logo.png')} // Logo kaynağını burada ver
        showBackButton={false} 
      />
      <ScrollView>
        <View style={styles.profileSection}>
          {/* Profil Fotoğrafı */}
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={image ? { uri: image } : require('../../../assets/images/9.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              defaultValue="Ferhat Yılmaz"
            />
          ) : (
            <Text style={styles.name}>Ferhat Yılmaz</Text>
          )}
          {isEditing ? (
            <TextInput
              style={styles.input}
              placeholder="E-posta"
              defaultValue="ferhat@example.com"
            />
          ) : (
            <Text style={styles.email}>ferhat@example.com</Text>
          )}
        </View>

        <View style={styles.infoSection}>
          {/* Eğitim Bilgileri */}
          <Text style={styles.sectionTitle}>Eğitim Bilgileri</Text>
          {isEditing ? (
            <>
              <TextInput style={styles.input} placeholder="Okul" defaultValue="XYZ Üniversitesi" />
              <TextInput style={styles.input} placeholder="Bölüm" defaultValue="Bilgisayar Mühendisliği" />
              <TextInput style={styles.input} placeholder="Mezuniyet Yılı" defaultValue="2025" />
            
            </>
          ) : (
            <>
              <Text>Okul: XYZ Üniversitesi</Text>
              <Text>Bölüm: Bilgisayar Mühendisliği</Text>
              <Text>Mezuniyet Yılı: 2025</Text>
              <Text>Mezuniyet Ortalaması: 3.00</Text>

            </>
          )}
        </View>

        <View style={styles.skillsSection}>
          {/* Yetenekler ve İlgilendiği Alanlar */}
          <Text style={styles.sectionTitle}>Yetenekler ve İlgilendiği Alanlar</Text>
          {isEditing ? (
            <>
              <TextInput style={styles.input} placeholder="Yetenekler" defaultValue="React Native, JavaScript" />
              <TextInput style={styles.input} placeholder="İlgilendiği Alanlar" defaultValue="Mobil Uygulama Geliştirme" />
            </>
          ) : (
            <>
              <Text>React Native, JavaScript</Text>
              <Text>Mobil Uygulama Geliştirme, Yazılım Mühendisliği</Text>
            </>
          )}
        </View>

        <View style={styles.experienceSection}>
          {/* Staj Deneyimi */}
          <Text style={styles.sectionTitle}>Staj Deneyimi</Text>
          {isEditing ? (
            <>
              <TextInput style={styles.input} placeholder="Staj Deneyimi" defaultValue="Imona Technologies - Yazılım Geliştirici" />
              <TextInput style={styles.input} placeholder="Staj Deneyimi" defaultValue="Global Offers - SAP ABAP Stajyeri" />
            </>
          ) : (
            <>
              <Text>Imona Technologies - Yazılım Geliştirici</Text>
              <Text>Örnek- SAP ABAP Stajyeri</Text>
            </>
          )}
        </View>

        <View style={styles.cvSection}>
          {/* CV ve Dosyalar */}
          <Text style={styles.sectionTitle}>CV ve Dosyalar</Text>
          {isEditing ? (
            <TextInput style={styles.input} placeholder="CV Yükleyin" defaultValue="[Link]" />
          ) : (
            <Text>CV Yükleyin: [Link]</Text>
          )}
        </View>

        <View style={styles.socialLinksSection}>
          {/* İletişim ve Sosyal Medya Linkleri */}
          <Text style={styles.sectionTitle}>İletişim ve Sosyal Medya</Text>
          {isEditing ? (
            <>
              <TextInput style={styles.input} placeholder="LinkedIn" defaultValue="linkedin.com/in/ferhat" />
              <TextInput style={styles.input} placeholder="GitHub" defaultValue="github.com/ferhat" />
            </>
          ) : (
            <>
              <Text>LinkedIn: linkedin.com/in/ferhat</Text>
              <Text>GitHub: github.com/ferhat</Text>
            </>
          )}
        </View>

        {/* Düzenleme butonu */}
        <TouchableOpacity onPress={handleEditToggle} style={styles.editButton}>
          <Text style={styles.buttonText}>{isEditing ? 'Kaydet' : 'Düzenle'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    width: '80%',
    borderRadius: 5,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  skillsSection: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  experienceSection: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  cvSection: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  socialLinksSection: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StudentProfileScreen;

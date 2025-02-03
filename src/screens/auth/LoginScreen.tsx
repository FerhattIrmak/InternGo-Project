import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState<'student' | 'company'>('student');
    const navigation = useNavigation();
    const passwordRef = useRef<TextInput>(null);

    // E-posta formatını kontrol et
    const isValidEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());

    // Giriş işlemi
    const handleLogin = async () => {
        const trimmedEmail = email.trim();
    
        if (!trimmedEmail || !password) {
            return Toast.show({
                type: 'error',
                text1: 'Hata!',
                text2: 'E-posta ve şifre alanları boş olamaz.',
                visibilityTime: 2000,
            });
        }
    
        if (!isValidEmail(trimmedEmail)) {
            return Toast.show({
                type: 'error',
                text1: 'Geçersiz E-posta!',
                text2: 'Lütfen geçerli bir e-posta adresi girin.',
                visibilityTime: 2000,
            });
        }
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
            Toast.show({
                type: 'success',
                text1: 'Hoş geldiniz!',
                text2: 'Başarıyla giriş yaptınız.',
                visibilityTime: 2000,
            });
    
            // Kullanıcı tipi kontrolü ve yönlendirme
            setTimeout(() => {
                if (userType === 'student') {
                    navigation.navigate('StudentProfileScreen'); // Öğrenci profiline yönlendir
                } else if (userType === 'company') {
                    navigation.navigate('CompanyProfileScreen'); // Şirket profiline yönlendir
                }
            }, 1200);
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Giriş başarısız!',
                text2: error.message,
                visibilityTime: 2000,
            });
        }
    };
    
    

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>InternGo'ya Giriş Yap</Text>

                <View style={styles.userTypeSelection}>
                    <TouchableOpacity
                        style={[styles.button, userType === 'student' && styles.selectedButton]}
                        onPress={() => setUserType('student')}>
                        <Text style={styles.buttonText}>Öğrenci Girişi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, userType === 'company' && styles.selectedButton]}
                        onPress={() => setUserType('company')}>
                        <Text style={styles.buttonText}>Şirket Girişi</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                />

                <TextInput
                    ref={passwordRef}
                    style={styles.input}
                    placeholder="Şifre"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    returnKeyType="done"
                />

                <Button title="Giriş Yap" onPress={handleLogin} />

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Hesabınız yok mu? Kayıt olun</Text>
                </TouchableOpacity>
            </ScrollView>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebfbff',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 310,
        height: 280,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1.4,
        borderColor: 'black',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    userTypeSelection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        width: '40%',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#168dfd',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    registerText: {
        marginTop: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default LoginScreen;
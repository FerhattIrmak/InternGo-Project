import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userType, setUserType] = useState<'student' | 'company'>('student');
    const navigation = useNavigation();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Şifreler uyuşmuyor!');
            return;
        }

        const auth = getAuth();
        const firestore = getFirestore();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(firestore, 'users', user.uid), {
                email,
                firstName,
                lastName,
                userType,
                createdAt: new Date()
            });

            Toast.show({
                type: 'success',
                position: 'top',
                text1: `Tebrikler!, ${firstName} ${lastName}`,
                text2: 'Hesabınız başarıyla oluşturuldu.',
                visibilityTime: 3000,
            });

            if (userType === 'student') {
                navigation.navigate('StudentDashboard');
            } else {
                navigation.navigate('CompanyRegisterScreen');  // Şirket kaydına yönlendir
            }

        } catch (error: any) {
            let errorMessage = 'Kayıt sırasında bir hata oluştu';

            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Bu e-posta adresi zaten kullanımda. Lütfen farklı bir e-posta adresi kullanın.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Geçersiz e-posta adresi. Lütfen doğru bir e-posta adresi girin.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Şifre çok zayıf. Lütfen daha güçlü bir şifre seçin.';
                    break;
            }

            setErrorMessage(errorMessage);

            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Kayıt Hatası!',
                text2: errorMessage,
                visibilityTime: 3000,
            });
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Kayıt Ol</Text>

                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                <View style={styles.userTypeSelection}>
                    <TouchableOpacity
                        style={[styles.button, userType === 'student' && styles.selectedButton]}
                        onPress={() => setUserType('student')}
                    >
                        <Text style={styles.buttonText}>Öğrenci Kayıt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, userType === 'company' && styles.selectedButton]}
                        onPress={() => {
                            setUserType('company');
                            navigation.navigate('CompanyRegister');  // Burada yönlendirme yapılacak
                        }}
                    >
                        <Text style={styles.buttonText}>Şirket Kayıt</Text>
                    </TouchableOpacity>

                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Adınız"
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Soyadınız"
                    value={lastName}
                    onChangeText={setLastName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Şifre"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TextInput
                    style={styles.input}
                    placeholder="Şifreyi Onayla"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <Button title="Kayıt Ol" onPress={handleRegister} />
            </ScrollView>

            <Toast ref={(ref) => Toast.setRef(ref)} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        paddingTop: 140,
        backgroundColor: '#ebfbff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 30,
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
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
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
});

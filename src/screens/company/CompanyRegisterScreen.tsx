import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CompanyRegisterScreen = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');
    const [companyAbout, setCompanyAbout] = useState('');
    const [companySector, setCompanySector] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const validateInputs = () => {
        if (!companyName || !companyEmail || !password || !confirmPassword || !companyPhone) {
            setErrorMessage('Lütfen gerekli alanları doldurunuz.');
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Şifreler uyuşmuyor!');
            return false;
        }
        if (password.length < 6) {
            setErrorMessage('Şifre en az 6 karakter olmalıdır.');
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (!validateInputs()) return;

        setLoading(true);
        setErrorMessage('');

        try {
            const auth = getAuth();
            const db = getFirestore();

            // Kullanıcı oluşturma
            const userCredential = await createUserWithEmailAndPassword(auth, companyEmail, password);
            const user = userCredential.user;

            // Firestore'a kullanıcı verilerini kaydetme
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                userType: 'company', // Kullanıcı tipini doğrudan 'company' olarak belirle
                company: {
                    name: companyName,
                    email: companyEmail,
                    phone: companyPhone,
                    website: companyWebsite || '',
                    sector: companySector || '',
                    address: companyAddress || '',
                    about: companyAbout || '',
                },
                createdAt: new Date(),
            });

            Toast.show({
                type: 'success',
                position: 'top',
                text1: `${companyName} Şirketi`,
                text2: 'Kaydınız başarıyla oluşturuldu.',
                visibilityTime: 3000,
            });

            // Başarılı kayıt sonrası alanları temizle
            clearInputs();
        } catch (error) {
            let errorMsg = error.message;
            if (errorMsg.includes('email-already-in-use')) {
                errorMsg = 'Bu e-posta adresi zaten kullanılıyor.';
            }
            setErrorMessage(`Hata: ${errorMsg}`);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Kayıt Hatası!',
                text2: errorMsg,
                visibilityTime: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const clearInputs = () => {
        setCompanyName('');
        setCompanyEmail('');
        setPassword('');
        setConfirmPassword('');
        setCompanyPhone('');
        setCompanyWebsite('');
        setCompanyAbout('');
        setCompanySector('');
        setCompanyAddress('');
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
            extraScrollHeight={50}
            keyboardShouldPersistTaps="handled"
        >
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Şirket Kayıt Formu</Text>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Şirket Adı *"
                    value={companyName}
                    onChangeText={setCompanyName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-posta Adresi *"
                    value={companyEmail}
                    onChangeText={setCompanyEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Şifre *"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Şifreyi Onayla *"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Telefon Numarası *"
                    value={companyPhone}
                    onChangeText={setCompanyPhone}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Web Sitesi"
                    value={companyWebsite}
                    onChangeText={setCompanyWebsite}
                    keyboardType="url"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Şirketin Bulunduğu Sektör"
                    value={companySector}
                    onChangeText={setCompanySector}
                />
                <TextInput
                    style={[styles.input, styles.largeInput]}
                    placeholder="Şirket Adresi"
                    value={companyAddress}
                    onChangeText={setCompanyAddress}
                    multiline
                    textAlignVertical="top"
                    numberOfLines={4}
                />
                <TextInput
                    style={[styles.input, styles.largeInput]}
                    placeholder="Şirket Hakkında Kısa Bilgi"
                    value={companyAbout}
                    onChangeText={setCompanyAbout}
                    multiline
                    textAlignVertical="top"
                    numberOfLines={4}
                />

                <Text style={styles.requiredText}>* işaretli alanlar zorunludur</Text>

                <Button
                    title={loading ? "Kaydediliyor..." : "Kayıt Ol"}
                    onPress={handleRegister}
                    disabled={loading}
                    color="#007BFF"
                />
            </View>

            <Toast ref={(ref) => Toast.setRef(ref)} />
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#F5F7FA',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    formContainer: {
        width: '100%',
        maxWidth: 500,
    },
    input: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: '#CED4DA',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    largeInput: {
        height: 100,
        paddingTop: 12,
        paddingBottom: 12,
    },
    errorText: {
        color: '#DC3545',
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: '500',
    },
    requiredText: {
        color: '#6C757D',
        fontSize: 12,
        marginBottom: 15,
        textAlign: 'right',
    }
});

export default CompanyRegisterScreen;
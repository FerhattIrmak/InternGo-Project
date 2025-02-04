import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
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
    const [userType, setUserType] = useState('company');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            setErrorMessage('Şifreler uyuşmuyor!');
            return;
        }

        const auth = getAuth();
        const db = getFirestore();

        createUserWithEmailAndPassword(auth, companyEmail, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setErrorMessage('');

                addDoc(collection(db, 'users'), {
                    uid: user.uid,
                    userType: userType,
                    company: {
                        name: companyName,
                        email: companyEmail,
                        phone: companyPhone,
                        website: companyWebsite,
                        sector: companySector,
                        address: companyAddress,
                        about: companyAbout,
                    },
                    createdAt: new Date(),
                })
                    .then(() => {
                        Toast.show({
                            type: 'success',
                            position: 'top',
                            text1: `${companyName} Şirketi`,
                            text2: 'Kaydınız başarıyla oluşturuldu.',
                            visibilityTime: 3000,
                        });
                    })
                    .catch((error) => {
                        setErrorMessage(`Hata: ${error.message}`);
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: 'Kayıt Hatası!',
                            text2: error.message,
                            visibilityTime: 3000,
                        });
                    });

            })
            .catch((error) => {
                setErrorMessage(`Hata: ${error.message}`);
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Kayıt Hatası!',
                    text2: error.message,
                    visibilityTime: 3000,
                });
            });
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
            extraScrollHeight={50}
            keyboardShouldPersistTaps="handled"
        >
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Şirket İçin Kayıt</Text>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <TextInput style={styles.input} placeholder="Şirket Adı" value={companyName} onChangeText={setCompanyName} />
            <TextInput style={styles.input} placeholder="E-posta Adresi" value={companyEmail} onChangeText={setCompanyEmail} keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput style={styles.input} placeholder="Şifreyi Onayla" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
            <TextInput style={styles.input} placeholder="Telefon Numarası" value={companyPhone} onChangeText={setCompanyPhone} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Web Sitesi" value={companyWebsite} onChangeText={setCompanyWebsite} keyboardType="url" />
            <TextInput style={styles.input} placeholder="Şirketin Bulunduğu Sektör" value={companySector} onChangeText={setCompanySector} />
            <TextInput style={[styles.input, styles.largeInput]} placeholder="Şirket Adresi" value={companyAddress} onChangeText={setCompanyAddress} multiline textAlignVertical="top" numberOfLines={4} />
            <TextInput style={[styles.input, styles.largeInput]} placeholder="Şirket Hakkında Kısa Bilgi" value={companyAbout} onChangeText={setCompanyAbout} multiline textAlignVertical="top" numberOfLines={4} />

            <Button title="Kayıt Ol" onPress={handleRegister} />
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
        paddingTop: 65,
        backgroundColor: '#ebfbff',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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
    largeInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default CompanyRegisterScreen;
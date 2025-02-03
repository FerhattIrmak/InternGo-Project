import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

type CustomHeaderProps = {
  title: string;
  onBackPress?: () => void;
  logoSource: any; // Logo kaynağı
  showBackButton?: boolean; // Geri tuşu gösterilsin mi
};

const CustomHeader = ({ title, onBackPress, logoSource, showBackButton = true }: CustomHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Text style={styles.backButtonText}>{"<"}</Text> {/* Geri simgesi */}
          </TouchableOpacity>
        )}
        <Image source={logoSource} style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 110, // Header'ın yüksekliği
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40, // Gerekli boşluk
    width: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    left: '39%',
  },
});

export default CustomHeader;

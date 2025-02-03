import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../common/CustomHeader'

const CompanyProfileScreen = () => {
  return (
    <View>
        <CustomHeader
        title="Profilim"
        logoSource={require('../../../assets/images/logo.png')} // Logo kaynağını burada ver
        showBackButton={true} // Geri tuşu olmamalı
      />
      <Text>CompanyProfileScreen</Text>
    </View>
  )
}

export default CompanyProfileScreen
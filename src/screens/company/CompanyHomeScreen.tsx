import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../common/CustomHeader'

const CompanyHomeScreen = () => {
  return (
    <View>
        <CustomHeader
        title="Anasayfa"
        logoSource={require('../../../assets/images/logo.png')} // Logo kaynağını burada ver
        showBackButton={false} // Geri tuşu olmamalı
      />
      <Text>CompanyHomeScreen</Text>
      <Text>CompanyHomeScreen</Text>

      <Text>CompanyHomeScreen</Text>

      <Text>CompanyHomeScreen</Text>

      <Text>CompanyHomeScreen</Text>

    </View>
  )
}

export default CompanyHomeScreen
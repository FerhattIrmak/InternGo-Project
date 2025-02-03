import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../common/CustomHeader'

const CompanySearchScreen = () => {
  return (
    <View>
        <CustomHeader
        title="Arama"
        logoSource={require('../../../assets/images/logo.png')} // Logo kaynağını burada ver
        showBackButton={false} // Geri tuşu olmamalı
      />
      <Text>CompanySearchScreen</Text>
      <Text>CompanySearchScreen</Text>

      <Text>CompanySearchScreen</Text>

      <Text>CompanySearchScreen</Text>

      <Text>CompanySearchScreen</Text>

    </View>
  )
}

export default CompanySearchScreen
import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../common/CustomHeader'; 

const StudentProfileScreen = () => {
  return (
    <View>
       <CustomHeader
        title="Profilim"
        logoSource={require('../../../assets/images/logo.png')} // Logo kaynağını burada ver
        showBackButton={true} // Geri tuşu olmamalı
      />
      <Text>Student ProfileScreen</Text>
      <Text>Student ProfileScreen</Text>

      <Text>Student ProfileScreen</Text>

      <Text>Student ProfileScreen</Text>

      <Text>Student ProfileScreen</Text>

    </View>
  )
}

export default StudentProfileScreen
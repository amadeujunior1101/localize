import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
/* eslint-disable */
import {Input, Form, Item} from 'native-base';

import FA from 'react-native-vector-icons/FontAwesome5';

import api from '../../services/api';

import {useFormik} from 'formik';

import AsyncStorage from '@react-native-community/async-storage';

export default function Login({navigation}) {
  const [loadingButtonLogin, setLoadingButtonLogin] = useState(false);

  const [showHideLogin, setShowHideLogin] = useState({
    icon: 'eye-slash',
    password: true,
  });

  function showHideInputLogin() {
    setShowHideLogin({
      icon: showHideLogin.icon === 'eye' ? 'eye-slash' : 'eye',
      password: showHideLogin.password === false ? true : false,
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const {values, setFieldValue, handleSubmit, errors} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await api.post('/login', {
          email: values.email,
          password: values.password,
        });

        if (response.data.error === true) {
          Alert.alert(
            'Atenção',
            'E-mail ou senha incorreto',
            [{text: 'Ok', onPress: () => setLoadingButtonLogin(false)}],
            {cancelable: false},
          );
        } else {
          const user_id = response.data.user_id;
          const token = response.data.data.token;

          const {full_name, email, phone} = response.data;

          try {
            await AsyncStorage.setItem('@user_id', JSON.stringify(user_id));
            await AsyncStorage.setItem('@token', JSON.stringify(token));
            await AsyncStorage.setItem(
              '@user_full_name',
              JSON.stringify(full_name),
            );
            await AsyncStorage.setItem('@user_email', JSON.stringify(email));
            await AsyncStorage.setItem('@user_phone', JSON.stringify(phone));
          } catch (error) {
            console.log('erro ao gravar os tokens:' + error);
          }
          navigation.navigate('Home');
        }
      } catch (error) {
        alert('Dados incorretos!' + error);
      }
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Obrigatório';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'E-mail inválido';
      }

      if (!values.password) {
        errors.password = 'Obrigatório';
      } else if (values.password.length < 6 || values.password.length > 20) {
        errors.password = 'Tamanho inválido';
      }

      return errors;
    },
  });

  return (
    <View style={{flex: 1, backgroundColor: '#DDD'}}>
      <StatusBar
        translucent
        backgroundColor="#F8685B"
        barStyle="light-content"
      />
      <View>
        <View
          style={{
            top: 30,
            position: 'absolute',
            zIndex: 1,
            left: 10,
            right: 10,
            bottom: 0,
          }}>
          <Text
            style={{
              color: '#FFF',
              textAlign: 'left',
              fontSize: 25,
              fontFamily: 'Roboto-Black',
            }}>
            Gerencie suas visitas de forma rápida e simples
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => alert('Share')}
          style={{
            top: 60,
            position: 'absolute',
            right: 10,
            bottom: 0,
            zIndex: 1,
          }}>
          <FA name="share-alt" size={30} color="#D2D2D2" />
        </TouchableOpacity>
        <Image
          style={{
            marginTop: 20,
            height: 150,
            width: '100%',
          }}
          source={require('../../imgs/shapeTop3.png')}
          resizeMode="stretch"
        />
      </View>

      <ScrollView>
        <Form style={{margin: 10}} onSubmit={handleFormSubmit}>
          <View style={{paddingBottom: 10}}>
            <Item
              regular
              rounded
              error={errors.email ? true : false}
              style={{borderColor: '#000'}}>
              <Input
                type="e-mail"
                autoCapitalize="none"
                style={{marginLeft: 10}}
                placeholder="Digite seu e-mail"
                onChangeText={(email) => setFieldValue('email', email)}
                value={values.email}
              />
            </Item>
            {errors.email && <Text>{errors.email}</Text>}
          </View>
          <View style={{paddingBottom: 5}}>
            <Item
              regular
              rounded
              error={errors.password ? true : false}
              style={{
                borderColor: '#000',
                backgroundColor: '#DDD',
                borderRadius: 30,
              }}>
              <Input
                type="password"
                placeholder="Digite sua senha"
                secureTextEntry={showHideLogin.password}
                autoCorrect={false}
                style={{marginLeft: 10}}
                spellCheck={false}
                onChangeText={(password) => setFieldValue('password', password)}
                value={values.password}
              />
              <FA
                name={showHideLogin.icon}
                onPress={showHideInputLogin}
                size={25}
                style={{marginRight: 10}}
              />
            </Item>
            {errors.password && <Text>{errors.password}</Text>}
          </View>
        </Form>

        <View
          style={{
            marginLeft: 10,
            marginTop: 5,
            marginRight: 10,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            disabled={loadingButtonLogin === true ? true : false}
            onPress={() => {
              if (
                !values.email ||
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  values.email,
                ) ||
                !values.password ||
                values.password.length < 6 ||
                values.password.length > 20
              ) {
                setLoadingButtonLogin(false);
              } else {
                setLoadingButtonLogin(true);
              }

              handleSubmit();
            }}>
            <View style={styles.button}>
              {loadingButtonLogin === true ? (
                <ActivityIndicator size={('small', 25)} color="green" />
              ) : (
                <Text style={styles.buttonTitle}>Entrar</Text>
              )}
            </View>
          </TouchableOpacity>
          <Text style={{margin: 10, textAlign: 'center'}}>ou</Text>
          <TouchableOpacity onPress={() => alert('entrar')}>
            <View
              style={{
                borderWidth: 2,
                borderColor: '#dc3545',
                height: 50,
                borderRadius: 30,
                marginLeft: 40,
                marginRight: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20, color: '#000'}}>Cadastre-se</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{}}>
        <Image
          style={{
            height: 80,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: -1,
          }}
          source={require('../../imgs/shapeBotton3.png')}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#dc3545',
    height: 50,
    borderRadius: 30,
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

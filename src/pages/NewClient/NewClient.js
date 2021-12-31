import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {Input, ListItem, Body, Form, Item} from 'native-base';
/* eslint-disable */
import FA from 'react-native-vector-icons/FontAwesome5';

import api from '../../services/api';

import {useFormik} from 'formik';

import AsyncStorage from '@react-native-community/async-storage';

import Geolocation from '@react-native-community/geolocation';

export default function NewClient({navigation}) {
  const [loadingButtonLogin, setLoadingButtonLogin] = useState(false);
  const [checked, setChecked] = useState(true);
  const [location, setLocation] = useState();

  const positionGPS = () => {
    let dataLatLgt = {};
    Geolocation.getCurrentPosition(
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        dataLatLgt = {
          error: false,
          Latitude: currentLatitude,
          Longitude: currentLongitude,
        };

        const {Latitude, Longitude} = dataLatLgt;
        setLocation(dataLatLgt);
        handleSubmit();
        setLoadingButtonLogin(false);
      },
      (error) => {
        error &&
          alert('Pressione "Permitir" para encontrarmos sua localização!'),
          alert(error.message),
          setLoadingButtonLogin(false);
      },
    );
  };

  function handleCheckBox() {
    checked === true ? setChecked(!checked) : setChecked(!checked);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const {values, setFieldValue, handleSubmit, errors} = useFormik({
    initialValues: {
      full_name: '',
      company_name: '',
      city: '',
    },
    onSubmit: async (values) => {
      console.log('values:', values);
      const user_id = await AsyncStorage.getItem('@user_id');

      const token = JSON.parse(await AsyncStorage.getItem('@token'));

      try {
        const config = {
          headers: {Authorization: `Bearer ${token}`},
        };

        const response = await api.post(
          '/client',
          {
            full_name: values.full_name,
            company_name: values.company_name,
            city: values.city,
            user_id: user_id,
            latitude: location !== undefined ? location.Latitude : '0',
            longitude: location !== undefined ? location.Longitude : '0',
          },
          config,
        );

        if (response.data.error === true) {
          Alert.alert(
            'Atenção',
            'Houve um erro no cadastro do cliente!',
            [{text: 'Ok', onPress: () => setLoadingButtonLogin(false)}],
            {cancelable: false},
          );
        } else {
          navigation.goBack();
        }
      } catch (error) {
        alert('Dados incorretos!' + error);
      }
      setLoadingButtonLogin(false);
    },
    validate: (values) => {
      const errors = {};

      if (!values.full_name) {
        errors.full_name = 'Obrigatório';
      } else if (values.full_name.length > 100) {
        errors.full_name = 'Tamanho inválido';
      }

      if (!values.company_name) {
        errors.company_name = 'Obrigatório';
      } else if (values.company_name.length > 100) {
        errors.company_name = 'Tamanho inválido';
      }

      if (!values.city) {
        errors.city = 'Obrigatório';
      } else if (values.city.length > 100) {
        errors.city = 'Tamanho inválido';
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
            top: 35,
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
              fontSize: 20,
              fontFamily: 'Roboto-Black',
            }}>
            # Marque a localização do seu cliente para encontrá-lo facilmente na
            próxima visita.
          </Text>
        </View>

        <View
          style={{
            top: 140,
            position: 'absolute',
            zIndex: 1,
            left: 10,
            right: 10,
            bottom: 0,
          }}>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontSize: 20,
              fontFamily: 'Roboto-Black',
            }}>
            Cadastro de cliente
          </Text>
        </View>

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
        <View
          style={{
            marginLeft: 10,
            marginTop: 10,
            marginRight: 10,
            marginBottom: 5,
          }}>
          <Form style={{margin: 10}} onSubmit={handleFormSubmit}>
            <View style={{paddingBottom: 10}}>
              <Item
                regular
                rounded
                error={errors.full_name ? true : false}
                style={{borderColor: '#000'}}>
                <Input
                  type="text"
                  style={{marginLeft: 10}}
                  autoCorrect={false}
                  placeholder="nome completo?"
                  onChangeText={(full_name) =>
                    setFieldValue('full_name', full_name)
                  }
                  value={values.full_name}
                />
              </Item>
              {errors.full_name && (
                <Text style={{color: 'red'}}>{errors.full_name}</Text>
              )}
            </View>
            <View style={{paddingBottom: 5}}>
              <Item
                regular
                rounded
                error={errors.company_name ? true : false}
                style={{
                  borderColor: '#000',
                  backgroundColor: '#DDD',
                  borderRadius: 30,
                }}>
                <Input
                  type="text"
                  placeholder="empresa/estabelecimento?"
                  autoCorrect={false}
                  style={{marginLeft: 10}}
                  spellCheck={false}
                  onChangeText={(company_name) =>
                    setFieldValue('company_name', company_name)
                  }
                  value={values.company_name}
                />
              </Item>
              {errors.company_name && (
                <Text style={{color: 'red'}}>{errors.company_name}</Text>
              )}
            </View>

            <View style={{paddingBottom: 5}}>
              <Item
                regular
                rounded
                error={errors.company_name ? true : false}
                style={{
                  borderColor: '#000',
                  backgroundColor: '#DDD',
                  borderRadius: 30,
                }}>
                <Input
                  type="text"
                  placeholder="cidade?"
                  autoCorrect={false}
                  style={{marginLeft: 10}}
                  spellCheck={false}
                  onChangeText={(city) => setFieldValue('city', city)}
                  value={values.city}
                />
              </Item>
              {errors.city && <Text style={{color: 'red'}}>{errors.city}</Text>}
            </View>
          </Form>
        </View>
        <View style={{marginLeft: 10}}>
          <ListItem style={{borderBottomWidth: 0}}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => handleCheckBox()}>
              <View
                style={checked === true ? styles.checkedOn : styles.checkedOff}>
                {checked === true && <FA name="check" color="#FFF" size={16} />}
              </View>

              <Body>
                <Text style={{marginLeft: 10}}>Marcar localização?</Text>
              </Body>
            </TouchableOpacity>
          </ListItem>
        </View>

        <View
          style={{
            margin: 10,
          }}>
          <TouchableOpacity
            disabled={loadingButtonLogin === true ? true : false}
            onPress={() => {
              if (
                !values.full_name ||
                !values.company_name ||
                !values.city ||
                values.company_name.length > 100 ||
                values.city.length > 100
              ) {
                setLoadingButtonLogin(false);
                alert('Preencha os campos corretamente');
                handleSubmit();
              } else {
                setLoadingButtonLogin(true);
                if (checked === true) {
                  positionGPS();
                } else {
                  handleSubmit();
                }
              }
            }}>
            <View style={styles.button}>
              {loadingButtonLogin === true ? (
                <ActivityIndicator size={('small', 25)} color="green" />
              ) : (
                <Text style={styles.buttonTitle}>Salvar</Text>
              )}
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
  checkedOn: {
    backgroundColor: '#dc3545',
    borderWidth: 1,
    borderColor: '#dc3545',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedOff: {
    borderWidth: 1,
    borderColor: '#dc3545',
    width: 20,
    height: 20,
  },
});

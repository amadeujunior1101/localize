import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {Input, Form, Item, DatePicker} from 'native-base';

/* eslint-disable */
import FA from 'react-native-vector-icons/FontAwesome5';

import api from '../../services/api';

import AsyncStorage from '@react-native-community/async-storage';

export default function Visit({route, navigation}) {
  const [dateVisit, setDateVisit] = useState();

  function setCalendar(newDate) {
    var date = new Date(newDate),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);

    setDateVisit([date.getFullYear(), month, day].join('-'));
  }

  const {client_id, full_name, company_name} = route.params;

  const [loadingButtonLogin, setLoadingButtonLogin] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  async function makeAnAppointment() {
    const user_id = await AsyncStorage.getItem('@user_id');

    const token = JSON.parse(await AsyncStorage.getItem('@token'));

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await api.post(
        '/visit',
        {
          client_id: client_id,
          user_id: user_id,
          visit_date: dateVisit,
        },
        config,
      );

      if (response.data.error === 'true') {
        console.log('Ocorreu um erro na inserção da visita');
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        });
      }
    } catch (error) {
      alert('Dados incorretos!' + error);
    }
    setLoadingButtonLogin(false);
  }

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
              fontSize: 20,
              fontFamily: 'Roboto-Black',
            }}>
            Escolha a data e agende uma visita para esse cliente.
          </Text>
        </View>
        <Image
          style={{
            marginTop: 20,
            height: 100,
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
                rounded
                style={{backgroundColor: '#bdbebd', borderRadius: 30}}>
                <Input
                  disabled={true}
                  type="text"
                  autoCapitalize="none"
                  style={{marginLeft: 10}}
                  value={full_name}
                />
              </Item>
            </View>
            <View style={{paddingBottom: 5}}>
              <Item
                regular
                rounded
                style={{backgroundColor: '#bdbebd', borderRadius: 30}}>
                <Input
                  type="text"
                  disabled={true}
                  style={{marginLeft: 10}}
                  value={company_name}
                />
              </Item>
            </View>
          </Form>
        </View>
        <View
          style={{
            marginLeft: 25,
            marginBottom: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <FA name="calendar-alt" size={20} color="#000" />
          </View>

          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date()}
            maximumDate={new Date(2050, 12, 31)}
            locale={'pt'}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={'fade'}
            androidMode={'default'}
            placeHolderText="Escolha uma data"
            textStyle={{color: '#000'}}
            placeHolderTextStyle={{color: '#000'}}
            onDateChange={setCalendar}
            disabled={false}
          />
        </View>

        <View
          style={{
            margin: 10,
          }}>
          <TouchableOpacity
            disabled={loadingButtonLogin === true ? true : false}
            onPress={() => {
              if (dateVisit !== undefined) {
                setLoadingButtonLogin(true);
                makeAnAppointment();
              } else {
                Alert.alert(
                  'Atenção',
                  'Escolha uma data para a visita!',
                  [{text: 'Ok', onPress: () => setLoadingButtonLogin(false)}],
                  {cancelable: false},
                );
              }
            }}>
            <View style={styles.button}>
              {loadingButtonLogin === true ? (
                <ActivityIndicator size={('small', 25)} color="green" />
              ) : (
                <Text style={styles.buttonTitle}>Marcar visita</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{}}>
        <Image
          style={{
            height: 60,
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

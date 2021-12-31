import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';

/* eslint-disable */
import FA from 'react-native-vector-icons/FontAwesome5';

import api from '../../services/api';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import AsyncStorage from '@react-native-community/async-storage';

export default function Schedule() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  const findLocal = (latitude, longitude) => {
    return Linking.openURL(
      `https://maps.google.com/?q=${latitude},${longitude}`,
    );
  };

  function visitDateConvert(date) {
    let str = date;
    let ano = str.substr(0, 4);
    let mes = str.substr(5, 2);
    let dia = str.substr(8, 2);

    let hora = str.substr(10, 9);

    return dia + '-' + mes + '-' + ano;
  }

  async function listAllVisits() {
    const user_id = await AsyncStorage.getItem('@user_id');

    const token = JSON.parse(await AsyncStorage.getItem('@token'));

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await api.get(
        `/visit_by_user_id?user_id=${user_id}`,
        config,
      );

      if (response.data.length === 0) {
        console.log('Sem Visitadas agendadas!');
        setLoading(false);
        setVisible(false);
      } else {
        setData(response.data);
        setLoading(false);
        setVisible(false);
      }
    } catch (error) {
      console.log('Dados incorretos!' + error);
    }
  }

  async function visitMade(id, client_id) {
    const token = JSON.parse(await AsyncStorage.getItem('@token'));

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await api.post(
        '/visit-made',
        {
          id: id,
          client_id: client_id,
        },
        config,
      );

      if (response.data.error === false) {
        const newList = data.filter((item) => item.id !== id);

        setData(newList);
      }
    } catch (error) {
      console.log('Dados incorretos!' + error);
    }
  }

  useEffect(() => {
    listAllVisits();
  }, []);

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
            Acompanhe diariamente sua agenda de visitas.
          </Text>
        </View>

        <View
          style={{
            top: 90,
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
            Agenda
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
          style={{flex: 1, marginLeft: 20, marginRight: 20, marginBottom: 10}}>
          <ScrollView>
            {loading === false ? (
              data.length > 0 ? (
                data.map((item) => (
                  <View
                    key={JSON.stringify(item.id)}
                    style={{
                      width: '100%',
                      backgroundColor: '#FFF',
                      borderRadius: 10,
                      marginTop: 20,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          marginLeft: 15,
                          marginTop: 15,
                          marginRight: 15,
                          marginBottom: 10,
                          flex: 3,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: 'Roboto-Regular',
                            }}>
                            Nome:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: 'Roboto-Black',
                              marginLeft: 5,
                            }}>
                            {item.client.full_name}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: 'Roboto-Regular',
                            }}>
                            Empresa:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: 'Roboto-Black',
                              marginLeft: 5,
                            }}>
                            {item.client.company_name}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: 'Roboto-Regular',
                            }}>
                            Cidade:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: 'Roboto-Black',
                              marginLeft: 5,
                            }}>
                            Augustinópolis-TO
                          </Text>
                        </View>
                      </View>

                      {item.client.latitude !== '0' ? (
                        <View
                          style={{
                            marginTop: 15,
                            marginRight: 15,
                            marginBottom: 15,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              findLocal(
                                item.client.latitude,
                                item.client.longitude,
                              );
                            }}>
                            <Image
                              style={{width: 48, height: 48}}
                              resizeMode="stretch"
                              source={require('../../imgs/icons8-google-maps-old-480.png')}
                              resizeMode="stretch"
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View
                          style={{
                            marginTop: 15,
                            marginRight: 15,
                            marginBottom: 15,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            style={{width: 48, height: 48}}
                            resizeMode="stretch"
                            source={require('../../imgs/icons8-google-maps2-old-480.png')}
                            resizeMode="stretch"
                          />
                        </View>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert(
                          'Atenção',
                          'Essa visita já foi realizada?',
                          [
                            {text: 'Cancelar'},
                            {
                              text: 'Sim',
                              onPress: () => visitMade(item.id, item.client_id),
                            },
                          ],
                        )
                      }>
                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          flex: 1,
                          backgroundColor: '#5fb453',
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontFamily: 'Roboto-Black',
                            fontSize: 20,
                            color: '#000',
                            marginLeft: 15,
                            marginTop: 15,
                            marginRight: 2,
                            marginBottom: 15,
                          }}>
                          Quando visitar:
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontFamily: 'Roboto-Black',
                            fontSize: 20,
                            color: '#FFF',
                            marginLeft: 2,
                            marginTop: 15,
                            marginRight: 15,
                            marginBottom: 15,
                          }}>
                          {visitDateConvert(item.visit_date)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View style={{alignItems: 'center'}}>
                  <Text>Sem visitas agendadas</Text>
                </View>
              )
            ) : (
              <ScrollView>
                <ShimmerPlaceHolder
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    marginTop: 17,
                  }}
                  autoRun={visible}
                />

                <ShimmerPlaceHolder
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    marginTop: 17,
                  }}
                  autoRun={visible}
                />
                <ShimmerPlaceHolder
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    marginTop: 17,
                  }}
                  autoRun={visible}
                />

                <ShimmerPlaceHolder
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    marginTop: 17,
                  }}
                  autoRun={visible}
                />
                <ShimmerPlaceHolder
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    marginTop: 17,
                  }}
                  autoRun={visible}
                />

                <ShimmerPlaceHolder
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    marginTop: 17,
                  }}
                  autoRun={visible}
                />
                <ShimmerPlaceHolder
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    marginTop: 17,
                  }}
                  autoRun={visible}
                />
                <ShimmerPlaceHolder
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    marginTop: 17,
                  }}
                  autoRun={visible}
                />

                <ShimmerPlaceHolder
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    marginTop: 17,
                  }}
                  autoRun={visible}
                />
                <ShimmerPlaceHolder
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    marginTop: 17,
                  }}
                  autoRun={visible}
                />
              </ScrollView>
            )}
          </ScrollView>
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

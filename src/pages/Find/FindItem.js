import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
/* eslint-disable */

import {useNavigation} from '@react-navigation/native';

export default function FindItem({item}) {
  const [expanded_id, setExpanded_id] = useState();
  const [visible, setVisible] = useState(false);

  const nav = useNavigation();

  const findLocal = (latitude, longitude) => {
    return Linking.openURL(
      `https://maps.google.com/?q=${latitude},${longitude}`,
    );
  };

  var arr = [];
  function blockExpanded(id) {
    arr.push(id);
    arr.forEach((item) => {
      setExpanded_id(item);
      setVisible(!visible);
    });
  }

  function visitDateConvert(date) {
    let str = date;
    let ano = str.substr(0, 4);
    let mes = str.substr(5, 2);
    let dia = str.substr(8, 2);

    return dia + '-' + mes + '-' + ano;
  }

  return (
    <View
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
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => blockExpanded(item.id)}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontFamily: 'Roboto-Regular'}}>
                Nome:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Black',
                  marginLeft: 5,
                }}>
                {item.full_name}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontFamily: 'Roboto-Regular'}}>
                Empresa:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Black',
                  marginLeft: 5,
                }}>
                {item.company_name}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontFamily: 'Roboto-Regular'}}>
                Cidade:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Black',
                  marginLeft: 5,
                }}>
                {item.city}
              </Text>
            </View>
            {expanded_id === item.id && visible === true && (
              <View style={{marginTop: 10}}>
                {item.visit.length > 0 ? (
                  <Text>Histórico de visitas</Text>
                ) : (
                  <Text> Ainda não houve visitas</Text>
                )}

                <View key={JSON.stringify(item.id)} style={{marginTop: 10}}>
                  {item.visit.map((elem) => (
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Roboto-Regular',
                          marginBottom: 10,
                        }}>
                        {elem.done === '1' ? (
                          <View
                            style={{
                              backgroundColor: 'green',
                              borderRadius: 20,
                            }}>
                            <Text
                              style={{
                                margin: 10,
                                fontFamily: 'Roboto-Regular',
                                color: '#FFF',
                              }}>
                              {visitDateConvert(elem.visit_date)}
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              backgroundColor: '#dc3545',
                              borderRadius: 20,
                            }}>
                            <Text
                              style={{
                                margin: 10,
                                fontFamily: 'Roboto-Regular',
                                color: '#FFF',
                              }}>
                              {visitDateConvert(elem.visit_date)}
                            </Text>
                          </View>
                        )}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {item.latitude !== '0' ? (
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
                findLocal(item.latitude, item.longitude);
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

      {item.visit_alert.length > 0 ? (
        item.visit_alert.map((elem) =>
          elem.pending === 'no' ? (
            <TouchableOpacity
              key={JSON.stringify(elem.id)}
              onPress={() =>
                nav.navigate('Visit', {
                  client_id: item.id,
                  full_name: item.full_name,
                  company_name: item.company_name,
                })
              }>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#3E7BF1',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto-Black',
                    fontSize: 20,
                    color: '#FFF',
                    margin: 15,
                  }}>
                  Marcar uma visita?
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity key={JSON.stringify(elem.id)}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#dc3545',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto-Black',
                    fontSize: 20,
                    color: '#FFF',
                    margin: 15,
                  }}>
                  Já existe uma visita agendada.
                </Text>
              </View>
            </TouchableOpacity>
          ),
        )
      ) : (
        <TouchableOpacity
          key={JSON.stringify(item.id)}
          onPress={() =>
            nav.navigate('Visit', {
              client_id: item.id,
              full_name: item.full_name,
              company_name: item.company_name,
            })
          }>
          <View
            style={{
              flex: 1,
              backgroundColor: '#3E7BF1',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Roboto-Black',
                fontSize: 20,
                color: '#FFF',
                margin: 15,
              }}>
              Marcar uma visita?
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  StatusBar,
  UIManager,
} from 'react-native';

/* eslint-disable */

import api from '../../services/api';

import FindItem from './FindItem';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import AsyncStorage from '@react-native-community/async-storage';

export default function Find() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  async function listAllClients() {
    const user_id = await AsyncStorage.getItem('@user_id');

    const token = JSON.parse(await AsyncStorage.getItem('@token'));

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get(`/clients?user_id=${user_id}`, config);
      if (response.data.length === 0) {
        console.log('Sem clientes cadastrados');
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

  useEffect(() => {
    listAllClients();
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
            Veja todos os clientes que você conquistou.
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
            Lista de clientes
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
          {loading === false ? (
            data.length > 0 ? (
              data.map((item) => (
                <FindItem key={JSON.stringify(item.id)} item={item} />
              ))
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, fontFamily: 'Roboto-Regular'}}>
                  Sem clientes cadastrados
                </Text>
              </View>
            )
          ) : (
            <ScrollView>
              <ShimmerPlaceHolder
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  marginTop: 17,
                }}
                autoRun={visible}
              />

              <ShimmerPlaceHolder
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  marginTop: 17,
                }}
                autoRun={visible}
              />
              <ShimmerPlaceHolder
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  marginTop: 17,
                }}
                autoRun={visible}
              />

              <ShimmerPlaceHolder
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  marginTop: 17,
                }}
                autoRun={visible}
              />
              <ShimmerPlaceHolder
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  marginTop: 17,
                }}
                autoRun={visible}
              />

              <ShimmerPlaceHolder
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  marginTop: 17,
                }}
                autoRun={visible}
              />
              <ShimmerPlaceHolder
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  marginTop: 17,
                }}
                autoRun={visible}
              />
              <ShimmerPlaceHolder
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  marginTop: 17,
                }}
                autoRun={visible}
              />

              <ShimmerPlaceHolder
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  marginTop: 17,
                }}
                autoRun={visible}
              />
              <ShimmerPlaceHolder
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  marginTop: 17,
                }}
                autoRun={visible}
              />
            </ScrollView>
          )}
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

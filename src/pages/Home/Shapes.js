import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';

import FA from 'react-native-vector-icons/FontAwesome5';

export default function Shapes() {
  return (
    <View style={{flex: 1, backgroundColor: '#DDD'}}>
      <View>
        <View
          style={{
            top: 30,
            position: 'absolute',
            zIndex: 1,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <Text
            style={{
              color: '#FFF',
              textAlign: 'center',
              fontSize: 25,
              fontFamily: 'Roboto-Black',
            }}>
            Localizys
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => alert('Share')}
          style={{
            top: 35,
            position: 'absolute',
            right: 10,
            bottom: 0,
            zIndex: 1,
          }}>
          <FA name="share-alt" size={30} color="#dc3545" />
        </TouchableOpacity>

        <Image
          style={{
            height: 150,
            width: '100%',
          }}
          source={require('./src/imgs/shapeTop-azul-claro2.png')}
          resizeMode="stretch"
        />
      </View>

      <ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => alert('clicou')}>
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: '#FFF',
                borderRadius: 30,
                marginLeft: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <FA name="calendar-plus" size={40} color="#000" />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto-Regular',
                    fontSize: 20,
                  }}>
                  Novo
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('clicou')}>
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: '#FFF',
                borderRadius: 30,
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <FA name="search" size={40} color="#000" />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto-Regular',
                    fontSize: 20,
                  }}>
                  Procurar
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => alert('clicou')}>
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: '#FFF',
                borderRadius: 30,
                marginLeft: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <FA name="list-alt" size={40} color="#000" />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto-Regular',
                    fontSize: 20,
                  }}>
                  Orçamentos
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('clicou')}>
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: '#FFF',
                borderRadius: 30,
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <FA name="calendar-alt" size={40} color="#000" />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto-Regular',
                    fontSize: 20,
                  }}>
                  Agenda
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View>
        <Image
          style={{
            height: 100,
            width: '100%',
          }}
          source={require('./src/imgs/shapeBottom-amarelo1.png')}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
}

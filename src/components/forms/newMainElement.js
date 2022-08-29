 import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNFS from 'react-native-fs';
import { useNavigate } from "react-router-native";
import { AnimatedFAB, Appbar, Portal, Text,TextInput } from 'react-native-paper';
import uuid from 'react-native-uuid';


export default function NewMain ({ data,setData,setindexOfData,writeFile,indexOfData}) {
    const navigate = useNavigate();


    const [id,setId]=React.useState('Urn:xxx:yyy-'+uuid.v4());
    const [description,setDescription]=React.useState('');


//data[indexOfData].usrData
const saveNewData=(dataBlock)=>{
   
    if(id!==""&&description!==""){
        dataBlock[indexOfData].usrData.push({id:id,description:description,children:[]})
        setData(dataBlock);
        writeFile(JSON.stringify(dataBlock));
        navigate(-1)
    }
}

  return (
    <SafeAreaProvider>
   
        <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => {navigate(-1)}} />
          <Appbar.Content title="New Element" />
          <Appbar.Action icon="check" onPress={() => {saveNewData(data)}} />
        </Appbar.Header>

        <ScrollView>
        <View style={{
              flexDirection: "row",
              justifyContent: 'center',
              marginTop:25,
              marginBottom:25
            }}>
              <View style={{
                width: '90%',
              }} >
                <TextInput
                  label="ID"
                  value={id}
                  dense={false}
                  mode="outlined"
                  disabled={true}
/>
              </View>
            </View>

            <View style={{
              flexDirection: "row",
              justifyContent: 'center',
              marginTop:25,
              marginBottom:25
            }}>
              <View style={{
                width: '90%',
              }} >
                <TextInput
                  label="Description"
                  value={description}
                  dense={false}
                  mode="outlined"
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={text => setDescription(text)}
                />
              </View>
            </View>
        </ScrollView>
    
   </SafeAreaProvider>
  );
};


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


export default function EditMain ({ data,setData,setindexOfData,writeFile,indexOfData,idToEdit}) {
    const navigate = useNavigate();

    const thisIndex= data[indexOfData].resources.findIndex((obj => obj.id == idToEdit));
    const [id,setId]=React.useState(data[indexOfData].resources[thisIndex].id);
    const [description,setDescription]=React.useState(data[indexOfData].resources[thisIndex].description);


//data[indexOfData].resources
const saveNewData=(dataBlock)=>{
   
    if(id!==""&&description!==""){
        dataBlock[indexOfData].resources[thisIndex]={id:id,description:description,policies:[]}
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


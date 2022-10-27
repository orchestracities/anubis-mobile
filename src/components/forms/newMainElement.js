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
import { AnimatedFAB, Appbar, Portal, Text, TextInput } from 'react-native-paper';
import uuid from 'react-native-uuid';
import DropDown from "react-native-paper-dropdown";


export default function NewMain({ data, setData, setindexOfData, writeFile, indexOfData }) {
  const navigate = useNavigate();


  const [id, setId] = React.useState('Urn:xxx:yyy-' + uuid.v4());
  const [description, setDescription] = React.useState('');
  const [resourceType, setResourceType] = React.useState('');
  const [showDropDown, setShowDropDown] = React.useState(false);
  const resourceTypes=[
    {
      label: "entity",
      value: 'entity',
    }
  ]
  //data[indexOfData].resources
  const saveNewData = (dataBlock) => {

    if (id !== "" && resourceType !== "") {
      dataBlock[indexOfData].resources.push({ id: id,resource_type: [resourceType], policies: [] })
      setData(dataBlock);
      writeFile(JSON.stringify(dataBlock));
      navigate(-1)
    }
  }

  return (
    <SafeAreaProvider>
      <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => { navigate(-1) }} />
        <Appbar.Content title="New Element" />
        <Appbar.Action icon="check" onPress={() => { saveNewData(data) }} />
      </Appbar.Header>

      <ScrollView>
        <View style={{
          flexDirection: "row",
          justifyContent: 'center',
          marginTop: 25,
          marginBottom: 25
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
          marginTop: 25,
          marginBottom: 25
        }}>
          <View style={{
            width: '90%',
          }} >
            <DropDown
              label={"resource type"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={resourceType}
              setValue={setResourceType}
              list={resourceTypes}
            />
          </View>
        </View>
      </ScrollView>

    </SafeAreaProvider>
  );
};


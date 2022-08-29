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
import DropDown from "react-native-paper-dropdown";

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNFS, { read, write } from 'react-native-fs';
import { useNavigate } from "react-router-native";
import { AnimatedFAB, Appbar, Portal, Text, TextInput } from 'react-native-paper';
import uuid from 'react-native-uuid';


export default function EditChild({ data, setData, setindexOfData, writeFile, indexOfData, childrenElements, setChildrenElemens, idToEdit }) {
  const navigate = useNavigate();
  const mainIndex = data[indexOfData].usrData.findIndex((obj => obj.id == childrenElements.id));
  const thisElementIndex = data[indexOfData].usrData[mainIndex].children.findIndex((obj => obj.id === idToEdit));
  const currentData = data[indexOfData].usrData[mainIndex].children[thisElementIndex]
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = React.useState(false);
  const [actor, setActor] = React.useState(currentData.actorType);
  const [mode, setMode] = React.useState(currentData.mode);
  const [id, setId] = React.useState(currentData.id);

  const actorTypes = [
    {
      label: "Authenticated Actor",
      value: 'acl:AuthenticatedAgent',
    },
    {
      label: "Anyone",
      value: "foaf:Agent'",
    },
    {
      label: "Resource Tenant Agent",
      value: "oc-acl:ResourceTenantAgent",
    },
  ];

  const accessTypes = [
    {
      value: "acl:Read",
      label: "read"
    },
    {
      value: "acl:Write",
      label: "write"
    },
    {
      value: "acl:Control",
      label: "control"
    },
    {
      value: "acl:Append",
      label: "append"
    }
  ]

  //data[indexOfData].usrData
  const saveNewData = (dataBlock) => {

    if (id !== "" && actor !== "", mode.length > 0) {
      let mainIndex = dataBlock[indexOfData].usrData.findIndex((obj => obj.id == childrenElements.id));
      let thisElementIndex = dataBlock[indexOfData].usrData[mainIndex].children.findIndex((obj => obj.id === idToEdit));
      dataBlock[indexOfData].usrData[mainIndex].children[thisElementIndex] = { id: id, actorType: actor, mode: mode };
      setChildrenElemens(dataBlock[indexOfData].usrData[mainIndex])
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
              label={"Actor"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={actor}
              setValue={setActor}
              list={actorTypes}
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
              label={"Aceess Modes"}
              mode={"outlined"}
              visible={showMultiSelectDropDown}
              showDropDown={() => setShowMultiSelectDropDown(true)}
              onDismiss={() => setShowMultiSelectDropDown(false)}
              value={mode}
              setValue={setMode}
              list={accessTypes}
              multiSelect
            />
          </View>
        </View>
      </ScrollView>

    </SafeAreaProvider>
  );
};



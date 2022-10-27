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
import { AnimatedFAB, Appbar, Portal, Text, TextInput,HelperText } from 'react-native-paper';
import uuid from 'react-native-uuid';


export default function EditPolicy({ data, setData, setindexOfData, writeFile, indexOfData, policiesElements, setpoliciesElemens, idToEdit }) {
  const navigate = useNavigate();
  const [showError,setShowError]= React.useState(false);
  const checkMail = (text) => {
    if (/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(text) && text !== "") {
      setShowError(false)
      return true;
    } else {
      setShowError(true)
      return false;
    }
  }

  
  const mainIndex = data[indexOfData].resources.findIndex((obj => obj.id == policiesElements.id));
  const thisElementIndex = data[indexOfData].resources[mainIndex].policies.findIndex((obj => obj.id === idToEdit));
  const currentData = data[indexOfData].resources[mainIndex].policies[thisElementIndex]
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = React.useState(false);
  const [actor, setActor] = React.useState((/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(currentData.actorType))?"acl:singleUser":currentData.actorType);
  const [mode, setMode] = React.useState(","+currentData.mode.join());
  const [id, setId] = React.useState(currentData.id);
  const [text, setText] = React.useState((/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(currentData.actorType))?currentData.actorType.replace('acl:',''):"");
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
    {
      label: "Single user",
      value: "acl:singleUser",
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


  //data[indexOfData].resources
  const modifyData = (dataBlock) => {

    if (id !== "" && actor !== ""&& mode.length > 0) {
      let mainIndex = dataBlock[indexOfData].resources.findIndex((obj => obj.id == policiesElements.id));
      let thisElementIndex = dataBlock[indexOfData].resources[mainIndex].policies.findIndex((obj => obj.id === idToEdit));
      dataBlock[indexOfData].resources[mainIndex].policies[thisElementIndex] = { id: id, actorType: (actor !== "acl:singleUser")?actor:"acl:"+text, mode: mode.split(",").slice(1) };
      setpoliciesElemens(dataBlock[indexOfData].resources[mainIndex])
      setData(dataBlock);
      writeFile(JSON.stringify(dataBlock));
      navigate(-1)
    }
  }

  React.useEffect(() => {
    checkMail(text);
  }, [text]);

  return (
    <SafeAreaProvider>

      <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => { navigate(-1) }} />
        <Appbar.Content title="New Element" />
        {(actor !== "acl:singleUser")?<Appbar.Action icon="check" onPress={() => { modifyData(data) }} />:<Appbar.Action icon="check" onPress={() => { ( checkMail(text))?modifyData(data):console.log("mail not valid") }} />}
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
        {(actor === "acl:singleUser") ? <View style={{
          flexDirection: "row",
          justifyContent: 'center'
        }}>
          <View style={{
            width: '90%',
          }} >
            <TextInput
              label="Email"
              value={text}
              dense={false}
              mode="outlined"
              error={showError}
              onChangeText={text => setText(text)}
            />
            <HelperText type="error" visible={showError}>
              Email address is invalid!
            </HelperText>
          </View>
        </View> : <></>}
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



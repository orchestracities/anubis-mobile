import * as React from 'react';
import { Text } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import DropDown from "react-native-paper-dropdown";
import { TextInput } from 'react-native-paper';
import { Button, Portal, Modal, HelperText } from 'react-native-paper';
import { useNavigate } from "react-router-native";



export default function UserDetection({ data, setData, setindexOfData, writeFile }) {
  const navigate = useNavigate();

  const [text, setText] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [userMail, setuserMail] = React.useState("");
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [showError,setShowError]= React.useState(false);
  const getSavedUsers = (data) => {
    let datamap = []
    for (let thisUser of data) {
      datamap.push({ label: thisUser.usrMail, value: thisUser.usrMail })
    }
    return datamap;
  }
  let dropdownValues = getSavedUsers(data);
  const showSelect = () => setVisible(true);
  const hideSelect = () => {
    (userMail !== "" && userMail !== null) ? setText(userMail) : "";
    setVisible(false)
  };


  const saveUser = () => {
    checkMail();
    if (/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(text) && text !== "") {
      if (data.length > 0) {
        let objIndex = data.findIndex((obj => obj.usrMail == text));
        if (objIndex !== -1) {
          setindexOfData(objIndex);
          console.log(objIndex)
          return navigate("/mainPage");
        } else {
          setData([...data, ...[{ usrMail: text, usrData: [] }]])
          writeFile(JSON.stringify([...data, ...[{ usrMail: text, usrData: [] }]]))
          setindexOfData(data.length);
          console.log(data.length)
          return navigate("/mainPage");
        }
      } else {
        setData([...[], ...[{ usrMail: text, usrData: [] }]])
        writeFile(JSON.stringify([...[], ...[{ usrMail: text, usrData: [] }]]))
        setindexOfData(0);
        console.log(0)
        return navigate("/mainPage");
      }
    }
  }


  const checkMail = (text) => {
   
    if (/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(text) && text !== "") { 
      setShowError(false)
    } else {
      setShowError(true)
    }

  }

  React.useEffect(() => {
    checkMail(text);
  }, [text]);

  return (
    <SafeAreaView >
      <Appbar.Header elevated={true}>
      {(visible) ?   <Appbar.BackAction onPress={() => hideSelect()} /> : <Text></Text>}
        <Appbar.Content title="" />
        {(visible) ? <Appbar.Action icon="check" onPress={() => hideSelect()} /> : <Text></Text>}
      </Appbar.Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        {(!visible) ?
          <>
            <View style={{
              flexDirection: "row",
              marginTop: 50,
              marginBottom: 50,
              justifyContent: 'center'
            }}>
              <View style={{
                width: '90%',
              }} >
                <Text variant="displayMedium">Policy Manager</Text>
              </View>
            </View>
            <View style={{
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
                  onChangeText={text =>  setText(text)}
                />
                <HelperText type="error" visible={showError}>
                  Email address is invalid!
                </HelperText>
              </View>
            </View>
            {(data.length > 0) ?
              <Button mode="text" onPress={() => showSelect()}>
                I have already setted my email
              </Button> :
              <Text></Text>
            }
            <View style={{
              flexDirection: "row",
              marginTop: 50,
              marginBottom: 50,
              justifyContent: 'center'
            }}>
              <View style={{
                width: '90%',
              }} >
                <Button mode="contained" onPress={() => saveUser()}>
                  Enter
                </Button>
              </View>
            </View>
          </>
          :
          <>
            <View style={{
              flexDirection: "row",
              marginTop: 50,
              marginBottom: 50,
              justifyContent: 'center'
            }}>
              <View style={{
                width: '90%',
              }} >
                <Text variant="displayMedium">Your Email</Text>
              </View>
            </View>
            <View style={{
              flexDirection: "row",
              justifyContent: 'center'
            }}>
              <View style={{
                width: '90%',
              }} >
                <DropDown
                  label={"userMail"}
                  mode={"outlined"}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={userMail}
                  setValue={setuserMail}
                  list={dropdownValues}
                />
              </View>
            </View>
          </>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

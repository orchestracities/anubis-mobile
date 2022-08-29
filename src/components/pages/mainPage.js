import React from 'react';
import {
  StyleProp,
  ViewStyle,
  Animated,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
  I18nManager,
  View
} from 'react-native';
import { AnimatedFAB, Appbar, Portal, Text, Card, Title, Paragraph, Badge, TouchableRipple } from 'react-native-paper';
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },

});

export default function MainPage({ data, setData, writeFile, indexOfData, childrenElements, setChildrenElemens, setIdToEdit }) {
  const [isExtended, setIsExtended] = React.useState(true);
  const [idPressed, setIDpressed] = React.useState("");
  const navigate = useNavigate();

  const isIOS = Platform.OS === 'ios';
  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const toChildrenPage = (children) => {
    setChildrenElemens(children);
    navigate("/children")
  }

  const toElementActions = (id) => {
    (idPressed === id) ? setIDpressed("") : setIDpressed(id);
  }

  const deleteElement = (dataBlock) => {
    let objIndex = dataBlock[indexOfData].usrData.findIndex((obj => obj.id === idPressed));
    dataBlock[indexOfData].usrData.splice(objIndex, 1);
    setIDpressed("")
    setData(dataBlock);
    writeFile(JSON.stringify(dataBlock));
  }

  const editElement = () => {
    setIdToEdit(idPressed);
    navigate("/mainPage/editElement")
  }

  const checkPress = (elementID) => {
    if (idPressed === elementID) {
      return { backgroundColor: "grey" }
    } else { return 0 }
  }

  console.log(data[indexOfData].usrData)
  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        <Appbar.Header elevated={true}>
          <Appbar.Content title="" />
          {
            (idPressed !== "") ? <><Appbar.Action icon="border-color" onPress={() => { editElement() }} />
              <Appbar.Action icon="delete" onPress={() => { deleteElement(data) }} /></> : <></>
          }
        </Appbar.Header>

        <ScrollView onScroll={onScroll}>
          <View style={{
            flexDirection: "row",
            marginTop: 50,
            marginBottom: 50,
            justifyContent: 'center'
          }}>
            <View style={{
              width: '90%',
            }} >
              <Text variant="displayMedium">Home</Text>
            </View>
          </View>

          {data[indexOfData].usrData.map((thisUsrData, index) => (
            <View style={{
              flexDirection: "row",
              justifyContent: 'center'
            }}>
              <View style={{
                width: '97%',
              }} >
                <Card
                key={index}
                  onLongPress={() => toElementActions(thisUsrData.id)}
                  onPress={() => toChildrenPage(thisUsrData)}
                  type={"contained"}
                  elevation={3}
                  style={checkPress(thisUsrData.id)}>
                  <Card.Content>
                    <Paragraph>{thisUsrData.id}</Paragraph>
                    <Text variant="labelMedium">{thisUsrData.description}</Text>
                  </Card.Content>
                  <Card.Actions>
                    <Badge>{thisUsrData.children.length}</Badge>
                  </Card.Actions>
                </Card>
              </View>
            </View>
          ))}
        </ScrollView>
        <AnimatedFAB
          icon={'plus'}
          label={'New Data'}
          extended={isExtended}
          onPress={() => navigate("/mainPage/newElement")}
          visible={true}
          animateFrom={'right'}
          iconMode={'automatic'}
          variant={'secondary'}
          style={[styles.fabStyle]}
        />
      </Portal>
    </SafeAreaView >
  );
};




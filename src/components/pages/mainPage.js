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
import { AnimatedFAB, Appbar, Portal, Text, Card, Title, Paragraph, Badge, TextInput } from 'react-native-paper';
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

  const [openSearch, setOpenSearch] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [elementsDisplayed, setElementsDisplayed] = React.useState(data[indexOfData].usrData);

const filterElements=(value)=>{
  let result = data[indexOfData].usrData.filter(i => i.id.toLowerCase().includes(value.toLowerCase())||i.description.toLowerCase().includes(value.toLowerCase()));
  setElementsDisplayed(result);
}

React.useEffect(() => {
  filterElements(search);
}, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        <Appbar.Header elevated={true}>
          {
            (idPressed !== "") ? <><Appbar.Action icon="border-color" onPress={() => { editElement() }} />
              <Appbar.Action icon="delete" onPress={() => { deleteElement(data) }} /></> : <></>
          }

          {
            (!openSearch)? <Appbar.Action icon="magnify" onPress={() => { setOpenSearch(true) }} />:<></>
          }
         {
          (openSearch)?
            <View style={{
              width: '100%',
            }} >
              <TextInput
                mode="flat"
                outlineColor={"#43ff6400"}
                selectionColor={'#8086ba'}
                underlineColor={"#43ff6400"}
                autoFocus={true}
                activeUnderlineColor={"#43ff6400"}
                activeOutlineColor={"#43ff6400"}
                style={{borderRadius: 20}}
                theme={{ roundness: 20 }} 
                onChangeText={value =>  setSearch(value)}
               
                left={<TextInput.Icon icon="arrow-left" onPress={()=>{setOpenSearch(false)}}/>}
              />
            </View>:<></>
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

          {elementsDisplayed.map((thisUsrData, index) => (
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




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
import { AnimatedFAB, Appbar, Portal, Text, Card, Snackbar, Paragraph, Badge, TextInput } from 'react-native-paper';
import { useNavigate } from "react-router-native";
import axios from 'axios';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
  height: {
    minHeight: 1000
  }

});

export default function MainPage({ data, firstLoad, writeFile, indexOfData, setindexOfData, setpoliciesElemens, setIdToEdit }) {
  const [snackbar, setSnackbar] = React.useState(false);
  const [dataFeedback, setDataFeedback] = React.useState(false);
  const onDismissSnackBar = () => setSnackbar(false);
  const [isExtended, setIsExtended] = React.useState(true);
  const [idPressed, setIDpressed] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [elementsDisplayed, setElementsDisplayed] = React.useState(data[indexOfData].resources);
  const [parentElement, setParentElement] = React.useState(data[indexOfData]);
  const navigate = useNavigate();

  const isIOS = Platform.OS === 'ios';
  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const topoliciesPage = (policies) => {
    setpoliciesElemens(policies);
    navigate("/policies")
  }

  const toElementActions = (id) => {
    (idPressed === id) ? setIDpressed("") : setIDpressed(id);
  }

  const deleteElement = (dataBlock) => {
    let objIndex = dataBlock[indexOfData].resources.findIndex((obj => obj.id === idPressed));
    dataBlock[indexOfData].resources.splice(objIndex, 1);
    setIDpressed("")
    writeFile(JSON.stringify(dataBlock));
    setElementsDisplayed(dataBlock[indexOfData].resources)
    setParentElement(dataBlock[indexOfData])
  }

  const updateData = (dataBlock, newData) => {
    dataBlock[indexOfData] = newData;
    writeFile(JSON.stringify(dataBlock));
    setElementsDisplayed(dataBlock[indexOfData].resources)
    setParentElement(dataBlock[indexOfData])
    setLoader(false);
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


  const filterElements = (value) => {
    let result = data[indexOfData].resources.filter(i => i.id.toLowerCase().includes(value.toLowerCase()) || i.resource_type.toLowerCase().includes(value.toLowerCase()));
    setElementsDisplayed(result);
  }

  React.useEffect(() => {
    filterElements(search);
  }, [search]);


  const syncData = () => {
    console.log("DATATOSEND:" + JSON.stringify(parentElement))
    setLoader(true);
    axios
      .post("http://192.168.1.171:8099/mobile/policies", parentElement)
      .then(() => {
        setLoader(false);
        setDataFeedback("the data is updated")
        setSnackbar(true)
      })
      .catch((e) => {
        setDataFeedback(e)
        setSnackbar(true)
      });
  };

  const getSynchedData = () => {
    console.log("DATATOSEND:" + JSON.stringify(parentElement))
    setLoader(true);
    axios
      .get("http://192.168.1.171:8099/mobile/policies", {
        headers: {
          user: parentElement.user,
        }
      })
      .then((response) => {
        console.log("RETRIVED:" + JSON.stringify(response.data))
        updateData(data, response.data)
      })
      .catch((e) => {
        console.log(e)
      });
  };

  React.useEffect(() => {
    (firstLoad) ? getSynchedData() : "";
  }, []);

  const toMainMenu=()=>{
    navigate(-1);
    setindexOfData(-1)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        <Appbar.Header elevated={true}>
          {
            (idPressed !== "") ? <><Appbar.Action icon="border-color" onPress={() => { editElement() }} />
              <Appbar.Action icon="delete" onPress={() => { deleteElement(data) }} /></> : <Appbar.BackAction onPress={() => { toMainMenu() }} />
          }

          {
            (openSearch) ?
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
                  style={{ borderRadius: 20 }}
                  theme={{ roundness: 20 }}
                  onChangeText={value => setSearch(value)}
                  value={search}
                  left={<TextInput.Icon icon="arrow-left" onPress={() => { setOpenSearch(false) }} />}
                />
              </View> : <></>
          }
          <Appbar.Content />
          {(!loader) ? <Appbar.Action icon="sync" onPress={() => { syncData() }} /> : <ActivityIndicator animating={loader} color={MD2Colors.blue800} />}
          {
            (!openSearch && idPressed === "") ? <Appbar.Action icon="magnify" onPress={() => { setOpenSearch(true) }} /> : <></>
          }
        </Appbar.Header>
        <ScrollView onScroll={onScroll} >
          <View style={{
            minHeight: 800
          }}>
            <View style={{
              flexDirection: "row",
              marginTop: 50,
              marginBottom: 50,
              justifyContent: 'center',
            }}>
              <View style={{
                width: '90%',
              }} >
                <Text variant="displayMedium">Home</Text>
              </View>
            </View>
            {elementsDisplayed.map((thisresources, index) => (
              <View style={{
                flexDirection: "row",
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <View style={{
                  width: '97%',
                }} >
                  <Card
                    key={index}
                    onLongPress={() => toElementActions(thisresources.id)}
                    onPress={() => topoliciesPage(thisresources)}
                    type={"contained"}
                    elevation={3}
                    style={checkPress(thisresources.id)}>
                    <Card.Content>
                      <Paragraph>{thisresources.id}</Paragraph>
                      <Text variant="labelMedium">{thisresources.resource_type}</Text>
                    </Card.Content>
                    <Card.Actions>
                      <Badge>{thisresources.policies.length}</Badge>
                    </Card.Actions>
                  </Card>
                </View>
              </View>
            ))}
          </View>
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
          <Snackbar
            visible={snackbar}
            onDismiss={onDismissSnackBar}
            duration={3000}
            elevation={1}
            action={{
              label: 'Undo',
              onPress: () => {
                onDismissSnackBar
              },
            }}>
            {dataFeedback}
          </Snackbar>
      </Portal>
    
    </SafeAreaView >
  );
};




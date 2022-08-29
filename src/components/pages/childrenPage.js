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
import { AnimatedFAB, Appbar, Portal, Text, Card, Title, Paragraph, Badge, DataTable } from 'react-native-paper';
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

const numberOfItemsPerPageList = [2, 3, 4];

const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
];
export default function ChildrenPage({ data, setData, writeFile, indexOfData, childrenElements, setChildrenElemens,setIdToEdit }) {
    const [isExtended, setIsExtended] = React.useState(true);
    const [idPressed, setIDpressed] = React.useState("");
    const navigate = useNavigate();

    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);
    React.useEffect(() => {
        setPage(0);
     }, [numberOfItemsPerPage]);


    const isIOS = Platform.OS === 'ios';
    const onScroll = ({ nativeEvent }) => {
        const currentScrollPosition =
            Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

        setIsExtended(currentScrollPosition <= 0);
    };

 

    const toElementActions = (id) => {
        (idPressed === id) ? setIDpressed("") : setIDpressed(id);
    }

    const checkPress = (elementID) => {
        if (idPressed === elementID) {
            return { backgroundColor: "grey" }
        } else { return 0 }
    }
    
    const deleteElement = (dataBlock) => {
        let mainIndex = dataBlock[indexOfData].usrData.findIndex((obj => obj.id == childrenElements.id));
        let thisElementIndex = dataBlock[indexOfData].usrData[mainIndex].children.findIndex((obj => obj.id === idPressed));
        dataBlock[indexOfData].usrData[mainIndex].children.splice(thisElementIndex, 1);
        setChildrenElemens(dataBlock[indexOfData].usrData[mainIndex])
        setIDpressed("")
        setData(dataBlock);
        writeFile(JSON.stringify(dataBlock));
    }

    const editElement = () => {
        setIdToEdit(idPressed);
        navigate("/children/editElement")
      }

    return (
        <SafeAreaView style={styles.container}>
            <Portal>
                <Appbar.Header elevated={true}>
                <Appbar.BackAction onPress={() => {navigate(-1)}} />
                    <Appbar.Content title={childrenElements.id} />
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
                            <Text variant="displayMedium">Policies</Text>
                        </View>
                    </View>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>ID</DataTable.Title>
                            <DataTable.Title >Actor</DataTable.Title>
                            <DataTable.Title >Mode</DataTable.Title>
                        </DataTable.Header>

                        {childrenElements.children.map((thisUsrData, index) => (
                            <DataTable.Row   key={index}  onLongPress={() => toElementActions(thisUsrData.id)}
                            onPress={() => console.log("pressed")}     style={checkPress(thisUsrData.id)}>
                                <DataTable.Cell>{thisUsrData.id}</DataTable.Cell>
                                <DataTable.Cell >{thisUsrData.actorType}</DataTable.Cell>
                                <DataTable.Cell >{thisUsrData.mode}.0</DataTable.Cell>
                            </DataTable.Row>
                        ))}

<DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        showFastPaginationControls
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={numberOfItemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        selectPageDropdownLabel={'Rows per page'}
      />
                    </DataTable>

                </ScrollView>
                <AnimatedFAB
                    icon={'plus'}
                    label={'New Policy'}
                    extended={isExtended}
                    onPress={() => navigate("/children/newElement")}
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




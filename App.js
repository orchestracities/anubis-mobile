
import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNFS from 'react-native-fs';
import { NativeRouter, Routes, Link, Route } from "react-router-native";
import UserDetection from './src/components/login/userDetection'
import MainPage from './src/components/pages/mainPage'
import NewMain from './src/components/forms/newMainElement'
import ChildrenPage from './src/components/pages/childrenPage';
import NewChild from './src/components/forms/newChild';
import EditMain from './src/components/forms/editMainElement';
import EditChild from './src/components/forms/editChild';
export default function App() {

  const path = RNFS.DocumentDirectoryPath + '/anubisData.json';
  const [data, setData] = React.useState([]);
  const [indexOfData, setindexOfData] = React.useState(-1);
  const [childrenElements, setChildrenElemens] = React.useState([]);
  const [idToEdit, setIdToEdit] = React.useState("")
  const [updator, setUpdator] = React.useState(Math.random())
  // write the file

  const readFile = async () => {
    RNFS.readFile(path)
      .then((data) => {
        console.log("READ: " + data)
        setData(JSON.parse(data));
      })
      .catch((err) => {
        console.log(err.message);
        writeFile(path, '[]')
      });
  };

  const writeFile = async (data) => {
    RNFS.writeFile(path, data, 'utf8')
      .then(() => {
        console.log('FILE created ' + data);
       let newData=JSON.parse(data)
       setData(newData);
        setUpdator(Math.random());
      })
      .catch((err) => {
        console.log(err.message);
      });
  };



  React.useEffect(() => {
    readFile();
  }, []);

  return (
    <SafeAreaProvider>
      <NativeRouter>
        <SafeAreaView >
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
          >

            <Routes>
              <Route exact path="/" element={<UserDetection data={data} setData={setData} setindexOfData={setindexOfData} writeFile={writeFile}></UserDetection>} />
              <Route
                exact
                path="/mainPage"
                element={
                  <MainPage
                    data={data} 
                    setData={setData} 
                    setindexOfData={setindexOfData} 
                    writeFile={writeFile} 
                    indexOfData={indexOfData} 
                    setChildrenElemens={setChildrenElemens} 
                    setIdToEdit={setIdToEdit}/>
                    } 
                    />
              <Route exact path="/mainPage/newElement" element={<NewMain data={data} setData={setData} setindexOfData={setindexOfData} writeFile={writeFile} indexOfData={indexOfData} ></NewMain>} />
              <Route exact path="/mainPage/editElement" element={<EditMain data={data} setData={setData} writeFile={writeFile} indexOfData={indexOfData} idToEdit={idToEdit}></EditMain>} />

              <Route exact path="/children" element={<ChildrenPage data={data} setData={setData} writeFile={writeFile} indexOfData={indexOfData} childrenElements={childrenElements} setChildrenElemens={setChildrenElemens}  setIdToEdit={setIdToEdit}></ChildrenPage>} />
              <Route exact path="/children/newElement" element={<NewChild data={data} setData={setData} writeFile={writeFile} indexOfData={indexOfData} childrenElements={childrenElements} setChildrenElemens={setChildrenElemens}></NewChild>} />
              <Route exact path="/children/editElement" element={<EditChild data={data} setData={setData} writeFile={writeFile} indexOfData={indexOfData} childrenElements={childrenElements} setChildrenElemens={setChildrenElemens} idToEdit={idToEdit}></EditChild>} />

            </Routes>

          </ScrollView>
        </SafeAreaView>
      </NativeRouter>
    </SafeAreaProvider>
  );
};


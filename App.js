
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
import PoliciesPage from './src/components/pages/policiesPage';
import NewPolicy from './src/components/forms/newPolicy';
import EditMain from './src/components/forms/editMainElement';
import EditPolicy from './src/components/forms/editPolicy';
export default function App() {

  const path = RNFS.DocumentDirectoryPath + '/anubisData.json';
  const [data, setData] = React.useState([]);
  const [indexOfData, setindexOfData] = React.useState(-1);
  const [policiesElements, setpoliciesElemens] = React.useState([]);
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
                    setpoliciesElemens={setpoliciesElemens} 
                    setIdToEdit={setIdToEdit}/>
                    } 
                    />
              <Route exact path="/mainPage/newElement" element={<NewMain data={data} setData={setData} setindexOfData={setindexOfData} writeFile={writeFile} indexOfData={indexOfData} ></NewMain>} />
              <Route exact path="/mainPage/editElement" element={<EditMain data={data} setData={setData} writeFile={writeFile} indexOfData={indexOfData} idToEdit={idToEdit}></EditMain>} />

              <Route exact path="/policies" element={<PoliciesPage data={data} setData={setData} writeFile={writeFile} indexOfData={indexOfData} policiesElements={policiesElements} setpoliciesElemens={setpoliciesElemens}  setIdToEdit={setIdToEdit}></PoliciesPage>} />
              <Route exact path="/policies/newElement" element={<NewPolicy data={data} setData={setData} writeFile={writeFile} indexOfData={indexOfData} policiesElements={policiesElements} setpoliciesElemens={setpoliciesElemens}></NewPolicy>} />
              <Route exact path="/policies/editElement" element={<EditPolicy data={data} setData={setData} writeFile={writeFile} indexOfData={indexOfData} policiesElements={policiesElements} setpoliciesElemens={setpoliciesElemens} idToEdit={idToEdit}></EditPolicy>} />

            </Routes>

          </ScrollView>
        </SafeAreaView>
      </NativeRouter>
    </SafeAreaProvider>
  );
};


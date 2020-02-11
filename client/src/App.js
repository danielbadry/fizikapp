import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
//import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import MainContainer from "./components/MainContainer";
//import { BrowserRouter, Route, Link } from "react-router-dom";
//import SignUp from './components/SignUp2';
// import 'react-checkbox-tree/lib/react-checkbox-tree.css';

am4core.useTheme(am4themes_animated);
export default function App() {

  return (
    <MainContainer />
    // <BrowserRouter>
      // <Route path="/" exact component={MiniDrawer} />
      // <Route path="/signup" component={SignUp} />
    // </BrowserRouter>
  );
}

import React from 'react';
import Routs from './Routs';
import './font-style.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
export default function App() {

  return (
    <Routs />
  );
}

import React, { Component } from 'react';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { GET_LIST, withDataProvider } from 'react-admin';
import PropTypes from 'prop-types';

am4core.useTheme(am4themes_animated);

class LocationSensitive extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    
/**
 * This demo uses our own method of determining user's location
 * It is not public web service that you can use
 * You'll need to find your own. We recommend http://www.maxmind.com
 */
    let geo = {
        "country_code": "IR",
        "country_name": "iran"
    }

    let defaultMap = "usaAlbersLow";
    let countryMaps = {
      "IR": [ "iran" ],
      "AL": [ "albaniaLow" ],
      "DZ": [ "algeriaLow" ],
      "AD": [ "andorraLow" ],
      "AO": [ "angolaLow" ],
      "AR": [ "argentinaLow" ],
      "AM": [ "armeniaLow" ],
      "AU": [ "australiaLow" ],
      "AT": [ "austriaLow" ],
      "AZ": [ "azerbaijanLow" ],
      "BH": [ "bahrainLow" ],
      "BD": [ "bangladeshLow" ],
      "BY": [ "belarusLow" ],
      "BE": [ "belgiumLow" ],
      "BZ": [ "belizeLow" ],
      "BM": [ "bermudaLow" ],
      "BT": [ "bhutanLow" ],
      "BO": [ "boliviaLow" ],
      "BW": [ "botswanaLow" ],
      "BR": [ "brazilLow" ],
      "BN": [ "bruneiDarussalamLow" ],
      "BG": [ "bulgariaLow" ],
      "BF": [ "burkinaFasoLow" ],
      "BI": [ "burundiLow" ],
      "KH": [ "cambodiaLow" ],
      "CM": [ "cameroonLow" ],
      "CA": [ "canandaLow" ],
      "CV": [ "capeVerdeLow" ],
      "CF": [ "centralAfricanRepublicLow" ],
      "TD": [ "chadLow" ],
      "CL": [ "chileLow" ],
      "CN": [ "chinaLow" ],
      "CO": [ "colombiaLow" ],
      "CD": [ "congoDRLow" ],
      "CG": [ "congoLow" ],
      "CR": [ "costaRicaLow" ],
      "HR": [ "croatiaLow" ],
      "CZ": [ "czechRepublicLow" ],
      "DK": [ "denmarkLow" ],
      "DJ": [ "djiboutiLow" ],
      "DO": [ "dominicanRepublicLow" ],
      "EC": [ "ecuadorLow" ],
      "EG": [ "egyptLow" ],
      "SV": [ "elSalvadorLow" ],
      "EE": [ "estoniaLow" ],
      "SZ": [ "eswatiniLow" ],
      "FO": [ "faroeIslandsLow" ],
      "FI": [ "finlandLow" ],
      "FR": [ "franceLow" ],
      "GF": [ "frenchGuianaLow" ],
      "GE": [ "georgiaLow" ],
      "DE": [ "germanyLow" ],
      "GR": [ "greeceLow" ],
      "GL": [ "greenlandLow" ],
      "GN": [ "guineaLow" ],
      "HN": [ "hondurasLow" ],
      "HK": [ "hongKongLow" ],
      "HU": [ "hungaryLow" ],
      "IS": [ "icelandLow" ],
      "IN": [ "indiaLow" ],
      "GB": [ "ukLow" ],
      "IE": [ "irelandLow" ],
      "IL": [ "israelLow" ],
      "PS": [ "palestineLow" ],
      "MT": [ "italyLow" ],
      "SM": [ "italyLow" ],
      "VA": [ "italyLow" ],
      "IT": [ "italyLow" ],
      "JP": [ "japanLow" ],
      "MX": [ "mexicoLow" ],
      "RU": [ "russiaCrimeaLow" ],
      "KR": [ "southKoreaLow" ],
      "ES": [ "spainLow" ],
      "US": [ "usaAlbersLow" ]
    };
    
    // calculate which map to be used
    let currentMap = defaultMap;
    let title = "";
    if ( countryMaps[ geo.country_code ] !== undefined ) {
      currentMap = countryMaps[ geo.country_code ][ 0 ];
  
      // add country title
      if ( geo.country_name ) {
        title = geo.country_name;
      }
  
    }
    
    // Create map instance
    let chart = am4core.create("LocationSensitive", am4maps.MapChart);
    
    chart.titles.create().text = title;
  
    // Set map definition
    chart.geodataSource.url = "https://raw.githubusercontent.com/n4cr/iran-geojson/master/iran_geo.json";
    chart.geodataSource.events.on("parseended", function(ev) {
      let data = [];
      for(var i = 0; i < ev.target.data.features.length; i++) {
        data.push({
          id: ev.target.data.features[i].id,
          value: Math.round( Math.random() * 10000 )
        })
      }
      polygonSeries.data = data;
    })
  
    // Set projection
    chart.projection = new am4maps.projections.Mercator();
  
    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  
    //Set min/max fill color for each area
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: chart.colors.getIndex(1).brighten(1),
      max: chart.colors.getIndex(1).brighten(-0.3)
    });
  
    // Make map load polygon data (state shapes and names) from GeoJSON
    polygonSeries.useGeodata = true;
  
    // Set up heat legend
    let heatLegend = chart.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.align = "right";
    heatLegend.width = am4core.percent(25);
    heatLegend.marginRight = am4core.percent(4);
    heatLegend.minValue = 0;
    heatLegend.maxValue = 40000000;
    heatLegend.valign = "bottom";
  
    // Set up custom heat map legend labels using axis ranges
    let minRange = heatLegend.valueAxis.axisRanges.create();
    minRange.value = heatLegend.minValue;
    minRange.label.text = "Little";
    let maxRange = heatLegend.valueAxis.axisRanges.create();
    maxRange.value = heatLegend.maxValue;
    maxRange.label.text = "A lot!";
  
    // Blank out internal heat legend value axis labels
    heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function(labelText) {
      return "";
    });
  
    // Configure series tooltip
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;
  
    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(1).brighten(-0.5);
    


  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="LocationSensitive" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

LocationSensitive.propTypes = {
  dataProvider: PropTypes.func.isRequired,
};
export default withDataProvider(LocationSensitive);

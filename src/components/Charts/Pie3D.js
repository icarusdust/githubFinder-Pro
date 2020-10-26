// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

import {GithubContext} from '../../context/context'

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 3 - Creating the JSON object to store the chart configurations



// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const pie3D = ({data}) => {

  const chartConfigs = {
    type: "pie3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Languages",
        pieRadius:"45%",
        //Set the theme for your chart
        theme: "fusion",
        captionPadding:45,
        theme:"fusion"

      },
      // Chart Data
      data
    }
  }; 
    return (<ReactFC {...chartConfigs} />);

}

export default pie3D;
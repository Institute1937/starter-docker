import * as d3 from 'd3v4'; 

// Set size of chart and bar padding
var w = 500;
var h = 400;
var padding = 2;

// Function for building a bar chart
function buildBarChart(data){
    // Remove any existing svg
    d3.select("svg").remove();
    
    // Append the main svg for the chart to the page
    var svg = d3.select("body")
                .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    // Append the bars to the chart
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
        // Add a numbered class to each bar
        .attr("class", function(d){ return (".band".concat(d.band)); })  
        .classed(".bar", true)
        .attr("x", function(d, i){ return (i * (w / data.length));})
        .attr("y", function(d){ return (h - (d.amount[0] * h) / 10);}) // Vertical scale fixed
        .attr("width", w / data.length - padding)
        .attr("height", function(d){ return (d.amount[0] * h / 10);})
        .style("fill", "seagreen");

    // Animate the chart
    animateChart(data);
}

function animateChart(data){
    var svg = d3.select("svg")

    // Grab all the rectangles and change them to purple
    svg.selectAll("rect")
      .data(data)
        .transition()
        .style("fill", "purple");
}


// Import the frequency data from freq-data.json
d3.json("/js/freq-data.json", function(error, data){
    if(error){
        console.log(error);
    } 
    else{
        var freqs = data.tvaryingFreqSpec;
        buildBarChart(freqs);
    }
});

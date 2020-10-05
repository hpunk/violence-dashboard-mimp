
import * as d3 from 'd3';

const draw = (props) => {

    let width = props.width;
    let height = props.height;
    let id = props.id;
    let markers = props.bubbles;
    let provincia = props.provincia;

    // The svg
    let svg = d3.select("#"+id)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    // Map and projection
    let projection = d3.geoMercator()
        .center([-13.4488, -72.7728])                // GPS of location to zoom on
        .scale(400)                       // This is like the zoom
        .translate([ width/2, height/2 ]);
    console.log("hola2")

// Load external data and boot
d3.json("./peru_provincial_simple.geojson", function(data){
    console.log("hola");
    console.log(data);
    // Filter data
    data.features = data.features.filter( function(d){return d.properties.FIRST_IDPR===provincia} )

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
          .attr("fill", "#b8b8b8")
          .attr("d", d3.geoPath()
              .projection(projection)
          )
        .style("stroke", "black")
        .style("opacity", .3)

    // create a tooltip
    var Tooltip = d3.select("#"+id)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 1)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      Tooltip.style("opacity", 1)
    }
    var mouseleave = function(d) {
      Tooltip.style("opacity", 0)
    }

    // Add circles:
    svg
      .selectAll("myCircles")
      .data(markers)
      .enter()
      .append("circle")
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", 14)
        .attr("class", "circle")
        .style("fill", "69b3a2")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3)
        .attr("fill-opacity", .4)
      .on("mouseover", mouseover)
      .on("mouseleave", mouseleave)
});
}
export default draw;
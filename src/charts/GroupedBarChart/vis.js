
import * as d3 from 'd3';

const draw = (props) => {
    const id = props.id;
    const width = props.width;
    const height = props.height;
    const data = props.data;

    let margin = {top: 20, right: 20, bottom: 30, left: 40};

    const x0 = d3.scaleBand().domain().rangeRound().padding([0, width], .1);

    let x1 = d3.scaleOrdinal();

    let y = d3.scaleLinear()
        .range([height, 0]);

    let xAxis = d3.svg.axis()
        .scale(x0)
        .tickSize(0)
        .orient("bottom");

    let yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    const color = d3.scaleOrdinal()
        .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);

    let svg = d3.select('.'+id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var categoriesNames = data.map(function(d) { return d.categorie; });
      var rateNames = data[0].values.map(function(d) { return d.rate; });

      x0.domain(categoriesNames);
      x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);
      y.domain([0, d3.max(data, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .style('opacity','0')
          .call(yAxis)
      .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .style('font-weight','bold')
          .text("Value");

      svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

      var slice = svg.selectAll(".slice")
          .data(data)
          .enter().append("g")
          .attr("class", "g")
          .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; });

      slice.selectAll("rect")
          .data(function(d) { return d.values; })
      .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.rate); })
          .style("fill", function(d) { return color(d.rate) })
          .attr("y", function(d) { return y(0); })
          .attr("height", function(d) { return height - y(0); })
          .on("mouseover", function(d) {
              d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
          })
          .on("mouseout", function(d) {
              d3.select(this).style("fill", color(d.rate));
          });

      slice.selectAll("rect")
          .transition()
          .delay(function (d) {return Math.random()*1000;})
          .duration(1000)
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); });

      //Legend
      var legend = svg.selectAll(".legend")
          .data(data[0].values.map(function(d) { return d.rate; }).reverse())
      .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
          .style("opacity","0");

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", function(d) { return color(d); });

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) {return d; });

      legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

}
export default draw;
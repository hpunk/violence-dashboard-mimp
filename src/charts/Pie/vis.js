
import * as d3 from 'd3';

import * as d3color from 'd3-scale-chromatic';
const {schemeSet3} = d3color;
const {event, schemeCategory20b} = d3;
const draw = (props) => {
    const dataset = props.data;
    const width = props.width;
    const height = props.height;
    const id = props.id;
    const radius = Math.min(width, height) / 2;
    const legendRectSize = 25;
    const legendSpacing = 6; 
    console.log(schemeCategory20b);
    let color = d3.scaleOrdinal(schemeSet3);

    let svg = d3.select('.'+id)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g') 
    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    let arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

    let pie = d3.pie()
    .value(function(d) { return d.count; })
    .sort(null);


    let tooltip = d3.select('.'+id)
    .append('div')                          
    .attr('class', 'tooltip');

    tooltip.append('div')                          
    .attr('class', 'label');         

    tooltip.append('div')                    
    .attr('class', 'count');               

    tooltip.append('div') 
    .attr('class', 'percent');

    dataset.forEach(function(d) {
    d.count = +d.count;
    d.enabled = true;
    });

    let path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d) { return color(d.data.label); })
    .each(function(d) { return this._current - d; });


    path.on('mouseover', function(d) {    
    let total = d3.sum(dataset.map(function(d) {     
    return (d.enabled) ? d.count : 0; 
    }));                                                      
    let percent = Math.round(1000 * d.data.count / total) / 10;
    tooltip.select('.label').html(d.data.label);        
    tooltip.select('.count').html('$' + d.data.count);          
    tooltip.select('.percent').html(percent + '%');      
    tooltip.style('display', 'block');                   
    });                                                           

    path.on('mouseout', function() {                      
    tooltip.style('display', 'none');
    });

    path.on('mousemove', function(d) {                
    tooltip.style('top', (event.layerY + 10) + 'px')
        .style('left', (event.layerX + 10) + 'px');
    });

    let legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(_, i) {                   
        let height = legendRectSize + legendSpacing;
        let offset =  height * color.domain().length / 2; 
        let horz = 18 * legendRectSize;
        let vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';     
    });

    legend.append('rect')                                 
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)                     
    .style('fill', color)
    .style('stroke', color)
    .on('click', function(label) {
        let rect = d3.select(this); 
        let enabled = true;
        let totalEnabled = d3.sum(dataset.map(function(d) { 
        return (d.enabled) ? 1 : 0;
        }));

        if (rect.attr('class') === 'disabled') { 
        rect.attr('class', '');
        } else {
        if (totalEnabled < 2) return;
        rect.attr('class', 'disabled');
        enabled = false;
        }

        pie.value(function(d) { 
        if (d.label === label) d.enabled = enabled;
            return (d.enabled) ? d.count : 0;
        });

        path = path.data(pie(dataset));
        path.transition()
        .duration(750)
        .attrTween('d', function(d) {
            let interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
            return arc(interpolate(t));
            };
        });
    });


    legend.append('text')                                    
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d) { return d; }); // return label
}

export default draw;
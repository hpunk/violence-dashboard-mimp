import * as d3 from 'd3';
import {nest} from 'd3-collection';


const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 }
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

class ViolenceTypesBarChart {
	constructor(element, data ) {
        let vis = this;
        

		vis.update(data);
	}

	update(data) {
		let vis = this;

		
	}
}

export default ViolenceTypesBarChart;
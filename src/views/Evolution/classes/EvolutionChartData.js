import EvolutionGenderData from './EvolutionGenderData';

export default class EvolutionChartData {
    constructor() {
        this.dates = [];
        this.man_victim = new EvolutionGenderData();
        this.woman_victim = new EvolutionGenderData();
        this.total_victim = new EvolutionGenderData();
    }

    getGrouped(){
        return {
            dates: this.dates,
            man_victim : this.man_victim.getGroupedData(),
            woman_victim : this.woman_victim.getGroupedData(),
            total_victim : this.total_victim.getGroupedData(),
        }
    }
}
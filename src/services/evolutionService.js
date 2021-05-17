export default class EvolutionService {
    /*filterChartData = filter => {
        let data = [];
        for(let i =0;i<96;i++){
            data.push({
                date: 'fecha correcta',
                man_physical_violence: Math.floor(Math.random() * 70),
                man_psychological_violence: Math.floor(Math.random() * 70),
                man_economical_violence: Math.floor(Math.random() * 70),
                man_sexual_violence: Math.floor(Math.random() * 70),
                man_first_time: Math.floor(Math.random() * 70),
                man_aggr_alcohol: Math.floor(Math.random() * 70),
                man_aggr_drugs: Math.floor(Math.random() * 70),
                man_vict_alcohol: Math.floor(Math.random() * 70),
                man_vict_drugs: Math.floor(Math.random() * 70),
                man_vict_lgtbi: Math.floor(Math.random() * 70),
                man_vict_disability: Math.floor(Math.random() * 70),
                man_inf: Math.floor(Math.random() * 70),
                man_nin: Math.floor(Math.random() * 70),
                man_adol: Math.floor(Math.random() * 70),
                man_jov: Math.floor(Math.random() * 70),
                man_adul: Math.floor(Math.random() * 70),
                man_mayo: Math.floor(Math.random() * 70),
                man_family: Math.floor(Math.random() * 70),
                man_love: Math.floor(Math.random() * 70),
                man_no_relation: Math.floor(Math.random() * 70),
                woman_physical_violence: Math.floor(Math.random() * 70),
                woman_psychological_violence: Math.floor(Math.random() * 70),
                woman_economical_violence: Math.floor(Math.random() * 70),
                woman_sexual_violence: Math.floor(Math.random() * 70),
                woman_first_time: Math.floor(Math.random() * 70),
                woman_aggr_alcohol: Math.floor(Math.random() * 70),
                woman_aggr_drugs: Math.floor(Math.random() * 70),
                woman_vict_alcohol: Math.floor(Math.random() * 70),
                woman_vict_drugs: Math.floor(Math.random() * 70),
                woman_vict_lgtbi: Math.floor(Math.random() * 70),
                woman_vict_disability: Math.floor(Math.random() * 70),
                woman_inf: Math.floor(Math.random() * 70),
                woman_nin: Math.floor(Math.random() * 70),
                woman_adol: Math.floor(Math.random() * 70),
                woman_jov: Math.floor(Math.random() * 70),
                woman_adul: Math.floor(Math.random() * 70),
                woman_mayo: Math.floor(Math.random() * 70),
                woman_family: Math.floor(Math.random() * 70),
                woman_love: Math.floor(Math.random() * 70),
                woman_no_relation: Math.floor(Math.random() * 70),
            });
            
        }
        return Promise.resolve(data);
    }
    */

    filterChartData = filter => {
        const url = `http://localhost:8080/evolution/cases-by-week?startDate=${filter.startDate}&endDate=${filter.endDate}&state=${filter.state}&filterBy=${filter.filterBy}&province=${filter.province}`;
        return fetch(url).then(response => response.json());
    }

    getMapData = filter => {
        const url = `http://localhost:8080/evolution/cases-by-month?startDate=${filter.startDate}&endDate=${filter.endDate}&state=${filter.state}&filterBy=${filter.filterBy}`;
        return fetch(url).then(response => response.json());
    }
/*
    example = filter => {
        const url = `url/traer-algo`;
        return fetch(url).then(response => response.json());
    }}*/
}
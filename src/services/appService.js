export default class AppService {
    searchAPP = filter => {
        const url = `http://52.200.157.158:8080/impact/app?startDate=${filter.startDate}&endDate=${filter.endDate}&state=${filter.state}&province=${filter.province}&district=${filter.district}`;
        return fetch(url).then(response => response.json());
    }

    getViolenceData = filter => {
        const url = `http://52.200.157.158:8080/impact/violence-cases?appDateStart=${filter.appDateStart}&appDateEnd=${filter.appDateEnd}&state=${filter.state}&province=${filter.province}&district=${filter.district}&daysBefore=${filter.daysBefore}&daysAfter=${filter.daysAfter}`;
        return fetch(url).then(response => response.json());
    }

    getPreventiveActionsPerDay = filter => {
        const url = `http://52.200.157.158:8080/impact/app/per-day?startDate=${filter.startDate}&endDate=${filter.endDate}&state=${filter.state}&province=${filter.province}&district=${filter.district}`;
        return fetch(url).then(response => response.json());
    }
/*
    example = filter => {
        const url = `url/traer-algo`;
        return fetch(url).then(response => response.json());
    }}*/
}
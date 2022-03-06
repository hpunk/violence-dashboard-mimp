import { app_evolution_url } from '../config/baseUrls';

export default class AppService {
    searchAPP = filter => {
        const url = `http://${app_evolution_url}/impact/app?startDate=${filter.startDate}&endDate=${filter.endDate}&state=${filter.state}&province=${filter.province}&district=${filter.district}`;
        return fetch(url).then(response => response.json());
    }

    getViolenceData = filter => {
        const url = `http://${app_evolution_url}/impact/violence-cases?appDateStart=${filter.appDateStart}&appDateEnd=${filter.appDateEnd}&state=${filter.state}&province=${filter.province}&district=${filter.district}&daysBefore=${filter.daysBefore}&daysAfter=${filter.daysAfter}`;
        return fetch(url).then(response => response.json());
    }

    getPreventiveActionsPerDay = filter => {
        const url = `http://${app_evolution_url}/impact/app/per-day?startDate=${filter.startDate}&endDate=${filter.endDate}&state=${filter.state}&province=${filter.province}&district=${filter.district}`;
        return fetch(url).then(response => response.json());
    }
/*
    example = filter => {
        const url = `url/traer-algo`;
        return fetch(url).then(response => response.json());
    }}*/
}
import { clustering_url } from '../config/baseUrls';
export default class ClusteringService {
    getClusters = filter => {
        const headers = new Headers({'Access-Control-Allow-Origin': '*'});
        const options = {
            method: 'GET',
            headers: headers,
        };
        const url = `http://${clustering_url}/clustering?st=${filter.state}&pr=${filter.province}&di=${filter.district}&sd=${filter.startDate}&ed=${filter.endDate}&alg=${filter.algorithm}&k=${filter.k}&mins=${filter.mins}&eps=${filter.eps}`;
        return fetch(url,options).then(response => response.json());
    }

    getHierarchichalClusters = filter => {
        const headers = new Headers({'Access-Control-Allow-Origin': '*'});
        const options = {
            method: 'GET',
            headers: headers,
        };
        const url = `http://${clustering_url}/clustering/hierarchical-to-scatter?st=${filter.state}&pr=${filter.province}&di=${filter.district}&sd=${filter.startDate}&ed=${filter.endDate}&k=${filter.k}`;
        return fetch(url,options).then(response => response.json());
    }

    countDataToCluster = filter => {
        const headers = new Headers({'Access-Control-Allow-Origin': '*'});
        const options = {
            method: 'GET',
            headers: headers,
        };
        const url = `http://${clustering_url}/clustering/count?st=${filter.state}&pr=${filter.province}&di=${filter.district}&sd=${filter.startDate}&ed=${filter.endDate}`;
        return fetch(url,options).then(response => response.json());
    }
}
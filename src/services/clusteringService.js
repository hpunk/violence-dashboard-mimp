export default class ClusteringService {
    getClusters = filter => {
        const url = `http://localhost:5000/clustering?st=${filter.state}&pr=${filter.province}&di=${filter.district}&sd=${filter.startDate}&ed=${filter.endDate}&alg=${filter.algorithm}&k=${filter.k}&mins=${filter.mins}&eps=${filter.eps}`;
        return fetch(url).then(response => response.json());
    }

    getHierarchichalClusters = filter => {
        const url = `http://localhost:5000/clustering/hierarchical-to-scatter?st=${filter.state}&pr=${filter.province}&di=${filter.district}&sd=${filter.startDate}&ed=${filter.endDate}&k=${filter.k}`;
        return fetch(url).then(response => response.json());
    }

    countDataToCluster = filter => {
        const url = `http://localhost:5000/clustering/count?st=${filter.state}&pr=${filter.province}&di=${filter.district}&sd=${filter.startDate}&ed=${filter.endDate}`;
        return fetch(url).then(response => response.json());
    }
}
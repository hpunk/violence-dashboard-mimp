export default class AppService {
    searchAPP = filter => {
        return Promise.resolve([
            {code: '111', district:'AMA', province:'weee', state:'lima', type:'Física'},
            {code: '112', district:'rar', province:'hre', state:'lima', type:'Física'},
            {code: '114', district:'gege', province:'foo', state:'lima', type:'Económica'},
        ]);
    }
/*
    example = filter => {
        const url = `url/traer-algo`;
        return fetch(url).then(response => response.json());
    }}*/
}
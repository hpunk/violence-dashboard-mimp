export default class AppService {
    searchAPP = filter => {
        return Promise.resolve([
            {code: '111', district:'AMA', province:'org', state:'Lima', type:'Física'},
            {code: '112', district:'EJE', province:'hre', state:'La Libertad', type:'Física'},
            {code: '114', district:'DSA', province:'foo', state:'Cajamarca', type:'Económica'},
            {code: '115', district:'DEW', province:'hyt', state:'Arequipa', type:'Económica'},
            {code: '116', district:'TRD', province:'nfs', state:'Tacna', type:'Económica'},
            {code: '117', district:'EDS', province:'kub', state:'Loreto', type:'Económica'},
            {code: '118', district:'FSX', province:'fsv', state:'Lima', type:'Económica'},
            {code: '119', district:'GSD', province:'sve', state:'Cajamarca', type:'Económica'},
            {code: '120', district:'WEW', province:'otb', state:'Arequipa', type:'Económica'},
            {code: '121', district:'EET', province:'oyb', state:'Piura', type:'Económica'},
            {code: '122', district:'JTH', province:'ipk', state:'Tumbes', type:'Económica'},
        ]);
    }
/*
    example = filter => {
        const url = `url/traer-algo`;
        return fetch(url).then(response => response.json());
    }}*/
}
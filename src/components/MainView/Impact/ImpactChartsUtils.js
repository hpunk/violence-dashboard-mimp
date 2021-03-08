import React from 'react'
export const AppTableColumns = (selectionFunction) => {
    return [
        {
            title: 'Ver',
            dataIndex: 'selected',
            key: 'selected',
            render: (selected,object) => 
                <input
                    type="checkbox" 
                    id={`selected${object.index}`} 
                    name={`selected${object.index}`} 
                    checked={selected} 
                    onClick={() => selectionFunction(object)} 
                />,
        },
        {
            title: 'Código',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Departamento',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Provincia',
            dataIndex: 'province',
            key: 'province',
        },
        {
            title: 'Distrito',
            dataIndex: 'district',
            key: 'district',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
        },
    ];
}
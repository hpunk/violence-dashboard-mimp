import styled from '@emotion/styled';

export const MapContainer = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
`

export const ChartsContainer = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
`

export const EvolutionContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

export const SingleChartContainer = styled.div`
    width: 95%;
    height: 28%;
    padding-left: 4%;
    display: flex;
`
export const ChartsFilterContainer = styled.div`
    width: 93%;
    height: 10%;
    padding-left: 7%;
    display: flex;
    align-content:'center';
`

export const MapFilterContainer = styled.div`
    width: 98%;
    height: 10%;
    display: flex;
    align-content:'center';
`
export const ChoroplethContainer = styled.div`
    width: 98%;
    height: 90%;
    background-color: 'black';
`

export const EvolutionCardAPP = styled.div`
    flex: none;
    margin: 8px 4px;
    padding: 4px;
    width: ${props => props.width}%;
    border: 2px solid #40a9ff;
    background-color: white;
`
import AttributeData from './AttributeData';
import { ViolenceAttributeGroups, AttributesPerGroup } from '../utils/EvolutionUtils';
import EvolutionGenderGroup from './EvolutionGenderGroup';

export default class EvolutionGenderData {
    constructor() {
        this.physical_violence = new AttributeData("Violencia Física");
        this.psychological_violence = new AttributeData("Violencia Psicológica");
        this.economical_violence = new AttributeData("Violencia Económica");
        this.sexual_violence = new AttributeData("Violencia Sexual");
        this.first_time = new AttributeData("1° vez agresión");
        this.aggr_alcohol = new AttributeData("Agresor ingirió alcohol");
        this.aggr_drugs = new AttributeData("Agresor usó drogas");
        this.vict_alcohol = new AttributeData("Víctima ingirió alcohol");
        this.vict_drugs = new AttributeData("Víctima usó drogas");
        this.vict_lgtbi = new AttributeData("Víctima relacionada a LGBTI+");
        this.vict_disability = new AttributeData("Víctima con discapacidad");
        this.inf = new AttributeData("Infantes");
        this.nin = new AttributeData("Niños");
        this.adol = new AttributeData("Adolescentes");
        this.adol_t = new AttributeData("Adolescentes tardíos");
        this.jov = new AttributeData("Jóvenes");
        this.adul = new AttributeData("Adultos");
        this.mayo = new AttributeData("Adultos mayores");
        this.family = new AttributeData("Vínculo Familiar");
        this.love = new AttributeData("Vínculo Amoroso");
        this.no_relation = new AttributeData("Sin Vínculo/Otro");
    }

    getGroupedData(){
        let response = new EvolutionGenderGroup();

        ViolenceAttributeGroups.forEach(group =>{
            let grouped = [];
            AttributesPerGroup[group].forEach(attribute => {
                grouped.push(this[attribute]);
            });
            response[group] = grouped;
        });

        return response;
    }
}
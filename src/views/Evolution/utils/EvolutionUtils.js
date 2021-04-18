export const ChartsDataAttributes = [
    'physical_violence','psychological_violence','economical_violence','sexual_violence',
    'first_time',
    'aggr_alcohol','aggr_drugs','vict_alcohol','vict_drugs','vict_lgtbi','vict_disability',
    'inf','nin','adol','jov','adul','mayo',
    'family','love','no_relation'
];

export const ViolenceAttributeGroups = ['violence_types','first_time','factors','group_age','relation_vict_aggr'];

export const AttributesPerGroup = {
    violence_types : ['physical_violence','psychological_violence','economical_violence','sexual_violence'],
    first_time : ['first_time'],
    factors : ['aggr_alcohol','aggr_drugs','vict_alcohol','vict_drugs','vict_lgtbi','vict_disability'],
    group_age : ['inf','nin','adol','jov','adul','mayo'],
    relation_vict_aggr: ['family','love','no_relation'],
};
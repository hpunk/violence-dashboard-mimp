import { APP_ASSISTANT_AGE_GROUPS, APP_ASSISTANT_TYPES} from '../constants/enums';

export const bar_data = (app) => {
  let maleAssistants = [];
  let femaleAssistants = [];

  for(let i = 0; i< APP_ASSISTANT_AGE_GROUPS.length; i++){
    maleAssistants.push(app[APP_ASSISTANT_AGE_GROUPS[i].code+"V"]);
    femaleAssistants.push(app[APP_ASSISTANT_AGE_GROUPS[i].code+"M"]);
  }
  return(
  {
    labels: APP_ASSISTANT_AGE_GROUPS.map(ag => ag.label),
    datasets:
    [
      {
        label:"Hombres",
        backgroundColor:"skyblue",
        data:maleAssistants,
      },
      {
        label:"Mujeres",
        backgroundColor:"grey",
        data:femaleAssistants,
      }
    ]
  });
}

export const horizontal_bar_data = (app) => {
  let aux = [];
  for(let i=0; i< APP_ASSISTANT_TYPES.length; i++)
    aux.push({ label: APP_ASSISTANT_TYPES[i].label ,code: APP_ASSISTANT_TYPES[i].code, count: app[APP_ASSISTANT_TYPES[i].code+"V"]+app[APP_ASSISTANT_TYPES[i].code+"M"]})
  aux.sort((first, second) => {return second.count-first.count;});
  
  let maleAssistants = [];
  let femaleAssistants = [];
  let labels = [];

  for(let i = 0; i< 10; i++){
    maleAssistants.push(app[aux[i].code+"V"]);
    femaleAssistants.push(app[aux[i].code+"M"]);
    labels.push(aux[i].label);
  }

  
  
  return({
    labels: labels,
    datasets:
    [
      {
        label:"Hombres",
        backgroundColor:"skyblue",
        data:maleAssistants
      },
      {
        label:"Mujeres",
        backgroundColor:"grey",
        data:femaleAssistants
      }
    ]
  })
  };


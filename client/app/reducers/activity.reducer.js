
import { ActivityActions } from './../../constants/actions';
import _ from 'lodash';

// Represents an activity object and its current state.
const initialState = {
    activities: [],                // activities Array from Apis.
    error: {}                  // error from Apis.
};

const ActivityReducer = (state = initialState, action) => {
    let duplicateState = _.cloneDeep(state);
    switch (action.type) {
        case ActivityActions.GetActivity.Success:
            duplicateState.activities = action.data;
            break;
        case ActivityActions.GetActivity.Failure:
            duplicateState.error = action.error;
            break;
        case ActivityActions.GetActivity.Start:
            break;
        case ActivityActions.PostActivity.Success:
             if(duplicateState && duplicateState.activities.length>0){
                 //if state exists
                 if(action.data.length >1){
                     // if repeated activity is to be added;
                     action.data.map((repeatedDateActivity) => {
                         let index3 = duplicateState.activities.findIndex((dates)=> dates._id === repeatedDateActivity.date);
                         if(index3>=0){
                             duplicateState.activities[index3].activities.push(repeatedDateActivity);
                         }else{
                             duplicateState.activities.push({
                                 _id: repeatedDateActivity.date,
                                 activities : [repeatedDateActivity]
                             })
                         }
                     } )
                 }else{
                     // if single data is to be added
                     let index = duplicateState.activities.findIndex((dates)=> dates._id === action.data[0].date);
                     if(index>=0){
                         duplicateState.activities[index].activities.push(action.data[0]);
                     } else{
                         duplicateState.activities.push({
                             _id:action.data[0].date,
                             activities : [action.data[0]]
                         })
                     }
                 }
             } else{ // if state is empty
                 if(action.data.length>1){
                     //if repeated data is to be saved
                     action.data.map((repeatedActivity) => {
                         duplicateState.activities.push({
                             _id : repeatedActivity.date,
                             activities : [repeatedActivity]
                         })
                     })
                 }else{
                     // if single data to be added
                     duplicateState.activities = [{
                         _id:action.data[0].date,
                         activities : [action.data[0]]
                     }]
                 }
             }
             break;
        case ActivityActions.PostActivity.Failure:
            console.log('error in reducer');
            break;
        case ActivityActions.UpdateActivity.Success:
            if(duplicateState && duplicateState.activities.length>0){
                duplicateState.activities.map((activityLogs) => {
                    activityLogs.activities.map((activity) => {
                        if(activity._id === action.data._id){
                            activityLogs.activities.splice(activityLogs.activities.indexOf(action.data._id),1,action.data);
                        }
                    })
                })
            }
            break;
        case ActivityActions.UpdateActivity.Failure:
            console.log('error in reducer');
            break;
        case ActivityActions.DeleteActivity.Success:
            if(duplicateState && duplicateState.activities.length>0) {
                let index = duplicateState.activities.findIndex((dates) => dates._id === action.data.date);
                if (index >= 0) {
                    let index2 = duplicateState.activities[index].activities.findIndex((activity) => activity._id === action.data._id)
                    if(index2>=0)
                        duplicateState.activities[index].activities.splice(index2,1)
                    }
                }
            break;
        case ActivityActions.DeleteActivity.Failure:
            console.log('error in reducer');
            break;

        case ActivityActions.DeleteAllActivity.Success:
            let date = parseInt(action.data.date);
            if(duplicateState && duplicateState.activities.length>0) {
                let index = duplicateState.activities.findIndex((dates) => dates._id === date);
                if (index >= 0) {
                    duplicateState.activities.splice(index, 1);
                    }
            }
            break;
        default:
            break;
    }

    return duplicateState;
};

export default ActivityReducer;

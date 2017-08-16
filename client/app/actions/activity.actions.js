import { ActivityActions } from './../../constants/actions';

export const postActivities = (activityLog) => {
    return (dispatch) => {
        fetch("/api/activity/2590",{
            method: 'post',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body:JSON.stringify(activityLog)
        })
            .then(response => response.json())
            .then((data) => {
            console.log('post success', data)
                dispatch({type:ActivityActions.PostActivity.Success, data:activityLog})
            })
            .catch((error)=>{
            console.log('errorrrrrrrr',error)
                dispatch({type:ActivityActions.PostActivity.Failure})

            })
    }
};

export const getActivities = () => {
    return (dispatch) => {
        fetch("/api/activity/2590",{
            method: 'get',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log("data in actions are :",data)
                dispatch({type:ActivityActions.GetActivity.Success,data:data})
            })
            .catch((error)=>{
                console.log('error', error)
                dispatch({type:ActivityActions.GetActivity.Failure})

            })
    }
};
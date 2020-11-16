import { HomeActionType } from "service/actionType"

export const getHomePageDetails = (query) => (dispatch, getState, { api }) => {
    console.log('called')
    return new Promise((resolve, reject) => {

        dispatch({ type: HomeActionType.updateHomePageData, payload: 'test' })

        resolve(true)

    })

}

export const getPageDetails = () =>{
   return  new Promise((resolve,reject)=>{

        resolve({ name:'viswaram' })

    })
}
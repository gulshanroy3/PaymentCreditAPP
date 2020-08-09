import { USER_INFO, NOTIFICATION } from "../actionTypes";
import { common_api } from "./apiUrl"

export function saveUserInfo(data) {
    console.log(data)
    return dispatch => {
        dispatch({
            type: USER_INFO,
            payload: data
        })
    }

}
export function removeNotification() {
    return dispatch => {
        dispatch({
            type: NOTIFICATION,
            payload: {}
        })
    }
}
export function authentication() {
    let url = '/app/config?id=5f2e968b0908450a2f80f609'
    return dispatch => {
        let userLogin = common_api().get(url).then(res => {
            dispatch(saveUserInfo(res.data.config))
            return Promise.resolve(res.data)
        }).catch(err => {
            let error = (err.response && err.response.data) || {}
            if (err.response.status === 400) {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: error.message, type: 'error' }
                })
            }
            else {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: 'something went wrong', type: 'error' }
                })
            }
            return Promise.reject(err)
        })

        return Promise.resolve(userLogin)
    }
}

export function getInvoiceandVendors(url,msg) {
    return dispatch => {
        let userLogin = common_api().get(url).then(res => {
            // dispatch({
            //     type: NOTIFICATION,
            //     payload: { msg: msg, type: 'success' }
            // })
            return Promise.resolve(res.data)
        }).catch(err => {
            let error = (err.response && err.response.data) || {}
            console.log(error, err)
            if (err.response.status === 400) {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: error.message, type: 'error' }
                })
            }
            else {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: 'something went wrong', type: 'error' }
                })
            }
            return Promise.reject(err)
        })

        return Promise.resolve(userLogin)
    }
}

export function useCreditandPayment(url,data) {
    return dispatch => {
        let userLogin = common_api().post(url,data).then(res => {
            dispatch({
                type: NOTIFICATION,
                payload: { msg: 'Payment succesfull', type: 'success' }
            })
            return Promise.resolve(res.data)
        }).catch(err => {
            let error = (err.response && err.response.data) || {}
            console.log(error, err)
            if (err.response.status === 400) {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: error.message, type: 'error' }
                })
            }
            else {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: 'something went wrong', type: 'error' }
                })
            }
            return Promise.reject(err)
        })

        return Promise.resolve(userLogin)
    }
}
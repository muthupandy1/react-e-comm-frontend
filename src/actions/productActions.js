import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCESS,
    PRODUCT_DETAILS_FAIL
} from "../constants/productConstants";

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        // const { data } = await axios.get("/api/products/")
        const { data } = await axios.get(`${BASE_URL}/api/products/`)

        dispatch({ type: PRODUCT_LIST_SUCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }

}



export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        // const { data } = await axios.get(`/api/products/${id}`)
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`)
        
        dispatch({ type: PRODUCT_DETAILS_SUCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }

}
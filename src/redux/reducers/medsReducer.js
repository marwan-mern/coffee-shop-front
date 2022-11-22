import { ActionTypes } from "../constants/actionTypes"


const initialState = {
    items: [
    ],
};

const initialLack = {
    lack: [

    ],
}

const initialGain = {
    gain: 0
}

const initialDailyAdded = {
    Added: [

    ],
}

const initialSearch = {
    Searched: [

    ],
}

const initialTables = {
    Tables: [
    ],
};

const initialBuyToday = {
    BuyToday:[

    ],
}


export const medsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_Meds:
            return { ...state, items: action.payload };
        case ActionTypes.RESET_SINGLE_PRODUCT:
            return { ...state, items: action.payload };
        case ActionTypes.REDUCE_QUANTITY:
            return { ...state, items: action.payload };
        case ActionTypes.ADD_TO_STORE:
            return { ...state, items: action.payload };
        case ActionTypes.ADDED_TO_FALSE:
            return { ...state, items: action.payload };
        case ActionTypes.ADD_MEDECINE:
            return { ...state, items: action.payload };
        case ActionTypes.Delete_MEDECINE:
            return { ...state, items: action.payload };

        default:
            return state;
    }
}


export const getlack = (state = initialLack, action) => {
    switch (action.type) {
        case ActionTypes.LACK_ITEMS:
            return { ...state, lack: action.payload };
        default:
            return state;
    }
}

export const getGain = (state = initialGain, action) => {
    switch (action.type) {
        case ActionTypes.DAILY_GAIN:
            return { ...state, gain: action.payload };
        default:
            return state;
    }
}


export const getDailyAdded = (state = initialDailyAdded, action) => {
    switch (action.type) {
        case ActionTypes.DAILY_ADDED:
            return { ...state, Added: action.payload };
        case ActionTypes.FETCH_Daily_Added_Products:
            return { ...state, Added: action.payload };
        default:
            return state;
    }
}

export const getSearched = (state = initialSearch, action) => {
    switch (action.type) {
        case ActionTypes.SEARCH_ITEMS:
            return { Searched: action.payload };
        default:
            return state;
    }
}

export const AddedTables = (state = initialTables, action) => {
    switch (action.type) {
        case ActionTypes.AllTables:
            return { ...state, Tables: action.payload };
        case ActionTypes.AddOrder:
            return { ...state, Tables: action.payload };
        case ActionTypes.UpdateOrderItem:
            return { ...state, Tables: action.payload };
        case ActionTypes.DeleteTable:
            return { ...state, Tables: action.payload };
        default:
            return state;
    }
}

export const getBuyToday = (state=initialBuyToday, action) => {
    switch (action.type) {
        case ActionTypes.Add_Buy_MEDECINE:
            return {...state,BuyToday:action.payload};
        case ActionTypes.FETCH_Daily_Buy_Products:
            return {...state,BuyToday:action.payload};
        default:
            return state;
    }
}
import { combineReducers } from "redux";
import { medsReducer , getlack , getGain ,getDailyAdded ,getSearched , AddedTables,getBuyToday} from "./medsReducer";


const reducers = combineReducers({
    medsReducer:medsReducer,
    getlack:getlack,
    TotalGain:getGain,
    getDailyAdded:getDailyAdded,
    getSearched:getSearched,
    AddedTables:AddedTables,
    getBuyToday:getBuyToday

});

export default reducers
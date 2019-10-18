import {
    CHANGE_COUNT,
    CHANGE_NUMBER,
    CHANGE_INFO,
    CHANGE_INFO_SEX,
    SET_NEWROUTER
} from '../mutationsType/mutations-type';

export default {
    [CHANGE_COUNT](state,count){
        state.count = state.count + count
    },
    [CHANGE_NUMBER](state,number){
        state.number = state.number + number
    },
    [CHANGE_INFO](state,info){
        state.info = state.info + info
    },
    [CHANGE_INFO_SEX](state,sex){
        state.info.sex = sex
    },
    [SET_NEWROUTER](state,newRouter){
        console.log(newRouter);
        state.newRouter = newRouter
    }
}
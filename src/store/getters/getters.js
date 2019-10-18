export default {
    test(state){
        return state.number + 'getters刘杨';
    },
    getRoles(state){
        return state.roles;
    },
    getNewRouter(state){
        return state.newRouter;
    }
}
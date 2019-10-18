export default {
    changeCount(context,count){
        count = count + '我在actions这个地方改变了count'
        context.commit('CHANGE_COUNT',count)
    },
    changeNumber(context,number){
        number = number + '我在actions这个地方改变了number'
        context.commit('CHANGE_COUNT',number)
    },
    changeinfo(context,info){
        info = info.name + '我在actions这个地方改变了info'
        context.commit('CHANGE_COUNT',info)
    },
    changeinfosex(context,sex){
        sex = sex + '我在actions这个地方改变了info'
        context.commit('CHANGE_INFO_SEX',sex)
    },
    setRouter(context,newRouter){
        context.commit('SET_NEWROUTER',newRouter)
    },
}
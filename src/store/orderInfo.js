//types
const types = {
    ORDER_INFO: 'ORDER_INFO'
}
//state
const state = {
    orderInfo: null
}
//getters
const getters = {
    orderInfo: state => state.orderInfo,
    totalPrice: state => {
        let price = 0;
        if (state.orderInfo) {
            const selectFoods = state.orderInfo.selectFoods;
            selectFoods.forEach(food => {
                price += food.activity.fixed_price * food.count;
            });
            price += state.orderInfo.shopInfo.float_delivery_fee;
        }
        return price;
    },
}
//mutations
const mutations = {
    [types.ORDER_INFO](state, orderInfo) {
        if (orderInfo) {
            state.orderInfo = orderInfo
        } else {
            state.orderInfo = null
        }
    }
}
//actions
const actions = {
    setOrderInfo: ({
        commit
    }, orderInfo) => {
        commit(types.ORDER_INFO, orderInfo)
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}
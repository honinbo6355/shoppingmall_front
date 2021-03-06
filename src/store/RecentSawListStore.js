import GoodsApi from '../api/GoodsApi';

const state = {
    goodsList:[],
    // codeList:[]
}

// const getters = {
//     setListLength(state) {
//         return state.goodsList.length;
//     }
// }

const mutations ={
    async addSawList(state, goodsCode){
        // this.$store.commit('getGoodsModel');
        // let addList = state.codeList;
        // addList.push(goodsCode);
        // state.codeList = addList;

        let goodsList = state.goodsList;
        // goodsList.push(await new GoodsApi().getGoods(goodsCode));
        // state.goodsList = goodsList;

        // 중복 확인
        if (goodsList.filter(goodsObject => goodsObject.goodsCode === goodsCode).length !== 0) {
            let index = goodsList.findIndex(goodsObject => goodsObject.goodsCode === goodsCode);
            goodsList.splice(index, 1);
        }
        state.goodsList = [await new GoodsApi().getGoods(goodsCode)].concat(goodsList);
    },

    clearList(state) {
        state.goodsList = [];
    }
}

export default {
    state,
    mutations,
    // getters
}
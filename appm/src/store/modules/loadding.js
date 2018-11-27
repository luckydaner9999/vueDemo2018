
import Vue from 'vue';

const Loading={
    state:{
        isLoading:false
    },
    mutations: {
        updateLoadingStatus (state, payload) {
          state.isLoading = Vue.isLoading
        }
      }
}
export default Loading;
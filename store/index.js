export const state = () => ({
  error: []

})
export const mutations = {
  error(state, payload) {
    state.error = payload;
  }
}
export const actions = {
  async reg({
    context
  }, payload) {
    try {
      await this.$axios.$post('register', payload).then(res => {
        context.commit('error', res)
      })


    } catch (e) {

    }
  }
}
export const getters = {
  error: (state) => {
    return state.error;
  }
}

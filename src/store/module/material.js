export default {
  state: {
    videoEditId: localStorage.getItem('videoEditId')
  },
  mutations: {
    setVideoEditId(state, id) {
      localStorage.setItem('videoEditId', id);
      state.videoEditId = id;
    },

  }
}

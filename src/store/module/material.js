export default {
  state: {
    videoEditId: localStorage.getItem('videoEditId'),
    videoSetEditId: localStorage.getItem('videoSetEditId')
  },
  mutations: {
    setVideoEditId(state, id) {
      localStorage.setItem('videoEditId', id);
      state.videoEditId = id;
    },
    setVideoSetEditId(state, id) {
      localStorage.setItem('videoSetEditId', id);
      state.videoSetEditId = id;
    }
  }
}

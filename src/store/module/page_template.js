export default {
  state: {
    editId: sessionStorage.getItem('templateEditId')
  },
  mutations: {
    setTemplateEditId(state, id) {
      state.editId = id;
    }
  }
}

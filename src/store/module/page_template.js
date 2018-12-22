export default {
  state: {
    editTemplateId: localStorage.getItem('templateEditId'),
    editPageId: localStorage.getItem('pageEditId')
  },
  mutations: {
    setTemplateEditId(state, id) {
      state.editTemplateId = id;
    },
    setPageEditId(state, id) {
      state.editPageId = id;
    }
  }
}

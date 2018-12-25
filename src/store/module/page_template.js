export default {
  state: {
    editTemplateId: localStorage.getItem('templateEditId'),
    editPageId: localStorage.getItem('pageEditId'),
    editContentId: localStorage.getItem('contentEditId'),
  },
  mutations: {
    setTemplateEditId(state, id) {
      state.editTemplateId = id;
    },
    setPageEditId(state, id) {
      state.editPageId = id;
    },
    setContentEditId(state, id) {
      state.editContentId = id;
    }
  }
}

export const state = () => ({
  alert: {
    visible: false,
    msg: '',
    type: 'error'
  }
})

export const mutations = {
  alertHide (state) {
    state.alert.visible = false
    this.state.msg = false
  },
  alertDisplay (state, payload) {
    state.alert.visible = payload.visible || true
    state.alert.msg = payload.msg || ''
    state.alert.type = payload.type || 'error'
  }
}

export const actions = {
  alertShow (context, payload) {
    context.commit('alertDisplay', payload)
  }
}

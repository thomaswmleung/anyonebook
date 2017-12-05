import sa from 'superagent'

const API_BASE_URL = 'http://35.194.128.55/public'
// region service method
export default {
  reqResetPassword: email => sa.post(`${API_BASE_URL}/forgot_password`).send(email),
  checkResetLink: email => sa.get(`${API_BASE_URL}/reset_password`),
  sendNewPassword: payload => sa.post(`${API_BASE_URL}/reset_password`).send(payload)
}
// endregion

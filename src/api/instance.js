import my_axios from '@/api/axios'

function login(data) {
  const url = '/api/dev/login'
  const method = 'post'
  return my_axios(url,method,data)
}

function signin(data) {
  const url = '/api/dev/signin'
  const method = 'post'
  return my_axios(url,method,data)
}
export default {
  login,
  signin
}
import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://sisuper.codepanda.id`,
    // baseURL: `http://localhost:3000`,
  })
}

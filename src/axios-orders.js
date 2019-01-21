import axios from 'axios'

const instance = axios.create({
  baseURL: "https://bstore-9da42.firebaseio.com/"
})

export default instance

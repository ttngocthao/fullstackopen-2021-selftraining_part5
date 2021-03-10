import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async(newBlogObj)=>{
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl,newBlogObj,config)
    return response.data
}

export default {getAll,setToken,create}
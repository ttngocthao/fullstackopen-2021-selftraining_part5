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

const create = async(newBlogObj) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl,newBlogObj,config)
  return response.data
}

const update = async(blogId,requestData) => {

  // alert(`update function is called ${baseUrl}/${blogId}`)
  // console.log(requestData)
  const response = await axios.put(`${baseUrl}/${blogId}`,requestData)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`,config)
  console.log(response)
  return response.data
}

export default { getAll,setToken,create,update,remove }
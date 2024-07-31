import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axioSecure = axios.create({
  baseURL: "http://localhost:5000/",
});
const useAxiosSecure = () => {
    const {logoutUser}=useAuth()
    const navigate= useNavigate()
  axios.interceptors.request.use(
    function (config) {
      const token= localStorage.getItem('access-token');
      config.headers.authorization= token
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(function (response) {
    return response;
  },  async(error)=> {
    const status= error.response.status;
    if(status==401 || status==403){
        await logoutUser();
        navigate('/login')
    }
    return Promise.reject(error);
  });

  return axioSecure;
};

export default useAxiosSecure;

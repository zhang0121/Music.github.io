import axios from 'axios';
import nProgress from 'nprogress';
import "nprogress/nprogress.css";
let requests = axios.create({
    timeout: 5000,
    baseURL: '/api/',
});

requests.interceptors.request.use((config) => {

    nProgress.start();
    // console.log(333);
    return config;
})
requests.interceptors.response.use(
    (response) => {
        nProgress.done();
        return response.data;
    },
    (error) => {
        alert("服务器响应数据失败");
    }
)

export default requests;
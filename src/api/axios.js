import axios from 'axios';
import nProgress from 'nprogress';
import "nprogress/nprogress.css";
let requests = axios.create({
    timeout: 10000,

});

requests.interceptors.request.use((config) => {

    nProgress.start();
    return config;
})
requests.interceptors.response.use(
    (response) => {
        nProgress.done();
        return response.data;
    },
    (error) => {
        // alert(error.message);
    }
)

export default requests;
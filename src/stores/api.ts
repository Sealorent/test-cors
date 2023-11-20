import axios from "axios";

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


interface State {
    response : any;
}

export const useApi = defineStore('api', () => {
    const state: State = {
        response: 0,
    }
    const baseUrl = 'https://api-gateway-member.cap.lcpare.com';
    // const baseUrl = 'http://localhost:8040';
    
    async function getResponse() {
        try {
            const config = {
                method: 'post',
                // withCredentials: true,
                // credentials: 'include',
                url: baseUrl + '/api/guest/sign-in', // Corrected the URL
                data: {
                    "email": "kayyisaljund@gmail.com",
                    "password": "memberlc",
                    "token_fcm": "eMmpTeJoSSuW30dGUTnaSF:APA91bEYgfM2JEdlc4XmXJ1-mWv-ID7g08G5bVMHJa6NeJxLDPX-eofvn9tdLA3zX3FG4zaNtA37iIbbsS3Vyvv2PmjngdUsb7JL0mdKcbF6IpjCYdrtUI1cVHjG6oIUppmeoEw8OFwE"
                }
            }

            const response = await axios(config);


            // log the response
            console.log(response.headers);
            console.log(`res: ${response.data['session_id']}`);

            const cookie = document.cookie;
            
            // console.log(cookie);
            state.response = response.data; // Assuming your response contains data property
            sessionStorage.setItem('token', response.data['message']['token']);
            sessionStorage.setItem('cookie', response.data['session_id']);
            return response.data;
        } catch (error) {
            throw error; // Rethrow the error so that the caller can handle it
        }
    }

    async function getLearningVideo(){
        try {
            const config = {
                method: 'get',
                // withCredentials: true,
                // credentials: 'include',
                url:  baseUrl + '/api/lc/learning-video-category/master', // Corrected the URL
                headers :{
                    "Authorization": sessionStorage.getItem('token'),
                    "content-type": "application/json",
                    // "Set-Cookie"  : "session_id=" + sessionStorage.getItem('cookie') + ";"
                }, 
            }

            const response = await axios(config);

            console.log(response.headers);
            console.log(config.url);
            // console.log(response.headersget('Set-Cookie'));
            console.log(response.headers );

            console.log(response.data)

            const cookie = document.cookie;
            
            console.log(cookie);
            state.response = response.data; // Assuming your response contains data property
            return response.data;
        } catch (error) {
            throw error; // Rethrow the error so that the caller can handle it
        }
    }

    async function get(){
        try {
            const config = {
                method: 'get',
                withCredentials: true,
                credentials: 'include',
                url: 'http://localhost:8040/api/lc/learning-video-category/master', // Corrected the URL
                headers :{
                    "Authorization": sessionStorage.getItem('token'),
                    "content-type": "application/json",
                    // "Set-Cookie"  : "session_id=" + sessionStorage.getItem('cookie') + ";"
                }, 
            }

            const response = await axios(config);

            console.log(response.headers);
            console.log(config.url);
            // console.log(response.headersget('Set-Cookie'));
            console.log(response.headers['set-cookie'] );

            console.log(response.data)

            const cookie = document.cookie;
            
            console.log(cookie);
            state.response = response.data; // Assuming your response contains data property
            return response.data;
        } catch (error) {
            throw error; // Rethrow the error so that the caller can handle it
        }
    }

    return {
        state: ref(state),
        getResponse,
        getLearningVideo
    }
})

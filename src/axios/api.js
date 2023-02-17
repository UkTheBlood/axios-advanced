import axios from "axios";

// axios 를 이용해 instance를 생성할 수 있는 api 호츌
// 객체가 입력값으로 들어감
// axios를 구성하는 환경 설정 관련 코드가 입력값으로 들어감
// configuration

const instance = axios.create({
    baseURL: 'http://localhost:4000',
    // timeout: 1,
});

// 인증 혹은 토큰 관련 부분도 넣을 수 있음
// 고객이 로그인을 반드시 해야 요청을 보낼 수 있는 부분인데 요청한 경우, 요청을 안 하는 것

// 콜백 함수가 두개 들어감
instance.interceptors.request.use(
    // 요청을 보내기 전 수행하는 함수
    function (config) {     // 인자는 항상 config
        console.log("인터셉트 요청 성공!");
        return config;
    },

    // 오류 요청을 보내기 전에 수행
    function (error) {
        console.log("인터셉트 요청 오류")
        return Promise.reject(error)
    }
);

instance.interceptors.response.use(
    // 서버로부터 정상 응답을 받은 경우
    function (response) {
        console.log("인터셉트 정상 응답 수신!")
        return response
    },

    // 서버로부터 오류 응답을 받은 경우
    function (error) {
        console.log("인터셉트 오류 응답 수신!")
        return Promise.reject(error)
    }
);

export default instance;
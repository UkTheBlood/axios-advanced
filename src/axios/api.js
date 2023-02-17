import axios from "axios";

// axios 를 이용해 instance를 생성할 수 있는 api 호츌
// 객체가 입력값으로 들어감
// axios를 구성하는 환경 설정 관련 코드가 입력값으로 들어감
// configuration

const instance = axios.create({
    baseURL: 'http://localhost:4000'
});

export default instance;
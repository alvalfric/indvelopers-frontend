import axios from 'axios';

const EMPLOYEE_API_BASE_URL="http://localhost:8080/Prueba";

class PruebaService{

    communicate(){
        return axios.get(EMPLOYEE_API_BASE_URL+"/communicate");
    }
    ListPrueba(){
        return axios.get(EMPLOYEE_API_BASE_URL+ "/findAll");
    }
}

export default new PruebaService();
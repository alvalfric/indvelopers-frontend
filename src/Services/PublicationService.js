import axios from 'axios';
import UrlProvider from '../providers/UrlProvider';

class PublicationService{

    ListPublication(){
        return axios.get(UrlProvider.getPublicationUrl()+"/findAll")

    }
    AddPublication(){
        
    }
}
export default new PublicationService();

import * as config from './app.config';
const API_URL = config.Configs.url; // "http://localhost:9060/";
const API_ENDPOINT = API_URL + config.Configs.path;
export const MaxSize = 10;
export const PaggingSize = 20;

export class AppSettings {

     public static get login():string{ return `${API_ENDPOINT}login`}
     public static get dashboard():string{ return `${API_ENDPOINT}dashboard`}
   
 }

//  public getapi(searchText: string, page: number, size: number): Observable<any> {
//    return this.http.get<TransactionModel>(`${AppSettings.url}` + '?q=' + searchText + '&page=' + page + '&size=' + size, {
//        observe: 'response'
//    });
// }

// public postapi(data: any): Observable<any> {
//    return this.http.post<any>(`${AppSettings.url}`, data, {
//        observe: 'response'
//    });
//  }

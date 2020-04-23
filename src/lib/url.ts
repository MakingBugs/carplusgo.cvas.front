const URL = process.env.NODE_ENV === 'production' ? 'https://biapi.carplusgo.com/' : process.env.NODE_ENV === 'stage' ? 'http://192.168.21.153:21021/' : 'http://localhost:21021/';
export default URL;
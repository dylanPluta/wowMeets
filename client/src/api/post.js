import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001/getPosts'
});




// npx json-server -p 6969 -w data/db.json
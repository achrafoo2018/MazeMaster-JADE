import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})


const getMaze = async () => {
    const response = await api.get('/get-maze')
    return response.data
}

const generateMaze = async () => {
    const response = await api.get('/generate-maze')
    return response.data
}

const runAgents = async () => {
    const response = await api.get('/run-all-agents')
    return response.data
}

export { getMaze, runAgents, generateMaze }
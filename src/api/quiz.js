import axios from "axios"

const { REACT_APP_FIREBASE_DATABASE_URL } = process.env

export default axios.create({
	baseURL: REACT_APP_FIREBASE_DATABASE_URL,
})

import axios from 'axios';
const base = '/api';
let api = axios.create({
	headers : {
		'Content-Type' : 'application/x-www-form-urlencoded'
	}
})

export const getV1Group = (params) => { return axios.get(`${base}/list?${params}`) };

//注册
export const signIn = (params) => { return axios.post(`${base}/sign`,`data=${params}`)};
//登入
export const login = (params) => { return axios.get(`${base}/login?${params}`) };
//添加数据
export const add = (params) => { return axios.post(`${base}/add`,`data=${params}`)};
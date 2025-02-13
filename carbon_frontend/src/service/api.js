/* eslint-disable dot-notation */
/* eslint-disable consistent-return */

import axios from "axios";
import { toast } from "react-toastify";
import { constant } from '../constant'

export const apiget = async (path) => {
    try {
        // eslint-disable-next-line prefer-const
        let response = await axios.get(constant.baseUrl + path, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        // eslint-disable-next-line dot-notation
        if (response.data.token && response.data.token !== null) {
            // eslint-disable-next-line dot-notation
            sessionStorage.setItem('token', response.data.token);
        }
        if (response && response.status === 200) {
            toast.success(response.data.message);
        }
        return response;
    } catch (error) {
        if (error && error.response) {
            if (error && error.response && error.response.status === 400) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message)
                    console.log(error)
                }
            }
        }
    }
}

export const apipost = async (path, data) => {
    try {
        const response = await axios.post(constant.baseUrl + path, data, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        if (response.data.token && response.data.token !== null) {
            sessionStorage.setItem('token', response?.data?.token);
        }

        if (response && response.status === 200 || response.status === 201) {
            toast.success(response.data.message);
            // toast.success(<div dangerouslySetInnerHTML={{ __html: response.data.message }} />);
        }
        return response;
    } catch (error) {
        if (error && error.response) {
            if (error && error.response.data && error.response.status === 401) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message)
                    // toast.error(<div dangerouslySetInnerHTML={{ __html: error.response.data.message }} />)
                } else {
                    toast.error("Something went wrong")
                }
            }
        }
        return error;
    }
}

export const apiput = async (path, data) => {
    try {
        const response = await axios.put(constant.baseUrl + path, data, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if (response.data.token && response.data.token !== null) {
            sessionStorage.setItem('token', response.data.token);
        }
        if (response && response.status === 200) {
            toast.success(response.data.message);
        }
        return response;
    } catch (error) {
        if (error && error.response) {
            if (error && error.response && error.response.status === 400) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message)
                }
            }
        }
    }
}

export const apidelete = async (path) => {
    try {
        const response = await axios.delete(constant.baseUrl + path, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if (response.data.token && response.data.token !== null) {
            sessionStorage.setItem('token', response.data.token);
        }
        if (response && response.status === 200) {
            toast.success(response.data.message);
        }

        return response;
    } catch (error) {
        if (error && error.response) {
            if (error && error.response && error.response.status === 400) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message)
                }
            }
        }
    }
}

export const deleteManyApi = async (path, data) => {
    try {
        const response = await axios.post(constant.baseUrl + path, data, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        if (response.data.token && response.data.token !== null) {
            sessionStorage.setItem('token', response?.data?.token);
        }

        if (response && response.status === 200) {
            toast.success(response.data.message);
        }
        return response;
    } catch (error) {
        if (error && error.response) {
            if (error && error.response.data && error.response.status === 401) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message)
                }
            }
        }
    }
}


export const apipostBlob = async (path, data) => {
    try {
        const response = await axios.post(constant.baseUrl + path, data, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            responseType:"blob"
        });

        if (response && response.status === 200 || response.status === 201) {
            toast.success(response.data.message);
            // toast.success(<div dangerouslySetInnerHTML={{ __html: response.data.message }} />);
        }
        return response;
    } catch (error) {
        if (error && error.response) {
            if (error && error.response.data && error.response.status === 401) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message)
                    // toast.error(<div dangerouslySetInnerHTML={{ __html: error.response.data.message }} />)
                } else {
                    toast.error("Something went wrong")
                }
            }
        }
        return error;
    }
}

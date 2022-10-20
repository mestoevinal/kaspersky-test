import {$host} from ".././index";

export const createUser = async (User) => {
    const {data} = await $host.post('api/user/add', User)
    return data
}

export const fetchUsers = async (limit, page, search = "", sortBy="") => {
    const {data} = await $host.get(`api/user/all?limit=${limit}&page=${page}&search=${search}&sortBy=${sortBy}`)
    return data.message
}

export const deleteUser = async (id) => {
    const {data} = await $host.delete(`api/user/${id}`)
    return data.message
}


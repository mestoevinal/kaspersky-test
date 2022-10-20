import {$host} from "../index";

export const createGroup = async (name) => {
    const {data} = await $host.post('api/group/add', name)
    return data
}
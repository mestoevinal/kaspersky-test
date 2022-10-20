import React, {useEffect, useState} from 'react';
import userCss from "./UserList.module.scss"
import {deleteUser, fetchUsers} from "../../api/service/userAPI";
import {getTotalPages} from "./CountTotalPages";
import {NavLink} from "react-router-dom";

const UserList = () => {
    const [sortFirstName, setSortFirstName] = useState(false)
    const [sortLastName, setSortLastName] = useState(false)
    const [sortBy, setSortBy] = useState("")
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [search, setSearch] = useState("")
    const limit = 11
    let totalPages = getTotalPages(count, limit)

    useEffect(() => {
        fetchUsers(limit, page, search, sortBy).then(data => {
            setUsers(data.users)
            setCount(data.count)
        })
    }, [page, sortBy, sortLastName, sortFirstName, search])

    function updateSortByFN() {
        setSortFirstName(!sortFirstName)
        sortFirstName ? setSortBy("") : setSortBy("first_name")
    }

    function updateSortByLN() {
        setSortLastName(!sortLastName)
        sortLastName ? setSortBy("") : setSortBy("last_name")
    }

    return (
        <div className={userCss.wrapper}>
            <div className={userCss.SortSearchContainer}>
                <div>
                    <span>Отсортировать по имени</span>
                    <input
                        disabled={sortLastName}
                        type="checkbox"
                        onChange={updateSortByFN}
                    />
                </div>

                <div>
                    <span>Отсортировать по фамилии</span>
                    <input
                        disabled={sortFirstName}
                        type="checkbox"
                        onChange={updateSortByLN}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Поиск..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <table className={userCss.table}>
                <thead>
                <tr>
                    <th>
                        <input type="checkbox" disabled={true}/>
                    </th>
                    <th>Полное имя</th>
                    <th>Учетная запись</th>
                    <th>Электронная почта</th>
                    <th>Группа</th>
                    <th>Номер телефона</th>
                </tr>
                </thead>
                <tbody>
                {users?.map(el =>
                    <tr key={el._id}>
                        <td>
                            <input type="checkbox" defaultChecked={false}/>
                        </td>
                        <td>{el.first_name} {el.last_name}</td>
                        <td>{el.account}</td>
                        <td>{el.email}</td>
                        <td>{el.group && el.group.name}</td>
                        <td>{el.phone}</td>
                    </tr>
                )}
                </tbody>
            </table>


            {totalPages?.map(p =>
                <NavLink
                    to=""
                    key={p}
                    onClick={() => setPage(p)}
                >
                    {p}
                </NavLink>
            )}
        </div>
    );
};

export default UserList;


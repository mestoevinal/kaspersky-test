import React from 'react';
import {NavLink} from "react-router-dom";
import homeCss from "./Home.module.scss"

const Home = () => {
    return (
        <section className={homeCss.section}>
            <div>
                <h1>
                    KASPERSKY
                </h1>
                <NavLink to="/userlist">
                    СПИСОК ПОЛЬЗОВАТЕЛЕЙ
                </NavLink>
            </div>

        </section>
    );
};

export default Home;
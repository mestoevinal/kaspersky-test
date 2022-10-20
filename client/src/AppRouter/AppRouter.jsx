import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {publicRoutes} from "../router/routes";

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({path, component} )=>
                <Route
                    path={path}
                    element={component}
                    key={path}
                />
            )}
            <Route path='*' element={<Navigate to='/home'/>} />
        </Routes>
    );
};

export default AppRouter;
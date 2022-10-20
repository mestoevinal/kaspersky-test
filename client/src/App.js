import AppRouter from "./AppRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";
import appCss from "./App.module.scss"

function App() {
    return (
        <BrowserRouter>
            <div>
                <AppRouter/>
            </div>
        </BrowserRouter>
    );
}

export default App;

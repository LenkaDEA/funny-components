import App from "App/App";
import type { RouteObject } from "react-router";

import GameXO from "pages/GameXO";
import Stopwatch from "pages/Stopwatch";


const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/GameXO",
                element: <GameXO />
            },
            {
                path: "/Stopwatch",
                element: <Stopwatch />
            },
        ]
    }

]

export default routesConfig;
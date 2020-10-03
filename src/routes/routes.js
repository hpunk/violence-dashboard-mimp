
import APPImpact from "../views/APPImpact/APPImpact";
import Clustering from "../views/Clustering/Clustering";
import ViolenceEvolution from "../views/ViolenceEvolution/ViolenceEvolution";
import Main from "../views/Main/Main";

const IndexRoutes = [
    {
        path: `${process.env.PUBLIC_URL}/`, component: Main, exact: true, private: false
    },
    {
        path: `${process.env.PUBLIC_URL}/app-impact`, component: APPImpact, exact: true, private: false
    },
    {
        path: `${process.env.PUBLIC_URL}/clustering`, component: Clustering, exact: true, private: false
    },
    {
        path: `${process.env.PUBLIC_URL}/violence-evolution`, component: ViolenceEvolution, exact: true, private: false
    },
    {
        path: "*", component: Main, private: true
    },
    
];

export default IndexRoutes;
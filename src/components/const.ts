import Store from './Store/Store';
import Sku from './SKU/Sku';
import Planning from './Planning/Planning';
import Charts from './Charts/Charts';


const navigation = [
    {
        id:'st',
        name:"Store",
        image: "https://img.icons8.com/material-outlined/24/online-store.png" ,
        alt:"online-store",
        component: Store
    },
    {
        id:'sku',
        name:"SKU",
        image:"https://img.icons8.com/plumpy/24/project-management.png" ,
        alt:"project-management",
        component: Sku
    },
    {
        id:'planning',
        name:"Planning",
        image:"https://img.icons8.com/fluency/48/bar-chart.png" ,
        alt:"bar-chart",
        component: Planning
    },
    {
        id:'chart',
        name:"Chart",
        image:'https://img.icons8.com/fluency-systems-filled/48/graph.png' ,
        alt:"graph",
        component: Charts
    },
]

const StoreMap = {
    row : {
        Seq: 0,
        ID: "",
        Label: "",
        City: "",
        State: ""
    },
    column : [
        {field:'Seq'},
        {field:'ID'},
        {field:'Label'},
        {field:'City'},
        {field:'State'}
    ]
}
const SKUMap = {
    row : {
        ID: 0,
        Label: "",
        Class: "",
        Department: "",
        Price: "",
        Cost: "",
    },
    column : [
        {field:'ID'},
        {field:'Label'},
        {field:'Class'},
        {field:'Department'},
        {field:'Price'},
        {field:'Cost'}
    ]
}

const ButtonStandardSize = "text-sm  text-black px-2 py-1 rounded"
const ButtonStyle =`disabled:bg-blue-400 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-1 focus:outline focus:ring-blue-800`

export {navigation,ButtonStyle,ButtonStandardSize,StoreMap,SKUMap};
import Store from './Store/Store';
import Sku from './SKU/Sku';
import Planning from './Planning/Planning';

const navigation = [
    {
        id:'st',
        name:"Store",
        component: Store
    },
    {
        id:'sku',
        name:"SKU",
        component: Sku
    },
    {
        id:'planning',
        name:"Planning",
        component: Planning
    },
    {
        id:'chart',
        name:"Chart",
        component: Store
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

const ButtonStandardSize = "text-sm  text-black px-2 py-1 rounded"
const ButtonStyle =`disabled:bg-blue-400 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-1 focus:outline focus:ring-blue-800`


export {navigation,ButtonStyle,ButtonStandardSize,StoreMap};
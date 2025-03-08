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

export {navigation};
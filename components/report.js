
const date = require('date-and-time');

import RecordItem from './reportModules/recordItem';
import TotalPurchases from './reportModules/totalPurchases';
import MostExpensive from './reportModules/mostExpensive';
import LeastExpensive from './reportModules/leastExpensive';
import MostCommon from './reportModules/mastCommon';
import ByYear from './reportModules/byYear';
import ByDay from './reportModules/byDay';
import ByCategory from './reportModules/byCategory';

export default function Report({orderArray}) {

    console.log('orderArray', orderArray);
    
    return (
        <div>
            <h1>Report!</h1>
            <TotalPurchases orderArray={orderArray} />
            <MostExpensive orderArray={orderArray} />
            <LeastExpensive orderArray={orderArray} />
            <MostCommon orderArray={orderArray} />
            <ByYear orderArray={orderArray} />
            <ByDay orderArray={orderArray} />
            <ByCategory orderArray={orderArray} />
        </div>
    );
}

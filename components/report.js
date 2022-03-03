const currency = require('currency.js');
const date = require('date-and-time');

import RecordItem from './reportModules/recordItem';
import TotalPurchases from './reportModules/totalPurchases';
import MostExpensive from './reportModules/mostExpensive';
import LeastExpensive from './reportModules/leastExpensive';
import MostCommon from './reportModules/mastCommon';
import ByYear from './byYear';
import ByDay from './reportModules/byDay';
import ByCategory from './reportModules/byCategory';

export default function Report({orderObj}) {

    console.log('orderObj', orderObj);
    
    return (
        <div>
            <h1>Report!</h1>
            <TotalPurchases orderObj={orderObj} />
            <br/>
            <MostExpensive orderObj={orderObj} />
            <br/>
            <LeastExpensive orderObj={orderObj} />

            <br/>

            <MostCommon orderObj={orderObj} />
            <br/>

            <ByYear orderObj={orderObj} />

            <ByDay orderObj={orderObj} />

            <ByCategory orderObj={orderObj} />
        </div>
    );
  }
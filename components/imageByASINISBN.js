import React, { useState } from 'react';
import isMobile from 'is-mobile';

import config from '../config';

export default function ImageByASINISBN({ASINISBN, orderArray, format = '_SL200_'}) {
    const [shouldDisplay, setShouldDisplay] = useState(true);

    const outputObj = orderArray.find(orderObj => ASINISBN === orderObj.ASINISBN);
    if (!outputObj || !shouldDisplay) {
        return (<></>);
    }
    
    const linkHref = `https://www.amazon.com/dp/${outputObj.ASINISBN}?tag=${config.affiliateId}`;
    const imgHref = `//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${outputObj.ASINISBN}&Format=${format}&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=${config.affiliateId}&language=en_US`;
    const trackHref= `https://ir-na.amazon-adsystem.com/e/ir?t=${config.affiliateId}&language=en_US&l=li2&o=1&a=${outputObj.ASINISBN}`;
    const target = isMobile() ? null : '_blank';
    const rel = isMobile() ? null : 'noreferrer';

    return (
        <>  
            <div>
                <a href={linkHref} target={target} rel={rel} title={outputObj.Title} >
                    <img border="0"  width='50' src={imgHref} alt='' style={{margin: 20}} onError={() => setShouldDisplay(false)} />
                </a>
            </div>
            <img src={trackHref} width="1" height="1" border="0" alt="" style={{border : 'none !important', margin:'0px !important'}} />
        </>
    );
}

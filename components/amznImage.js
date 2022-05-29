import isMobile from 'is-mobile';

import config from '../config';
import styles from '../styles/Reports.module.css';

export default function AmznImage({ASINISBN, title = '', format = '_SL200_'}) {
    if (!ASINISBN){
        return (<></>);
    }
    
    const linkHref = `https://www.amazon.com/dp/${ASINISBN}?tag=${config.affiliateId}`;
    const imgHref = `//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${ASINISBN}&Format=${format}&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=${config.affiliateId}&language=en_US`;
    const trackHref= `https://ir-na.amazon-adsystem.com/e/ir?t=${config.affiliateId}&language=en_US&l=li2&o=1&a=${ASINISBN}`;
    const target = isMobile() ? null : '_blank';
    const rel = isMobile() ? null : 'noreferrer';
    
    return (
        <>  
            <a href={linkHref} target={target} rel={rel} title={title}>
                <img border="0" src={imgHref} alt={title} className={styles.amznImage}/>
            </a>
        </>
    );
}

import styles from '../styles/Reports.module.css';

export default function AmznImage({ASINISBN, title, format = '_SL200_'}) {
    const affiliateId = 'nozama072-20';

    const linkHref = `https://www.amazon.com/dp/${ASINISBN}?tag=${affiliateId}`;
    const imgHref = `//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${ASINISBN}&Format=_SL200_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=${affiliateId}&language=en_US`;
    const trackHref= `https://ir-na.amazon-adsystem.com/e/ir?t=${affiliateId}&language=en_US&l=li2&o=1&a=${ASINISBN}`;
    return (
        <>  
            <div className={styles.amznImageFrame}>
                <a href={linkHref} target="_blank" rel="noreferrer" title={title}>
                    <img border="0" src={imgHref} alt={title} className={styles.amznImage}/>
                </a>
            </div>
            <img src="" width="1" height="1" border="0" alt="" style={{border : 'none !important', margin:'0px !important'}} />
        </>
    );
}
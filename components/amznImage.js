
import styles from '../styles/Reports.module.css';

export default function AmznImage({ASINISBN, title = '', format = '_SL200_'}) {
    const affiliateId = 'nozama072-20';
    if (!ASINISBN){
        return (<></>);
    }
    const linkHref = `https://www.amazon.com/dp/${ASINISBN}?tag=${affiliateId}`;
    const imgHref = `//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${ASINISBN}&Format=${format}&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=${affiliateId}&language=en_US`;
    const trackHref= `https://ir-na.amazon-adsystem.com/e/ir?t=${affiliateId}&language=en_US&l=li2&o=1&a=${ASINISBN}`;
    return (
        <>  
            <a href={linkHref} target="_blank" rel="noreferrer" title={title}>
                <img border="0" src={imgHref} alt={title} className={styles.amznImage}/>
            </a>
        </>
    );
}
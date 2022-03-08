import AmznImage from "./amznImage";

export default function ImageByASINISBN({ASINISBN, orderArray, format = '_SL200_'}) {
    const outputObj = orderArray.find(orderObj => ASINISBN === orderObj.ASINISBN);
    if (!outputObj) {
        return (<></>);
    }
    
    const affiliateId = 'nozama072-20';
    const linkHref = `https://www.amazon.com/dp/${outputObj.ASINISBN}?tag=${affiliateId}`;
    const imgHref = `//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${outputObj.ASINISBN}&Format=${format}&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=${affiliateId}&language=en_US`;
    const trackHref= `https://ir-na.amazon-adsystem.com/e/ir?t=${affiliateId}&language=en_US&l=li2&o=1&a=${outputObj.ASINISBN}`;
    
    return (
        <>  
            <div style={{margin: 5}}>
                <a href={linkHref} target="_blank" rel="noreferrer" title={outputObj.Title} >
                    <img border="0" src={imgHref} alt={outputObj.Title} alt=''/>
                </a>
            </div>
            <img src="" width="1" height="1" border="0" alt="" style={{border : 'none !important', margin:'0px !important'}} />
        </>
    );
}

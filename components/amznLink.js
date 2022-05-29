import isMobile from 'is-mobile';

import config from '../config';

export default function AmznLink({record}) {
    if (!record) {
        return <></>
    }

    const linkHref = `https://www.amazon.com/dp/${record.ASINISBN}?tag=${config.affiliateId}`;
    console.log('isMobile',isMobile());
    return (
        <>
            <a href={linkHref} target={isMobile() ? null : '_blank'} rel={isMobile() ? null : 'noreferrer'} title={record.Title}>
                {record.Title}
            </a>
        </>
    );
}
import isMobile from 'is-mobile';

import config from '../config';

export default function AmznLink({record}) {
    if (!record) {
        return <></>
    }

    const linkHref = `https://www.amazon.com/dp/${record.ASINISBN}?tag=${config.affiliateId}`;
    const target = isMobile() ? null : '_blank';
    const rel = isMobile() ? null : 'noreferrer';
    return (
        <>
            <a href={linkHref} target={target} rel={rel} title={record.Title}>
                {record.Title}
            </a>
        </>
    );
}
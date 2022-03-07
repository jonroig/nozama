
export default function AmznLink({ASINISBN, title}) {
    const affiliateId = 'nozama072-20';

    const linkHref = `https://www.amazon.com/dp/B074H6M4LD?tag=nozama072-20`;
    return (
        <>
            <a href={linkHref} target="_blank" rel="noopener" title={title}>
                {title}
            </a>
        </>
    );
}
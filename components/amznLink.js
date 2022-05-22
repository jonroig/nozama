export default function AmznLink({record}) {
    if (!record) {
        return <></>
    }

    const linkHref = `https://www.amazon.com/dp/${record.ASINISBN}?tag=nozama072-20`;

    return (
        <>
            <a href={linkHref} target="_blank" rel="noreferrer" title={record.title}>
                {record.title}
            </a>
        </>
    );
}
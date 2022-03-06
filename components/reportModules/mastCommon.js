
export default function MostCommon({orderArray}) {
    const tmpAsinCountObj = {};
    orderArray.forEach(orderObj => {
        if (!tmpAsinCountObj[orderObj.ASINISBN]) {
            tmpAsinCountObj[orderObj.ASINISBN] = 0;
        }   
        tmpAsinCountObj[orderObj.ASINISBN]++;
    });
    
    const mostCommon = [];
    const sortedTmpAsinCountArray = Object.keys(tmpAsinCountObj).sort((a,b) => (tmpAsinCountObj[b]-tmpAsinCountObj[a]));
    sortedTmpAsinCountArray.forEach(ASIN => {
        if (tmpAsinCountObj[ASIN] > 1) {
            const tmpOrderObj = orderArray.find(record => record.ASINISBN === ASIN);
            const tmpObj = {
                count: tmpAsinCountObj[ASIN],
                Title: tmpOrderObj.Title,
                ASINISBN: tmpOrderObj.ASINISBN
            };
            mostCommon.push(tmpObj);
        }
    });

    const tmpRecords = mostCommon.slice(0, 10);
    
    return (
        <>
            <h3>Most Common</h3>
            {tmpRecords.map(record => (
                <div key={`mostCommon_${record.ASINISBN}`}>
                    {record.count} {record.Title}
                </div>
            ))}
        </>
    );
}
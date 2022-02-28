const {parse} = require('csv-parse');
const fs = require('fs');

const processFile = async (csvFile) => {
    records = []
    const parser = fs
        .createReadStream(csvFile)
        .pipe(parse({from_line: 2}));
    let i =1;
    for await (const record of parser) {
        records.push(record);
        i++;
    }

    return records;
}


module.exports ={
    processFile
};

# definitions for sqlite table

CREATE TABLE amzn (
    lastupdate text NOT NULL,
    stockdata text NOT NULL
);

INSERT INTO amzn (lastupdate, stockdata) VALUES ('1966-01-01', 'blah');
import 'express-async-errors';
import * as express from 'express';
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

process.on('unhandledRejection', ex => {
    console.log('unhandledRejection: ', ex);
    throw ex;
});
process.on('uncaughtException', err => {
    console.log('uncaughtException: ', err);
});

const port = process.env.PORT || 2222;
const host = process.env.HOST || 'http://localhost';
app.listen(port, () => console.log(`Listening: ${host}:${port}`));

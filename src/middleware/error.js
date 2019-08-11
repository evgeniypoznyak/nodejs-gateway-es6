export default (req, res) => {
    console.warn({
        level: 'warn',
        message: 'Something failed',
        meta: {
            headers: req.headers,
            body: req.body,
            params: req.params,
            cookies: req.cookies,
        },
    });

    return res.status(500) // internal server error
        .send('Something failed');
};

export const errorHandler = (err, req, res, next) => {
    let resStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message

    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map(item => item.message).join(',');
        resStatusCode = 400;
    }

    res.status(resStatusCode).json({
        mssg: message || 'Something went wrong',
        stack: err.stack || null,
    })
}

export const notFoundPathHandler = (req, res, next) => {
    const err = new Error(`url not found: ${req.originalUrl}`);
    res.status(404)
    next(err);
}
import AppError from "../utils/appError.js";

const handleCastErrorDB = err => {
    const message = `Błędny ${err.path}: ${err.value}`;
    return new AppError(message, 422);
}

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Taka nazwa już istnieje: ${value}. Proszę użyj innej.`
    return new AppError(message, 422);
}

const handleValidationErrorDB = err => {
    const obj = {};
    const errors = Object.values(err.errors);
    errors.forEach((el) => {
        obj[el.path] = el.message
    })
    return new AppError(JSON.stringify(obj), 422);
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorProd = (err, res) => {
    // Operational, trusted: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
        // Programming or other unknown error: dont want to leak details to the client
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

export const globalErrorHandler =  (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        // sendErrorDev(err, res);
        let error = Object.create(err);

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        sendErrorProd(error, res);
    }

    if (process.env.NODE_ENV === 'production') {
        let error = Object.create(err);

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        sendErrorProd(error, res);
    }
};

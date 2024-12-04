const responseFormatter = (req, res, next) => {
    res.success = (data) => {
        res.status(data?.statusCode || 200).json({
            success: true,
            message: data.message || "Your request is successfully executed",
            data: data?.data ?? data,
        })
    }
    res.error = (data) => {
        res.status(data?.statusCode || 404).json({
            success: false,
            message: data.message || "Something went wrong!!!",
            data: data?.data ?? null,
        })
    }

    next();
};

module.exports = responseFormatter;

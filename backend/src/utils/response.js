export const successResponse = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    status: true,
    message: message,
    data: data,
  });
};

export const errorResponse = (res, message, statusCode = 500, error = null) => {
  const response = {
    status: false,
    message,
  };

  if (process.env.NODE_ENV === "development" && error) {
    response.stack = error.stack;
    response.error = error;
  }

  return res.status(statusCode).json(response);
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Error inesperado" });
  }
};

export default errorHandler;

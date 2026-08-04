export const getHealth = (req, res) => {
  res.json({
    success: true,
    message: "Asian Auto Clean Park API is running",
    timestamp: new Date().toISOString(),
  });
};

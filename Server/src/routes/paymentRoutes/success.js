const successHandler = (req, res) => {
  try {
    const { items } = req.query;
    console.log(JSON.parse(items));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  successHandler,
};

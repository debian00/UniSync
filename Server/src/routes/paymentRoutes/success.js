const successHandler = (req, res) => {
  try {
    console.log("bien");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  successHandler,
};

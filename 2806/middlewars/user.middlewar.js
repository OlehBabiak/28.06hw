const { ErrorHandler, errorMessages } = require('../errors');
const { responseCodesEnum } = require('../constants');
const { UserModel } = require('../database');

module.exports = {
  checkEmailBusy: async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });

      if (user) {
        throw new Error(errorMessages.EMAIL_BUSY);
      }

      req.user = req.body;

      next();
    } catch (e) {
      next(e);
    }
  },
  checkIsUserPresent: async (req, res, next) => {
    try {
      const userId = req.params;

      const userById = await UserModel.findById(userId);

      if (!userById) {
        throw new ErrorHandler(responseCodesEnum.NOT_FOUND,
          errorMessages.RECORD_NOT_FOUND.message,
          errorMessages.RECORD_NOT_FOUND.code);
      }

      req.user = userById;

      next();
    } catch (e) {
      next(e);
    }
  }
};

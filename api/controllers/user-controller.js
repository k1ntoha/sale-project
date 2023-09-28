const userService = require("../services/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
class userController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(password, email);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  async sendrecover(req, res, next) {
    try {
      const { email } = req.body;
      const data = await userService.sendrecover(email);
      return res.status(200).json(email);
    } catch (e) {
      next(e);
    }
  }
  async checkRecoverCode(req, res, next) {
    try {
      const { recoverCode, email } = req.body;
      const result = await userService.checkRecoverCode(recoverCode, email);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  async resetPassword(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await userService.resetPassword(email, password);
      return res.status(200).json("done");
    } catch (e) {
      next(e);
    }
  }
  async validateAccess(req, res, next) {
    try {
      if (!result) {
        return res.status(401);
      }
      return res.status(200);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new userController();

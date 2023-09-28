const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("../services/mail-service");
const UserDto = require("../dtos/user-dto");
const userModel = require("../models/user-model");
const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");
class UserService {
  async registration(password, email) {
    let candidate = await userModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const hashPasword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4(); // generates some link to activation

    const user = await userModel.create({
      password: hashPasword,
      email,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/v1/activate/${activationLink}`
    );

    const userDto = new UserDto(user); // id , email , isactivated
    const tokens = tokenService.generateTokens({
      ...userDto,
    });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async activate(activationLink) {
    const user = await userModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Нет такого юзера");
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email, password) {
    const condidate = await userModel.findOne({ email });
    if (!condidate) {
      throw ApiError.BadRequest("Пользователь с таким email не найден ");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      condidate.password
    );
    if (!isPasswordCorrect) {
      throw ApiError.BadRequest("Некорректный пароль");
    }
    const userDto = new UserDto(condidate);
    const tokens = tokenService.generateTokens({
      ...userDto,
    });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await userModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async getAllUsers() {
    const users = await userModel.find();
    let userstoFront = [];
    users.map((user) => {
      user = new UserDto(user);
      userstoFront.push(user);
    }); // deletiting password
    return userstoFront;
  }
  async getUser(id) {
    const user = await userModel.findById(id);
    return user;
  }
  async sendrecover(email) {
    if (!email) {
      throw ApiError.BadRequest();
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Нет такого пользователся с таким е-mail");
    }
    const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const hashCode = await bcrypt.hash(String(code), 3);
    const token = await tokenService.generateRecoverToken({
      recoverCode: hashCode,
    });
    await mailService.sendRecoverAccess(
      user.email,
      `Ваш код для восстановления пароля : ${code} 
       Срок действия кода 3 минуты
			 Lol Kek Cheburek
      
      Если вы не хотели изменять пароль , то проигнорируйте данное письмо `
    );
    await user.updateOne({ resetlink: token });
    return token;
  }
  async checkRecoverCode(code, email) {
    if (!code || !email) {
      throw ApiError.BadRequest("empty spaces");
    }
    const user = await userModel.findOne({ email: email });
    const checkToken = tokenService.validateRecoverToken(user.resetlink);
    const checkPassword = await bcrypt.compare(
      String(code),
      checkToken.recoverCode
    );
    if (checkPassword) {
      return true;
    }
    return false;
  }
  async addToProfile(userId, saleId) {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $push: { createdSales: saleId } },
      { new: true } // returning new
    );
    if (!user) {
      throw ApiError.UnauthorizedError();
    }
    return user;
  }
  async removeFromProfile(userId, saleId) {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { createdSales: saleId } },
      { new: true }
    );
    if (!user) {
      throw ApiError.UnauthorizedError();
    }
    return user;
  }

  async saveToProfile(userId, saleId) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw ApiError.UnauthorizedError();
    }
    const savedSales = user.savedSales || [];
    if (savedSales.includes(saleId)) {
      user.savedSales = savedSales.filter((id) => id !== saleId);
    } else {
      user.savedSales.push(saleId);
    }
    await user.save();
    return user;
  }
  async resetPassword(email, password) {
    const user = await userModel.findOne({ email: email });
    const newHashPassword = await bcrypt.hash(password, 3);
    user.password = newHashPassword;
    user.resetlink = "";
    await user.save();
    return user;
  }
}
module.exports = new UserService();

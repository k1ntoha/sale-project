const ApiError = require("../exceptions/api-error");
const saleService = require("../services/sale-service");
class SaleController {
  async addSale(req, res, next) {
    try {
      const refreshToken = req.headers.cookie.split("refreshToken=")[1];
      const saleData = req.body;
      const sale = await saleService.addSale(refreshToken, saleData);
      res.status(200).json({ sale: sale });
    } catch (e) {
      next(e);
    }
  }
  async saleUpdate(req, res, next) {
    try {
      const sale = req.body;
      const result = await saleService.saleUpdate(sale);
      return res.status(200).json({ sale: sale });
    } catch (e) {
      next(e);
    }
  }
  async saleDelete(req, res, next) {
    // for user
    try {
      const { saleId } = req.body;
      const { refreshToken } = req.cookies;
      await saleService.saleDelete(refreshToken, saleId);
      return res.status(200).send({ saleId: saleId });
    } catch (e) {
      next(e);
    }
  }
  async getSale(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const sales = await saleService.getSale(refreshToken);
      res.status(200).json({ sls: sales });
    } catch (e) {
      next(e);
    }
  }
  async getAllSales(req, res, next) {
    try {
      const sales = await saleService.getAllSales();
      res.status(200).json(sales);
    } catch (e) {
      next(e);
    }
  }
  async saleApprove(req, res, next) {
    try {
      const { saleId } = req.body;
      const result = await saleService.saleApprove(saleId);
      return res.status(200).send(result);
    } catch (e) {
      next(e);
    }
  }
  async saleDecline(req, res, next) {
    try {
      const { id } = req.body;
      await saleService.saleDecline(id);
      return res.status(200);
    } catch (e) {
      next(e);
    }
  }
  async saleSave(req, res, next) {
    try {
      const { saleId } = req.body;
      const { refreshToken } = req.cookies;
      await saleService.saveSale(refreshToken, saleId);
      return res.status(200).json({ saleId: saleId });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SaleController();

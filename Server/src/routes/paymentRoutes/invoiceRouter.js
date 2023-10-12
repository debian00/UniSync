const { Router } = require("express");
const generateInvoice = require("../../configuration/invoice");

const invoiceRouter = Router();

// Genera una factura para un usuario específico
invoiceRouter.post('/generate/:id', generateInvoice);

module.exports = invoiceRouter;
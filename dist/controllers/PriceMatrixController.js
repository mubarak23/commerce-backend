"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceMatrixController = void 0;
const tsoa_1 = require("tsoa");
const constants_1 = require("../constants");
const PriceMatrixService = __importStar(require("../services/priceMatrixService"));
// DO NOT EXPORT DEFAULT
let PriceMatrixController = class PriceMatrixController extends tsoa_1.Controller {
    handleApprovePricesMatrix(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield PriceMatrixService.processApprovalPriceMatrix(id);
            const redirectUrl = process.env.NODE_ENV === constants_1.ProductionEnv ? 'https://www.cinderbuild.com' : 'https://cinderbuild-dev-002.netlify.app';
            this.setStatus(301);
            this.setHeader('Location', redirectUrl);
            const resData = {
                status: true,
                message: 'Redirecting...',
                url: redirectUrl
            };
            return resData;
        });
    }
    // processPriceMatrixOrderDeliveryConfirmation
    handleConfirmDeliveryForPricesMatrix(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield PriceMatrixService.processPriceMatrixOrderDeliveryConfirmation(id);
            const redirectUrl = process.env.NODE_ENV === constants_1.ProductionEnv ? 'https://www.cinderbuild.com' : 'https://cinderbuild-dev-002.netlify.app';
            this.setStatus(301);
            this.setHeader('Location', redirectUrl);
            const resData = {
                status: true,
                message: 'Redirecting...',
                url: redirectUrl
            };
            return resData;
        });
    }
    // processDeclinePriceMatrix
    handleDeclinePricesMatrix(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield PriceMatrixService.processDeclinePriceMatrix(id);
            const redirectUrl = process.env.NODE_ENV === constants_1.ProductionEnv ? 'https://www.cinderbuild.com' : 'https://cinderbuild-dev-002.netlify.app';
            this.setStatus(301);
            this.setHeader('Location', redirectUrl);
            const resData = {
                status: true,
                message: 'Redirecting...',
                url: redirectUrl
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)('approve/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PriceMatrixController.prototype, "handleApprovePricesMatrix", null);
__decorate([
    (0, tsoa_1.Get)('confirmdelivery/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PriceMatrixController.prototype, "handleConfirmDeliveryForPricesMatrix", null);
__decorate([
    (0, tsoa_1.Get)('decline/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PriceMatrixController.prototype, "handleDeclinePricesMatrix", null);
PriceMatrixController = __decorate([
    (0, tsoa_1.Route)("api/pricematrix"),
    (0, tsoa_1.Tags)("Price Matrix")
], PriceMatrixController);
exports.PriceMatrixController = PriceMatrixController;
//# sourceMappingURL=PriceMatrixController.js.map
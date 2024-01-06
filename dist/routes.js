"use strict";
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
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const AccessController_1 = require("./controllers/AccessController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const AdminController_1 = require("./controllers/AdminController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const BankController_1 = require("./controllers/BankController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CartController_1 = require("./controllers/CartController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CooperateController_1 = require("./controllers/CooperateController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CouponController_1 = require("./controllers/CouponController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const DeliveryLocationController_1 = require("./controllers/DeliveryLocationController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const EstateDeveloperController_1 = require("./controllers/EstateDeveloperController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const InvestorController_1 = require("./controllers/InvestorController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const InvoiceController_1 = require("./controllers/InvoiceController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const MiscController_1 = require("./controllers/MiscController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const MortgageCardController_1 = require("./controllers/MortgageCardController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const NotificationsController_1 = require("./controllers/NotificationsController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const OnboardingController_1 = require("./controllers/OnboardingController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const OrdersController_1 = require("./controllers/OrdersController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const PaymentController_1 = require("./controllers/PaymentController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const PickupLocationController_1 = require("./controllers/PickupLocationController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const PriceMatrixController_1 = require("./controllers/PriceMatrixController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ProcurementController_1 = require("./controllers/ProcurementController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ProcurementInvoiceOrderController_1 = require("./controllers/ProcurementInvoiceOrderController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ProductController_1 = require("./controllers/ProductController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ProductLeaseController_1 = require("./controllers/ProductLeaseController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ProfileController_1 = require("./controllers/ProfileController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ProjectController_1 = require("./controllers/ProjectController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const QuoteRequestController_1 = require("./controllers/QuoteRequestController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const SavedProductController_1 = require("./controllers/SavedProductController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const TemporaryOrdersController_1 = require("./controllers/TemporaryOrdersController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const UploadController_1 = require("./controllers/UploadController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const WalletController_1 = require("./controllers/WalletController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const WareHouseController_1 = require("./controllers/WareHouseController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const WareHouseProductReorderLevelController_1 = require("./controllers/WareHouseProductReorderLevelController");
const authentication_1 = require("./authentication");
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
const multer = require('multer');
const upload = multer();
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "IAccessTokenData": {
        "dataType": "refObject",
        "properties": {
            "token": { "dataType": "string", "required": true },
            "refreshToken": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DetailedError": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "standardizedErrorCode": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IAccessTokenData_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IAccessTokenData" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPasswordLoginRequestDto": {
        "dataType": "refObject",
        "properties": {
            "phoneNumber": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse__phoneVerificationOtp%3F%3Astring__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "phoneVerificationOtp": { "dataType": "string" } } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginWithPhone": {
        "dataType": "refObject",
        "properties": {
            "phoneNumber": { "dataType": "string", "required": true },
            "countryIso2": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginWithPhoneOtpVerify": {
        "dataType": "refObject",
        "properties": {
            "phoneNumber": { "dataType": "string", "required": true },
            "countryIso2": { "dataType": "string", "required": true },
            "otp": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_void_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "void" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_any_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "any" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewCategoryRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "unitOfMeasurement": { "dataType": "string", "required": true },
            "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewUpdateCategoryRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string" },
            "unitOfMeasurement": { "dataType": "string" },
            "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "brandUuids": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewBrandRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "categoryUuids": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Roles": {
        "dataType": "refEnum",
        "enums": ["normal_user", "superadmin", "affiliate", "developer", "investor"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRating": {
        "dataType": "refObject",
        "properties": {
            "totalRatingsValue": { "dataType": "double", "required": true },
            "totalNumberOfRatings": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPublicBusinessProfile": {
        "dataType": "refObject",
        "properties": {
            "businessName": { "dataType": "string", "required": true },
            "businessAddress": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPublicProfileForAdmin": {
        "dataType": "refObject",
        "properties": {
            "userUuid": { "dataType": "string", "required": true },
            "userId": { "dataType": "double", "required": true },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "photoUrl": { "dataType": "string", "required": true },
            "storeFrontBannerImageUrl": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "role": { "ref": "Roles", "required": true },
            "sellerUniqueCode": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "phoneNumber": { "dataType": "string", "required": true },
            "accountRating": { "ref": "IRating", "required": true },
            "businessProfile": { "dataType": "union", "subSchemas": [{ "ref": "IPublicBusinessProfile" }, { "dataType": "enum", "enums": [null] }] },
            "msisdn": { "dataType": "string", "required": true },
            "isSeller": { "dataType": "boolean", "required": true },
            "isCooperate": { "dataType": "boolean", "required": true },
            "accountId": { "dataType": "double", "required": true },
            "walletBalanceMajor": { "dataType": "double", "required": true },
            "walletCurrency": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_IPublicProfileForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IPublicProfileForAdmin" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_IPublicProfileForAdmin_-or-IPublicProfileForAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_IPublicProfileForAdmin_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "IPublicProfileForAdmin" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SortOrder": {
        "dataType": "refEnum",
        "enums": ["ASC", "DESC"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPublicProfileForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPublicProfileForAdmin" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeliveryLocationResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "userId": { "dataType": "double", "required": true },
            "contactFullName": { "dataType": "string", "required": true },
            "contactPhoneNumber": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
            "country": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "state": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_DeliveryLocationResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DeliveryLocationResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_DeliveryLocationResponseDto_-or-DeliveryLocationResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_DeliveryLocationResponseDto_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "DeliveryLocationResponseDto" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddDeliveryLocationByAdminRequestDto": {
        "dataType": "refObject",
        "properties": {
            "userId": { "dataType": "double", "required": true },
            "contactFullName": { "dataType": "string", "required": true },
            "contactPhoneNumber": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
            "state": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPublicProfile": {
        "dataType": "refObject",
        "properties": {
            "userUuid": { "dataType": "string", "required": true },
            "userId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "photoUrl": { "dataType": "string", "required": true },
            "storeFrontBannerImageUrl": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "role": { "ref": "Roles", "required": true },
            "sellerUniqueCode": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "phoneNumber": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "accountRating": { "ref": "IRating", "required": true },
            "businessProfile": { "dataType": "union", "subSchemas": [{ "ref": "IPublicBusinessProfile" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPublicProfileProductLease": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "uuid": { "dataType": "string", "required": true },
            "publicProfile": { "ref": "IPublicProfile", "required": true },
            "principalAmountMajor": { "dataType": "double", "required": true },
            "interestRatePercentage": { "dataType": "double", "required": true },
            "nextLeasePaymentDueDateUtc": { "dataType": "datetime", "required": true },
            "createdAtUtc": { "dataType": "datetime", "required": true },
            "currency": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_IPublicProfileProductLease_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IPublicProfileProductLease" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_IPublicProfileProductLease_-or-IPublicProfileProductLease-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_IPublicProfileProductLease_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "IPublicProfileProductLease" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPublicProfileProductLease_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPublicProfileProductLease" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_boolean_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "boolean" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INewProductLeaseStatusToggleDto": {
        "dataType": "refObject",
        "properties": {
            "customerUserId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INewProductLeaseRequestDto": {
        "dataType": "refObject",
        "properties": {
            "customerMsisdn": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "customerUserId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "principalAmountMinor": { "dataType": "double", "required": true },
            "interestRatePercentage": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IEditProductLeaseRequestDto": {
        "dataType": "refObject",
        "properties": {
            "principalAmountMinor": { "dataType": "double", "required": true },
            "interestRatePercentage": { "dataType": "double", "required": true },
            "nextLeasePaymentDueDate": { "dataType": "string", "required": true },
            "isActive": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductLease": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "principalAmountMajor": { "dataType": "double", "required": true },
            "interestRatePercentage": { "dataType": "double", "required": true },
            "amountDueMajor": { "dataType": "double", "required": true },
            "nextLeasePaymentDueDateUtc": { "dataType": "datetime", "required": true },
            "totalLoanAmountDue": { "dataType": "double", "required": true },
            "createdAtUtc": { "dataType": "datetime", "required": true },
            "currency": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IProductLease_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IProductLease" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentTransactionTypes": {
        "dataType": "refEnum",
        "enums": ["external_to_fund_wallet", "external_to_pay_for_order", "buyer_wallet_to_escrow", "escrow_to_buyer_wallet", "escrow_to_seller", "escrow_to_cinderbuild_revenue", "escrow_to_refund_buyer", "warehouse_to_site_delivery_payment", "cooperate_account_discount", "project_subscription_payment", "wallet_funds_withdrawal", "wallet_funds_withdrawal_refund", "wallet_funds_transfer", "wallet_to_delivery_fee_wallet_transfer", "product_lease_principal_debit", "product_lease_interest_payment_debit", "c_store_default_payment_charges", "product_lease_payment", "order_payment_default_debit", "order_payment_default_daily_debit"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FinancialTransactionMetadata": {
        "dataType": "refObject",
        "properties": {
            "orderUuid": { "dataType": "string" },
            "temporaryOrderUuid": { "dataType": "string" },
            "productLeaseId": { "dataType": "double" },
            "wareHouseTositeUuid": { "dataType": "string" },
            "projectSubscriptionUuid": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransactionFlowType": {
        "dataType": "refEnum",
        "enums": ["in", "out"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IFinancialTransactionForAdmin": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "type": { "ref": "PaymentTransactionTypes", "required": true },
            "amountMajor": { "dataType": "double", "required": true },
            "currency": { "dataType": "string", "required": true },
            "walletBalanceMajorBefore": { "dataType": "double", "required": true },
            "walletBalanceMajorAfter": { "dataType": "double", "required": true },
            "metadata": { "ref": "FinancialTransactionMetadata", "required": true },
            "paidStatus": { "dataType": "any", "required": true },
            "description": { "dataType": "string", "required": true },
            "flowType": { "ref": "TransactionFlowType", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "id": { "dataType": "string", "required": true },
            "userId": { "dataType": "double", "required": true },
            "publicProfile": { "ref": "IPublicProfile", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_IFinancialTransactionForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IFinancialTransactionForAdmin" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_IFinancialTransactionForAdmin_-or-IFinancialTransactionForAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_IFinancialTransactionForAdmin_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "IFinancialTransactionForAdmin" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IFinancialTransactionForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IFinancialTransactionForAdmin" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAddNewFinancialTransactionByAdmin": {
        "dataType": "refObject",
        "properties": {
            "userId": { "dataType": "double", "required": true },
            "amountMajor": { "dataType": "double", "required": true },
            "description": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewPromotionRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "percentage": { "dataType": "double", "required": true },
            "categoryUuid": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SimpleImageJson": {
        "dataType": "refObject",
        "properties": {
            "keyFromCloudProvider": { "dataType": "string", "required": true },
            "url": { "dataType": "string", "required": true },
            "mimetype": { "dataType": "string", "required": true },
            "fileCloudProvider": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryStateDeliveryFee": {
        "dataType": "refObject",
        "properties": {
            "state": { "dataType": "string", "required": true },
            "deliveryFeeMajor": { "dataType": "double" },
            "deliveryFeeCurrency": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryProfitMargin": {
        "dataType": "refObject",
        "properties": {
            "amountMajor": { "dataType": "double", "required": true },
            "currency": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategorySettingsData": {
        "dataType": "refObject",
        "properties": {
            "deliveryFees": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CategoryStateDeliveryFee" }, "required": true },
            "cinderbuildProfiltMargin": { "dataType": "union", "subSchemas": [{ "ref": "CategoryProfitMargin" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Category": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "uuid": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "brands": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "uuid": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true } } }, "required": true },
            "unitOfMeasurement": { "dataType": "string", "required": true },
            "image": { "ref": "SimpleImageJson", "required": true },
            "banner": { "ref": "SimpleImageJson", "required": true },
            "description": { "dataType": "string", "required": true },
            "settings": { "ref": "CategorySettingsData", "required": true },
            "isAvailable": { "dataType": "boolean", "required": true },
            "productsCount": { "dataType": "double", "required": true },
            "isSoftDeleted": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Promotion": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "uuid": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "percentage": { "dataType": "double", "required": true },
            "categoryId": { "dataType": "double", "required": true },
            "categoryPromotion": { "ref": "Category", "required": true },
            "endDate": { "dataType": "datetime" },
            "isActive": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_Promotion_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Promotion" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_Promotion_-or-Promotion-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_Promotion_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "Promotion" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_Category_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Category" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_Category_-or-Category-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_Category_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "Category" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Brand": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "uuid": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "categories": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "uuid": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true } } }, "required": true },
            "image": { "ref": "SimpleImageJson", "required": true },
            "isAvailable": { "dataType": "boolean", "required": true },
            "productsCount": { "dataType": "double", "required": true },
            "isSoftDeleted": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_Brand_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Brand" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_Brand_-or-Brand-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_Brand_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "Brand" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewAffiliateRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "phoneNumber": { "dataType": "string", "required": true },
            "emailAddress": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewSellerOmaRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "phoneNumber": { "dataType": "string", "required": true },
            "emailAddress": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "isOMA": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderReceiveTypes": {
        "dataType": "refEnum",
        "enums": ["DELIVERY", "PICKUP", "WARE_HOUSE"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderStatuses": {
        "dataType": "refEnum",
        "enums": ["CREATED", "IN_PROGRESS", "AVAILABLE_FOR_PICKUP", "AVAILABLE_FOR_DELIVERY", "RECEIVED", "COMPLETED", "CONFIRMED", "CONFIRMED_BY_SYSTEM", "CANCELLED_BY_BUYER", "CANCELLED_BY_SELLER", "CANCELLED_BY_ADMIN", "ENDED_WITH_DISPUTES", "PAYMENT_DEFAULT"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPaymentStatuses": {
        "dataType": "refEnum",
        "enums": ["BUYER_PAYMENT_PENDING", "BUYER_PAYMENT_IN_ESCROW", "BUYER_PAYMENT_REFUND", "ESCROW_FUNDS_MOVED_TO_SELLER", "CANCELLED_BY_ADMIN"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPaymentVariant": {
        "dataType": "refEnum",
        "enums": ["WALLET", "CARD", "PAY_ON_DELIVERY"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHistory_OrderStatuses_": {
        "dataType": "refObject",
        "properties": {
            "status": { "ref": "OrderStatuses", "required": true },
            "dateTimeInISO8601": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHistory_OrderPaymentStatuses_": {
        "dataType": "refObject",
        "properties": {
            "status": { "ref": "OrderPaymentStatuses", "required": true },
            "dateTimeInISO8601": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderReceiver": {
        "dataType": "refObject",
        "properties": {
            "userUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "userId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "firstName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "lastName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "msisdn": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrdersDetailsForAdminResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "uuid": { "dataType": "string", "required": true },
            "referenceNumber": { "dataType": "string", "required": true },
            "buyerPublicProfile": { "ref": "IPublicProfile", "required": true },
            "sellerPublicProfile": { "ref": "IPublicProfile", "required": true },
            "orderReceiveType": { "ref": "OrderReceiveTypes", "required": true },
            "status": { "ref": "OrderStatuses", "required": true },
            "paymentStatus": { "ref": "OrderPaymentStatuses", "required": true },
            "paymentVariant": { "ref": "OrderPaymentVariant", "required": true },
            "statusHistory": { "dataType": "array", "array": { "dataType": "refObject", "ref": "StatusHistory_OrderStatuses_" }, "required": true },
            "paymentStatusHistory": { "dataType": "array", "array": { "dataType": "refObject", "ref": "StatusHistory_OrderPaymentStatuses_" }, "required": true },
            "calculatedTotalCostMajor": { "dataType": "double", "required": true },
            "deliveryCostMajor": { "dataType": "double", "required": true },
            "receiver": { "dataType": "union", "subSchemas": [{ "ref": "OrderReceiver" }, { "dataType": "enum", "enums": [null] }] },
            "currency": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_OrdersDetailsForAdminResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "OrdersDetailsForAdminResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_OrdersDetailsForAdminResponseDto_-or-OrdersDetailsForAdminResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_OrdersDetailsForAdminResponseDto_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "OrdersDetailsForAdminResponseDto" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreatedOrderData": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "orderRef": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentInitializeResponse": {
        "dataType": "refObject",
        "properties": {
            "paymentProviderRedirectUrl": { "dataType": "string", "required": true },
            "paymentReference": { "dataType": "string", "required": true },
            "accessCode": { "dataType": "string", "required": true },
            "redirectUrlAfterPayment": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentTransactionStatus": {
        "dataType": "refEnum",
        "enums": ["unpaid", "paid", "failed"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPayResponseDto": {
        "dataType": "refObject",
        "properties": {
            "orders": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CreatedOrderData" }, "required": true },
            "orderUuids": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "paymentProviderDetails": { "ref": "PaymentInitializeResponse" },
            "paymentTransactionStatus": { "ref": "PaymentTransactionStatus", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_OrderPayResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "OrderPayResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CartItemsForSeller": {
        "dataType": "refObject",
        "properties": {
            "productUuid": { "dataType": "string", "required": true },
            "quantity": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderSellerGroup": {
        "dataType": "refObject",
        "properties": {
            "userUuid": { "dataType": "string", "required": true },
            "orderReceiveType": { "ref": "OrderReceiveTypes", "required": true },
            "pickupLocationUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "cartItems": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CartItemsForSeller" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOrderByAdminRequestDto": {
        "dataType": "refObject",
        "properties": {
            "userId": { "dataType": "double", "required": true },
            "productId": { "dataType": "double", "required": true },
            "quantity": { "dataType": "double", "required": true },
            "unitPrice": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "orderPaymentVariant": { "ref": "OrderPaymentVariant", "required": true },
            "orderReceiveType": { "ref": "OrderReceiveTypes", "required": true },
            "differentOrderReceiver": { "dataType": "union", "subSchemas": [{ "ref": "OrderReceiver" }, { "dataType": "enum", "enums": [null] }] },
            "deliveryAddressId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "pickupLocationId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "sellers": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "refObject", "ref": "OrderSellerGroup" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WalletToWalletTransfer": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "adminUserId": { "dataType": "double", "required": true },
            "senderUserId": { "dataType": "double", "required": true },
            "receiverUserId": { "dataType": "double", "required": true },
            "amountMajor": { "dataType": "double", "required": true },
            "currency": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_WalletToWalletTransfer_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "WalletToWalletTransfer" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_WalletToWalletTransfer_-or-WalletToWalletTransfer-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_WalletToWalletTransfer_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "WalletToWalletTransfer" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IWalletTransferTransactionByAdmin": {
        "dataType": "refObject",
        "properties": {
            "senderUserId": { "dataType": "double", "required": true },
            "receiverUserId": { "dataType": "double", "required": true },
            "amountMajor": { "dataType": "double", "required": true },
            "description": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CartItemJson": {
        "dataType": "refObject",
        "properties": {
            "productId": { "dataType": "double", "required": true },
            "productUuid": { "dataType": "string", "required": true },
            "productName": { "dataType": "string", "required": true },
            "quantity": { "dataType": "double", "required": true },
            "unitPrice": { "dataType": "double", "required": true },
            "unitPriceForBuyer": { "dataType": "double", "required": true },
            "unitPromoPriceForBuyer": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "promotionId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "images": { "dataType": "array", "array": { "dataType": "refObject", "ref": "SimpleImageJson" } },
            "productCategorySettings": { "ref": "CategorySettingsData" },
            "deliveryAddressState": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "quoteRequest": { "dataType": "nestedObjectLiteral", "nestedProperties": { "calculatedTotalCostMajor": { "dataType": "double", "required": true }, "deliveryFee": { "dataType": "double", "required": true }, "unitPromoPriceForBuyer": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] }, "unitPriceForBuyer": { "dataType": "double", "required": true }, "unitPrice": { "dataType": "double", "required": true }, "uuid": { "dataType": "string", "required": true } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderDetailsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "orderUuid": { "dataType": "string", "required": true },
            "orderItems": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CartItemJson" }, "required": true },
            "referenceNumber": { "dataType": "string", "required": true },
            "sellerPublicProfile": { "ref": "IPublicProfile", "required": true },
            "buyerPublicProfile": { "ref": "IPublicProfile", "required": true },
            "orderReceiveType": { "ref": "OrderReceiveTypes", "required": true },
            "status": { "ref": "OrderStatuses", "required": true },
            "paymentStatus": { "ref": "OrderPaymentStatuses", "required": true },
            "paymentVariant": { "ref": "OrderPaymentVariant", "required": true },
            "orderLocation": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": { "contactPhoneNumber": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "contactFullName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "state": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "country": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "address": { "dataType": "string" }, "name": { "dataType": "string" } } }, { "dataType": "enum", "enums": [null] }] },
            "statusHistory": { "dataType": "array", "array": { "dataType": "refObject", "ref": "StatusHistory_OrderStatuses_" }, "required": true },
            "paymentStatusHistory": { "dataType": "array", "array": { "dataType": "refObject", "ref": "StatusHistory_OrderPaymentStatuses_" }, "required": true },
            "procurementInvoiceUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "calculatedTotalCostMajor": { "dataType": "double", "required": true },
            "deliveryCostMajor": { "dataType": "double", "required": true },
            "currency": { "dataType": "string", "required": true },
            "currencySymbol": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_OrderDetailsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "OrderDetailsResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Category_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "Category" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouse": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "uuid": { "dataType": "string", "required": true },
            "accountId": { "dataType": "double", "required": true },
            "createdByUserId": { "dataType": "double", "required": true },
            "isDefault": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string", "required": true },
            "state": { "dataType": "string", "required": true },
            "country": { "dataType": "string", "required": true },
            "totalValueMajor": { "dataType": "double", "required": true },
            "totalQuantity": { "dataType": "double", "required": true },
            "contactFullName": { "dataType": "string", "required": true },
            "contactPhoneNumber": { "dataType": "string", "required": true },
            "isSoftDeleted": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeliveryItemJson": {
        "dataType": "refObject",
        "properties": {
            "productUuid": { "dataType": "string", "required": true },
            "productName": { "dataType": "string", "required": true },
            "productId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "quantity": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouseToSiteDeliveryFeeStatuses": {
        "dataType": "refEnum",
        "enums": ["REQUESTED", "DELIVERY_FEE_SET", "DELIVERY_FEE_ACCEPTED", "DELIVERY_FEE_REJECTED", "DELIVERY_ITEMS_SHIPPED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHistory_WareHouseToSiteDeliveryFeeStatuses_": {
        "dataType": "refObject",
        "properties": {
            "status": { "ref": "WareHouseToSiteDeliveryFeeStatuses", "required": true },
            "dateTimeInISO8601": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_DeliveryLocation.Exclude_keyofDeliveryLocation.OmitFields__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "uuid": { "dataType": "string", "required": true }, "wareHouseId": { "dataType": "double", "required": true }, "address": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "country": { "dataType": "string", "required": true }, "state": { "dataType": "string", "required": true }, "contactFullName": { "dataType": "string", "required": true }, "contactPhoneNumber": { "dataType": "string", "required": true }, "isDefault": { "dataType": "boolean", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_DeliveryLocation.OmitFields_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_DeliveryLocation.Exclude_keyofDeliveryLocation.OmitFields__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouseToSiteDeliveryDtoForAdmin": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "wareHouseDetails": { "ref": "WareHouse" },
            "userId": { "dataType": "double", "required": true },
            "deliveryItems": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DeliveryItemJson" }, "required": true },
            "deliveryRequestHistory": { "dataType": "array", "array": { "dataType": "refObject", "ref": "StatusHistory_WareHouseToSiteDeliveryFeeStatuses_" }, "required": true },
            "status": { "ref": "WareHouseToSiteDeliveryFeeStatuses", "required": true },
            "totalAmountMajor": { "dataType": "double", "required": true },
            "deliveryFeeAmountMajor": { "dataType": "double", "required": true },
            "deliverySiteDetails": { "ref": "Omit_DeliveryLocation.OmitFields_" },
            "createdAt": { "dataType": "datetime", "required": true },
            "id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_WareHouseToSiteDeliveryDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "WareHouseToSiteDeliveryDtoForAdmin" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_WareHouseToSiteDeliveryDtoForAdmin_-or-WareHouseToSiteDeliveryDtoForAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_WareHouseToSiteDeliveryDtoForAdmin_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "WareHouseToSiteDeliveryDtoForAdmin" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_WareHouseToSiteDeliveryDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "WareHouseToSiteDeliveryDtoForAdmin" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestBankDetailsChangeDtoForAdmin": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "userId": { "dataType": "double", "required": true },
            "accountNumber": { "dataType": "string", "required": true },
            "bankCode": { "dataType": "string", "required": true },
            "bankAccountName": { "dataType": "string", "required": true },
            "bankName": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_RequestBankDetailsChangeDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "RequestBankDetailsChangeDtoForAdmin" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_RequestBankDetailsChangeDtoForAdmin_-or-RequestBankDetailsChangeDtoForAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_RequestBankDetailsChangeDtoForAdmin_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "RequestBankDetailsChangeDtoForAdmin" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvoiceItemJson": {
        "dataType": "refObject",
        "properties": {
            "productId": { "dataType": "double", "required": true },
            "productUuid": { "dataType": "string" },
            "productName": { "dataType": "string", "required": true },
            "quantity": { "dataType": "double", "required": true },
            "isPaid": { "dataType": "boolean" },
            "unitPrice": { "dataType": "double" },
            "unitPriceForBuyer": { "dataType": "double", "required": true },
            "unitPromoPriceForBuyer": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvoiceStatuses": {
        "dataType": "refEnum",
        "enums": ["SET", "ACCEPTED", "REQUEST_REVIEW", "REJECTED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHistory_InvoiceStatuses_": {
        "dataType": "refObject",
        "properties": {
            "status": { "ref": "InvoiceStatuses", "required": true },
            "dateTimeInISO8601": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProcurementInvoiceResponseDtoForAdmin": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "accountId": { "dataType": "double", "required": true },
            "referenceNumber": { "dataType": "string", "required": true },
            "calculatedTotalCostMajor": { "dataType": "double", "required": true },
            "invoiceItem": { "dataType": "array", "array": { "dataType": "refObject", "ref": "InvoiceItemJson" }, "required": true },
            "status": { "ref": "InvoiceStatuses", "required": true },
            "statusHistory": { "dataType": "array", "array": { "dataType": "refObject", "ref": "StatusHistory_InvoiceStatuses_" }, "required": true },
            "orderCreated": { "dataType": "boolean", "required": true },
            "orderCreatedAt": { "dataType": "datetime", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProcurementInvoiceResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "accountId": { "dataType": "double", "required": true },
            "referenceNumber": { "dataType": "string", "required": true },
            "calculatedTotalCostMajor": { "dataType": "double", "required": true },
            "invoiceItem": { "dataType": "array", "array": { "dataType": "refObject", "ref": "InvoiceItemJson" }, "required": true },
            "status": { "ref": "InvoiceStatuses", "required": true },
            "statusHistory": { "dataType": "array", "array": { "dataType": "refObject", "ref": "StatusHistory_InvoiceStatuses_" }, "required": true },
            "orderCreated": { "dataType": "boolean", "required": true },
            "orderCreatedAt": { "dataType": "datetime", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProcurementDtoForAdmin": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "accountId": { "dataType": "double", "required": true },
            "invoice": { "dataType": "union", "subSchemas": [{ "ref": "ProcurementInvoiceResponseDtoForAdmin" }, { "dataType": "enum", "enums": [null] }] },
            "upload": { "ref": "SimpleImageJson", "required": true },
            "isProcessed": { "dataType": "boolean", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProcurementDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProcurementDtoForAdmin" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProcurementDtoForAdmin_-or-ProcurementDtoForAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_ProcurementDtoForAdmin_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProcurementDtoForAdmin" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProcurementDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "ProcurementDtoForAdmin" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddItemToInvoiceRequestDto": {
        "dataType": "refObject",
        "properties": {
            "invoiceItem": { "ref": "InvoiceItemJson", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProcurementInvoiceResponseDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProcurementInvoiceResponseDtoForAdmin" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProcurementInvoiceResponseDtoForAdmin_-or-ProcurementInvoiceResponseDtoForAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_ProcurementInvoiceResponseDtoForAdmin_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProcurementInvoiceResponseDtoForAdmin" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProcurementInvoiceResponseDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "ProcurementInvoiceResponseDtoForAdmin" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_PickupLocation.Exclude_keyofPickupLocation.OmitFields__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "uuid": { "dataType": "string", "required": true }, "address": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "country": { "dataType": "string", "required": true }, "state": { "dataType": "string", "required": true }, "contactFullName": { "dataType": "string", "required": true }, "contactPhoneNumber": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_PickupLocation.OmitFields_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_PickupLocation.Exclude_keyofPickupLocation.OmitFields__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequestSellerResponse": {
        "dataType": "refObject",
        "properties": {
            "unitPrice": { "dataType": "double", "required": true },
            "unitPriceForBuyer": { "dataType": "double", "required": true },
            "unitPromoPriceForBuyer": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "promotionId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "deliveryFee": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "minimumQuantity": { "dataType": "double", "required": true },
            "maximumQuantity": { "dataType": "double", "required": true },
            "pickupAddress": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "productUuid": { "dataType": "string", "required": true },
            "productName": { "dataType": "string", "required": true },
            "productDescription": { "dataType": "string", "required": true },
            "sellerUserId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "sellerPublicProfile": { "ref": "IPublicProfile", "required": true },
            "oldSellerPublicProfile": { "dataType": "union", "subSchemas": [{ "ref": "IPublicProfile" }, { "dataType": "enum", "enums": [null] }] },
            "sellerPickupLocations": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "Omit_PickupLocation.OmitFields_" } },
            "price": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "unitPriceForBuyer": { "dataType": "double", "required": true },
            "unitPromoPriceForBuyer": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "minimumQuantity": { "dataType": "double", "required": true },
            "maximumQuantity": { "dataType": "double", "required": true },
            "unitOfMeasurement": { "dataType": "string", "required": true },
            "currency": { "dataType": "string", "required": true },
            "currencySymbol": { "dataType": "string", "required": true },
            "locationState": { "dataType": "string", "required": true },
            "totalRatingsValue": { "dataType": "double", "required": true },
            "totalNumberOfRatings": { "dataType": "double", "required": true },
            "isOnCart": { "dataType": "boolean" },
            "quoteRequest": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": { "sellerResponse": { "ref": "QuoteRequestSellerResponse", "required": true }, "quantity": { "dataType": "double", "required": true }, "uuid": { "dataType": "string", "required": true } } }, { "dataType": "enum", "enums": [null] }] },
            "brand": { "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string", "required": true }, "uuid": { "dataType": "string", "required": true } }, "required": true },
            "category": { "dataType": "nestedObjectLiteral", "nestedProperties": { "settings": { "ref": "CategorySettingsData", "required": true }, "name": { "dataType": "string", "required": true }, "uuid": { "dataType": "string", "required": true } }, "required": true },
            "images": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "mimetype": { "dataType": "string", "required": true }, "url": { "dataType": "string", "required": true } } }, "required": true },
            "hasVariants": { "dataType": "boolean", "required": true },
            "isVariant": { "dataType": "boolean", "required": true },
            "tags": { "dataType": "union", "subSchemas": [{ "dataType": "any" }, { "dataType": "enum", "enums": [null] }] },
            "variantsProducts": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "refObject", "ref": "ProductsResponseDto" } }, { "dataType": "boolean" }] },
            "isActive": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductsResponseDtoAdmin": {
        "dataType": "refObject",
        "properties": {
            "productUuid": { "dataType": "string", "required": true },
            "productName": { "dataType": "string", "required": true },
            "productDescription": { "dataType": "string", "required": true },
            "sellerUserId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "sellerPublicProfile": { "ref": "IPublicProfile", "required": true },
            "oldSellerPublicProfile": { "dataType": "union", "subSchemas": [{ "ref": "IPublicProfile" }, { "dataType": "enum", "enums": [null] }] },
            "sellerPickupLocations": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "Omit_PickupLocation.OmitFields_" } },
            "price": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "unitPriceForBuyer": { "dataType": "double", "required": true },
            "unitPromoPriceForBuyer": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "minimumQuantity": { "dataType": "double", "required": true },
            "maximumQuantity": { "dataType": "double", "required": true },
            "unitOfMeasurement": { "dataType": "string", "required": true },
            "currency": { "dataType": "string", "required": true },
            "currencySymbol": { "dataType": "string", "required": true },
            "locationState": { "dataType": "string", "required": true },
            "totalRatingsValue": { "dataType": "double", "required": true },
            "totalNumberOfRatings": { "dataType": "double", "required": true },
            "isOnCart": { "dataType": "boolean" },
            "quoteRequest": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": { "sellerResponse": { "ref": "QuoteRequestSellerResponse", "required": true }, "quantity": { "dataType": "double", "required": true }, "uuid": { "dataType": "string", "required": true } } }, { "dataType": "enum", "enums": [null] }] },
            "brand": { "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string", "required": true }, "uuid": { "dataType": "string", "required": true } }, "required": true },
            "category": { "dataType": "nestedObjectLiteral", "nestedProperties": { "settings": { "ref": "CategorySettingsData", "required": true }, "name": { "dataType": "string", "required": true }, "uuid": { "dataType": "string", "required": true } }, "required": true },
            "images": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "mimetype": { "dataType": "string", "required": true }, "url": { "dataType": "string", "required": true } } }, "required": true },
            "hasVariants": { "dataType": "boolean", "required": true },
            "isVariant": { "dataType": "boolean", "required": true },
            "tags": { "dataType": "union", "subSchemas": [{ "dataType": "any" }, { "dataType": "enum", "enums": [null] }] },
            "variantsProducts": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "refObject", "ref": "ProductsResponseDto" } }, { "dataType": "boolean" }] },
            "isActive": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
            "createdAt": { "dataType": "datetime", "required": true },
            "id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProductsResponseDtoAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProductsResponseDtoAdmin" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProductsResponseDtoAdmin_-or-ProductsResponseDtoAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_ProductsResponseDtoAdmin_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProductsResponseDtoAdmin" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewProductRequestDtoByAdmin": {
        "dataType": "refObject",
        "properties": {
            "userId": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "categoryId": { "dataType": "string", "required": true },
            "brandId": { "dataType": "string", "required": true },
            "price": { "dataType": "double" },
            "locationState": { "dataType": "string", "required": true },
            "tags": { "dataType": "union", "subSchemas": [{ "dataType": "any" }, { "dataType": "enum", "enums": [null] }] },
            "minQty": { "dataType": "double", "required": true },
            "maxQty": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProductsResponseDtoAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "ProductsResponseDtoAdmin" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequestStatuses": {
        "dataType": "refEnum",
        "enums": ["PENDING", "PROCESSED", "CANCELLED_BY_BUYER", "ENDED_BY_BUYER", "ORDER_CREATED", "DECLINED_BY_SELLER", "DECLINED_BY_ADMIN", "EXPIRED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequestResponseDtoAdmin": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "product": { "dataType": "nestedObjectLiteral", "nestedProperties": { "pickupAddressDetails": { "dataType": "union", "subSchemas": [{ "ref": "Omit_PickupLocation.OmitFields_" }, { "dataType": "enum", "enums": [null] }] }, "unitOfMeasurement": { "dataType": "string", "required": true }, "description": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "uuid": { "dataType": "string", "required": true } }, "required": true },
            "quantity": { "dataType": "double", "required": true },
            "buyerUserPublicProfile": { "ref": "IPublicProfile", "required": true },
            "sellerUserPublicProfile": { "ref": "IPublicProfile", "required": true },
            "notes": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "orderReceiveType": { "ref": "OrderReceiveTypes", "required": true },
            "deliveryAddress": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "deliverAddressUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "sellerResponse": { "dataType": "union", "subSchemas": [{ "ref": "QuoteRequestSellerResponse" }, { "dataType": "enum", "enums": [null] }] },
            "calculatedTotalCostMajor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "status": { "ref": "QuoteRequestStatuses", "required": true },
            "dateCreatedIso8601": { "dataType": "datetime", "required": true },
            "sellerPickupLocation": { "dataType": "nestedObjectLiteral", "nestedProperties": { "uuid": { "dataType": "string", "required": true }, "address": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true } } },
            "id": { "dataType": "double", "required": true },
            "userId": { "dataType": "double", "required": true },
            "referenceNumber": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_QuoteRequestResponseDtoAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "QuoteRequestResponseDtoAdmin" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_QuoteRequestResponseDtoAdmin_-or-QuoteRequestResponseDtoAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_QuoteRequestResponseDtoAdmin_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "QuoteRequestResponseDtoAdmin" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_QuoteRequestResponseDtoAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "QuoteRequestResponseDtoAdmin" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MoveSellerProductToOmaDto": {
        "dataType": "refObject",
        "properties": {
            "sellerUuid": { "dataType": "string", "required": true },
            "newSellerUuid": { "dataType": "string", "required": true },
            "categoryUuid": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProductsResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProductsResponseDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVirtualDedicatedAccount": {
        "dataType": "refObject",
        "properties": {
            "userId": { "dataType": "double", "required": true },
            "bankId": { "dataType": "string", "required": true },
            "bankName": { "dataType": "string", "required": true },
            "bankAccountNumber": { "dataType": "string", "required": true },
            "bankAccountName": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IVirtualDedicatedAccount_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IVirtualDedicatedAccount" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IVirtualDedicatedAccount-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IVirtualDedicatedAccount" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAuditLogs": {
        "dataType": "refObject",
        "properties": {
            "userId": { "dataType": "double", "required": true },
            "method": { "dataType": "string", "required": true },
            "path": { "dataType": "string", "required": true },
            "payload": { "dataType": "any", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IAuditLogs-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IAuditLogs" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PriceMatrixTransactionType": {
        "dataType": "refEnum",
        "enums": ["CASH_ON_DELIVERY", "C_STORES"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PriceMatriceStatuses": {
        "dataType": "refEnum",
        "enums": ["CREATED", "PRICE_SUBMITTED", "APPROVED", "DELIVERED", "CONFIRMED_DELIVERY", "SELLER_PAID", "DECLINED", "DECLINED_BY_ADMIN"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHistory_PriceMatriceStatuses_": {
        "dataType": "refObject",
        "properties": {
            "status": { "ref": "PriceMatriceStatuses", "required": true },
            "dateTimeInISO8601": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PriceMatricesResponseByAdmin": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "uuid": { "dataType": "string", "required": true },
            "qouteRequestRef": { "dataType": "string", "required": true },
            "qouteRequestId": { "dataType": "double", "required": true },
            "buyerUserPublicProfile": { "ref": "IPublicProfile", "required": true },
            "buyerUserId": { "dataType": "double", "required": true },
            "sellerUserPublicProfile": { "dataType": "union", "subSchemas": [{ "ref": "IPublicProfile" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "sellerUserId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "quantity": { "dataType": "double", "required": true },
            "transactionType": { "dataType": "union", "subSchemas": [{ "ref": "PriceMatrixTransactionType" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "product": { "dataType": "nestedObjectLiteral", "nestedProperties": { "pickupAddressDetails": { "dataType": "union", "subSchemas": [{ "ref": "Omit_PickupLocation.OmitFields_" }, { "dataType": "enum", "enums": [null] }] }, "unitOfMeasurement": { "dataType": "string", "required": true }, "description": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "uuid": { "dataType": "string", "required": true } }, "required": true },
            "deliveryDate": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "deliveryAddress": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "productSellingPriceMajor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "productCostPriceMajor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "totalProductSellingPriceMajor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "productMarginMajor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "totlaMarginMajor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "statusHistory": { "dataType": "array", "array": { "dataType": "refObject", "ref": "StatusHistory_PriceMatriceStatuses_" }, "required": true },
            "status": { "ref": "PriceMatriceStatuses", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_PriceMatricesResponseByAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "PriceMatricesResponseByAdmin" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_PriceMatricesResponseByAdmin_-or-PriceMatricesResponseByAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_PriceMatricesResponseByAdmin_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "PriceMatricesResponseByAdmin" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_PriceMatricesResponseByAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "PriceMatricesResponseByAdmin" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SubmitPriceMatricDto": {
        "dataType": "refObject",
        "properties": {
            "sellerUserId": { "dataType": "double", "required": true },
            "productSellingPriceMajor": { "dataType": "double", "required": true },
            "productCostPriceMajor": { "dataType": "double", "required": true },
            "deliveryDate": { "dataType": "datetime", "required": true },
            "transactionType": { "ref": "PriceMatrixTransactionType", "required": true },
            "qouteRequestRef": { "dataType": "double", "required": true },
            "deliveryFee": { "dataType": "double" },
            "quantity": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QouteRequestAdminCreateRequestDto": {
        "dataType": "refObject",
        "properties": {
            "buyerUserId": { "dataType": "double", "required": true },
            "sellerUserId": { "dataType": "double", "required": true },
            "productId": { "dataType": "double", "required": true },
            "quantity": { "dataType": "double", "required": true },
            "productSellingPriceMajor": { "dataType": "double", "required": true },
            "productCostPriceMajor": { "dataType": "double", "required": true },
            "transactionType": { "ref": "PriceMatrixTransactionType", "required": true },
            "deliveryDate": { "dataType": "datetime", "required": true },
            "orderReceiveType": { "ref": "OrderReceiveTypes", "required": true },
            "deliveryAddress": { "dataType": "string", "required": true },
            "deliveryFee": { "dataType": "double" },
            "notes": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UploadFileCategory": {
        "dataType": "refEnum",
        "enums": ["CATEGORY_PHOTO", "CATEGORY_BANNER", "PRODUCT_PHOTO", "BRAND_PHOTO", "USER_PHOTO", "STORE_FRONT_BANNER", "PROCURMENT_LIST", "PRODUCT_LEASE_REQUEST_ID_CARD", "PRODUCT_LEASE_REQUEST_CAC_CERTIFICATE", "PRODUCT_LEASE_BANK_STATEMENT", "PRODUCT_LEASE_UTILITY_BILL", "PRODUCT_LEASE_DISTRIBUTORSHIP_APPOINTMENT_LETTER", "SELLER_CAC_DOCUMENT", "SELLER_ID_CARD", "SELLER_COMPANY_LOGO", "BULK_PRODUCTS_FILE", "USER_BACK_DROP_PHOTO", "PROJECT_IMAGES", "BANK_STATEMENT", "GOVERNMENT_APPROVED_ID", "RECENT_UTILITY_BILL", "CAC_CERTIFICATE"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FileCloudProviders": {
        "dataType": "refEnum",
        "enums": ["CLOUDINARY"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MortgageAccountVerificationUpload": {
        "dataType": "refObject",
        "properties": {
            "keyFromCloudProvider": { "dataType": "string", "required": true },
            "url": { "dataType": "string", "required": true },
            "mimetype": { "dataType": "string", "required": true },
            "fileCloudProvider": { "ref": "FileCloudProviders", "required": true },
            "documentType": { "ref": "UploadFileCategory", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeveloperAccountVerificationResponseAdminDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "developerPublicProfile": { "ref": "IPublicProfile", "required": true },
            "accountType": { "ref": "Roles", "required": true },
            "bankStatement": { "ref": "MortgageAccountVerificationUpload", "required": true },
            "bankStatementApproved": { "dataType": "boolean", "required": true },
            "governmentApprovedId": { "ref": "MortgageAccountVerificationUpload", "required": true },
            "governmentApprovedIdApproved": { "dataType": "boolean", "required": true },
            "recentUtilityBill": { "ref": "MortgageAccountVerificationUpload", "required": true },
            "recentUtilityBillApproved": { "dataType": "boolean", "required": true },
            "cacCertificate": { "ref": "MortgageAccountVerificationUpload", "required": true },
            "cacCertificateApproved": { "dataType": "boolean", "required": true },
            "isApproved": { "dataType": "boolean", "required": true },
            "accountConfirmed": { "dataType": "boolean", "required": true },
            "id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_DeveloperAccountVerificationResponseAdminDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DeveloperAccountVerificationResponseAdminDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_DeveloperAccountVerificationResponseAdminDto_-or-DeveloperAccountVerificationResponseAdminDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "IPaginatedList_DeveloperAccountVerificationResponseAdminDto_" }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "DeveloperAccountVerificationResponseAdminDto" } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MortgageAccountVerificationFiles": {
        "dataType": "refEnum",
        "enums": ["BANK_STATEMENT", "GOVERNMENT_APPROVED_ID", "RECENT_UTILITY_BILL", "CAC_CERTIFICATE"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApprovedMortgageAccountDocumentDto": {
        "dataType": "refObject",
        "properties": {
            "userId": { "dataType": "double", "required": true },
            "fileKey": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MortgageCardDto": {
        "dataType": "refObject",
        "properties": {
            "pan": { "dataType": "string", "required": true },
            "isUsed": { "dataType": "boolean", "required": true },
            "isSoftDeleted": { "dataType": "boolean", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_MortgageCardDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "MortgageCardDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaystackBank": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "code": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "country": { "dataType": "string", "required": true },
            "currency": { "dataType": "string", "required": true },
            "type": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaystackBank-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IPaystackBank" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse__account_name-string__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "account_name": { "dataType": "string", "required": true } } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewBankAccountRequestDto": {
        "dataType": "refObject",
        "properties": {
            "accountNumber": { "dataType": "string", "required": true },
            "bankCode": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewCartItemRequestDto": {
        "dataType": "refObject",
        "properties": {
            "productUuid": { "dataType": "string", "required": true },
            "quantity": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CartItem": {
        "dataType": "refObject",
        "properties": {
            "productUuid": { "dataType": "string", "required": true },
            "productName": { "dataType": "string", "required": true },
            "productDescription": { "dataType": "string", "required": true },
            "sellerUserId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "sellerPublicProfile": { "ref": "IPublicProfile", "required": true },
            "oldSellerPublicProfile": { "dataType": "union", "subSchemas": [{ "ref": "IPublicProfile" }, { "dataType": "enum", "enums": [null] }] },
            "sellerPickupLocations": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "Omit_PickupLocation.OmitFields_" } },
            "price": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "unitPriceForBuyer": { "dataType": "double", "required": true },
            "unitPromoPriceForBuyer": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "minimumQuantity": { "dataType": "double", "required": true },
            "maximumQuantity": { "dataType": "double", "required": true },
            "unitOfMeasurement": { "dataType": "string", "required": true },
            "currency": { "dataType": "string", "required": true },
            "currencySymbol": { "dataType": "string", "required": true },
            "locationState": { "dataType": "string", "required": true },
            "totalRatingsValue": { "dataType": "double", "required": true },
            "totalNumberOfRatings": { "dataType": "double", "required": true },
            "isOnCart": { "dataType": "boolean" },
            "quoteRequest": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": { "sellerResponse": { "ref": "QuoteRequestSellerResponse", "required": true }, "quantity": { "dataType": "double", "required": true }, "uuid": { "dataType": "string", "required": true } } }, { "dataType": "enum", "enums": [null] }] },
            "brand": { "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string", "required": true }, "uuid": { "dataType": "string", "required": true } }, "required": true },
            "category": { "dataType": "nestedObjectLiteral", "nestedProperties": { "settings": { "ref": "CategorySettingsData", "required": true }, "name": { "dataType": "string", "required": true }, "uuid": { "dataType": "string", "required": true } }, "required": true },
            "images": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "mimetype": { "dataType": "string", "required": true }, "url": { "dataType": "string", "required": true } } }, "required": true },
            "hasVariants": { "dataType": "boolean", "required": true },
            "isVariant": { "dataType": "boolean", "required": true },
            "tags": { "dataType": "union", "subSchemas": [{ "dataType": "any" }, { "dataType": "enum", "enums": [null] }] },
            "variantsProducts": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "refObject", "ref": "ProductsResponseDto" } }, { "dataType": "boolean" }] },
            "isActive": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
            "createdAt": { "dataType": "datetime", "required": true },
            "quantity": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CartDetailsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "items": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CartItem" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_CartDetailsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "CartDetailsResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_any_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "any" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_any__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_any_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CooperateUserRole": {
        "dataType": "refEnum",
        "enums": ["ACCOUNT_LEVEL", "WARE_HOUSE_LEVEL"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddUserRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "lastName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "phoneNumber": { "dataType": "string", "required": true },
            "emailAddress": { "dataType": "string", "required": true },
            "wareHouseUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "role": { "ref": "CooperateUserRole", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeliveryWalletTranferDto": {
        "dataType": "refObject",
        "properties": {
            "amountMajor": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CouponValueType": {
        "dataType": "refEnum",
        "enums": ["AMOUNT_DISCOUNT", "PERCENTAGE_DISCOUNT"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewCouponRequestDto": {
        "dataType": "refObject",
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "productUuid": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            "couponValueType": { "ref": "CouponValueType", "required": true },
            "couponValue": { "dataType": "double", "required": true },
            "orderMinAmountMajor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CouponApplyType": {
        "dataType": "refEnum",
        "enums": ["PRODUCT_LEVEL", "ORDER_LEVEL"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CouponResponseDto": {
        "dataType": "refObject",
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "productUuid": { "dataType": "string" },
            "product": { "ref": "ProductsResponseDto" },
            "expiryDate": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            "isActive": { "dataType": "boolean", "required": true },
            "valueType": { "ref": "CouponValueType", "required": true },
            "applyType": { "ref": "CouponApplyType", "required": true },
            "value": { "dataType": "double", "required": true },
            "orderMinAmountMajor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_CouponResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CouponResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_CouponResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_CouponResponseDto_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewUpdateCouponRequestDto": {
        "dataType": "refObject",
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "expiryDate": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            "orderMinimumAmountMajor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_DeliveryLocation.OmitFields_-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "Omit_DeliveryLocation.OmitFields_" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_DeliveryLocation.OmitFields__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "Omit_DeliveryLocation.OmitFields_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeliveryLocationRequestDto": {
        "dataType": "refObject",
        "properties": {
            "contactFullName": { "dataType": "string", "required": true },
            "contactPhoneNumber": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
            "country": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "state": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUpdateDeliveryLocationDto": {
        "dataType": "refObject",
        "properties": {
            "contactFullName": { "dataType": "string" },
            "contactPhoneNumber": { "dataType": "string" },
            "address": { "dataType": "string" },
            "country": { "dataType": "string" },
            "state": { "dataType": "string" },
            "name": { "dataType": "string" },
            "isDefault": { "dataType": "boolean" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeveloperAccountActivationType": {
        "dataType": "refEnum",
        "enums": ["inactive", "pending", "active"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_DeveloperAccountActivationType_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "DeveloperAccountActivationType" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectPaymentPlan": {
        "dataType": "refEnum",
        "enums": ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectStatuses": {
        "dataType": "refEnum",
        "enums": ["PENDING", "DECLINED", "ACTIVE", "CLOSED", "ALL"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectSubscriptionResponseDto": {
        "dataType": "refObject",
        "properties": {
            "projectSubscriptionUuid": { "dataType": "string", "required": true },
            "projectUuid": { "dataType": "string", "required": true },
            "project": { "ref": "ProjectsResponseDto", "required": true },
            "developerPublicProfile": { "ref": "IPublicProfile", "required": true },
            "investorPublicProfile": { "ref": "IPublicProfile", "required": true },
            "susbscriptionTransactions": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "refObject", "ref": "ProcessProjectSubscriptionTransactionResponseDto" } }, { "dataType": "enum", "enums": [null] }] },
            "numberOfSlots": { "dataType": "double", "required": true },
            "totalAmountMinor": { "dataType": "double", "required": true },
            "initialAmountMinor": { "dataType": "double", "required": true },
            "amountRemainingMinor": { "dataType": "double", "required": true },
            "amountDueMinor": { "dataType": "double", "required": true },
            "amountPaidMinor": { "dataType": "double", "required": true },
            "amountPerPaymentPlanDurationMinor": { "dataType": "double", "required": true },
            "durationPerPaymentPlan": { "dataType": "string", "required": true },
            "duration": { "dataType": "double", "required": true },
            "durationLeft": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [0] }] },
            "durationCovered": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [0] }] },
            "nextPaymentDueDate": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            "status": { "ref": "ProjectStatuses", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectStage_string_": {
        "dataType": "refObject",
        "properties": {
            "stage": { "dataType": "string", "required": true },
            "dateTimeInISO8601": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "projectUuid": { "dataType": "string", "required": true },
            "developerPublicProfile": { "ref": "IPublicProfile", "required": true },
            "name": { "dataType": "string", "required": true },
            "details": { "dataType": "string", "required": true },
            "type": { "dataType": "string", "required": true },
            "costPerSlot": { "dataType": "double", "required": true },
            "initialInvestmentPercentage": { "dataType": "double", "required": true },
            "duration": { "dataType": "double", "required": true },
            "paymentPlan": { "ref": "ProjectPaymentPlan", "required": true },
            "numberOfSlots": { "dataType": "double", "required": true },
            "status": { "ref": "ProjectStatuses", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "startDate": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            "minimumNumberOfSlot": { "dataType": "double" },
            "address": { "dataType": "string", "required": true },
            "state": { "dataType": "string", "required": true },
            "locationOnMap": { "dataType": "string" },
            "numberOfSlotSold": { "dataType": "double" },
            "images": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "mimetype": { "dataType": "string", "required": true }, "url": { "dataType": "string", "required": true } } } }, { "dataType": "enum", "enums": [null] }] },
            "projectSubscriptions": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "refObject", "ref": "ProjectSubscriptionResponseDto" } }, { "dataType": "enum", "enums": [null] }] },
            "stages": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "refObject", "ref": "ProjectStage_string_" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProcessProjectSubscriptionTransactionResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "investorUserId": { "dataType": "double", "required": true },
            "developerUserId": { "dataType": "double", "required": true },
            "projectUuid": { "dataType": "string", "required": true },
            "projectSubscriptionUuid": { "dataType": "string", "required": true },
            "amountBeforeMinor": { "dataType": "double", "required": true },
            "amountPaidMinor": { "dataType": "double", "required": true },
            "amountAfterMinor": { "dataType": "double", "required": true },
            "amountRemainingMinor": { "dataType": "double", "required": true },
            "financialTransactionId": { "dataType": "double", "required": true },
            "description": { "dataType": "string", "required": true },
            "paymentPlanDurationNumber": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProjectSubscriptionResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "ProjectSubscriptionResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddInvestorToProjectRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "phoneNumber": { "dataType": "string", "required": true },
            "emailAddress": { "dataType": "string", "required": true },
            "numberOfSlots": { "dataType": "double", "required": true },
            "projectUuid": { "dataType": "string", "required": true },
            "amountPaid": { "dataType": "double", "required": true },
            "durationLeft": { "dataType": "double", "required": true },
            "susbscriptionDate": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProjectSubscriptionResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProjectSubscriptionResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProjectSubscriptionResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_ProjectSubscriptionResponseDto_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectTransactionResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "investorUserId": { "dataType": "double", "required": true },
            "developerUserId": { "dataType": "double", "required": true },
            "projectUuid": { "dataType": "string", "required": true },
            "projectSubscriptionUuid": { "dataType": "string", "required": true },
            "amountBeforeMinor": { "dataType": "double", "required": true },
            "amountPaidMinor": { "dataType": "double", "required": true },
            "amountAfterMinor": { "dataType": "double", "required": true },
            "amountRemainingMinor": { "dataType": "double", "required": true },
            "financialTransactionId": { "dataType": "double", "required": true },
            "description": { "dataType": "string", "required": true },
            "project": { "ref": "ProjectsResponseDto", "required": true },
            "investorPublicProfile": { "ref": "IPublicProfile", "required": true },
            "projectSubscriptions": { "ref": "ProjectSubscriptionResponseDto", "required": true },
            "paymentPlanDurationNumber": { "dataType": "double", "required": true },
            "nextPaymentDate": { "dataType": "string" },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProjectTransactionResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProjectTransactionResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProjectTransactionResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_ProjectTransactionResponseDto_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProjectTransactionResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProjectTransactionResponseDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProjectTransactionResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "ProjectTransactionResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecurrentPaymentRequestDto": {
        "dataType": "refObject",
        "properties": {
            "totalCost": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectSubscriptionPaymentVariant": {
        "dataType": "refEnum",
        "enums": ["WALLET", "CARD", "MONO"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProcurementInvoiceResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProcurementInvoiceResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProcurementInvoiceResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_ProcurementInvoiceResponseDto_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SupportedCountriesResponseDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "iso2": { "dataType": "string", "required": true },
            "phoneCode": { "dataType": "string", "required": true },
            "currency": { "dataType": "string", "required": true },
            "currencySymbol": { "dataType": "string", "required": true },
            "image": { "ref": "SimpleImageJson", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_SupportedCountriesResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "SupportedCountriesResponseDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_string-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "string" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MortgageCardBalanceDto": {
        "dataType": "refObject",
        "properties": {
            "pan": { "dataType": "string", "required": true },
            "currency": { "dataType": "string", "required": true },
            "currencySymbol": { "dataType": "string", "required": true },
            "amountMajor": { "dataType": "double", "required": true },
            "isUsed": { "dataType": "boolean", "required": true },
            "isActive": { "dataType": "boolean", "required": true },
            "isSoftDeleted": { "dataType": "boolean", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_MortgageCardBalanceDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "MortgageCardBalanceDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_MortgageCardDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "MortgageCardDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ActivateMortgageCardRequestDto": {
        "dataType": "refObject",
        "properties": {
            "pan": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NotificationMessageTypes": {
        "dataType": "refEnum",
        "enums": ["QUOTE_REQUEST_SENT_TO_SELLER", "QUOTE_REQUEST_SELLER_RESPONSE", "QUOTE_REQUEST_SELLER_DECLINE", "QUOTE_REQUEST_SELLER_EXPIRE", "ORDER_CREATED", "ORDER_CANCELLED_BY_BUYER", "ORDER_CANCELLED_BY_SELLER", "MAIN_WALLET_FUND", "ORDER_DISPUTE_ACKNOWLEDGEMENT", "ORDER_PICKED_UP", "ORDER_DELIVERED", "NEW_ACCOUNT_LEVEL_USER_ADDED", "NEW_WAREHOUSE_LEVEL_USER_ADDED", "PROCURMENT_LIST_UPLOADED", "ORDER_PAYMENT_IN_ESCROW", "ORDER_PAYMENT_IN_ESCROW_FOR_UNREGISTER_USER", "ORDER_AVAILABLE_FOR_PICKUP", "WAREHOUSE_TO_SITE_DELIVERY_FEE_SET", "ORDER_AVAILABLE_FOR_DELIVERY", "CONFIRMED_PICKUP", "CONFIRMED_DEVELIERY", "QOUTE_REQUEST_RAISED", "QOUTE_REQUEST_RESPONSE", "ESCROW_PAYMENT_TO_SELLER", "ESCROW_PAYMENT_TO_BUYER", "ORDER_REFUND_TO_BUYER", "SELLER_INVITE_TO_BUYER", "BUYER_ACCEPT_SELLER_INVITE", "ENABLE_PLP", "POD_ORDER_CONFIRMAION", "POD_ORDER_NOTIFICATION", "POD_ORDER_PAYMENT_NOTIFICATION", "ORDER_PICKUP_OR_DELIVERY_STATUS_UPDATE", "POD_ORDER_PAYMENT_DEFAULT", "ESTATE_PROJECT_APPROVAL_REQUEST", "ESTATE_PROJECT_APPROVED", "ESTATE_PROJECT_DECLINED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NotificationMetadata": {
        "dataType": "refObject",
        "properties": {
            "orderUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "projectUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "userId": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "cooperateUserRole": { "ref": "CooperateUserRole" },
            "newStatusUpdate": { "dataType": "union", "subSchemas": [{ "ref": "OrderStatuses" }, { "dataType": "enum", "enums": [null] }] },
            "dateTimeInISO8601": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "quoteRequestUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "inviteLink": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "wareHouseToSiteRequestUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INotificationMessageResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "type": { "ref": "NotificationMessageTypes", "required": true },
            "metadata": { "ref": "NotificationMetadata" },
            "title": { "dataType": "string", "required": true },
            "message": { "dataType": "string", "required": true },
            "isRead": { "dataType": "boolean", "required": true },
            "createdAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            "readAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_INotificationMessageResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "INotificationMessageResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_INotificationMessageResponseDto_-and-_totalUnread-number__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "intersection", "subSchemas": [{ "ref": "IPaginatedList_INotificationMessageResponseDto_" }, { "dataType": "nestedObjectLiteral", "nestedProperties": { "totalUnread": { "dataType": "double", "required": true } } }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse__verificationCode%3F%3Astring-or-null__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "verificationCode": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] } } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewUserRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "phoneNumber": { "dataType": "string", "required": true },
            "countryLongName": { "dataType": "string", "required": true },
            "findUsOption": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "emailAddress": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "isSeller": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
            "isCooperate": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
            "role": { "dataType": "union", "subSchemas": [{ "ref": "Roles" }, { "dataType": "enum", "enums": [null] }] },
            "defaultSellerUniqueCode": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewCooperateUserSignupDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "phoneNumber": { "dataType": "string", "required": true },
            "countryLongName": { "dataType": "string", "required": true },
            "findUsOption": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "emailAddress": { "dataType": "string", "required": true },
            "businessName": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "isSeller": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
            "isCooperate": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
            "role": { "dataType": "union", "subSchemas": [{ "ref": "Roles" }, { "dataType": "enum", "enums": [null] }] },
            "defaultSellerUniqueCode": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewMortageUserSignupDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "phoneNumber": { "dataType": "string", "required": true },
            "countryLongName": { "dataType": "string", "required": true },
            "findUsOption": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "emailAddress": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "companyName": { "dataType": "string", "required": true },
            "cacNumber": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
            "role": { "ref": "Roles", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewMortageInvestorSignup": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "phoneNumber": { "dataType": "string", "required": true },
            "countryLongName": { "dataType": "string", "required": true },
            "emailAddress": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "role": { "ref": "Roles", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPhoneVerification": {
        "dataType": "refObject",
        "properties": {
            "verificationCode": { "dataType": "string" },
            "phoneNumber": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BusinessInfoRequestDto": {
        "dataType": "refObject",
        "properties": {
            "businessName": { "dataType": "string", "required": true },
            "businessAddress": { "dataType": "string", "required": true },
            "cacNumber": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccessRequestDto": {
        "dataType": "refObject",
        "properties": {
            "isSeller": { "dataType": "boolean", "required": true },
            "businessName": { "dataType": "string", "required": true },
            "businessLocationCountry": { "dataType": "string", "required": true },
            "businessLocationState": { "dataType": "string", "required": true },
            "applicantName": { "dataType": "string", "required": true },
            "applicantRole": { "dataType": "string", "required": true },
            "applicantEmail": { "dataType": "string", "required": true },
            "applicantPhone": { "dataType": "string", "required": true },
            "weeklyTurnOver": { "dataType": "string", "required": true },
            "enquiries": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_CartItemJson-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CartItemJson" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewDeliveryAddress": {
        "dataType": "refObject",
        "properties": {
            "address": { "dataType": "string", "required": true },
            "country": { "dataType": "string", "required": true },
            "state": { "dataType": "string", "required": true },
            "contactFullName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "contactPhoneNumber": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewOrderCreateRequestDto": {
        "dataType": "refObject",
        "properties": {
            "orderReceiveType": { "ref": "OrderReceiveTypes", "required": true },
            "newDeliveryAddress": { "dataType": "union", "subSchemas": [{ "ref": "NewDeliveryAddress" }, { "dataType": "enum", "enums": [null] }] },
            "deliveryAddressUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "locationUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "differentOrderReceiver": { "dataType": "union", "subSchemas": [{ "ref": "OrderReceiver" }, { "dataType": "enum", "enums": [null] }] },
            "wareHouseUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPrepareCartItem": {
        "dataType": "refObject",
        "properties": {
            "sellerProfile": { "ref": "IPublicProfile", "required": true },
            "cartItems": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CartItem" }, "required": true },
            "sellerPickupLocations": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "Omit_PickupLocation.OmitFields_" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_OrderPrepareCartItem-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "OrderPrepareCartItem" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeliveryDetails": {
        "dataType": "refObject",
        "properties": {
            "address": { "dataType": "string", "required": true },
            "country": { "dataType": "string", "required": true },
            "state": { "dataType": "string", "required": true },
            "contactFullName": { "dataType": "string", "required": true },
            "contactPhoneNumber": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderCreateWithSellerGroupingRequestDto": {
        "dataType": "refObject",
        "properties": {
            "sellers": { "dataType": "array", "array": { "dataType": "refObject", "ref": "OrderSellerGroup" }, "required": true },
            "differentOrderReceiver": { "dataType": "union", "subSchemas": [{ "ref": "OrderReceiver" }, { "dataType": "enum", "enums": [null] }] },
            "newDeliveryAddress": { "dataType": "union", "subSchemas": [{ "ref": "DeliveryDetails" }, { "dataType": "enum", "enums": [null] }] },
            "deliveryAddressUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "wareHouseUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderReviewRequestDto": {
        "dataType": "refObject",
        "properties": {
            "reviewNote": { "dataType": "string", "required": true },
            "rating": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DisputTypes": {
        "dataType": "refEnum",
        "enums": ["Product was damaged", "Supplier came later than planned", "Supplier did not deliver"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderDisputeRequestDto": {
        "dataType": "refObject",
        "properties": {
            "disputeType": { "ref": "DisputTypes", "required": true },
            "disputeText": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_OrderDetailsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "OrderDetailsResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_OrderDetailsResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_OrderDetailsResponseDto_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Persona": {
        "dataType": "refEnum",
        "enums": ["BUYER", "SELLER"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderStatusesDto": {
        "dataType": "refEnum",
        "enums": ["ALL", "CREATED", "IN_PROGRESS", "AVAILABLE_FOR_PICKUP", "AVAILABLE_FOR_DELIVERY", "RECEIVED", "COMPLETED", "CONFIRMED", "CONFIRMED_BY_SYSTEM", "CANCELLED_BY_BUYER", "CANCELLED_BY_SELLER", "CANCELLED_BY_ADMIN", "ENDED_WITH_DISPUTES", "PAYMENT_DEFAULT"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPaymentStatusesDto": {
        "dataType": "refEnum",
        "enums": ["ALL", "BUYER_PAYMENT_PENDING", "BUYER_PAYMENT_IN_ESCROW", "BUYER_PAYMENT_REFUND", "ESCROW_FUNDS_MOVED_TO_SELLER"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPaymentVariantDto": {
        "dataType": "refEnum",
        "enums": ["ALL", "WALLET", "CARD", "PAY_ON_DELIVERY"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPayRequestDto": {
        "dataType": "refObject",
        "properties": {
            "password": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_PaymentInitializeResponse_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "PaymentInitializeResponse" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentInitializeVariant": {
        "dataType": "refEnum",
        "enums": ["fund_main_wallet", "PRODUCT_LEASE_PAYMENT"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentInitialize": {
        "dataType": "refObject",
        "properties": {
            "paymentVariant": { "ref": "PaymentInitializeVariant", "required": true },
            "amountMajor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_PaystackDedicatedNuban.Exclude_keyofPaystackDedicatedNuban.id__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "userId": { "dataType": "double", "required": true }, "updatedAt": { "dataType": "datetime", "required": true }, "createdAt": { "dataType": "datetime", "required": true }, "uuid": { "dataType": "string", "required": true }, "dedicatedNubanPayload": { "dataType": "any" }, "bankId": { "dataType": "string", "required": true }, "bankName": { "dataType": "string", "required": true }, "bankAccountNumber": { "dataType": "string", "required": true }, "bankAccountName": { "dataType": "string", "required": true }, "paystackCustomerId": { "dataType": "string", "required": true }, "paystackIntegration": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_PaystackDedicatedNuban.id_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_PaystackDedicatedNuban.Exclude_keyofPaystackDedicatedNuban.id__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_PaystackDedicatedNuban.id__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "Omit_PaystackDedicatedNuban.id_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_OrderDetailsResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "OrderDetailsResponseDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ISellerPickLocation.Exclude_keyofISellerPickLocation.id-or-user__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "address": { "dataType": "string" }, "name": { "dataType": "string" }, "country": { "dataType": "string" }, "state": { "dataType": "string" }, "contactFullName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "contactPhoneNumber": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ISellerPickLocation.id-or-user_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_ISellerPickLocation.Exclude_keyofISellerPickLocation.id-or-user__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_ISellerPickLocation.id-or-user__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "Omit_ISellerPickLocation.id-or-user_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISellerPickLocation": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string" },
            "address": { "dataType": "string" },
            "country": { "dataType": "string" },
            "state": { "dataType": "string" },
            "contactFullName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "contactPhoneNumber": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_PickupLocation.OmitFields_-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "Omit_PickupLocation.OmitFields_" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_PickupLocation.OmitFields__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "Omit_PickupLocation.OmitFields_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProcurementDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "accountId": { "dataType": "double", "required": true },
            "invoice": { "dataType": "union", "subSchemas": [{ "ref": "ProcurementInvoiceResponseDto" }, { "dataType": "enum", "enums": [null] }] },
            "upload": { "ref": "SimpleImageJson", "required": true },
            "isProcessed": { "dataType": "boolean", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProcurementDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProcurementDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProcurementDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_ProcurementDto_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProcurementsListFilter": {
        "dataType": "refEnum",
        "enums": ["ALL", "PROCESS_PENDING", "IS_PROCESSED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProcurementDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "ProcurementDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProcurementInvoiceResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "ProcurementInvoiceResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProcurementInvoicetem": {
        "dataType": "refObject",
        "properties": {
            "productUuid": { "dataType": "string", "required": true },
            "quantity": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOrderFromInvoiceRequestDto": {
        "dataType": "refObject",
        "properties": {
            "invoiceItems": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IProcurementInvoicetem" }, "required": true },
            "wareHouseUuid": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "orderByUuidsDto": {
        "dataType": "refObject",
        "properties": {
            "orderUuids": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoriesResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "imageUrl": { "dataType": "string", "required": true },
            "productsCount": { "dataType": "double", "required": true },
            "bannerUrl": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_CategoriesResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CategoriesResponseDto" } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_CategoriesResponseDto-Array__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_CategoriesResponseDto-Array_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BrandsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "imageUrl": { "dataType": "string", "required": true },
            "productsCount": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_BrandsResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "array", "array": { "dataType": "refObject", "ref": "BrandsResponseDto" } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_BrandsResponseDto-Array__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_BrandsResponseDto-Array_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_CategoriesResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CategoriesResponseDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_BrandsResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "BrandsResponseDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryBrandsDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_CategoryBrandsDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CategoryBrandsDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryLocationStates": {
        "dataType": "refObject",
        "properties": {
            "state": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_CategoryLocationStates-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CategoryLocationStates" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AvailableLocationStatesResponseDto": {
        "dataType": "refObject",
        "properties": {
            "state": { "dataType": "string", "required": true },
            "country": { "dataType": "string", "required": true },
            "countryIso2Code": { "dataType": "string", "required": true },
            "productsCount": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_AvailableLocationStatesResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "AvailableLocationStatesResponseDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProductsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProductsResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProductsResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_ProductsResponseDto_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductPriceSortOrder": {
        "dataType": "refEnum",
        "enums": ["ASC", "DESC"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_CategoriesResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "CategoriesResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_BrandsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "BrandsResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductCatalogueFilterRequestDto": {
        "dataType": "refObject",
        "properties": {
            "brandUuids": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "enum", "enums": [null] }] },
            "categoryUuids": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "enum", "enums": [null] }] },
            "locationStates": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "enum", "enums": [null] }] },
            "lga": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "enum", "enums": [null] }] },
            "searchWord": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "forOnlyDefaultLinkedSeller": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProductsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "ProductsResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewProductRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "categoryUuid": { "dataType": "string", "required": true },
            "brandUuid": { "dataType": "string", "required": true },
            "price": { "dataType": "double" },
            "locationState": { "dataType": "string", "required": true },
            "tags": { "dataType": "union", "subSchemas": [{ "dataType": "any" }, { "dataType": "enum", "enums": [null] }] },
            "minQty": { "dataType": "double", "required": true },
            "maxQty": { "dataType": "double", "required": true },
            "newPickupAddress": { "dataType": "nestedObjectLiteral", "nestedProperties": { "contactPhoneNumber": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true }, "contactFullName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true }, "state": { "dataType": "string", "required": true }, "country": { "dataType": "string", "required": true }, "address": { "dataType": "string", "required": true }, "name": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] } } },
            "pickupAddressUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewUpdateProductRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "categoryUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "brandUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "price": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "locationState": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "minQty": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "maxQty": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "tags": { "dataType": "union", "subSchemas": [{ "dataType": "any" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ProductReview.Exclude_keyofProductReview.OmitFields__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "uuid": { "dataType": "string", "required": true }, "userUuid": { "dataType": "string", "required": true }, "rating": { "dataType": "double", "required": true }, "reviewNote": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ProductReview.OmitFields_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_ProductReview.Exclude_keyofProductReview.OmitFields__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_ProductReview.OmitFields__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "Omit_ProductReview.OmitFields_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductReviewRequestDto": {
        "dataType": "refObject",
        "properties": {
            "reviewNote": { "dataType": "string", "required": true },
            "rating": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductReviewsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "reviewUuid": { "dataType": "string", "required": true },
            "reviewerPublicProfile": { "ref": "IPublicProfile", "required": true },
            "rating": { "dataType": "double", "required": true },
            "reviewNote": { "dataType": "string", "required": true },
            "reviewDateUtc": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProductReviewsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProductReviewsResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProductReviewsResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_ProductReviewsResponseDto_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductLeaseResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "principalAmountMajor": { "dataType": "double" },
            "interestRatePercentage": { "dataType": "double" },
            "nextLeasePaymentDueDateUtc": { "dataType": "datetime" },
            "totalLoanAmountDueMajor": { "dataType": "double" },
            "currency": { "dataType": "string" },
            "createdAtUtc": { "dataType": "datetime" },
            "creditScore": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProductLeaseResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "ProductLeaseResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductLeaseRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "phoneNumber": { "dataType": "string", "required": true },
            "emailAddress": { "dataType": "string", "required": true },
            "stateResidence": { "dataType": "string", "required": true },
            "bvn": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "businessType": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "cacNumber": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "companyName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "companyAddress": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "jobTitle": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "modeOfDelivery": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "productCategoryUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "idCardNumber": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "productQuantity": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "principalAmountMajor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "currency": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProductLeaseResponseDto-or-null_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "ref": "ProductLeaseResponseDto" }, { "dataType": "enum", "enums": [null] }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IFinancialTransactionResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "type": { "ref": "PaymentTransactionTypes", "required": true },
            "amountMajor": { "dataType": "double", "required": true },
            "currency": { "dataType": "string", "required": true },
            "walletBalanceMajorBefore": { "dataType": "double", "required": true },
            "walletBalanceMajorAfter": { "dataType": "double", "required": true },
            "metadata": { "ref": "FinancialTransactionMetadata", "required": true },
            "paidStatus": { "dataType": "any", "required": true },
            "description": { "dataType": "string", "required": true },
            "flowType": { "ref": "TransactionFlowType", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_IFinancialTransactionResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IFinancialTransactionResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_IFinancialTransactionResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_IFinancialTransactionResponseDto_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ProductLeaseUploadFile.Exclude_keyofProductLeaseUploadFile.keyFromCloudProvider__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "documentType": { "ref": "UploadFileCategory", "required": true }, "url": { "dataType": "string", "required": true }, "mimetype": { "dataType": "string", "required": true }, "fileCloudProvider": { "ref": "FileCloudProviders", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ProductLeaseUploadFile.keyFromCloudProvider_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_ProductLeaseUploadFile.Exclude_keyofProductLeaseUploadFile.keyFromCloudProvider__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_ProductLeaseUploadFile.keyFromCloudProvider_-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "Omit_ProductLeaseUploadFile.keyFromCloudProvider_" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessProfile": {
        "dataType": "refObject",
        "properties": {
            "businessName": { "dataType": "string", "required": true },
            "businessAddress": { "dataType": "string", "required": true },
            "businessCACNumber": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProfile": {
        "dataType": "refObject",
        "properties": {
            "userUuid": { "dataType": "string", "required": true },
            "isOnProductLease": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
            "isOnDelayedProductLease": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "msisdn": { "dataType": "string", "required": true },
            "emailAddress": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "photoUrl": { "dataType": "string", "required": true },
            "role": { "ref": "Roles", "required": true },
            "isCooperate": { "dataType": "boolean", "required": true },
            "accountId": { "dataType": "double", "required": true },
            "wareHouseid": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "sellerUniqueCode": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "accountRating": { "ref": "IRating", "required": true },
            "businessProfile": { "dataType": "union", "subSchemas": [{ "ref": "IBusinessProfile" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IProfile_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IProfile" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPublicProfile_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPublicProfile" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_IPublicProfile_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IPublicProfile" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_IPublicProfile__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_IPublicProfile_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBankInfo": {
        "dataType": "refObject",
        "properties": {
            "bankCode": { "dataType": "string", "required": true },
            "bankName": { "dataType": "string", "required": true },
            "bankAccountNumber": { "dataType": "string", "required": true },
            "bankAccountName": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IBankInfo_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IBankInfo" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LinkBuyerToSellerRequestDto": {
        "dataType": "refObject",
        "properties": {
            "phoneNumber": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveNewBankAccount": {
        "dataType": "refObject",
        "properties": {
            "accountNumber": { "dataType": "string", "required": true },
            "bankCode": { "dataType": "string", "required": true },
            "bankName": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResetForgottenPasswordRequestDto": {
        "dataType": "refObject",
        "properties": {
            "newPassword": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResetPasswordRequestDto": {
        "dataType": "refObject",
        "properties": {
            "oldPassword": { "dataType": "string", "required": true },
            "newPassword": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IYearEarningResponseDto": {
        "dataType": "refObject",
        "properties": {
            "year": { "dataType": "string", "required": true },
            "totalEarningsMajor": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IMonthEarningResponseDto": {
        "dataType": "refObject",
        "properties": {
            "friendlyMonth": { "dataType": "string", "required": true },
            "monthISO8601": { "dataType": "string", "required": true },
            "totalEarningsMajor": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISellerDashboardStats": {
        "dataType": "refObject",
        "properties": {
            "totalRevenueMajor": { "dataType": "double", "required": true },
            "totalRevenueCurrency": { "dataType": "string", "required": true },
            "totalRevenueCurrencySymbol": { "dataType": "string", "required": true },
            "totalOrdersCount": { "dataType": "double", "required": true },
            "totalPendingOrdersCount": { "dataType": "double", "required": true },
            "totalPendingQuoteRequestsCount": { "dataType": "double", "required": true },
            "yearEarnings": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IYearEarningResponseDto" }, "required": true },
            "monthEarnings": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IMonthEarningResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ISellerDashboardStats_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "ISellerDashboardStats" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SellerDocsUpload": {
        "dataType": "refObject",
        "properties": {
            "keyFromCloudProvider": { "dataType": "string", "required": true },
            "url": { "dataType": "string", "required": true },
            "mimetype": { "dataType": "string", "required": true },
            "fileCloudProvider": { "ref": "FileCloudProviders", "required": true },
            "documentType": { "ref": "UploadFileCategory", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_SellerDocsUpload-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "SellerDocsUpload" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProjectsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProjectsResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProjectsResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_ProjectsResponseDto_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProjectsResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProjectsResponseDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProjectsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "ProjectsResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProjectsResponseDto-Array-or-IPaginatedList_ProjectSubscriptionResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "refObject", "ref": "ProjectsResponseDto" } }, { "ref": "IPaginatedList_ProjectSubscriptionResponseDto_" }] },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SearchProjectDto": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "minCostPerSlot": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "maxCostPerSlot": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "searchWord": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "state": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "projectName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewProjectRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "details": { "dataType": "string", "required": true },
            "type": { "dataType": "string", "required": true },
            "costPerSlot": { "dataType": "double", "required": true },
            "initialInvestmentPercentage": { "dataType": "double", "required": true },
            "numberOfSlots": { "dataType": "double", "required": true },
            "startDate": { "dataType": "datetime", "required": true },
            "address": { "dataType": "string", "required": true },
            "state": { "dataType": "string", "required": true },
            "minimumNumberOfSlot": { "dataType": "double" },
            "duration": { "dataType": "double", "required": true },
            "paymentPlan": { "ref": "ProjectPaymentPlan" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewProjectSubscriptionRequestDto": {
        "dataType": "refObject",
        "properties": {
            "projectUuid": { "dataType": "string", "required": true },
            "numberOfSlot": { "dataType": "double", "required": true },
            "totalCost": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewUpdateProjectRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "details": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "type": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "costPerSlot": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "initialInvestmentPercentage": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "numberOfSlots": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "startDate": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            "minimumNumberOfSlot": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "duration": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "address": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "state": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "paymentPlan": { "dataType": "union", "subSchemas": [{ "ref": "ProjectPaymentPlan" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateProjectStageRequestDto": {
        "dataType": "refObject",
        "properties": {
            "stage": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequestResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "product": { "dataType": "nestedObjectLiteral", "nestedProperties": { "pickupAddressDetails": { "dataType": "union", "subSchemas": [{ "ref": "Omit_PickupLocation.OmitFields_" }, { "dataType": "enum", "enums": [null] }] }, "unitOfMeasurement": { "dataType": "string", "required": true }, "description": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "uuid": { "dataType": "string", "required": true } }, "required": true },
            "quantity": { "dataType": "double", "required": true },
            "buyerUserPublicProfile": { "ref": "IPublicProfile", "required": true },
            "sellerUserPublicProfile": { "ref": "IPublicProfile", "required": true },
            "notes": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "orderReceiveType": { "ref": "OrderReceiveTypes", "required": true },
            "deliveryAddress": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "deliverAddressUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "sellerResponse": { "dataType": "union", "subSchemas": [{ "ref": "QuoteRequestSellerResponse" }, { "dataType": "enum", "enums": [null] }] },
            "calculatedTotalCostMajor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "status": { "ref": "QuoteRequestStatuses", "required": true },
            "dateCreatedIso8601": { "dataType": "datetime", "required": true },
            "sellerPickupLocation": { "dataType": "nestedObjectLiteral", "nestedProperties": { "uuid": { "dataType": "string", "required": true }, "address": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_QuoteRequestResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "QuoteRequestResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHistory_QuoteRequestStatuses_": {
        "dataType": "refObject",
        "properties": {
            "status": { "ref": "QuoteRequestStatuses", "required": true },
            "dateTimeInISO8601": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_QuoteRequest.Exclude_keyofQuoteRequest.OmitFields__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "uuid": { "dataType": "string", "required": true }, "userUuid": { "dataType": "string", "required": true }, "referenceNumber": { "dataType": "string", "required": true }, "sellerUserUuid": { "dataType": "string", "required": true }, "quantity": { "dataType": "double", "required": true }, "notes": { "dataType": "string" }, "orderReceiveType": { "ref": "OrderReceiveTypes", "required": true }, "deliverAddress": { "dataType": "string" }, "hasSellerResponse": { "dataType": "boolean", "required": true }, "sellerResponse": { "ref": "QuoteRequestSellerResponse", "required": true }, "calculatedTotalCostMajor": { "dataType": "double", "required": true }, "sellerResponseSubmittedAt": { "dataType": "datetime", "required": true }, "status": { "ref": "QuoteRequestStatuses", "required": true }, "sellerPickupLocationUuid": { "dataType": "string" }, "deliverAddressUuid": { "dataType": "string" }, "wareHouseUuid": { "dataType": "string" }, "statusHistory": { "dataType": "array", "array": { "dataType": "refObject", "ref": "StatusHistory_QuoteRequestStatuses_" }, "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_QuoteRequest.OmitFields_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_QuoteRequest.Exclude_keyofQuoteRequest.OmitFields__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_QuoteRequest.OmitFields__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "Omit_QuoteRequest.OmitFields_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequestCreateRequestDto": {
        "dataType": "refObject",
        "properties": {
            "productUuid": { "dataType": "string", "required": true },
            "quantity": { "dataType": "double", "required": true },
            "notes": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "orderReceiveType": { "ref": "OrderReceiveTypes", "required": true },
            "deliverAddressUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "wareHouseUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "sellerPickupLocationUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_QuoteRequestResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "QuoteRequestResponseDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_QuoteRequestResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_QuoteRequestResponseDto_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TemporaryOrderDetailsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "orderUuid": { "dataType": "string", "required": true },
            "orderItems": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CartItemJson" }, "required": true },
            "sellerPublicProfile": { "ref": "IPublicProfile", "required": true },
            "orderReceiveType": { "ref": "OrderReceiveTypes", "required": true },
            "status": { "ref": "OrderStatuses", "required": true },
            "paymentStatus": { "ref": "OrderPaymentStatuses", "required": true },
            "orderLocation": { "dataType": "nestedObjectLiteral", "nestedProperties": { "contactPhoneNumber": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "contactFullName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "state": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "country": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "address": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true } } },
            "statusHistory": { "dataType": "array", "array": { "dataType": "refObject", "ref": "StatusHistory_OrderStatuses_" }, "required": true },
            "paymentStatusHistory": { "dataType": "array", "array": { "dataType": "refObject", "ref": "StatusHistory_OrderPaymentStatuses_" }, "required": true },
            "calculatedTotalCostMajor": { "dataType": "double", "required": true },
            "deliveryCostMajor": { "dataType": "double", "required": true },
            "currency": { "dataType": "string", "required": true },
            "currencySymbol": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_TemporaryOrderDetailsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "TemporaryOrderDetailsResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TemporaryOrderPayResponseDto": {
        "dataType": "refObject",
        "properties": {
            "temporaryOrders": { "dataType": "array", "array": { "dataType": "refObject", "ref": "CreatedOrderData" }, "required": true },
            "temporaryOrderUuids": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "paymentProviderDetails": { "ref": "PaymentInitializeResponse" },
            "paymentTransactionStatus": { "ref": "PaymentTransactionStatus", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_TemporaryOrderPayResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "TemporaryOrderPayResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TemporaryOrderCreateWithSellerGroupingRequestDto": {
        "dataType": "refObject",
        "properties": {
            "sellers": { "dataType": "array", "array": { "dataType": "refObject", "ref": "OrderSellerGroup" }, "required": true },
            "buyer": { "dataType": "nestedObjectLiteral", "nestedProperties": { "msisdn": { "dataType": "string", "required": true }, "emailAddress": { "dataType": "string", "required": true }, "fullName": { "dataType": "string", "required": true } }, "required": true },
            "newDeliveryAddress": { "dataType": "union", "subSchemas": [{ "ref": "DeliveryDetails" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NullableString": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse__currency-string.currencySymbol-string.amountMajor-number__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "amountMajor": { "dataType": "double", "required": true }, "currencySymbol": { "dataType": "string", "required": true }, "currency": { "dataType": "string", "required": true } } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IFinancialTransactionResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IFinancialTransactionResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WithdrawFundsRequestDto": {
        "dataType": "refObject",
        "properties": {
            "amountMajor": { "dataType": "double", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IEarningResponseDto": {
        "dataType": "refObject",
        "properties": {
            "currentYearEarningsMajor": { "dataType": "double", "required": true },
            "yearEarnings": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IYearEarningResponseDto" }, "required": true },
            "monthEarnings": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IMonthEarningResponseDto" }, "required": true },
            "currency": { "dataType": "string", "required": true },
            "currencySymbol": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IEarningResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IEarningResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewWareHouseRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "state": { "dataType": "string", "required": true },
            "country": { "dataType": "string", "required": true },
            "contactFullName": { "dataType": "string", "required": true },
            "contactPhoneNumber": { "dataType": "string", "required": true },
            "isDefault": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouseResponseDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "state": { "dataType": "string", "required": true },
            "country": { "dataType": "string", "required": true },
            "contactFullName": { "dataType": "string", "required": true },
            "contactPhoneNumber": { "dataType": "string", "required": true },
            "isDefault": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_WareHouseResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "WareHouseResponseDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouseToSiteDeliveryDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "wareHouseDetails": { "ref": "WareHouse" },
            "userId": { "dataType": "double", "required": true },
            "deliveryItems": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DeliveryItemJson" }, "required": true },
            "deliveryRequestHistory": { "dataType": "array", "array": { "dataType": "refObject", "ref": "StatusHistory_WareHouseToSiteDeliveryFeeStatuses_" }, "required": true },
            "status": { "ref": "WareHouseToSiteDeliveryFeeStatuses", "required": true },
            "totalAmountMajor": { "dataType": "double", "required": true },
            "deliveryFeeAmountMajor": { "dataType": "double", "required": true },
            "deliverySiteDetails": { "ref": "Omit_DeliveryLocation.OmitFields_" },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_WareHouseToSiteDeliveryDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
            "dataset": { "dataType": "array", "array": { "dataType": "refObject", "ref": "WareHouseToSiteDeliveryDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_WareHouseToSiteDeliveryDto__": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "IPaginatedList_WareHouseToSiteDeliveryDto_" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_WareHouseToSiteDeliveryDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "WareHouseToSiteDeliveryDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_WareHouseToSiteDeliveryDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "WareHouseToSiteDeliveryDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_WareHouseResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "ref": "WareHouseResponseDto" },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateWareHouseRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "contactFullName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "contactPhoneNumber": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "isDefault": { "dataType": "union", "subSchemas": [{ "dataType": "boolean" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouseSiteRequestDto": {
        "dataType": "refObject",
        "properties": {
            "contactFullName": { "dataType": "string", "required": true },
            "contactPhoneNumber": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
            "country": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouseToDeliveryToSiteRequestDto": {
        "dataType": "refObject",
        "properties": {
            "deliveryItems": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DeliveryItemJson" }, "required": true },
            "deliveryLocationUuid": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AcceptOrDeclineType": {
        "dataType": "refEnum",
        "enums": ["ACCEPT", "DECLINE"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SetProductReorderLevelRequestDto": {
        "dataType": "refObject",
        "properties": {
            "wareHouseUuid": { "dataType": "string", "required": true },
            "productUuid": { "dataType": "string", "required": true },
            "level": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductReorderLevelResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "produtUuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "productName": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "wareHouseDetail": { "dataType": "union", "subSchemas": [{ "ref": "WareHouse" }, { "dataType": "enum", "enums": [null] }] },
            "level": { "dataType": "double", "required": true },
            "avalailableInStock": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProductReorderLevelResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string" },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProductReorderLevelResponseDto" } },
            "url": { "dataType": "string" },
            "error": { "dataType": "string" },
            "errors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "DetailedError" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/api/access/login/password', ...((0, runtime_1.fetchMiddlewares)(AccessController_1.AccessController)), ...((0, runtime_1.fetchMiddlewares)(AccessController_1.AccessController.prototype.loginWithPassword)), function AccessController_loginWithPassword(request, response, next) {
        const args = {
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "IPasswordLoginRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AccessController_1.AccessController();
            const promise = controller.loginWithPassword.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/access/login/phonenumber', ...((0, runtime_1.fetchMiddlewares)(AccessController_1.AccessController)), ...((0, runtime_1.fetchMiddlewares)(AccessController_1.AccessController.prototype.loginWithPhone)), function AccessController_loginWithPhone(request, response, next) {
        const args = {
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "LoginWithPhone" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AccessController_1.AccessController();
            const promise = controller.loginWithPhone.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/access/login/phonenumber/verify/otp', ...((0, runtime_1.fetchMiddlewares)(AccessController_1.AccessController)), ...((0, runtime_1.fetchMiddlewares)(AccessController_1.AccessController.prototype.verifyPhoneForLogin)), function AccessController_verifyPhoneForLogin(request, response, next) {
        const args = {
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "LoginWithPhoneOtpVerify" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AccessController_1.AccessController();
            const promise = controller.verifyPhoneForLogin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/access/logout', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AccessController_1.AccessController)), ...((0, runtime_1.fetchMiddlewares)(AccessController_1.AccessController.prototype.handleLogout)), function AccessController_handleLogout(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AccessController_1.AccessController();
            const promise = controller.handleLogout.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/access/super', ...((0, runtime_1.fetchMiddlewares)(AccessController_1.AccessController)), ...((0, runtime_1.fetchMiddlewares)(AccessController_1.AccessController.prototype.loginWithAdminAcccess)), function AccessController_loginWithAdminAcccess(request, response, next) {
        const args = {
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "IPasswordLoginRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AccessController_1.AccessController();
            const promise = controller.loginWithAdminAcccess.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/category/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.createCategories)), function AdminController_createCategories(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewCategoryRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.createCategories.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/admin/category/:categoryUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.updateCategory)), function AdminController_updateCategory(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewUpdateCategoryRequestDto" },
            categoryUuid: { "in": "path", "name": "categoryUuid", "required": true, "dataType": "any" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.updateCategory.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/brand/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.createBrand)), function AdminController_createBrand(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewBrandRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.createBrand.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/admin/brand/:brandUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.updateBrand)), function AdminController_updateBrand(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewBrandRequestDto" },
            brandUuid: { "in": "path", "name": "brandUuid", "required": true, "dataType": "any" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.updateBrand.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/users', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleUsersFetch)), function AdminController_handleUsersFetch(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleUsersFetch.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/users/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleUserDetailsFetch)), function AdminController_handleUserDetailsFetch(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleUserDetailsFetch.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/deliverylocations', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleDeliveryLocationFetch)), function AdminController_handleDeliveryLocationFetch(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleDeliveryLocationFetch.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/deliverylocations', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleAddDeliveryLocation)), function AdminController_handleAddDeliveryLocation(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "AddDeliveryLocationByAdminRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleAddDeliveryLocation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/productleases', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetAllProductLeasesForAdmin)), function AdminController_handleGetAllProductLeasesForAdmin(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetAllProductLeasesForAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/productleases/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetOneProductLeasesForAdmin)), function AdminController_handleGetOneProductLeasesForAdmin(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetOneProductLeasesForAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/admin/productleases/toggle', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleProductLeaseStatusToggleByAdmin)), function AdminController_handleProductLeaseStatusToggleByAdmin(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "INewProductLeaseStatusToggleDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleProductLeaseStatusToggleByAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/productleases', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleNewProductLeaseByAdmin)), function AdminController_handleNewProductLeaseByAdmin(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "INewProductLeaseRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleNewProductLeaseByAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/admin/productleases/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleEditProductLease)), function AdminController_handleEditProductLease(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "IEditProductLeaseRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleEditProductLease.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/productleases/user/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.productLeaseStatus)), function AdminController_productLeaseStatus(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.productLeaseStatus.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/financialtransactions', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetAllFinancialTransactionsForAdmin)), function AdminController_handleGetAllFinancialTransactionsForAdmin(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetAllFinancialTransactionsForAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/financialtransactions', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleNewFinancialTransactionByAdmin)), function AdminController_handleNewFinancialTransactionByAdmin(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "IAddNewFinancialTransactionByAdmin" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleNewFinancialTransactionByAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/sendPromotionalMail', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.promotionalMail)), function AdminController_promotionalMail(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.promotionalMail.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/admin/orders/pod/cancel/:orderUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.cancelOrderByAdmin)), function AdminController_cancelOrderByAdmin(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            orderUuid: { "in": "path", "name": "orderUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.cancelOrderByAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/admin/orders/pod/paymentdefault/:orderUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.orderPaymentDefaultByAdmin)), function AdminController_orderPaymentDefaultByAdmin(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            orderUuid: { "in": "path", "name": "orderUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.orderPaymentDefaultByAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/promotions', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.newPromotion)), function AdminController_newPromotion(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewPromotionRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.newPromotion.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/promotions', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetPromotions)), function AdminController_handleGetPromotions(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetPromotions.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/categories', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetCategories)), function AdminController_handleGetCategories(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetCategories.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/brands', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetBrands)), function AdminController_handleGetBrands(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetBrands.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/affiliates', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.newAffiliate)), function AdminController_newAffiliate(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewAffiliateRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.newAffiliate.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/users', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.newsellerOma)), function AdminController_newsellerOma(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewSellerOmaRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.newsellerOma.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/affiliates', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetAffiliates)), function AdminController_handleGetAffiliates(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetAffiliates.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/orders', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetOrders)), function AdminController_handleGetOrders(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetOrders.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/orders', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleOrderCreationFromPreparedCart)), function AdminController_handleOrderCreationFromPreparedCart(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "CreateOrderByAdminRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleOrderCreationFromPreparedCart.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/wallettowallettransfer', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetWalletToWalletTransfers)), function AdminController_handleGetWalletToWalletTransfers(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetWalletToWalletTransfers.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/wallettowallettransfer', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleWalletToWalletTransferByAdmin)), function AdminController_handleWalletToWalletTransferByAdmin(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "IWalletTransferTransactionByAdmin" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleWalletToWalletTransferByAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/admin/orders/:orderUuid/statusupdate/:newOrderStatus', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleOrderRecievedConfirmation)), function AdminController_handleOrderRecievedConfirmation(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            orderUuid: { "in": "path", "name": "orderUuid", "required": true, "dataType": "string" },
            newOrderStatus: { "in": "path", "name": "newOrderStatus", "required": true, "ref": "OrderStatuses" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleOrderRecievedConfirmation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/orders/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetchangeOrder)), function AdminController_handleGetchangeOrder(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetchangeOrder.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/admin/orders/:id/changeOrderTotal', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleOrderTotalChangeConfirmation)), function AdminController_handleOrderTotalChangeConfirmation(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "changeReason": { "dataType": "string", "required": true }, "newOrderAmountMajor": { "dataType": "double", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleOrderTotalChangeConfirmation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/categories/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetCategory)), function AdminController_handleGetCategory(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetCategory.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/admin/categories/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleCategoryCinderbuildMergin)), function AdminController_handleCategoryCinderbuildMergin(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "currency": { "dataType": "string", "required": true }, "newMarginAmountMajor": { "dataType": "double", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleCategoryCinderbuildMergin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/deliveryrequests', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetWareHouseToSiteDeliveryRequests)), function AdminController_handleGetWareHouseToSiteDeliveryRequests(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetWareHouseToSiteDeliveryRequests.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/deliveryrequests/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetWarehouseToSiteDeliveryRequest)), function AdminController_handleGetWarehouseToSiteDeliveryRequest(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetWarehouseToSiteDeliveryRequest.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/deliveryRequest/:id/shipped', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleMarKDeliveryRequestAsShipped)), function AdminController_handleMarKDeliveryRequestAsShipped(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleMarKDeliveryRequestAsShipped.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/changebankdetails', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetRequestBankAccountChange)), function AdminController_handleGetRequestBankAccountChange(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetRequestBankAccountChange.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/admin/changebankdetails/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.saveBankAccountInfo)), function AdminController_saveBankAccountInfo(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.saveBankAccountInfo.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/admin/deliveryrequests/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleWarehouseToSiteDeliveryRequestDeliveryFeeUpdate)), function AdminController_handleWarehouseToSiteDeliveryRequestDeliveryFeeUpdate(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "currency": { "dataType": "string", "required": true }, "deliveryFeeAmountMajor": { "dataType": "double", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleWarehouseToSiteDeliveryRequestDeliveryFeeUpdate.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/procurements', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetProcurmentList)), function AdminController_handleGetProcurmentList(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetProcurmentList.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/procurements/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleProcurementDetails)), function AdminController_handleProcurementDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleProcurementDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/admin/procurements/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleProcurementisProcessed)), function AdminController_handleProcurementisProcessed(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleProcurementisProcessed.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/procurements/:id/invoices', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.addItemToInvoice)), function AdminController_addItemToInvoice(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "AddItemToInvoiceRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.addItemToInvoice.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/procurements/invoices', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleAllProcurementInvoice)), function AdminController_handleAllProcurementInvoice(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleAllProcurementInvoice.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/procurements/invoices/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetProcurementInvoiceDetails)), function AdminController_handleGetProcurementInvoiceDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetProcurementInvoiceDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/products', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleAllProduct)), function AdminController_handleAllProduct(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleAllProduct.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/products', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleCreateProduct)), function AdminController_handleCreateProduct(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewProductRequestDtoByAdmin" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleCreateProduct.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/products/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetProductDetails)), function AdminController_handleGetProductDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetProductDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/quoterequest', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetQouteRequests)), function AdminController_handleGetQouteRequests(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetQouteRequests.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/quoterequest/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetQuoteRequestDetails)), function AdminController_handleGetQuoteRequestDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetQuoteRequestDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/quoterequest/:id/adminresponse', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleQuoteRequestSellerResponse)), function AdminController_handleQuoteRequestSellerResponse(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "deliveryFee": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true }, "unitPrice": { "dataType": "double", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleQuoteRequestSellerResponse.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/moveproducts', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleMoveProductToAnotherSeller)), function AdminController_handleMoveProductToAnotherSeller(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "MoveSellerProductToOmaDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleMoveProductToAnotherSeller.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/oldseller/products', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetOldSellerProducts)), function AdminController_handleGetOldSellerProducts(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetOldSellerProducts.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/admin/quoterequest/decline/:quoteRequestUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleQuoteRequestDecline)), function AdminController_handleQuoteRequestDecline(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            quoteRequestUuid: { "in": "path", "name": "quoteRequestUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleQuoteRequestDecline.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/create-dedicated-account', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleVirtualAccountCreationForUser)), function AdminController_handleVirtualAccountCreationForUser(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "userId": { "dataType": "double", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleVirtualAccountCreationForUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/virtual-account', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetUserVirtualAccounts)), function AdminController_handleGetUserVirtualAccounts(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetUserVirtualAccounts.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/audit-logs', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetAuditLogs)), function AdminController_handleGetAuditLogs(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetAuditLogs.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/pricematrices', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetPricesMatrices)), function AdminController_handleGetPricesMatrices(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetPricesMatrices.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/pricematrices/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetPricesMatrixDetails)), function AdminController_handleGetPricesMatrixDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetPricesMatrixDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/pricematrices', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleSubmitPriceMatrix)), function AdminController_handleSubmitPriceMatrix(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "SubmitPriceMatricDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleSubmitPriceMatrix.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/admin/pricematrices/delivered/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleApprovePricesMatrix)), function AdminController_handleApprovePricesMatrix(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleApprovePricesMatrix.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/admin/pricematrices/declined/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleDeclinePricesMatrixByAdmin)), function AdminController_handleDeclinePricesMatrixByAdmin(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleDeclinePricesMatrixByAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/admin/cstore/activateuser/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleCStoreForUserByAdmin)), function AdminController_handleCStoreForUserByAdmin(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleCStoreForUserByAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/quoterequest/create-admin', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleQuoteRequestCreation)), function AdminController_handleQuoteRequestCreation(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "QouteRequestAdminCreateRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleQuoteRequestCreation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/mortgageaccountverification', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleGetMortgageAccountVerification)), function AdminController_handleGetMortgageAccountVerification(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "dataType": "any" },
            filter: { "in": "query", "name": "filter", "dataType": "any" },
            ids: { "in": "query", "name": "ids", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleGetMortgageAccountVerification.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/mortgageaccountverification/approve-document', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleApproveDeveloperDocument)), function AdminController_handleApproveDeveloperDocument(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            fileCategory: { "in": "query", "name": "fileCategory", "required": true, "ref": "MortgageAccountVerificationFiles" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ApprovedMortgageAccountDocumentDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleApproveDeveloperDocument.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/mortgageaccountverification/approve-account', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleApproveDeveloperAccount)), function AdminController_handleApproveDeveloperAccount(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "userId": { "dataType": "double", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleApproveDeveloperAccount.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/mortgageaccountverification/confirm-account', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleConfirmDeveloperAccount)), function AdminController_handleConfirmDeveloperAccount(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "userId": { "dataType": "double", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleConfirmDeveloperAccount.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/admin/mortgageaccountverification/confirm-approved-account', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleConfirmApproveDeveloperAccount)), function AdminController_handleConfirmApproveDeveloperAccount(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "userId": { "dataType": "double", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleConfirmApproveDeveloperAccount.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/admin/approveproject/:projectuuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleApproveProject)), function AdminController_handleApproveProject(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            projectuuid: { "in": "path", "name": "projectuuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleApproveProject.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/admin/mortgagecards', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.handleFetchMortgageCard)), function AdminController_handleFetchMortgageCard(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new AdminController_1.AdminController();
            const promise = controller.handleFetchMortgageCard.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/bank/nigerianbanks', ...((0, runtime_1.fetchMiddlewares)(BankController_1.BankController)), ...((0, runtime_1.fetchMiddlewares)(BankController_1.BankController.prototype.getBanksList)), function BankController_getBanksList(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new BankController_1.BankController();
            const promise = controller.getBanksList.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/bank/account/nameenquiry', ...((0, runtime_1.fetchMiddlewares)(BankController_1.BankController)), ...((0, runtime_1.fetchMiddlewares)(BankController_1.BankController.prototype.bankAccountNameEnquiry)), function BankController_bankAccountNameEnquiry(request, response, next) {
        const args = {
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "NewBankAccountRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new BankController_1.BankController();
            const promise = controller.bankAccountNameEnquiry.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/cart/item', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(CartController_1.CartController)), ...((0, runtime_1.fetchMiddlewares)(CartController_1.CartController.prototype.handleNewCartItem)), function CartController_handleNewCartItem(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "NewCartItemRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new CartController_1.CartController();
            const promise = controller.handleNewCartItem.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/cart/product/:productUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(CartController_1.CartController)), ...((0, runtime_1.fetchMiddlewares)(CartController_1.CartController.prototype.handleProductRemovalFromCart)), function CartController_handleProductRemovalFromCart(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            productUuid: { "in": "path", "name": "productUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new CartController_1.CartController();
            const promise = controller.handleProductRemovalFromCart.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/cart', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(CartController_1.CartController)), ...((0, runtime_1.fetchMiddlewares)(CartController_1.CartController.prototype.handleCurrentCartContent)), function CartController_handleCurrentCartContent(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new CartController_1.CartController();
            const promise = controller.handleCurrentCartContent.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/cooperate/user', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(CooperateController_1.CooperateController)), ...((0, runtime_1.fetchMiddlewares)(CooperateController_1.CooperateController.prototype.getCooperateUsers)), function CooperateController_getCooperateUsers(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            startDate: { "in": "query", "name": "startDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            endDate: { "in": "query", "name": "endDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new CooperateController_1.CooperateController();
            const promise = controller.getCooperateUsers.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/cooperate/user/:userUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(CooperateController_1.CooperateController)), ...((0, runtime_1.fetchMiddlewares)(CooperateController_1.CooperateController.prototype.getCooperateUser)), function CooperateController_getCooperateUser(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            userUuid: { "in": "path", "name": "userUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new CooperateController_1.CooperateController();
            const promise = controller.getCooperateUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/cooperate/user', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(CooperateController_1.CooperateController)), ...((0, runtime_1.fetchMiddlewares)(CooperateController_1.CooperateController.prototype.handleCreateNewCorporateUser)), function CooperateController_handleCreateNewCorporateUser(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "AddUserRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new CooperateController_1.CooperateController();
            const promise = controller.handleCreateNewCorporateUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/cooperate/user/:userUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(CooperateController_1.CooperateController)), ...((0, runtime_1.fetchMiddlewares)(CooperateController_1.CooperateController.prototype.deactivateUser)), function CooperateController_deactivateUser(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            userUuid: { "in": "path", "name": "userUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new CooperateController_1.CooperateController();
            const promise = controller.deactivateUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/cooperate/wallet-to-wallet-transfter', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(CooperateController_1.CooperateController)), ...((0, runtime_1.fetchMiddlewares)(CooperateController_1.CooperateController.prototype.handleMaintoDeliveryWalletTransfer)), function CooperateController_handleMaintoDeliveryWalletTransfer(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "DeliveryWalletTranferDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new CooperateController_1.CooperateController();
            const promise = controller.handleMaintoDeliveryWalletTransfer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/coupons', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(CouponController_1.CouponController)), ...((0, runtime_1.fetchMiddlewares)(CouponController_1.CouponController.prototype.handleNewProductCoupon)), function CouponController_handleNewProductCoupon(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "NewCouponRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new CouponController_1.CouponController();
            const promise = controller.handleNewProductCoupon.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/coupons', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(CouponController_1.CouponController)), ...((0, runtime_1.fetchMiddlewares)(CouponController_1.CouponController.prototype.handleGetCouponsPaginatedList)), function CouponController_handleGetCouponsPaginatedList(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            isActive: { "in": "query", "name": "isActive", "required": true, "dataType": "boolean" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new CouponController_1.CouponController();
            const promise = controller.handleGetCouponsPaginatedList.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/coupons/deactivate', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(CouponController_1.CouponController)), ...((0, runtime_1.fetchMiddlewares)(CouponController_1.CouponController.prototype.handleDeactivateCoupon)), function CouponController_handleDeactivateCoupon(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "code": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new CouponController_1.CouponController();
            const promise = controller.handleDeactivateCoupon.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/coupons/update', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(CouponController_1.CouponController)), ...((0, runtime_1.fetchMiddlewares)(CouponController_1.CouponController.prototype.handleUpdateCoupon)), function CouponController_handleUpdateCoupon(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "NewUpdateCouponRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new CouponController_1.CouponController();
            const promise = controller.handleUpdateCoupon.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/deliverylocations', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(DeliveryLocationController_1.DeliveryLocationController)), ...((0, runtime_1.fetchMiddlewares)(DeliveryLocationController_1.DeliveryLocationController.prototype.handleGetDeliveryLocations)), function DeliveryLocationController_handleGetDeliveryLocations(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new DeliveryLocationController_1.DeliveryLocationController();
            const promise = controller.handleGetDeliveryLocations.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/deliverylocations/:userUuid', ...((0, runtime_1.fetchMiddlewares)(DeliveryLocationController_1.DeliveryLocationController)), ...((0, runtime_1.fetchMiddlewares)(DeliveryLocationController_1.DeliveryLocationController.prototype.handleUserDeliveryLocations)), function DeliveryLocationController_handleUserDeliveryLocations(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            userUuid: { "in": "path", "name": "userUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new DeliveryLocationController_1.DeliveryLocationController();
            const promise = controller.handleUserDeliveryLocations.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/deliverylocations/:locationUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(DeliveryLocationController_1.DeliveryLocationController)), ...((0, runtime_1.fetchMiddlewares)(DeliveryLocationController_1.DeliveryLocationController.prototype.handleGetGetDeliveryLocationDetails)), function DeliveryLocationController_handleGetGetDeliveryLocationDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            locationUuid: { "in": "path", "name": "locationUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new DeliveryLocationController_1.DeliveryLocationController();
            const promise = controller.handleGetGetDeliveryLocationDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/deliverylocations', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(DeliveryLocationController_1.DeliveryLocationController)), ...((0, runtime_1.fetchMiddlewares)(DeliveryLocationController_1.DeliveryLocationController.prototype.handleAddDeliveryLocation)), function DeliveryLocationController_handleAddDeliveryLocation(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "DeliveryLocationRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new DeliveryLocationController_1.DeliveryLocationController();
            const promise = controller.handleAddDeliveryLocation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/deliverylocations/:locationUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(DeliveryLocationController_1.DeliveryLocationController)), ...((0, runtime_1.fetchMiddlewares)(DeliveryLocationController_1.DeliveryLocationController.prototype.updateUserDeliveryLocation)), function DeliveryLocationController_updateUserDeliveryLocation(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "IUpdateDeliveryLocationDto" },
            locationUuid: { "in": "path", "name": "locationUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new DeliveryLocationController_1.DeliveryLocationController();
            const promise = controller.updateUserDeliveryLocation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/deliverylocations/:locationUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(DeliveryLocationController_1.DeliveryLocationController)), ...((0, runtime_1.fetchMiddlewares)(DeliveryLocationController_1.DeliveryLocationController.prototype.deleteDeliveryLocation)), function DeliveryLocationController_deleteDeliveryLocation(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            locationUuid: { "in": "path", "name": "locationUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new DeliveryLocationController_1.DeliveryLocationController();
            const promise = controller.deleteDeliveryLocation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/estatedeveloper/isapproved', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(EstateDeveloperController_1.EstateDeveloperController)), ...((0, runtime_1.fetchMiddlewares)(EstateDeveloperController_1.EstateDeveloperController.prototype.handleIsDeveloperAccountApprovedAndConfirmed)), function EstateDeveloperController_handleIsDeveloperAccountApprovedAndConfirmed(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new EstateDeveloperController_1.EstateDeveloperController();
            const promise = controller.handleIsDeveloperAccountApprovedAndConfirmed.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/estatedeveloper/addinvestor', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(EstateDeveloperController_1.EstateDeveloperController)), ...((0, runtime_1.fetchMiddlewares)(EstateDeveloperController_1.EstateDeveloperController.prototype.addInvestorToProjectSubscription)), function EstateDeveloperController_addInvestorToProjectSubscription(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "AddInvestorToProjectRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new EstateDeveloperController_1.EstateDeveloperController();
            const promise = controller.addInvestorToProjectSubscription.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/investor/portfolio', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(InvestorController_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(InvestorController_1.InvestorController.prototype.handleGetMyPortfolioProjectSubscription)), function InvestorController_handleGetMyPortfolioProjectSubscription(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            projectStatus: { "in": "query", "name": "status", "required": true, "ref": "ProjectStatuses" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new InvestorController_1.InvestorController();
            const promise = controller.handleGetMyPortfolioProjectSubscription.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/investor/portfolio/:subscriptionUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(InvestorController_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(InvestorController_1.InvestorController.prototype.handleProjectSubscriptionFetchDetails)), function InvestorController_handleProjectSubscriptionFetchDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            subscriptionUuid: { "in": "path", "name": "subscriptionUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new InvestorController_1.InvestorController();
            const promise = controller.handleProjectSubscriptionFetchDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/investor/projecttransactions', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(InvestorController_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(InvestorController_1.InvestorController.prototype.handleGetMyProjectSubscriptionTransactions)), function InvestorController_handleGetMyProjectSubscriptionTransactions(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new InvestorController_1.InvestorController();
            const promise = controller.handleGetMyProjectSubscriptionTransactions.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/investor/projecttransactions/pendingrecurrentpayment', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(InvestorController_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(InvestorController_1.InvestorController.prototype.handleGetPendingRecurrentProjectSubscriptionTransactions)), function InvestorController_handleGetPendingRecurrentProjectSubscriptionTransactions(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new InvestorController_1.InvestorController();
            const promise = controller.handleGetPendingRecurrentProjectSubscriptionTransactions.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/investor/projecttransactions/:transactionUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(InvestorController_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(InvestorController_1.InvestorController.prototype.handleGetSingleProjectSubscriptionTransactions)), function InvestorController_handleGetSingleProjectSubscriptionTransactions(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            transactionUuid: { "in": "path", "name": "transactionUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new InvestorController_1.InvestorController();
            const promise = controller.handleGetSingleProjectSubscriptionTransactions.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/investor/projecttransactions/payment/:transactionUuid/:projectSubscriptionPaymentVariant', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(InvestorController_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(InvestorController_1.InvestorController.prototype.createProjectSubscription)), function InvestorController_createProjectSubscription(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "RecurrentPaymentRequestDto" },
            projectSubscriptionPaymentVariant: { "in": "path", "name": "projectSubscriptionPaymentVariant", "required": true, "ref": "ProjectSubscriptionPaymentVariant" },
            transactionUuid: { "in": "path", "name": "transactionUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new InvestorController_1.InvestorController();
            const promise = controller.createProjectSubscription.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/invoice', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(InvoiceController_1.InvoiceController)), ...((0, runtime_1.fetchMiddlewares)(InvoiceController_1.InvoiceController.prototype.handleGetMyInvoices)), function InvoiceController_handleGetMyInvoices(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            startDate: { "in": "query", "name": "startDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            endDate: { "in": "query", "name": "endDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new InvoiceController_1.InvoiceController();
            const promise = controller.handleGetMyInvoices.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/miscellaneous/supported-countries', ...((0, runtime_1.fetchMiddlewares)(MiscController_1.MiscController)), ...((0, runtime_1.fetchMiddlewares)(MiscController_1.MiscController.prototype.getCountriesList)), function MiscController_getCountriesList(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new MiscController_1.MiscController();
            const promise = controller.getCountriesList.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/miscellaneous/nigerianstates/:state', ...((0, runtime_1.fetchMiddlewares)(MiscController_1.MiscController)), ...((0, runtime_1.fetchMiddlewares)(MiscController_1.MiscController.prototype.getStates)), function MiscController_getStates(request, response, next) {
        const args = {
            state: { "in": "path", "name": "state", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new MiscController_1.MiscController();
            const promise = controller.getStates.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/miscellaneous/state/:state/lgas', ...((0, runtime_1.fetchMiddlewares)(MiscController_1.MiscController)), ...((0, runtime_1.fetchMiddlewares)(MiscController_1.MiscController.prototype.getStateLocalGovernmentAreas)), function MiscController_getStateLocalGovernmentAreas(request, response, next) {
        const args = {
            state: { "in": "path", "name": "state", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new MiscController_1.MiscController();
            const promise = controller.getStateLocalGovernmentAreas.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/miscellaneous/findus/all', ...((0, runtime_1.fetchMiddlewares)(MiscController_1.MiscController)), ...((0, runtime_1.fetchMiddlewares)(MiscController_1.MiscController.prototype.handleFindUsOptionsFetch)), function MiscController_handleFindUsOptionsFetch(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new MiscController_1.MiscController();
            const promise = controller.handleFindUsOptionsFetch.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/miscellaneous/findus/create', ...((0, runtime_1.fetchMiddlewares)(MiscController_1.MiscController)), ...((0, runtime_1.fetchMiddlewares)(MiscController_1.MiscController.prototype.createCategories)), function MiscController_createCategories(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new MiscController_1.MiscController();
            const promise = controller.createCategories.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/mortgagecard/balance', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(MortgageCardController_1.MortgageCardController)), ...((0, runtime_1.fetchMiddlewares)(MortgageCardController_1.MortgageCardController.prototype.mainMortgageCardBalance)), function MortgageCardController_mainMortgageCardBalance(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new MortgageCardController_1.MortgageCardController();
            const promise = controller.mainMortgageCardBalance.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/mortgagecard/activate', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(MortgageCardController_1.MortgageCardController)), ...((0, runtime_1.fetchMiddlewares)(MortgageCardController_1.MortgageCardController.prototype.createCategories)), function MortgageCardController_createCategories(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ActivateMortgageCardRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new MortgageCardController_1.MortgageCardController();
            const promise = controller.createCategories.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/notifications', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(NotificationsController_1.NotificationsController)), ...((0, runtime_1.fetchMiddlewares)(NotificationsController_1.NotificationsController.prototype.getCurrentUserNotificationMessages)), function NotificationsController_getCurrentUserNotificationMessages(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new NotificationsController_1.NotificationsController();
            const promise = controller.getCurrentUserNotificationMessages.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/notifications/:notificationMessageUuid/markAsRead', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(NotificationsController_1.NotificationsController)), ...((0, runtime_1.fetchMiddlewares)(NotificationsController_1.NotificationsController.prototype.markAsRead)), function NotificationsController_markAsRead(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            notificationMessageUuid: { "in": "path", "name": "notificationMessageUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new NotificationsController_1.NotificationsController();
            const promise = controller.markAsRead.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/onboarding/signup', ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController)), ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController.prototype.handleFirstStageSignup)), function OnboardingController_handleFirstStageSignup(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewUserRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OnboardingController_1.OnboardingController();
            const promise = controller.handleFirstStageSignup.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/onboarding/signup/cooperate', ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController)), ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController.prototype.handleCooperateSignup)), function OnboardingController_handleCooperateSignup(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewCooperateUserSignupDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OnboardingController_1.OnboardingController();
            const promise = controller.handleCooperateSignup.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/onboarding/signup/mortgage', ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController)), ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController.prototype.handleMortageSignup)), function OnboardingController_handleMortageSignup(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewMortageUserSignupDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OnboardingController_1.OnboardingController();
            const promise = controller.handleMortageSignup.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/onboarding/signup/mortgageinvestor', ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController)), ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController.prototype.handleMortageInvestorSignup)), function OnboardingController_handleMortageInvestorSignup(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewMortageInvestorSignup" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OnboardingController_1.OnboardingController();
            const promise = controller.handleMortageInvestorSignup.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/onboarding/verify', ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController)), ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController.prototype.verifyTempUser)), function OnboardingController_verifyTempUser(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "IPhoneVerification" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OnboardingController_1.OnboardingController();
            const promise = controller.verifyTempUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/onboarding/businessinfo', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController)), ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController.prototype.processBusinessInfo)), function OnboardingController_processBusinessInfo(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "BusinessInfoRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OnboardingController_1.OnboardingController();
            const promise = controller.processBusinessInfo.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/onboarding/accessrequest', ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController)), ...((0, runtime_1.fetchMiddlewares)(OnboardingController_1.OnboardingController.prototype.processAccessRequest)), function OnboardingController_processAccessRequest(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "AccessRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OnboardingController_1.OnboardingController();
            const promise = controller.processAccessRequest.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/orders/lastorderitems', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController)), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController.prototype.handleLastOrderItems)), function OrdersController_handleLastOrderItems(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OrdersController_1.OrdersController();
            const promise = controller.handleLastOrderItems.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/orders/:orderUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController)), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController.prototype.orderDetails)), function OrdersController_orderDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            orderUuid: { "in": "path", "name": "orderUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OrdersController_1.OrdersController();
            const promise = controller.orderDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/orders/create/fromcart/:orderPaymentVariant', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController)), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController.prototype.handleOrderCreationFromCart)), function OrdersController_handleOrderCreationFromCart(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            orderPaymentVariant: { "in": "path", "name": "orderPaymentVariant", "required": true, "ref": "OrderPaymentVariant" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewOrderCreateRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OrdersController_1.OrdersController();
            const promise = controller.handleOrderCreationFromCart.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/orders/prepare/fromcart', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController)), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController.prototype.handleOrderPreparationFromCart)), function OrdersController_handleOrderPreparationFromCart(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OrdersController_1.OrdersController();
            const promise = controller.handleOrderPreparationFromCart.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/orders/create/frompreparedcart/:orderPaymentVariant', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController)), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController.prototype.handleOrderCreationFromPreparedCart)), function OrdersController_handleOrderCreationFromPreparedCart(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            orderPaymentVariant: { "in": "path", "name": "orderPaymentVariant", "required": true, "ref": "OrderPaymentVariant" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "OrderCreateWithSellerGroupingRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OrdersController_1.OrdersController();
            const promise = controller.handleOrderCreationFromPreparedCart.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/orders/create/fromquoterequest/:quoteRequestUuid/:orderPaymentVariant', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController)), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController.prototype.handleOrderCreationFromQuoteRequest)), function OrdersController_handleOrderCreationFromQuoteRequest(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            quoteRequestUuid: { "in": "path", "name": "quoteRequestUuid", "required": true, "dataType": "string" },
            orderPaymentVariant: { "in": "path", "name": "orderPaymentVariant", "required": true, "ref": "OrderPaymentVariant" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewOrderCreateRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OrdersController_1.OrdersController();
            const promise = controller.handleOrderCreationFromQuoteRequest.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/orders/:orderUuid/statusupdate/:newOrderStatus', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController)), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController.prototype.handleOrderConfirmation)), function OrdersController_handleOrderConfirmation(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            orderUuid: { "in": "path", "name": "orderUuid", "required": true, "dataType": "string" },
            newOrderStatus: { "in": "path", "name": "newOrderStatus", "required": true, "ref": "OrderStatuses" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OrdersController_1.OrdersController();
            const promise = controller.handleOrderConfirmation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/orders/:orderUuid/cancel', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController)), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController.prototype.handleOrderCancellation)), function OrdersController_handleOrderCancellation(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            orderUuid: { "in": "path", "name": "orderUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OrdersController_1.OrdersController();
            const promise = controller.handleOrderCancellation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/orders/:orderUuid/review', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController)), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController.prototype.reviewOrder)), function OrdersController_reviewOrder(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "OrderReviewRequestDto" },
            orderUuid: { "in": "path", "name": "orderUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OrdersController_1.OrdersController();
            const promise = controller.reviewOrder.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/orders/:orderUuid/dispute', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController)), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController.prototype.disputeOrder)), function OrdersController_disputeOrder(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "OrderDisputeRequestDto" },
            orderUuid: { "in": "path", "name": "orderUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OrdersController_1.OrdersController();
            const promise = controller.disputeOrder.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/orders', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController)), ...((0, runtime_1.fetchMiddlewares)(OrdersController_1.OrdersController.prototype.handleGetMyOrders)), function OrdersController_handleGetMyOrders(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            persona: { "in": "query", "name": "persona", "required": true, "ref": "Persona" },
            orderStatus: { "in": "query", "name": "status", "required": true, "ref": "OrderStatusesDto" },
            orderPaymentStatus: { "in": "query", "name": "paymentStatus", "dataType": "union", "subSchemas": [{ "ref": "OrderPaymentStatusesDto" }, { "dataType": "enum", "enums": [null] }] },
            orderPaymentVariant: { "in": "query", "name": "paymentVariant", "dataType": "union", "subSchemas": [{ "ref": "OrderPaymentVariantDto" }, { "dataType": "enum", "enums": [null] }] },
            procInvoiceUuid: { "in": "query", "name": "procInvoiceUuid", "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new OrdersController_1.OrdersController();
            const promise = controller.handleGetMyOrders.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/payments/pay/order/:orderUuid/paymentVariant/:orderPaymentVariant', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(PaymentController_1.PaymentsController)), ...((0, runtime_1.fetchMiddlewares)(PaymentController_1.PaymentsController.prototype.handlePayForExistingOrder)), function PaymentsController_handlePayForExistingOrder(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            orderUuid: { "in": "path", "name": "orderUuid", "required": true, "dataType": "string" },
            orderPaymentVariant: { "in": "path", "name": "orderPaymentVariant", "required": true, "ref": "OrderPaymentVariant" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "OrderPayRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PaymentController_1.PaymentsController();
            const promise = controller.handlePayForExistingOrder.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/payments/paystack/initialize', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(PaymentController_1.PaymentsController)), ...((0, runtime_1.fetchMiddlewares)(PaymentController_1.PaymentsController.prototype.initializePaystackPayment)), function PaymentsController_initializePaystackPayment(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "PaymentInitialize" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PaymentController_1.PaymentsController();
            const promise = controller.initializePaystackPayment.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/payments/paystack/verify/webhook', ...((0, runtime_1.fetchMiddlewares)(PaymentController_1.PaymentsController)), ...((0, runtime_1.fetchMiddlewares)(PaymentController_1.PaymentsController.prototype.verifyPaystackTransaction)), function PaymentsController_verifyPaystackTransaction(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PaymentController_1.PaymentsController();
            const promise = controller.verifyPaystackTransaction.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/payments/paystack/dedicated-account', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(PaymentController_1.PaymentsController)), ...((0, runtime_1.fetchMiddlewares)(PaymentController_1.PaymentsController.prototype.dedicatedAccount)), function PaymentsController_dedicatedAccount(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PaymentController_1.PaymentsController();
            const promise = controller.dedicatedAccount.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/payments/orders/:reference', ...((0, runtime_1.fetchMiddlewares)(PaymentController_1.PaymentsController)), ...((0, runtime_1.fetchMiddlewares)(PaymentController_1.PaymentsController.prototype.handlePaidTOrderByPaymentReference)), function PaymentsController_handlePaidTOrderByPaymentReference(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reference: { "in": "path", "name": "reference", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PaymentController_1.PaymentsController();
            const promise = controller.handlePaidTOrderByPaymentReference.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/payments/mono/verify/webhook', ...((0, runtime_1.fetchMiddlewares)(PaymentController_1.PaymentsController)), ...((0, runtime_1.fetchMiddlewares)(PaymentController_1.PaymentsController.prototype.processMonoWebhookTransaction)), function PaymentsController_processMonoWebhookTransaction(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PaymentController_1.PaymentsController();
            const promise = controller.processMonoWebhookTransaction.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/pickuplocations', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(PickupLocationController_1.PickupLocationController)), ...((0, runtime_1.fetchMiddlewares)(PickupLocationController_1.PickupLocationController.prototype.handleAddPickUpLocation)), function PickupLocationController_handleAddPickUpLocation(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ISellerPickLocation" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PickupLocationController_1.PickupLocationController();
            const promise = controller.handleAddPickUpLocation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/pickuplocations', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(PickupLocationController_1.PickupLocationController)), ...((0, runtime_1.fetchMiddlewares)(PickupLocationController_1.PickupLocationController.prototype.getPickupLocations)), function PickupLocationController_getPickupLocations(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PickupLocationController_1.PickupLocationController();
            const promise = controller.getPickupLocations.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/pickuplocations/:userUuid', ...((0, runtime_1.fetchMiddlewares)(PickupLocationController_1.PickupLocationController)), ...((0, runtime_1.fetchMiddlewares)(PickupLocationController_1.PickupLocationController.prototype.getUserPickupLocations)), function PickupLocationController_getUserPickupLocations(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            userUuid: { "in": "path", "name": "userUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PickupLocationController_1.PickupLocationController();
            const promise = controller.getUserPickupLocations.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/pickuplocations/:locationUuid', ...((0, runtime_1.fetchMiddlewares)(PickupLocationController_1.PickupLocationController)), ...((0, runtime_1.fetchMiddlewares)(PickupLocationController_1.PickupLocationController.prototype.handleGetPickupLocationDetails)), function PickupLocationController_handleGetPickupLocationDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            locationUuid: { "in": "path", "name": "locationUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PickupLocationController_1.PickupLocationController();
            const promise = controller.handleGetPickupLocationDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/pickuplocations/:locationUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(PickupLocationController_1.PickupLocationController)), ...((0, runtime_1.fetchMiddlewares)(PickupLocationController_1.PickupLocationController.prototype.updateSellerPickUpLocation)), function PickupLocationController_updateSellerPickUpLocation(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ISellerPickLocation" },
            locationUuid: { "in": "path", "name": "locationUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PickupLocationController_1.PickupLocationController();
            const promise = controller.updateSellerPickUpLocation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/pickuplocations/:locationUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(PickupLocationController_1.PickupLocationController)), ...((0, runtime_1.fetchMiddlewares)(PickupLocationController_1.PickupLocationController.prototype.deletePickupLocation)), function PickupLocationController_deletePickupLocation(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            locationUuid: { "in": "path", "name": "locationUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PickupLocationController_1.PickupLocationController();
            const promise = controller.deletePickupLocation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/pricematrix/approve/:id', ...((0, runtime_1.fetchMiddlewares)(PriceMatrixController_1.PriceMatrixController)), ...((0, runtime_1.fetchMiddlewares)(PriceMatrixController_1.PriceMatrixController.prototype.handleApprovePricesMatrix)), function PriceMatrixController_handleApprovePricesMatrix(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PriceMatrixController_1.PriceMatrixController();
            const promise = controller.handleApprovePricesMatrix.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/pricematrix/confirmdelivery/:id', ...((0, runtime_1.fetchMiddlewares)(PriceMatrixController_1.PriceMatrixController)), ...((0, runtime_1.fetchMiddlewares)(PriceMatrixController_1.PriceMatrixController.prototype.handleConfirmDeliveryForPricesMatrix)), function PriceMatrixController_handleConfirmDeliveryForPricesMatrix(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PriceMatrixController_1.PriceMatrixController();
            const promise = controller.handleConfirmDeliveryForPricesMatrix.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/pricematrix/decline/:id', ...((0, runtime_1.fetchMiddlewares)(PriceMatrixController_1.PriceMatrixController)), ...((0, runtime_1.fetchMiddlewares)(PriceMatrixController_1.PriceMatrixController.prototype.handleDeclinePricesMatrix)), function PriceMatrixController_handleDeclinePricesMatrix(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new PriceMatrixController_1.PriceMatrixController();
            const promise = controller.handleDeclinePricesMatrix.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/procurements', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProcurementController_1.ProcurementController)), ...((0, runtime_1.fetchMiddlewares)(ProcurementController_1.ProcurementController.prototype.handleGetMyProcurements)), function ProcurementController_handleGetMyProcurements(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            filter: { "in": "query", "name": "filter", "required": true, "ref": "ProcurementsListFilter" },
            startDate: { "in": "query", "name": "startDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            endDate: { "in": "query", "name": "endDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProcurementController_1.ProcurementController();
            const promise = controller.handleGetMyProcurements.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/procurements/:procurementUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProcurementController_1.ProcurementController)), ...((0, runtime_1.fetchMiddlewares)(ProcurementController_1.ProcurementController.prototype.handleGetProcurementsDetails)), function ProcurementController_handleGetProcurementsDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            procurementUuid: { "in": "path", "name": "procurementUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProcurementController_1.ProcurementController();
            const promise = controller.handleGetProcurementsDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/procurements/invoice/:uuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProcurementController_1.ProcurementController)), ...((0, runtime_1.fetchMiddlewares)(ProcurementController_1.ProcurementController.prototype.handleGetInvoiceDetails)), function ProcurementController_handleGetInvoiceDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            uuid: { "in": "path", "name": "uuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProcurementController_1.ProcurementController();
            const promise = controller.handleGetInvoiceDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/procurementinvoiceorders/create/procurmentinvoice/:procurementInvoiceUuid/:orderPaymentVariant', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProcurementInvoiceOrderController_1.ProcurementInvoiceOrderController)), ...((0, runtime_1.fetchMiddlewares)(ProcurementInvoiceOrderController_1.ProcurementInvoiceOrderController.prototype.handleCreateOrderFromInvoice)), function ProcurementInvoiceOrderController_handleCreateOrderFromInvoice(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            uuid: { "in": "path", "name": "procurementInvoiceUuid", "required": true, "dataType": "string" },
            orderPaymentVariant: { "in": "path", "name": "orderPaymentVariant", "required": true, "ref": "OrderPaymentVariant" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "CreateOrderFromInvoiceRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProcurementInvoiceOrderController_1.ProcurementInvoiceOrderController();
            const promise = controller.handleCreateOrderFromInvoice.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/procurementinvoiceorders/OrdersByUuids', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProcurementInvoiceOrderController_1.ProcurementInvoiceOrderController)), ...((0, runtime_1.fetchMiddlewares)(ProcurementInvoiceOrderController_1.ProcurementInvoiceOrderController.prototype.handleGetPaidOrderByUuid)), function ProcurementInvoiceOrderController_handleGetPaidOrderByUuid(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "orderByUuidsDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProcurementInvoiceOrderController_1.ProcurementInvoiceOrderController();
            const promise = controller.handleGetPaidOrderByUuid.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/procurementinvoiceorders/:procurementInvoiceUuid/decline', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProcurementInvoiceOrderController_1.ProcurementInvoiceOrderController)), ...((0, runtime_1.fetchMiddlewares)(ProcurementInvoiceOrderController_1.ProcurementInvoiceOrderController.prototype.handleDeclineInvoice)), function ProcurementInvoiceOrderController_handleDeclineInvoice(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            procurementInvoiceUuid: { "in": "path", "name": "procurementInvoiceUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProcurementInvoiceOrderController_1.ProcurementInvoiceOrderController();
            const promise = controller.handleDeclineInvoice.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/categories/all', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleGetAllCategories)), function ProductsController_handleGetAllCategories(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "double" },
            pageSize: { "in": "query", "name": "pageSize", "required": true, "dataType": "double" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleGetAllCategories.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/brands/all', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleGetAllBrands)), function ProductsController_handleGetAllBrands(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleGetAllBrands.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/categories/available', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleGetAvailableCategories)), function ProductsController_handleGetAvailableCategories(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleGetAvailableCategories.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/brands/available', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleGetAvailableBrands)), function ProductsController_handleGetAvailableBrands(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleGetAvailableBrands.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/brands/:categoryUuid', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleGetBrandCategories)), function ProductsController_handleGetBrandCategories(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            isAddProduct: { "in": "query", "name": "isAddProduct", "required": true, "dataType": "boolean" },
            categoryUuid: { "in": "path", "name": "categoryUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleGetBrandCategories.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/category/locationstates/:categoryUuid', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleGetCategoryLocationStates)), function ProductsController_handleGetCategoryLocationStates(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            categoryUuid: { "in": "path", "name": "categoryUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleGetCategoryLocationStates.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/available/locationstates', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleGetAvailableLocationStates)), function ProductsController_handleGetAvailableLocationStates(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleGetAvailableLocationStates.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/category/:categoryUuid', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.categoryProducts)), function ProductsController_categoryProducts(request, response, next) {
        const args = {
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "ProductPriceSortOrder" },
            categoryUuid: { "in": "path", "name": "categoryUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.categoryProducts.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/categoryInfo/:categoryUuid', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.categoryInfo)), function ProductsController_categoryInfo(request, response, next) {
        const args = {
            categoryUuid: { "in": "path", "name": "categoryUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.categoryInfo.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/brand/:brandUuid', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.brandProducts)), function ProductsController_brandProducts(request, response, next) {
        const args = {
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "ProductPriceSortOrder" },
            brandUuid: { "in": "path", "name": "brandUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.brandProducts.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/brandInfo/:brandUuid', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.brandInfo)), function ProductsController_brandInfo(request, response, next) {
        const args = {
            brandUuid: { "in": "path", "name": "brandUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.brandInfo.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/products/catalogue/for/guest', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleGetProductsCatalogueForGuest)), function ProductsController_handleGetProductsCatalogueForGuest(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "ProductPriceSortOrder" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "ProductCatalogueFilterRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleGetProductsCatalogueForGuest.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/products/catalogue/for/loggedin', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleGetProductsCatalogueForLoggedIn)), function ProductsController_handleGetProductsCatalogueForLoggedIn(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "ProductPriceSortOrder" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "ProductCatalogueFilterRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleGetProductsCatalogueForLoggedIn.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/search', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleGetSearchProducts)), function ProductsController_handleGetSearchProducts(request, response, next) {
        const args = {
            searchWord: { "in": "query", "name": "searchWord", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleGetSearchProducts.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/variants/:productUuid', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleProductVariantsFetch)), function ProductsController_handleProductVariantsFetch(request, response, next) {
        const args = {
            productUuid: { "in": "path", "name": "productUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleProductVariantsFetch.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleFetchCurrentUserProducts)), function ProductsController_handleFetchCurrentUserProducts(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleFetchCurrentUserProducts.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/seller/:userUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleFetchSellerProducts)), function ProductsController_handleFetchSellerProducts(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            userUuid: { "in": "query", "name": "userUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleFetchSellerProducts.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/:productUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.getProductDetails)), function ProductsController_getProductDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            productUuid: { "in": "query", "name": "productUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.getProductDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/guest/:productUuid', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.getPublicProductDetails)), function ProductsController_getPublicProductDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            productUuid: { "in": "query", "name": "productUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.getPublicProductDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/products/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.createProducts)), function ProductsController_createProducts(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewProductRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.createProducts.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/products/create/variant/:productUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.createProductVariant)), function ProductsController_createProductVariant(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            productUuid: { "in": "path", "name": "productUuid", "required": true, "dataType": "string" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewProductRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.createProductVariant.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/products/:uuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleProductUpdate)), function ProductsController_handleProductUpdate(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            productUuid: { "in": "path", "name": "uuid", "required": true, "dataType": "string" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "NewUpdateProductRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleProductUpdate.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/products/:productUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleDeleteProduct)), function ProductsController_handleDeleteProduct(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            productUuid: { "in": "path", "name": "productUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleDeleteProduct.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/products', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleDeleteProductImage)), function ProductsController_handleDeleteProductImage(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            productUuid: { "in": "query", "name": "productUuid", "required": true, "dataType": "string" },
            keyFromCloudProvider: { "in": "query", "name": "keyFromCloudProvider", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleDeleteProductImage.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/products/:productUuid/review', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.reviewProduct)), function ProductsController_reviewProduct(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "ProductReviewRequestDto" },
            productUuid: { "in": "path", "name": "productUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.reviewProduct.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/:productUuid/reviews', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleGetProductReviews)), function ProductsController_handleGetProductReviews(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            productUuid: { "in": "path", "name": "productUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleGetProductReviews.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/products/catelogue/guest/:sellerUuid', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handlePublicSellerProducts)), function ProductsController_handlePublicSellerProducts(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sellerUuid: { "in": "path", "name": "sellerUuid", "required": true, "dataType": "string" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handlePublicSellerProducts.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/products/deactivate/:uuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleDeActivateProdict)), function ProductsController_handleDeActivateProdict(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            productUuid: { "in": "path", "name": "uuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleDeActivateProdict.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/products/activate/:uuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductsController.prototype.handleActivateProdict)), function ProductsController_handleActivateProdict(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            productUuid: { "in": "path", "name": "uuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductController_1.ProductsController();
            const promise = controller.handleActivateProdict.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/productlease/productlease/request', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductLeaseController_1.ProductLeaseController)), ...((0, runtime_1.fetchMiddlewares)(ProductLeaseController_1.ProductLeaseController.prototype.requestProductLease)), function ProductLeaseController_requestProductLease(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ProductLeaseRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductLeaseController_1.ProductLeaseController();
            const promise = controller.requestProductLease.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/productlease/productlease/status', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductLeaseController_1.ProductLeaseController)), ...((0, runtime_1.fetchMiddlewares)(ProductLeaseController_1.ProductLeaseController.prototype.productLeaseStatus)), function ProductLeaseController_productLeaseStatus(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductLeaseController_1.ProductLeaseController();
            const promise = controller.productLeaseStatus.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/productlease/productlease/:uuid/payments/history', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductLeaseController_1.ProductLeaseController)), ...((0, runtime_1.fetchMiddlewares)(ProductLeaseController_1.ProductLeaseController.prototype.productLeasePaymentsHistory)), function ProductLeaseController_productLeasePaymentsHistory(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            uuid: { "in": "path", "name": "uuid", "required": true, "dataType": "string" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductLeaseController_1.ProductLeaseController();
            const promise = controller.productLeasePaymentsHistory.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/productlease/productlease/leaveintent', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductLeaseController_1.ProductLeaseController)), ...((0, runtime_1.fetchMiddlewares)(ProductLeaseController_1.ProductLeaseController.prototype.processProductLeaveLeaveIntent)), function ProductLeaseController_processProductLeaveLeaveIntent(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductLeaseController_1.ProductLeaseController();
            const promise = controller.processProductLeaveLeaveIntent.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/productlease/productlease/documents', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProductLeaseController_1.ProductLeaseController)), ...((0, runtime_1.fetchMiddlewares)(ProductLeaseController_1.ProductLeaseController.prototype.productLeaseRequestDocs)), function ProductLeaseController_productLeaseRequestDocs(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProductLeaseController_1.ProductLeaseController();
            const promise = controller.productLeaseRequestDocs.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/profile', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.getProfile)), function ProfileController_getProfile(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.getProfile.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/profile', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.updateProfile)), function ProfileController_updateProfile(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "lastName": { "dataType": "string", "required": true }, "firstName": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.updateProfile.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/profile/public/:phoneNumber', ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.getPublicProfile)), function ProfileController_getPublicProfile(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            phoneNumber: { "in": "path", "name": "phoneNumber", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.getPublicProfile.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/profile/linkedbuyers', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.getBuyerProfiles)), function ProfileController_getBuyerProfiles(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.getBuyerProfiles.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/profile/bankaccount', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.bankAccountInfo)), function ProfileController_bankAccountInfo(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.bankAccountInfo.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/profile/linkedbuyers/invite', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.addBuyerToMyLinkList)), function ProfileController_addBuyerToMyLinkList(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "LinkBuyerToSellerRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.addBuyerToMyLinkList.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/profile/unlinkbuyer', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.handleUnlinkBuyer)), function ProfileController_handleUnlinkBuyer(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            userUuid: { "in": "query", "name": "userUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.handleUnlinkBuyer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/profile/unlinkseller', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.handleUnlinkSeller)), function ProfileController_handleUnlinkSeller(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.handleUnlinkSeller.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/profile/defaultseller/acceptinvite', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.handleDefaultSellerAcceptInvite)), function ProfileController_handleDefaultSellerAcceptInvite(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sellerUniqueCode: { "in": "query", "name": "sellerUniqueCode", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.handleDefaultSellerAcceptInvite.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/profile/bankaccount', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.saveBankAccountInfo)), function ProfileController_saveBankAccountInfo(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "SaveNewBankAccount" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.saveBankAccountInfo.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/profile/newpassword', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.handleSetNewPassword)), function ProfileController_handleSetNewPassword(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "ResetForgottenPasswordRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.handleSetNewPassword.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/profile/resetpassword', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.resetPassword)), function ProfileController_resetPassword(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "ResetPasswordRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.resetPassword.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/profile/seller/statistics', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.handleSellerDashboardStats)), function ProfileController_handleSellerDashboardStats(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.handleSellerDashboardStats.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/profile/seller/document', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.sellerProfileDocs)), function ProfileController_sellerProfileDocs(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.sellerProfileDocs.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/profile/requestcall', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.requestAcall)), function ProfileController_requestAcall(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.requestAcall.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/profile/upgradeToSeller', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.upgradeBuyerToSeller)), function ProfileController_upgradeBuyerToSeller(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.upgradeBuyerToSeller.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/profile/publicstore/:uniqueCode', ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.handleSellerPublicProfile)), function ProfileController_handleSellerPublicProfile(request, response, next) {
        const args = {
            uniqueCode: { "in": "path", "name": "uniqueCode", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.handleSellerPublicProfile.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/profile/request-bank-details-change', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController)), ...((0, runtime_1.fetchMiddlewares)(ProfileController_1.ProfileController.prototype.handleRequestchangeBankDetailsChange)), function ProfileController_handleRequestchangeBankDetailsChange(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "SaveNewBankAccount" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProfileController_1.ProfileController();
            const promise = controller.handleRequestchangeBankDetailsChange.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/project', ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleGetProjects)), function ProjectController_handleGetProjects(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            projectStatus: { "in": "query", "name": "status", "required": true, "ref": "ProjectStatuses" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleGetProjects.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/project/myprojects', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleGetMyProjects)), function ProjectController_handleGetMyProjects(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            projectStatus: { "in": "query", "name": "status", "required": true, "ref": "ProjectStatuses" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleGetMyProjects.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/project/subscriptions', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleGetMyProjectsSubscription)), function ProjectController_handleGetMyProjectsSubscription(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            projectStatus: { "in": "query", "name": "status", "required": true, "ref": "ProjectStatuses" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleGetMyProjectsSubscription.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/project/popularprojects', ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleGetPopularProjectBaseOnSubscriptions)), function ProjectController_handleGetPopularProjectBaseOnSubscriptions(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleGetPopularProjectBaseOnSubscriptions.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/project/unsubscriptionprojects', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleGetUserUnSubscriptionProjects)), function ProjectController_handleGetUserUnSubscriptionProjects(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleGetUserUnSubscriptionProjects.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/project/toplocationprojects', ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleGetTopLocationProjects)), function ProjectController_handleGetTopLocationProjects(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleGetTopLocationProjects.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/project/myprojects/:projectUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleMyProjectFetchDetails)), function ProjectController_handleMyProjectFetchDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            projectUuid: { "in": "path", "name": "projectUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleMyProjectFetchDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/project/:projectUuid', ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleProjectFetchDetails)), function ProjectController_handleProjectFetchDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            projectUuid: { "in": "path", "name": "projectUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleProjectFetchDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/project/subscriptions/:subscriptionUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleProjectSubscriptionFetchDetails)), function ProjectController_handleProjectSubscriptionFetchDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            subscriptionUuid: { "in": "path", "name": "subscriptionUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleProjectSubscriptionFetchDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/project/subscriptions/:subscriptionUuid/:investorUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleFetchInvestorProjectSubscriptionDetails)), function ProjectController_handleFetchInvestorProjectSubscriptionDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            subscriptionUuid: { "in": "path", "name": "subscriptionUuid", "required": true, "dataType": "string" },
            investorUuid: { "in": "path", "name": "investorUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleFetchInvestorProjectSubscriptionDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/project/subscriptions/investor/:investorUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleGetInvestorSubscription)), function ProjectController_handleGetInvestorSubscription(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            investorUuid: { "in": "path", "name": "investorUuid", "required": true, "dataType": "string" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleGetInvestorSubscription.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/project/filterproject', ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.filterProjects)), function ProjectController_filterProjects(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "SearchProjectDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.filterProjects.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/project/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.createProject)), function ProjectController_createProject(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewProjectRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.createProject.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/project/subscription/:projectSubscriptionPaymentVariant', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.createProjectSubscription)), function ProjectController_createProjectSubscription(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            projectSubscriptionPaymentVariant: { "in": "path", "name": "projectSubscriptionPaymentVariant", "required": true, "ref": "ProjectSubscriptionPaymentVariant" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "NewProjectSubscriptionRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.createProjectSubscription.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/project/:uuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleProjectUpdate)), function ProjectController_handleProjectUpdate(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            projectUuid: { "in": "path", "name": "uuid", "required": true, "dataType": "string" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "NewUpdateProjectRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleProjectUpdate.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/project/updatestatus/:uuid/:newprojectstatus', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleProjectUpdateStatus)), function ProjectController_handleProjectUpdateStatus(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            projectUuid: { "in": "path", "name": "uuid", "required": true, "dataType": "string" },
            newprojectstatus: { "in": "path", "name": "newprojectstatus", "required": true, "ref": "ProjectStatuses" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleProjectUpdateStatus.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/project/updateprojectstage/:projectUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(ProjectController_1.ProjectController.prototype.handleUpdateProjectStage)), function ProjectController_handleUpdateProjectStage(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            projectUuid: { "in": "path", "name": "projectUuid", "required": true, "dataType": "string" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "UpdateProjectStageRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new ProjectController_1.ProjectController();
            const promise = controller.handleUpdateProjectStage.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/quoterequests/:quoteRequestUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(QuoteRequestController_1.QuoteRequestController)), ...((0, runtime_1.fetchMiddlewares)(QuoteRequestController_1.QuoteRequestController.prototype.handleGetQuoteRequestDetails)), function QuoteRequestController_handleGetQuoteRequestDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            quoteRequestUuid: { "in": "path", "name": "quoteRequestUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new QuoteRequestController_1.QuoteRequestController();
            const promise = controller.handleGetQuoteRequestDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/quoterequests', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(QuoteRequestController_1.QuoteRequestController)), ...((0, runtime_1.fetchMiddlewares)(QuoteRequestController_1.QuoteRequestController.prototype.handleNewRequestQuote)), function QuoteRequestController_handleNewRequestQuote(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "QuoteRequestCreateRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new QuoteRequestController_1.QuoteRequestController();
            const promise = controller.handleNewRequestQuote.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/quoterequests/:quoteRequestUuid/seller_response', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(QuoteRequestController_1.QuoteRequestController)), ...((0, runtime_1.fetchMiddlewares)(QuoteRequestController_1.QuoteRequestController.prototype.handleQuoteRequestSellerResponse)), function QuoteRequestController_handleQuoteRequestSellerResponse(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            quoteRequestUuid: { "in": "path", "name": "quoteRequestUuid", "required": true, "dataType": "string" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "deliveryFee": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true }, "unitPrice": { "dataType": "double", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new QuoteRequestController_1.QuoteRequestController();
            const promise = controller.handleQuoteRequestSellerResponse.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/quoterequests/:quoteRequestUuid/seller_response/decline', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(QuoteRequestController_1.QuoteRequestController)), ...((0, runtime_1.fetchMiddlewares)(QuoteRequestController_1.QuoteRequestController.prototype.handleQuoteRequestSellerDecline)), function QuoteRequestController_handleQuoteRequestSellerDecline(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            quoteRequestUuid: { "in": "path", "name": "quoteRequestUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new QuoteRequestController_1.QuoteRequestController();
            const promise = controller.handleQuoteRequestSellerDecline.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/quoterequests', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(QuoteRequestController_1.QuoteRequestController)), ...((0, runtime_1.fetchMiddlewares)(QuoteRequestController_1.QuoteRequestController.prototype.handleGetMyQuoteRequests)), function QuoteRequestController_handleGetMyQuoteRequests(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            persona: { "in": "query", "name": "persona", "required": true, "ref": "Persona" },
            pendingResponse: { "in": "query", "name": "pendingResponse", "required": true, "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["true"] }, { "dataType": "enum", "enums": ["false"] }] },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new QuoteRequestController_1.QuoteRequestController();
            const promise = controller.handleGetMyQuoteRequests.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/savedproducts', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(SavedProductController_1.SavedProductsController)), ...((0, runtime_1.fetchMiddlewares)(SavedProductController_1.SavedProductsController.prototype.handleSavedProducts)), function SavedProductsController_handleSavedProducts(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new SavedProductController_1.SavedProductsController();
            const promise = controller.handleSavedProducts.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/savedproducts/:productUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(SavedProductController_1.SavedProductsController)), ...((0, runtime_1.fetchMiddlewares)(SavedProductController_1.SavedProductsController.prototype.saveProduct)), function SavedProductsController_saveProduct(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            productUuid: { "in": "path", "name": "productUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new SavedProductController_1.SavedProductsController();
            const promise = controller.saveProduct.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/savedproducts/:productUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(SavedProductController_1.SavedProductsController)), ...((0, runtime_1.fetchMiddlewares)(SavedProductController_1.SavedProductsController.prototype.deleteSavedProduct)), function SavedProductsController_deleteSavedProduct(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            productUuid: { "in": "path", "name": "productUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new SavedProductController_1.SavedProductsController();
            const promise = controller.deleteSavedProduct.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/temporaryorders/:orderUuid', ...((0, runtime_1.fetchMiddlewares)(TemporaryOrdersController_1.TemporaryOrdersController)), ...((0, runtime_1.fetchMiddlewares)(TemporaryOrdersController_1.TemporaryOrdersController.prototype.handleFetchTemporaryOrderDetails)), function TemporaryOrdersController_handleFetchTemporaryOrderDetails(request, response, next) {
        const args = {
            orderUuid: { "in": "path", "name": "orderUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new TemporaryOrdersController_1.TemporaryOrdersController();
            const promise = controller.handleFetchTemporaryOrderDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/temporaryorders/prepare', ...((0, runtime_1.fetchMiddlewares)(TemporaryOrdersController_1.TemporaryOrdersController)), ...((0, runtime_1.fetchMiddlewares)(TemporaryOrdersController_1.TemporaryOrdersController.prototype.handleTemporaryOrderPreparationFromTemporaryCart)), function TemporaryOrdersController_handleTemporaryOrderPreparationFromTemporaryCart(request, response, next) {
        const args = {
            reqBody: { "in": "body", "name": "reqBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "temporaryCartItems": { "dataType": "array", "array": { "dataType": "refObject", "ref": "NewCartItemRequestDto" }, "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new TemporaryOrdersController_1.TemporaryOrdersController();
            const promise = controller.handleTemporaryOrderPreparationFromTemporaryCart.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/temporaryorders/temporary/create/frompreparedcart', ...((0, runtime_1.fetchMiddlewares)(TemporaryOrdersController_1.TemporaryOrdersController)), ...((0, runtime_1.fetchMiddlewares)(TemporaryOrdersController_1.TemporaryOrdersController.prototype.handleTemporaryOrderCreationFromPreparedCart)), function TemporaryOrdersController_handleTemporaryOrderCreationFromPreparedCart(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "TemporaryOrderCreateWithSellerGroupingRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new TemporaryOrdersController_1.TemporaryOrdersController();
            const promise = controller.handleTemporaryOrderCreationFromPreparedCart.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/temporaryorders/temporary/paid', ...((0, runtime_1.fetchMiddlewares)(TemporaryOrdersController_1.TemporaryOrdersController)), ...((0, runtime_1.fetchMiddlewares)(TemporaryOrdersController_1.TemporaryOrdersController.prototype.handlePaidTemporaryOrder)), function TemporaryOrdersController_handlePaidTemporaryOrder(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reference": { "dataType": "string", "required": true }, "temporaryOrderUuids": { "dataType": "array", "array": { "dataType": "string" }, "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new TemporaryOrdersController_1.TemporaryOrdersController();
            const promise = controller.handlePaidTemporaryOrder.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/upload', authenticateMiddleware([{ "jwt": [] }]), upload.single('file'), ...((0, runtime_1.fetchMiddlewares)(UploadController_1.UploadController)), ...((0, runtime_1.fetchMiddlewares)(UploadController_1.UploadController.prototype.handleFileUpload)), function UploadController_handleFileUpload(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            file: { "in": "formData", "name": "file", "required": true, "dataType": "file" },
            fileUploadCategory: { "in": "query", "name": "fileUploadCategory", "required": true, "ref": "UploadFileCategory" },
            entityUuid: { "in": "query", "name": "entityUuid", "ref": "NullableString" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new UploadController_1.UploadController();
            const promise = controller.handleFileUpload.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/wallet/main/balance', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WalletController_1.WalletController)), ...((0, runtime_1.fetchMiddlewares)(WalletController_1.WalletController.prototype.mainWalletBalance)), function WalletController_mainWalletBalance(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WalletController_1.WalletController();
            const promise = controller.mainWalletBalance.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/wallet/withdraw', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WalletController_1.WalletController)), ...((0, runtime_1.fetchMiddlewares)(WalletController_1.WalletController.prototype.withdraw)), function WalletController_withdraw(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "WithdrawFundsRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WalletController_1.WalletController();
            const promise = controller.withdraw.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/wallet/transactions', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WalletController_1.WalletController)), ...((0, runtime_1.fetchMiddlewares)(WalletController_1.WalletController.prototype.financialTransactions)), function WalletController_financialTransactions(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WalletController_1.WalletController();
            const promise = controller.financialTransactions.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/wallet/earnings', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WalletController_1.WalletController)), ...((0, runtime_1.fetchMiddlewares)(WalletController_1.WalletController.prototype.earnings)), function WalletController_earnings(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WalletController_1.WalletController();
            const promise = controller.earnings.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/wallet/secondary/balance', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WalletController_1.WalletController)), ...((0, runtime_1.fetchMiddlewares)(WalletController_1.WalletController.prototype.secondaryWalletBalance)), function WalletController_secondaryWalletBalance(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WalletController_1.WalletController();
            const promise = controller.secondaryWalletBalance.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/wallet/secondary/transactions', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WalletController_1.WalletController)), ...((0, runtime_1.fetchMiddlewares)(WalletController_1.WalletController.prototype.secondaryDinancialTransactions)), function WalletController_secondaryDinancialTransactions(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WalletController_1.WalletController();
            const promise = controller.secondaryDinancialTransactions.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/warehouse', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.handleCreateNewWareHouse)), function WareHouseController_handleCreateNewWareHouse(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "NewWareHouseRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.handleCreateNewWareHouse.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/warehouse', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.handleFetchMyWareHouses)), function WareHouseController_handleFetchMyWareHouses(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.handleFetchMyWareHouses.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/warehouse/delivery-to-site', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.handleGetSiteDeliveryRequests)), function WareHouseController_handleGetSiteDeliveryRequests(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            startDate: { "in": "query", "name": "startDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            endDate: { "in": "query", "name": "endDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.handleGetSiteDeliveryRequests.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/warehouse/delivery-to-site/:deliveryRequestUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.handleFetchDeliveryDetails)), function WareHouseController_handleFetchDeliveryDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            deliveryRequestUuid: { "in": "path", "name": "deliveryRequestUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.handleFetchDeliveryDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/warehouse/delivery-to-site/:deliverySiteUuid/site', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.handleFetchSingleDeliveryRquest)), function WareHouseController_handleFetchSingleDeliveryRquest(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            deliverySiteUuid: { "in": "path", "name": "deliverySiteUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.handleFetchSingleDeliveryRquest.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/warehouse/:wareHouseUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.handleFetchWareHouseDetails)), function WareHouseController_handleFetchWareHouseDetails(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            wareHouseUuid: { "in": "path", "name": "wareHouseUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.handleFetchWareHouseDetails.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/warehouse/:wareHouseUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.handleDeleteWareHouse)), function WareHouseController_handleDeleteWareHouse(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            wareHouseUuid: { "in": "path", "name": "wareHouseUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.handleDeleteWareHouse.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/api/warehouse/:wareHouseUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.updateNewWareHouse)), function WareHouseController_updateNewWareHouse(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            wareHouseUuid: { "in": "path", "name": "wareHouseUuid", "required": true, "dataType": "string" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "UpdateWareHouseRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.updateNewWareHouse.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/warehouse/:wareHouseUuid/sites', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.handleCreateNewWareHouseSite)), function WareHouseController_handleCreateNewWareHouseSite(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            wareHouseUuid: { "in": "path", "name": "wareHouseUuid", "required": true, "dataType": "string" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "WareHouseSiteRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.handleCreateNewWareHouseSite.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/warehouse/:wareHouseUuid/sites', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.handleFetchWareHouseSites)), function WareHouseController_handleFetchWareHouseSites(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            wareHouseUuid: { "in": "path", "name": "wareHouseUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.handleFetchWareHouseSites.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/warehouse/:wareHouseUuid/product_purchase', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.getWareHouseProductPurchases)), function WareHouseController_getWareHouseProductPurchases(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            wareHouseUuid: { "in": "path", "name": "wareHouseUuid", "required": true, "dataType": "string" },
            startDate: { "in": "query", "name": "startDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            endDate: { "in": "query", "name": "endDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.getWareHouseProductPurchases.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/warehouse/:wareHouseUuid/product_purchase/byDate', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.getWareHouseProductPurchaseByDate)), function WareHouseController_getWareHouseProductPurchaseByDate(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            wareHouseUuid: { "in": "path", "name": "wareHouseUuid", "required": true, "dataType": "string" },
            startDate: { "in": "query", "name": "startDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            endDate: { "in": "query", "name": "endDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.getWareHouseProductPurchaseByDate.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/warehouse/:wareHouseUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.getWareHouseProductOrderHistory)), function WareHouseController_getWareHouseProductOrderHistory(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            wareHouseUuid: { "in": "path", "name": "wareHouseUuid", "required": true, "dataType": "string" },
            productUuid: { "in": "query", "name": "productUuid", "required": true, "dataType": "string" },
            productPurchaseUuid: { "in": "query", "name": "productPurchaseUuid", "required": true, "dataType": "string" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            startDate: { "in": "query", "name": "startDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            endDate: { "in": "query", "name": "endDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.getWareHouseProductOrderHistory.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/warehouse/:wareHouseUuid/delivery-to-site', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.handleGetWareHouseToSiteDeliveryRequests)), function WareHouseController_handleGetWareHouseToSiteDeliveryRequests(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            sortOrder: { "in": "query", "name": "sortOrder", "required": true, "ref": "SortOrder" },
            wareHouseUuid: { "in": "path", "name": "wareHouseUuid", "required": true, "dataType": "string" },
            pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "any" },
            startDate: { "in": "query", "name": "startDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            endDate: { "in": "query", "name": "endDate", "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.handleGetWareHouseToSiteDeliveryRequests.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/warehouse/:wareHouseUuid/delivery-to-site', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.handleDeliveryRequestToSite)), function WareHouseController_handleDeliveryRequestToSite(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            wareHouseUuid: { "in": "path", "name": "wareHouseUuid", "required": true, "dataType": "string" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "WareHouseToDeliveryToSiteRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.handleDeliveryRequestToSite.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/warehouse/:wareHouseUuid/delivery-to-site/:deliveryRequestUuid/:acceptOrDecline', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseController_1.WareHouseController.prototype.acceptDeliveryRequestToSiteFee)), function WareHouseController_acceptDeliveryRequestToSiteFee(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            wareHouseUuid: { "in": "path", "name": "wareHouseUuid", "required": true, "dataType": "string" },
            deliveryToSiteUuid: { "in": "path", "name": "deliveryRequestUuid", "required": true, "dataType": "string" },
            acceptOrDecline: { "in": "path", "name": "acceptOrDecline", "required": true, "ref": "AcceptOrDeclineType" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "paymentVariant": { "dataType": "union", "subSchemas": [{ "ref": "OrderPaymentVariant" }, { "dataType": "enum", "enums": [null] }] }, "status": { "ref": "WareHouseToSiteDeliveryFeeStatuses", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseController_1.WareHouseController();
            const promise = controller.acceptDeliveryRequestToSiteFee.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/reorderlevel', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseProductReorderLevelController_1.WareHouseProductReorderLevelController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseProductReorderLevelController_1.WareHouseProductReorderLevelController.prototype.handleCreateProductReorderLevel)), function WareHouseProductReorderLevelController_handleCreateProductReorderLevel(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "SetProductReorderLevelRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseProductReorderLevelController_1.WareHouseProductReorderLevelController();
            const promise = controller.handleCreateProductReorderLevel.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/reorderlevel/:wareHouseUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseProductReorderLevelController_1.WareHouseProductReorderLevelController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseProductReorderLevelController_1.WareHouseProductReorderLevelController.prototype.handleFetchWareReorderLevel)), function WareHouseProductReorderLevelController_handleFetchWareReorderLevel(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            wareHouseUuid: { "in": "path", "name": "wareHouseUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseProductReorderLevelController_1.WareHouseProductReorderLevelController();
            const promise = controller.handleFetchWareReorderLevel.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/reorderlevel/:reorderLevelUuid', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(WareHouseProductReorderLevelController_1.WareHouseProductReorderLevelController)), ...((0, runtime_1.fetchMiddlewares)(WareHouseProductReorderLevelController_1.WareHouseProductReorderLevelController.prototype.handleDeleteProderReorderLevel)), function WareHouseProductReorderLevelController_handleDeleteProderReorderLevel(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            reorderLevelUuid: { "in": "path", "name": "reorderLevelUuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new WareHouseProductReorderLevelController_1.WareHouseProductReorderLevelController();
            const promise = controller.handleDeleteProderReorderLevel.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function authenticateMiddleware(security = []) {
        return function runAuthenticationMiddleware(request, _response, next) {
            return __awaiter(this, void 0, void 0, function* () {
                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                // keep track of failed auth attempts so we can hand back the most
                // recent one.  This behavior was previously existing so preserving it
                // here
                const failedAttempts = [];
                const pushAndRethrow = (error) => {
                    failedAttempts.push(error);
                    throw error;
                };
                const secMethodOrPromises = [];
                for (const secMethod of security) {
                    if (Object.keys(secMethod).length > 1) {
                        const secMethodAndPromises = [];
                        for (const name in secMethod) {
                            secMethodAndPromises.push((0, authentication_1.expressAuthentication)(request, name, secMethod[name])
                                .catch(pushAndRethrow));
                        }
                        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                        secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                            .then(users => { return users[0]; }));
                    }
                    else {
                        for (const name in secMethod) {
                            secMethodOrPromises.push((0, authentication_1.expressAuthentication)(request, name, secMethod[name])
                                .catch(pushAndRethrow));
                        }
                    }
                }
                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                try {
                    request['user'] = yield promiseAny(secMethodOrPromises);
                    next();
                }
                catch (err) {
                    // Show most recent error as response
                    const error = failedAttempts.pop();
                    error.status = error.status || 401;
                    next(error);
                }
                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            });
        };
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode = successStatus;
            let headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function returnHandler(response, statusCode, data, headers = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        }
        else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function getValidatedArgs(args, request, response) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map
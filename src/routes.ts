/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AccessController } from './controllers/AccessController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminController } from './controllers/AdminController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BankController } from './controllers/BankController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CartController } from './controllers/CartController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CooperateController } from './controllers/CooperateController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CouponController } from './controllers/CouponController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DeliveryLocationController } from './controllers/DeliveryLocationController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EstateDeveloperController } from './controllers/EstateDeveloperController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { InvestorController } from './controllers/InvestorController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { InvoiceController } from './controllers/InvoiceController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MiscController } from './controllers/MiscController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MortgageCardController } from './controllers/MortgageCardController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NotificationsController } from './controllers/NotificationsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OnboardingController } from './controllers/OnboardingController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OrdersController } from './controllers/OrdersController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PaymentsController } from './controllers/PaymentController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PickupLocationController } from './controllers/PickupLocationController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PriceMatrixController } from './controllers/PriceMatrixController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProcurementController } from './controllers/ProcurementController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProcurementInvoiceOrderController } from './controllers/ProcurementInvoiceOrderController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductsController } from './controllers/ProductController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductLeaseController } from './controllers/ProductLeaseController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProfileController } from './controllers/ProfileController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProjectController } from './controllers/ProjectController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { QuoteRequestController } from './controllers/QuoteRequestController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SavedProductsController } from './controllers/SavedProductController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TemporaryOrdersController } from './controllers/TemporaryOrdersController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UploadController } from './controllers/UploadController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WalletController } from './controllers/WalletController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WareHouseController } from './controllers/WareHouseController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WareHouseProductReorderLevelController } from './controllers/WareHouseProductReorderLevelController';
import { expressAuthentication } from './authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler } from 'express';
import * as express from 'express';
const multer = require('multer');
const upload = multer();

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "IAccessTokenData": {
        "dataType": "refObject",
        "properties": {
            "token": {"dataType":"string","required":true},
            "refreshToken": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DetailedError": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "standardizedErrorCode": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IAccessTokenData_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IAccessTokenData"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPasswordLoginRequestDto": {
        "dataType": "refObject",
        "properties": {
            "phoneNumber": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse__phoneVerificationOtp%3F%3Astring__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"phoneVerificationOtp":{"dataType":"string"}}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginWithPhone": {
        "dataType": "refObject",
        "properties": {
            "phoneNumber": {"dataType":"string","required":true},
            "countryIso2": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginWithPhoneOtpVerify": {
        "dataType": "refObject",
        "properties": {
            "phoneNumber": {"dataType":"string","required":true},
            "countryIso2": {"dataType":"string","required":true},
            "otp": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_void_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"void"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_any_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"any"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewCategoryRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "unitOfMeasurement": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewUpdateCategoryRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "unitOfMeasurement": {"dataType":"string"},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "brandUuids": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewBrandRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "categoryUuids": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Roles": {
        "dataType": "refEnum",
        "enums": ["normal_user","superadmin","affiliate","developer","investor"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRating": {
        "dataType": "refObject",
        "properties": {
            "totalRatingsValue": {"dataType":"double","required":true},
            "totalNumberOfRatings": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPublicBusinessProfile": {
        "dataType": "refObject",
        "properties": {
            "businessName": {"dataType":"string","required":true},
            "businessAddress": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPublicProfileForAdmin": {
        "dataType": "refObject",
        "properties": {
            "userUuid": {"dataType":"string","required":true},
            "userId": {"dataType":"double","required":true},
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "photoUrl": {"dataType":"string","required":true},
            "storeFrontBannerImageUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "role": {"ref":"Roles","required":true},
            "sellerUniqueCode": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "phoneNumber": {"dataType":"string","required":true},
            "accountRating": {"ref":"IRating","required":true},
            "businessProfile": {"dataType":"union","subSchemas":[{"ref":"IPublicBusinessProfile"},{"dataType":"enum","enums":[null]}]},
            "msisdn": {"dataType":"string","required":true},
            "isSeller": {"dataType":"boolean","required":true},
            "isCooperate": {"dataType":"boolean","required":true},
            "accountId": {"dataType":"double","required":true},
            "walletBalanceMajor": {"dataType":"double","required":true},
            "walletCurrency": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_IPublicProfileForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"IPublicProfileForAdmin"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_IPublicProfileForAdmin_-or-IPublicProfileForAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_IPublicProfileForAdmin_"},{"dataType":"array","array":{"dataType":"refObject","ref":"IPublicProfileForAdmin"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SortOrder": {
        "dataType": "refEnum",
        "enums": ["ASC","DESC"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPublicProfileForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPublicProfileForAdmin"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeliveryLocationResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "contactFullName": {"dataType":"string","required":true},
            "contactPhoneNumber": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "country": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "state": {"dataType":"string","required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_DeliveryLocationResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"DeliveryLocationResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_DeliveryLocationResponseDto_-or-DeliveryLocationResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_DeliveryLocationResponseDto_"},{"dataType":"array","array":{"dataType":"refObject","ref":"DeliveryLocationResponseDto"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddDeliveryLocationByAdminRequestDto": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "contactFullName": {"dataType":"string","required":true},
            "contactPhoneNumber": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPublicProfile": {
        "dataType": "refObject",
        "properties": {
            "userUuid": {"dataType":"string","required":true},
            "userId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "photoUrl": {"dataType":"string","required":true},
            "storeFrontBannerImageUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "role": {"ref":"Roles","required":true},
            "sellerUniqueCode": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "phoneNumber": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "accountRating": {"ref":"IRating","required":true},
            "businessProfile": {"dataType":"union","subSchemas":[{"ref":"IPublicBusinessProfile"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPublicProfileProductLease": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "uuid": {"dataType":"string","required":true},
            "publicProfile": {"ref":"IPublicProfile","required":true},
            "principalAmountMajor": {"dataType":"double","required":true},
            "interestRatePercentage": {"dataType":"double","required":true},
            "nextLeasePaymentDueDateUtc": {"dataType":"datetime","required":true},
            "createdAtUtc": {"dataType":"datetime","required":true},
            "currency": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_IPublicProfileProductLease_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"IPublicProfileProductLease"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_IPublicProfileProductLease_-or-IPublicProfileProductLease-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_IPublicProfileProductLease_"},{"dataType":"array","array":{"dataType":"refObject","ref":"IPublicProfileProductLease"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPublicProfileProductLease_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPublicProfileProductLease"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_boolean_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"boolean"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INewProductLeaseStatusToggleDto": {
        "dataType": "refObject",
        "properties": {
            "customerUserId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INewProductLeaseRequestDto": {
        "dataType": "refObject",
        "properties": {
            "customerMsisdn": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "customerUserId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "principalAmountMinor": {"dataType":"double","required":true},
            "interestRatePercentage": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IEditProductLeaseRequestDto": {
        "dataType": "refObject",
        "properties": {
            "principalAmountMinor": {"dataType":"double","required":true},
            "interestRatePercentage": {"dataType":"double","required":true},
            "nextLeasePaymentDueDate": {"dataType":"string","required":true},
            "isActive": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductLease": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "principalAmountMajor": {"dataType":"double","required":true},
            "interestRatePercentage": {"dataType":"double","required":true},
            "amountDueMajor": {"dataType":"double","required":true},
            "nextLeasePaymentDueDateUtc": {"dataType":"datetime","required":true},
            "totalLoanAmountDue": {"dataType":"double","required":true},
            "createdAtUtc": {"dataType":"datetime","required":true},
            "currency": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IProductLease_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IProductLease"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentTransactionTypes": {
        "dataType": "refEnum",
        "enums": ["external_to_fund_wallet","external_to_pay_for_order","buyer_wallet_to_escrow","escrow_to_buyer_wallet","escrow_to_seller","escrow_to_cinderbuild_revenue","escrow_to_refund_buyer","warehouse_to_site_delivery_payment","cooperate_account_discount","project_subscription_payment","wallet_funds_withdrawal","wallet_funds_withdrawal_refund","wallet_funds_transfer","wallet_to_delivery_fee_wallet_transfer","product_lease_principal_debit","product_lease_interest_payment_debit","c_store_default_payment_charges","product_lease_payment","order_payment_default_debit","order_payment_default_daily_debit"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FinancialTransactionMetadata": {
        "dataType": "refObject",
        "properties": {
            "orderUuid": {"dataType":"string"},
            "temporaryOrderUuid": {"dataType":"string"},
            "productLeaseId": {"dataType":"double"},
            "wareHouseTositeUuid": {"dataType":"string"},
            "projectSubscriptionUuid": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransactionFlowType": {
        "dataType": "refEnum",
        "enums": ["in","out"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IFinancialTransactionForAdmin": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "type": {"ref":"PaymentTransactionTypes","required":true},
            "amountMajor": {"dataType":"double","required":true},
            "currency": {"dataType":"string","required":true},
            "walletBalanceMajorBefore": {"dataType":"double","required":true},
            "walletBalanceMajorAfter": {"dataType":"double","required":true},
            "metadata": {"ref":"FinancialTransactionMetadata","required":true},
            "paidStatus": {"dataType":"any","required":true},
            "description": {"dataType":"string","required":true},
            "flowType": {"ref":"TransactionFlowType","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "id": {"dataType":"string","required":true},
            "userId": {"dataType":"double","required":true},
            "publicProfile": {"ref":"IPublicProfile","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_IFinancialTransactionForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"IFinancialTransactionForAdmin"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_IFinancialTransactionForAdmin_-or-IFinancialTransactionForAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_IFinancialTransactionForAdmin_"},{"dataType":"array","array":{"dataType":"refObject","ref":"IFinancialTransactionForAdmin"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IFinancialTransactionForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IFinancialTransactionForAdmin"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAddNewFinancialTransactionByAdmin": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "amountMajor": {"dataType":"double","required":true},
            "description": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewPromotionRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "percentage": {"dataType":"double","required":true},
            "categoryUuid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SimpleImageJson": {
        "dataType": "refObject",
        "properties": {
            "keyFromCloudProvider": {"dataType":"string","required":true},
            "url": {"dataType":"string","required":true},
            "mimetype": {"dataType":"string","required":true},
            "fileCloudProvider": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryStateDeliveryFee": {
        "dataType": "refObject",
        "properties": {
            "state": {"dataType":"string","required":true},
            "deliveryFeeMajor": {"dataType":"double"},
            "deliveryFeeCurrency": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryProfitMargin": {
        "dataType": "refObject",
        "properties": {
            "amountMajor": {"dataType":"double","required":true},
            "currency": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategorySettingsData": {
        "dataType": "refObject",
        "properties": {
            "deliveryFees": {"dataType":"array","array":{"dataType":"refObject","ref":"CategoryStateDeliveryFee"},"required":true},
            "cinderbuildProfiltMargin": {"dataType":"union","subSchemas":[{"ref":"CategoryProfitMargin"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Category": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "uuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "brands": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"uuid":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"required":true},
            "unitOfMeasurement": {"dataType":"string","required":true},
            "image": {"ref":"SimpleImageJson","required":true},
            "banner": {"ref":"SimpleImageJson","required":true},
            "description": {"dataType":"string","required":true},
            "settings": {"ref":"CategorySettingsData","required":true},
            "isAvailable": {"dataType":"boolean","required":true},
            "productsCount": {"dataType":"double","required":true},
            "isSoftDeleted": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Promotion": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "uuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "percentage": {"dataType":"double","required":true},
            "categoryId": {"dataType":"double","required":true},
            "categoryPromotion": {"ref":"Category","required":true},
            "endDate": {"dataType":"datetime"},
            "isActive": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_Promotion_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"Promotion"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_Promotion_-or-Promotion-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_Promotion_"},{"dataType":"array","array":{"dataType":"refObject","ref":"Promotion"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_Category_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"Category"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_Category_-or-Category-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_Category_"},{"dataType":"array","array":{"dataType":"refObject","ref":"Category"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Brand": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "uuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "categories": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"uuid":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"required":true},
            "image": {"ref":"SimpleImageJson","required":true},
            "isAvailable": {"dataType":"boolean","required":true},
            "productsCount": {"dataType":"double","required":true},
            "isSoftDeleted": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_Brand_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"Brand"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_Brand_-or-Brand-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_Brand_"},{"dataType":"array","array":{"dataType":"refObject","ref":"Brand"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewAffiliateRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "emailAddress": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewSellerOmaRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "emailAddress": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "isOMA": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderReceiveTypes": {
        "dataType": "refEnum",
        "enums": ["DELIVERY","PICKUP","WARE_HOUSE"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderStatuses": {
        "dataType": "refEnum",
        "enums": ["CREATED","IN_PROGRESS","AVAILABLE_FOR_PICKUP","AVAILABLE_FOR_DELIVERY","RECEIVED","COMPLETED","CONFIRMED","CONFIRMED_BY_SYSTEM","CANCELLED_BY_BUYER","CANCELLED_BY_SELLER","CANCELLED_BY_ADMIN","ENDED_WITH_DISPUTES","PAYMENT_DEFAULT"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPaymentStatuses": {
        "dataType": "refEnum",
        "enums": ["BUYER_PAYMENT_PENDING","BUYER_PAYMENT_IN_ESCROW","BUYER_PAYMENT_REFUND","ESCROW_FUNDS_MOVED_TO_SELLER","CANCELLED_BY_ADMIN"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPaymentVariant": {
        "dataType": "refEnum",
        "enums": ["WALLET","CARD","PAY_ON_DELIVERY"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHistory_OrderStatuses_": {
        "dataType": "refObject",
        "properties": {
            "status": {"ref":"OrderStatuses","required":true},
            "dateTimeInISO8601": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHistory_OrderPaymentStatuses_": {
        "dataType": "refObject",
        "properties": {
            "status": {"ref":"OrderPaymentStatuses","required":true},
            "dateTimeInISO8601": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderReceiver": {
        "dataType": "refObject",
        "properties": {
            "userUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "userId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "firstName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "lastName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "msisdn": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrdersDetailsForAdminResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "uuid": {"dataType":"string","required":true},
            "referenceNumber": {"dataType":"string","required":true},
            "buyerPublicProfile": {"ref":"IPublicProfile","required":true},
            "sellerPublicProfile": {"ref":"IPublicProfile","required":true},
            "orderReceiveType": {"ref":"OrderReceiveTypes","required":true},
            "status": {"ref":"OrderStatuses","required":true},
            "paymentStatus": {"ref":"OrderPaymentStatuses","required":true},
            "paymentVariant": {"ref":"OrderPaymentVariant","required":true},
            "statusHistory": {"dataType":"array","array":{"dataType":"refObject","ref":"StatusHistory_OrderStatuses_"},"required":true},
            "paymentStatusHistory": {"dataType":"array","array":{"dataType":"refObject","ref":"StatusHistory_OrderPaymentStatuses_"},"required":true},
            "calculatedTotalCostMajor": {"dataType":"double","required":true},
            "deliveryCostMajor": {"dataType":"double","required":true},
            "receiver": {"dataType":"union","subSchemas":[{"ref":"OrderReceiver"},{"dataType":"enum","enums":[null]}]},
            "currency": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_OrdersDetailsForAdminResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"OrdersDetailsForAdminResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_OrdersDetailsForAdminResponseDto_-or-OrdersDetailsForAdminResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_OrdersDetailsForAdminResponseDto_"},{"dataType":"array","array":{"dataType":"refObject","ref":"OrdersDetailsForAdminResponseDto"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreatedOrderData": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "orderRef": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentInitializeResponse": {
        "dataType": "refObject",
        "properties": {
            "paymentProviderRedirectUrl": {"dataType":"string","required":true},
            "paymentReference": {"dataType":"string","required":true},
            "accessCode": {"dataType":"string","required":true},
            "redirectUrlAfterPayment": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentTransactionStatus": {
        "dataType": "refEnum",
        "enums": ["unpaid","paid","failed"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPayResponseDto": {
        "dataType": "refObject",
        "properties": {
            "orders": {"dataType":"array","array":{"dataType":"refObject","ref":"CreatedOrderData"},"required":true},
            "orderUuids": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "paymentProviderDetails": {"ref":"PaymentInitializeResponse"},
            "paymentTransactionStatus": {"ref":"PaymentTransactionStatus","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_OrderPayResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"OrderPayResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CartItemsForSeller": {
        "dataType": "refObject",
        "properties": {
            "productUuid": {"dataType":"string","required":true},
            "quantity": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderSellerGroup": {
        "dataType": "refObject",
        "properties": {
            "userUuid": {"dataType":"string","required":true},
            "orderReceiveType": {"ref":"OrderReceiveTypes","required":true},
            "pickupLocationUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "cartItems": {"dataType":"array","array":{"dataType":"refObject","ref":"CartItemsForSeller"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOrderByAdminRequestDto": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "productId": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "unitPrice": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "orderPaymentVariant": {"ref":"OrderPaymentVariant","required":true},
            "orderReceiveType": {"ref":"OrderReceiveTypes","required":true},
            "differentOrderReceiver": {"dataType":"union","subSchemas":[{"ref":"OrderReceiver"},{"dataType":"enum","enums":[null]}]},
            "deliveryAddressId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "pickupLocationId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "sellers": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"OrderSellerGroup"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WalletToWalletTransfer": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "adminUserId": {"dataType":"double","required":true},
            "senderUserId": {"dataType":"double","required":true},
            "receiverUserId": {"dataType":"double","required":true},
            "amountMajor": {"dataType":"double","required":true},
            "currency": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_WalletToWalletTransfer_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"WalletToWalletTransfer"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_WalletToWalletTransfer_-or-WalletToWalletTransfer-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_WalletToWalletTransfer_"},{"dataType":"array","array":{"dataType":"refObject","ref":"WalletToWalletTransfer"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IWalletTransferTransactionByAdmin": {
        "dataType": "refObject",
        "properties": {
            "senderUserId": {"dataType":"double","required":true},
            "receiverUserId": {"dataType":"double","required":true},
            "amountMajor": {"dataType":"double","required":true},
            "description": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CartItemJson": {
        "dataType": "refObject",
        "properties": {
            "productId": {"dataType":"double","required":true},
            "productUuid": {"dataType":"string","required":true},
            "productName": {"dataType":"string","required":true},
            "quantity": {"dataType":"double","required":true},
            "unitPrice": {"dataType":"double","required":true},
            "unitPriceForBuyer": {"dataType":"double","required":true},
            "unitPromoPriceForBuyer": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "promotionId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "images": {"dataType":"array","array":{"dataType":"refObject","ref":"SimpleImageJson"}},
            "productCategorySettings": {"ref":"CategorySettingsData"},
            "deliveryAddressState": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "quoteRequest": {"dataType":"nestedObjectLiteral","nestedProperties":{"calculatedTotalCostMajor":{"dataType":"double","required":true},"deliveryFee":{"dataType":"double","required":true},"unitPromoPriceForBuyer":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"unitPriceForBuyer":{"dataType":"double","required":true},"unitPrice":{"dataType":"double","required":true},"uuid":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderDetailsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "orderUuid": {"dataType":"string","required":true},
            "orderItems": {"dataType":"array","array":{"dataType":"refObject","ref":"CartItemJson"},"required":true},
            "referenceNumber": {"dataType":"string","required":true},
            "sellerPublicProfile": {"ref":"IPublicProfile","required":true},
            "buyerPublicProfile": {"ref":"IPublicProfile","required":true},
            "orderReceiveType": {"ref":"OrderReceiveTypes","required":true},
            "status": {"ref":"OrderStatuses","required":true},
            "paymentStatus": {"ref":"OrderPaymentStatuses","required":true},
            "paymentVariant": {"ref":"OrderPaymentVariant","required":true},
            "orderLocation": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"contactPhoneNumber":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"contactFullName":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"state":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"country":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"address":{"dataType":"string"},"name":{"dataType":"string"}}},{"dataType":"enum","enums":[null]}]},
            "statusHistory": {"dataType":"array","array":{"dataType":"refObject","ref":"StatusHistory_OrderStatuses_"},"required":true},
            "paymentStatusHistory": {"dataType":"array","array":{"dataType":"refObject","ref":"StatusHistory_OrderPaymentStatuses_"},"required":true},
            "procurementInvoiceUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "calculatedTotalCostMajor": {"dataType":"double","required":true},
            "deliveryCostMajor": {"dataType":"double","required":true},
            "currency": {"dataType":"string","required":true},
            "currencySymbol": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_OrderDetailsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"OrderDetailsResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Category_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"Category"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "uuid": {"dataType":"string","required":true},
            "accountId": {"dataType":"double","required":true},
            "createdByUserId": {"dataType":"double","required":true},
            "isDefault": {"dataType":"boolean","required":true},
            "name": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "totalValueMajor": {"dataType":"double","required":true},
            "totalQuantity": {"dataType":"double","required":true},
            "contactFullName": {"dataType":"string","required":true},
            "contactPhoneNumber": {"dataType":"string","required":true},
            "isSoftDeleted": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeliveryItemJson": {
        "dataType": "refObject",
        "properties": {
            "productUuid": {"dataType":"string","required":true},
            "productName": {"dataType":"string","required":true},
            "productId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "quantity": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouseToSiteDeliveryFeeStatuses": {
        "dataType": "refEnum",
        "enums": ["REQUESTED","DELIVERY_FEE_SET","DELIVERY_FEE_ACCEPTED","DELIVERY_FEE_REJECTED","DELIVERY_ITEMS_SHIPPED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHistory_WareHouseToSiteDeliveryFeeStatuses_": {
        "dataType": "refObject",
        "properties": {
            "status": {"ref":"WareHouseToSiteDeliveryFeeStatuses","required":true},
            "dateTimeInISO8601": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_DeliveryLocation.Exclude_keyofDeliveryLocation.OmitFields__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"uuid":{"dataType":"string","required":true},"wareHouseId":{"dataType":"double","required":true},"address":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"country":{"dataType":"string","required":true},"state":{"dataType":"string","required":true},"contactFullName":{"dataType":"string","required":true},"contactPhoneNumber":{"dataType":"string","required":true},"isDefault":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_DeliveryLocation.OmitFields_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_DeliveryLocation.Exclude_keyofDeliveryLocation.OmitFields__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouseToSiteDeliveryDtoForAdmin": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "wareHouseDetails": {"ref":"WareHouse"},
            "userId": {"dataType":"double","required":true},
            "deliveryItems": {"dataType":"array","array":{"dataType":"refObject","ref":"DeliveryItemJson"},"required":true},
            "deliveryRequestHistory": {"dataType":"array","array":{"dataType":"refObject","ref":"StatusHistory_WareHouseToSiteDeliveryFeeStatuses_"},"required":true},
            "status": {"ref":"WareHouseToSiteDeliveryFeeStatuses","required":true},
            "totalAmountMajor": {"dataType":"double","required":true},
            "deliveryFeeAmountMajor": {"dataType":"double","required":true},
            "deliverySiteDetails": {"ref":"Omit_DeliveryLocation.OmitFields_"},
            "createdAt": {"dataType":"datetime","required":true},
            "id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_WareHouseToSiteDeliveryDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"WareHouseToSiteDeliveryDtoForAdmin"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_WareHouseToSiteDeliveryDtoForAdmin_-or-WareHouseToSiteDeliveryDtoForAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_WareHouseToSiteDeliveryDtoForAdmin_"},{"dataType":"array","array":{"dataType":"refObject","ref":"WareHouseToSiteDeliveryDtoForAdmin"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_WareHouseToSiteDeliveryDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"WareHouseToSiteDeliveryDtoForAdmin"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestBankDetailsChangeDtoForAdmin": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "userId": {"dataType":"double","required":true},
            "accountNumber": {"dataType":"string","required":true},
            "bankCode": {"dataType":"string","required":true},
            "bankAccountName": {"dataType":"string","required":true},
            "bankName": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_RequestBankDetailsChangeDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"RequestBankDetailsChangeDtoForAdmin"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_RequestBankDetailsChangeDtoForAdmin_-or-RequestBankDetailsChangeDtoForAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_RequestBankDetailsChangeDtoForAdmin_"},{"dataType":"array","array":{"dataType":"refObject","ref":"RequestBankDetailsChangeDtoForAdmin"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvoiceItemJson": {
        "dataType": "refObject",
        "properties": {
            "productId": {"dataType":"double","required":true},
            "productUuid": {"dataType":"string"},
            "productName": {"dataType":"string","required":true},
            "quantity": {"dataType":"double","required":true},
            "isPaid": {"dataType":"boolean"},
            "unitPrice": {"dataType":"double"},
            "unitPriceForBuyer": {"dataType":"double","required":true},
            "unitPromoPriceForBuyer": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvoiceStatuses": {
        "dataType": "refEnum",
        "enums": ["SET","ACCEPTED","REQUEST_REVIEW","REJECTED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHistory_InvoiceStatuses_": {
        "dataType": "refObject",
        "properties": {
            "status": {"ref":"InvoiceStatuses","required":true},
            "dateTimeInISO8601": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProcurementInvoiceResponseDtoForAdmin": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "accountId": {"dataType":"double","required":true},
            "referenceNumber": {"dataType":"string","required":true},
            "calculatedTotalCostMajor": {"dataType":"double","required":true},
            "invoiceItem": {"dataType":"array","array":{"dataType":"refObject","ref":"InvoiceItemJson"},"required":true},
            "status": {"ref":"InvoiceStatuses","required":true},
            "statusHistory": {"dataType":"array","array":{"dataType":"refObject","ref":"StatusHistory_InvoiceStatuses_"},"required":true},
            "orderCreated": {"dataType":"boolean","required":true},
            "orderCreatedAt": {"dataType":"datetime","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProcurementInvoiceResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "accountId": {"dataType":"double","required":true},
            "referenceNumber": {"dataType":"string","required":true},
            "calculatedTotalCostMajor": {"dataType":"double","required":true},
            "invoiceItem": {"dataType":"array","array":{"dataType":"refObject","ref":"InvoiceItemJson"},"required":true},
            "status": {"ref":"InvoiceStatuses","required":true},
            "statusHistory": {"dataType":"array","array":{"dataType":"refObject","ref":"StatusHistory_InvoiceStatuses_"},"required":true},
            "orderCreated": {"dataType":"boolean","required":true},
            "orderCreatedAt": {"dataType":"datetime","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProcurementDtoForAdmin": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "accountId": {"dataType":"double","required":true},
            "invoice": {"dataType":"union","subSchemas":[{"ref":"ProcurementInvoiceResponseDtoForAdmin"},{"dataType":"enum","enums":[null]}]},
            "upload": {"ref":"SimpleImageJson","required":true},
            "isProcessed": {"dataType":"boolean","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProcurementDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"ProcurementDtoForAdmin"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProcurementDtoForAdmin_-or-ProcurementDtoForAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_ProcurementDtoForAdmin_"},{"dataType":"array","array":{"dataType":"refObject","ref":"ProcurementDtoForAdmin"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProcurementDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"ProcurementDtoForAdmin"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddItemToInvoiceRequestDto": {
        "dataType": "refObject",
        "properties": {
            "invoiceItem": {"ref":"InvoiceItemJson","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProcurementInvoiceResponseDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"ProcurementInvoiceResponseDtoForAdmin"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProcurementInvoiceResponseDtoForAdmin_-or-ProcurementInvoiceResponseDtoForAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_ProcurementInvoiceResponseDtoForAdmin_"},{"dataType":"array","array":{"dataType":"refObject","ref":"ProcurementInvoiceResponseDtoForAdmin"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProcurementInvoiceResponseDtoForAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"ProcurementInvoiceResponseDtoForAdmin"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_PickupLocation.Exclude_keyofPickupLocation.OmitFields__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"uuid":{"dataType":"string","required":true},"address":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"country":{"dataType":"string","required":true},"state":{"dataType":"string","required":true},"contactFullName":{"dataType":"string","required":true},"contactPhoneNumber":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_PickupLocation.OmitFields_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_PickupLocation.Exclude_keyofPickupLocation.OmitFields__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequestSellerResponse": {
        "dataType": "refObject",
        "properties": {
            "unitPrice": {"dataType":"double","required":true},
            "unitPriceForBuyer": {"dataType":"double","required":true},
            "unitPromoPriceForBuyer": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "promotionId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "deliveryFee": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "minimumQuantity": {"dataType":"double","required":true},
            "maximumQuantity": {"dataType":"double","required":true},
            "pickupAddress": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "productUuid": {"dataType":"string","required":true},
            "productName": {"dataType":"string","required":true},
            "productDescription": {"dataType":"string","required":true},
            "sellerUserId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "sellerPublicProfile": {"ref":"IPublicProfile","required":true},
            "oldSellerPublicProfile": {"dataType":"union","subSchemas":[{"ref":"IPublicProfile"},{"dataType":"enum","enums":[null]}]},
            "sellerPickupLocations": {"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_PickupLocation.OmitFields_"}},
            "price": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "unitPriceForBuyer": {"dataType":"double","required":true},
            "unitPromoPriceForBuyer": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "minimumQuantity": {"dataType":"double","required":true},
            "maximumQuantity": {"dataType":"double","required":true},
            "unitOfMeasurement": {"dataType":"string","required":true},
            "currency": {"dataType":"string","required":true},
            "currencySymbol": {"dataType":"string","required":true},
            "locationState": {"dataType":"string","required":true},
            "totalRatingsValue": {"dataType":"double","required":true},
            "totalNumberOfRatings": {"dataType":"double","required":true},
            "isOnCart": {"dataType":"boolean"},
            "quoteRequest": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"sellerResponse":{"ref":"QuoteRequestSellerResponse","required":true},"quantity":{"dataType":"double","required":true},"uuid":{"dataType":"string","required":true}}},{"dataType":"enum","enums":[null]}]},
            "brand": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}},"required":true},
            "category": {"dataType":"nestedObjectLiteral","nestedProperties":{"settings":{"ref":"CategorySettingsData","required":true},"name":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}},"required":true},
            "images": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"mimetype":{"dataType":"string","required":true},"url":{"dataType":"string","required":true}}},"required":true},
            "hasVariants": {"dataType":"boolean","required":true},
            "isVariant": {"dataType":"boolean","required":true},
            "tags": {"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"enum","enums":[null]}]},
            "variantsProducts": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"ProductsResponseDto"}},{"dataType":"boolean"}]},
            "isActive": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductsResponseDtoAdmin": {
        "dataType": "refObject",
        "properties": {
            "productUuid": {"dataType":"string","required":true},
            "productName": {"dataType":"string","required":true},
            "productDescription": {"dataType":"string","required":true},
            "sellerUserId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "sellerPublicProfile": {"ref":"IPublicProfile","required":true},
            "oldSellerPublicProfile": {"dataType":"union","subSchemas":[{"ref":"IPublicProfile"},{"dataType":"enum","enums":[null]}]},
            "sellerPickupLocations": {"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_PickupLocation.OmitFields_"}},
            "price": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "unitPriceForBuyer": {"dataType":"double","required":true},
            "unitPromoPriceForBuyer": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "minimumQuantity": {"dataType":"double","required":true},
            "maximumQuantity": {"dataType":"double","required":true},
            "unitOfMeasurement": {"dataType":"string","required":true},
            "currency": {"dataType":"string","required":true},
            "currencySymbol": {"dataType":"string","required":true},
            "locationState": {"dataType":"string","required":true},
            "totalRatingsValue": {"dataType":"double","required":true},
            "totalNumberOfRatings": {"dataType":"double","required":true},
            "isOnCart": {"dataType":"boolean"},
            "quoteRequest": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"sellerResponse":{"ref":"QuoteRequestSellerResponse","required":true},"quantity":{"dataType":"double","required":true},"uuid":{"dataType":"string","required":true}}},{"dataType":"enum","enums":[null]}]},
            "brand": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}},"required":true},
            "category": {"dataType":"nestedObjectLiteral","nestedProperties":{"settings":{"ref":"CategorySettingsData","required":true},"name":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}},"required":true},
            "images": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"mimetype":{"dataType":"string","required":true},"url":{"dataType":"string","required":true}}},"required":true},
            "hasVariants": {"dataType":"boolean","required":true},
            "isVariant": {"dataType":"boolean","required":true},
            "tags": {"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"enum","enums":[null]}]},
            "variantsProducts": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"ProductsResponseDto"}},{"dataType":"boolean"}]},
            "isActive": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime","required":true},
            "id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProductsResponseDtoAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"ProductsResponseDtoAdmin"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProductsResponseDtoAdmin_-or-ProductsResponseDtoAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_ProductsResponseDtoAdmin_"},{"dataType":"array","array":{"dataType":"refObject","ref":"ProductsResponseDtoAdmin"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewProductRequestDtoByAdmin": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "categoryId": {"dataType":"string","required":true},
            "brandId": {"dataType":"string","required":true},
            "price": {"dataType":"double"},
            "locationState": {"dataType":"string","required":true},
            "tags": {"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"enum","enums":[null]}]},
            "minQty": {"dataType":"double","required":true},
            "maxQty": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProductsResponseDtoAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"ProductsResponseDtoAdmin"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequestStatuses": {
        "dataType": "refEnum",
        "enums": ["PENDING","PROCESSED","CANCELLED_BY_BUYER","ENDED_BY_BUYER","ORDER_CREATED","DECLINED_BY_SELLER","DECLINED_BY_ADMIN","EXPIRED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequestResponseDtoAdmin": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "product": {"dataType":"nestedObjectLiteral","nestedProperties":{"pickupAddressDetails":{"dataType":"union","subSchemas":[{"ref":"Omit_PickupLocation.OmitFields_"},{"dataType":"enum","enums":[null]}]},"unitOfMeasurement":{"dataType":"string","required":true},"description":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}},"required":true},
            "quantity": {"dataType":"double","required":true},
            "buyerUserPublicProfile": {"ref":"IPublicProfile","required":true},
            "sellerUserPublicProfile": {"ref":"IPublicProfile","required":true},
            "notes": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "orderReceiveType": {"ref":"OrderReceiveTypes","required":true},
            "deliveryAddress": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "deliverAddressUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "sellerResponse": {"dataType":"union","subSchemas":[{"ref":"QuoteRequestSellerResponse"},{"dataType":"enum","enums":[null]}]},
            "calculatedTotalCostMajor": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "status": {"ref":"QuoteRequestStatuses","required":true},
            "dateCreatedIso8601": {"dataType":"datetime","required":true},
            "sellerPickupLocation": {"dataType":"nestedObjectLiteral","nestedProperties":{"uuid":{"dataType":"string","required":true},"address":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},
            "id": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "referenceNumber": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_QuoteRequestResponseDtoAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"QuoteRequestResponseDtoAdmin"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_QuoteRequestResponseDtoAdmin_-or-QuoteRequestResponseDtoAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_QuoteRequestResponseDtoAdmin_"},{"dataType":"array","array":{"dataType":"refObject","ref":"QuoteRequestResponseDtoAdmin"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_QuoteRequestResponseDtoAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"QuoteRequestResponseDtoAdmin"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MoveSellerProductToOmaDto": {
        "dataType": "refObject",
        "properties": {
            "sellerUuid": {"dataType":"string","required":true},
            "newSellerUuid": {"dataType":"string","required":true},
            "categoryUuid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProductsResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ProductsResponseDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVirtualDedicatedAccount": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "bankId": {"dataType":"string","required":true},
            "bankName": {"dataType":"string","required":true},
            "bankAccountNumber": {"dataType":"string","required":true},
            "bankAccountName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IVirtualDedicatedAccount_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IVirtualDedicatedAccount"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IVirtualDedicatedAccount-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IVirtualDedicatedAccount"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAuditLogs": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "method": {"dataType":"string","required":true},
            "path": {"dataType":"string","required":true},
            "payload": {"dataType":"any","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IAuditLogs-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IAuditLogs"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PriceMatrixTransactionType": {
        "dataType": "refEnum",
        "enums": ["CASH_ON_DELIVERY","C_STORES"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PriceMatriceStatuses": {
        "dataType": "refEnum",
        "enums": ["CREATED","PRICE_SUBMITTED","APPROVED","DELIVERED","CONFIRMED_DELIVERY","SELLER_PAID","DECLINED","DECLINED_BY_ADMIN"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHistory_PriceMatriceStatuses_": {
        "dataType": "refObject",
        "properties": {
            "status": {"ref":"PriceMatriceStatuses","required":true},
            "dateTimeInISO8601": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PriceMatricesResponseByAdmin": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "uuid": {"dataType":"string","required":true},
            "qouteRequestRef": {"dataType":"string","required":true},
            "qouteRequestId": {"dataType":"double","required":true},
            "buyerUserPublicProfile": {"ref":"IPublicProfile","required":true},
            "buyerUserId": {"dataType":"double","required":true},
            "sellerUserPublicProfile": {"dataType":"union","subSchemas":[{"ref":"IPublicProfile"},{"dataType":"enum","enums":[null]}],"required":true},
            "sellerUserId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "quantity": {"dataType":"double","required":true},
            "transactionType": {"dataType":"union","subSchemas":[{"ref":"PriceMatrixTransactionType"},{"dataType":"enum","enums":[null]}],"required":true},
            "product": {"dataType":"nestedObjectLiteral","nestedProperties":{"pickupAddressDetails":{"dataType":"union","subSchemas":[{"ref":"Omit_PickupLocation.OmitFields_"},{"dataType":"enum","enums":[null]}]},"unitOfMeasurement":{"dataType":"string","required":true},"description":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}},"required":true},
            "deliveryDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "deliveryAddress": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "productSellingPriceMajor": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "productCostPriceMajor": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "totalProductSellingPriceMajor": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "productMarginMajor": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "totlaMarginMajor": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "statusHistory": {"dataType":"array","array":{"dataType":"refObject","ref":"StatusHistory_PriceMatriceStatuses_"},"required":true},
            "status": {"ref":"PriceMatriceStatuses","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_PriceMatricesResponseByAdmin_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"PriceMatricesResponseByAdmin"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_PriceMatricesResponseByAdmin_-or-PriceMatricesResponseByAdmin-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_PriceMatricesResponseByAdmin_"},{"dataType":"array","array":{"dataType":"refObject","ref":"PriceMatricesResponseByAdmin"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_PriceMatricesResponseByAdmin_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"PriceMatricesResponseByAdmin"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SubmitPriceMatricDto": {
        "dataType": "refObject",
        "properties": {
            "sellerUserId": {"dataType":"double","required":true},
            "productSellingPriceMajor": {"dataType":"double","required":true},
            "productCostPriceMajor": {"dataType":"double","required":true},
            "deliveryDate": {"dataType":"datetime","required":true},
            "transactionType": {"ref":"PriceMatrixTransactionType","required":true},
            "qouteRequestRef": {"dataType":"double","required":true},
            "deliveryFee": {"dataType":"double"},
            "quantity": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QouteRequestAdminCreateRequestDto": {
        "dataType": "refObject",
        "properties": {
            "buyerUserId": {"dataType":"double","required":true},
            "sellerUserId": {"dataType":"double","required":true},
            "productId": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "productSellingPriceMajor": {"dataType":"double","required":true},
            "productCostPriceMajor": {"dataType":"double","required":true},
            "transactionType": {"ref":"PriceMatrixTransactionType","required":true},
            "deliveryDate": {"dataType":"datetime","required":true},
            "orderReceiveType": {"ref":"OrderReceiveTypes","required":true},
            "deliveryAddress": {"dataType":"string","required":true},
            "deliveryFee": {"dataType":"double"},
            "notes": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UploadFileCategory": {
        "dataType": "refEnum",
        "enums": ["CATEGORY_PHOTO","CATEGORY_BANNER","PRODUCT_PHOTO","BRAND_PHOTO","USER_PHOTO","STORE_FRONT_BANNER","PROCURMENT_LIST","PRODUCT_LEASE_REQUEST_ID_CARD","PRODUCT_LEASE_REQUEST_CAC_CERTIFICATE","PRODUCT_LEASE_BANK_STATEMENT","PRODUCT_LEASE_UTILITY_BILL","PRODUCT_LEASE_DISTRIBUTORSHIP_APPOINTMENT_LETTER","SELLER_CAC_DOCUMENT","SELLER_ID_CARD","SELLER_COMPANY_LOGO","BULK_PRODUCTS_FILE","USER_BACK_DROP_PHOTO","PROJECT_IMAGES","BANK_STATEMENT","GOVERNMENT_APPROVED_ID","RECENT_UTILITY_BILL","CAC_CERTIFICATE"],
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
            "keyFromCloudProvider": {"dataType":"string","required":true},
            "url": {"dataType":"string","required":true},
            "mimetype": {"dataType":"string","required":true},
            "fileCloudProvider": {"ref":"FileCloudProviders","required":true},
            "documentType": {"ref":"UploadFileCategory","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeveloperAccountVerificationResponseAdminDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "developerPublicProfile": {"ref":"IPublicProfile","required":true},
            "accountType": {"ref":"Roles","required":true},
            "bankStatement": {"ref":"MortgageAccountVerificationUpload","required":true},
            "bankStatementApproved": {"dataType":"boolean","required":true},
            "governmentApprovedId": {"ref":"MortgageAccountVerificationUpload","required":true},
            "governmentApprovedIdApproved": {"dataType":"boolean","required":true},
            "recentUtilityBill": {"ref":"MortgageAccountVerificationUpload","required":true},
            "recentUtilityBillApproved": {"dataType":"boolean","required":true},
            "cacCertificate": {"ref":"MortgageAccountVerificationUpload","required":true},
            "cacCertificateApproved": {"dataType":"boolean","required":true},
            "isApproved": {"dataType":"boolean","required":true},
            "accountConfirmed": {"dataType":"boolean","required":true},
            "id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_DeveloperAccountVerificationResponseAdminDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"DeveloperAccountVerificationResponseAdminDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_DeveloperAccountVerificationResponseAdminDto_-or-DeveloperAccountVerificationResponseAdminDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"IPaginatedList_DeveloperAccountVerificationResponseAdminDto_"},{"dataType":"array","array":{"dataType":"refObject","ref":"DeveloperAccountVerificationResponseAdminDto"}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MortgageAccountVerificationFiles": {
        "dataType": "refEnum",
        "enums": ["BANK_STATEMENT","GOVERNMENT_APPROVED_ID","RECENT_UTILITY_BILL","CAC_CERTIFICATE"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApprovedMortgageAccountDocumentDto": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "fileKey": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MortgageCardDto": {
        "dataType": "refObject",
        "properties": {
            "pan": {"dataType":"string","required":true},
            "isUsed": {"dataType":"boolean","required":true},
            "isSoftDeleted": {"dataType":"boolean","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_MortgageCardDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"MortgageCardDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaystackBank": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "code": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
            "country": {"dataType":"string","required":true},
            "currency": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaystackBank-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IPaystackBank"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse__account_name-string__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"account_name":{"dataType":"string","required":true}}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewBankAccountRequestDto": {
        "dataType": "refObject",
        "properties": {
            "accountNumber": {"dataType":"string","required":true},
            "bankCode": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewCartItemRequestDto": {
        "dataType": "refObject",
        "properties": {
            "productUuid": {"dataType":"string","required":true},
            "quantity": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CartItem": {
        "dataType": "refObject",
        "properties": {
            "productUuid": {"dataType":"string","required":true},
            "productName": {"dataType":"string","required":true},
            "productDescription": {"dataType":"string","required":true},
            "sellerUserId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "sellerPublicProfile": {"ref":"IPublicProfile","required":true},
            "oldSellerPublicProfile": {"dataType":"union","subSchemas":[{"ref":"IPublicProfile"},{"dataType":"enum","enums":[null]}]},
            "sellerPickupLocations": {"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_PickupLocation.OmitFields_"}},
            "price": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "unitPriceForBuyer": {"dataType":"double","required":true},
            "unitPromoPriceForBuyer": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "minimumQuantity": {"dataType":"double","required":true},
            "maximumQuantity": {"dataType":"double","required":true},
            "unitOfMeasurement": {"dataType":"string","required":true},
            "currency": {"dataType":"string","required":true},
            "currencySymbol": {"dataType":"string","required":true},
            "locationState": {"dataType":"string","required":true},
            "totalRatingsValue": {"dataType":"double","required":true},
            "totalNumberOfRatings": {"dataType":"double","required":true},
            "isOnCart": {"dataType":"boolean"},
            "quoteRequest": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"sellerResponse":{"ref":"QuoteRequestSellerResponse","required":true},"quantity":{"dataType":"double","required":true},"uuid":{"dataType":"string","required":true}}},{"dataType":"enum","enums":[null]}]},
            "brand": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}},"required":true},
            "category": {"dataType":"nestedObjectLiteral","nestedProperties":{"settings":{"ref":"CategorySettingsData","required":true},"name":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}},"required":true},
            "images": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"mimetype":{"dataType":"string","required":true},"url":{"dataType":"string","required":true}}},"required":true},
            "hasVariants": {"dataType":"boolean","required":true},
            "isVariant": {"dataType":"boolean","required":true},
            "tags": {"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"enum","enums":[null]}]},
            "variantsProducts": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"ProductsResponseDto"}},{"dataType":"boolean"}]},
            "isActive": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime","required":true},
            "quantity": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CartDetailsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refObject","ref":"CartItem"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_CartDetailsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"CartDetailsResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_any_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"any"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_any__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_any_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CooperateUserRole": {
        "dataType": "refEnum",
        "enums": ["ACCOUNT_LEVEL","WARE_HOUSE_LEVEL"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddUserRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "lastName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "phoneNumber": {"dataType":"string","required":true},
            "emailAddress": {"dataType":"string","required":true},
            "wareHouseUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "role": {"ref":"CooperateUserRole","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeliveryWalletTranferDto": {
        "dataType": "refObject",
        "properties": {
            "amountMajor": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CouponValueType": {
        "dataType": "refEnum",
        "enums": ["AMOUNT_DISCOUNT","PERCENTAGE_DISCOUNT"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewCouponRequestDto": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "productUuid": {"dataType":"string","required":true},
            "expiryDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "couponValueType": {"ref":"CouponValueType","required":true},
            "couponValue": {"dataType":"double","required":true},
            "orderMinAmountMajor": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CouponApplyType": {
        "dataType": "refEnum",
        "enums": ["PRODUCT_LEVEL","ORDER_LEVEL"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CouponResponseDto": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "productUuid": {"dataType":"string"},
            "product": {"ref":"ProductsResponseDto"},
            "expiryDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "isActive": {"dataType":"boolean","required":true},
            "valueType": {"ref":"CouponValueType","required":true},
            "applyType": {"ref":"CouponApplyType","required":true},
            "value": {"dataType":"double","required":true},
            "orderMinAmountMajor": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_CouponResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"CouponResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_CouponResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_CouponResponseDto_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewUpdateCouponRequestDto": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "expiryDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "orderMinimumAmountMajor": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_DeliveryLocation.OmitFields_-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_DeliveryLocation.OmitFields_"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_DeliveryLocation.OmitFields__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"Omit_DeliveryLocation.OmitFields_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeliveryLocationRequestDto": {
        "dataType": "refObject",
        "properties": {
            "contactFullName": {"dataType":"string","required":true},
            "contactPhoneNumber": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "country": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "state": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUpdateDeliveryLocationDto": {
        "dataType": "refObject",
        "properties": {
            "contactFullName": {"dataType":"string"},
            "contactPhoneNumber": {"dataType":"string"},
            "address": {"dataType":"string"},
            "country": {"dataType":"string"},
            "state": {"dataType":"string"},
            "name": {"dataType":"string"},
            "isDefault": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeveloperAccountActivationType": {
        "dataType": "refEnum",
        "enums": ["inactive","pending","active"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_DeveloperAccountActivationType_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"DeveloperAccountActivationType"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectPaymentPlan": {
        "dataType": "refEnum",
        "enums": ["DAILY","WEEKLY","MONTHLY","YEARLY"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectStatuses": {
        "dataType": "refEnum",
        "enums": ["PENDING","DECLINED","ACTIVE","CLOSED","ALL"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectSubscriptionResponseDto": {
        "dataType": "refObject",
        "properties": {
            "projectSubscriptionUuid": {"dataType":"string","required":true},
            "projectUuid": {"dataType":"string","required":true},
            "project": {"ref":"ProjectsResponseDto","required":true},
            "developerPublicProfile": {"ref":"IPublicProfile","required":true},
            "investorPublicProfile": {"ref":"IPublicProfile","required":true},
            "susbscriptionTransactions": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"ProcessProjectSubscriptionTransactionResponseDto"}},{"dataType":"enum","enums":[null]}]},
            "numberOfSlots": {"dataType":"double","required":true},
            "totalAmountMinor": {"dataType":"double","required":true},
            "initialAmountMinor": {"dataType":"double","required":true},
            "amountRemainingMinor": {"dataType":"double","required":true},
            "amountDueMinor": {"dataType":"double","required":true},
            "amountPaidMinor": {"dataType":"double","required":true},
            "amountPerPaymentPlanDurationMinor": {"dataType":"double","required":true},
            "durationPerPaymentPlan": {"dataType":"string","required":true},
            "duration": {"dataType":"double","required":true},
            "durationLeft": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[0]}]},
            "durationCovered": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[0]}]},
            "nextPaymentDueDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "status": {"ref":"ProjectStatuses","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectStage_string_": {
        "dataType": "refObject",
        "properties": {
            "stage": {"dataType":"string","required":true},
            "dateTimeInISO8601": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "projectUuid": {"dataType":"string","required":true},
            "developerPublicProfile": {"ref":"IPublicProfile","required":true},
            "name": {"dataType":"string","required":true},
            "details": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
            "costPerSlot": {"dataType":"double","required":true},
            "initialInvestmentPercentage": {"dataType":"double","required":true},
            "duration": {"dataType":"double","required":true},
            "paymentPlan": {"ref":"ProjectPaymentPlan","required":true},
            "numberOfSlots": {"dataType":"double","required":true},
            "status": {"ref":"ProjectStatuses","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "startDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "minimumNumberOfSlot": {"dataType":"double"},
            "address": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "locationOnMap": {"dataType":"string"},
            "numberOfSlotSold": {"dataType":"double"},
            "images": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"mimetype":{"dataType":"string","required":true},"url":{"dataType":"string","required":true}}}},{"dataType":"enum","enums":[null]}]},
            "projectSubscriptions": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"ProjectSubscriptionResponseDto"}},{"dataType":"enum","enums":[null]}]},
            "stages": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"ProjectStage_string_"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProcessProjectSubscriptionTransactionResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "investorUserId": {"dataType":"double","required":true},
            "developerUserId": {"dataType":"double","required":true},
            "projectUuid": {"dataType":"string","required":true},
            "projectSubscriptionUuid": {"dataType":"string","required":true},
            "amountBeforeMinor": {"dataType":"double","required":true},
            "amountPaidMinor": {"dataType":"double","required":true},
            "amountAfterMinor": {"dataType":"double","required":true},
            "amountRemainingMinor": {"dataType":"double","required":true},
            "financialTransactionId": {"dataType":"double","required":true},
            "description": {"dataType":"string","required":true},
            "paymentPlanDurationNumber": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProjectSubscriptionResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"ProjectSubscriptionResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddInvestorToProjectRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "emailAddress": {"dataType":"string","required":true},
            "numberOfSlots": {"dataType":"double","required":true},
            "projectUuid": {"dataType":"string","required":true},
            "amountPaid": {"dataType":"double","required":true},
            "durationLeft": {"dataType":"double","required":true},
            "susbscriptionDate": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProjectSubscriptionResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"ProjectSubscriptionResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProjectSubscriptionResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_ProjectSubscriptionResponseDto_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectTransactionResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "investorUserId": {"dataType":"double","required":true},
            "developerUserId": {"dataType":"double","required":true},
            "projectUuid": {"dataType":"string","required":true},
            "projectSubscriptionUuid": {"dataType":"string","required":true},
            "amountBeforeMinor": {"dataType":"double","required":true},
            "amountPaidMinor": {"dataType":"double","required":true},
            "amountAfterMinor": {"dataType":"double","required":true},
            "amountRemainingMinor": {"dataType":"double","required":true},
            "financialTransactionId": {"dataType":"double","required":true},
            "description": {"dataType":"string","required":true},
            "project": {"ref":"ProjectsResponseDto","required":true},
            "investorPublicProfile": {"ref":"IPublicProfile","required":true},
            "projectSubscriptions": {"ref":"ProjectSubscriptionResponseDto","required":true},
            "paymentPlanDurationNumber": {"dataType":"double","required":true},
            "nextPaymentDate": {"dataType":"string"},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProjectTransactionResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"ProjectTransactionResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProjectTransactionResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_ProjectTransactionResponseDto_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProjectTransactionResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ProjectTransactionResponseDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProjectTransactionResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"ProjectTransactionResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecurrentPaymentRequestDto": {
        "dataType": "refObject",
        "properties": {
            "totalCost": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectSubscriptionPaymentVariant": {
        "dataType": "refEnum",
        "enums": ["WALLET","CARD","MONO"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProcurementInvoiceResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"ProcurementInvoiceResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProcurementInvoiceResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_ProcurementInvoiceResponseDto_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SupportedCountriesResponseDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "iso2": {"dataType":"string","required":true},
            "phoneCode": {"dataType":"string","required":true},
            "currency": {"dataType":"string","required":true},
            "currencySymbol": {"dataType":"string","required":true},
            "image": {"ref":"SimpleImageJson","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_SupportedCountriesResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"SupportedCountriesResponseDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_string-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"string"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MortgageCardBalanceDto": {
        "dataType": "refObject",
        "properties": {
            "pan": {"dataType":"string","required":true},
            "currency": {"dataType":"string","required":true},
            "currencySymbol": {"dataType":"string","required":true},
            "amountMajor": {"dataType":"double","required":true},
            "isUsed": {"dataType":"boolean","required":true},
            "isActive": {"dataType":"boolean","required":true},
            "isSoftDeleted": {"dataType":"boolean","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_MortgageCardBalanceDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"MortgageCardBalanceDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_MortgageCardDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"MortgageCardDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ActivateMortgageCardRequestDto": {
        "dataType": "refObject",
        "properties": {
            "pan": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NotificationMessageTypes": {
        "dataType": "refEnum",
        "enums": ["QUOTE_REQUEST_SENT_TO_SELLER","QUOTE_REQUEST_SELLER_RESPONSE","QUOTE_REQUEST_SELLER_DECLINE","QUOTE_REQUEST_SELLER_EXPIRE","ORDER_CREATED","ORDER_CANCELLED_BY_BUYER","ORDER_CANCELLED_BY_SELLER","MAIN_WALLET_FUND","ORDER_DISPUTE_ACKNOWLEDGEMENT","ORDER_PICKED_UP","ORDER_DELIVERED","NEW_ACCOUNT_LEVEL_USER_ADDED","NEW_WAREHOUSE_LEVEL_USER_ADDED","PROCURMENT_LIST_UPLOADED","ORDER_PAYMENT_IN_ESCROW","ORDER_PAYMENT_IN_ESCROW_FOR_UNREGISTER_USER","ORDER_AVAILABLE_FOR_PICKUP","WAREHOUSE_TO_SITE_DELIVERY_FEE_SET","ORDER_AVAILABLE_FOR_DELIVERY","CONFIRMED_PICKUP","CONFIRMED_DEVELIERY","QOUTE_REQUEST_RAISED","QOUTE_REQUEST_RESPONSE","ESCROW_PAYMENT_TO_SELLER","ESCROW_PAYMENT_TO_BUYER","ORDER_REFUND_TO_BUYER","SELLER_INVITE_TO_BUYER","BUYER_ACCEPT_SELLER_INVITE","ENABLE_PLP","POD_ORDER_CONFIRMAION","POD_ORDER_NOTIFICATION","POD_ORDER_PAYMENT_NOTIFICATION","ORDER_PICKUP_OR_DELIVERY_STATUS_UPDATE","POD_ORDER_PAYMENT_DEFAULT","ESTATE_PROJECT_APPROVAL_REQUEST","ESTATE_PROJECT_APPROVED","ESTATE_PROJECT_DECLINED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NotificationMetadata": {
        "dataType": "refObject",
        "properties": {
            "orderUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "projectUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "userId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "cooperateUserRole": {"ref":"CooperateUserRole"},
            "newStatusUpdate": {"dataType":"union","subSchemas":[{"ref":"OrderStatuses"},{"dataType":"enum","enums":[null]}]},
            "dateTimeInISO8601": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "quoteRequestUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "inviteLink": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "wareHouseToSiteRequestUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INotificationMessageResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "type": {"ref":"NotificationMessageTypes","required":true},
            "metadata": {"ref":"NotificationMetadata"},
            "title": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "isRead": {"dataType":"boolean","required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "readAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_INotificationMessageResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"INotificationMessageResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_INotificationMessageResponseDto_-and-_totalUnread-number__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"intersection","subSchemas":[{"ref":"IPaginatedList_INotificationMessageResponseDto_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"totalUnread":{"dataType":"double","required":true}}}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse__verificationCode%3F%3Astring-or-null__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"verificationCode":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewUserRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "countryLongName": {"dataType":"string","required":true},
            "findUsOption": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "emailAddress": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "isSeller": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
            "isCooperate": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
            "role": {"dataType":"union","subSchemas":[{"ref":"Roles"},{"dataType":"enum","enums":[null]}]},
            "defaultSellerUniqueCode": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewCooperateUserSignupDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "countryLongName": {"dataType":"string","required":true},
            "findUsOption": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "emailAddress": {"dataType":"string","required":true},
            "businessName": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "isSeller": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
            "isCooperate": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
            "role": {"dataType":"union","subSchemas":[{"ref":"Roles"},{"dataType":"enum","enums":[null]}]},
            "defaultSellerUniqueCode": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewMortageUserSignupDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "countryLongName": {"dataType":"string","required":true},
            "findUsOption": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "emailAddress": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "companyName": {"dataType":"string","required":true},
            "cacNumber": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "role": {"ref":"Roles","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewMortageInvestorSignup": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "countryLongName": {"dataType":"string","required":true},
            "emailAddress": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "role": {"ref":"Roles","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPhoneVerification": {
        "dataType": "refObject",
        "properties": {
            "verificationCode": {"dataType":"string"},
            "phoneNumber": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BusinessInfoRequestDto": {
        "dataType": "refObject",
        "properties": {
            "businessName": {"dataType":"string","required":true},
            "businessAddress": {"dataType":"string","required":true},
            "cacNumber": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccessRequestDto": {
        "dataType": "refObject",
        "properties": {
            "isSeller": {"dataType":"boolean","required":true},
            "businessName": {"dataType":"string","required":true},
            "businessLocationCountry": {"dataType":"string","required":true},
            "businessLocationState": {"dataType":"string","required":true},
            "applicantName": {"dataType":"string","required":true},
            "applicantRole": {"dataType":"string","required":true},
            "applicantEmail": {"dataType":"string","required":true},
            "applicantPhone": {"dataType":"string","required":true},
            "weeklyTurnOver": {"dataType":"string","required":true},
            "enquiries": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_CartItemJson-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"CartItemJson"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewDeliveryAddress": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "contactFullName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "contactPhoneNumber": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewOrderCreateRequestDto": {
        "dataType": "refObject",
        "properties": {
            "orderReceiveType": {"ref":"OrderReceiveTypes","required":true},
            "newDeliveryAddress": {"dataType":"union","subSchemas":[{"ref":"NewDeliveryAddress"},{"dataType":"enum","enums":[null]}]},
            "deliveryAddressUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "locationUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "differentOrderReceiver": {"dataType":"union","subSchemas":[{"ref":"OrderReceiver"},{"dataType":"enum","enums":[null]}]},
            "wareHouseUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPrepareCartItem": {
        "dataType": "refObject",
        "properties": {
            "sellerProfile": {"ref":"IPublicProfile","required":true},
            "cartItems": {"dataType":"array","array":{"dataType":"refObject","ref":"CartItem"},"required":true},
            "sellerPickupLocations": {"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_PickupLocation.OmitFields_"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_OrderPrepareCartItem-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderPrepareCartItem"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeliveryDetails": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "contactFullName": {"dataType":"string","required":true},
            "contactPhoneNumber": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderCreateWithSellerGroupingRequestDto": {
        "dataType": "refObject",
        "properties": {
            "sellers": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderSellerGroup"},"required":true},
            "differentOrderReceiver": {"dataType":"union","subSchemas":[{"ref":"OrderReceiver"},{"dataType":"enum","enums":[null]}]},
            "newDeliveryAddress": {"dataType":"union","subSchemas":[{"ref":"DeliveryDetails"},{"dataType":"enum","enums":[null]}]},
            "deliveryAddressUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "wareHouseUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderReviewRequestDto": {
        "dataType": "refObject",
        "properties": {
            "reviewNote": {"dataType":"string","required":true},
            "rating": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DisputTypes": {
        "dataType": "refEnum",
        "enums": ["Product was damaged","Supplier came later than planned","Supplier did not deliver"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderDisputeRequestDto": {
        "dataType": "refObject",
        "properties": {
            "disputeType": {"ref":"DisputTypes","required":true},
            "disputeText": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_OrderDetailsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderDetailsResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_OrderDetailsResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_OrderDetailsResponseDto_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Persona": {
        "dataType": "refEnum",
        "enums": ["BUYER","SELLER"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderStatusesDto": {
        "dataType": "refEnum",
        "enums": ["ALL","CREATED","IN_PROGRESS","AVAILABLE_FOR_PICKUP","AVAILABLE_FOR_DELIVERY","RECEIVED","COMPLETED","CONFIRMED","CONFIRMED_BY_SYSTEM","CANCELLED_BY_BUYER","CANCELLED_BY_SELLER","CANCELLED_BY_ADMIN","ENDED_WITH_DISPUTES","PAYMENT_DEFAULT"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPaymentStatusesDto": {
        "dataType": "refEnum",
        "enums": ["ALL","BUYER_PAYMENT_PENDING","BUYER_PAYMENT_IN_ESCROW","BUYER_PAYMENT_REFUND","ESCROW_FUNDS_MOVED_TO_SELLER"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPaymentVariantDto": {
        "dataType": "refEnum",
        "enums": ["ALL","WALLET","CARD","PAY_ON_DELIVERY"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderPayRequestDto": {
        "dataType": "refObject",
        "properties": {
            "password": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_PaymentInitializeResponse_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"PaymentInitializeResponse"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentInitializeVariant": {
        "dataType": "refEnum",
        "enums": ["fund_main_wallet","PRODUCT_LEASE_PAYMENT"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentInitialize": {
        "dataType": "refObject",
        "properties": {
            "paymentVariant": {"ref":"PaymentInitializeVariant","required":true},
            "amountMajor": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_PaystackDedicatedNuban.Exclude_keyofPaystackDedicatedNuban.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"double","required":true},"updatedAt":{"dataType":"datetime","required":true},"createdAt":{"dataType":"datetime","required":true},"uuid":{"dataType":"string","required":true},"dedicatedNubanPayload":{"dataType":"any"},"bankId":{"dataType":"string","required":true},"bankName":{"dataType":"string","required":true},"bankAccountNumber":{"dataType":"string","required":true},"bankAccountName":{"dataType":"string","required":true},"paystackCustomerId":{"dataType":"string","required":true},"paystackIntegration":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_PaystackDedicatedNuban.id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_PaystackDedicatedNuban.Exclude_keyofPaystackDedicatedNuban.id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_PaystackDedicatedNuban.id__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"Omit_PaystackDedicatedNuban.id_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_OrderDetailsResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderDetailsResponseDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ISellerPickLocation.Exclude_keyofISellerPickLocation.id-or-user__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"address":{"dataType":"string"},"name":{"dataType":"string"},"country":{"dataType":"string"},"state":{"dataType":"string"},"contactFullName":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"contactPhoneNumber":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ISellerPickLocation.id-or-user_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_ISellerPickLocation.Exclude_keyofISellerPickLocation.id-or-user__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_ISellerPickLocation.id-or-user__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"Omit_ISellerPickLocation.id-or-user_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISellerPickLocation": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "address": {"dataType":"string"},
            "country": {"dataType":"string"},
            "state": {"dataType":"string"},
            "contactFullName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "contactPhoneNumber": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_PickupLocation.OmitFields_-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_PickupLocation.OmitFields_"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_PickupLocation.OmitFields__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"Omit_PickupLocation.OmitFields_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProcurementDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "accountId": {"dataType":"double","required":true},
            "invoice": {"dataType":"union","subSchemas":[{"ref":"ProcurementInvoiceResponseDto"},{"dataType":"enum","enums":[null]}]},
            "upload": {"ref":"SimpleImageJson","required":true},
            "isProcessed": {"dataType":"boolean","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProcurementDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"ProcurementDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProcurementDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_ProcurementDto_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProcurementsListFilter": {
        "dataType": "refEnum",
        "enums": ["ALL","PROCESS_PENDING","IS_PROCESSED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProcurementDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"ProcurementDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProcurementInvoiceResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"ProcurementInvoiceResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProcurementInvoicetem": {
        "dataType": "refObject",
        "properties": {
            "productUuid": {"dataType":"string","required":true},
            "quantity": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOrderFromInvoiceRequestDto": {
        "dataType": "refObject",
        "properties": {
            "invoiceItems": {"dataType":"array","array":{"dataType":"refObject","ref":"IProcurementInvoicetem"},"required":true},
            "wareHouseUuid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "orderByUuidsDto": {
        "dataType": "refObject",
        "properties": {
            "orderUuids": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoriesResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "productsCount": {"dataType":"double","required":true},
            "bannerUrl": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_CategoriesResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"CategoriesResponseDto"}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_CategoriesResponseDto-Array__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_CategoriesResponseDto-Array_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BrandsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "productsCount": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_BrandsResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"BrandsResponseDto"}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_BrandsResponseDto-Array__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_BrandsResponseDto-Array_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_CategoriesResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"CategoriesResponseDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_BrandsResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"BrandsResponseDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryBrandsDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_CategoryBrandsDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"CategoryBrandsDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryLocationStates": {
        "dataType": "refObject",
        "properties": {
            "state": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_CategoryLocationStates-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"CategoryLocationStates"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AvailableLocationStatesResponseDto": {
        "dataType": "refObject",
        "properties": {
            "state": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "countryIso2Code": {"dataType":"string","required":true},
            "productsCount": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_AvailableLocationStatesResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"AvailableLocationStatesResponseDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProductsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"ProductsResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProductsResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_ProductsResponseDto_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductPriceSortOrder": {
        "dataType": "refEnum",
        "enums": ["ASC","DESC"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_CategoriesResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"CategoriesResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_BrandsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"BrandsResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductCatalogueFilterRequestDto": {
        "dataType": "refObject",
        "properties": {
            "brandUuids": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"enum","enums":[null]}]},
            "categoryUuids": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"enum","enums":[null]}]},
            "locationStates": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"enum","enums":[null]}]},
            "lga": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"enum","enums":[null]}]},
            "searchWord": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "forOnlyDefaultLinkedSeller": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProductsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"ProductsResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewProductRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "categoryUuid": {"dataType":"string","required":true},
            "brandUuid": {"dataType":"string","required":true},
            "price": {"dataType":"double"},
            "locationState": {"dataType":"string","required":true},
            "tags": {"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"enum","enums":[null]}]},
            "minQty": {"dataType":"double","required":true},
            "maxQty": {"dataType":"double","required":true},
            "newPickupAddress": {"dataType":"nestedObjectLiteral","nestedProperties":{"contactPhoneNumber":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"contactFullName":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"state":{"dataType":"string","required":true},"country":{"dataType":"string","required":true},"address":{"dataType":"string","required":true},"name":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}}},
            "pickupAddressUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewUpdateProductRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "categoryUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "brandUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "price": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "locationState": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "minQty": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "maxQty": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "tags": {"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ProductReview.Exclude_keyofProductReview.OmitFields__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"uuid":{"dataType":"string","required":true},"userUuid":{"dataType":"string","required":true},"rating":{"dataType":"double","required":true},"reviewNote":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ProductReview.OmitFields_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_ProductReview.Exclude_keyofProductReview.OmitFields__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_ProductReview.OmitFields__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"Omit_ProductReview.OmitFields_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductReviewRequestDto": {
        "dataType": "refObject",
        "properties": {
            "reviewNote": {"dataType":"string","required":true},
            "rating": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductReviewsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "reviewUuid": {"dataType":"string","required":true},
            "reviewerPublicProfile": {"ref":"IPublicProfile","required":true},
            "rating": {"dataType":"double","required":true},
            "reviewNote": {"dataType":"string","required":true},
            "reviewDateUtc": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProductReviewsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"ProductReviewsResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProductReviewsResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_ProductReviewsResponseDto_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductLeaseResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "principalAmountMajor": {"dataType":"double"},
            "interestRatePercentage": {"dataType":"double"},
            "nextLeasePaymentDueDateUtc": {"dataType":"datetime"},
            "totalLoanAmountDueMajor": {"dataType":"double"},
            "currency": {"dataType":"string"},
            "createdAtUtc": {"dataType":"datetime"},
            "creditScore": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProductLeaseResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"ProductLeaseResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductLeaseRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "emailAddress": {"dataType":"string","required":true},
            "stateResidence": {"dataType":"string","required":true},
            "bvn": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "businessType": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "cacNumber": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "companyName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "companyAddress": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "jobTitle": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "modeOfDelivery": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "productCategoryUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "idCardNumber": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "productQuantity": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "principalAmountMajor": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "currency": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProductLeaseResponseDto-or-null_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"ref":"ProductLeaseResponseDto"},{"dataType":"enum","enums":[null]}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IFinancialTransactionResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "type": {"ref":"PaymentTransactionTypes","required":true},
            "amountMajor": {"dataType":"double","required":true},
            "currency": {"dataType":"string","required":true},
            "walletBalanceMajorBefore": {"dataType":"double","required":true},
            "walletBalanceMajorAfter": {"dataType":"double","required":true},
            "metadata": {"ref":"FinancialTransactionMetadata","required":true},
            "paidStatus": {"dataType":"any","required":true},
            "description": {"dataType":"string","required":true},
            "flowType": {"ref":"TransactionFlowType","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_IFinancialTransactionResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"IFinancialTransactionResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_IFinancialTransactionResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_IFinancialTransactionResponseDto_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ProductLeaseUploadFile.Exclude_keyofProductLeaseUploadFile.keyFromCloudProvider__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"documentType":{"ref":"UploadFileCategory","required":true},"url":{"dataType":"string","required":true},"mimetype":{"dataType":"string","required":true},"fileCloudProvider":{"ref":"FileCloudProviders","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ProductLeaseUploadFile.keyFromCloudProvider_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_ProductLeaseUploadFile.Exclude_keyofProductLeaseUploadFile.keyFromCloudProvider__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_ProductLeaseUploadFile.keyFromCloudProvider_-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_ProductLeaseUploadFile.keyFromCloudProvider_"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessProfile": {
        "dataType": "refObject",
        "properties": {
            "businessName": {"dataType":"string","required":true},
            "businessAddress": {"dataType":"string","required":true},
            "businessCACNumber": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProfile": {
        "dataType": "refObject",
        "properties": {
            "userUuid": {"dataType":"string","required":true},
            "isOnProductLease": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
            "isOnDelayedProductLease": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "msisdn": {"dataType":"string","required":true},
            "emailAddress": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "photoUrl": {"dataType":"string","required":true},
            "role": {"ref":"Roles","required":true},
            "isCooperate": {"dataType":"boolean","required":true},
            "accountId": {"dataType":"double","required":true},
            "wareHouseid": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "sellerUniqueCode": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "accountRating": {"ref":"IRating","required":true},
            "businessProfile": {"dataType":"union","subSchemas":[{"ref":"IBusinessProfile"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IProfile_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IProfile"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPublicProfile_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPublicProfile"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_IPublicProfile_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"IPublicProfile"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_IPublicProfile__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_IPublicProfile_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBankInfo": {
        "dataType": "refObject",
        "properties": {
            "bankCode": {"dataType":"string","required":true},
            "bankName": {"dataType":"string","required":true},
            "bankAccountNumber": {"dataType":"string","required":true},
            "bankAccountName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IBankInfo_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IBankInfo"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LinkBuyerToSellerRequestDto": {
        "dataType": "refObject",
        "properties": {
            "phoneNumber": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveNewBankAccount": {
        "dataType": "refObject",
        "properties": {
            "accountNumber": {"dataType":"string","required":true},
            "bankCode": {"dataType":"string","required":true},
            "bankName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResetForgottenPasswordRequestDto": {
        "dataType": "refObject",
        "properties": {
            "newPassword": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResetPasswordRequestDto": {
        "dataType": "refObject",
        "properties": {
            "oldPassword": {"dataType":"string","required":true},
            "newPassword": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IYearEarningResponseDto": {
        "dataType": "refObject",
        "properties": {
            "year": {"dataType":"string","required":true},
            "totalEarningsMajor": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IMonthEarningResponseDto": {
        "dataType": "refObject",
        "properties": {
            "friendlyMonth": {"dataType":"string","required":true},
            "monthISO8601": {"dataType":"string","required":true},
            "totalEarningsMajor": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISellerDashboardStats": {
        "dataType": "refObject",
        "properties": {
            "totalRevenueMajor": {"dataType":"double","required":true},
            "totalRevenueCurrency": {"dataType":"string","required":true},
            "totalRevenueCurrencySymbol": {"dataType":"string","required":true},
            "totalOrdersCount": {"dataType":"double","required":true},
            "totalPendingOrdersCount": {"dataType":"double","required":true},
            "totalPendingQuoteRequestsCount": {"dataType":"double","required":true},
            "yearEarnings": {"dataType":"array","array":{"dataType":"refObject","ref":"IYearEarningResponseDto"},"required":true},
            "monthEarnings": {"dataType":"array","array":{"dataType":"refObject","ref":"IMonthEarningResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ISellerDashboardStats_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"ISellerDashboardStats"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SellerDocsUpload": {
        "dataType": "refObject",
        "properties": {
            "keyFromCloudProvider": {"dataType":"string","required":true},
            "url": {"dataType":"string","required":true},
            "mimetype": {"dataType":"string","required":true},
            "fileCloudProvider": {"ref":"FileCloudProviders","required":true},
            "documentType": {"ref":"UploadFileCategory","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_SellerDocsUpload-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"SellerDocsUpload"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_ProjectsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"ProjectsResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_ProjectsResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_ProjectsResponseDto_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProjectsResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ProjectsResponseDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProjectsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"ProjectsResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProjectsResponseDto-Array-or-IPaginatedList_ProjectSubscriptionResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"ProjectsResponseDto"}},{"ref":"IPaginatedList_ProjectSubscriptionResponseDto_"}]},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SearchProjectDto": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "minCostPerSlot": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "maxCostPerSlot": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "searchWord": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "state": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "projectName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewProjectRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "details": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
            "costPerSlot": {"dataType":"double","required":true},
            "initialInvestmentPercentage": {"dataType":"double","required":true},
            "numberOfSlots": {"dataType":"double","required":true},
            "startDate": {"dataType":"datetime","required":true},
            "address": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "minimumNumberOfSlot": {"dataType":"double"},
            "duration": {"dataType":"double","required":true},
            "paymentPlan": {"ref":"ProjectPaymentPlan"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewProjectSubscriptionRequestDto": {
        "dataType": "refObject",
        "properties": {
            "projectUuid": {"dataType":"string","required":true},
            "numberOfSlot": {"dataType":"double","required":true},
            "totalCost": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewUpdateProjectRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "details": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "type": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "costPerSlot": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "initialInvestmentPercentage": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "numberOfSlots": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "startDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "minimumNumberOfSlot": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "duration": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "address": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "state": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "paymentPlan": {"dataType":"union","subSchemas":[{"ref":"ProjectPaymentPlan"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateProjectStageRequestDto": {
        "dataType": "refObject",
        "properties": {
            "stage": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequestResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "product": {"dataType":"nestedObjectLiteral","nestedProperties":{"pickupAddressDetails":{"dataType":"union","subSchemas":[{"ref":"Omit_PickupLocation.OmitFields_"},{"dataType":"enum","enums":[null]}]},"unitOfMeasurement":{"dataType":"string","required":true},"description":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}},"required":true},
            "quantity": {"dataType":"double","required":true},
            "buyerUserPublicProfile": {"ref":"IPublicProfile","required":true},
            "sellerUserPublicProfile": {"ref":"IPublicProfile","required":true},
            "notes": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "orderReceiveType": {"ref":"OrderReceiveTypes","required":true},
            "deliveryAddress": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "deliverAddressUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "sellerResponse": {"dataType":"union","subSchemas":[{"ref":"QuoteRequestSellerResponse"},{"dataType":"enum","enums":[null]}]},
            "calculatedTotalCostMajor": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "status": {"ref":"QuoteRequestStatuses","required":true},
            "dateCreatedIso8601": {"dataType":"datetime","required":true},
            "sellerPickupLocation": {"dataType":"nestedObjectLiteral","nestedProperties":{"uuid":{"dataType":"string","required":true},"address":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_QuoteRequestResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"QuoteRequestResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHistory_QuoteRequestStatuses_": {
        "dataType": "refObject",
        "properties": {
            "status": {"ref":"QuoteRequestStatuses","required":true},
            "dateTimeInISO8601": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_QuoteRequest.Exclude_keyofQuoteRequest.OmitFields__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"uuid":{"dataType":"string","required":true},"userUuid":{"dataType":"string","required":true},"referenceNumber":{"dataType":"string","required":true},"sellerUserUuid":{"dataType":"string","required":true},"quantity":{"dataType":"double","required":true},"notes":{"dataType":"string"},"orderReceiveType":{"ref":"OrderReceiveTypes","required":true},"deliverAddress":{"dataType":"string"},"hasSellerResponse":{"dataType":"boolean","required":true},"sellerResponse":{"ref":"QuoteRequestSellerResponse","required":true},"calculatedTotalCostMajor":{"dataType":"double","required":true},"sellerResponseSubmittedAt":{"dataType":"datetime","required":true},"status":{"ref":"QuoteRequestStatuses","required":true},"sellerPickupLocationUuid":{"dataType":"string"},"deliverAddressUuid":{"dataType":"string"},"wareHouseUuid":{"dataType":"string"},"statusHistory":{"dataType":"array","array":{"dataType":"refObject","ref":"StatusHistory_QuoteRequestStatuses_"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_QuoteRequest.OmitFields_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_QuoteRequest.Exclude_keyofQuoteRequest.OmitFields__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_Omit_QuoteRequest.OmitFields__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"Omit_QuoteRequest.OmitFields_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequestCreateRequestDto": {
        "dataType": "refObject",
        "properties": {
            "productUuid": {"dataType":"string","required":true},
            "quantity": {"dataType":"double","required":true},
            "notes": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "orderReceiveType": {"ref":"OrderReceiveTypes","required":true},
            "deliverAddressUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "wareHouseUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "sellerPickupLocationUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_QuoteRequestResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"QuoteRequestResponseDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_QuoteRequestResponseDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_QuoteRequestResponseDto_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TemporaryOrderDetailsResponseDto": {
        "dataType": "refObject",
        "properties": {
            "orderUuid": {"dataType":"string","required":true},
            "orderItems": {"dataType":"array","array":{"dataType":"refObject","ref":"CartItemJson"},"required":true},
            "sellerPublicProfile": {"ref":"IPublicProfile","required":true},
            "orderReceiveType": {"ref":"OrderReceiveTypes","required":true},
            "status": {"ref":"OrderStatuses","required":true},
            "paymentStatus": {"ref":"OrderPaymentStatuses","required":true},
            "orderLocation": {"dataType":"nestedObjectLiteral","nestedProperties":{"contactPhoneNumber":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"contactFullName":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"state":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"country":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"address":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},
            "statusHistory": {"dataType":"array","array":{"dataType":"refObject","ref":"StatusHistory_OrderStatuses_"},"required":true},
            "paymentStatusHistory": {"dataType":"array","array":{"dataType":"refObject","ref":"StatusHistory_OrderPaymentStatuses_"},"required":true},
            "calculatedTotalCostMajor": {"dataType":"double","required":true},
            "deliveryCostMajor": {"dataType":"double","required":true},
            "currency": {"dataType":"string","required":true},
            "currencySymbol": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_TemporaryOrderDetailsResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"TemporaryOrderDetailsResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TemporaryOrderPayResponseDto": {
        "dataType": "refObject",
        "properties": {
            "temporaryOrders": {"dataType":"array","array":{"dataType":"refObject","ref":"CreatedOrderData"},"required":true},
            "temporaryOrderUuids": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "paymentProviderDetails": {"ref":"PaymentInitializeResponse"},
            "paymentTransactionStatus": {"ref":"PaymentTransactionStatus","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_TemporaryOrderPayResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"TemporaryOrderPayResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TemporaryOrderCreateWithSellerGroupingRequestDto": {
        "dataType": "refObject",
        "properties": {
            "sellers": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderSellerGroup"},"required":true},
            "buyer": {"dataType":"nestedObjectLiteral","nestedProperties":{"msisdn":{"dataType":"string","required":true},"emailAddress":{"dataType":"string","required":true},"fullName":{"dataType":"string","required":true}},"required":true},
            "newDeliveryAddress": {"dataType":"union","subSchemas":[{"ref":"DeliveryDetails"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NullableString": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse__currency-string.currencySymbol-string.amountMajor-number__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"amountMajor":{"dataType":"double","required":true},"currencySymbol":{"dataType":"string","required":true},"currency":{"dataType":"string","required":true}}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IFinancialTransactionResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IFinancialTransactionResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WithdrawFundsRequestDto": {
        "dataType": "refObject",
        "properties": {
            "amountMajor": {"dataType":"double","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IEarningResponseDto": {
        "dataType": "refObject",
        "properties": {
            "currentYearEarningsMajor": {"dataType":"double","required":true},
            "yearEarnings": {"dataType":"array","array":{"dataType":"refObject","ref":"IYearEarningResponseDto"},"required":true},
            "monthEarnings": {"dataType":"array","array":{"dataType":"refObject","ref":"IMonthEarningResponseDto"},"required":true},
            "currency": {"dataType":"string","required":true},
            "currencySymbol": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IEarningResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IEarningResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewWareHouseRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "contactFullName": {"dataType":"string","required":true},
            "contactPhoneNumber": {"dataType":"string","required":true},
            "isDefault": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouseResponseDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "contactFullName": {"dataType":"string","required":true},
            "contactPhoneNumber": {"dataType":"string","required":true},
            "isDefault": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_WareHouseResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"WareHouseResponseDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouseToSiteDeliveryDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "wareHouseDetails": {"ref":"WareHouse"},
            "userId": {"dataType":"double","required":true},
            "deliveryItems": {"dataType":"array","array":{"dataType":"refObject","ref":"DeliveryItemJson"},"required":true},
            "deliveryRequestHistory": {"dataType":"array","array":{"dataType":"refObject","ref":"StatusHistory_WareHouseToSiteDeliveryFeeStatuses_"},"required":true},
            "status": {"ref":"WareHouseToSiteDeliveryFeeStatuses","required":true},
            "totalAmountMajor": {"dataType":"double","required":true},
            "deliveryFeeAmountMajor": {"dataType":"double","required":true},
            "deliverySiteDetails": {"ref":"Omit_DeliveryLocation.OmitFields_"},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaginatedList_WareHouseToSiteDeliveryDto_": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"WareHouseToSiteDeliveryDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_IPaginatedList_WareHouseToSiteDeliveryDto__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"IPaginatedList_WareHouseToSiteDeliveryDto_"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_WareHouseToSiteDeliveryDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"WareHouseToSiteDeliveryDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_WareHouseToSiteDeliveryDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"WareHouseToSiteDeliveryDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_WareHouseResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"WareHouseResponseDto"},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateWareHouseRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "contactFullName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "contactPhoneNumber": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "isDefault": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouseSiteRequestDto": {
        "dataType": "refObject",
        "properties": {
            "contactFullName": {"dataType":"string","required":true},
            "contactPhoneNumber": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WareHouseToDeliveryToSiteRequestDto": {
        "dataType": "refObject",
        "properties": {
            "deliveryItems": {"dataType":"array","array":{"dataType":"refObject","ref":"DeliveryItemJson"},"required":true},
            "deliveryLocationUuid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AcceptOrDeclineType": {
        "dataType": "refEnum",
        "enums": ["ACCEPT","DECLINE"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SetProductReorderLevelRequestDto": {
        "dataType": "refObject",
        "properties": {
            "wareHouseUuid": {"dataType":"string","required":true},
            "productUuid": {"dataType":"string","required":true},
            "level": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductReorderLevelResponseDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "produtUuid": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "productName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "wareHouseDetail": {"dataType":"union","subSchemas":[{"ref":"WareHouse"},{"dataType":"enum","enums":[null]}]},
            "level": {"dataType":"double","required":true},
            "avalailableInStock": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IServerResponse_ProductReorderLevelResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ProductReorderLevelResponseDto"}},
            "url": {"dataType":"string"},
            "error": {"dataType":"string"},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"DetailedError"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/api/access/login/password',
            ...(fetchMiddlewares<RequestHandler>(AccessController)),
            ...(fetchMiddlewares<RequestHandler>(AccessController.prototype.loginWithPassword)),

            function AccessController_loginWithPassword(request: any, response: any, next: any) {
            const args = {
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"IPasswordLoginRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AccessController();


              const promise = controller.loginWithPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/access/login/phonenumber',
            ...(fetchMiddlewares<RequestHandler>(AccessController)),
            ...(fetchMiddlewares<RequestHandler>(AccessController.prototype.loginWithPhone)),

            function AccessController_loginWithPhone(request: any, response: any, next: any) {
            const args = {
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"LoginWithPhone"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AccessController();


              const promise = controller.loginWithPhone.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/access/login/phonenumber/verify/otp',
            ...(fetchMiddlewares<RequestHandler>(AccessController)),
            ...(fetchMiddlewares<RequestHandler>(AccessController.prototype.verifyPhoneForLogin)),

            function AccessController_verifyPhoneForLogin(request: any, response: any, next: any) {
            const args = {
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"LoginWithPhoneOtpVerify"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AccessController();


              const promise = controller.verifyPhoneForLogin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/access/logout',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AccessController)),
            ...(fetchMiddlewares<RequestHandler>(AccessController.prototype.handleLogout)),

            function AccessController_handleLogout(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AccessController();


              const promise = controller.handleLogout.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/access/super',
            ...(fetchMiddlewares<RequestHandler>(AccessController)),
            ...(fetchMiddlewares<RequestHandler>(AccessController.prototype.loginWithAdminAcccess)),

            function AccessController_loginWithAdminAcccess(request: any, response: any, next: any) {
            const args = {
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"IPasswordLoginRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AccessController();


              const promise = controller.loginWithAdminAcccess.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/category/create',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.createCategories)),

            function AdminController_createCategories(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewCategoryRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.createCategories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/category/:categoryUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.updateCategory)),

            function AdminController_updateCategory(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewUpdateCategoryRequestDto"},
                    categoryUuid: {"in":"path","name":"categoryUuid","required":true,"dataType":"any"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.updateCategory.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/brand/create',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.createBrand)),

            function AdminController_createBrand(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewBrandRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.createBrand.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/brand/:brandUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.updateBrand)),

            function AdminController_updateBrand(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewBrandRequestDto"},
                    brandUuid: {"in":"path","name":"brandUuid","required":true,"dataType":"any"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.updateBrand.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/users',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleUsersFetch)),

            function AdminController_handleUsersFetch(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleUsersFetch.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/users/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleUserDetailsFetch)),

            function AdminController_handleUserDetailsFetch(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleUserDetailsFetch.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/deliverylocations',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleDeliveryLocationFetch)),

            function AdminController_handleDeliveryLocationFetch(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleDeliveryLocationFetch.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/deliverylocations',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleAddDeliveryLocation)),

            function AdminController_handleAddDeliveryLocation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AddDeliveryLocationByAdminRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleAddDeliveryLocation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/productleases',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetAllProductLeasesForAdmin)),

            function AdminController_handleGetAllProductLeasesForAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetAllProductLeasesForAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/productleases/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetOneProductLeasesForAdmin)),

            function AdminController_handleGetOneProductLeasesForAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetOneProductLeasesForAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin/productleases/toggle',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleProductLeaseStatusToggleByAdmin)),

            function AdminController_handleProductLeaseStatusToggleByAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"INewProductLeaseStatusToggleDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleProductLeaseStatusToggleByAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/productleases',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleNewProductLeaseByAdmin)),

            function AdminController_handleNewProductLeaseByAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"INewProductLeaseRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleNewProductLeaseByAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin/productleases/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleEditProductLease)),

            function AdminController_handleEditProductLease(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"IEditProductLeaseRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleEditProductLease.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/productleases/user/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.productLeaseStatus)),

            function AdminController_productLeaseStatus(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.productLeaseStatus.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/financialtransactions',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetAllFinancialTransactionsForAdmin)),

            function AdminController_handleGetAllFinancialTransactionsForAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetAllFinancialTransactionsForAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/financialtransactions',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleNewFinancialTransactionByAdmin)),

            function AdminController_handleNewFinancialTransactionByAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"IAddNewFinancialTransactionByAdmin"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleNewFinancialTransactionByAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/sendPromotionalMail',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.promotionalMail)),

            function AdminController_promotionalMail(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.promotionalMail.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin/orders/pod/cancel/:orderUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.cancelOrderByAdmin)),

            function AdminController_cancelOrderByAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    orderUuid: {"in":"path","name":"orderUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.cancelOrderByAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin/orders/pod/paymentdefault/:orderUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.orderPaymentDefaultByAdmin)),

            function AdminController_orderPaymentDefaultByAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    orderUuid: {"in":"path","name":"orderUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.orderPaymentDefaultByAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/promotions',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.newPromotion)),

            function AdminController_newPromotion(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewPromotionRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.newPromotion.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/promotions',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetPromotions)),

            function AdminController_handleGetPromotions(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetPromotions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/categories',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetCategories)),

            function AdminController_handleGetCategories(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetCategories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/brands',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetBrands)),

            function AdminController_handleGetBrands(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetBrands.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/affiliates',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.newAffiliate)),

            function AdminController_newAffiliate(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewAffiliateRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.newAffiliate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/users',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.newsellerOma)),

            function AdminController_newsellerOma(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewSellerOmaRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.newsellerOma.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/affiliates',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetAffiliates)),

            function AdminController_handleGetAffiliates(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetAffiliates.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/orders',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetOrders)),

            function AdminController_handleGetOrders(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetOrders.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/orders',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleOrderCreationFromPreparedCart)),

            function AdminController_handleOrderCreationFromPreparedCart(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateOrderByAdminRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleOrderCreationFromPreparedCart.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/wallettowallettransfer',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetWalletToWalletTransfers)),

            function AdminController_handleGetWalletToWalletTransfers(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetWalletToWalletTransfers.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/wallettowallettransfer',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleWalletToWalletTransferByAdmin)),

            function AdminController_handleWalletToWalletTransferByAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"IWalletTransferTransactionByAdmin"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleWalletToWalletTransferByAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin/orders/:orderUuid/statusupdate/:newOrderStatus',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleOrderRecievedConfirmation)),

            function AdminController_handleOrderRecievedConfirmation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    orderUuid: {"in":"path","name":"orderUuid","required":true,"dataType":"string"},
                    newOrderStatus: {"in":"path","name":"newOrderStatus","required":true,"ref":"OrderStatuses"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleOrderRecievedConfirmation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/orders/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetchangeOrder)),

            function AdminController_handleGetchangeOrder(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetchangeOrder.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin/orders/:id/changeOrderTotal',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleOrderTotalChangeConfirmation)),

            function AdminController_handleOrderTotalChangeConfirmation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"changeReason":{"dataType":"string","required":true},"newOrderAmountMajor":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleOrderTotalChangeConfirmation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/categories/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetCategory)),

            function AdminController_handleGetCategory(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetCategory.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin/categories/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleCategoryCinderbuildMergin)),

            function AdminController_handleCategoryCinderbuildMergin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"currency":{"dataType":"string","required":true},"newMarginAmountMajor":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleCategoryCinderbuildMergin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/deliveryrequests',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetWareHouseToSiteDeliveryRequests)),

            function AdminController_handleGetWareHouseToSiteDeliveryRequests(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetWareHouseToSiteDeliveryRequests.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/deliveryrequests/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetWarehouseToSiteDeliveryRequest)),

            function AdminController_handleGetWarehouseToSiteDeliveryRequest(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetWarehouseToSiteDeliveryRequest.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/deliveryRequest/:id/shipped',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleMarKDeliveryRequestAsShipped)),

            function AdminController_handleMarKDeliveryRequestAsShipped(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleMarKDeliveryRequestAsShipped.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/changebankdetails',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetRequestBankAccountChange)),

            function AdminController_handleGetRequestBankAccountChange(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetRequestBankAccountChange.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin/changebankdetails/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.saveBankAccountInfo)),

            function AdminController_saveBankAccountInfo(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.saveBankAccountInfo.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/deliveryrequests/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleWarehouseToSiteDeliveryRequestDeliveryFeeUpdate)),

            function AdminController_handleWarehouseToSiteDeliveryRequestDeliveryFeeUpdate(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"currency":{"dataType":"string","required":true},"deliveryFeeAmountMajor":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleWarehouseToSiteDeliveryRequestDeliveryFeeUpdate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/procurements',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetProcurmentList)),

            function AdminController_handleGetProcurmentList(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetProcurmentList.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/procurements/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleProcurementDetails)),

            function AdminController_handleProcurementDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleProcurementDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/procurements/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleProcurementisProcessed)),

            function AdminController_handleProcurementisProcessed(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleProcurementisProcessed.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/procurements/:id/invoices',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.addItemToInvoice)),

            function AdminController_addItemToInvoice(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"AddItemToInvoiceRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.addItemToInvoice.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/procurements/invoices',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleAllProcurementInvoice)),

            function AdminController_handleAllProcurementInvoice(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleAllProcurementInvoice.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/procurements/invoices/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetProcurementInvoiceDetails)),

            function AdminController_handleGetProcurementInvoiceDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetProcurementInvoiceDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/products',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleAllProduct)),

            function AdminController_handleAllProduct(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleAllProduct.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/products',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleCreateProduct)),

            function AdminController_handleCreateProduct(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewProductRequestDtoByAdmin"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleCreateProduct.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/products/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetProductDetails)),

            function AdminController_handleGetProductDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetProductDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/quoterequest',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetQouteRequests)),

            function AdminController_handleGetQouteRequests(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetQouteRequests.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/quoterequest/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetQuoteRequestDetails)),

            function AdminController_handleGetQuoteRequestDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetQuoteRequestDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/quoterequest/:id/adminresponse',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleQuoteRequestSellerResponse)),

            function AdminController_handleQuoteRequestSellerResponse(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"deliveryFee":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"unitPrice":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleQuoteRequestSellerResponse.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/moveproducts',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleMoveProductToAnotherSeller)),

            function AdminController_handleMoveProductToAnotherSeller(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"MoveSellerProductToOmaDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleMoveProductToAnotherSeller.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/oldseller/products',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetOldSellerProducts)),

            function AdminController_handleGetOldSellerProducts(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetOldSellerProducts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin/quoterequest/decline/:quoteRequestUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleQuoteRequestDecline)),

            function AdminController_handleQuoteRequestDecline(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    quoteRequestUuid: {"in":"path","name":"quoteRequestUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleQuoteRequestDecline.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/create-dedicated-account',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleVirtualAccountCreationForUser)),

            function AdminController_handleVirtualAccountCreationForUser(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleVirtualAccountCreationForUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/virtual-account',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetUserVirtualAccounts)),

            function AdminController_handleGetUserVirtualAccounts(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetUserVirtualAccounts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/audit-logs',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetAuditLogs)),

            function AdminController_handleGetAuditLogs(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetAuditLogs.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/pricematrices',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetPricesMatrices)),

            function AdminController_handleGetPricesMatrices(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetPricesMatrices.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/pricematrices/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetPricesMatrixDetails)),

            function AdminController_handleGetPricesMatrixDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetPricesMatrixDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/pricematrices',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleSubmitPriceMatrix)),

            function AdminController_handleSubmitPriceMatrix(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"SubmitPriceMatricDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleSubmitPriceMatrix.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/pricematrices/delivered/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleApprovePricesMatrix)),

            function AdminController_handleApprovePricesMatrix(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleApprovePricesMatrix.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/pricematrices/declined/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleDeclinePricesMatrixByAdmin)),

            function AdminController_handleDeclinePricesMatrixByAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleDeclinePricesMatrixByAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/cstore/activateuser/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleCStoreForUserByAdmin)),

            function AdminController_handleCStoreForUserByAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleCStoreForUserByAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/quoterequest/create-admin',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleQuoteRequestCreation)),

            function AdminController_handleQuoteRequestCreation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"QouteRequestAdminCreateRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleQuoteRequestCreation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/mortgageaccountverification',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleGetMortgageAccountVerification)),

            function AdminController_handleGetMortgageAccountVerification(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","dataType":"any"},
                    filter: {"in":"query","name":"filter","dataType":"any"},
                    ids: {"in":"query","name":"ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleGetMortgageAccountVerification.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/mortgageaccountverification/approve-document',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleApproveDeveloperDocument)),

            function AdminController_handleApproveDeveloperDocument(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    fileCategory: {"in":"query","name":"fileCategory","required":true,"ref":"MortgageAccountVerificationFiles"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ApprovedMortgageAccountDocumentDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleApproveDeveloperDocument.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/mortgageaccountverification/approve-account',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleApproveDeveloperAccount)),

            function AdminController_handleApproveDeveloperAccount(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleApproveDeveloperAccount.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/mortgageaccountverification/confirm-account',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleConfirmDeveloperAccount)),

            function AdminController_handleConfirmDeveloperAccount(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleConfirmDeveloperAccount.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/mortgageaccountverification/confirm-approved-account',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleConfirmApproveDeveloperAccount)),

            function AdminController_handleConfirmApproveDeveloperAccount(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleConfirmApproveDeveloperAccount.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/approveproject/:projectuuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleApproveProject)),

            function AdminController_handleApproveProject(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    projectuuid: {"in":"path","name":"projectuuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleApproveProject.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/mortgagecards',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.handleFetchMortgageCard)),

            function AdminController_handleFetchMortgageCard(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.handleFetchMortgageCard.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/bank/nigerianbanks',
            ...(fetchMiddlewares<RequestHandler>(BankController)),
            ...(fetchMiddlewares<RequestHandler>(BankController.prototype.getBanksList)),

            function BankController_getBanksList(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BankController();


              const promise = controller.getBanksList.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/bank/account/nameenquiry',
            ...(fetchMiddlewares<RequestHandler>(BankController)),
            ...(fetchMiddlewares<RequestHandler>(BankController.prototype.bankAccountNameEnquiry)),

            function BankController_bankAccountNameEnquiry(request: any, response: any, next: any) {
            const args = {
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"NewBankAccountRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BankController();


              const promise = controller.bankAccountNameEnquiry.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/cart/item',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CartController)),
            ...(fetchMiddlewares<RequestHandler>(CartController.prototype.handleNewCartItem)),

            function CartController_handleNewCartItem(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"NewCartItemRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CartController();


              const promise = controller.handleNewCartItem.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/cart/product/:productUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CartController)),
            ...(fetchMiddlewares<RequestHandler>(CartController.prototype.handleProductRemovalFromCart)),

            function CartController_handleProductRemovalFromCart(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    productUuid: {"in":"path","name":"productUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CartController();


              const promise = controller.handleProductRemovalFromCart.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/cart',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CartController)),
            ...(fetchMiddlewares<RequestHandler>(CartController.prototype.handleCurrentCartContent)),

            function CartController_handleCurrentCartContent(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CartController();


              const promise = controller.handleCurrentCartContent.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/cooperate/user',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CooperateController)),
            ...(fetchMiddlewares<RequestHandler>(CooperateController.prototype.getCooperateUsers)),

            function CooperateController_getCooperateUsers(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    startDate: {"in":"query","name":"startDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
                    endDate: {"in":"query","name":"endDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CooperateController();


              const promise = controller.getCooperateUsers.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/cooperate/user/:userUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CooperateController)),
            ...(fetchMiddlewares<RequestHandler>(CooperateController.prototype.getCooperateUser)),

            function CooperateController_getCooperateUser(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    userUuid: {"in":"path","name":"userUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CooperateController();


              const promise = controller.getCooperateUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/cooperate/user',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CooperateController)),
            ...(fetchMiddlewares<RequestHandler>(CooperateController.prototype.handleCreateNewCorporateUser)),

            function CooperateController_handleCreateNewCorporateUser(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"AddUserRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CooperateController();


              const promise = controller.handleCreateNewCorporateUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/cooperate/user/:userUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CooperateController)),
            ...(fetchMiddlewares<RequestHandler>(CooperateController.prototype.deactivateUser)),

            function CooperateController_deactivateUser(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    userUuid: {"in":"path","name":"userUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CooperateController();


              const promise = controller.deactivateUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/cooperate/wallet-to-wallet-transfter',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CooperateController)),
            ...(fetchMiddlewares<RequestHandler>(CooperateController.prototype.handleMaintoDeliveryWalletTransfer)),

            function CooperateController_handleMaintoDeliveryWalletTransfer(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"DeliveryWalletTranferDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CooperateController();


              const promise = controller.handleMaintoDeliveryWalletTransfer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/coupons',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CouponController)),
            ...(fetchMiddlewares<RequestHandler>(CouponController.prototype.handleNewProductCoupon)),

            function CouponController_handleNewProductCoupon(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"NewCouponRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CouponController();


              const promise = controller.handleNewProductCoupon.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/coupons',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CouponController)),
            ...(fetchMiddlewares<RequestHandler>(CouponController.prototype.handleGetCouponsPaginatedList)),

            function CouponController_handleGetCouponsPaginatedList(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    isActive: {"in":"query","name":"isActive","required":true,"dataType":"boolean"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CouponController();


              const promise = controller.handleGetCouponsPaginatedList.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/coupons/deactivate',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CouponController)),
            ...(fetchMiddlewares<RequestHandler>(CouponController.prototype.handleDeactivateCoupon)),

            function CouponController_handleDeactivateCoupon(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"code":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CouponController();


              const promise = controller.handleDeactivateCoupon.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/coupons/update',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CouponController)),
            ...(fetchMiddlewares<RequestHandler>(CouponController.prototype.handleUpdateCoupon)),

            function CouponController_handleUpdateCoupon(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"NewUpdateCouponRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CouponController();


              const promise = controller.handleUpdateCoupon.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/deliverylocations',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DeliveryLocationController)),
            ...(fetchMiddlewares<RequestHandler>(DeliveryLocationController.prototype.handleGetDeliveryLocations)),

            function DeliveryLocationController_handleGetDeliveryLocations(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new DeliveryLocationController();


              const promise = controller.handleGetDeliveryLocations.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/deliverylocations/:userUuid',
            ...(fetchMiddlewares<RequestHandler>(DeliveryLocationController)),
            ...(fetchMiddlewares<RequestHandler>(DeliveryLocationController.prototype.handleUserDeliveryLocations)),

            function DeliveryLocationController_handleUserDeliveryLocations(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    userUuid: {"in":"path","name":"userUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new DeliveryLocationController();


              const promise = controller.handleUserDeliveryLocations.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/deliverylocations/:locationUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DeliveryLocationController)),
            ...(fetchMiddlewares<RequestHandler>(DeliveryLocationController.prototype.handleGetGetDeliveryLocationDetails)),

            function DeliveryLocationController_handleGetGetDeliveryLocationDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    locationUuid: {"in":"path","name":"locationUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new DeliveryLocationController();


              const promise = controller.handleGetGetDeliveryLocationDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/deliverylocations',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DeliveryLocationController)),
            ...(fetchMiddlewares<RequestHandler>(DeliveryLocationController.prototype.handleAddDeliveryLocation)),

            function DeliveryLocationController_handleAddDeliveryLocation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"DeliveryLocationRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new DeliveryLocationController();


              const promise = controller.handleAddDeliveryLocation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/deliverylocations/:locationUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DeliveryLocationController)),
            ...(fetchMiddlewares<RequestHandler>(DeliveryLocationController.prototype.updateUserDeliveryLocation)),

            function DeliveryLocationController_updateUserDeliveryLocation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IUpdateDeliveryLocationDto"},
                    locationUuid: {"in":"path","name":"locationUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new DeliveryLocationController();


              const promise = controller.updateUserDeliveryLocation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/deliverylocations/:locationUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DeliveryLocationController)),
            ...(fetchMiddlewares<RequestHandler>(DeliveryLocationController.prototype.deleteDeliveryLocation)),

            function DeliveryLocationController_deleteDeliveryLocation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    locationUuid: {"in":"path","name":"locationUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new DeliveryLocationController();


              const promise = controller.deleteDeliveryLocation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/estatedeveloper/isapproved',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(EstateDeveloperController)),
            ...(fetchMiddlewares<RequestHandler>(EstateDeveloperController.prototype.handleIsDeveloperAccountApprovedAndConfirmed)),

            function EstateDeveloperController_handleIsDeveloperAccountApprovedAndConfirmed(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EstateDeveloperController();


              const promise = controller.handleIsDeveloperAccountApprovedAndConfirmed.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/estatedeveloper/addinvestor',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(EstateDeveloperController)),
            ...(fetchMiddlewares<RequestHandler>(EstateDeveloperController.prototype.addInvestorToProjectSubscription)),

            function EstateDeveloperController_addInvestorToProjectSubscription(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AddInvestorToProjectRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EstateDeveloperController();


              const promise = controller.addInvestorToProjectSubscription.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/investor/portfolio',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.handleGetMyPortfolioProjectSubscription)),

            function InvestorController_handleGetMyPortfolioProjectSubscription(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    projectStatus: {"in":"query","name":"status","required":true,"ref":"ProjectStatuses"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new InvestorController();


              const promise = controller.handleGetMyPortfolioProjectSubscription.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/investor/portfolio/:subscriptionUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.handleProjectSubscriptionFetchDetails)),

            function InvestorController_handleProjectSubscriptionFetchDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    subscriptionUuid: {"in":"path","name":"subscriptionUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new InvestorController();


              const promise = controller.handleProjectSubscriptionFetchDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/investor/projecttransactions',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.handleGetMyProjectSubscriptionTransactions)),

            function InvestorController_handleGetMyProjectSubscriptionTransactions(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new InvestorController();


              const promise = controller.handleGetMyProjectSubscriptionTransactions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/investor/projecttransactions/pendingrecurrentpayment',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.handleGetPendingRecurrentProjectSubscriptionTransactions)),

            function InvestorController_handleGetPendingRecurrentProjectSubscriptionTransactions(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new InvestorController();


              const promise = controller.handleGetPendingRecurrentProjectSubscriptionTransactions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/investor/projecttransactions/:transactionUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.handleGetSingleProjectSubscriptionTransactions)),

            function InvestorController_handleGetSingleProjectSubscriptionTransactions(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    transactionUuid: {"in":"path","name":"transactionUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new InvestorController();


              const promise = controller.handleGetSingleProjectSubscriptionTransactions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/investor/projecttransactions/payment/:transactionUuid/:projectSubscriptionPaymentVariant',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.createProjectSubscription)),

            function InvestorController_createProjectSubscription(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RecurrentPaymentRequestDto"},
                    projectSubscriptionPaymentVariant: {"in":"path","name":"projectSubscriptionPaymentVariant","required":true,"ref":"ProjectSubscriptionPaymentVariant"},
                    transactionUuid: {"in":"path","name":"transactionUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new InvestorController();


              const promise = controller.createProjectSubscription.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/invoice',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InvoiceController)),
            ...(fetchMiddlewares<RequestHandler>(InvoiceController.prototype.handleGetMyInvoices)),

            function InvoiceController_handleGetMyInvoices(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    startDate: {"in":"query","name":"startDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
                    endDate: {"in":"query","name":"endDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new InvoiceController();


              const promise = controller.handleGetMyInvoices.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/miscellaneous/supported-countries',
            ...(fetchMiddlewares<RequestHandler>(MiscController)),
            ...(fetchMiddlewares<RequestHandler>(MiscController.prototype.getCountriesList)),

            function MiscController_getCountriesList(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MiscController();


              const promise = controller.getCountriesList.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/miscellaneous/nigerianstates/:state',
            ...(fetchMiddlewares<RequestHandler>(MiscController)),
            ...(fetchMiddlewares<RequestHandler>(MiscController.prototype.getStates)),

            function MiscController_getStates(request: any, response: any, next: any) {
            const args = {
                    state: {"in":"path","name":"state","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MiscController();


              const promise = controller.getStates.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/miscellaneous/state/:state/lgas',
            ...(fetchMiddlewares<RequestHandler>(MiscController)),
            ...(fetchMiddlewares<RequestHandler>(MiscController.prototype.getStateLocalGovernmentAreas)),

            function MiscController_getStateLocalGovernmentAreas(request: any, response: any, next: any) {
            const args = {
                    state: {"in":"path","name":"state","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MiscController();


              const promise = controller.getStateLocalGovernmentAreas.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/miscellaneous/findus/all',
            ...(fetchMiddlewares<RequestHandler>(MiscController)),
            ...(fetchMiddlewares<RequestHandler>(MiscController.prototype.handleFindUsOptionsFetch)),

            function MiscController_handleFindUsOptionsFetch(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MiscController();


              const promise = controller.handleFindUsOptionsFetch.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/miscellaneous/findus/create',
            ...(fetchMiddlewares<RequestHandler>(MiscController)),
            ...(fetchMiddlewares<RequestHandler>(MiscController.prototype.createCategories)),

            function MiscController_createCategories(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MiscController();


              const promise = controller.createCategories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/mortgagecard/balance',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MortgageCardController)),
            ...(fetchMiddlewares<RequestHandler>(MortgageCardController.prototype.mainMortgageCardBalance)),

            function MortgageCardController_mainMortgageCardBalance(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MortgageCardController();


              const promise = controller.mainMortgageCardBalance.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/mortgagecard/activate',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MortgageCardController)),
            ...(fetchMiddlewares<RequestHandler>(MortgageCardController.prototype.createCategories)),

            function MortgageCardController_createCategories(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ActivateMortgageCardRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MortgageCardController();


              const promise = controller.createCategories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/notifications',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NotificationsController)),
            ...(fetchMiddlewares<RequestHandler>(NotificationsController.prototype.getCurrentUserNotificationMessages)),

            function NotificationsController_getCurrentUserNotificationMessages(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NotificationsController();


              const promise = controller.getCurrentUserNotificationMessages.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/notifications/:notificationMessageUuid/markAsRead',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NotificationsController)),
            ...(fetchMiddlewares<RequestHandler>(NotificationsController.prototype.markAsRead)),

            function NotificationsController_markAsRead(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    notificationMessageUuid: {"in":"path","name":"notificationMessageUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new NotificationsController();


              const promise = controller.markAsRead.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/onboarding/signup',
            ...(fetchMiddlewares<RequestHandler>(OnboardingController)),
            ...(fetchMiddlewares<RequestHandler>(OnboardingController.prototype.handleFirstStageSignup)),

            function OnboardingController_handleFirstStageSignup(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewUserRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OnboardingController();


              const promise = controller.handleFirstStageSignup.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/onboarding/signup/cooperate',
            ...(fetchMiddlewares<RequestHandler>(OnboardingController)),
            ...(fetchMiddlewares<RequestHandler>(OnboardingController.prototype.handleCooperateSignup)),

            function OnboardingController_handleCooperateSignup(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewCooperateUserSignupDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OnboardingController();


              const promise = controller.handleCooperateSignup.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/onboarding/signup/mortgage',
            ...(fetchMiddlewares<RequestHandler>(OnboardingController)),
            ...(fetchMiddlewares<RequestHandler>(OnboardingController.prototype.handleMortageSignup)),

            function OnboardingController_handleMortageSignup(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewMortageUserSignupDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OnboardingController();


              const promise = controller.handleMortageSignup.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/onboarding/signup/mortgageinvestor',
            ...(fetchMiddlewares<RequestHandler>(OnboardingController)),
            ...(fetchMiddlewares<RequestHandler>(OnboardingController.prototype.handleMortageInvestorSignup)),

            function OnboardingController_handleMortageInvestorSignup(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewMortageInvestorSignup"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OnboardingController();


              const promise = controller.handleMortageInvestorSignup.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/onboarding/verify',
            ...(fetchMiddlewares<RequestHandler>(OnboardingController)),
            ...(fetchMiddlewares<RequestHandler>(OnboardingController.prototype.verifyTempUser)),

            function OnboardingController_verifyTempUser(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IPhoneVerification"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OnboardingController();


              const promise = controller.verifyTempUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/onboarding/businessinfo',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OnboardingController)),
            ...(fetchMiddlewares<RequestHandler>(OnboardingController.prototype.processBusinessInfo)),

            function OnboardingController_processBusinessInfo(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"BusinessInfoRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OnboardingController();


              const promise = controller.processBusinessInfo.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/onboarding/accessrequest',
            ...(fetchMiddlewares<RequestHandler>(OnboardingController)),
            ...(fetchMiddlewares<RequestHandler>(OnboardingController.prototype.processAccessRequest)),

            function OnboardingController_processAccessRequest(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AccessRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OnboardingController();


              const promise = controller.processAccessRequest.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/orders/lastorderitems',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.handleLastOrderItems)),

            function OrdersController_handleLastOrderItems(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.handleLastOrderItems.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/orders/:orderUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.orderDetails)),

            function OrdersController_orderDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    orderUuid: {"in":"path","name":"orderUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.orderDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/orders/create/fromcart/:orderPaymentVariant',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.handleOrderCreationFromCart)),

            function OrdersController_handleOrderCreationFromCart(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    orderPaymentVariant: {"in":"path","name":"orderPaymentVariant","required":true,"ref":"OrderPaymentVariant"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewOrderCreateRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.handleOrderCreationFromCart.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/orders/prepare/fromcart',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.handleOrderPreparationFromCart)),

            function OrdersController_handleOrderPreparationFromCart(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.handleOrderPreparationFromCart.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/orders/create/frompreparedcart/:orderPaymentVariant',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.handleOrderCreationFromPreparedCart)),

            function OrdersController_handleOrderCreationFromPreparedCart(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    orderPaymentVariant: {"in":"path","name":"orderPaymentVariant","required":true,"ref":"OrderPaymentVariant"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"OrderCreateWithSellerGroupingRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.handleOrderCreationFromPreparedCart.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/orders/create/fromquoterequest/:quoteRequestUuid/:orderPaymentVariant',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.handleOrderCreationFromQuoteRequest)),

            function OrdersController_handleOrderCreationFromQuoteRequest(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    quoteRequestUuid: {"in":"path","name":"quoteRequestUuid","required":true,"dataType":"string"},
                    orderPaymentVariant: {"in":"path","name":"orderPaymentVariant","required":true,"ref":"OrderPaymentVariant"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewOrderCreateRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.handleOrderCreationFromQuoteRequest.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/orders/:orderUuid/statusupdate/:newOrderStatus',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.handleOrderConfirmation)),

            function OrdersController_handleOrderConfirmation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    orderUuid: {"in":"path","name":"orderUuid","required":true,"dataType":"string"},
                    newOrderStatus: {"in":"path","name":"newOrderStatus","required":true,"ref":"OrderStatuses"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.handleOrderConfirmation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/orders/:orderUuid/cancel',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.handleOrderCancellation)),

            function OrdersController_handleOrderCancellation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    orderUuid: {"in":"path","name":"orderUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.handleOrderCancellation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/orders/:orderUuid/review',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.reviewOrder)),

            function OrdersController_reviewOrder(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"OrderReviewRequestDto"},
                    orderUuid: {"in":"path","name":"orderUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.reviewOrder.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/orders/:orderUuid/dispute',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.disputeOrder)),

            function OrdersController_disputeOrder(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"OrderDisputeRequestDto"},
                    orderUuid: {"in":"path","name":"orderUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.disputeOrder.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/orders',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OrdersController)),
            ...(fetchMiddlewares<RequestHandler>(OrdersController.prototype.handleGetMyOrders)),

            function OrdersController_handleGetMyOrders(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    persona: {"in":"query","name":"persona","required":true,"ref":"Persona"},
                    orderStatus: {"in":"query","name":"status","required":true,"ref":"OrderStatusesDto"},
                    orderPaymentStatus: {"in":"query","name":"paymentStatus","dataType":"union","subSchemas":[{"ref":"OrderPaymentStatusesDto"},{"dataType":"enum","enums":[null]}]},
                    orderPaymentVariant: {"in":"query","name":"paymentVariant","dataType":"union","subSchemas":[{"ref":"OrderPaymentVariantDto"},{"dataType":"enum","enums":[null]}]},
                    procInvoiceUuid: {"in":"query","name":"procInvoiceUuid","dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrdersController();


              const promise = controller.handleGetMyOrders.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/payments/pay/order/:orderUuid/paymentVariant/:orderPaymentVariant',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController.prototype.handlePayForExistingOrder)),

            function PaymentsController_handlePayForExistingOrder(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    orderUuid: {"in":"path","name":"orderUuid","required":true,"dataType":"string"},
                    orderPaymentVariant: {"in":"path","name":"orderPaymentVariant","required":true,"ref":"OrderPaymentVariant"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"OrderPayRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PaymentsController();


              const promise = controller.handlePayForExistingOrder.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/payments/paystack/initialize',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController.prototype.initializePaystackPayment)),

            function PaymentsController_initializePaystackPayment(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"PaymentInitialize"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PaymentsController();


              const promise = controller.initializePaystackPayment.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/payments/paystack/verify/webhook',
            ...(fetchMiddlewares<RequestHandler>(PaymentsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController.prototype.verifyPaystackTransaction)),

            function PaymentsController_verifyPaystackTransaction(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PaymentsController();


              const promise = controller.verifyPaystackTransaction.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/payments/paystack/dedicated-account',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController.prototype.dedicatedAccount)),

            function PaymentsController_dedicatedAccount(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PaymentsController();


              const promise = controller.dedicatedAccount.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/payments/orders/:reference',
            ...(fetchMiddlewares<RequestHandler>(PaymentsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController.prototype.handlePaidTOrderByPaymentReference)),

            function PaymentsController_handlePaidTOrderByPaymentReference(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reference: {"in":"path","name":"reference","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PaymentsController();


              const promise = controller.handlePaidTOrderByPaymentReference.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/payments/mono/verify/webhook',
            ...(fetchMiddlewares<RequestHandler>(PaymentsController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentsController.prototype.processMonoWebhookTransaction)),

            function PaymentsController_processMonoWebhookTransaction(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PaymentsController();


              const promise = controller.processMonoWebhookTransaction.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/pickuplocations',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PickupLocationController)),
            ...(fetchMiddlewares<RequestHandler>(PickupLocationController.prototype.handleAddPickUpLocation)),

            function PickupLocationController_handleAddPickUpLocation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISellerPickLocation"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PickupLocationController();


              const promise = controller.handleAddPickUpLocation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/pickuplocations',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PickupLocationController)),
            ...(fetchMiddlewares<RequestHandler>(PickupLocationController.prototype.getPickupLocations)),

            function PickupLocationController_getPickupLocations(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PickupLocationController();


              const promise = controller.getPickupLocations.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/pickuplocations/:userUuid',
            ...(fetchMiddlewares<RequestHandler>(PickupLocationController)),
            ...(fetchMiddlewares<RequestHandler>(PickupLocationController.prototype.getUserPickupLocations)),

            function PickupLocationController_getUserPickupLocations(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    userUuid: {"in":"path","name":"userUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PickupLocationController();


              const promise = controller.getUserPickupLocations.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/pickuplocations/:locationUuid',
            ...(fetchMiddlewares<RequestHandler>(PickupLocationController)),
            ...(fetchMiddlewares<RequestHandler>(PickupLocationController.prototype.handleGetPickupLocationDetails)),

            function PickupLocationController_handleGetPickupLocationDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    locationUuid: {"in":"path","name":"locationUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PickupLocationController();


              const promise = controller.handleGetPickupLocationDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/pickuplocations/:locationUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PickupLocationController)),
            ...(fetchMiddlewares<RequestHandler>(PickupLocationController.prototype.updateSellerPickUpLocation)),

            function PickupLocationController_updateSellerPickUpLocation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ISellerPickLocation"},
                    locationUuid: {"in":"path","name":"locationUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PickupLocationController();


              const promise = controller.updateSellerPickUpLocation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/pickuplocations/:locationUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PickupLocationController)),
            ...(fetchMiddlewares<RequestHandler>(PickupLocationController.prototype.deletePickupLocation)),

            function PickupLocationController_deletePickupLocation(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    locationUuid: {"in":"path","name":"locationUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PickupLocationController();


              const promise = controller.deletePickupLocation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/pricematrix/approve/:id',
            ...(fetchMiddlewares<RequestHandler>(PriceMatrixController)),
            ...(fetchMiddlewares<RequestHandler>(PriceMatrixController.prototype.handleApprovePricesMatrix)),

            function PriceMatrixController_handleApprovePricesMatrix(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PriceMatrixController();


              const promise = controller.handleApprovePricesMatrix.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/pricematrix/confirmdelivery/:id',
            ...(fetchMiddlewares<RequestHandler>(PriceMatrixController)),
            ...(fetchMiddlewares<RequestHandler>(PriceMatrixController.prototype.handleConfirmDeliveryForPricesMatrix)),

            function PriceMatrixController_handleConfirmDeliveryForPricesMatrix(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PriceMatrixController();


              const promise = controller.handleConfirmDeliveryForPricesMatrix.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/pricematrix/decline/:id',
            ...(fetchMiddlewares<RequestHandler>(PriceMatrixController)),
            ...(fetchMiddlewares<RequestHandler>(PriceMatrixController.prototype.handleDeclinePricesMatrix)),

            function PriceMatrixController_handleDeclinePricesMatrix(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PriceMatrixController();


              const promise = controller.handleDeclinePricesMatrix.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/procurements',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProcurementController)),
            ...(fetchMiddlewares<RequestHandler>(ProcurementController.prototype.handleGetMyProcurements)),

            function ProcurementController_handleGetMyProcurements(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    filter: {"in":"query","name":"filter","required":true,"ref":"ProcurementsListFilter"},
                    startDate: {"in":"query","name":"startDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
                    endDate: {"in":"query","name":"endDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProcurementController();


              const promise = controller.handleGetMyProcurements.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/procurements/:procurementUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProcurementController)),
            ...(fetchMiddlewares<RequestHandler>(ProcurementController.prototype.handleGetProcurementsDetails)),

            function ProcurementController_handleGetProcurementsDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    procurementUuid: {"in":"path","name":"procurementUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProcurementController();


              const promise = controller.handleGetProcurementsDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/procurements/invoice/:uuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProcurementController)),
            ...(fetchMiddlewares<RequestHandler>(ProcurementController.prototype.handleGetInvoiceDetails)),

            function ProcurementController_handleGetInvoiceDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    uuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProcurementController();


              const promise = controller.handleGetInvoiceDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/procurementinvoiceorders/create/procurmentinvoice/:procurementInvoiceUuid/:orderPaymentVariant',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProcurementInvoiceOrderController)),
            ...(fetchMiddlewares<RequestHandler>(ProcurementInvoiceOrderController.prototype.handleCreateOrderFromInvoice)),

            function ProcurementInvoiceOrderController_handleCreateOrderFromInvoice(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    uuid: {"in":"path","name":"procurementInvoiceUuid","required":true,"dataType":"string"},
                    orderPaymentVariant: {"in":"path","name":"orderPaymentVariant","required":true,"ref":"OrderPaymentVariant"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"CreateOrderFromInvoiceRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProcurementInvoiceOrderController();


              const promise = controller.handleCreateOrderFromInvoice.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/procurementinvoiceorders/OrdersByUuids',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProcurementInvoiceOrderController)),
            ...(fetchMiddlewares<RequestHandler>(ProcurementInvoiceOrderController.prototype.handleGetPaidOrderByUuid)),

            function ProcurementInvoiceOrderController_handleGetPaidOrderByUuid(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"orderByUuidsDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProcurementInvoiceOrderController();


              const promise = controller.handleGetPaidOrderByUuid.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/procurementinvoiceorders/:procurementInvoiceUuid/decline',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProcurementInvoiceOrderController)),
            ...(fetchMiddlewares<RequestHandler>(ProcurementInvoiceOrderController.prototype.handleDeclineInvoice)),

            function ProcurementInvoiceOrderController_handleDeclineInvoice(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    procurementInvoiceUuid: {"in":"path","name":"procurementInvoiceUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProcurementInvoiceOrderController();


              const promise = controller.handleDeclineInvoice.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/categories/all',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleGetAllCategories)),

            function ProductsController_handleGetAllCategories(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"double"},
                    pageSize: {"in":"query","name":"pageSize","required":true,"dataType":"double"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleGetAllCategories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/brands/all',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleGetAllBrands)),

            function ProductsController_handleGetAllBrands(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleGetAllBrands.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/categories/available',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleGetAvailableCategories)),

            function ProductsController_handleGetAvailableCategories(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleGetAvailableCategories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/brands/available',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleGetAvailableBrands)),

            function ProductsController_handleGetAvailableBrands(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleGetAvailableBrands.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/brands/:categoryUuid',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleGetBrandCategories)),

            function ProductsController_handleGetBrandCategories(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    isAddProduct: {"in":"query","name":"isAddProduct","required":true,"dataType":"boolean"},
                    categoryUuid: {"in":"path","name":"categoryUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleGetBrandCategories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/category/locationstates/:categoryUuid',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleGetCategoryLocationStates)),

            function ProductsController_handleGetCategoryLocationStates(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    categoryUuid: {"in":"path","name":"categoryUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleGetCategoryLocationStates.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/available/locationstates',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleGetAvailableLocationStates)),

            function ProductsController_handleGetAvailableLocationStates(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleGetAvailableLocationStates.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/category/:categoryUuid',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.categoryProducts)),

            function ProductsController_categoryProducts(request: any, response: any, next: any) {
            const args = {
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"ProductPriceSortOrder"},
                    categoryUuid: {"in":"path","name":"categoryUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.categoryProducts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/categoryInfo/:categoryUuid',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.categoryInfo)),

            function ProductsController_categoryInfo(request: any, response: any, next: any) {
            const args = {
                    categoryUuid: {"in":"path","name":"categoryUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.categoryInfo.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/brand/:brandUuid',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.brandProducts)),

            function ProductsController_brandProducts(request: any, response: any, next: any) {
            const args = {
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"ProductPriceSortOrder"},
                    brandUuid: {"in":"path","name":"brandUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.brandProducts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/brandInfo/:brandUuid',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.brandInfo)),

            function ProductsController_brandInfo(request: any, response: any, next: any) {
            const args = {
                    brandUuid: {"in":"path","name":"brandUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.brandInfo.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/products/catalogue/for/guest',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleGetProductsCatalogueForGuest)),

            function ProductsController_handleGetProductsCatalogueForGuest(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"ProductPriceSortOrder"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"ProductCatalogueFilterRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleGetProductsCatalogueForGuest.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/products/catalogue/for/loggedin',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleGetProductsCatalogueForLoggedIn)),

            function ProductsController_handleGetProductsCatalogueForLoggedIn(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"ProductPriceSortOrder"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"ProductCatalogueFilterRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleGetProductsCatalogueForLoggedIn.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/search',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleGetSearchProducts)),

            function ProductsController_handleGetSearchProducts(request: any, response: any, next: any) {
            const args = {
                    searchWord: {"in":"query","name":"searchWord","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleGetSearchProducts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/variants/:productUuid',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleProductVariantsFetch)),

            function ProductsController_handleProductVariantsFetch(request: any, response: any, next: any) {
            const args = {
                    productUuid: {"in":"path","name":"productUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleProductVariantsFetch.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleFetchCurrentUserProducts)),

            function ProductsController_handleFetchCurrentUserProducts(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleFetchCurrentUserProducts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/seller/:userUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleFetchSellerProducts)),

            function ProductsController_handleFetchSellerProducts(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    userUuid: {"in":"query","name":"userUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleFetchSellerProducts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/:productUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.getProductDetails)),

            function ProductsController_getProductDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    productUuid: {"in":"query","name":"productUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.getProductDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/guest/:productUuid',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.getPublicProductDetails)),

            function ProductsController_getPublicProductDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    productUuid: {"in":"query","name":"productUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.getPublicProductDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/products/create',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.createProducts)),

            function ProductsController_createProducts(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewProductRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.createProducts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/products/create/variant/:productUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.createProductVariant)),

            function ProductsController_createProductVariant(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    productUuid: {"in":"path","name":"productUuid","required":true,"dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewProductRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.createProductVariant.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/products/:uuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleProductUpdate)),

            function ProductsController_handleProductUpdate(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    productUuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"NewUpdateProductRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleProductUpdate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/products/:productUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleDeleteProduct)),

            function ProductsController_handleDeleteProduct(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    productUuid: {"in":"path","name":"productUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleDeleteProduct.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/products',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleDeleteProductImage)),

            function ProductsController_handleDeleteProductImage(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    productUuid: {"in":"query","name":"productUuid","required":true,"dataType":"string"},
                    keyFromCloudProvider: {"in":"query","name":"keyFromCloudProvider","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleDeleteProductImage.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/products/:productUuid/review',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.reviewProduct)),

            function ProductsController_reviewProduct(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"ProductReviewRequestDto"},
                    productUuid: {"in":"path","name":"productUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.reviewProduct.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/:productUuid/reviews',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleGetProductReviews)),

            function ProductsController_handleGetProductReviews(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    productUuid: {"in":"path","name":"productUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleGetProductReviews.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/products/catelogue/guest/:sellerUuid',
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handlePublicSellerProducts)),

            function ProductsController_handlePublicSellerProducts(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sellerUuid: {"in":"path","name":"sellerUuid","required":true,"dataType":"string"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handlePublicSellerProducts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/products/deactivate/:uuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleDeActivateProdict)),

            function ProductsController_handleDeActivateProdict(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    productUuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleDeActivateProdict.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/products/activate/:uuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductsController)),
            ...(fetchMiddlewares<RequestHandler>(ProductsController.prototype.handleActivateProdict)),

            function ProductsController_handleActivateProdict(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    productUuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductsController();


              const promise = controller.handleActivateProdict.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/productlease/productlease/request',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductLeaseController)),
            ...(fetchMiddlewares<RequestHandler>(ProductLeaseController.prototype.requestProductLease)),

            function ProductLeaseController_requestProductLease(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ProductLeaseRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductLeaseController();


              const promise = controller.requestProductLease.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/productlease/productlease/status',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductLeaseController)),
            ...(fetchMiddlewares<RequestHandler>(ProductLeaseController.prototype.productLeaseStatus)),

            function ProductLeaseController_productLeaseStatus(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductLeaseController();


              const promise = controller.productLeaseStatus.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/productlease/productlease/:uuid/payments/history',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductLeaseController)),
            ...(fetchMiddlewares<RequestHandler>(ProductLeaseController.prototype.productLeasePaymentsHistory)),

            function ProductLeaseController_productLeasePaymentsHistory(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    uuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductLeaseController();


              const promise = controller.productLeasePaymentsHistory.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/productlease/productlease/leaveintent',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductLeaseController)),
            ...(fetchMiddlewares<RequestHandler>(ProductLeaseController.prototype.processProductLeaveLeaveIntent)),

            function ProductLeaseController_processProductLeaveLeaveIntent(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductLeaseController();


              const promise = controller.processProductLeaveLeaveIntent.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/productlease/productlease/documents',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProductLeaseController)),
            ...(fetchMiddlewares<RequestHandler>(ProductLeaseController.prototype.productLeaseRequestDocs)),

            function ProductLeaseController_productLeaseRequestDocs(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProductLeaseController();


              const promise = controller.productLeaseRequestDocs.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/profile',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.getProfile)),

            function ProfileController_getProfile(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.getProfile.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/profile',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.updateProfile)),

            function ProfileController_updateProfile(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"lastName":{"dataType":"string","required":true},"firstName":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.updateProfile.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/profile/public/:phoneNumber',
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.getPublicProfile)),

            function ProfileController_getPublicProfile(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    phoneNumber: {"in":"path","name":"phoneNumber","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.getPublicProfile.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/profile/linkedbuyers',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.getBuyerProfiles)),

            function ProfileController_getBuyerProfiles(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.getBuyerProfiles.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/profile/bankaccount',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.bankAccountInfo)),

            function ProfileController_bankAccountInfo(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.bankAccountInfo.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/profile/linkedbuyers/invite',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.addBuyerToMyLinkList)),

            function ProfileController_addBuyerToMyLinkList(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"LinkBuyerToSellerRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.addBuyerToMyLinkList.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/profile/unlinkbuyer',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.handleUnlinkBuyer)),

            function ProfileController_handleUnlinkBuyer(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    userUuid: {"in":"query","name":"userUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.handleUnlinkBuyer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/profile/unlinkseller',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.handleUnlinkSeller)),

            function ProfileController_handleUnlinkSeller(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.handleUnlinkSeller.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/profile/defaultseller/acceptinvite',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.handleDefaultSellerAcceptInvite)),

            function ProfileController_handleDefaultSellerAcceptInvite(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sellerUniqueCode: {"in":"query","name":"sellerUniqueCode","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.handleDefaultSellerAcceptInvite.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/profile/bankaccount',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.saveBankAccountInfo)),

            function ProfileController_saveBankAccountInfo(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"SaveNewBankAccount"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.saveBankAccountInfo.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/profile/newpassword',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.handleSetNewPassword)),

            function ProfileController_handleSetNewPassword(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"ResetForgottenPasswordRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.handleSetNewPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/profile/resetpassword',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.resetPassword)),

            function ProfileController_resetPassword(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"ResetPasswordRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.resetPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/profile/seller/statistics',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.handleSellerDashboardStats)),

            function ProfileController_handleSellerDashboardStats(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.handleSellerDashboardStats.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/profile/seller/document',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.sellerProfileDocs)),

            function ProfileController_sellerProfileDocs(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.sellerProfileDocs.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/profile/requestcall',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.requestAcall)),

            function ProfileController_requestAcall(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.requestAcall.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/profile/upgradeToSeller',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.upgradeBuyerToSeller)),

            function ProfileController_upgradeBuyerToSeller(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.upgradeBuyerToSeller.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/profile/publicstore/:uniqueCode',
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.handleSellerPublicProfile)),

            function ProfileController_handleSellerPublicProfile(request: any, response: any, next: any) {
            const args = {
                    uniqueCode: {"in":"path","name":"uniqueCode","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.handleSellerPublicProfile.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/profile/request-bank-details-change',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProfileController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileController.prototype.handleRequestchangeBankDetailsChange)),

            function ProfileController_handleRequestchangeBankDetailsChange(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"SaveNewBankAccount"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProfileController();


              const promise = controller.handleRequestchangeBankDetailsChange.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/project',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleGetProjects)),

            function ProjectController_handleGetProjects(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    projectStatus: {"in":"query","name":"status","required":true,"ref":"ProjectStatuses"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleGetProjects.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/project/myprojects',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleGetMyProjects)),

            function ProjectController_handleGetMyProjects(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    projectStatus: {"in":"query","name":"status","required":true,"ref":"ProjectStatuses"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleGetMyProjects.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/project/subscriptions',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleGetMyProjectsSubscription)),

            function ProjectController_handleGetMyProjectsSubscription(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    projectStatus: {"in":"query","name":"status","required":true,"ref":"ProjectStatuses"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleGetMyProjectsSubscription.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/project/popularprojects',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleGetPopularProjectBaseOnSubscriptions)),

            function ProjectController_handleGetPopularProjectBaseOnSubscriptions(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleGetPopularProjectBaseOnSubscriptions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/project/unsubscriptionprojects',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleGetUserUnSubscriptionProjects)),

            function ProjectController_handleGetUserUnSubscriptionProjects(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleGetUserUnSubscriptionProjects.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/project/toplocationprojects',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleGetTopLocationProjects)),

            function ProjectController_handleGetTopLocationProjects(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleGetTopLocationProjects.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/project/myprojects/:projectUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleMyProjectFetchDetails)),

            function ProjectController_handleMyProjectFetchDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    projectUuid: {"in":"path","name":"projectUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleMyProjectFetchDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/project/:projectUuid',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleProjectFetchDetails)),

            function ProjectController_handleProjectFetchDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    projectUuid: {"in":"path","name":"projectUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleProjectFetchDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/project/subscriptions/:subscriptionUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleProjectSubscriptionFetchDetails)),

            function ProjectController_handleProjectSubscriptionFetchDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    subscriptionUuid: {"in":"path","name":"subscriptionUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleProjectSubscriptionFetchDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/project/subscriptions/:subscriptionUuid/:investorUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleFetchInvestorProjectSubscriptionDetails)),

            function ProjectController_handleFetchInvestorProjectSubscriptionDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    subscriptionUuid: {"in":"path","name":"subscriptionUuid","required":true,"dataType":"string"},
                    investorUuid: {"in":"path","name":"investorUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleFetchInvestorProjectSubscriptionDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/project/subscriptions/investor/:investorUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleGetInvestorSubscription)),

            function ProjectController_handleGetInvestorSubscription(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    investorUuid: {"in":"path","name":"investorUuid","required":true,"dataType":"string"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleGetInvestorSubscription.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/project/filterproject',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.filterProjects)),

            function ProjectController_filterProjects(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"SearchProjectDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.filterProjects.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/project/create',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.createProject)),

            function ProjectController_createProject(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewProjectRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.createProject.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/project/subscription/:projectSubscriptionPaymentVariant',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.createProjectSubscription)),

            function ProjectController_createProjectSubscription(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    projectSubscriptionPaymentVariant: {"in":"path","name":"projectSubscriptionPaymentVariant","required":true,"ref":"ProjectSubscriptionPaymentVariant"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"NewProjectSubscriptionRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.createProjectSubscription.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/project/:uuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleProjectUpdate)),

            function ProjectController_handleProjectUpdate(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    projectUuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"NewUpdateProjectRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleProjectUpdate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/project/updatestatus/:uuid/:newprojectstatus',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleProjectUpdateStatus)),

            function ProjectController_handleProjectUpdateStatus(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    projectUuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
                    newprojectstatus: {"in":"path","name":"newprojectstatus","required":true,"ref":"ProjectStatuses"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleProjectUpdateStatus.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/project/updateprojectstage/:projectUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.handleUpdateProjectStage)),

            function ProjectController_handleUpdateProjectStage(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    projectUuid: {"in":"path","name":"projectUuid","required":true,"dataType":"string"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"UpdateProjectStageRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ProjectController();


              const promise = controller.handleUpdateProjectStage.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/quoterequests/:quoteRequestUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(QuoteRequestController)),
            ...(fetchMiddlewares<RequestHandler>(QuoteRequestController.prototype.handleGetQuoteRequestDetails)),

            function QuoteRequestController_handleGetQuoteRequestDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    quoteRequestUuid: {"in":"path","name":"quoteRequestUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new QuoteRequestController();


              const promise = controller.handleGetQuoteRequestDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/quoterequests',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(QuoteRequestController)),
            ...(fetchMiddlewares<RequestHandler>(QuoteRequestController.prototype.handleNewRequestQuote)),

            function QuoteRequestController_handleNewRequestQuote(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"QuoteRequestCreateRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new QuoteRequestController();


              const promise = controller.handleNewRequestQuote.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/quoterequests/:quoteRequestUuid/seller_response',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(QuoteRequestController)),
            ...(fetchMiddlewares<RequestHandler>(QuoteRequestController.prototype.handleQuoteRequestSellerResponse)),

            function QuoteRequestController_handleQuoteRequestSellerResponse(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    quoteRequestUuid: {"in":"path","name":"quoteRequestUuid","required":true,"dataType":"string"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"deliveryFee":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"unitPrice":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new QuoteRequestController();


              const promise = controller.handleQuoteRequestSellerResponse.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/quoterequests/:quoteRequestUuid/seller_response/decline',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(QuoteRequestController)),
            ...(fetchMiddlewares<RequestHandler>(QuoteRequestController.prototype.handleQuoteRequestSellerDecline)),

            function QuoteRequestController_handleQuoteRequestSellerDecline(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    quoteRequestUuid: {"in":"path","name":"quoteRequestUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new QuoteRequestController();


              const promise = controller.handleQuoteRequestSellerDecline.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/quoterequests',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(QuoteRequestController)),
            ...(fetchMiddlewares<RequestHandler>(QuoteRequestController.prototype.handleGetMyQuoteRequests)),

            function QuoteRequestController_handleGetMyQuoteRequests(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    persona: {"in":"query","name":"persona","required":true,"ref":"Persona"},
                    pendingResponse: {"in":"query","name":"pendingResponse","required":true,"dataType":"union","subSchemas":[{"dataType":"enum","enums":["true"]},{"dataType":"enum","enums":["false"]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new QuoteRequestController();


              const promise = controller.handleGetMyQuoteRequests.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/savedproducts',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(SavedProductsController)),
            ...(fetchMiddlewares<RequestHandler>(SavedProductsController.prototype.handleSavedProducts)),

            function SavedProductsController_handleSavedProducts(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SavedProductsController();


              const promise = controller.handleSavedProducts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/savedproducts/:productUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(SavedProductsController)),
            ...(fetchMiddlewares<RequestHandler>(SavedProductsController.prototype.saveProduct)),

            function SavedProductsController_saveProduct(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    productUuid: {"in":"path","name":"productUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SavedProductsController();


              const promise = controller.saveProduct.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/savedproducts/:productUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(SavedProductsController)),
            ...(fetchMiddlewares<RequestHandler>(SavedProductsController.prototype.deleteSavedProduct)),

            function SavedProductsController_deleteSavedProduct(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    productUuid: {"in":"path","name":"productUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SavedProductsController();


              const promise = controller.deleteSavedProduct.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/temporaryorders/:orderUuid',
            ...(fetchMiddlewares<RequestHandler>(TemporaryOrdersController)),
            ...(fetchMiddlewares<RequestHandler>(TemporaryOrdersController.prototype.handleFetchTemporaryOrderDetails)),

            function TemporaryOrdersController_handleFetchTemporaryOrderDetails(request: any, response: any, next: any) {
            const args = {
                    orderUuid: {"in":"path","name":"orderUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TemporaryOrdersController();


              const promise = controller.handleFetchTemporaryOrderDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/temporaryorders/prepare',
            ...(fetchMiddlewares<RequestHandler>(TemporaryOrdersController)),
            ...(fetchMiddlewares<RequestHandler>(TemporaryOrdersController.prototype.handleTemporaryOrderPreparationFromTemporaryCart)),

            function TemporaryOrdersController_handleTemporaryOrderPreparationFromTemporaryCart(request: any, response: any, next: any) {
            const args = {
                    reqBody: {"in":"body","name":"reqBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"temporaryCartItems":{"dataType":"array","array":{"dataType":"refObject","ref":"NewCartItemRequestDto"},"required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TemporaryOrdersController();


              const promise = controller.handleTemporaryOrderPreparationFromTemporaryCart.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/temporaryorders/temporary/create/frompreparedcart',
            ...(fetchMiddlewares<RequestHandler>(TemporaryOrdersController)),
            ...(fetchMiddlewares<RequestHandler>(TemporaryOrdersController.prototype.handleTemporaryOrderCreationFromPreparedCart)),

            function TemporaryOrdersController_handleTemporaryOrderCreationFromPreparedCart(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"TemporaryOrderCreateWithSellerGroupingRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TemporaryOrdersController();


              const promise = controller.handleTemporaryOrderCreationFromPreparedCart.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/temporaryorders/temporary/paid',
            ...(fetchMiddlewares<RequestHandler>(TemporaryOrdersController)),
            ...(fetchMiddlewares<RequestHandler>(TemporaryOrdersController.prototype.handlePaidTemporaryOrder)),

            function TemporaryOrdersController_handlePaidTemporaryOrder(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reference":{"dataType":"string","required":true},"temporaryOrderUuids":{"dataType":"array","array":{"dataType":"string"},"required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TemporaryOrdersController();


              const promise = controller.handlePaidTemporaryOrder.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/upload',
            authenticateMiddleware([{"jwt":[]}]),
            upload.single('file'),
            ...(fetchMiddlewares<RequestHandler>(UploadController)),
            ...(fetchMiddlewares<RequestHandler>(UploadController.prototype.handleFileUpload)),

            function UploadController_handleFileUpload(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    file: {"in":"formData","name":"file","required":true,"dataType":"file"},
                    fileUploadCategory: {"in":"query","name":"fileUploadCategory","required":true,"ref":"UploadFileCategory"},
                    entityUuid: {"in":"query","name":"entityUuid","ref":"NullableString"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UploadController();


              const promise = controller.handleFileUpload.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/wallet/main/balance',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.mainWalletBalance)),

            function WalletController_mainWalletBalance(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.mainWalletBalance.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/wallet/withdraw',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.withdraw)),

            function WalletController_withdraw(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"WithdrawFundsRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.withdraw.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/wallet/transactions',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.financialTransactions)),

            function WalletController_financialTransactions(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.financialTransactions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/wallet/earnings',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.earnings)),

            function WalletController_earnings(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.earnings.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/wallet/secondary/balance',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.secondaryWalletBalance)),

            function WalletController_secondaryWalletBalance(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.secondaryWalletBalance.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/wallet/secondary/transactions',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletController)),
            ...(fetchMiddlewares<RequestHandler>(WalletController.prototype.secondaryDinancialTransactions)),

            function WalletController_secondaryDinancialTransactions(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WalletController();


              const promise = controller.secondaryDinancialTransactions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/warehouse',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.handleCreateNewWareHouse)),

            function WareHouseController_handleCreateNewWareHouse(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"NewWareHouseRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.handleCreateNewWareHouse.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/warehouse',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.handleFetchMyWareHouses)),

            function WareHouseController_handleFetchMyWareHouses(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.handleFetchMyWareHouses.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/warehouse/delivery-to-site',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.handleGetSiteDeliveryRequests)),

            function WareHouseController_handleGetSiteDeliveryRequests(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    startDate: {"in":"query","name":"startDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
                    endDate: {"in":"query","name":"endDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.handleGetSiteDeliveryRequests.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/warehouse/delivery-to-site/:deliveryRequestUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.handleFetchDeliveryDetails)),

            function WareHouseController_handleFetchDeliveryDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    deliveryRequestUuid: {"in":"path","name":"deliveryRequestUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.handleFetchDeliveryDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/warehouse/delivery-to-site/:deliverySiteUuid/site',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.handleFetchSingleDeliveryRquest)),

            function WareHouseController_handleFetchSingleDeliveryRquest(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    deliverySiteUuid: {"in":"path","name":"deliverySiteUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.handleFetchSingleDeliveryRquest.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/warehouse/:wareHouseUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.handleFetchWareHouseDetails)),

            function WareHouseController_handleFetchWareHouseDetails(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    wareHouseUuid: {"in":"path","name":"wareHouseUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.handleFetchWareHouseDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/warehouse/:wareHouseUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.handleDeleteWareHouse)),

            function WareHouseController_handleDeleteWareHouse(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    wareHouseUuid: {"in":"path","name":"wareHouseUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.handleDeleteWareHouse.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/warehouse/:wareHouseUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.updateNewWareHouse)),

            function WareHouseController_updateNewWareHouse(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    wareHouseUuid: {"in":"path","name":"wareHouseUuid","required":true,"dataType":"string"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"UpdateWareHouseRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.updateNewWareHouse.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/warehouse/:wareHouseUuid/sites',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.handleCreateNewWareHouseSite)),

            function WareHouseController_handleCreateNewWareHouseSite(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    wareHouseUuid: {"in":"path","name":"wareHouseUuid","required":true,"dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"WareHouseSiteRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.handleCreateNewWareHouseSite.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/warehouse/:wareHouseUuid/sites',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.handleFetchWareHouseSites)),

            function WareHouseController_handleFetchWareHouseSites(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    wareHouseUuid: {"in":"path","name":"wareHouseUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.handleFetchWareHouseSites.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/warehouse/:wareHouseUuid/product_purchase',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.getWareHouseProductPurchases)),

            function WareHouseController_getWareHouseProductPurchases(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    wareHouseUuid: {"in":"path","name":"wareHouseUuid","required":true,"dataType":"string"},
                    startDate: {"in":"query","name":"startDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
                    endDate: {"in":"query","name":"endDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.getWareHouseProductPurchases.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/warehouse/:wareHouseUuid/product_purchase/byDate',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.getWareHouseProductPurchaseByDate)),

            function WareHouseController_getWareHouseProductPurchaseByDate(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    wareHouseUuid: {"in":"path","name":"wareHouseUuid","required":true,"dataType":"string"},
                    startDate: {"in":"query","name":"startDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
                    endDate: {"in":"query","name":"endDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.getWareHouseProductPurchaseByDate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/warehouse/:wareHouseUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.getWareHouseProductOrderHistory)),

            function WareHouseController_getWareHouseProductOrderHistory(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    wareHouseUuid: {"in":"path","name":"wareHouseUuid","required":true,"dataType":"string"},
                    productUuid: {"in":"query","name":"productUuid","required":true,"dataType":"string"},
                    productPurchaseUuid: {"in":"query","name":"productPurchaseUuid","required":true,"dataType":"string"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    startDate: {"in":"query","name":"startDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
                    endDate: {"in":"query","name":"endDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.getWareHouseProductOrderHistory.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/warehouse/:wareHouseUuid/delivery-to-site',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.handleGetWareHouseToSiteDeliveryRequests)),

            function WareHouseController_handleGetWareHouseToSiteDeliveryRequests(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    sortOrder: {"in":"query","name":"sortOrder","required":true,"ref":"SortOrder"},
                    wareHouseUuid: {"in":"path","name":"wareHouseUuid","required":true,"dataType":"string"},
                    pageNumber: {"in":"query","name":"pageNumber","required":true,"dataType":"any"},
                    startDate: {"in":"query","name":"startDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
                    endDate: {"in":"query","name":"endDate","dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.handleGetWareHouseToSiteDeliveryRequests.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/warehouse/:wareHouseUuid/delivery-to-site',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.handleDeliveryRequestToSite)),

            function WareHouseController_handleDeliveryRequestToSite(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    wareHouseUuid: {"in":"path","name":"wareHouseUuid","required":true,"dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"WareHouseToDeliveryToSiteRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.handleDeliveryRequestToSite.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/warehouse/:wareHouseUuid/delivery-to-site/:deliveryRequestUuid/:acceptOrDecline',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseController.prototype.acceptDeliveryRequestToSiteFee)),

            function WareHouseController_acceptDeliveryRequestToSiteFee(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    wareHouseUuid: {"in":"path","name":"wareHouseUuid","required":true,"dataType":"string"},
                    deliveryToSiteUuid: {"in":"path","name":"deliveryRequestUuid","required":true,"dataType":"string"},
                    acceptOrDecline: {"in":"path","name":"acceptOrDecline","required":true,"ref":"AcceptOrDeclineType"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"paymentVariant":{"dataType":"union","subSchemas":[{"ref":"OrderPaymentVariant"},{"dataType":"enum","enums":[null]}]},"status":{"ref":"WareHouseToSiteDeliveryFeeStatuses","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseController();


              const promise = controller.acceptDeliveryRequestToSiteFee.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/reorderlevel',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseProductReorderLevelController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseProductReorderLevelController.prototype.handleCreateProductReorderLevel)),

            function WareHouseProductReorderLevelController_handleCreateProductReorderLevel(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"SetProductReorderLevelRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseProductReorderLevelController();


              const promise = controller.handleCreateProductReorderLevel.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/reorderlevel/:wareHouseUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseProductReorderLevelController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseProductReorderLevelController.prototype.handleFetchWareReorderLevel)),

            function WareHouseProductReorderLevelController_handleFetchWareReorderLevel(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    wareHouseUuid: {"in":"path","name":"wareHouseUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseProductReorderLevelController();


              const promise = controller.handleFetchWareReorderLevel.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/reorderlevel/:reorderLevelUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WareHouseProductReorderLevelController)),
            ...(fetchMiddlewares<RequestHandler>(WareHouseProductReorderLevelController.prototype.handleDeleteProderReorderLevel)),

            function WareHouseProductReorderLevelController_handleDeleteProderReorderLevel(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    reorderLevelUuid: {"in":"path","name":"reorderLevelUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WareHouseProductReorderLevelController();


              const promise = controller.handleDeleteProderReorderLevel.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny(secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

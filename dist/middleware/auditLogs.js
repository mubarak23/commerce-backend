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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const jwt = __importStar(require("async-jsonwebtoken"));
const db_1 = require("../db");
const AuditLogs_1 = require("../entity/AuditLogs");
const User_1 = require("../entity/User");
const error_response_types_1 = require("../utils/error-response-types");
const auditLogsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Are We Here');
    try {
        const token = req.headers["x-access-token"];
        const jwtSecret = process.env.JWT_SECRET;
        if (!token) {
            throw new error_response_types_1.UnauthorizedRequestError("Unauthorized");
        }
        const decoded = yield jwt.verify(token, jwtSecret);
        const userUuid = decoded.uuid;
        const { method, path, body } = req;
        const connection = yield (0, db_1.getFreshConnection)();
        const userRepo = connection.getRepository(User_1.User);
        const auditLogsRepo = connection.getRepository(AuditLogs_1.AuditLogs);
        const currentUser = yield userRepo.findOne({ uuid: userUuid });
        const methodActions = ['POST', 'PUT', 'PATCH', 'DELETE'];
        if (!req.path.includes('admin') && !methodActions.includes(method)) {
            next();
        }
        console.log('Audit Logs Data:', req.path, req.method);
        console.log('Next Step in the iteration');
        next();
    }
    catch (err) {
        if (err.name && err.name === 'TokenExpiredError') {
            const detailedError = new error_response_types_1.DetailedError(err.message, err.name);
            console.log("Access token expired", [detailedError]);
            next();
            //  throw new UnauthorizedRequestError("Access token expired", [detailedError]);
        }
        next();
    }
});
exports.default = auditLogsHandler;
//# sourceMappingURL=auditLogs.js.map
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
exports.transformAuditLogs = exports.saveAuditLogs = void 0;
const db_1 = require("../db");
const AuditLogs_1 = require("../entity/AuditLogs");
const saveAuditLogs = (req, currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { method, path, body } = req;
    const connection = yield (0, db_1.getFreshConnection)();
    const auditLogsRepo = connection.getRepository(AuditLogs_1.AuditLogs);
    const newAuditLogs = new AuditLogs_1.AuditLogs().initialize(currentUser.id, method, path, body);
    yield auditLogsRepo.save(newAuditLogs);
    return true;
});
exports.saveAuditLogs = saveAuditLogs;
const transformAuditLogs = (logs) => __awaiter(void 0, void 0, void 0, function* () {
    const auditLogsResponse = [];
    for (const log of logs) {
        const oneTransformLog = {
            userId: log.userId,
            method: log.method,
            path: log.path,
            payload: log.payload,
            createdAt: log.createdAt
        };
        auditLogsResponse.push(oneTransformLog);
    }
    return auditLogsResponse;
});
exports.transformAuditLogs = transformAuditLogs;
//# sourceMappingURL=auditLogService.js.map
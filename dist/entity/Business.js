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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const User_1 = require("./User");
let Business = class Business extends BaseEntity_1.default {
    initialize(userId, name, address, cacNumber) {
        this.userId = userId;
        this.name = name;
        this.address = address;
        this.cacNumber = cacNumber;
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.BusinessesColumns.USER_ID }),
    __metadata("design:type", Number)
], Business.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: TableColumns_1.BusinessesColumns.USER_ID, referencedColumnName: TableColumns_1.default.ID, }),
    __metadata("design:type", User_1.User)
], Business.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.BusinessesColumns.NAME }),
    __metadata("design:type", String)
], Business.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.BusinessesColumns.ADDRESS }),
    __metadata("design:type", String)
], Business.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.BusinessesColumns.CAC_NUMBER }),
    __metadata("design:type", String)
], Business.prototype, "cacNumber", void 0);
Business = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.BUSINESSES }),
    (0, typeorm_1.Index)(['userId'])
], Business);
exports.Business = Business;
//# sourceMappingURL=Business.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscController = void 0;
const tsoa_1 = require("tsoa");
// import countries from "../utils/countries";
const SupportedCountry_1 = require("../entity/SupportedCountry");
const FindUs_1 = require("../entity/FindUs");
const db_1 = require("../db");
const nigeria_state_and_lgas_json_1 = __importDefault(require("../resources/nigeria-state-and-lgas.json"));
const error_response_types_1 = require("../utils/error-response-types");
const typeorm_1 = require("typeorm");
// DO NOT EXPORT DEFAULT
let MiscController = class MiscController extends tsoa_1.Controller {
    getCountriesList() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const supportedCountriesRepo = connection.getRepository(SupportedCountry_1.SupportedCountry);
            const supportedCountries = yield supportedCountriesRepo.find({});
            const resData = {
                status: true,
                data: supportedCountries.map((country) => {
                    return {
                        name: country.name,
                        iso2: country.iso2,
                        phoneCode: country.phoneCode,
                        currency: country.currency,
                        currencySymbol: country.currencySymbol,
                        image: country.image,
                    };
                }),
            };
            return resData;
        });
    }
    getStates(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const resData = {
                status: true,
                data: nigeria_state_and_lgas_json_1.default.map(stateObj => stateObj.state)
            };
            return resData;
        });
    }
    getStateLocalGovernmentAreas(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundStateRecord = nigeria_state_and_lgas_json_1.default.find((stateRecord) => stateRecord.state.toLocaleLowerCase() === state.toLowerCase());
            if (!foundStateRecord) {
                throw new error_response_types_1.NotFoundError('Sorry, the specified state is not valid.');
            }
            const resData = {
                status: true,
                data: foundStateRecord.lgas
            };
            return resData;
        });
    }
    handleFindUsOptionsFetch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const findUsRepo = connection.getRepository(FindUs_1.Findus);
            const AvaiableOptions = yield findUsRepo.find({ is_available: true });
            const resData = {
                status: true,
                data: AvaiableOptions,
            };
            return resData;
        });
    }
    createCategories(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = requestBody;
            const findusRepo = (0, typeorm_1.getRepository)(FindUs_1.Findus);
            const findusOption = yield findusRepo.findOne({
                name: requestBody.name,
            });
            if (findusOption) {
                throw new error_response_types_1.ConflictError("How did you Find us option has already been created");
            }
            const createNewOption = new FindUs_1.Findus().initialize(name);
            yield findusRepo.save(createNewOption);
            yield findusRepo.createQueryBuilder()
                .update(FindUs_1.Findus)
                .set({ is_available: true })
                .where({
                id: createNewOption.id
            })
                .execute();
            this.setStatus(201);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)('/supported-countries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MiscController.prototype, "getCountriesList", null);
__decorate([
    (0, tsoa_1.Get)('/nigerianstates/:state'),
    __param(0, (0, tsoa_1.Path)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MiscController.prototype, "getStates", null);
__decorate([
    (0, tsoa_1.Get)('/state/:state/lgas'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MiscController.prototype, "getStateLocalGovernmentAreas", null);
__decorate([
    (0, tsoa_1.Get)("/findus/all"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MiscController.prototype, "handleFindUsOptionsFetch", null);
__decorate([
    (0, tsoa_1.Post)("/findus/create"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MiscController.prototype, "createCategories", null);
MiscController = __decorate([
    (0, tsoa_1.Route)("api/miscellaneous"),
    (0, tsoa_1.Tags)('Miscellaneous')
], MiscController);
exports.MiscController = MiscController;
//# sourceMappingURL=MiscController.js.map
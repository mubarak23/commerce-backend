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
exports.paginateProducts = exports.paginate = void 0;
const error_response_types_1 = require("../utils/error-response-types");
const db_1 = require("../db");
function paginate(entityClass, query, pageSize, page, sortOrder, selectFields, join) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            parseInt(typeof page === 'number' ? `${page}` : page);
        }
        catch (e) {
            throw new error_response_types_1.BadRequestError(`Specify a valid page number`);
        }
        const pageNumber = Number(page);
        const connection = yield (0, db_1.getFreshConnection)();
        const repo = connection.getRepository(entityClass);
        const totalNumber = yield repo.count(query);
        const offset = (pageNumber - 1) * pageSize;
        if (offset > totalNumber) {
            const resData = {
                pageNumber,
                total: totalNumber,
                pageSize,
                dataset: []
            };
            return resData;
        }
        const findParameters = {
            where: query,
            order: { createdAt: sortOrder },
            take: pageSize,
            skip: offset,
        };
        if (selectFields) {
            // @ts-ignore
            findParameters.select = selectFields;
        }
        if (join) {
            // @ts-ignore
            findParameters.join = join;
        }
        const pageResults = yield repo.find(findParameters);
        return {
            pageNumber,
            total: totalNumber,
            pageSize,
            dataset: pageResults
        };
    });
}
exports.paginate = paginate;
function paginateProducts(entityClass, query, pageSize, page, sortOrder, selectFields, join) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            parseInt(typeof page === 'number' ? `${page}` : page);
        }
        catch (e) {
            throw new error_response_types_1.BadRequestError(`Specify a valid page number`);
        }
        const pageNumber = Number(page);
        const connection = yield (0, db_1.getFreshConnection)();
        const repo = connection.getRepository(entityClass);
        const totalNumber = yield repo.count(query);
        const offset = (pageNumber - 1) * pageSize;
        if (offset > totalNumber) {
            const resData = {
                pageNumber,
                total: totalNumber,
                pageSize,
                dataset: []
            };
            return resData;
        }
        const findParameters = {
            where: query,
            order: { createdAt: sortOrder },
            take: pageSize,
            skip: offset,
        };
        if (selectFields) {
            findParameters.select = selectFields;
        }
        if (join) {
            findParameters.join = join;
        }
        const pageResults = yield repo.find(findParameters);
        return {
            pageNumber,
            total: totalNumber,
            pageSize,
            dataset: pageResults
        };
    });
}
exports.paginateProducts = paginateProducts;
//# sourceMappingURL=paginationService.js.map
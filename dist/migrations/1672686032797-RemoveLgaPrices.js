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
exports.RemoveLgaPrices1672686032797 = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-await-in-loop */
const typeorm_1 = require("typeorm");
const Product_1 = require("../entity/Product");
class RemoveLgaPrices1672686032797 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const products = yield productRepo.find({});
            const updateValues = products.map(product => {
                var _a;
                const newProductPrice = (product.localGovernmentAreaPrices && product.localGovernmentAreaPrices.prices.length > 0) ?
                    product.localGovernmentAreaPrices.prices[0].price : ((_a = product.price) !== null && _a !== void 0 ? _a : 0);
                return `(${product.id}, ${newProductPrice})`;
            });
            if (updateValues.length) {
                const query = `UPDATE products set 
        price = product_update.newPrice,
        local_government_area_prices = NULL

        from(values${updateValues.join(",")}) as product_update (id, newPrice)
        where products.id = product_update.id;`;
                yield productRepo.manager.query(query, []);
            }
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.RemoveLgaPrices1672686032797 = RemoveLgaPrices1672686032797;
//# sourceMappingURL=1672686032797-RemoveLgaPrices.js.map
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
const fs = __importStar(require("fs"));
const typeorm_1 = require("typeorm");
// const csv = require('csv-parser')
const csv_parse_1 = require("csv-parse");
const _ = __importStar(require("underscore"));
const Brand_1 = require("../entity/Brand");
const Category_1 = require("../entity/Category");
class AddCategoriesAndBrands1642533991446 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            this.processCategoriesAndBrandsFile();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    processCategoriesAndBrandsFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let dataRows = [];
            const filePath = `${__dirname}/../resources/CategoriesAndBrands.csv`;
            const categoryDefaultImageUrl = 'https://res.cloudinary.com/tradegrid/image/upload/v1642535072/dev/3e0fj_nngknw.png';
            const brandDefaultImageUrl = 'https://res.cloudinary.com/tradegrid/image/upload/v1642534991/dev/Brand-Identity_bireqx.jpg';
            var parser = (0, csv_parse_1.parse)({ columns: false }, function (err, records) {
                dataRows = records;
                processDataRows();
            });
            fs.createReadStream(filePath).pipe(parser);
            const categoryRepo = (0, typeorm_1.getRepository)(Category_1.Category);
            const brandRepo = (0, typeorm_1.getRepository)(Brand_1.Brand);
            const processDataRows = () => __awaiter(this, void 0, void 0, function* () {
                for (const row of dataRows) {
                    const categoryName = row[0];
                    const brandNames = _.rest(row)
                        .map(bName => this.capitalizeFirstLetter(bName.replace('|', '').trim()))
                        .filter(bName => bName.length);
                    let category = new Category_1.Category().initialize({
                        name: categoryName,
                        unitOfMeasurement: 'Bag',
                        description: ''
                    });
                    const existingCategory = yield categoryRepo.findOne({
                        name: categoryName,
                    });
                    if (existingCategory) {
                        category = existingCategory;
                    }
                    else {
                        category.image = {
                            keyFromCloudProvider: '',
                            url: categoryDefaultImageUrl,
                            mimetype: '',
                            fileCloudProvider: '',
                        };
                        category = yield categoryRepo.save(category);
                    }
                    const brands = brandNames.map(brandName => {
                        const newBrand = new Brand_1.Brand().initialize(brandName, [category]);
                        newBrand.image = {
                            keyFromCloudProvider: '',
                            url: brandDefaultImageUrl,
                            mimetype: '',
                            fileCloudProvider: '',
                        };
                        return newBrand;
                    });
                    yield brandRepo.createQueryBuilder()
                        .insert()
                        .into(Brand_1.Brand)
                        .values(brands)
                        .onConflict(`("name") DO NOTHING`)
                        .execute();
                }
                return true;
            });
        });
    }
}
exports.default = AddCategoriesAndBrands1642533991446;
//# sourceMappingURL=1642533991446-AddCategoriesAndBrands.js.map
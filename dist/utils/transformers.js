"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnNumericArrayTransformer = exports.ColumnNumericTransformer = void 0;
const core_1 = require("./core");
// export class ColumnNumericTransformer {
//   to(data: number): number {
//     return data;
//   }
//   from(data: string): number {
//     return parseFloat(data);
//   }
// }
// https://github.com/typeorm/typeorm/issues/873
class ColumnNumericTransformer {
    to(data) {
        if (!(0, core_1.isNullOrUndefined)(data)) {
            return data;
        }
        return null;
    }
    from(data) {
        if (!(0, core_1.isNullOrUndefined)(data)) {
            const res = parseFloat(data);
            if (Number.isNaN(res)) {
                return null;
            }
            return res;
        }
        return null;
    }
}
exports.ColumnNumericTransformer = ColumnNumericTransformer;
class ColumnNumericArrayTransformer {
    to(data) {
        return data;
    }
    from(data) {
        return data ? data.map(x => parseInt(x)) : undefined;
    }
}
exports.ColumnNumericArrayTransformer = ColumnNumericArrayTransformer;
//# sourceMappingURL=transformers.js.map
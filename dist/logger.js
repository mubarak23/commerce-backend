"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslog_1 = require("tslog");
const log = new tslog_1.Logger({
    name: "CinderBuild",
    maskValuesOfKeys: ['password', 'token', 'x-access-token']
});
exports.default = log;
//# sourceMappingURL=logger.js.map
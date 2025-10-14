"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getT = void 0;
const dictionary_1 = require("./dictionary");
/**
 * @param {LangList} lang Desired language
 * @returns {LangDictionary} Dictionary in the desired language
 */
const getT = (lang) => lang && lang in dictionary_1.d ? dictionary_1.d[lang] : dictionary_1.d['en'];
exports.getT = getT;
//# sourceMappingURL=utils.js.map
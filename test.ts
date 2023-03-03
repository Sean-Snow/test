import assert from "assert";

import {PatternService} from "./services/pattern.service.js";
import {RegexPatternService} from "./services/regex-pattern.service.js";
import {NineMulService} from "./services/nine-mul.service.js";


const services: Array<PatternService> = [
    // 3
    new RegexPatternService(/^\d{3}$/, ['999']),
    new RegexPatternService(/^0x\d{3}$/, ['0x999']),
    new RegexPatternService(/^(\d)\1{2}$/, ['AAA']),
    new RegexPatternService(/^(123|234|345|456|567|678|789)$/, ['ABC']),
    new RegexPatternService(/^(\d)(?!\1)(\d)\2$/, ['ABB']),
    new RegexPatternService(/^(\d)(?!\1)(\d)\1$/, ['ABA']),
    new RegexPatternService(/^(\d)\1(?!\1)(\d)$/, ['AAB']),

    // 4
    new RegexPatternService(/^\d{4}$/, ['10K']),
    new RegexPatternService(/^0x\d{4}$/, ['0x10K']),
    new RegexPatternService(/^(0123|1234|2345|3456|4567|5678|6789)$/, ['ABCD']),
    new RegexPatternService(/^(\d)\1{3}$/, ['AAAA']),
    new RegexPatternService(/^(\d)(?!\1)(\d)\2{2}$/, ['ABBB']),
    new RegexPatternService(/^(\d)\1(?!\1)(\d)\2$/, ['AABB']),
    new RegexPatternService(/^(\d)\1{2}(?!\1)\d$/, ['AAAB']),
    new RegexPatternService(/^(\d)(?!\1)(\d)\1{2}$/, ['ABAA']),
    new RegexPatternService(/^(\d)\1(?!\1)(\d)\1$/, ['AABA']),
    new RegexPatternService(/^(\d)(?!\1)(\d)\2\1$/, ['ABBA']),
    new RegexPatternService(/^(\d)(?!\1)(\d)\1\2$/, ['ABAB']),
    new RegexPatternService(/^(\d)\1(?!\1)(\d)(?!\1|\2)(\d)$/, ['AABC']),
    new RegexPatternService(/^(\d)(?!\1)(\d)(?!\1|\2)(\d)\3$/, ['ABCC']),
    new RegexPatternService(/^(\d)(?!\1)(\d)\2(?!\1|\2)(\d)$/, ['ABBC']),

    new RegexPatternService(/^0{2}\d{2}$/, ['00XX']),
    new RegexPatternService(/^0\d{3}$/, ['0XXX']),
    new RegexPatternService(/^(((0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)$/,['MMDD']),


    new NineMulService(),

    // 5
    new RegexPatternService(/^\d{5}$/, ['100K']),
    new RegexPatternService(/^(\d)(?!\1)\d{4}$/, ['ABBBB']),

    // 6
    new RegexPatternService(/^(\d){3}(?!\1)\d{3}$/, ['AAABBB']),
    new RegexPatternService(/^(\d){3}\d{3}$/, ['XXX000']),

]


/**
 * 域名检查，是否是靓号
 * @param domain 域名
 */
function detectPatterns(domain: `${string}.bit`): Set<string> {
    const name = domain.split('\.')[0];

    const result = []
    services.forEach(service => {
        result.push(...service.match(name));
    })
    console.log(name, result);
    return new Set<string>(result);
}



assert.deepEqual(detectPatterns("333.bit"), new Set(["AAA", "999"]));
assert.deepEqual(detectPatterns("2112.bit"), new Set(["ABBA", "10K"]));
assert.deepEqual(detectPatterns("45555.bit"), new Set(["ABBBB", "100K"]));
assert.deepEqual(detectPatterns("888000.bit"), new Set(["AAABBB", "XXX000"]));
assert.deepEqual(detectPatterns("0098.bit"), new Set(["10K", "AABC", "0XXX", "00XX"]));
assert.deepEqual(detectPatterns("0x9832.bit"), new Set(["0x10K"]));
assert.deepEqual(detectPatterns("0311.bit"), new Set(["ABCC", "0XXX", "10K", "MMDD"]));

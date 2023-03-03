import {PatternService} from "./pattern.service";

/**
 * 基于正则表达式匹配
 */
export class RegexPatternService implements PatternService {

    /**
     *
     * @param regex 表达式
     * @param patterns 匹配结果
     */
    constructor(private readonly regex: RegExp, private readonly patterns: string[]) {
    }

    /**
     * 对给定的数字进行匹配
     * @param name 数字域名
     * @return 匹配成功返回当前的模式，否则返回空数组
     */
    match(name: string): string[] {
        // console.log(this.regex, '=', name, ':', this.regex.test(name));
        if (this.regex.test(name)) {
            return this.patterns;
        }
        return [];
    }

}
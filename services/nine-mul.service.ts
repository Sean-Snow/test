import {PatternService} from "./pattern.service";


/**
 * 99乘法表实现
 */
export class NineMulService implements PatternService {

    match(name: string): string[] {
        if (name.length !== 4) {
            return [];
        }
        const one = name.substring(0, 1);
        const two = name.substring(1, 2);
        const result = name.substring(2);

        if (Number.parseInt(one) * Number.parseInt(two) === Number.parseInt(result)) {
            return ['99乘法表'];
        }
        return []
    }

}
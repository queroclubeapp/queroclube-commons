export default class MapUtil {

    // Assuming entries to be an iterable of [string, any], like Map's entries
    static arrayFromMapEntries(entries: Iterable<[string, any]>): any[] {
        const arrayFromMap = Array.from(entries);
        for (const value of arrayFromMap) {
            if (value[1] instanceof Map) {
                value[1] = this.arrayFromMapEntries(value[1].entries());
            }
        }
        return arrayFromMap;
    }

    // Given the function name and description, array is likely a string representing a nested array
    static mapFromArrayString(array: string | any[]): Map<string, any> | null {
        if (!array) {
            return null;
        }

        let map: Map<string, any>;
        if (typeof array === 'string' || array instanceof String) {
            map = new Map(JSON.parse(array as string));
        } else {
            map = new Map(array);
        }

        if (map) {
            for (const [key, value] of map.entries()) {
                if (value instanceof Array && value[0] instanceof Array && value[0].length === 2) {
                    const newMap = this.mapFromArrayString(JSON.stringify(value));
                    map.set(key, newMap);
                }
            }
        }
        return map;
    }

    static mapFromObject(obj: { [key: string]: any }): Map<string, any> {
        let entries: [string, any][] = [];
        entries = Object.keys(obj).map((key) => {
            let value = obj[key];
            if (value instanceof Object) {
                value = this.mapFromObject(value);  // Assuming this is the intended method call
            }
            return [key, value];
        });
        return new Map(entries);  // This line was missing in the original code
    }

    static objectFromEntries(iterable: Iterable<[string, any]>): { [key: string]: any } {
        return [...iterable].reduce((obj, [key, val]) => {
            if (val instanceof Map) {
                val = this.objectFromEntries(val);
            }
            obj[key] = val;
            return obj;
        }, {} as { [key: string]: any });
    }
}

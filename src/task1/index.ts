type FunctionWithAnyArguments = (...args: any[]) => any;

function defaultArguments(func: FunctionWithAnyArguments, defaults: { [key: string]: any }) : FunctionWithAnyArguments {
    const stringFunction = func.toString();

    function stripExistingDefault(arg: string) {
        const positionOfEquals = arg.indexOf('=');
        if (positionOfEquals > -1) {
            return arg.substring(0, positionOfEquals - 1);
        }
        return arg.trim();
    }

    function getOriginalArguments() {
        const argumentRegex = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        const args = stringFunction.match(argumentRegex);
        if (args) return args[1].split(',');
        return [];
    }

    function replaceWithDefaults(originalArguments: string[]) {
        return originalArguments.map((arg) => {
            const strippedArg = stripExistingDefault(arg);
            if (defaults[strippedArg]) return `${strippedArg} = ${defaults[strippedArg]}`;
            return arg;
        });
    }

    function getBodyOfFunction() {
        return stringFunction.substring(stringFunction.indexOf('{') + 1, stringFunction.lastIndexOf('}') -1);
    }

    const originalArguments = getOriginalArguments();
    const newArguments = replaceWithDefaults(originalArguments);
    const body = getBodyOfFunction();

    return new Function(newArguments.join(','), body) as FunctionWithAnyArguments;
}

export default defaultArguments;
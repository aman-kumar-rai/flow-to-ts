const convertFlowType = (j, flowType) => {
    if (!flowType) return j.tsAnyKeyword();

    switch (flowType.type) {
        // Basic types
        case 'NumberTypeAnnotation':
            return j.tsNumberKeyword();

        case 'StringTypeAnnotation':
            return j.tsStringKeyword();

        case 'BooleanTypeAnnotation':
            return j.tsBooleanKeyword();

        case 'VoidTypeAnnotation':
            return j.tsVoidKeyword();

        case 'NullTypeAnnotation':
            return j.tsNullKeyword();

        case 'UndefinedTypeAnnotation':
            return j.tsUndefinedKeyword();

        // Special types
        case 'MixedTypeAnnotation':
            return j.tsUnknownKeyword(); // Flow's mixed -> TypeScript's unknown

        case 'AnyTypeAnnotation':
            return j.tsAnyKeyword(); // Flow's any -> TypeScript's any

        case 'EmptyTypeAnnotation':
            return j.tsNeverKeyword(); // Flow's empty -> TypeScript's never


        default:
            console.dir(flowType);
            console.warn(`Unhandled Flow type: ${flowType.type}`);
            return j.tsAnyKeyword();
    }
}

module.exports = {
    convertFlowType
};
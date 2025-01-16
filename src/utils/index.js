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

        // Complex types
        case 'NullableTypeAnnotation':
            return j.tsUnionType([
                convertFlowType(j, flowType.typeAnnotation),
                j.tsNullKeyword()
            ]);

        case 'ArrayTypeAnnotation':
            return j.tsArrayType(
                convertFlowType(j, flowType.elementType)
            );

        case 'UnionTypeAnnotation':
            return j.tsUnionType(
                flowType.types.map(t => convertFlowType(j, t))
            );

        case 'GenericTypeAnnotation':
            if (flowType.id.name === 'Object') {
                return j.tsObjectKeyword();
            }
            return j.tsTypeReference(
                j.identifier(flowType.id.name),
                flowType.typeParameters ? j.tsTypeParameterInstantiation(
                    flowType.typeParameters.params.map(p => convertFlowType(j, p))
                ) : null
            );

        case 'ObjectTypeAnnotation':
            return j.tsTypeLiteral(
                flowType.properties.map(p => {
                    if (p.type === 'ObjectTypeProperty') {
                        return j.tsPropertySignature(
                            p.key,
                            j.tsTypeAnnotation(convertFlowType(j, p.value))
                        );
                    }
                    return p;
                })
            );


        default:
            console.warn(`Unhandled Flow type: ${flowType.type}`);
            return j.tsAnyKeyword();
    }
}

module.exports = {
    convertFlowType
};
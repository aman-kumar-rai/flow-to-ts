const flowToTSMigrater = (file, api) => {
    const j = api.jscodeshift;
    const root = j(file.source);

    root.find(j.Comment)
    .filter(path => {
        const comment = path.value.value.trim();
        return (
            // flow type annotations
            comment === '@flow' ||
            comment === '* @flow' ||
            comment.startsWith('@flow ') ||
            comment.startsWith('* @flow ') ||
            // Flow suppression comments
            // comment.includes('$FlowFixMe') ||
            // comment.includes('$FlowIgnore') ||
            // comment.includes('$FlowExpectedError') ||
            // comment.includes('$FlowIssue') ||
            // comment.includes('$FlowMissing') ||
            // comment.includes('$FlowTODO') ||
            // Flow suppression comments - using regex to catch all variations
            /\$Flow[A-Z][A-Za-z]+/.test(comment)
        );
    })
    .remove();

    return root.toSource();
}

export default flowToTSMigrater;
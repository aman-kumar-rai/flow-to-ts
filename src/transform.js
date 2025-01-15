const flowToTSMigrater = (file, api) => {
    const j = api.jscodeshift;
    const root = j(file.source);

    root.find(j.Comment)
    .filter(path => {
        const comment = path.value.value.trim();
        return (
            comment === '@flow' ||
            comment === '* @flow' ||
            comment.startsWith('@flow ') ||
            comment.startsWith('* @flow ')
        );
    })
    .remove();

    return root.toSource();
}

export default flowToTSMigrater;
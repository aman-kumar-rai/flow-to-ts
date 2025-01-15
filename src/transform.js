const flowToTSMigrater = (file, api) => {
    const j = api.jscodeshift;
    const root = j(file.source);

    // Remove flow pragma
    root.find(j.comment)
    .filter(path => path.value.value.includes('@flow'))
    .remove();

    return root.toSource();
}

export default flowToTSMigrater;
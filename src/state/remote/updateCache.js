const addNoteUpdate = {
    update(cache, {data: {addNote}}) {
        cache.modify({
            fields: {
                notes(existingNotes = [], {toReference}) {
                    return [...existingNotes, toReference(addNote)]
                },
            },
        })
    },
}
const validResponse = {
    data: {
        data: [{
            type: 'folder',
            name: '1080p',
            children: []
        },
        { type: 'file', name: 'borders_orchard_kroon.pdf', size: 76034 },
        {
            type: 'folder',
            name: 'wireless',
            children: []
        }]
    }
}
const invalidFoldersResponse = {
    data: {
        data: [{
            type: 'folder'
        },
        {
            type: 'folder'
        }]
    }
}
export { validResponse, invalidFoldersResponse }
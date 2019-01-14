require.config({
    baseUrl: './js/libs/',
    paths: {
        'mui': 'mui.min',
        'picker': 'mui.picker.min',
        'poppicker': 'mui.poppicker',
        "getuser": '../common/getuser'
    },
    shim: {
        'picker': {
            deps: ['mui']
        },
        'poppicker': {
            deps: ['mui']
        }
    }
})
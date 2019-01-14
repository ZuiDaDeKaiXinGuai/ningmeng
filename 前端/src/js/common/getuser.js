define(function() {
    var getuser = function() {
        var user = localStorage.getItem('user') || '';
        if (!user) {
            mui.ajax('/username', {
                data: {
                    name: '小黑'
                },
                type: 'post',
                success: function(data) {
                    if (data.code == 0) {
                        localStorage.setItem('user', data.mes.name)
                    }
                }
            })
        } else {
            user = user;
        }
        return user;
    }
    return getuser;
})
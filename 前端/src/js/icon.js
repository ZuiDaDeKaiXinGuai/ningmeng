require(['./js/config.js'], function() {
    require(['mui', 'getuser'], function(mui, getuser) {
        mui.init();
        var user = getuser();
        //返回
        document.querySelector('.mui-icon-back').addEventListener('tap', function() {
            location.href = 'addbill.html'
        })

        mui.ajax('/iconlist', {
            success: function(data) {
                if (data.code == 0) {
                    var pageNum = Math.ceil(data.mes.length / 8);
                    var arr = [];
                    for (var i = 0; i < pageNum; i++) {
                        arr.push(data.mes.splice(0, 8))
                    }
                    var html = '';
                    arr.map(function(v) {
                        html += `<div class="mui-slider-item"><div>`;
                        v.map(function(item) {
                            html += ` <dl>
                            <dt class='${item.icon}'></dt>
                            <dd></dd>
                        </dl>`;
                        })
                        html += `</div></div>`;
                    })
                    document.querySelector('.mui-slider-group').innerHTML = html;
                }
            }
        })

        //切换icon
        mui('.mui-slider-group').on('tap', 'dt', function() {
            phone.className = this.className;
        });
        //确认添加
        sure.addEventListener('tap', function() {
            var icon = phone.className;
            var cname = billname.value;
            var type = 1;

            mui.ajax('/addclassify', {
                data: {
                    cname: cname,
                    user: user,
                    icon: icon,
                    type: type
                },
                type: 'post',
                success: function(data) {
                    if (data.code == 0) {
                        location.href = 'addbill.html'
                    }
                }
            })
        })
    })
})
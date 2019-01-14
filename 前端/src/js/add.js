require(['./js/config.js'], function() {
    require(['mui', 'getuser', 'picker', 'poppicker'], function(mui, getuser) {
        mui.init();
        var user = getuser(),
            iid, cname, icon, money, date;
        document.querySelector('.mui-icon-back').addEventListener('tap', function() {
            location.href = 'index.html'
        })
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var day = new Date().getDate();
        billdate.innerHTML = month + '月' + day + "日";
        var type = 1;
        //选择日期
        billdate.addEventListener('tap', function() {
            var dtPicker = new mui.DtPicker({ type: 'date' });
            dtPicker.show(function(selectItems) {
                billdate.innerHTML = selectItems.m.text + '月' + selectItems.d.text + "日";
            })
        });
        //切换收入支出
        mui('.tab').on('tap', 'span', function() {
            var spns = document.querySelectorAll('.tab span');
            spns.forEach(function(v) {
                v.classList.remove('change');
            })
            this.classList.toggle('change');
            if (this.innerHTML == '支出') {
                type = 1;
            } else {
                type = 2;
            }
            renderList(type)
        });
        //点击键盘
        mui('#list').on('tap', 'li', function() {
            var tex = this.innerHTML;
            if (tex == 'X') {
                price.value = price.value.substr(0, price.value.length - 1)
            } else if (tex == '.' || tex == '0') {
                price.value = '0.';
            } else {
                price.value += tex;
            }
        });
        //渲染分类和图标
        renderList(type);

        function renderList(type) {
            mui.ajax(`/classify?type=${type}`, {
                success: function(data) {
                    if (data.code == 0) {
                        var pageNum = Math.ceil(data.mes.length / 8);
                        var arr = [];
                        for (var i = 0; i < pageNum; i++) {
                            arr.push(data.mes.splice(0, 8))
                        }
                        var html = '';
                        arr.map(function(item) {
                            html += `<div class="mui-slider-item">
                            <div>`;
                            item.map(function(val) {
                                html += `<dl data-id='${val._id}'>
                                            <dt class='${val.icon}'></dt>
                                            <dd>${val.cname}</dd>
                                         </dl>`
                            })
                            html += `</div></div>`;
                        })
                        document.querySelector('.mui-slider-group').innerHTML = html;
                        var lastitem = document.querySelector('.mui-slider-group').lastElementChild;
                        var len = lastitem.querySelectorAll('dl').length;
                        if (len == 8) {
                            document.querySelector('.mui-slider-group').innerHTML += `
                            <div class="mui-slider-item">
                                <div>
                                    <dl><dt class='mui-icon mui-icon-plusempty'></dt><dd>自定义</dd></dl>
                                </div>
                            </div>`
                        } else {
                            lastitem.children[0].innerHTML += `<dl id='diy'}><dt class='mui-icon mui-icon-plusempty'></dt><dd>自定义</dd></dl>`
                        }
                        //点击选择图标
                        mui('.mui-slider-group').on('tap', 'dl', function() {
                            document.querySelectorAll('.mui-slider-group dl').forEach(function(val) {
                                val.classList.remove('active')
                            })
                            this.classList.toggle('active');

                            iid = this.dataset.id,
                                icon = this.children[0].className,
                                cname = this.children[1].innerHTML,
                                money = mui('#price').value,
                                date = year + '-' + month + '-' + day;
                            console.log(money)

                        });
                        //点击自定义
                        diy.addEventListener('tap', function() {
                                location.href = 'icon.html'
                            })
                            //点击确定
                        sure.addEventListener('tap', function() {
                            mui.ajax('/addPay', {
                                    type: 'post',
                                    data: {
                                        cname: cname, //分类名称
                                        icon: icon,
                                        type: type, //收入支出类型
                                        user: user, //用户
                                        money: money,
                                        date: date, //时间
                                        iid: iid //usericon分类 _id
                                    },
                                    success: function(data) {
                                        console.log(data)
                                    }
                                })
                                // location.href = 'index.html'
                        })
                    }
                }
            })
        }
    })
})
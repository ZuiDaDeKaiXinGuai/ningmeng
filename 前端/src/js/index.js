require(['./js/config.js'], function() {
    require(['mui', 'picker', 'poppicker'], function(mui, picker) {

        mui.init();
        var single = document.querySelector('#single');
        var singleY = document.querySelector('#selectY');
        var nowYear = new Date().getFullYear();
        var nowMonth = new Date().getMonth() + 1;
        var dtPicker = new mui.DtPicker({ type: 'month' });
        var type = 1;

        moy();
        change();

        //选择年月
        single.addEventListener('tap', function() {
            var mondis = document.querySelector('[data-id="title-m"]');
            var pickerm = document.querySelector('[data-id="picker-m"]');
            var yeardis = document.querySelector('[data-id="title-y"]');
            var pickery = document.querySelector('[data-id="picker-y"]');
            var picker = new mui.PopPicker();
            picker.setData([{ value: 'month', text: '月' }, { value: 'year', text: '年' }]);
            picker.show(function(selectItems) {
                single.innerHTML = selectItems[0].text;
                if (selectItems[0].value == 'year') {
                    mondis.style.display = 'none';
                    pickerm.style.display = 'none';
                    yeardis.style.width = '100%';
                    pickery.style.width = '100%';
                    singleY.innerHTML = nowYear;
                } else if (selectItems[0].value == 'month') {
                    nowMonth = nowMonth * 1 < 10 ? '0' + nowMonth * 1 : now1 * 1;
                    singleY.innerHTML = nowYear + '-' + nowMonth;
                    mondis.style.display = 'inline-block';
                    pickerm.style.display = 'block';
                    yeardis.style.width = '50%';
                    pickery.style.width = '50%';
                }
            })
        })

        selectY.addEventListener('tap', function() {
            dtPicker.show(function(selectItems) {
                console.log(selectItems.y); //{text: "2016",value: 2016} 
                console.log(selectItems.m); //{text: "05",value: "05"} 
                console.log(selectItems.d); //{text: "05",value: "05"} 
                if (single.innerHTML == '年') {
                    singleY.innerHTML = selectItems.y.text;
                } else {
                    singleY.innerHTML = selectItems.y.text + '-' + selectItems.m.text;
                }
                moy();
            })
        })


        //图表切换
        mui('.tab').on('tap', 'span', function() {
            var tab = Array.from(document.querySelectorAll('.tab span'));
            tab.map(function(v) {
                v.classList.remove('active')
            })
            this.classList.toggle('active');
            type = this.dataset.type;
            change();
        })

        function change() {
            if (type == 1) {
                document.querySelector('.mui-bill-tb').style.display = 'none';
                moy();
            } else if (type == 2) {
                document.querySelector('.mui-bill-tb').style.display = 'block';
                document.querySelector('.mui-bill-month').style.display = 'none';
                document.querySelector('.mui-bill-year').style.display = 'none';
            }
        }
        //月和年切换
        function moy() {
            if (single.innerHTML == '年') {
                document.querySelector('.mui-bill-month').style.display = 'none';
                document.querySelector('.mui-bill-year').style.display = 'block';
            } else {
                document.querySelector('.mui-bill-month').style.display = 'block';
                document.querySelector('.mui-bill-year').style.display = 'none';
            }
        }
        //侧边栏
        document.querySelector('.mui-action-menu').addEventListener('tap', function() {
                mui('.mui-off-canvas-wrap').offCanvas().show();
                document.querySelector('.mui-scroll-wrapper').style.background = '#fff';
                //点击选中

                document.querySelector('.mui-scroll').addEventListener('tap', function(e) {
                    e.target.classList.toggle('active');
                    mui('#allincome').on('tap', function() {
                        if (allincome.classList.contains('active')) {
                            document.querySelectorAll('[data-type="income"]').forEach(function(v) {
                                v.classList.add('active')
                            });
                        } else {
                            document.querySelectorAll('[data-type="income"]').forEach(function(v) {
                                v.classList.remove('active');
                            });
                        }
                    })
                })

            })
            //点击添加

        addbill.addEventListener('tap', function() {
                location.href = 'addbill.html'
            })
            //主界面容器
        document.getElementsByClassName('mui-inner-wrap')[0].addEventListener('drag', function(event) {
            event.stopPropagation();
        });
    })
})
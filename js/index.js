/**
 * Created by pco2699 on 2017/03/23.
 */
$(function(){
    var margin = 150,   //ウインドウ上部からどれぐらいの位置で変化させるか
        sectionTop = new Array, //sectionのTop位置格納用
        current = -1;   //現在のカレント位置

    // ページ内 リンクをクリックした際のスクロールアニメーション
    $('a[href^="#"]').click(function(){
        // 移動先となる要素を取得
        var target = $(this.hash);
        if (!target.length) return ;
        var targetY = target.offset().top - margin;
        $('html,body').animate({scrollTop: targetY}, 500, 'swing');
        window.history.pushState(null, null, this.hash);

        return false;
    });

    //(1)各sectionの縦位置を取得
    $('.section').each(function(i) {
        sectionTop[i] = $(this).offset().top;
    });

    //init
    changeNavCurrent(0);

    //スクロールした時の処理
    $(window).scroll(function(){
        scrollY = $(window).scrollTop();

        //(2)各セクションの位置とスクロール位置を比較して、条件にあったらchangeNavCurrentを実行
        for (var i = sectionTop.length - 1 ; i >= 0; i--) {
            if (scrollY > sectionTop[i] - margin) {
                changeNavCurrent(i);
                break;
            }
        }
    });

    //(3)ナビの処理
    function changeNavCurrent(curNum) {
        if (curNum != current) {
            current = curNum;
            curNum2 = curNum + 1;//HTML順序用
            $('#nav li').removeClass('on');
            $('#nav li:nth-child(' + curNum2 +')').addClass('on');
        }
    }

    $('iframe').css('pointer-events', 'none');
    $('#access').click(function() {
        map.css('pointer-events', 'auto');
    });
    $('iframe').mouseout(function() {
        map.css('pointer-events', 'none');
    })
});
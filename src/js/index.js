requirejs.config({
    paths:{
        'jquery':'/lib/jquery-3.4.1.min'
    }
})

define(['jquery','./modules/banner','../api/server'],function($,initBanner,{bannerData,goodsData}){
    bannerData().then((res)=>{
        if(res.code == 0){
            initBanner(res.banner_list)
        }
    })

    goodsData('phone').then((res)=>{
        if(res.code == 0){
            initgoods('#phone',res)
        }
    })

    goodsData('book').then((res)=>{
        if(res.code == 0){
            initgoods('#book',res)
        }
    })

    goodsData('pad').then((res)=>{
        if(res.code == 0){
            initgoods('#pad',res)
        }
    })


    function initgoods(id,res){
        var $con = $(id);
        $con.html(`
            <h2 class="goods_title">${res.title}</h2>
            <ul class="goods_list clearfix">
            ${
                res.goods_list.map((v,i)=>{
                    return`
                        <li>
                            <a href='/view/detail.html?type=${res.type}&id=${v.goodsId}' target="_blank">
                                <div><img src="${v.goodsImg}" alt=""></div>
                                <h3>${v.goodsName}</h3>
                                <p>¥${v.goodsPrice}</p>
                            </a>
                        </li> 
                    `
                }).join('')
            }
            </ul>
        `)
    }

})
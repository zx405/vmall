define(['jquery'],function($){
    function bannerData(){
        return $.ajax('/api/mock/banner.json')
    }
    function banner2Data(){
        return $.ajax('/api/mock/banner2.json')
    }

    function goodsData(type){
        return $.ajax(`/api/mock/${type}.json`)
    }
    return {
        bannerData,
        banner2Data,
        goodsData
    }

})
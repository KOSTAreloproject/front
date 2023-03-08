$(() => {
//--인기상품 출력(찜하기순) START--//
  function showzlist(zurl, start) {
    let $origin = $('div.zzimlist').first()
    let condition = 'sort=zzim'
    $('div.zzimlist').not(':first-child').remove()
    $origin.show()
    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: zurl+start,
      method: 'get',
      data: condition,
      success: function (jsonObj) {
        let $parent = $('div.zzim')
        let sNum = ""
        $(jsonObj).each((index, p) => {
          let $copy = $origin.clone()
          let sName = p.sname
          let sHopePrice = p.shopePrice
          let maxPrice = p.maxPrice
          let pNum = p.pnum
          sNum = p.snum
          let enddate = p.pendDate.substring(0,10)
          
          if (maxPrice != 0) {
            sHopePrice = maxPrice
            $copy.find('div.zaprice').html('최고입찰가 : ' + sHopePrice + '원')
          }
          if (maxPrice == 0) {
            $copy.find('div.zaprice').html('희망판매가 : ' + sHopePrice + '원')
          }
          let $imgObj = $('<img>')
          $imgObj.attr("id",'z'+sNum)
          $imgObj.attr('height', '250px')
          $copy.find('div.zimg').empty().append($imgObj)
          $copy.find('div.zsname').html(sName)
          $copy.find('div.zenddate').html('경매마감일 : ' + enddate)
          $copy.find('div.zpnum').html(pNum)
          $copy.find('div.zsnum').html(sNum)
          $parent.append($copy)
          
          zimgShow(sNum)
        })
        
        $($origin).detach()
        $('div.zzimlist').hide()
        $('div.zzimlist').slice(0, 5).show()
      },
      error: function (xhr) {
        alert(xhr.status)
      },
    })
  }
//--인기상품 출력(찜하기순) END--//
//--인기상품 이미지 출력(찜하기순) START--//
  function zimgShow(zsnum){
  $.ajax({
      xhrFields: {
        responseType: 'blob',
        withCredentials: true,
        cache: false, 
      },
      url: backUrl+'product/list/img/'+zsnum,
      method: "get",
      success: function (result) {
        let blobStr = URL.createObjectURL(result)
        $('img#z'+zsnum).attr('src', blobStr)
      },
      error: function (xhr) {
        console.log(xhr.status)
      },
    })
  }
//--인기상품 이미지 출력(찜하기순) END--//
let zurl = backUrl + 'product/shop/'
showzlist(zurl,0)
//--마감임박상품 출력 START--//
  function showdlist(durl, start) {
  
    let $origin = $('div.deadlinelist').first()
    $('div.deadlinelist').not(':first-child').remove()
    $origin.show()
    let condition = 'sort=pend'
    
    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: durl+start,
      method: 'get',
      data: condition,
      success: function (jsonObj) {
        let $origin = $('div.deadlinelist').first()
        let $parent = $('div.deadline')
        let sNum = ""
        $(jsonObj).each((index, p) => {
          let $copy = $origin.clone()
          let sName = p.sname
          let sHopePrice = p.shopePrice
          let maxPrice = p.maxPrice
          let pNum = p.pnum
          sNum = p.snum
          let enddate = p.pendDate.substring(0,10)
          if (maxPrice != 0) {
            $copy.find('div.daprice').html('최고입찰가 : ' + maxPrice + '원')
          }
          if (maxPrice == 0) {
            $copy.find('div.daprice').html('희망판매가 : ' + sHopePrice + '원')
          }
          let $imgObj = $('<img>')
          $imgObj.attr("id",'d'+sNum)
          $imgObj.attr('height', '200px')
          $copy.find('div.dimg').empty().append($imgObj)
          $copy.find('div.dsname').html(sName)
          $copy.find('div.denddate').html('경매마감일 : ' + enddate)
          $copy.find('div.dpnum').html(pNum)
          $copy.find('div.dsnum').html(sNum)
          $parent.append($copy)
          
          dimgShow(sNum)
        })
        
        $($origin).detach()
        $('div.deadlinelist').hide()
        $('div.deadlinelist').slice(0, 5).show()
      },
      error: function (xhr) {
        alert(xhr.status)
      },
    })
  }
//--마감임박상품 출력 END--//
//--마감임박상품 이미지 출력 START--//
  function dimgShow(dsnum){
    $.ajax({
      xhrFields: {
        responseType: 'blob',
        withCredentials: true,
        cache: false, 
      },
      url: backUrl+'product/list/img/'+dsnum,
      method: "get",
      success: function (result) {
        let blobStr = URL.createObjectURL(result)
        $('img#d'+dsnum).attr('src', blobStr)
      },
      error: function (xhr) {
        console.log(xhr.status)
      },
    })
  }
//--마감임박상품 이미지 출력 END--//
  let durl = backUrl + 'product/shop/'
  showdlist(durl,0)
//--스타일게시판 출력(인기순) START--//
  function showslist() {
    let url = backUrl + 'style/list/2'
    let $origin = $('div.styleboardlist').first()
    $('div.styleboardlist').not(':first-child').remove()
    $origin.show()
    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      method: 'get', 
      success: function (jsonObj) {
        let list = jsonObj.list
        let $origin = $('div.styleboardlist').first()
        let $parent = $('div.styleboard')
        let styleNum = ""
        
        $(list).each((index, p) => {
          let id = p.member.id
          styleNum = p.styleNum
          let styleLikes = p.likesList.length
          let $copy = $origin.clone()
          
          let $imgObj = $('<img>')
          $imgObj.attr("id",'s'+styleNum)
          $imgObj.attr('height', '200px')
          $copy.find('div.simg').empty().append($imgObj)
          $copy.find('div.stid').html('글쓴이 : ' + id)
          $copy.find('div.stlike').html('좋아요 : ' + styleLikes)
          $copy.find('div.stnum').html(styleNum)
          $parent.append($copy)
          simgShow(styleNum)
        })
        $($origin).detach()
        $('div.styleboardlist').hide()
        $('div.styleboardlist').slice(0, 5).show()
      },
      error: function (xhr) {
        alert(xhr.status)
      },
    })      
  }
//--스타일게시판 출력(인기순) END--//
//--스타일게시판 이미지 띄우기 START--//
  function simgShow(num){
    $.ajax({
      xhrFields: {
        responseType: 'blob',
        withCredentials: true,
        cache: false, 
      },
      url: backUrl+'style/list/img/'+num,
      method: "get",
      success: function (result) {
        let blobStr = URL.createObjectURL(result)
        $('img#s'+num).attr('src', blobStr)
      },
      error: function (xhr) {
        console.log(xhr.status)
      },
    })
  }
//--스타일게시판 이미지 띄우기 END--//
showslist()
//--인기상품 클릭하면 상세로 이동 START--//
  $('div.zzim').on('click', 'div.zzimlist', (e) => {
    let pNum = $(e.target).parents('div.zzimlist').find('div.zpnum').html()
    location.href = frontUrl +'shopproductdetail.html?pNum=' + pNum
  })
//--인기상품 클릭하면 상세로 이동 END--//
//--마감임박상품 클릭하면 상세로 이동 START--//
  $('div.deadline').on('click', 'div.deadlinelist', (e) => {
    let pNum = $(e.target).parents('div.deadlinelist').find('div.dpnum').html()
    location.href = frontUrl +'shopproductdetail.html?pNum=' + pNum
  })
//--마감임박상품 클릭하면 상세로 이동 END--//  
//--Style 게시글 클릭하면 상세로 이동 START--//
  $('div.styleboard').on('click', 'div.styleboardlist', (e) => {
    let styleNum = $(e.target).parents('div.styleboardlist').find('div.stnum').html()
    location.href = frontUrl+ 'styleinfo.html?styleNum=' + styleNum
  })
//--Style 게시글 클릭하면 상세로 이동 END--// 
//--롤링배너 START--//
  $('section.slideshow').slick()
  function AutoSlide(){
    let $target = $('section.slideshow.slick-initialized.slick-slider > button.slick-next.slick-arrow')
    $target.click()
  }
  setInterval(AutoSlide, 4000)
//--롤링배너 END--//
//--인기상품목록 더보기 버튼 클릭시 START--//
  $(document).on('click', '.zmoreview', (e) => {
    e.preventDefault()
    let $zzimHidden = $('div.zzimlist:hidden')
    $zzimHidden.slice(0, 5).show()
    if($zzimHidden.length=='0'){
      location.href = frontUrl + 'shoplist.html' 
    }
    
  })
//--인기상품목록 더보기 버튼 클릭시 END--//
//--마감임박 상품목록 더보기 버튼 클릭 START--//
  $(document).on('click', '.dmoreview', (e) => {
    e.preventDefault()
    let $deadlineHidden = $('div.deadlinelist:hidden')
    $deadlineHidden.slice(0, 5).show()
    if($deadlineHidden.length=='0'){
      location.href = frontUrl = 'shoplist.html'
    }
  })
//--마감임박 상품목록 더보기 버튼 클릭 END--//
//--스타일목록 더보기 버튼 클릭 START--//
  $(document).on('click', '.smoreview', (e) => {
    // 클릭시 more
    e.preventDefault()
    location.href = frontUrl+ 'stylelist.html'
  })
//--스타일목록 더보기 버튼 클릭 END--//
})
$(()=>{
    //--검색어를 입력하고 엔터키를 눌렀을때 실행 START
    $('#searchform>input').keydown(function (e){
        if(e.keyCode ==13){
        location.href = './shoplist.html'  
        }
    })
    //--검색어를 입력하고 엔터키를 눌렀을때 실행 END
    //--상의카테고리 버튼을 눌렀을때 실행 START
      $(document).on('click', '#top',(e) =>{
        location.href = './shoplist.html'  
        })  
    //--상의카테고리 버튼을 눌렀을때 실행 END
    //--하의카테고리 버튼을 눌렀을때 실행 START
      $(document).on('click', '#bottom',(e) =>{
        location.href = './shoplist.html'  
        })  
    //--하의카테고리 버튼을 눌렀을때 실행 END
    //--신발카테고리 버튼을 눌렀을때 실행 START
     $(document).on('click', '#shoes',(e) =>{
        location.href = './shoplist.html'  
        })  
    //--신발카테고리 버튼을 눌렀을때 실행 END
 



//--신발카테고리 버튼을 눌렀을때 실행 START
//--검색버튼을 눌렀을때 모달창 실행 START--
  $(document).on('click', 'div.bottom > nav > ul > li.search > img',(e) =>{
    e.preventDefault();
    $('#popup_background').css('display','block')
    $('#popup').css('display','block')
    })    
//--검색버튼을 눌렀을때 모달창 실행 END--
//--닫기버튼(x)을 클릭했을 때 할일 START--
    $(document).on('click', '#popup_background>img',(e) =>{
    e.preventDefault();
    $('#popup_background').css('display','none')
    $('#popup').css('display','none')
    })
//--닫기버튼(x)을 클릭했을 때 할일 END--    
})
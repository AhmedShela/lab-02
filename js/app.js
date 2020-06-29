'use strict';
const text = `<section class="photo-template" id="photo-template">
<h2></h2>
<img src="" alt="">
<p></p>
</section>`;
function MyImage(imgUrl,title,description,keyword,horns){
    this.imageUrl = imgUrl;
    this.imageTitle = title;
    this.imageDesc = description;
    this.imageKeyWord = keyword;
    this.imageHorns = horns;
    MyImage.all.push(this);
}
MyImage.all = [];
var keywordArr = [];
MyImage.prototype.renderImage = function(){
    let imageClone = $('.photo-template').clone();
    imageClone.removeClass('photo-template')
    // imageClone.attr('class','photo-template');
    imageClone.children('img').attr('src',this.imageUrl);
    imageClone.children('h2').text(this.imageTitle);
    imageClone.children('p').text(this.imageDesc);
    // console.log(imageClone);
    $('main').append(imageClone);    
}
const ajaxSettings = {
    method:'get',
    datatype: 'json'
}
$.ajax('data/page-1.json',ajaxSettings)
    .then(data => {
        // console.log(data);
        data.forEach(e => {
            let image = new MyImage(e.image_url,e.title,e.description,e.keyword,e.horns)
            if (keywordArr.includes(e.keyword) == false){
                keywordArr.push(e.keyword)
                console.log(keywordArr);
                
            }
            image.renderImage();
        });
        $('.photo-template').remove();
        renderFilter();

        // $('main:first').remove();
        //    console.log(data); 
        // data.forEach((val,idx)=>{
        //     // console.log(val);
        //     let person = new Person(val.name);
        //     person.render();
        // })
    });

function renderFilter(){
    console.log('start');
    
    keywordArr.forEach(element => {
        let optionClone = $('.option').clone();
        optionClone.removeClass('option');
        optionClone.attr('value',element)
        optionClone.text(element);
        // console.log(imageClone);
        $('select').append(optionClone);
    });
}
$('select').on('click',function(event){
    // console.log('hi');
    $('main').html(text);
    if(event.target.value == 'default'){
        MyImage.all.forEach(element =>{
                element.renderImage();
        });
    }else{
        MyImage.all.forEach(element =>{
            if(element.imageKeyWord == event.target.value){
                console.log(event.target.value);
                element.renderImage();
            }
        });
    }
});
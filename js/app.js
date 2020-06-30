'use strict';
const text = `<section class="photo-template" id="photo-template">
<h2></h2>
<img src="" alt="">
<p></p>
</section>`;
function MyImage(imgUrl, title, description, keyword, horns) {
    this.imageUrl = imgUrl;
    this.imageTitle = title;
    this.imageDesc = description;
    this.imageKeyWord = keyword;
    this.imageHorns = horns;
    MyImage.all.push(this);
}
MyImage.all = [];
var keywordArr = [];
var imagesInShow = [];
var trans;
MyImage.prototype.renderImage = function () {
    // let imageClone = $('.photo-template').clone();
    // imageClone.removeClass('photo-template');
    // imageClone.children('img').attr('src',this.imageUrl);
    // imageClone.children('h2').text(this.imageTitle);
    // imageClone.children('p').text(this.imageDesc);
    let musTemplet = $('#template').html();
    // console.log(musTemplet);

    var text = Mustache.render(musTemplet, this);
    // console.log(this);
    $('main').append(text);
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
  
const ajaxSettings = {
    method: 'get',
    datatype: 'json'
}
function fire(pageUrl) {
    $('main').html('');
    MyImage.all = [];
    keywordArr = [];
    $.ajax(pageUrl, ajaxSettings).then(data => { // console.log(data);
        data.forEach(e => {
            let image = new MyImage(e.image_url, e.title, e.description, e.keyword, e.horns)
            if (keywordArr.includes(e.keyword) == false) {
                keywordArr.push(e.keyword)
                // console.log(keywordArr);

            }image.renderImage();
        });
        renderFilter();
        // MyImage.all = MyImage.all.sort((a, b) => (a.imageTitle > b.imageTitle) ? 1 : -1);
        imagesInShow = MyImage.all
        // $('.photo-template').remove();

        // $('main:first').remove();
        //    console.log(data);
        // data.forEach((val,idx)=>{
        //     // console.log(val);
        //     let person = new Person(val.name);
        //     person.render();
        // })
    });
}

function renderFilter() { // console.log('start');
    $('select').html('<option class="option" value="default">Filter by Keyword</option>');
    keywordArr.forEach(element => {
        let optionClone = $('.option').clone();
        optionClone.removeClass('option');
        optionClone.attr('value', element)
        optionClone.text(element);
        // console.log(imageClone);
        $('select').append(optionClone);
    });
}
$('select').on('click', function (event) { // console.log('hi');
    $('main').html('');
    imagesInShow = [];
    if (event.target.value == 'default') {
        MyImage.all.forEach(element => {
            element.renderImage();
            // to know th images that is shown in the list
            imagesInShow.push(element);
        });
        // $('.photo-template').remove();
    } else {
        MyImage.all.forEach(element => {
            if (element.imageKeyWord == event.target.value) { // console.log(event.target.value);
                element.renderImage();
                // to know th images that is shown in the list
                imagesInShow.push(element);
            }
        });
        // $('.photo-template').remove();
    }
});
$('#page1').on('click', function (event) {
    $('#page1').css('background-color','maroon');
    $('#page2').css('background-color','#7b5e5e');

    fire('data/page-1.json');
})
$('#page2').on('click', function (event) {
    $('#page2').css('background-color','maroon');
    $('#page1').css('background-color','#7b5e5e');
    fire('data/page-2.json');
})
$('#textSort').on('click',function(){
    $('main').html('');
    $('#textSort').css('background-color','maroon');
    $('#hornsSort').css('background-color','#7b5e5e');
    imagesInShow.sort(dynamicSort('imageTitle'))
    console.log(imagesInShow.sort((a, b) => (a.imageTitle > b.imageTitle) ? 1 : -1));
    imagesInShow.forEach(element =>{
        element.renderImage();
    });
})
$('#hornsSort').on('click',function(){
    $('main').html('');
    $('#hornsSort').css('background-color','maroon');
    $('#textSort').css('background-color','#7b5e5e');
    imagesInShow.sort(dynamicSort('imageTitle'))
    console.log(imagesInShow.sort((a, b) => (a.imageHorns > b.imageHorns) ? 1 : -1));
    imagesInShow.forEach(element =>{
        element.renderImage();
    });
})
fire('data/page-1.json');

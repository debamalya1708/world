

window.addEventListener("load", function (event) {
  viewSingleVideo();
}, false);

window.addEventListener("load", function (event) {
  onClickEventPrint();
}, false);

window.addEventListener("load", function () {
  onClickEvent();
}, false);

window.addEventListener("load", function () {
  check();
}, false);


window.addEventListener("load", function () {
  logInCheck();
}, false);
// window.addEventListener("load", function () {
//   relatedSection();
// }, false);

function categoryLoad(){
  console.log("category");
  $.ajax({
    url: "http://localhost:3000/api/v1/category",
    type: "GET",
    //data: JSON.stringify(obj1),
    dataType : 'json',
    crossorigin: true,
    crossDomain: true,
    contentType:'application/json; charset=utf-8',
    success: function (response) {
      response = response.data
      var ele = document.getElementById('sel');
      for (var i = 0; i < response.length; i++) {
        ele.innerHTML = ele.innerHTML +
        `<li ><a class="dropdown-item" onclick='viewSingleCategory("${response[i].name}")'   href="#">${response[i].name}</a></li>
        <li><hr class="dropdown-divider"></li>`;

      }
    },
  error: function(error){
      alert("Something went wrong", error);
    }
  });
}

function languageLoad(){
  console.log("language");
    $.ajax({
      url: "http://localhost:3000/api/v1/languages",
      type: "GET",
      //data: JSON.stringify(obj1),
      dataType : 'json',
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
      success: function (response) {
        response = response.data
        
        var ele = document.getElementById('lang');
        for (var i = 0; i < response.length; i++) {
          ele.innerHTML = ele.innerHTML +
          `<li ><a class="dropdown-item" onclick='viewSingleLanguage("${response[i].name}")'   href="#">${response[i].name}</a></li>
          <li><hr class="dropdown-divider"></li>`;
        }
      },
    error: function(error){
        alert("Something went wrong", error);
      }
    });
  }

  var logInUserName =""
  var authenticateUserId=0

function logInCheck() {
  var token = localStorage.getItem("user");
  $.ajax({
    url: "http://localhost:3000/api/v1/members",
    type: "GET",
    // headers: {"Authorization" : "Bearer "+token},
    contentType: 'application/json',
    headers: {
      'Authorization': token
    },
    success: function (response) {
      console.log(response.data);
       authenticateUserId = response.data.id
      document.getElementById("profile").style.display = "initial";
      document.getElementById("displayForm").style.display = "initial";
      document.getElementById("upload").style.display = "none";
      document.getElementById("profile").innerText = response.data.name;
      logInUserName = response.data.name;
      getLikeVideos(authenticateUserId);
    },
    error: function (error) {
      // console.log("Something went wrong", error);
      document.getElementById("noUser").style.display = "initial";

    }
  });
}


function getLikeVideos(id){
  var token = localStorage.getItem("user");
  console.log(id)
  $.ajax({
    url: "http://localhost:3000/api/v1/like/"+id,
    type: "GET",
    // headers: {"Authorization" : "Bearer "+token},
    contentType: 'application/json',
    headers: {
      'Authorization': token
    },
    success: function (response) {
      // response = response.data
      console.log(response);
      // console.log(response.data);
      var videoId = getParameterByName("id");
      // console.log(videoId);
if(response!=null){
  console.log(videoId);
  for(var i=0;i<response.length;i++){
    if(parseInt(videoId)==parseInt(response[i].video_id)){
      console.log(videoId);
      document.getElementById("alreadyLike").style.display = "initial";
      document.getElementById("addLike").style.display = "none";
      break;
    }
    else{
      document.getElementById("addLike").style.display = "initial";
    }
  }
}
else{
  document.getElementById("addLike").style.display = "initial";
}
  },
    error: function (error) {
      console.log("Something went wrong", error);

    }
  });
}



function profile(){
  window.location.href = "profile.html";
}

function loginCall(){
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "initial";
  
}
function signUpCall(){
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "initial";
  // document.getElementById("modalImage").style.display = "none";
  
  
}

///////////////////////////////////////category click///////////////////////////////////////
function viewSingleCategory(name){
console.log('category video view');
window.location.href = "category.html?category="+name;
console.log(name);
}

////////////////////////////////Language Click///////////////////////////////////////////

function viewSingleLanguage(name){
console.log('language video view');
window.location.href = "language.html?language="+name;
console.log(name);
}

var videoLanguage=""
var videoCategory=""
var relatedContent = ""


var userId

function viewSingleVideo() {
  var id = getParameterByName("id");
  // console.log(id);
  $.ajax({
    url: "http://localhost:3000/api/v1/all/" + id,
    type: "GET",
    crossorigin: true,
    crossDomain: true,
    contentType: 'application/json; charset=utf-8',

    success: function (response) {
      // SameCategoryMovie(response.category,response.id);
      // console.log(response);
      response = response.data
      userId = response.user.id

      // videoLanguage = response.language
      // videoCategory = response.category
      relatedSection(response.category,response.id)

      content = `<video id="myVideo" width="980" height="540" class="player" controls autoplay muted>
               <source src="${response.video_file}" type="video/mp4">
            </video>`
            comment =""
for(var i = 0;i<response.comments.length;i++){
  comment += `<div class="userComment">
  <span class="commentHeader">
    <p id="commenterName">${response.comments[i].name}</p>
    <p id="commentDate"> : ${response.comments[i].created_at.slice(0, 10)}</p>
  </span>
  <p id="commentBody">${response.comments[i].body}</p>
  <hr class="mb-2 mt-1" />
</div>`
}
            

      $("#videoSection").html(content);
      $("#displayComment").html(comment);
      
      var video_title = response.title
      var id = response.id
      // var r=response
      // console.log(r)

      var user_name
      if (response.uploder == '') {
        user_name = "Anonymous"
      }
      else {
        user_name = response.user.name
      }

      if(response.uploder==""){
        document.getElementById("goToProfile").style.display="none"
      }

      var res = video_title + "    -     " + user_name


      document.querySelector("title").innerText = response.title
      document.querySelector("#title").innerText = res
      document.querySelector("#counts").innerText = response.comments.length
      document.querySelector("#desc").innerText = response.description

      // document.querySelector('#cov_image').innerHTML =
      //  '<div class="colorArea"></div><img src="' + response.coverImg + '"/>';
      document.querySelector("#views_val").innerText = response.views
      document.querySelector("#date_val").innerText = response.created_at.slice(0, 10)
      document.querySelector("#category_val").innerText = response.category


      document.querySelector("#language_val").innerText = response.likes

      $("#container").html(content);

      var id1 = response.id.toString();

      var hashPwd = generateHash(id1);
      var res = localStorage.getItem(hashPwd);
      // console.log(hashPwd); 
      if (res != "yes") {
        views(id);
      }

      var vid = document.getElementById("myVideo");
      vid.autoplay = true;
      vid.load();

    },
    error: function (error) {
      console.log("Something went wrong", error);
    }
  });
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function onClickEventPrint() {
  // console.log("category");
  $.ajax({
    url: "http://localhost:3000/api/v1/category",
    type: "GET",
    //data: JSON.stringify(obj1),
    dataType: 'json',
    crossorigin: true,
    crossDomain: true,
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      response = response.data
      var ele = document.getElementById('sel');
      for (var i = 0; i < response.length; i++) {
        ele.innerHTML = ele.innerHTML +
          `<li ><a class="dropdown-item" onclick='viewSingleCategory("${response[i].name}")'   href="#">${response[i].name}</a></li>
        <li><hr class="dropdown-divider"></li>`;

      }
    },
    error: function (error) {
      alert("Something went wrong", error);
    }
  });
}
function onClickEvent() {
  // console.log("language");
  $.ajax({
    url: "http://localhost:3000/api/v1/languages",
    type: "GET",
    //data: JSON.stringify(obj1),
    dataType: 'json',
    crossorigin: true,
    crossDomain: true,
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      response = response.data
      var ele = document.getElementById('lang');
      for (var i = 0; i < response.length; i++) {
        ele.innerHTML = ele.innerHTML +
          `<li ><a class="dropdown-item" onclick='viewSingleLanguage("${response[i].name}")'   href="#">${response[i].name}</a></li>
        <li><hr class="dropdown-divider"></li>`;
      }
    },
    error: function (error) {
      alert("Something went wrong", error);
    }
  });
}

///////////////////////////watch for later//////////////////////////////////////

let arr = [];

function watchLater() {
  var id = getParameterByName("id");
  if (window.localStorage["Favourites"] != null)
    arr = JSON.parse(window.localStorage["Favourites"]);



  arr.push(id);
  window.localStorage["Favourites"] = JSON.stringify(arr);
  localStorage.setItem(`${id}`, "remove");
  // console.log(arr)
  document.getElementById("add").style.display = "none";
  document.getElementById("remove").style.display = "initial";

}
function add() {
  document.getElementById("add").style.display = "none";
  document.getElementById("remove").style.display = "initial";
}

function removed() {

  var store = localStorage.getItem("Favourites");
  var fav = JSON.parse(store);
  var id = getParameterByName("id");
  const index = fav.indexOf(id);
  if (index > -1) {
    fav.splice(index, 1);

  }
  window.localStorage["Favourites"] = JSON.stringify(fav);
  localStorage.setItem(`${id}`, "add");
  document.getElementById("remove").style.display = "none";
  document.getElementById("add").style.display = "initial";

}

function deleting() {
  document.getElementById("remove").style.display = "none";
  document.getElementById("add").style.display = "initial";
}

function check() {
  var id = getParameterByName("id");
  var val = localStorage.getItem(`${id}`);
  if (val == "remove") {
    add();
  }
  if (val == "add") {

    deleting();
  }

}

//////////////////////////////views  section ////////////////////////////////////////

function views(id) {
  // var id= getParameterByName("id");
  var s = id.toString();
  $.ajax({
    url: "http://localhost:3000/api/v1/all/" + id,
    type: "PUT",
    // data: JSON.stringify(r),
    //dataType : 'json',
    crossorigin: true,
    crossDomain: true,
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      // console.log(response);

      var hashPwd = generateHash(s);

      localStorage.setItem(hashPwd, "yes");
    },
    error: function (error) {
      console.log("Something went wrong", error);
    }
  });
}



//////////////////////////////like  section ////////////////////////////////////////

function likeVideo() {
  var video_id = getParameterByName("id");
  // console.log(logInUserName);
  let arr={}
  arr["user_id"]= parseInt(authenticateUserId)
  arr["video_id"] = parseInt(video_id)
  let dic={}
  dic["like"] = arr
  console.log(dic);
  var token=localStorage.getItem("user");
  $.ajax({
    url: "http://localhost:3000/api/v1/like/",
    type: "POST",
    data: JSON.stringify(dic),
    crossorigin: true,
    crossDomain: true,
    headers: {
        'Authorization':token
     },
    contentType:'application/json; charset=utf-8',
  success: function (response) {

      console.log(response);
      location.reload();
  },
  error: function(error){
    alert("Something went wrong");
  }
  });
}


function relatedSection(category,video_id) {
  console.log(category)
  $.ajax({
    url: "http://localhost:3000/api/v1/all/category/"+category,
    type: "GET",
    //data: JSON.stringify(obj1),
    dataType: 'json',
    crossorigin: true,
    crossDomain: true,
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      console.log(response);
      response = response.data
      // document.querySelector("#categoryDisplay").innerText = category

      // content="";
      for (var i = response.length - 1; i >= 0; i--) {
        if(response[i].id!=video_id){
          var img = response[i].thumbnail_image;
          var title = response[i].title;
          var userName = response[i].uploder;
          var date = response[i].created_at.slice(0, 10);
          var views = response[i].views;
          var id = response[i].id;
          // console.log(id);
          if (userName == "") {
            userName = ""
          }
  
          // content+='<div class="col-md-4 mt-3"><div class="card"><div class="card-body"><div class="card-img-actions"> <img src="'+img+'" class="card-img img-fluid" width="90" height="350" alt=""> </div></div><div class="card-body text-center"><div class="mb-2"><h3 class="font-weight-semibold mb-2"> <a href="#" class="text-default mb-2" data-abc="true">'+title+'</a> </h3> <a href="#" class="text-muted" data-abc="true">'+category+'</a></div><h5 class="mb-0 font-weight-semibold">IMDb: '+ratings+'</h5><button type="button" class="btn bg-cart"><i class="fa fa-cart-plus mr-2"></i>Watch Now</button></div></div></div>'
          relatedContent += `<div class="card mb-3" id="relatedCard" style="width: 28rem;text-align:start" onclick='viewVideo(${response[i].id})'>
              <div class="imgCard" >
                <img src="${img}" class="card-img-top card_img" alt="...">
              </div>
              <div class="card-body">
                <h6 class="card-title" id="cartTitle">${title}</h6>
                <p class="card-text" id="cardText">${userName}</p>
                <h6 id="views" class="card-title" id="cardTitle">${views} views • ${date}</h6>
              </div>
            </div>`
        }
        
      }

      $("#relatedSection").html(relatedContent);
    },
    error: function (error) {
      alert("Something went wrong", error);
    }
  });
}

  //////////////////////////// view single video//////////////////////////////////////
  function viewVideo(id){
    // console.log('video view');
  window.location.href = "video.html?id="+id;
  // console.log(id);
  }


function generateHash(string) {
  var hash = 0;
  if (string.length == 0)
    return hash;
  for (let i = 0; i < string.length; i++) {
    var charCode = string.charCodeAt(i);
    hash = ((hash << 7) - hash) + charCode;
    hash = hash & hash;
  }
  return hash;
}
// generateHash("abc");

function goToProfile(){
  window.location.href = "user.html?id="+userId;
}

function addComments(){
  // var language=document.querySelector('#language').value;
  var body = document.querySelector('#comment').value;
  var video_id = getParameterByName("id");
  console.log(logInUserName);
  let arr={}
  arr["body"]=body
  arr["video_id"] = parseInt(video_id)
  arr["name"]=logInUserName
  let dic={}
  dic["comment"] = arr
  console.log(dic);
  var token=localStorage.getItem("user");
  $.ajax({
    url: "http://localhost:3000/api/v1/comments/",
    type: "POST",
    data: JSON.stringify(dic),
    crossorigin: true,
    crossDomain: true,
    headers: {
        'Authorization':token
     },
    contentType:'application/json; charset=utf-8',
  success: function (response) {

      console.log(response)
      location.reload();
  },
  error: function(error){
    alert("Something went wrong");
  }
  });
}
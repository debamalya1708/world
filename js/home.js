window.addEventListener("load",function(event) {
    allVideos();
  },false);

  window.addEventListener("load",function(event) {
    categoryLoad();
  },false);
  
  window.addEventListener("load",function(){
    languageLoad();
  },false);
  
  window.addEventListener("load",function(){
    cardCategories();
  },false);

  window.addEventListener("load",function(){
    cardLanguagess();
  },false);

  window.addEventListener("load",function(){
    check();
  },false);
function check(){
  var token=localStorage.getItem("user");
  $.ajax({
    url: "http://localhost:3000/api/v1/members",
    type: "GET",
    // headers: {"Authorization" : "Bearer "+token},
    contentType: 'application/json',
   headers: {
      'Authorization':token
   },
    //data: JSON.stringify(obj1),
    // dataType : 'json',
    // crossorigin: true,
    // crossDomain: true,
    // contentType:'application/json; charset=utf-8',
    success: function (response) {
      // console.log(response.data);
      document.getElementById("profile").style.display = "initial";
      document.getElementById("upload").style.display = "none";
      document.getElementById("profile").innerText = response.data.name;
    },
  error: function(error){
    console.log("Something went wrong", error);

    }
  });

}

function allVideos(){
    // console.log("AllVideoSection");
    $.ajax({
      url: "http://localhost:3000/api/v1/all",
      type: "GET",
      //data: JSON.stringify(obj1),
      dataType : 'json',
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
      success: function (response) {
        console.log(response.data);
        response = response.data
        content="";
        for(var i=response.length-1;i>=0;i--){
          var img = response[i].thumbnail_image;
          var title = response[i].title;
          var userName = response[i].uploder;
          var date=response[i].created_at.slice(0, 10);
          var views = response[i].views;
          var likes = 0;
          if(response[i].likes!=null){
            var likes = response[i].likes;
          }
          
          var id = response[i].id;
          // console.log(id);
          if(userName==null)
          {
            userName=" "
          }
  
          // content+='<div class="col-md-4 mt-3"><div class="card"><div class="card-body"><div class="card-img-actions"> <img src="'+img+'" class="card-img img-fluid" width="90" height="350" alt=""> </div></div><div class="card-body text-center"><div class="mb-2"><h3 class="font-weight-semibold mb-2"> <a href="#" class="text-default mb-2" data-abc="true">'+title+'</a> </h3> <a href="#" class="text-muted" data-abc="true">'+category+'</a></div><h5 class="mb-0 font-weight-semibold">IMDb: '+ratings+'</h5><button type="button" class="btn bg-cart"><i class="fa fa-cart-plus mr-2"></i>Watch Now</button></div></div></div>'
          content+=`<div class="col">
                            <div class="card" style="width: 18rem;">
                            <div class = "imgCard" onclick='viewSingleVideo(${response[i].id})'>
                              <img src="${img}" class="card-img-top" alt="...">
                              </div>
                              <div class="card-body">
                                <h6 class="card-title" >${title}</h6>
                                <p class="card-text" onclick='viewSpecifiedNamedVideo("${userName}")'>${userName}</p>
                                <h6 id="views" class="card-title">${views} views •  ${likes} likes • ${date}</h6>
                              </div>
                            </div>
                          </div>`
                         
  
        }
        
  $("#riju").html(content);
      },
    error: function(error){
        alert("Something went wrong", error);
      }
    });
  }

  ////////////////////////////// view single video//////////////////////////////////////
function viewSingleVideo(id){
    // console.log('video view');
  window.location.href = "video.html?id="+id;
  // console.log(id);
  }

  /////////////////////////////////////////language   category///////////////////////////////////
function cardLanguagess(){
  // console.log("category");
  $.ajax({
    url: "http://localhost:3000/api/v1/languages",
    type: "GET",
    //data: JSON.stringify(obj1),
    dataType : 'json',
    crossorigin: true,
    crossDomain: true,
    contentType:'application/json; charset=utf-8',
    success: function (response) {
      // console.log(response);
      response = response.data
      content="";
      for (var i = 0; i < response.length; i++) {
        var name = response[i].name
        // onclick='viewSingleLanguage("${title}")'
        content+=`<div class="card_category" onclick='viewSingleLanguage("${name}")' style="width: auto;">
              <div class = "imgCard_cat">
                <img src="Music.jpg" class="img_card" alt="...">
                </div>
                  <h1 class="card-title_cat">${name}</h1>
              </div>`


        
      }
      $("#language").html(content);
    },
  error: function(error){
      alert("Something went wrong", error);
    }
  });
}
{/* <div class = "imgCard_cat" >
                  <img src="${img}" class="img_card" alt="...">
                  </div> */}

  ///////////////////card category///////////////////
  function cardCategories(){
    // console.log("category");
    $.ajax({
      url: "http://localhost:3000/api/v1/category",
      type: "GET",
      //data: JSON.stringify(obj1),
      dataType : 'json',
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
      success: function (response) {
        // console.log(response);
        response = response.data
        content="";
        for (var i = 0; i < response.length; i++) {
          var name = response[i].name
          // console.log(response[i].name);
          var img = response[i].image
          // onclick='viewSingleCategory("${title}")'
          content+=`<div class="card_category"  onclick='viewSingleCategory("${name}")' style="width: auto;">
          <div class = "imgCard_cat">
          <img src="Language.png" class="img_card" alt="...">
          </div>
                    <h1 class="card-title_cat" '>${name}</h1>
                </div>`
        }
        $("#category").html(content);
      },
    error: function(error){
        alert("Something went wrong", error);
      }
    });
  }




  function categoryLoad(){
    // console.log("category");
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

  function logIn(){
    event.preventDefault();
    // var email = document.getElementById("email").innerText;
    var email=document.querySelector('#emailLogIn').value;
    // var password = document.getElementById("password").innerText;
    var password = document.querySelector('#passwordLogIn').value;
    var user ={};
    var dic ={};
    
    user["email"] = email;
    user["password"] = password;
    dic["user"]=user;
    // obj1["electionId"] = election_id;
    // console.log(user);

// console.log(dic);

    $.ajax({
      url: "http://localhost:3000/users/sign_in",
      type: "POST",
      data: JSON.stringify(dic),
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
    success: function (response, textStatus,request) {

        // alert(" successfull");
        // var request = new XMLHttpRequest();
        // console.log(response)
        // console.log(request)
        // console.log(request.getResponseHeader('Authorization'));
        
        // console.log(response.status.data.jti);
        localStorage.setItem("user",request.getResponseHeader('Authorization'));
        window.location.href = "home.html";
    },
    error: function(error){
      alert("Invalid credentials, Check again!");
    }
    });
}

function register(){
  event.preventDefault();
    // var email = document.getElementById("email").innerText;
    var email=document.querySelector('#email').value;
    // var password = document.getElementById("password").innerText;
    var password = document.querySelector('#password').value;
    var name = document.querySelector('#name').value;
    var contact = document.querySelector('#contact').value;
    var user ={};
    var dic ={};
    
    user["email"] = email;
    user["password"] = password;
    user["name"] = name;
    user["contact"] = contact;
    dic["user"]=user;
    // obj1["electionId"] = election_id;
    // console.log(user);

// console.log(dic);

    $.ajax({
      url: "http://localhost:3000/users",
      type: "POST",
      data: JSON.stringify(dic),
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
    success: function (response, textStatus,request) {

        // alert(" successfull");
        // var request = new XMLHttpRequest();
        // console.log(response)
        // console.log(request)
        // console.log(request.getResponseHeader('Authorization'));
        
        // console.log(response.status.data.jti);
        localStorage.setItem("user",request.getResponseHeader('Authorization'));
        window.location.href = "home.html";
    },
    error: function(error){
      alert("Something went wrong");
    }
    });
}


function profile(){
  window.location.href = "profile.html";
}



  function languageLoad(){
  // console.log("language");
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
  // console.log('category video view');
  window.location.href = "category.html?category="+name;
  // console.log(name);
  }
  
  ////////////////////////////////Language Click///////////////////////////////////////////
  
  function viewSingleLanguage(name){
  // console.log('language video view');
  window.location.href = "language.html?language="+name;
  // console.log(name);
  }
  
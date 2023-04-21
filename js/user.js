window.addEventListener("load", function () {
    getUser();
  }, false);
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
      console.log(response.data);
      document.getElementById("profile").style.display = "initial";
      document.getElementById("upload").style.display = "none";
      document.getElementById("profile").innerText = response.data.name;
    },
  error: function(error){
    console.log("Something went wrong", error);
    document.getElementById("upload").style.display = "initial";
    document.getElementById("profile").style.display = "none";
    }
  });

}
function getUser(){
    var id = getParameterByName("id")
    $.ajax({
      url: "http://localhost:3000/api/v1/all/user/"+id,
      type: "GET",
      crossorigin: true,
      crossDomain: true,
      contentType:'application/json; charset=utf-8',
  
    success: function (response) {
        console.log(response.data);
            response = response.data
            document.querySelector("#views_val").innerText = response.name
            document.querySelector("#date_val").innerText = response.contact
            document.querySelector("#category_val").innerText = response.email
            document.getElementById("profile").style.display = "initial";
            document.getElementById("upload").style.display = "none";
            // document.querySelector("#uploader_name").value = response.name
            content="";
            for(var i=response.videos.length-1;i>=0;i--){
                if(response.videos[i].uploder != ""){
                    var img = response.videos[i].thumbnail_image;
                    var title = response.videos[i].title;
                    var userName = response.videos[i].uploder;
                    var date=response.videos[i].created_at.slice(0, 10);
                    var views = response.videos[i].views;
                    var id = response.videos[i].id;
                  //   console.log(id);
                    if(userName==null)
                    {
                      userName=" "
                    }
            
                    // content+='<div class="col-md-4 mt-3"><div class="card"><div class="card-body"><div class="card-img-actions"> <img src="'+img+'" class="card-img img-fluid" width="90" height="350" alt=""> </div></div><div class="card-body text-center"><div class="mb-2"><h3 class="font-weight-semibold mb-2"> <a href="#" class="text-default mb-2" data-abc="true">'+title+'</a> </h3> <a href="#" class="text-muted" data-abc="true">'+category+'</a></div><h5 class="mb-0 font-weight-semibold">IMDb: '+ratings+'</h5><button type="button" class="btn bg-cart"><i class="fa fa-cart-plus mr-2"></i>Watch Now</button></div></div></div>'
                    content+=`<div class="col">
                                      <div class="card" style="width: 18rem;">
                                      <div class = "imgCard" onclick='viewSingleVideo(${response.videos[i].id})'>
                                        <img src="${img}" class="card-img-top" alt="...">
                                        </div>
                                        <div class="card-body">
                                          <h6 class="card-title" >${title}</h6>
                                          <p class="card-text" onclick='viewSpecifiedNamedVideo("${userName}")'>${userName}</p>
                                          <h6 id="views" class="card-title">${views} views •  ${date}</h6>
                                        </div>
                                      </div>
                                    </div>`
                }
            }
            
      $("#cInfo").html(content);
       
        
  
    },
    error: function(error){
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

    ////////////////////////////// view single video//////////////////////////////////////
function viewSingleVideo(id){
    // console.log('video view');
  window.location.href = "video.html?id="+id;
  // console.log(id);
  }
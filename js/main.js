

jQuery(function(){
    $(".loading").fadeOut(1000)
    let searchName = document.querySelector(".search-name");
    let searchLetter =  document.querySelector(".search-letter");
    $(".fa-bars").on("click",function(){
        $(".nav-list").show(400,function(){
            $(".ul-div ul").animate({"top":"10%" ,  "opacity": "1"})
        });
    
    
        $(".fa-bars").hide(400);
        $(".fa-xmark").show(400)
    })
    
    $(".fa-xmark").on("click",function(){
        $(".nav-list").hide(400,function(){
            $(".ul-div ul").animate({"top":"30%" ,  "opacity": "0"}) 
        });
        $(".fa-xmark").hide(400);
        $(".fa-bars").show(400);
    })
    
    $(".nav-list").hide()
    
    // nav animation
    // $("nav ul li a").animation("top:100%",500)
    
    
    // start of search
    // search by name
    async function getDataByName(key){
        let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`);
        let data = await response.json()
        return data
    }
     async function displayByName(key){
        let meals = await getDataByName(key);
        let mealsDetails = ""
        for(let i = 0 ; i < meals.meals.length ; i ++){
            mealsDetails += ` <div class="col-md-3 pt-5">
            <div class="inner">
                <div>
                <figure class="position-relative">
                    <img src="${meals.meals[i].strMealThumb}" alt="" class="w-100">
                    <figcaption class="d-flex  align-items-center">
                        <p class="ps-3 fs-2 text-black">${meals.meals[i].strMeal}</p>
                    </figcaption>
                </figure>
                </div>
            </div>
        </div>
    `
    document.querySelector(".meal-by-name").innerHTML =  mealsDetails;
    
     }}
    
    
    searchName.addEventListener("keyup",()=>{
        displayByName(`${searchName.value}`)
    })
    
    // search by letter
    async function getDataByletter(key){
        let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`);
        let data = await response.json()
        return data
    }
     async function displayByletter(key){
        let meals = await getDataByletter(key);
        let mealsDetails = ""
        for(let i = 0 ; i < meals.meals.length ; i ++){
            mealsDetails += ` <div class="col-md-3 pt-5">
            <div class="inner">
                <div>
                <figure class="position-relative">
                    <img src="${meals.meals[i].strMealThumb}" alt="" class="w-100">
                    <figcaption class="d-flex  align-items-center">
                        <p class="ps-3 fs-2 text-black">${meals.meals[i].strMeal}</p>
                    </figcaption>
                </figure>
                </div>
            </div>
        </div>
    `
    document.querySelector(".meal-by-letter").innerHTML =  mealsDetails;
    
     }}
    
    
     searchLetter.addEventListener("keyup",()=>{
        displayByletter(`${searchLetter.value}`)
    })
    
    $("#Search-ancor").on("click",function(){
        $(".Search").show()
        $(".Categories").hide();
        $(".filter-Categories").hide();
        $(".filter-ingredient").hide();
        $(".filter-area").hide();
        $(".contact").hide();
        $(".filter-ingredient").hide();
        $(".nav-list").hide(400,function(){
            $(".ul-div ul").animate({"top":"30%" ,  "opacity": "0"}) 
        });
        $(".fa-xmark").hide(400);
        $(".fa-bars").show(400);
    })
    
    
    
    
    // start of Categories
    
    async function getAllcategories(){
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")  ;
        let data = await response.json();
        return data
    }
    
    
    async function diplayMeals(){
        let details = await getAllcategories();
        let mealDetails = "";
        for(let i = 0 ; i < details.categories.length ; i++) {
            mealDetails+= `<div class=" col-md-3">
            <div class="inner">
              <figure class="figure">
                  <img src="${details.categories[i].strCategoryThumb}" alt="" class="w-100">
                  <figcaption class="figcaption d-flex flex-column justify-content-center align-items-center p-2">
                      <p class="name-of-meal mb-0">${details.categories[i].strCategory}</p>
                      <p class="meal-description">${details.categories[i].strCategoryDescription.substr(0, 55)}</p>
                  </figcaption>
                 </figure>
            </div>
             </div>` 
            document.querySelector('.meal-details').innerHTML = mealDetails
    
        }
    
    }
    
    diplayMeals()
    
    
    $("#Categories-ancor").on("click",()=>{
        $(".Categories").show();
        diplayMeals();
        $(".Search").hide();
        $(".contact").hide();
        $(".filter-ingredient").hide();
        $(".filter-Categories").hide();
        $(".filter-area").hide();
        $(".Area").hide();
        $(".contact").hide();
        $(".nav-list").hide(400,function(){
            $(".ul-div ul").animate({"top":"30%" ,  "opacity": "0"}) 
        });
        $(".Ingredients").hide();
        $(".fa-xmark").hide(400);
        $(".fa-bars").show(400);
       
        
    })
    
    // filter by categories
    async function filterByCategories(key){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${key}`);
        let data = await response.json()
        return data
    
    }
    
    async function displayFilterCategories(key){
        let filterDetails = await filterByCategories(key)
        let filter = "";
        for(let i = 0 ; i < filterDetails.meals.length ; i ++){
           filter += `<div class="col-md-3 pt-5">
           <div class="inner">
               <div>
               <figure class="position-relative">
                   <img src="${filterDetails.meals[i].strMealThumb}" alt="" class="w-100">
                   <figcaption class="d-flex  align-items-center">
                       <p class="name-of-meal  ps-3 fs-2 text-black">${filterDetails.meals[i].strMeal}</p>
                   </figcaption>
               </figure>
               </div>
           </div>
       </div>`
    
       document.querySelector(".filter-Categories-details").innerHTML =  filter
        }
    }
    
    function getvalueOfMeal(e){
        if($(e.target).is(".name-of-meal")){
            let MealValue = e.target;
            return $(MealValue).text()
        }
    }
    
    $(".Categories").on("click",function(e){
        displayFilterCategories(getvalueOfMeal(e))
        $(".filter-ingredient").hide()
        $(".contact").hide()
        $(".Search").hide()
        $(".Categories").hide();
        $(".Ingredients").hide()
        $(".Area").hide()
        $(".nav-list").hide(400,function(){
            $(".ul-div ul").animate({"top":"30%" ,  "opacity": "0"}) 
        });
        $(".fa-xmark").hide(400);
        $(".fa-bars").show(400);
       
    })
    
    
    
    
    
    // start of Area
    
    async function contryName(){
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")  ;
        let data = await response.json();
        return data
    }
    
     async function displayContryName(){
    let contry = await contryName();
    let name = "";
    for(let i =0 ; i<contry.meals.length ; i++){
        name +=` <div class="col-md-3 text-center p-1">
        <i class="fa-solid fa-house-laptop text-white"></i>
    <p class="name-of-country text-white">${contry.meals[i].strArea}</p>
    </div>`
    
    document.querySelector(".contry-name").innerHTML = name;
    
    }
    }
    
    $("#Area-ancor").on("click",function(){
        $(".Area").show()
        displayContryName();
        $(".filter-area").hide();
        $(".Categories").hide();
        $(".Ingredients").hide()
        $(".filter-ingredient").hide()
        $(".contact").hide()
        $(".nav-list").hide(400,function(){
            $(".ul-div ul").animate({"top":"30%" ,  "opacity": "0"}) 
        });
        $(".fa-xmark").hide(400);
        $(".fa-bars").show(400);
    })
    
    // filter by Area
    
    async function filterByArea(key){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${key}`);
        let data = await response.json()
        return data
    
    }
    
    
    
    
    function getvalueOfContry(e){
        if($(e.target).is(".name-of-country")){
            let contryValue = e.target;
            return $(contryValue).text()
        }
    }
    
    async function displayFilterArea(key){
        let filterDetails = await filterByArea(key);
        let filter = "";
        for(let i = 0 ; i < filterDetails.meals.length ; i ++){
           filter += `<div class="col-md-3 pt-5">
           <div class="inner">
               <div>
               <figure class="position-relative">
                   <img src="${filterDetails.meals[i].strMealThumb}" alt="" class="w-100">
                   <figcaption class="d-flex  align-items-center">
                       <p class="ps-3 fs-2 text-black">${filterDetails.meals[i].strMeal}</p>
                   </figcaption>
               </figure>
               </div>
           </div>
       </div>`
    
       document.querySelector(".filter-Area-details").innerHTML =  filter
        }
    }
    
    $(".Area").on("click",function(e){
        displayFilterArea(getvalueOfContry(e))
        $(".filter-area").show();
        $(".filter-Categories").hide()
        $(".filter-ingredient").hide()
        $(".contact").hide()
        $(".Search").hide()
        $(".Categories").hide();
        $(".Ingredients").hide()
        $(".Area").hide()
        $(".nav-list").hide(400,function(){
            $(".ul-div ul").animate({"top":"30%" ,  "opacity": "0"}) 
        });
        $(".fa-xmark").hide(400);
        $(".fa-bars").show(400);
       
    })
    
    
    // start of Ingredients
    async function getAllIngredient(){
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")  ;
        let data = await response.json();
        return data
    }
    
    
    async function displayIngredients(){
        let details = await getAllIngredient();
        let mealDetails = "";
        for(let i = 0 ; i < details.meals.length ; i++) {
            mealDetails +=`<div class="col-md-3 text-center cursor-pointer">
            <div class="iner pb-4">
                <i class="fa-solid fa-drumstick-bite text-white"></i>
                <p class="name-of-ingredient text-white pt-1 mb-1 fs-5">${details.meals[i].strIngredient}</p>
                <p class="dec text-white">${details.meals[i].strDescription.substr(0, 90)}</p>
            </div>
            </div>` 
            document.querySelector('.Ingredientss-details').innerHTML = mealDetails
    
        }
    
    }
    
     $("#Ingredients-ancor").on("click",function(){
        $(".Ingredients").show()
        displayIngredients()
        $(".filter-area").hide();
        $(".filter-Categories").hide()
        $(".filter-ingredient").hide()
        $(".Categories").hide();
        $(".Area").hide()
        $(".contact").hide()
        $(".nav-list").hide(400,function(){
            $(".ul-div ul").animate({"top":"30%" ,  "opacity": "0"}) 
        });
        $(".fa-xmark").hide(400);
        $(".fa-bars").show(400);
     })
    
    
    //  filter by main ingredient
    
    async function filterByingredeant(key){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${key}`);
        let data = await response.json()
        return data
    
    }
    
    function getvalueOfIngredient(e){
        if($(e.target).is(".name-of-ingredient")){
            let ingredientValue = e.target;
            return $(ingredientValue).text()
        }
    }
    
    
    async function displayFilterGredient(key){
        let filterDetails = await filterByingredeant(key)
        let filter = "";
        for(let i = 0 ; i < filterDetails.meals.length ; i ++){
           filter += `<div class="col-md-3 pt-5">
           <div class="inner">
               <div>
               <figure class="position-relative">
                   <img src="${filterDetails.meals[i].strMealThumb}" alt="" class="w-100">
                   <figcaption class="d-flex  align-items-center">
                       <p class="name-of-ingredient ps-3 fs-2 text-black">${filterDetails.meals[i].strMeal}</p>
                   </figcaption>
               </figure>
               </div>
           </div>
       </div>`
    
       document.querySelector(".filter-Ingredientss-details").innerHTML =  filter
        }
    }
    
    $(".Ingredientss-details").on("click",function(e){
        displayFilterGredient(getvalueOfIngredient(e))
        $(".filter-ingredient").show()
        $(".contact").hide()
        $(".Search").hide()
        $(".Categories").hide();
        $(".Ingredients").hide()
        $(".Area").hide()
        $(".nav-list").hide(400,function(){
            $(".ul-div ul").animate({"top":"30%" ,  "opacity": "0"}) 
        });
        $(".fa-xmark").hide(400);
        $(".fa-bars").show(400);
       
    })
    
    
    
    //  start of contact
    $("#contact-ancor").on("click",function(){
        $(".contact").show()
        $(".Search").hide()
        $(".Categories").hide();
        $(".Ingredients").hide()
        $(".Area").hide()
        $(".filter-ingredient").hide();
        $(".filter-Categories").hide();
        $(".filter-area").hide();
        $(".nav-list").hide(400,function(){
            $(".ul-div ul").animate({"top":"30%" ,  "opacity": "0"}) 
        });
        $(".fa-xmark").hide(400);
        $(".fa-bars").show(400);
    })
    
    
    let nameRegex =/[a-zA-Z]/;
    let emailRegex =/[a-z]{3,}\@[a-z]{3}\.(com|gmail|net|dev)/
    let phoneRegex = /(\+2)?01[0125][0-9]{8}/
    let ageRegex = /([0-9][0-9])/
    let passwordRegex =/^((?=.*[a-z])(?=.*[0-9]))\w{8,}[a-z]\d$/
    let repasswordRegex =/^((?=.*[a-z])(?=.*[0-9]))\w{8,}[a-z]\d$/
    
    
    function validationofName(regex, element) {
        if (regex.test(element.value)) {
            document.querySelector(".p-name").classList.remove("d-block")
            document.querySelector(".p-name").classList.add("d-none")
          return true;
        } else {
            document.querySelector(".p-name").classList.remove("d-none")
             document.querySelector(".p-name").classList.add("d-block")
          return false;
        }
      }
    
      function validationofEmail(regex, element) {
        if (regex.test(element.value)) {
            document.querySelector(".p-email").classList.remove("d-block")
          document.querySelector(".p-email").classList.add("d-none")
          return true;
        } else {
            document.querySelector(".p-email").classList.remove("d-none")
             document.querySelector(".p-email").classList.add("d-block")
          return false;
        }
    
      }
    
      function validationofPhone(regex, element) {
        if (regex.test(element.value)) {
            document.querySelector(".p-phone").classList.remove("d-block")
             document.querySelector(".p-phone").classList.add("d-none")
          return true;
        } else {
            document.querySelector(".p-phone").classList.remove("d-none")
             document.querySelector(".p-phone").classList.add("d-block")
          return false;
        }
    
      }
    
      function validationofAge(regex, element) {
        if (regex.test(element.value)) {
            document.querySelector(".p-age").classList.remove("d-block")
             document.querySelector(".p-age").classList.add("d-none")
          return true;
        } else {
            document.querySelector(".p-age").classList.remove("d-none")
             document.querySelector(".p-age").classList.add("d-block")
          return false;
        }
    
      }
    
    
      function validationofPassword(regex, element) {
        if (regex.test(element.value)) {
            document.querySelector(".p-password").classList.remove("d-block")
             document.querySelector(".p-password").classList.add("d-none")
          return true;
        } else {
            document.querySelector(".p-password").classList.remove("d-none")
             document.querySelector(".p-password").classList.add("d-block")
          return false;
        }
    
      }
    
      function validationofRePassword(regex, element) {
        if (regex.test(element.value)) {
            document.querySelector(".p-repassword").classList.remove("d-block")
             document.querySelector(".p-repassword").classList.add("d-none")
          return true;
        } else {
            document.querySelector(".p-repassword").classList.remove("d-none")
             document.querySelector(".p-repassword").classList.add("d-block")
          return false;
        }
    
      }
    
    
      
    
    
    let inputeName = document.querySelector(".name");
    let inputeEmail = document.querySelector(".email")
    let inputePhone = document.querySelector(".Phone ")
    let inputeAge = document.querySelector(".age ")
    let inputePassword = document.querySelector(".password ")
    let inputeRePassword = document.querySelector(".repassword ")
    
    
    
    
    
    // name
      $(".name").on("keyup",function(){
       validationofName(nameRegex,inputeName) 
      })
    // email
      $(".email").on("keyup",function(){
        validationofEmail(emailRegex,inputeEmail) ;
       })
      
    //    phone
    $(".Phone").on("keyup",function(){
        validationofPhone(phoneRegex,inputePhone) 
       })
    
    //    age
    $(".age").on("keyup",function(){
        validationofAge( ageRegex,inputeAge) 
       })
    //    password
    $(".password").on("keyup",function(){
        validationofPassword( passwordRegex,inputePassword) 
       })
    
    //repassword
       $(".repassword").on("keyup",function(){
        validationofRePassword(repasswordRegex,inputeRePassword) 
       })
    
    function displayButton(){
        if( validationofName(nameRegex,inputeName) &&validationofEmail(emailRegex,inputeEmail)&&validationofPhone(phoneRegex,inputePhone) &&validationofAge( ageRegex,inputeAge)&&validationofPassword( passwordRegex,inputePassword)&&validationofRePassword(repasswordRegex,inputeRePassword)){
            $("#form-button").prop("disabled",true)
        }else{
            $("#form-button").prop("disabled",false)
        }
        
    } })



let requestURL = "https://spin.infoedglobal.com/Service/ProgramSearch";
var data = {
    PublicKey: "96183961-68B2-4B14-AEA3-376E734380CD",
    InstCode: "SUNYALB",
    signature: "97707afe4847b9862f27c9ce80a9cb6e",
    keywords:'[SOLR]keyword_exact:"Coronavirus/COVID-19" AND NOT keyword_exact:"COVID-19 Non-Research Resources"',
    responseFormat:'JSON',
    pageSize:1000,
    columns:["synopsis","id","spon_name","NextDeadlineDate","total_funding_limit","programurl","sponsor_type","prog_title"],
    uniqueId: '3AF9322F-EA4D-48DF-9'
   
};
let params = new URLSearchParams(data).toString();
let maincontentContainer = document.getElementsByClassName('main-content')[0];




//let proxy_url ="https://cors-anywhere.herokuapp.com/"
let final_url= requestURL +'?'+params;
 let request = new XMLHttpRequest();
request.open('GET',final_url);
request.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
request.setRequestHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080/','https://www.albany.edu/');
request.setRequestHeader("Content-Type", "application/json");
request.setRequestHeader('accept', 'application/json'); 
//request.setRequestHeader('X-Frame-Options', 'DENY'); 
//request.setRequestHeader('X-PINGOTHER', 'pingpong');
request.setRequestHeader('Access-Control-Allow-Credentials', true);






 
//request.setRequestHeader('Access-Control-Allow-Credentials', 'true');
//request.setRequestHeader('Access-Control-Allow-Methods ','*');

request.send();
request.onload = function(){
    var covid_funding_data_response = request.response;  

    console.log(covid_funding_data_response);

var covid_data=JSON.parse(covid_funding_data_response);
let distinctCategories = ['NSF', 'NIH', 'Federal - Others', 'Others'];
let FederalsubCategories = ['Federal - All CDC','Federal - All HHS', 'Federal - All DoD', 'Federal - All DoE'];
let content = '';
let categoryCounter = 1;


   var NSF_arr=[];
   var NIH_arr=[];
   var federal_arr=[];
   
   var others=[];
for(var k=0;k<distinctCategories.length;k++){
var length=0;
var img_url="";
var arr=[];
for (var j = 0; j < covid_data.Programs.length; j++) {
    var programs_value = covid_data.Programs[j];
    console.log("*********");
    console.log(programs_value.synopsis);
    console.log(programs_value.spon_name);

    console.log(programs_value.NextDeadlineDate);
    console.log(programs_value.total_funding_limit);

    console.log(programs_value.programurl);

    /* if(programs_value.spon_name.includes(distinctCategories[k])){
        arr.push( programs_value);
    } */


    

    if(programs_value.spon_name.includes(distinctCategories[k])|| 
    programs_value.spon_name.includes('National Science Foundation')){
        NSF_arr.push( programs_value);

    }
    

 

   else if(programs_value.spon_name.includes('NIH') 
    || programs_value.spon_name.includes('National Institute of Health')


    )
   
    {
        NIH_arr.push(programs_value);

    }

   

 else if(distinctCategories[k] == 'Federal - Others'){
    if(programs_value.sponsor_type == 'US Federal' && !programs_value.spon_name.includes('DHHS') &&
    !programs_value.spon_name.includes('NIH') ){
        federal_arr.push(programs_value);
    }


    }

    else{
        if(distinctCategories[k] == 'Others' )
        {
        if(programs_value.sponsor_type != 'US Federal' ||
        
        !federal_arr.includes(programs_value)
        ){
            
            others.push(programs_value);
            }
        }
    }




 
}





   
if(distinctCategories[k] == 'NSF'){
    length = NSF_arr.length;
    arr=NSF_arr;
    img_url="assets/logos/nsf.png";
    }
    
    if(distinctCategories[k] == 'NIH'){
        length = NIH_arr.length;
        arr=NIH_arr;
        img_url="assets/logos/NIH.png";
    
        
    }
    if(distinctCategories[k] == 'Federal - Others'){
        length = federal_arr.length;
        arr=federal_arr;
        img_url="assets/logos/hhs.png";
    
    }
    
    
    if(distinctCategories[k] == 'Others'){
        length = others.length;
        arr=others;
        img_url=""
    
    }


let categoryHeader = distinctCategories[k] + ' (' + length + ' Solicitations)';
let accordionContent = generateFederalAccordionContent(arr,img_url,distinctCategories[k]);
let oppId = "collapse" + categoryCounter;
let headingId = "heading" + categoryCounter;
let accordionElem =  generateAccordionElement(oppId, headingId, categoryHeader, accordionContent);
content = content + accordionElem;
categoryCounter++; 






}






/* for (var i = 0; i < covid_data.Programs.length; i++) {
    var programs_value = covid_data.Programs[i];
    
let categoryHeader = distinctCategories[k] + ' (' + arr.length + ' Solicitations)';
let accordionContent = generateFederalAccordionContent(arr);
let oppId = "collapse" + categoryCounter;
let headingId = "heading" + categoryCounter;
let accordionElem =  generateAccordionElement(oppId, headingId, categoryHeader, accordionContent);
content = content ;
categoryCounter++;


} */

appendMainContent(maincontentContainer, content);
//Appending grants to main content Element  
//appendPostDate(arr[0].updateddate);


}

//let total = document.getElementById('totalnoofopps');
//total.innerText = '(' + opportunity.length + ' Solicitations)';




let generateAccordionElement = function(divId, bootlabelId, accordionHeader, accordionContent){
    let accordionElem =  '<div class = "card"><div class="card-header" id="'+ bootlabelId + '">' +
                          '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#'+ divId + '" aria-expanded="true" aria-controls="' + divId + '">'+
                            '<h3 class = "content-header-no-margin">' + accordionHeader + '<i class="fas fa-chevron-down"></i></h3></button></div>'
                        + '<div id="'+ divId + '" class = "collapse" aria-labelledby= "'+ bootlabelId + '"> <div class = "card-body">'
                        + accordionContent +'</div></div></div>';  
    return accordionElem;
}





let generateFederalAccordionContent = function(arr,img_url,funding_name){
    let content = '';
    var today = new Date().toLocaleDateString();
   

    
    for(let i = 0; i < arr.length; i++)
    {

        var dueDate="";
        var Estimated_Funding="";
        if(arr[i].NextDeadlineDate != null){

          var dateArr=  arr[i].NextDeadlineDate.split(" ");
          dueDate= new Date(dateArr[0]).toLocaleDateString();
          
        }else{
            dueDate="Contact the Program Officer"
        }

        if(arr[i].total_funding_limit === 0){
            Estimated_Funding = "N/A";
        }else{
            Estimated_Funding = arr[i].total_funding_limit;
        }




        if(funding_name === 'Federal - Others'){

            if(arr[i].spon_name.includes("Center for Global Health") ||
            arr[i].spon_name.includes("CDC")){
                img_url ="assets/logos/cdc.png";

            }

            if(arr[i].spon_name === "Department of the Air Force"||
            arr[i].spon_name === "Department of the Army" || 
            arr[i].spon_name === "Defense Logistics Agency" ||
            arr[i].spon_name === "Department of Veterans Affairs"
            ){
                img_url ="assets/logos/dod.png";

            }
            if(arr[i].spon_name === "Department of Energy"){


                img_url="assets/logos/doe.png";
            }


            if(arr[i].spon_name === "Department of Health & Human Services"){


                img_url="assets/logos/hhs.png";
            }
           




        }

        var description=arr[i].synopsis.replace(/<[^>]*>/g, '');
       
        /* var dueDate = new Date(arr[i].NextDeadlineDate);
        if(Object.prototype.toString.call(dueDate) === "[object Date]" && !isNaN(dueDate.getTime()))
        {
            dueDate = new Date(arr[i].NextDeadlineDate);
        }
        else{
            dueDate = new Date();
        } */
        //Only add the oportunities which have due dates after today
        //if(dueDate == "Contact the Officier"  || dueDate >= today )
        //{
            let imageElement = (arr[i].logo == '')? '' : '<div class = "col-xl-2 col-lg-3"><img class = "agency-logo" src = "'+img_url+'" /></div>';
            content = content + '<div class = "display-flex opportunity-container search-container">'+ imageElement + 
                   '<div class = "col-xl-10 col-lg-9">'+ '<h4 class = "opp-header black-content-header-no-margin">'+arr[i].prog_title+'</h4>'+'<div class = "opp-details display-flex">'+
                   
                        '<div class = "col-sm-12 col-md-12 col-lg-12 col-xl-6">'+
                            '<i class="fas fa-flag"></i> <strong>Agency Name: </strong>' + arr[i].spon_name +
                            '<br>' +
                            '<i class="fas fa-dollar-sign"></i> <strong>Estimated Funding: </strong>' + Estimated_Funding +
                            '<br>' +
                        '</div><div class = "col-sm-12 col-md-12 col-lg-12 col-xl-6">' +
                            '<i class="fas fa-calendar-day"></i> <strong>Due Date: </strong>' + dueDate +
                            '<br></div></div></div>' +
                   '<p class = "opp-description">' + description + '</p>' +
                   '<button type = "button" class = "details-button" onclick = "location.href = \'' + arr[i].programurl + '\'">View Details</button></div>';
       // }     
    }
    return content;
}


















    

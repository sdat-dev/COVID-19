let getDistinctAttributes = function(objects, attribute){
    let mappedAttributes = objects.map(function(object){
        return object[attribute];
    });
    let distinctAttributes = mappedAttributes.filter(function(v, i, a){
        return a.indexOf(v) === i;
     });

    distinctAttributes.sort();
    return distinctAttributes;
}

let customSort = function(sortOrder, objects){
        let i,j = 0;
        for(i = 0; i< objects.length; i++)
        {
            for(j = 0; j < objects.length - (i+1); j++)
            {
                if(sortOrder.indexOf(objects[j]) > sortOrder.indexOf(objects[j+1]))
                {
                    let swap = objects[j];
                    objects[j] = objects[j+1];
                    objects[j+1] = swap;
                }
            }
        }
        return objects;
}

let generateSubAccordionContent = function(attributes, filterAttribute, objects, generateObjectContent){
    let accordionContent = '';

    attributes.forEach(function(attribute){
        //filtering objects based on each subaccordion grouping
        sub_objects = objects.filter(function(object){ 	
            return object[filterAttribute] == attribute;
        });

        let objectContent = '';
        sub_objects.forEach(function(object){
            objectContent = objectContent + generateObjectContent(object);
        });

        accordionContent += '<div class = "accordion-container"><div class = "accordion-header"><p class = "paragraph-question">'+ attribute + '</p></div><div class = "accordion-content"><ul class = "sub-list">'+ objectContent +'</ul></div></div>';
    });
    return accordionContent;
}

let generateAccordionElem = function(divId, bootlabelId, accordionHeader, accordionContent){
    let accordionElem =  '<div class = "card"><div class="card-header" id="'+ bootlabelId + '">' +
                          '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#'+ divId + '" aria-expanded="true" aria-controls="' + divId + '">'+
                            '<h3 class = "content-header-no-margin">' + accordionHeader + '<i class="fas fa-chevron-down"></i></h3></button></div>'
                        + '<div id="'+ divId + '" class = "collapse" aria-labelledby= "'+ bootlabelId + '"> <div class = "card-body">'
                        + accordionContent +'</div></div></div>';  
    return accordionElem;
}

let generateAccordionGuideanceElem =  function(divId, bootlabelId, accordionHeader, accordionContent, imageSrc){
    let accordionElem =  '<div class = "card"><div class="card-header" id="'+ bootlabelId + '">' +
                          '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#'+ divId + '" aria-expanded="true" aria-controls="' + divId + '">'+
                            '<div class = "display-flex"><div><img class = "accordion-logo" src = "'+ imageSrc +'"></div><div><h3 class = "content-header-no-margin">' + accordionHeader + '</h3></div></div></button></div>'
                        + '<div id="'+ divId + '" class = "collapse" aria-labelledby= "'+ bootlabelId + '"> <div class = "card-body">'
                        + accordionContent +'</div></div></div>';  
    return accordionElem;
}

let generateGuidanceSubAccordionContent = function(attributes, filterAttribute, objects, generateObjectContent){
    let accordionContent = '';

    attributes.forEach(function(attribute){
        //filtering objects based on each subaccordion grouping
        sub_objects = objects.filter(function(object){ 	
            return object[filterAttribute] == attribute;
        });

        let objectContent = '';
        sub_objects.forEach(function(object){
            objectContent = objectContent + generateObjectContent(object);
        });

        accordionContent += '<div class = "accordion-container"><div class = "accordion-header"><div class = "sub-accordion-logo-container"><img class = "sub-accordion-logo" src = "'+ sub_objects[0].logo +'"></div><p class = "paragraph-question">'+ attribute + '</p></div><div class = "accordion-content"><ul class = "sub-list">'+ objectContent +'</ul></div></div>';
    });
    return accordionContent;
}


let appendMainContent = function(maincontentContainer, content){
    let mainContentElement = document.createElement('div');
    mainContentElement.classList.add('accordion');
    mainContentElement.id = 'accordionExample';
    mainContentElement.innerHTML = content.trim();
    maincontentContainer.appendChild(mainContentElement);
}

let appendPostDate  = function(date){
    let lastupdatedContent = document.getElementById('last-updated');
    lastupdatedContent.innerHTML = "Last updated: " + date;
}
let addfooter = function (relativepath = ".") {
    console.log("addfooter");
    let footer = document.getElementById("footer");
    let content = "";
    content += 
            '<footer class="footer container-fluid">'+
                '<div class="region region-footer" >'+
                    '<section id="block-footer2020-2" data-block-plugin-id="block_content:58324575-ecf1-412b-b839-09d0cf593aef"'+
                        'class="block block-block-content block-block-content58324575-ecf1-412b-b839-09d0cf593aef clearfix">'+

                        '<div class="field field--name-body field--type-text-with-summary field--label-hidden field--item">'+
                            '<div class="footer-new">'+
                                '<div class="col-sm-12 col-sm-offset-0 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">'+
                                    '<a target="_blank" href="https://www.albany.edu/">'+
                                        '<img alt="University at Albany Logo" class=" img-responsive footer-logo" height="39"'+
                                        'src="'+relativepath+'/assets/images/UAlbany-logo.png" typeof="Image" />'+
                                    '</a>'+
                                    '<p>'+
                                        '<a target="_blank" href="https://www.facebook.com/universityatalbany"><span class="fab fa-facebook-f footer-icon" role="img"'+
                                                'aria-label="Facebook Icon"></span><span class="sr-only">facebook</span></a>'+
                                            '<a target="_blank" href="https://twitter.com/ualbany/"><span class="fab fa-twitter footer-icon" role="img"'+
                                                'aria-label="Twitter Icon"></span><span class="sr-only">twitter</span></a>'+
                                            '<a target="_blank" href="https://www.instagram.com/ualbany/"><span class="fab fa-instagram footer-icon" role="img"'+
                                                'aria-label= "Instagram Icon"></span><span class="sr-only">instagram</span></a>'+
                                            '<a target="_blank" href="https://www.snapchat.com/add/ualbany"><span class="fab fa-snapchat-ghost footer-icon" role="img"'+
                                                'aria-label="Snapchat Icon"></span><span class="sr-only">snapchat</span></a>'+
                                            '<a target="_blank" href="https://www.youtube.com/c/ualbany"><span class="fab fa-youtube footer-icon" role="img"'+
                                                'aria-label="YouTube Icon"></span><span class="sr-only">youtube</span></a>'+
                                            '<a target="_blank" href="https://www.linkedin.com/school/university-at-albany/"><span class="fab fa-linkedin-in footer-icon" role="img"'+
                                                'aria-label="LinkedIn Icon"></span><span class="sr-only">linkedin</span></a>'+
                                    '</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="footer-end">'+
                            '<div class="col-sm-12 col-md-6 address-phone">'+
                            '<a target="_blank" href="https://www.google.com/maps/place/1400+Washington+Ave,+Albany,+NY+12222/@42.6859115,-73.8287166,17z/data=!3m1!4b1!4m5!3m4!1s0x89de0b3ce5c93e45:0x4cdbe8d7b52fa412!8m2!3d42.6859115!4d-73.8265279"'+
                                        'target="_blank">1400 Washington Avenue, Albany, NY 12222</a> | Phone: <a'+
                                        'target="_blank" href="tel:5184423300">518-442-3300</a>'+
                                '</div>'+
                                '<div class="col-sm-12 col-md-6 copyright" style="align:center;">'+
                                '©2021 University at Albany |'+
                                '<a target="_blank" href="https://www.albany.edu/web-services"> Accessibility</a> |'+
                                '<a target="_blank" href="https://wiki.albany.edu/display/public/askit/Internet+Privacy+Policy"> Privacy Policy</a> |'+
                                '<a target="_blank" href="http://www.albany.edu/equity-compliance/"> Title IX</a>'+
                            '</div> '+

                            '</div>'+
                        '</div>'+
                    '</section>'+
                '</div>'+
            '</footer >';


        // '<section id="copyright-content">'+
        //     '<p>© 2020&nbsp;University at Albany</p>'+
        // '</section>';
        footer.innerHTML = content;
}
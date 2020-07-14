let addTopMenu = function(){
    let navheader = document.getElementById('navbar-header');
    let headerContent = '<div class="ualbany-logo-wrapper">'+
                            '<span class="helper">'+
                            '</span>'+
                            '<a href="https://www.albany.edu/">'+
                                '<img class="ualbany-logo" src="assets/logos/logo.png" />'+
                            '</a>'+
                            '<div class="topnav-right">' +
                                '<a href="https://www.albany.edu/myualbany">MYUALBANY</a>'+
                                '<a href="https://www.albany.edu/apply-now">APPLY</a>'+
                                '<a href="https://www.alumni.albany.edu/s/1642/18-giving/landing.aspx?sid=1642&gid=2&pgid=2040&appealcode=uahome">'+
                                '   GIVE</a>'+    
                            '</div>'+
                        '</div>';
    navheader.innerHTML = headerContent;
}
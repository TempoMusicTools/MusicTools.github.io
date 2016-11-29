//Copyright 2016 Matthew Whitaker/Sub 6 Resources
function toolbar(title, color) {
  
}
function updateMHTMLObjects() {
  document.getElementsByTagName("body")[0].style.padding = "0";
  document.getElementsByTagName("body")[0].style.margin = "0";
  document.getElementsByTagName("body")[0].style.boxSizing = "border-box";
  document.getElementsByTagName("body")[0].style.marginTop = "65px";
  var materialAccentColor = document.querySelectorAll('[type="accentColor"]').getAttribute("color");
  var toolbars = document.getElementsByTagName("toolbar");
  var contents = document.getElementsByTagName("content");
  var copyrights = document.getElementsByTagName("copyright");
  var buttons = document.getElementsByTagName("mbutton");
  var materialBackgroundColor = "#eeeeee";
  var materialSecondaryColor = "#002E9D";
  var materialTextColor = "#FFFFFF";
  for(i = 0; i < contents.length; i++) {
    contents[i].style.fontFamily = "'Roboto', sans-serif";
  }
  for(i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = '<button style="padding:10px; margin:10px; background-color:'+materialAccentColor+'; color:'+materialTextColor+'; -webkit-box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.4); -moz-box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.4); box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.4); border:none; font-family: \'Roboto\', sans-serif; font-weight:bold; cursor:pointer; text-transform:uppercase;">'+buttons[i].innerHTML+'</button>';
  }
  //Iterate through all toolbars and convert them to cool-looking toolbars!!!
  for(i = 0; i < toolbars.length; i++) {
    var toolbarTextText = toolbars[i].getAttribute("title");
    var iconOne = toolbars[i].getAttribute("iconOneURL");
    var iconTwo = toolbars[i].getAttribute("iconTwoURL");
    var iconThree = toolbars[i].getAttribute("iconThreeURL");
    var iconFour = toolbars[i].getAttribute("iconFourURL");
    var iconFive = toolbars[i].getAttribute("iconFiveURL");
    var iconSix = toolbars[i].getAttribute("iconSixURL");
    var iconSeven = toolbars[i].getAttribute("iconSevenURL");
    var iconEight = toolbars[i].getAttribute("iconEightURL");
    var iconNine = toolbars[i].getAttribute("iconNineURL");
    var iconTen = toolbars[i].getAttribute("iconTenURL");
    
    toolbars[i].innerHTML = '<div style="width:100%; height:65px; box-sizing: border-box; background-color:'+materialAccentColor+'; color:'+materialTextColor+'; font-family: \'Roboto\', sans-serif; font-weight:300; font-size: 23px; padding:15px; -webkit-box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.4); -moz-box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.4); box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.4); position:fixed; top:0;">'+toolbarTextText+'</div>';
    
    //alert("Material Styles Added");
  }
  for(i = 0; i < copyrights.length; i++) {
    copyrights[i].innerHTML = '<div style="background-color:'+materialAccentColor+'; font-family: \'Roboto\', sans-serif; font-weight:300; color:'+materialTextColor+'; width:100%; padding:10px; text-align:center">'+copyrights[i].innerHTML+"</div>";
  }
}

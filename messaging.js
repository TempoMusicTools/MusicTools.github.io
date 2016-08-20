function sendMessage() {
        console.log("Sending message...");
        var messageEmail = document.getElementById("message_email").value;
        var subject = document.getElementById("subject").value;
        var messageContent = document.getElementById("message_content").value;
        var messagePreview = messageContent.substring(0,35);
        //alert(messageEmail);
        //alert(subject);
        //alert(messageContent);
        var punctuationless = messageEmail.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}‌​~']/g,"");
        var messageEmailWithoutPunctuation = punctuationless.replace(/\s{2,}/g,"");
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/publicusers/' + messageEmailWithoutPunctuation).once('value').then(function(snapshot) {
          if(snapshot.val() != null) {
            var otheruid = snapshot.val().uid;
          } else {
            displayError("The email address you entered is not registered with MusicTools.");
            return false;
          }
          console.log("Updating message database...");
          var pushData = {
            content:messageContent,
            title:subject,
            from:uid,
            fromemail:email,
            messagepreview:messagePreview
          };
          var pushData2 = {
            content:messageContent,
            title:subject,
            to:otheruid,
            toemail:messageEmail,
            messagepreview:messagePreview
          };
          var uniquekey = firebase.database().ref('messages/to/'+otheruid).push().key;
          console.log("Unique key generated");
          firebase.database().ref('messages/to/'+otheruid+"/"+uniquekey).update(pushData);
          console.log("To generated successfully");
          firebase.database().ref('messages/from/'+uid+"/"+uniquekey).update(pushData2);
          console.log("From generated successfully");
          console.log("Done updating message database.");
          alert("Message Sent");
        });
        return false;
      }
      function attachMessageListener() {
           console.log("Attaching listener to messages/to/"+uid);
           var messagesRef = firebase.database().ref('messages/to/' + uid);
           messagesRef.on('child_added', function(data) {
                if(data == null) {
                    console.log("Data is null!");
                }
                console.log("Calling element add");
                addMessageElement(data.key, data.val().title, data.val().content, data.val().fromemail, data.val().messagepreview);
                console.log("Done calling add");
                console.log("Message preview: "+data.val().messagepreview);
           },function (errorObject) {
                logError("The read failed: " + errorObject.code+" stack: "+errorObject);
                displayError(errorObject.code);
           });
           console.log("Listener attached");
      }
      function addMessageElement(thekey, thetitle, thecontent, fromtheemail, thecontentpreview) {
             console.log("Creating new message element");
             //alert(thekey);
             var para = document.createElement("span");
             var para2 = document.createElement("span");
             var para3 = document.createElement("span");
             var fromText = document.createTextNode(fromtheemail+" ");
             var final = document.createElement("div");
             var theonclick = document.createAttribute("onClick");
             theonclick.value = "openMessage("+thekey+")";
             para.appendChild(fromText);
             final.appendChild(para);  
             var titleText = document.createTextNode(thetitle+" ");      
             para2.appendChild(titleText);
             final.appendChild(para2);  
             var contentText = document.createTextNode(" "+thecontentpreview);
             para3.appendChild(contentText);
             final.appendChild(para3);
             final.setAttributeNode(theonclick);
             document.getElementById("messages").appendChild(final);
             console.log("Done");
             addBigMessage(thekey,thetitle,thecontent,fromtheemail);
      }
        function addBigMessage(lekey,letitle,lecontent,leemail) {
                console.log("Adding big message...");
                var messageElement = document.createElement("div");
                var styleAttribute = document.createAttribute("style");
                var classAttribute = document.createAttribute("class");
                var idAttribute = document.createAttribute("id");
                //styleAttribute.value="display:none;";
                classAttribute.value="bigMessage";
                idAttribute.value=lekey;
                messageElement.setAttributeNode(styleAttribute);
                messageElement.setAttributeNode(classAttribute);
                messageElement.setAttributeNode(idAttribute);
                //create email div
                        var emailDiv = document.createElement("div");
                        var classAttribute2 = document.createAttribute("class");
                        classAttribute2.value="emailDiv";
                        emailDiv.setAttributeNode(classAttribute2);
                        var emailTextText = document.createTextNode(leemail);
                        emailDiv.appendChild(emailTextText);
                    messageElement.appendChild(emailDiv);
                //create subject div
                        var subjectDiv = document.createElement("div");
                        var classAttribute3 = document.createAttribute("class");
                        classAttribute3.value="subjectDiv";
                        subjectDiv.setAttributeNode(classAttribute3);
                        var subjectTextText = document.createTextNode(letitle);
                        subjectDiv.appendChild(subjectTextText);
                    messageElement.appendChild(subjectDiv);
                //create content div
                        var contentDiv = document.createElement("div");
                        var classAttribute4 = document.createAttribute("class");
                        classAttribute4.value="contentDiv";
                        contentDiv.setAttributeNode(classAttribute4);
                        var contentTextText = document.createTextNode(lecontent);
                        contentDiv.appendChild(contentTextText);
                    messageElement.appendChild(contentDiv);
            //add message to document
            document.getElementById("messages").appendChild(messageElement);
            console.log("Done creating big message element");
        }
        function openMessage(messageKey) {
                document.getElementById(""+messageKey).style.display = "block";
        }

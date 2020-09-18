function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
    var req = new XMLHttpRequest();
    var url = `https://api.github.com/users/${user}`;
    req.open("GET",url, false); //false bc not an asynch req, synch to make return easier
    req.send();
    return req;
}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $("#profile").children("h2").html(`${user.name}<br/><br/>${user.id}<br/>`);
    $(".avatar").prepend(`<img src="${user.avatar_url}" alt="profile pic"/>`);
    $(".avatar").after("<br/><br/>");
    $(".information").html(`${user.html_url}`);
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $("#profile").children("h2").html("Sorry! There is no Github user with the username: "+username);
}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        if (e.which == 13) { //check if the enter(i.e return) key is pressed
            username = $(this).val(); //get what the user enters
            $(this).val(""); //reset the text typed in the input

            response = getGithubInfo(username); //get the user's information and store the respsonse
            if (response.status == 200) { //if the response is successful show the user's details
                showUser(JSON.parse(response.responseText)); //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});

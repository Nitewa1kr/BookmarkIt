//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e)
{
    
    var siteName = document.getElementById('Site-Name').value;
    
    var siteUrl = document.getElementById('Site-Url').value;

    var siteDesc = document.getElementById('Site-Desc').value;

    if(!validateForm(siteName, siteUrl))
    {
        return false;
    }
    
    var bookmark = {name: siteName, url: siteUrl, desc: siteDesc}

    
    if(localStorage.getItem('bookmarks') === null)
    {
        
        var bookmarks = [];
        
        bookmarks.push(bookmark);
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else
    {
        
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        
        bookmarks.push(bookmark);
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    document.getElementById('myForm').reset();

    
    fetchBookmarks();

    
    e.preventDefault();
}
//delete bookmark
function deleteBookmark(url)
{
    //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++)
    {
        if(bookmarks[i].url == url)
        {
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    //re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks 
    fetchBookmarks();
}
//Fetch bookmarks

function fetchBookmarks()
{
    //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = '';

    //use forloop to load the objects

    for(var i = 0; i< bookmarks.length; i++)
    {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        var desc = bookmarks[i].desc;

        //append to it in HTML tags you have studied this in ES6
        bookmarksResults.innerHTML += '<div class="card col-lg-12 col-md-12 col-sm-12">'+
                                        
                                        '<div class="card-body">'+
                                            '<h4 id="Title" class="card-title">'+name+'</h4>'+
                                            '<p class="card-text">'+desc+'</p>'+
                                            '<a target="_black" href="http://'+url+'">Visit '+name+'</a> '+
                                        '</div>'+
                                        '<button id="delbtn" class="card-link btn btn-danger" onclick="deleteBookmark(\''+url+'\')" href="#">Delete</a> '+
                                        '</div>'+
                                        '<br>';
    }
}
//VALIDATE FORM
function validateForm(siteName, siteUrl)
{
    //VALIDATIONS
    if(!siteName || !siteUrl)
    {
        alert('Please fill in the form');
        
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex))
    {
        alert('Please use a valid url');
        return false;
    }
    return true;
}

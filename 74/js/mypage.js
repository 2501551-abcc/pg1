//ユーザー情報の読み込み
function loadUserpage()
{
    let loginId = localStorage.getItem("userId");
    let userName = document.getElementById("username");
    let userImg = document.getElementById("userimg");

    if(loginId === null)
    {
        userName.textContent = "ゲスト";
        userImg.src = "img/icon/mypage.png";
    }
    else
    {
        let allUsers = JSON.parse(localStorage.getItem("users"));
        let authentication = allUsers.find(user => user.userID === loginId);

        if(authentication)
        {
            userImg.src = authentication.profileImg;
            userName.textContent = authentication.userName;
        }
    }
}

let logoutBtn = document.getElementById("logout-button");
if(logoutBtn)
{
    logoutBtn.addEventListener("click", function()
    {
        let confirmation = window.confirm("ログアウトしますか？");
        if(confirmation)
        {
            localStorage.removeItem("userId");
            alert("ログアウトしました");
            window.location.href = "login.html";
        }
    });
}

//お気に入りリストの表示
function favoriteContent()
{
    let favoriteArea = document.getElementById("tabpage1");
    if(!favoriteArea)
    {
        return;
    }

    favoriteArea.innerHTML = "";

    let loginId = localStorage.getItem("userId");
    let usersData = JSON.parse(localStorage.getItem("users")) || [];
    let nailsData = JSON.parse(localStorage.getItem("nails")) || [];

    if(!loginId)
    {
        return;
    }

    let me = usersData.find(user => user.userID === loginId);

    if(!me || !me.favorite || me.favorite.length === 0)
    {
        favoriteArea.innerHTML = "<p>お気に入りした投稿はありません</p>";
        return;
    }

    for(let i = 0; i < me.favorite.length; i++)
    {
        let favId = me.favorite[i];
        let target = nailsData.find(n => String(n.id) === String(favId));

        if(target)
        {
            let designDiv = document.createElement("div");
            designDiv.className = "design-display";
            designDiv.setAttribute("data-id", target.id);
            favoriteArea.appendChild(designDiv);

            designDiv.addEventListener("click", function()
            {
                let id = this.getAttribute("data-id");
                localStorage.setItem("selected_id", id);
                window.location.href = "nail-detail.html";
            });

            let photoImg = document.createElement("img");
            photoImg.className = "design-photo";
            photoImg.src = target.image;
            designDiv.appendChild(photoImg);

            let explainDiv = document.createElement("div");
            explainDiv.className = "explain-div";
            designDiv.appendChild(explainDiv);

            let h4Tag = document.createElement("h4");
            h4Tag.textContent = target.title;
            explainDiv.appendChild(h4Tag);

            let pTag = document.createElement("p");
            pTag.textContent = target.name;
            explainDiv.appendChild(pTag);
        }
    }
}

//自分の投稿リストの表示
function myPostContent()
{
    let myPostArea = document.getElementById("tabpage2");
    if(!myPostArea)
    {
        return;
    }

    myPostArea.innerHTML = "";

    let loginId = localStorage.getItem("userId");
    let usersData = JSON.parse(localStorage.getItem("users")) || [];
    let nailsData = JSON.parse(localStorage.getItem("nails")) || [];

    if(!loginId)
    {
        return;
    }

    let me = usersData.find(user => user.userID === loginId);

    if(!me || !me.myPosts || me.myPosts.length === 0)
    {
        myPostArea.innerHTML = "<p>まだ投稿したネイルはありません</p>";
        return;
    }

    for(let i = 0; i < me.myPosts.length; i++)
    {
        let postId = me.myPosts[i];
        let target = nailsData.find(n => String(n.id) === String(postId));

        if(target)
        {
            let designDiv = document.createElement("div");
            designDiv.className = "design-display";
            designDiv.setAttribute("data-id", target.id);
            myPostArea.appendChild(designDiv);

            designDiv.addEventListener("click", function()
            {
                let id = this.getAttribute("data-id");
                localStorage.setItem("selected_id", id);
                window.location.href = "nail-detail.html";
            });

            let photoImg = document.createElement("img");
            photoImg.className = "design-photo";
            photoImg.src = target.image;
            designDiv.appendChild(photoImg);

            let explainDiv = document.createElement("div");
            explainDiv.className = "explain-div";
            designDiv.appendChild(explainDiv);

            let h4Tag = document.createElement("h4");
            h4Tag.textContent = target.title;
            explainDiv.appendChild(h4Tag);

            let pTag = document.createElement("p");
            pTag.textContent = target.name;
            explainDiv.appendChild(pTag);
        }
    }
}

window.onload = function()
{
    loadUserpage();
    favoriteContent();
    myPostContent();
};
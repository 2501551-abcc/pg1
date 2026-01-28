window.onload = function()
{
    let getId = localStorage.getItem("selected_id");
    let nails = JSON.parse(localStorage.getItem("nails")) || [];

    let foundNail = nails.find(nail => nail.id == getId);

    if(!foundNail)
    {
        console.error("IDが一致するネイルが見つかりません。");
        return;
    }
    else
    {
        document.getElementById("detail-title").textContent = foundNail.title;
        document.getElementById("detail-name").textContent = foundNail.name;
        document.getElementById("detail-img").src = foundNail.image;

        let themeDiv = document.getElementById("theme-div");
        themeDiv.innerHTML = "";
        
        for(let i = 0; i < foundNail.theme.length; i++)
        {
            let h6Tag = document.createElement("h6");
            h6Tag.textContent = "#" + foundNail.theme[i];
            themeDiv.appendChild(h6Tag);
        }

        let colorLi = document.getElementById("color");
        const icon = colorLi.querySelector("img");
        const label = colorLi.querySelector("strong");
        colorLi.innerHTML = "";
        
        if(icon)
        {
            colorLi.appendChild(icon);
        }
        if(label)
        {
            colorLi.appendChild(label);
        }

        for(let i = 0; i < foundNail.color.length; i++)
        {
            let spanTag = document.createElement("span");
            spanTag.textContent = "#" + foundNail.color[i];
            colorLi.appendChild(spanTag);
        }

        document.querySelector(".design").textContent = foundNail.design.join(" / ");
        document.querySelector(".parts").textContent = foundNail.parts.join(" / ");
        
        if(foundNail.keywords.length > 0)
        {
            document.querySelector(".keywords").textContent = foundNail.keywords.join(" ");
        }
        else
        {
            document.querySelector(".keywords").textContent = "（なし）";
        }

        // お気に入り状態の初期表示チェック
        let userLoginArray = JSON.parse(localStorage.getItem("users")) || [];
        let userID = localStorage.getItem("userId");
        let me = userLoginArray.find(user => user.userID === userID);

        if(me && me.favorite && me.favorite.indexOf(getId) !== -1)
        {
            document.getElementById("like-icon").src = "img/icon/heart-red.png";
        }
        
        document.getElementById("like-count").textContent = foundNail.likes || 0;
    }
};

document.getElementById("like-button").addEventListener("click", function()
{
    let userLoginArray = JSON.parse(localStorage.getItem("users"));
    let userID = localStorage.getItem("userId");
    let authentication = userLoginArray.find(user => user.userID === userID);

    if(!authentication)
    {
        alert("ログインしてください");
        window.location.href = "login.html";
        return;
    }
    else
    {
        let getId = localStorage.getItem("selected_id");
        let nails = JSON.parse(localStorage.getItem("nails"));

        if(!authentication.favorite)
        {
            authentication.favorite = [];
        }

        let favIndex = authentication.favorite.indexOf(getId);
        let postIndex = nails.findIndex(nail => String(nail.id) === String(getId));

        if(favIndex === -1)
        {
            authentication.favorite.push(getId);
            alert("お気に入りに追加しました！");

            if(postIndex !== -1)
            {
                nails[postIndex].likes = (nails[postIndex].likes || 0) + 1;
                document.getElementById("like-count").textContent = nails[postIndex].likes;
                document.getElementById("like-icon").src = "img/icon/heart-red.png";
            }
        }
        else
        {
            authentication.favorite.splice(favIndex, 1);
            alert("お気に入りから外しました");

            if(postIndex !== -1)
            {
                if(nails[postIndex].likes > 0)
                {
                    nails[postIndex].likes--;
                }
                document.getElementById("like-count").textContent = nails[postIndex].likes;
                document.getElementById("like-icon").src = "img/icon/heart.png";
            }
        }

        localStorage.setItem("users", JSON.stringify(userLoginArray));
        localStorage.setItem("nails", JSON.stringify(nails));
    }
});
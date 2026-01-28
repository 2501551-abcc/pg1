window.onload = function()
{
    let loginId = localStorage.getItem("userId");
    if(loginId === null)
    {
        alert("ログインすると使用できる機能です");
        window.location.href = "login.html";
        return;
    }
    else
    {
        let postImage = document.getElementById("post-image");
        let imagePreview = document.getElementById("image-preview");
        let previewText = document.getElementById("preview-text");

        postImage.addEventListener("change", function(e) {
            let file = e.target.files[0];
            if (!file) 
            {
                return;
            }

            let reader = new FileReader();
            reader.onload = function(event) 
            {
                imagePreview.src = event.target.result;
                if (previewText) previewText.style.display = "none";
            };
            reader.readAsDataURL(file);
        });

        let shareBtn = document.getElementById("share-button");
        shareBtn.addEventListener("click", function() 
        {
                let loginId = localStorage.getItem("userId");
                if (loginId === null) {
                    alert("ログインしてください");
                    return;
                }
                else
                {
                    let previewImg = document.getElementById("image-preview").src;


                    if (!previewImg || previewImg.includes("default.png") || previewImg.endsWith("/")) 
                    {
                        alert("画像を選択してください");
                        return;
                    }
                    
                    //タイトル出力
                    let titleText = document.getElementsByClassName("design-name")[0].value;
                    if(titleText.trim()=== "")
                    {
                        alert("デザインの名前を入力してください");
                        return
                    }

                    //テーマ出力
                    let themeCheckboxes = document.querySelectorAll("input[name='theme']:checked");
                    let selectTheme = [];
                    themeCheckboxes.forEach((checkbox) => {
                        selectTheme.push(checkbox.value);
                    });

                    //色出力
                    let colorCheckboxes = document.querySelectorAll("input[name='color']:checked");
                    let selectColor = [];
                    colorCheckboxes.forEach((checkbox) => {
                        selectColor.push(checkbox.value);
                    });

                    //デザイン出力
                    let designCheckboxes = document.querySelectorAll("input[name='design']:checked");
                    let selectDesign = [];
                    designCheckboxes.forEach((checkbox) => {
                        selectDesign.push(checkbox.value);
                    });

                    //パーツ出力
                    let partsCheckboxes = document.querySelectorAll("input[name='parts']:checked");
                    let selectParts = [];
                    partsCheckboxes.forEach((checkbox) => {
                        selectParts.push(checkbox.value);
                    });

                    //キーワード出力
                    let keywordsInput = document.getElementById("post-keywords").value; // idで取得
                    let selectKeywords = keywordsInput ? keywordsInput.split(",").map(k => k.trim()) : [];

                    //投稿用のIDをつけて配列に格納する
                    let loginId = localStorage.getItem("userId");
                    let authentication = JSON.parse(localStorage.getItem("users")).find(user => user.userID === loginId);

                    let newPost = {
                        id:  Date.now(), 
                        title: titleText,
                        name: authentication.userName,
                        theme: selectTheme,
                        color: selectColor,
                        design : selectDesign,
                        parts: selectParts,
                        keywords: selectKeywords,
                        image: previewImg
                    };

                    let nailArray = JSON.parse(localStorage.getItem("nails"));

                    nailArray.push(newPost);
                    localStorage.setItem("nails", JSON.stringify(nailArray));

                    let users = JSON.parse(localStorage.getItem("users"));
                    let currentUser = users.find(u => u.userID === loginId);

                    if (currentUser) 
                    {
                        if (!currentUser.myPosts) 
                        {
                            currentUser.myPosts = [];
                        }
                        currentUser.myPosts.push(newPost.id); 
                        localStorage.setItem("users", JSON.stringify(users));
                    }

                    alert("投稿が完了しました！");
                    window.location.href = "design-list.html";
                }
        });


    }
}



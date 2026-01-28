
//新規登録の関数
document.getElementById("signup-decide-button").addEventListener("click", function() 
{
    let username = document.getElementById("signup-username").value;
    let pass = document.getElementById("signup-password").value;
    let confirm = document.getElementById("signup-confirm").value;

    if (username === "" || pass === "") 
    {
        alert("UserIDとPasswordを入力してください");
        return;
    }
    else if(pass !== confirm) 
    {
        alert("パスワードが一致しません");
        return;
    }
    else if(pass.length < 6)
    {
        alert("パスワードは６文字以上にしてください");
    }
    else
    {
        let userLoginArray = JSON.parse(localStorage.getItem("users"));

        if (userLoginArray.some(user => user.userID === username)) 
        {
            alert("このUserIDは既に使われています");
            return;
        }
        else
        {
            let newUser = {
                userID: username,
                password: pass,
                userName: username, 
                profileImg: "img/icon/mypage.png", 
                myPosts: [],
                favorite: []
            };

            userLoginArray.push(newUser);
            localStorage.setItem("users", JSON.stringify(userLoginArray));

            alert("アカウントを作成しました！ログインしてください。");
            window.location.href = "login.html";
        }
    }
});

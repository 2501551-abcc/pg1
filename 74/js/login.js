// This is a JavaScript file

//ユーザー認証に使う関数など
document.getElementById("login-decide-button").addEventListener("click", function() 
{
        let userid = document.getElementById("userid").value;
        let pass = document.getElementById("pass").value;

        if(userid === "" || pass === "") 
        {
            alert("ユーザーIDとパスワードを入力してください");
            return; 
        }

        let authentication = JSON.parse(localStorage.getItem("users")).find(user => user.userID === userid);
        if(!authentication)
        {
            alert("ユーザーが見つかりません");
            return;
        }  
        else
        {
            if(authentication.password === pass)
            {
                //ログイン成功
                localStorage.setItem("userId" , userid);
                window.location.href = "mypage.html";
            }
            else
            {
                alert("パスワードが正しくありません");
            }
        }
});





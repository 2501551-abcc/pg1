// This is a JavaScript file
window.onload = function()
{
    let loginId = localStorage.getItem("userId");
    if(loginId === null)
    {
        alert("ログインすると使用できる機能です");
        window.location.href = "login.html";
        return;
    }
}

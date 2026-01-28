// This is a JavaScript file

//ユーザーの情報を格納した配列
let usersLogin = [
    {
        userID: "2501551@s.asojuku.ac.jp",
        password: "aya1113", 
        userName: "彩音",
        profileImg: "img/icon/sheep.png",
        myPosts: ["2026012601"] ,
        favorite: []
    },
    {
        userID: "aya.shinon@gmail.com",
        password: "pass0617", 
        userName: "最初のユーザー",
        profileImg: "img/icon/sheep.png",
        myPosts: ["2026012602", "2026012603"],
        favorite: []
    }
];

if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify(usersLogin));
}


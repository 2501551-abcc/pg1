//データを画面に描画する専用の関数
function displayItems(dataArray) {
    let designArea = document.getElementById("display-area");
    if (!designArea) return;

    designArea.innerHTML = "";

    for (let i = 0; i < dataArray.length; i++) {
        let nail = dataArray[i];

        let designDiv = document.createElement("div");
        designDiv.className = "design-display";
        designDiv.setAttribute("data-id", nail.id);
        designArea.appendChild(designDiv);


        let photoImg = document.createElement("img");
        photoImg.className = "design-photo";
        photoImg.src = nail.image;
        designDiv.appendChild(photoImg);


        let explainDiv = document.createElement("div");
        explainDiv.className = "explain-div";
        designDiv.appendChild(explainDiv);


        let h4Tag = document.createElement("h4");
        h4Tag.textContent = nail.title;
        explainDiv.appendChild(h4Tag);


        let pTag = document.createElement("p");
        pTag.textContent = nail.name;
        explainDiv.appendChild(pTag);

        designDiv.onclick = function() {
            let designId = this.getAttribute("data-id");
            localStorage.setItem("selected_id", designId);
            window.location.href = "nail-detail.html";
        };
    }
}

//検索ボタンを押した時の処理
function searchNails() {
    let searchInput = document.getElementById("search-input");
    if (!searchInput) 
    {
        return;
    }
    
    let keyword = searchInput.value.trim();
    let allNails = JSON.parse(localStorage.getItem("nails"));


    let filteredNails = allNails.filter(nail => {
        if (!keyword) 
        {
            return true; 
        }


        let contentStr = [
            nail.title || "",
            (nail.color || []).join(""),
            (nail.theme || []).join(""),
            (nail.design || []).join(""),
            (nail.parts || []).join(""),
            (nail.keywords || []).join("")
        ].join("");

        return contentStr.includes(keyword);
    });

    displayItems(filteredNails); 
}


window.onload = function() {
    const allNails = JSON.parse(localStorage.getItem("nails"));
    displayItems(allNails); 

    const searchBtn = document.getElementById("search-button");
    if (searchBtn) {
        searchBtn.onclick = searchNails;
    }

    console.log("デザインリスト読み込み完了。投稿数:", allNails.length);
};
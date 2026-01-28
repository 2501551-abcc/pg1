//ネイルのデザイン情報を格納した配列
let nailDesign = [
    { 
        id: "2026012601",
        title: "リボンピンクネイル",
        name: "彩音",
        theme: ["ガーリー"],
        color: ["ピンク", "赤"],
        design: ["ツヤ", "グラデ"],
        parts: ["リボン"],
        keywords: [],
        image: "img/photo/pink.jpg"
    },
    { 
        id: "2026012602",
        title: "黒と大理石ネイル",
        name: "最初のユーザー",
        theme: ["クール", "モード"],
        color: ["黒"],
        design: ["マット"],
        parts: ["金ライン"],
        keywords: ["大人っぽい" , "大理石"],
        image: "img/photo/black.jpg"
    },
    { 
        id: "2026012603",
        title: "水色の冬ネイル",
        name: "最初のユーザー",
        theme: ["きれいめ"],
        color: ["水色", "白", "灰色"],
        design: ["マット"],
        parts: ["パール"],
        keywords: ["冬ネイル", "セーター"],
        image: "img/photo/blue_winter.jpg"
    }
];

if (localStorage.getItem("nails") === null) {
    localStorage.setItem("nails", JSON.stringify(nailDesign));
}



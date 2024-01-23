const express = require("express");
const path = require("path");
const app = express();


// static 파일들을 제공할 경로를 설정
app.use(express.static(path.resolve(__dirname, "src")));

// 라우팅
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "src", "index.html"));
});


app.listen(process.env.PORT || 3001, () => {
    console.log("Server running...")
});

let sensitiveWord = require("../index");


sensitiveWord.init();
// sensitiveWord.loadFile("./keywords0");

function test(w) {
    console.log(sensitiveWord.sensitiveCheck(w), w, sensitiveWord.filter(w));
}

test("习 近平大大");
test("习近平大大");
test("习近平");
test("习近平前妻");
test("习大大");
test("习大大 ");
test("习大大前妻");
test("小屌丝");

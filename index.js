var fs = require('fs');

module.exports = {
    tree: {},

    init() {
        this.loadFile(__dirname + '/keywords');
        // console.log(JSON.stringify(this.tree));
    },

    loadFile(fileName) {
        let words = fs.readFileSync(fileName, "utf8").split("\r\n");
        for (let word of words) {
            this.addWord(word);
        }
    },

    addWord(word) {
        if (word) {
            let parent = this.tree;
            for (var i = 0; i < word.length; i++) {
                if (!parent[word[i]]) {
                    parent[word[i]] = {};
                }
                parent = parent[word[i]];
            }
            parent.isEnd = true;
        }
    },

    sensitiveCheck(word) {
        var parent = this.tree,
            exists = false;
        for (var i = 0; i < word.length; i++) {
            if (['*', '', ' ', ',', '.', '?'].indexOf(word[i]) != -1) {
                // 过滤掉干扰字符
                continue;
            }

            for (var j = i; j < word.length; j++) {
                if (!parent[word[j]]) {
                    exists = false;
                    parent = parent;
                    break;
                }

                if (parent[word[j]].isEnd) {
                    exists = true;
                    break;
                }
                parent = parent[word[j]];
            }

            if (exists) {
                break;
            }
        }
        return exists;
    },

    filter(word, options) {
        var parent = this.tree;
        for (var i = 0; i < word.length; i++) {
            if (['*', '', ' ', ',', '.', '?'].indexOf(word[i]) != -1) {
                // 过滤掉干扰字符
                continue;
            }
            var exists = false,
                skip = 0,
                sensitiveWord = '';

            for (var j = i; j < word.length; j++) {
                sensitiveWord = sensitiveWord + word[j];
                skip = j - i;
                if (['*', '', ' ', ',', '.', '?'].indexOf(word[j]) != -1) {
                    // 过滤掉干扰字符
                    if (j == word.length - 1 && skip != 0) {
                        exists = true;
                    }
                    continue;
                }

                if (!parent[word[j]]) {
                    exists = false;
                    parent = parent;
                    break;
                }

                // 最大长度匹配
                if (parent[word[j]].isEnd && (Object.keys(parent[word[j]]).length == 1 || j == word.length - 1)) {
                    exists = true;
                    break;
                }
                parent = parent[word[j]];
            }

            if (skip > 1) {
                i += skip - 1;
            }

            if (!exists) {
                continue;
            }

            var stars = '*';
            for (var k = 0; k < skip; k++) {
                stars = stars + '*';
            }

            word = word.replace(new RegExp(sensitiveWord, 'g'), stars);
        }

        if (options && options.callback) {
            options.callback(word);
        } else {
            return word;
        }
    }
};

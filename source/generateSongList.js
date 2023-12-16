
import { readdir, statSync, writeFileSync } from "fs";
import { join, basename, resolve, parse } from "path";

const currentDir = process.cwd();
console.log(currentDir);
const dir = resolve(currentDir, "../lyrics");
const outdir = resolve(currentDir, "src/assets/songList.json") 

var walk = function(p, callback){
	var results = [];
		
	readdir(p, function (err, files) {
		if (err) throw err;
 
		var pending = files.length;	
		if (!pending) return callback(null, results); //全てのファイル取得が終わったらコールバックを呼び出す
		
		files.map(function (file) { //リスト取得
			return join(p, file);
		}).filter(function (file) {
			if(statSync(file).isDirectory()) walk(file, function(err, res) { //ディレクトリだったら再帰
				results.push({category:basename(file), song:res}); //子ディレクトリをchildrenインデックス配下に保存
				if (!--pending) callback(null, results);
			 });
			return statSync(file).isFile();
		}).forEach(function (file) { //ファイル名を保存
			var stat = statSync(file);
			results.push(parse(basename(file)).name);
			if (!--pending) callback(null, results);
		});
		
	});
}
 
walk(dir, function(err, results) {
	if (err) throw err;
	writeFileSync(outdir, JSON.stringify(results))
	console.log(JSON.stringify(results)); //一覧出力
});
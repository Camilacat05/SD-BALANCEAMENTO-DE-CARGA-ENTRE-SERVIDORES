const express = require('express');
const bodyParser = require('body-parser');
var os 	= require('os-utils');

const app = express();

app.use(bodyParser.json());

app.post('/servidor2', (req, res) => {
    let variavel = req.body;

	if (variavel.teste>1){
		console.log("Contando as palavras...");
		var wordcnt = variavel.palavra.replace(/[^\w\s]/g, "").split(/\s+/).reduce(function(map, word){
			map[word] = (map[word]||0)+1;
			return map;
		}, Object.create(null));
		// console.log(wordcnt);
        res.send({palavra: wordcnt,cpu:0});
	}

	if(variavel.teste==1){
		os.cpuUsage(function(v){
			console.log( 'Uso da cpu: ' + v);
			res.send({palavra: variavel.palavra,cpu:v});

		});
	}


});

app.listen(3001, () => {
    console.log("Servidor online!");
});



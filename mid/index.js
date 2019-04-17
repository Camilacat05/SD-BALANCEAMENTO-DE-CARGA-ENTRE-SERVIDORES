const request = require('request'); //fazer requisições a servidores
const threads = require('threads').spawn; //biblioteca para trabalhar com threads no node.js
const fs = require('fs');
const readline = require('readline');

var maior = 1;
var ip = "";
var string = "";
var result;	
var list = ["http://192.168.43.21:3001/servidor2","http://192.168.43.228:3002/servidor3","http://192.168.43.200:3003/servidor4"];

class Palavra {
    constructor() {
    }

    async palavraRecebe(req, res) { //método que recebe a requisição do app, cria uma thread e abre um canal, dentro do canal envia duas requisições (servidor 1 e servidor 2), e após receber a resposta dos dois, retorna essa resposta para a aplicação cliente que fez a requisição.
        const thread = threads((input, done) => { //cria a thread
            done();
        });
        thread.send().on('message', async (response) => {
            const palavra = req.body.palavra;
            await this.pegaPalavras(palavra, res);
            thread.kill(); // encerra a thread
        })
            .on('error', function (error) {
                console.error('Worker errored:', error);
            })
            .on('exit', function () {// quando encerra a thread vem pra cá
                console.log('Worker has been terminated.');
            });
    }
    // envia as requisições aos dois servidores (chama os dois métodos responsáveis pelo envio das requisições)
    async pegaPalavras(palavra, res) {
		var cont =0;
		
		/*const rl = readline.createInterface({
		  input: fs.createReadStream('ip.txt'),
		  crlfDelay: Infinity
		});

		rl.on('line',(line) => {
			console.log(line);
			list[cont] = line;
			cont = cont +1;
			
		});*/
		cont = 0;
		var tam = list.length;
		var i;
		console.log("Servidores encontrados: ",tam);
		for(i=0;i<tam;i++){
			
			result = await this.Server(palavra,list[i]);
			try{	
				if(result.cpu < maior ){
					console.log(result.cpu);

					maior = result.cpu;
					ip = list[i];
					cont = cont+1;
				}
			}catch(err){
			
			}
		}	
		
		let resultpalavras = await this.Conta(ip,palavra,2);
							
		for (var key in resultpalavras.palavra) {
			string = string + key + " "+ resultpalavras.palavra[key]+ " ";
		}
		console.log(string);
		res.send({ palavraCaixaAlta: string, palavraConcatenada: string});		
		string = "";
		
	}
	
	async Conta(ip,palavra,i) {
        return new Promise((resolve, reject) => {
            request.post(ip, {
                json: {
                    palavra: palavra,
					teste: i
                }
            }, (error, resp, body) => {
                if (error) {
                    reject(error);
                } else {
					resolve(body);
                }
            });
        });
    }
	
	async Server(palavra,ip) {
        return new Promise((resolve) => {
            request.post(ip, {
                timeout: 5000,
				json: {
                    palavra: palavra,
					teste: 1
                }
            }, (error, resp, body) => {
				if (error) {
					console.log(ip," não encontrado");
                    resolve(body);
                } else {
					console.log(ip," encontrado");
					resolve(body);
                }
				
            });
        });
    }
	
	
	//requisições ao servidores

    /*
	async Server(palavra,ip) {
        return new Promise((resolve, reject) => {
            request.post(ip, {
                json: {
                    palavra: palavra,
					teste: 1
                }
            }, (error, resp, body) => {
				if (error) {
					console.log("dei erro aqui ó ");
                    reject(error);
                } else {
					resolve(body);
                }
				
            });
        });
    }
	
	async Server2(palavra,i) {
        return new Promise((resolve, reject) => {
            request.post('http://192.168.43.21:3001/servidor2', {
                json: {
                    palavra: palavra,
					teste: i
                }
            }, (error, resp, body) => {
                if (error) {
					console.log("dei erro aqui ó ");
                    reject(error);
                } else {
					resolve(body);
                }
            });
        });
    }
	
   */
}


export default Palavra;

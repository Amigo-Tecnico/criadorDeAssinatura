/*function geraColorPicker(x) {
    'x'.colorpicker({
      format: 'hex'
    });
    
  };

  function myFunction(x, y) {
    if (y === undefined) {
        y = 0;
      }
  }
*/

  	/* Máscaras ER */
	function mascara(o,f){
		v_obj=o
		v_fun=f
		setTimeout("execmascara()",1)
	}
	function execmascara(){
		v_obj.value=v_fun(v_obj.value)
	}
	function mtel(v){
		v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
		v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
		v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
		return v;
	}

function corrigeSite(site){
	corrigido = site.replace(/(^\w+:|^)\/\//, '');
	return corrigido;
}
	
//Script do Upload da Imagem
async function uploadLogo() {
	let formData = new FormData();
	let userLogo = document.getElementById('endImagem').files[0];
	var nomeArquivoLogo = userLogo.name;
	var extensaoArquivoLogo = nomeArquivoLogo.split('.').pop();

	var nome = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	formData.append("logo", userLogo);
	
	if(extensaoArquivoLogo != 'png' && extensaoArquivoLogo != "jpg" && extensaoArquivoLogo != "jpeg") { 
		alert("A imagem precisa estar nos formatos PNG ou JPEG!")
	} else {	
	try {
		let r = await fetch("https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/WijmPawhb40Y_AgymFrGlmnjxZWHsxAu4igWOzyGH4za0Knl7ciNDI0PAZEquqri/n/grfgqpc2fzmk/b/bucket/o/" + nome + "." + extensaoArquivoLogo, {
		  	body: userLogo,
  			headers: {
			"Content-Type": "application/x-www-form-urlencoded"
  			},
  			method: "PUT"
		})
		document.getElementById("htmlLogo").src = "https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/grfgqpc2fzmk/b/bucket/o/" + nome + "." + extensaoArquivoLogo;

	} catch(e) {
		console.log('Erro: ', e);
	}

	}
}

//Clipboard
  function copyTextToClipboard() {
	var text = document.getElementById('assinatura').innerHTML;
	var textArea = document.createElement("textarea");
  
	//
	// *** This styling is an extra step which is likely not required. ***
	//
	// Why is it here? To ensure:
	// 1. the element is able to have focus and selection.
	// 2. if element was to flash render it has minimal visual impact.
	// 3. less flakyness with selection and copying which **might** occur if
	//    the textarea element is not visible.
	//
	// The likelihood is the element won't even render, not even a
	// flash, so some of these are just precautions. However in
	// Internet Explorer the element is visible whilst the popup
	// box asking the user for permission for the web page to
	// copy to the clipboard.
	//
  
	// Place in top-left corner of screen regardless of scroll position.
	textArea.style.position = 'fixed';
	textArea.style.top = 0;
	textArea.style.left = 0;
  
	// Ensure it has a small width and height. Setting to 1px / 1em
	// doesn't work as this gives a negative w/h on some browsers.
	textArea.style.width = '2em';
	textArea.style.height = '2em';
  
	// We don't need padding, reducing the size if it does flash render.
	textArea.style.padding = 0;
  
	// Clean up any borders.
	textArea.style.border = 'none';
	textArea.style.outline = 'none';
	textArea.style.boxShadow = 'none';
  
	// Avoid flash of white box if rendered for any reason.
	textArea.style.background = 'transparent';
  
  
	textArea.value = text;
  
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
  
	try {
	  var successful = document.execCommand('copy');
	  var msg = successful ? 'successful' : 'unsuccessful';
	  console.log('A cópia foi bem sucedida!');
	  alert('O HTML da assinatura foi copiado!')
	} catch (err) {
	  console.log('Oops, erro ao copiar');
	}
  
	document.body.removeChild(textArea);
  }
  
  
  var copyBobBtn = document.querySelector('.clipboard');
	  
  copyBobBtn.addEventListener('click', function(event) {
	copyTextToClipboard(document.getElementById('assinatura').innerHTML);
  });

//Download
  function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/html,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
  
	element.style.display = 'none';
	document.body.appendChild(element);
  
	element.click();
  
	document.body.removeChild(element);
  }
  
  // Start file download.
  document.getElementById("dwn-btn").addEventListener("click", function(){
  // Start the download of yournewfile.txt file with the content from the text area
	  var text = document.getElementById("assinatura").innerHTML;
	  var filename = "yournewfile.htm";
	  
	  download(filename, text);
  }, false);
	  
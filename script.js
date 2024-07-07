import { HuffmanCoder } from './huffman.js';


onload = function () {

    const encode = document.getElementById('encode');
    const decode = document.getElementById('decode');
    const upload = document.getElementById('uploadedFile');
    const testi = document.getElementById('test');
    const test1 = document.getElementById('test1');
    const realFileBtn = document.getElementById("uploadedFile");
    const customBtn = document.getElementById("custom-button");
    const customTxt = document.getElementById("custom-text");

    customBtn.addEventListener("click", function() {
    realFileBtn.click();
    });

    realFileBtn.addEventListener("change", function() {
    if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value.match(
        /[\/\\]([\w\d\s\.\-\(\)]+)$/
        )[1];
    } else {
        customTxt.innerHTML = "No file chosen, yet.";
    }
    });


    const coder = new HuffmanCoder();

    upload.addEventListener('change',()=>{ swal("File uploaded", "", "success"); });

    encode.onclick = function () {

        const uploadedFile = upload.files[0];
        if(uploadedFile===undefined){
            swal("No File Uploaded","Please upload a file and try again", "warning");
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){
            const text = fileLoadedEvent.target.result;
            if(text.length===0){
                swal("Text can not be empty!","Please upload a file and try again", "warning");
                return;
            }
            let [encoded, tree_structure, info] = coder.encode(text);
            downloadFile(uploadedFile.name.split('.')[0] +'_encoded.txt', encoded);
            testi.innerText = "\nHuffman Codes of corresponding characters in the uploaded file:\n" + tree_structure;
            test1.innerText = "\n" + info + "\n\n";
        };
        fileReader.readAsText(uploadedFile, "UTF-8");
    };

    decode.onclick = function () {

        const uploadedFile = upload.files[0];
        if(uploadedFile===undefined){
            swal("No File Uploaded","Please upload a file and try again", "warning");
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){
            const text = fileLoadedEvent.target.result;
            if(text.length===0){
                swal("Text can not be empty!","Please upload a file and try again", "warning");
                return;
            }
            let [decoded, tree_structure, info] = coder.decode(text);
            downloadFile(uploadedFile.name.split('.')[0] +'_decoded.txt', decoded);
            testi.innerText = "";
            test1.innerText = "\n\n" + info + "\n\n";

        };
        fileReader.readAsText(uploadedFile, "UTF-8");
    };

};

function downloadFile(fileName, data){
    let a = document.createElement('a');
    a.href = "data:application/octet-stream,"+encodeURIComponent(data);
    a.download = fileName;
    a.click();
}
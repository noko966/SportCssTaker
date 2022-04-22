const fs = require("fs");
const fse = require('fs-extra');
const map = require("./map");

function createCssTxt(map) {
    let rootCssTxt = `:root,\n`;
    rootCssTxt += `:root[data-theme="${map['theme']}"],\n`;
    rootCssTxt += `:root [data-theme="${map['theme']}"] {\n`;
    for (let key in map) {
        if (['id', 'theme'].includes(key)) continue;
        rootCssTxt += `--${key}:${map[key]};\n`;
    }
    rootCssTxt += `}`;

    return rootCssTxt;

}


const SRC = './process/src';
const DIST = './process/dist';

const doneArray = [];
const failArray = [];

const files = fs.readdirSync(SRC);

function emptyDist(){
    fse.emptyDirSync(DIST);
}

function emptySrc(){
    fse.emptyDirSync(SRC);
}

function copySrcToyDist(){
    fse.copySync(SRC, DIST, {
        overwrite: true
    }, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("success!");
        }
    });
}

function addToDistCss(){
    files.forEach((file) => {
        const path = `${SRC}/${file}/Styles/web.css`;
        const fileExist = fs.existsSync(path);
        if(!fileExist) return
        let content = fs.readFileSync(path, "utf8");
    
        let currentPartnerMap = map.find((p) => {
            return p.id === parseInt(file);
        })

        if(!currentPartnerMap) {
            console.log(`${file} id has error`);
            return
        }

        console.log(file);
    
        let css = createCssTxt(currentPartnerMap);
    
        fs.writeFileSync(`${DIST}/${file}/Styles/web.css`, `${css}/*\n*/${content}`);
    
    })
}





function emptyAll(){
    emptyDist();
    emptySrc();
}


function doJob(){
    emptyDist();
    copySrcToyDist();
    addToDistCss();
}

emptyDist();

// emptyAll();

// doJob();
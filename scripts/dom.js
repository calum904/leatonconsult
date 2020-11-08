#! /usr/bin/env node
/**
 * @file dom.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief Prunes the development development index.html file to enable
 *        a webpacked version to be derrived from it
 */
const fs    = require("fs"),
      path  = require("path"),
      jsdom = require("jsdom");

const { JSDOM } = jsdom;

if(process.argv.length >= 4) {
    const indexPath = path.resolve(process.argv[2]),
          output    = path.resolve(process.argv[3]);

    console.log(`[INFO] Reading ${indexPath}`);

    fs.readFile(indexPath, "utf8", (err, data) => {
        if(null === err) {
            const dom = new JSDOM(data.toString());

            let linkElems = dom.window.document.head.querySelectorAll("link");
            for(let elem of linkElems) {
                if("stylesheet" === elem.getAttribute("rel"))
                    elem.parentElement.removeChild(elem);
            }
            
            let scriptElems = dom.window.document.head.querySelectorAll("script");
            for(let elem of scriptElems)
                elem.parentElement.removeChild(elem);

            const BASE_HREF = "https://calum904.github.io/leatonconsultancy.github.io/dist/";
            console.log(`[INFO] Setting base HREF ${BASE_HREF}`);
            let baseHref = dom.window.document.createElement("base");
            baseHref.href = BASE_HREF;
            //dom.window.document.head.appendChild(baseHref);

            console.log(`[INFO] Writing output to ${output}`);
            fs.writeFile(output, dom.window.document.documentElement.outerHTML, (err) => {
                if(null === err)
                    console.log("[INFO] Successfully created HTML file");
                else
                    console.log("[ERROR] Unable to save HTML file", err);
            });
        } else {
            console.log("[ERROR] Unable to read file");
            console.log(err);
        }
    });
} else
    console.log(`[INFO] Usage: ${process.argv[1]} [INPUT_INDEX_HTML] [OUTPUT_INDEX_HTML]`);

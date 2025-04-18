import { readFileSync, readdirSync } from "fs";
let idPerfix = "";
const svgTitle = /<svg([^>+].*?)>/;
const clearHeightWidth = /(width|height)="([^>+].*?)"/g;
const hasViewBox = /(viewBox="[^>+].*?")/g;
const clearReturn = /(\r)|(\n)/g;
// 查找svg文件
function svgFind(e:any) :any{
  const arr = [];
  const dirents = readdirSync(e, { withFileTypes: true });
  for (const dirent of dirents) {
    if (dirent.isDirectory()) arr.push(...svgFind(e + dirent.name + "/"));
    else {
      
      const svg = readFileSync(e + dirent.name)
        .toString()
        .replace(clearReturn, "")
        //@ts-ignore
        .replace(svgTitle, ($1:any, $2:any) => {
          let width = 0,
            height = 0,
            //@ts-ignore
            content = $2.replace(clearHeightWidth, (s1:any, s2:any, s3:any) => {
              if (s2 === "width") width = s3;
              else if (s2 === "height") height = s3;
              return "";
            });
          if (!hasViewBox.test($2))
            content += `viewBox="0 0 ${width} ${height}"`;
          return `<symbol id="${idPerfix}-${dirent.name.replace(
            ".svg",
            ""
          )}" ${content}>`;
        })
        .replace("</svg>", "</symbol>");
      arr.push(svg);
    }
  }
  return arr;
}
// 生成svg
export const createSvg = (path: any, perfix = "icon") => {
  if (path === "") return;
  idPerfix = perfix;
  const res = svgFind(path);
  return {
    name: "svg-transform",
    transformIndexHtml(dom: String) {
      return dom.replace(
        "<body>",
        `<body><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">${res.join(
          ""
        )}</svg>`
      );
    },
  };
};


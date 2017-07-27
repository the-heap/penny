const fs = require("fs");
const { promisify } = require("util");

async function addImageToList(drawingInfo) {
  // throws error if file doesn't exist
  const drawingsListJson = await promisify(fs.readFile)(
    "./drawings.json",
    "utf-8"
  );

  // throws error if file is blank
  let drawingsList = JSON.parse(drawingsListJson);

  // just in case drawings.json has some other type at the root of structure
  if (!Array.isArray(drawingsList)) {
    drawingsList = [];
  }

  drawingsList.push(drawingInfo);

  const newJson = JSON.stringify(drawingsList, null, 2);

  return promisify(fs.writeFile)("./drawings.json", newJson);
}

module.exports = {
  addImageToList
};

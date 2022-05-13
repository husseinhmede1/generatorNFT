const fs = require("fs");
    const dir = __dirname;
    const width = 1000;
    const height = 1000;

    const rarities = [
        { key: "deep", val: "deep sea"},
        { key: "_leg", val: "legendery"},
        { key: "_epc", val: "epic"},
        { key: "_ucmn", val: "uncommon"},
        { key: "_cmn", val: "common"},
    ]

    const addRarity =(_str) => {
        let itemRarity;
        rarities.forEach(rarity => {
            if(_str.includes(rarity.key)) {
                itemRarity = rarity.val;
            }
        });
        return itemRarity;
    }
    const clearName = (_str) => {
        let name = _str.slice(0, -4);
        rarities.forEach(rarity => {
            name = name.replace(rarity.key, "");
        });
        return name;
    };

    const getElements = (path) => {
        return fs
        .readdirSync(path)
        .filter((item) => !/{^|\}\.[^\/\.]/g.test(item))
        .map((i, index) => {
            return {
                id: index + 1,
                name: clearName(i),
                fileName: i,
                rarity: addRarity(i),
            };
        });
    };

    const layers = [
        {
        id: 1,
        name: "background",
        location:  `${dir}/assets/background/`,
        elements: getElements(`${dir}/assets/background/`),
        position: {x: 0, y: 0},
        size: {width: width, height: height},
        },
        {
            id: 2,
            name: "charms",
            location:  `${dir}/assets/charms/`,
            elements: getElements(`${dir}/assets/charms/`),
            position: {x: 0, y: 0},
            size: {width: width, height: height},
        },
        {
            id: 3,
            name: "mouth",
            location:  `${dir}/assets/mouth/`,
            elements: getElements(`${dir}/assets/mouth/`),
            position: {x: 0, y: 0},
            size: {width: width, height: height},
        },
        {
            id: 4,
            name: "body",
            location:  `${dir}/assets/body/`,
            elements: getElements(`${dir}/assets/body/`),
            position: {x: 0, y: 0},
            size: {width: width, height: height},
        },
        {
            id: 5,
            name: "black hole",
            location:  `${dir}/assets/blackHole/`,
            elements: getElements(`${dir}/assets/blackHole/`),
            position: {x: 0, y: 0},
            size: {width: width, height: height},
        },
    ]

    // console.log(layers[3].elements);

    module.exports = {layers, width, height};
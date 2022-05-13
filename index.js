    const { createCanvas, loadImage } = require("canvas");
    const fs = require("fs");
    const console = require("console");
    const canvas = createCanvas(1000, 1000);
    const ctx = canvas.getContext("2d");
    const { layers, width, height } = require("./config.js");
    const edition = 40;
    const commonMax = 10;
    const uncommonMax = 12;
    const epicMax = 14;
    const legenderyMax = 26;
    // const deepSeaMax = 10;

    const repeatedList = {
        deepSea: 0,
        legendery: 0,
        epic: 0,
        uncommon: 0,
        common: 0,
    }

    const saveLayer = (_canvas, _edition) => {
        fs.writeFileSync(`./outputAssets/${_edition}.png`, _canvas.toBuffer("image/png"));
    }


    const drawLayer = (_layer, _edition) => {

        setTimeout(async () => {
           let element = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
           let newElement = null;
           let image = await loadImage(`${_layer.location}${element.fileName}`);

           if(repeatedList.common/edition * 100  < commonMax )
            {
                if(element.rarity === 'common')
                {
                    repeatedList.common ++;
                }
            }
            else {
                if(element.rarity === 'common')
                {
                  while(true){
                  newElement = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
                  if(newElement.rarity === 'deep sea')
                    {
                      console.log('common has reach the maximum num allowed');
                  break;
                    }
                }
                }
            }

            if(repeatedList.uncommon/edition * 100  < uncommonMax )
            {
                if(element.rarity === 'uncommon')
                {
                    repeatedList.uncommon ++;
                }
            }
            else {
                if(element.rarity === 'uncommon')
                {

                 while(true){
                  newElement = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
                  if(newElement.rarity === 'deep sea')
                   {
                    console.log('uncommon has reach the maximum num allowed');
                    break;                    
                    }
                }
                }
            }


            if(repeatedList.epic/edition * 100  < epicMax )
            {
                if(element.rarity === 'epic')
                {
                    repeatedList.epic ++;
                }
            }
            else {
                if(element.rarity === 'epic')
                {
                while(true){
                newElement = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
                if(newElement.rarity === 'deep sea')
                {
                    console.log('epic has reach the maximum num allowed');
                    break;
                }
                }
                }
            }

            if(repeatedList.legendery/edition * 100  < legenderyMax )
            {
                if(element.rarity === 'legendery')
                {
                    repeatedList.legendery ++;
                }
            }
            else {
                if(element.rarity === 'legendery')
                {
                while(true){
                newElement = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
                if(newElement.rarity === 'deep sea')
                {
                    console.log('legendery has reach the maximum num allowed');
                    break;
                }
                }
                }
            }

            if(newElement)
            {
                element = newElement;
                image = await loadImage(`${_layer.location}${element.fileName}`);
            }

        console.log(_edition);
        console.log(image);
        ctx.drawImage(image,
                     _layer.position.x,
                     _layer.position.y,
                     _layer.size.width,
                     _layer.size.height);
        console.log(
            `I created the ${_layer.name} layer, and choose element ${element.name} rarity ${element.rarity}`
        );
            
       saveLayer(canvas, _edition);

    }, 50);

        };

    for(let i = 1; i <= edition; i++){
        layers.forEach(layer => {
           drawLayer(layer, i);   
        });
    }

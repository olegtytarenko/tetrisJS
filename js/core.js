(function(w, d) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var rowsShow = 32;
    var figuresTetris = [
        {
            'position': 0,
            'maxPosition': 1,
            'map': [
                [1],
                [1],
                [1],
                [1]
            ]
        },
        {
            'position': 0,
            'map': [
                [1, 1],
                [1, 0],
                [1, 0],
                [1, 0],
            ]
        },
        {
            'position': 0,
            'maxPosition': 1,
            'map': [
                [0, 1],
                [1, 1],
                [1, 0]
            ]
        },
        {
            'position': 0,
            'maxPosition': 1,
            'map': [
                [1, 0],
                [1, 1],
                [0, 1]
            ]
        },
        {
            'position': 0,
            'map': [
                [0, 1, 1],
                [1, 1, 0],
                [0, 1, 0]
            ]
        },
        {
            'position': 0,
            'map': [
                [1, 0],
                [1, 1],
                [1, 0],
                [1, 0]
            ]
        },
        {
            'position': 0,
            'map': [
                [1, 0],
                [1, 0],
                [1, 1],
                [1, 0]
            ]
        },
        {
            'position': 0,
            'map': [
                [1, 1, 1],
                [0, 1, 0],
                [0, 1, 0]
            ]
        },
        {
            'position': 0,
            'map': [
                [1, 0],
                [1, 1],
                [1, 1]
            ]
        },
        {
            'position': 1,
            'minPosition': 1,
            'maxPosition': 2,
            'map': [
                [1, 1, 1],
                [1, 0, 0],
                [1, 0, 0]
            ]
        },
        {
            'position': 0,
            'minPosition': 1,
            'maxPosition': 2,
            'map': [
                [0, 1, 1],
                [1, 1, 0],
                [1, 0, 0]
            ]
        },
        {
            'position': 0,
            'maxPosition': 1,
            'map': [
                [0, 1, 1],
                [0, 1, 0],
                [1, 1, 0]
            ]
        },
        {
            'position': 0,
            'map': [
                [0, 1, 0],
                [1, 1, 1],
                [0, 1, 0]
            ]
        },
        {
            'position': 0,
            'map': [
                [1, 1, 0],
                [1, 0, 0],
                [1, 1, 0]
            ]
        }
    ];
    var blockContent = d.getElementsByClassName('content');
    var HeightScreen = d.body.scrollHeight - 4;
    if(blockContent.length > 0) {
        blockContent = d.getElementsByClassName('content').item(0);
    }
    var heightBlock =  blockContent.clientWidth / rowsShow;
    var countRows = Math.floor(HeightScreen / heightBlock);
    var mapContentBlock = [];
    for(var i = 0; i < countRows; i++) {
        var rowElementBlock = d.createElement('div');
        rowElementBlock.setAttribute('class', 'block-item__row');
        for(var j = 0; j < rowsShow; j++) {
            var cellElementBlock = d.createElement('div');
            cellElementBlock.setAttribute('class', 'block-item__cell');
            cellElementBlock.setAttribute('style', 'height: ' + heightBlock + 'px; width:' + heightBlock + 'px');
            rowElementBlock.appendChild(cellElementBlock);

        }
        mapContentBlock.push(rowElementBlock);
        blockContent.appendChild(rowElementBlock);
    }

    var mapAllContent = mapContentBlock.map(function(blockElement) {
        var listsPush = [];
        for (var i = 0; i < blockElement.children.length; i++) {
            listsPush.push(0);
        }
        return listsPush;
    });
    var objectFigure = function() {
        mapAllContent.forEach(function(itemRow, keyRow) {
            var blockRowElement = mapContentBlock[keyRow];
            itemRow.forEach(function(elementCell, keyNumber) {
                var selectElement = blockRowElement.children[keyNumber];
                if(elementCell === 1) {
                    selectElement.setAttribute('class', 'block-item__cell bg-red end')
                } else {
                    selectElement.setAttribute('class', 'block-item__cell')
                }
            });
        });
        var randomTetrisFigures = getRandomInt(0, figuresTetris.length - 1);
        var figureCorrect = figuresTetris[randomTetrisFigures];
        var tekPositionRow = 0;
        var tekPosition = 0;

        var timeCache;
        var hasClassEnd = '';
        var maxPositionRow = (mapContentBlock.length - figureCorrect.map.length);
        function renderFigure() {
            mapContentBlock.forEach(function(elemntBlock) {
                for(var iCount = 0; iCount < elemntBlock.children.length; iCount++) {
                    var itemElBlock = elemntBlock.children[iCount];
                    if(!/end/gi.test(itemElBlock.getAttribute('class'))) {
                        itemElBlock.setAttribute('class', 'block-item__cell')
                    }
                }
            });

            var rowHeight = figureCorrect.map.length;
            var rowWidth = figureCorrect.map[0].length;


            var tmpPositionRow = mapAllContent.map(function(items, keyPosition) {
                return {
                    'position': keyPosition,
                    'lists': items.map(function(item, keyPosition) {
                        return {
                            select: item,
                            position: keyPosition
                        };
                    }).filter(function(item) {
                        return item.select === 1;
                    })
                }
            }).filter(function(items) {
                return items.lists.filter(function(item) {return item.select === 1; }).length > 0;
            });


            tmpPositionRow.forEach(function(settingSelect) {
                settingSelect.lists.forEach(function (t) {
                    if(t.position === tekPosition) {
                        maxPositionRow = settingSelect.position - rowHeight;
                    }
                })
            });
            console.log(tmpPositionRow, tekPosition, rowHeight, tekPositionRow, maxPositionRow);


            if(tekPositionRow >= maxPositionRow) {
                tekPositionRow = tekPositionRow;

                for(var itemLegnhtRow = 0; itemLegnhtRow < figureCorrect.map.length; itemLegnhtRow++) {
                    var listsFillBlock = figureCorrect.map[itemLegnhtRow];

                    for(var secondsFillBLock = 0; secondsFillBLock < listsFillBlock.length; secondsFillBLock++) {
                        if(mapAllContent[tekPositionRow + itemLegnhtRow][(tekPosition - listsFillBlock.length) + secondsFillBLock] !== 1) {
                            mapAllContent[tekPositionRow + itemLegnhtRow][(tekPosition - listsFillBlock.length) +  secondsFillBLock] = listsFillBlock[secondsFillBLock];
                        }
                    }
                }
                hasClassEnd = ' end';
            }

            if(typeof mapContentBlock[tekPositionRow] === 'object') {
                figureCorrect.map.forEach(function(item, key) {
                    var rowEl = mapContentBlock[key + tekPositionRow];
                    var positoin = 0;
                    if(tekPosition <=0 ) {
                        positoin = 0;
                        tekPosition = item.length;
                    } else {
                        positoin = tekPosition - item.length;
                    }
                    if(positoin <= 0) {
                        positoin = 0;
                    }
                    item.forEach(function(itemCell, keyCell) {
                        if(itemCell === 1 && !/end/gi.test(rowEl.children[keyCell].getAttribute('class'))) {
                            rowEl.children[positoin + keyCell].setAttribute('class', 'block-item__cell bg-blue' + hasClassEnd);
                        }
                    });
                })
            } else {
                console.log('not dound ');
            }
        }
        renderFigure();
        d.addEventListener('keyup', function(key) {
            if(hasClassEnd === '') {
                switch (key.key) {
                    case 'ArrowLeft':
                        tekPosition = tekPosition - 1;
                        break;
                    case 'ArrowRight':
                        tekPosition = tekPosition  + 1;
                        break;
                    case 'ArrowUp':
                        // case 'ArrowUp':
                        //     console.log('up key');
                        var tmpNew = [];
                        var RowAdded = 0;
                        if(figureCorrect.hasOwnProperty('minPosition') && figureCorrect.position <= figureCorrect.minPosition) {
                            figureCorrect.position = figureCorrect.minPosition;
                        }
                        switch (figureCorrect.position) {
                            case 0:
                            case 2:
                                for(var firstCount = 0; firstCount < figureCorrect.map.length; firstCount++) {
                                    figureCorrect.map[firstCount].forEach(function(itemValue, keyCELL) {
                                        if(typeof tmpNew[keyCELL] === 'undefined') {
                                            tmpNew[keyCELL] = [];
                                        }

                                        tmpNew[keyCELL][firstCount] = itemValue;
                                    });
                                }
                                figureCorrect.position++;
                                break;
                            case 1:
                            case 3:
                                for(var firstCountMinus = figureCorrect.map.length - 1, rowCountNormal = 0; firstCountMinus > -1; firstCountMinus--, rowCountNormal++) {
                                    for(var secondsCountMinus = figureCorrect.map[firstCountMinus].length - 1, secondsNormal = 0; secondsCountMinus > -1; secondsCountMinus--, secondsNormal++) {

                                        var itemValue = figureCorrect.map[firstCountMinus][secondsCountMinus];
                                        if(typeof tmpNew[rowCountNormal] === 'undefined') {
                                            tmpNew[rowCountNormal] = [];
                                        }

                                        tmpNew[rowCountNormal][secondsNormal] = itemValue;
                                    }
                                }
                                if(figureCorrect.position === 3) {
                                    figureCorrect.position = 0;
                                } else {
                                    figureCorrect.position++;
                                }
                                break;
                        }

                        if(figureCorrect.hasOwnProperty('maxPosition') && figureCorrect.position >= figureCorrect.maxPosition) {
                            figureCorrect.position = 0;
                        }


                        figureCorrect.map = tmpNew;
                        console.log(figureCorrect, tmpNew);
                        break;
                    case 'ArrowDown':
                        tekPositionRow = tekPositionRow + 1;
                        break;
                    default:
                        console.log(key.key);
                        break;
                }
                renderFigure();
            }
        });

        function addRowPosition() {
            tekPositionRow++;
            renderFigure();
            if(tekPositionRow >= (mapContentBlock.length - figureCorrect.map.length)) {
                tekPositionRow = mapContentBlock.length - figureCorrect.map.length;
                w.clearTimeout(timeCache);
                new objectFigure();
            } else {
                timeCache = w.setTimeout(addRowPosition, 800);
            }
        }

        timeCache = w.setTimeout(addRowPosition, 2500);
    };

    new objectFigure();







    console.log(mapContentBlock, mapContentBlock[0].children.length);
})(window, window.document);
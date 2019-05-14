
function getItemsById(dataSet, id) {
    if (!id) {
        return dataSet;
    }
    return dataSet.filter(data => data.id === id);
}

function getItemsAuto(dataSet, auto) {
    if (!auto) {
        return dataSet;
    }
    return dataSet.filter(data => data.auto === true);
}

function getItemsByMinPlayTime(dataSet, minPlayTime) {
    if (!minPlayTime) {
        return dataSet;
    }
    return dataSet.filter(data => data.playTime >= minPlayTime);
}

function mergeItemsWithSameId(collector, currentItem) {
   const existingItemIndex = collector.findIndex(item => item.id === currentItem.id);
   if (existingItemIndex > -1) {
        const existingItem = collector[existingItemIndex];
        collector.splice(existingItemIndex, 1);
        collector.push(Object.assign(
            {},
            currentItem,
            {
                playTime: currentItem.playTime + existingItem.playTime,
                auto: existingItem.auto && currentItem.auto
            }
        ));
   } else {
        collector.push(currentItem);
   }
   return collector;
 }

function mergeItems(dataSet, merge) {
    if (!merge){
        return dataSet;
    }
    return dataSet.reduce(mergeItemsWithSameId, [], undefined, dataSet);
}

export const select = (dataSet, options = {}) => {
    if (!options) {
        return dataSet;
    }
    let result = mergeItems(dataSet, options.merge);
    result = getItemsById(result, options.id);
    result = getItemsAuto(result, options.auto);
    result = getItemsByMinPlayTime(result, options.minPlayTime);
    return result;
};

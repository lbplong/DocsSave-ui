/** @format */

class AppUtil {
  convertItemToGroup = items => {
    let group = [];
    let groupItemId = items[0].id;
    let groupItem = {
      key: items[0].id,
      name: items[0].name,
      startIndex: 0,
      count: 0,
      level: 0,
      isCollapsed: true,
    };
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === groupItemId) {
        groupItem.count = groupItem.count + 1;
      } else {
        group.push(groupItem);

        groupItemId = items[i].id;
        groupItem = {
          key: items[i].id,
          name: items[i].name,
          startIndex: groupItem.startIndex + groupItem.count,
          count: 1,
          level: 0,
          isCollapsed: true,
        };
      }
      if (i === items.length - 1) {
        group.push(groupItem);
      }
    }
    return group;
  };

  renderNameType = fileType => {
    if (Number(fileType) === 1) {
      return "Document";
    }
    if (Number(fileType) === 2) {
      return "Music";
    }
    if (Number(fileType) === 3) {
      return "Photo";
    }
    if (Number(fileType) === 4) {
      return "Movie";
    }
    return undefined;
  };
}
export default new AppUtil();

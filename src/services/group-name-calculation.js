const SOME_GROUP_NAME = 'Default group';

export default function calculateGroupName(groupName, changedByUser, checkedHashLists) {
  if (changedByUser) return groupName;

  const hashListKeys = Object.keys(checkedHashLists);
  /* No one hashList */
  if (hashListKeys.length === 0) return '';
  /* More then one hash list from different data sources */
  if (hashListKeys.length > 1) return SOME_GROUP_NAME;
  /* Initializing variables */
  const names = [];
  const checkedHash = checkedHashLists[hashListKeys[0]].get();
  let maxParentLength = 0;
  let i = 0;
  let j = 0;
  /* Starting looking for parents */
  const allParents = Object.keys(checkedHash).map((key) => {
    const parentArray = checkedHash[key].getParents();
    if (parentArray.length > maxParentLength) maxParentLength = parentArray.length;

    return parentArray;
  });
  /* Iteration over all parent sets */
  while (i < maxParentLength) {
    let foundParent = null;
    let moreThanOneParent = false;
    for (j = 0; j < allParents.length; j += 1) {
      const el = allParents[j][i];
      if (el && el !== foundParent) {
        moreThanOneParent = foundParent !== null;
        if (moreThanOneParent) break;
        else foundParent = el;
      }
    }
    if (moreThanOneParent) break;
    else names.push(foundParent.name);

    i += 1;
  }
  if (names.length === 0) names.push(SOME_GROUP_NAME);

  return names.join(' / ');
}

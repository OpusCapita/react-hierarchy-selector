
function getItem(id, name, children = []) {
  return {
    id,
    name,
    children,
  };
}

function getItemList(startFrom, number, label) {
  const itemList = [];
  const endTo = startFrom + number;

  for (let i = startFrom; i < endTo; i += 1) {
    itemList.push(getItem(i, `${label} ${i}`));
  }
  return itemList;
}

export default function getData() {
  const companiesEU = getItemList(500, 1000, 'Company EU');
  const companiesOthers = getItemList(2000, 500, 'Company');
  const general = [
    getItem(1, 'General group', [
      getItem(10, 'EU', companiesEU),
      getItem(21, 'Others', companiesOthers),
    ]),
    getItem(2, 'Some other groups', getItemList(5000, 25, 'Other companies and units')),
  ];

  return general;
}

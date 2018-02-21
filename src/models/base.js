const dataSourceProvider = new WeakMap();


export default class BaseModel {
  constructor(dataProvider) {
    dataSourceProvider.set(this, dataProvider);
  }

  get dataSourceProvider() {
    return dataSourceProvider.get(this);
  }
}

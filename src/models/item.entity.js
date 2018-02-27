export default class ItemEntity {
  constructor(data) {
    this.id = data && data.id ? data.id : null;
    this.name = data && data.name ? data.name : null;
    this.children = data && Array.isArray(data.children) ? data.children : [];
  }
}

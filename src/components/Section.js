
export default class Section {
  constructor ({ items, renderer }, selectorContainer) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = selectorContainer
    
  };

  initialCards(items) {
    items.forEach(item => {
    this._renderer(item);
      
    });
    
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }


}
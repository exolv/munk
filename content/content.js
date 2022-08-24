class Content {
  constructor() {
    //
  }

  getMountPoints(selector) {
    const mountPoints = document.querySelectorAll(selector);
    mountPoints.forEach(mountPoint => {
      mountPoint.classList.add('flex', 'justify-between', 'items-center');
    });

    return mountPoints;
  }

  renderRating(element, data) {
    const root = document.createElement('div');
    root.style.display = 'inline-block';
    element.insertAdjacentElement('beforeend', root);
    const reactElement = ReactDOM.createRoot(root);
    reactElement.render(<Rating data={data} />);
  }

  init() {
    const mountPoints = this.getMountPoints('.artdeco-entity-lockup__subtitle');
    
    mountPoints.forEach(element => {
      this.renderRating(element, { rating: 4.65 });
    });
  }
}

try {
  const content = new Content();
  content.init();
} catch (error) {
  console.warn('[munk] Content Error:', error);
}
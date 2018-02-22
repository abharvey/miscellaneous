scrollItem = (element, containerDomNode) => {
    const itemTop = element.offsetTop;
    const itemBottom = itemTop + element.offsetHeight;

    const containerScrollTop = containerDomNode.scrollTop;
    const containerScrollBottom = containerScrollTop + containerDomNode.offsetHeight;

    if (itemTop < containerScrollTop) {
        containerDomNode.scrollTop = itemTop;
    }
    if (itemBottom > containerScrollBottom) {
        containerDomNode.scrollTop = containerScrollTop + itemBottom - containerScrollBottom;
    }
};

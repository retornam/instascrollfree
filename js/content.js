var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === "attributes" && mutation.target.localName === "body") {
        if (mutation.attributeName === "style") {
            mutation.target.style= '';
            role = document.querySelector('div[role="presentation"]');
            role.parentElement.removeChild(role);
            mutationObserver.disconnect();
    	}
    };
  });
});

mutationObserver.observe(document.documentElement, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});
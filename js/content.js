window.localStorage.clear();
window.onload = () => runAfterPageFinishesLoading();

function metaContains(key, value) {
    const metaTags = document.getElementsByTagName('meta');
    if(metaTags) {
        let arr = [...metaTags].filter((mt) => {
            return mt[key] == value;
        })

        return arr.some((e) => {
            if (e[key] == value) return true;
        });
    }

    return false;
}

function removeNodeList(list) {
    list.forEach((node) => {
        node.parentNode.removeChild(node);
    });
}


function runAfterPageFinishesLoading() {
  if (location.hostname.endsWith('medium.com')) {
    if (metaContains('content', 'Medium')) {
      const paywall = document.querySelectorAll('[tabindex="-1"]');
      if (paywall) {
        removeNodeList(paywall);
      }
    }
  }else if (location.hostname.endsWith('instagram.com')){
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

    setTimeout(function(){
     suggestions=document.querySelector('.e-Ph9');
      if (suggestions) {
        suggestions.innerHTML="";
        suggestions.style.visibility = "hidden";
      }
    }, 3000);
  }
}

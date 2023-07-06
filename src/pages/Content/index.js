const attrs = {
  ASSET_URL: 'data-asset-url',
  ASSET_TITLE: 'data-asset-title',
  ASSET_DESCRIPTION: 'data-asset-description',
};

const MIN_DIM = 100;

function getAllImages() {
  const images = Array.prototype.slice.call(document.querySelectorAll('img'));
  return images;
}

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  init();
}
else {
  window.addEventListener('DOMContentLoaded', init);
}

function init() {
  const premintButtonMap = {
   /*
    key: [{
      nonce: number,
      overlay: HTMLElement,
      media: HTMLElement
    }, ...],
    ...
   */
  };

  function newPremintButton(asset) {
    const img = document.createElement('img');
    img.style.width = '24px';
    img.style.height = '24px';
    img.style.cursor = 'pointer';
    img.style.padding = '0';
    img.style.borderRadius = '500px';
    img.style.backgroundClip = 'padding-box';
    img.style.position = 'absolute';
    img.style.zIndex = 8675310;
    img.src = 'data:image/png;base64,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';
    img.addEventListener('click', onClickPremint);
    asset.parentNode.appendChild(img);
    return img;
  }

  function attachPremintButtons() {
    console.log(premintButtonMap);
    const nonce = parseInt(Math.random() * 2_000_000_000);
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    getAllImages().forEach(image => {
      if (image.complete) {
        const rect = image.getBoundingClientRect();
        if (rect.width >= MIN_DIM && rect.height >= MIN_DIM) {
          const src = image.src;
          if (!premintButtonMap[src]) {
            premintButtonMap[src] = {
              type: 'image',
              checked: false,
              registered: false,
              references: [],
            };
          }
          let button = null;
          premintButtonMap[src].references.forEach(reference => {
            if (image === reference.media) {
              button = reference.button;
              reference.nonce = nonce;
            }
          });
          if (!button) {
            button = newPremintButton(image);
            premintButtonMap[src].references.push({
              media: image,
              button,
              nonce,
            });
            button.setAttribute(attrs.ASSET_URL, src);
          }
          button.style.top = Math.round(image.offsetTop + 7) + 'px';
          button.style.left = Math.round(image.offsetLeft + 6) + 'px';
        }
      }
    });
  }


  function onClickPremint(e) {
    e.stopPropagation();
    e.preventDefault();
    const width = 320;
    const left = document.documentElement.clientWidth - width;
    window.open(this.getAttribute(attrs.ASSET_URL), '_cent', `left=${left},top=0,width=${width},height=480,popup=1`);
  }
  setInterval(attachPremintButtons, 250);
}

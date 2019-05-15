SC.loadImages = (() => {
  /**
   * Given an array of urls, load these images. When they are all loaded (or
   * errored), then resolve a deferred with an array of image elements ready to
   * be drawn onto the canvas.
   *
   * If the returned deferred object is rejected, we should stop loading these
   * images.
   *
   * @param {Array.<String>} urls
   * @return {Object}        Containing a promise with an array of images, as
   *                         well as an abort method which rejects the promise
   */
  function loadImages(urls) {
    let rejectPromise;
    const startTime = Date.now();
    const batchSize = 10;
    log(`Starting to load ${urls.length} images`);

    const imagesPromise = new Promise((resolve, reject) => {
        let imageDeferreds = [];
        rejectPromise = () => {
            imageDeferreds.flat().forEach(imagePromise => imagePromise.abort());
            reject();
        }

        const batches = urls.reduce((acc, item, idx, orgArray) => {
            if (idx % batchSize === 0 || idx === 0) {
                 acc.push([]);
            }
            acc[acc.length - 1].push(item);
            return acc;
        }, [], 0, urls);

        batches.reduce((promiseChain, currentBatch) => {
            return promiseChain.then(chainResults => {
                    const currentImageDeferreds = currentBatch.map(loadImage);
                    imageDeferreds.push(currentImageDeferreds)
                    return Promise.all(currentImageDeferreds.map(({ promise }) => promise))
                        .then(currentResult => [ ...chainResults, currentResult ])
                    }
               );
            }, Promise.resolve([])
        ).then(images => {
            resolve(images.flat().filter(Boolean));
        });
    });

    imagesPromise.then(
      () => { log(`Loading ${urls.length} took ${Date.now() - startTime}ms`) },
      () => { log(`Loading ${urls.length} images cancelled`) }
    );

    return {
      promise: imagesPromise,
      abort: () => {
        rejectPromise();
      }
    };
  }

  /**
   * Given a single URL, return a deferred which is resolved once the image is
   * loaded or its loading has failed.
   *
   * For our purposes, a failed load is okay. If the load is successful, the
   * promise is resolved with an Image element.
   *
   * @param {String}  url
   * @return {Object} Contains a promise of the image, as well as an abort
   *                  method which should stop the image from loading.
   */
  function loadImage(url) {
    let rejectPromise;

    const imagePromise = new Promise((resolve, reject) => {
      const img = new Image();
      rejectPromise = () => {
        img.src = '';
        reject();
      }
      img.onload = () => { resolve(img) };

      // no img means it failed, but that's okay, we just won't draw it.
      img.onerror = () => { resolve(null) };

      // start loading the image
      img.src = url;
    });

    return {
      promise: imagePromise,
      abort: () => {
        // ...is it possible to stop the image from loading?
        rejectPromise();
      }
    }
  }

  // for some debugging messages
  function log(str) {
    const listEntry = document.createElement('li');
    const messageLog = document.getElementById('log');

    listEntry.textContent = str;

    messageLog.append(listEntry);
  }

  return loadImages;
})();

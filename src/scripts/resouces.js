function preloadMediaWithRetries(mediaArrays, loaderRef) {
  const maxRetries = 3;
  const promises = [];
  const totalMedia = mediaArrays.reduce(
    (sum, array) => sum + array.arraySrc.length,
    0
  );

  let loadedMediaCount = 0;

  function updateLoader() {
    if (loaderRef && loadedMediaCount < totalMedia) {
      const progressPercentage = (loadedMediaCount / totalMedia) * 100;
      loaderRef.textContent = `${progressPercentage.toFixed(0)}%`;
    }
  }

  function loadMediaWithRetries(mediaSrc, mediaType, retryCount) {
    return new Promise((resolve, reject) => {
      const mediaElement =
        mediaType === 'image' ? new Image() : document.createElement('video');

      mediaElement.onload = () => {
        loadedMediaCount++;
        updateLoader();
        resolve(mediaElement);
      };

      if (mediaType === 'video') {
        mediaElement.onloadeddata = () => {
          loadedMediaCount++;
          updateLoader();
          resolve(mediaElement);
        };
      }

      mediaElement.onerror = () => {
        if (retryCount < maxRetries) {
          console.warn(`Failed to load ${mediaType} ${mediaSrc}. Retrying...`);
          loadMediaWithRetries(mediaSrc, mediaType, retryCount + 1).then(
            resolve,
            reject
          );
        } else {
          console.error(
            `Failed to load ${mediaType} ${mediaSrc} after ${maxRetries} retries.`
          );
          loadedMediaCount++;
          updateLoader();
          reject(new Error(`Failed to load ${mediaType} ${mediaSrc}`));
        }
      };

      mediaElement.src = mediaSrc;

      if (mediaType === 'video') {
        mediaElement.load(); // Load metadata for videos
      }
    });
  }

  for (const mediaArray of mediaArrays) {
    const mediaPromises = mediaArray.arraySrc.map((media) =>
      loadMediaWithRetries(media, mediaArray.type, 0)
    );

    promises.push(Promise.all(mediaPromises));
  }

  return Promise.all(promises).then((loadedMedia) => {
    const result = {
      images: [],
      videos: [],
    };

    for (let i = 0; i < loadedMedia.length; i++) {
      const mediaArray = loadedMedia[i];
      const mediaInfoArray = mediaArray.map((mediaElement) => {
        return mediaElement;
      });

      if (mediaInfoArray[0] instanceof HTMLImageElement) {
        result.images.push(mediaInfoArray);
      } else if (mediaInfoArray[0] instanceof HTMLVideoElement) {
        result.videos.push(mediaInfoArray);
      }
    }

    return result;
  });
}

function loadingResouces(mediaArrays, setMediaContextObjects, loaderRef) {
  preloadMediaWithRetries(mediaArrays, loaderRef)
    .then((result) => {
      console.log('finnaly');
      setMediaContextObjects(result);
    })
    .catch((error) => {
      console.error('Error loading images:', error);
    });
}

export { loadingResouces };

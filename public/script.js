document.getElementById('mediaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;
    const releaseDate = document.getElementById('releaseDate').value;
  
    const response = await fetch('http://localhost:3000/api/media', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, type, releaseDate }),
    });
    console.log(response);
    const media = await response.json();
    const form=document.getElementById('mediaForm');
    form.reset();
    addMediaToList(media);
  });
  
  function addMediaToList(media) {
    const mediaList = document.getElementById('mediaList');
    const mediaItem = document.createElement('li');
    mediaItem.textContent = `${media.title} (${media.type}) - ${media.status}`;
    
    mediaItem.addEventListener('click', async () => {
      const newStatus = media.status === 'Watched' ? 'Plan to Watch' : 'Watched';
      const response = await fetch(`http://localhost:3000/api/media/${media._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedMedia = await response.json();
      mediaItem.textContent = `${updatedMedia.title} (${updatedMedia.type}) - ${updatedMedia.status}`;
      mediaItem.classList.toggle('watched');
    });
  
    mediaItem.addEventListener('dblclick', async () => {
      await fetch(`http://localhost:3000/api/media/${media._id}`, { method: 'DELETE' });
      mediaList.removeChild(mediaItem);
    });
  
    mediaList.appendChild(mediaItem);
  }
  
  async function fetchMedia() {
    const response = await fetch('http://localhost:3000/api/media');
    const mediaItems = await response.json();
    console.log(mediaItems);
    mediaItems.forEach(addMediaToList);
  }
  
  fetchMedia();

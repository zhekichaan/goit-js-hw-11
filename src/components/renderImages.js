export default function renderImages(data, gallery) {
	const galleryPics = data.map(item => 
		`<a href="${item.largeImageURL}" class="gallery__link">
			<img src="${item.webformatURL}" class="gallery__image" alt="" loading="lazy" />
			<div class="info">
    		<p class="info__item">
    		  <span>${item.likes}</span><b>Likes</b>
    		</p>
    		<p class="info__item">
    		  <span>${item.views}</span><b>Views</b>
    		</p>
    		<p class="info__item">
    		  <span>${item.comments}</span><b>Comments</b>
    		</p>
    		<p class="info__item">
    		  <span>${item.downloads}</span><b>Downloads</b>
    		</p>
 			 </div>
			</a>`
	).join('')
	gallery.insertAdjacentHTML("beforeend", galleryPics);
}

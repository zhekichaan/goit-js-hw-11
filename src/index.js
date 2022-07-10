import './css/styles.css';
import fetchImages from './components/fetchImages';
import renderImages from './components/renderImages';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
	form: document.querySelector(".search-form"),
	gallery: document.querySelector(".gallery"),
}

let page = 1
let query = ""

const gallery = new SimpleLightbox('.gallery a');

refs.form.addEventListener("submit", onFormSubmit)

function onFormSubmit(e) {
	e.preventDefault()
	refs.gallery.innerHTML = ""
	page = 1
	query = e.currentTarget.elements.searchQuery.value
	if(page==1) {
		fetchImages(page, query).then((r) => {
			if(r.data.totalHits == 0) {
				Notify.failure("Sorry, there are no images matching your search query. Please try again.")
			} else if(r.data.totalHits<40) {
				Notify.success(`Hooray! We found ${r.data.totalHits} images.`)
				renderImages(r.data.hits, refs.gallery)
				gallery.refresh()
				observer.disconnect();
				document.querySelector(".end-notification").classList.remove('is-hidden')
			} else {
				Notify.success(`Hooray! We found ${r.data.totalHits} images.`)
				renderImages(r.data.hits, refs.gallery)
				page += 1
				gallery.refresh()
				observer.observe(document.querySelector('.scroll-guard'))
				document.querySelector(".end-notification").classList.add('is-hidden')
			}
		})
	}
}

const options = {
	rootMargin: '100px',
	threshold: 1.0
}

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if(entry.isIntersecting) {
			fetchImages(page, query).then((r) => {
				if(r.data.hits.length==0) {
					Notify.failure("We're sorry, but you've reached the end of search results.")
					gallery.refresh()
					document.querySelector(".end-notification").classList.remove('is-hidden')
				} else {
					renderImages(r.data.hits, refs.gallery)
					page += 1
					gallery.refresh()
				}
			})
		}
	})
}, options)	

document.addEventListener("DOMContentLoaded", function() {
	
	function loading(element) {

	}

	function loaded() {

	}

	function checkState(photoCompleteMain, photoNumber, album) {

		var enlargedImageBackground = document.createElement("div");
		enlargedImageBackground.className = "enlarged-photo-background"
		enlargedImageBackground.id = "photo-background"
		enlargedImageBackground.onclick = function() { 
			window.history.pushState({urlPath:'/'},"",'/')
			document.getElementById("thumbnail-container").removeChild(document.getElementById("photo-background"));
			document.getElementById("thumbnail-container").removeChild(document.getElementById("enlarged-photo"));
		};

		var enlargedImageDiv = document.createElement("div");
		var image = document.createElement("img");
		var arrowRight = document.createElement("div");
		var arrowLeft = document.createElement("div");

		arrowRight.className = "arrow-right"
		arrowLeft.className = "arrow-left"

		arrowRight.onclick = function() { 
			window.history.pushState({urlPath:'/'},"",'/')
			document.getElementById("thumbnail-container").removeChild(document.getElementById("photo-background"));
			document.getElementById("thumbnail-container").removeChild(document.getElementById("enlarged-photo"));
			d = album[photoNumber + 1]
			var https = "https://farm"
			var domain = ".staticflickr.com/"
			photoCompleteMain = https + d.farm + domain + d.server + "/" + d.id + "_" + d.secret + "_z.jpg"
			checkState(photoCompleteMain, photoNumber + 1, album)
		};

		arrowLeft.onclick = function() {
			window.history.pushState({urlPath:'/'},"",'/')
			document.getElementById("thumbnail-container").removeChild(document.getElementById("photo-background"));
			document.getElementById("thumbnail-container").removeChild(document.getElementById("enlarged-photo"));
			d = album[photoNumber - 1]
			var https = "https://farm"
			var domain = ".staticflickr.com/"
			photoCompleteMain = https + d.farm + domain + d.server + "/" + d.id + "_" + d.secret + "_z.jpg"
			checkState(photoCompleteMain, photoNumber - 1, album)
		};

		image.setAttribute("src", photoCompleteMain);
		image.complete
		enlargedImageDiv.id = "enlarged-photo"
		enlargedImageDiv.className = "enlarged-photo"
		
		if (photoNumber !== 0) {
			enlargedImageDiv.appendChild(arrowLeft)
		}
		enlargedImageDiv.appendChild(image)
		if (photoNumber !== album.length - 1) {
			enlargedImageDiv.appendChild(arrowRight)
		}

 	// 	image.onload = function(){
  //   		image.src = this.src;   
		// };

		//FIX ONLOAD EVENT FOR IMAGES USING THIS.
		//document.getElementById("myFrame").onload = function() {myFunction()};


		document.getElementById("thumbnail-container").insertBefore(enlargedImageDiv, document.getElementById("thumbnail-container").childNodes[0])
		document.getElementById("thumbnail-container").insertBefore(enlargedImageBackground, document.getElementById("thumbnail-container").childNodes[0])
	}

	  function processPhotos(obj) {
	  	var rowNum = 1
	  	var rowName = "row-" + rowNum;
	  	console.log("ARRAY", obj)
	  	var photoArray = obj.photoset.photo

	  	function createRow() {
	  		var row = document.createElement("div");
	  		row.className = "thumbnail-row";
	  		row.id = rowName
	  		document.getElementById("thumbnail-container").appendChild(row);
	  	}

	  	function changeRowName() {
	  		return rowName = "row-" + rowNum ++
	  	}

	  	function createThumbnail(s) {
	  		var d = photoArray[s]
	  		var https = "https://farm"
	  		var domain = ".staticflickr.com/"
	  		var photoComplete = https + d.farm + domain + d.server + "/" + d.id + "_" + d.secret + "_z.jpg"
	  		var photoCompleteMain = https + d.farm + domain + d.server + "/" + d.id + "_" + d.secret + "_z.jpg"
	  		var pictureDiv = document.createElement("div");

	  		function createPictureDiv() {
	  			pictureDiv.className = "thumbnail"
	  			pictureDiv.id = "thumbnail-" + s
	  			pictureDiv.onclick = function() { 
	  				window.history.pushState({urlPath:'?' + d.id},"",'?' + d.id)
	  				checkState(photoCompleteMain, s, photoArray)
	  			};
	  			document.getElementById("thumbnail-container").appendChild(pictureDiv);

	  		}

	  		function createImg() {
	  			var image = document.createElement("img");
	  			image.setAttribute("src", photoComplete);
	  			image.setAttribute("alt", "Flower");
	  			document.getElementById(pictureDiv.id).appendChild(image);
	  		}	


	  		createPictureDiv()
	  		createImg()
	  	}

	  	function photoCounter() {
	  		for (i = 0; i < photoArray.length; i++) {
	  			createThumbnail(i)
	  		}
	  	}

	  	photoCounter()
	  }


	  	var photoReq = new XMLHttpRequest();
		photoReq.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=8efcb999a58dc10aa56ce814d6ca951e&photoset_id=72157669478370805&user_id=141462154%40N07&format=json&nojsoncallback=1');
		photoReq.send(null);


	photoReq.onreadystatechange = function () {
	  var DONE = 4; // readyState 4 means the request is done.
	  var OK = 200; // status 200 is a successful return.
	  var imagesObj;

	  if (photoReq.readyState === DONE) {
	  	if (photoReq.status === OK)
	  		imagesObj = JSON.parse(photoReq.responseText);
	  	console.log("IMAGES", imagesObj)
	  	processPhotos(imagesObj)
	  } else {
	      console.log('Error: ' + photoReq.status); // An error occurred during the request.
	  }



	}



	  //https://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg

  //API KEY 8efcb999a58dc10aa56ce814d6ca951e
  // SECRET 1e8545a9d573a42a

});
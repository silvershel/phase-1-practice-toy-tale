let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys();

  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // document.querySelector('.add-toy-form').name.value
    
    const name = e.target.name.value
    const img = e.target.image.value
    const toy = document.querySelector('#toy-collection')
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": img,
        "likes": 0,
      })
    })
  

    console.log('submit');
  })
});

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then (resp => resp.json())
  .then (toys => {
    toys.forEach(toy => {
      const toyDiv = document.createElement('div');
      toyDiv.classList.add('card');
      toyDiv.id = toy.id;
      
      const toyName = document.createElement('h2');
      toyName.textContent = toy.name;
      toyDiv.appendChild(toyName);

      const toyImage = document.createElement('img');
      toyImage.src = toy.image;
      toyImage.classList.add('toy-avatar');
      toyDiv.appendChild(toyImage);

      const toyLikes = document.createElement('p');
      toyLikes.textContent = `liked ${toy.likes} times`;
      toyDiv.appendChild(toyLikes);

      const likeButton = document.createElement('button');
      likeButton.classList.add('like-btn');
      likeButton.id = toy.id;
      likeButton.textContent = 'like ♥'
      toyDiv.appendChild(likeButton);

      likeButton.addEventListener('click', () => {
        const currentLikes = toy.likes;
        const newLikes = currentLikes + 1;
        toyLikes.textContent = `liked ${newLikes} times`;
        toy.likes = newLikes;
        
      })
      const toyContainer = document.querySelector("#toy-collection");
      toyContainer.appendChild(toyDiv);
    });
  })
  .catch(error => console.error('Error:', error));
}

/* 
URLS

all lost toy data: http://localhost:3000/toys
individual toys: http://localhost:3000/toys/:id
  Note: we are using :id here as a variable value that 
  indicates the path to a specific toy.
  To navigate (or send a request) to that path, 
  the id number will be inserted into the URL in place of :id, 
  e.g., http://localhost:3000/toys/1


HINT

You will be creating two event listeners for this lab. 
The first one will be on the "Create Toy" button, which is provided 
in the app's index.html file. The second one, however, will be on 
the "Likes" button on each individual toy card. Given that the toy 
cards will be rendered to the DOM dynamically from the Response 
returned by the fetch "GET" request, think about when it makes 
sense to add the event listener to each toy's "Like" button.

// new toy button: id="new-toy-btn"
// add event listener to like button after creation of a new card.


INSTRUCTIONS

1. Fetch Andy's Toys
On the index.html page, there is a div with the id "toy-collection."
When the page loads, make a 'GET' request to fetch all the toy objects. 
With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

2. Add Toy Info to the Card
Each card should have the following child elements:
    h2 tag with the toy's name
    img tag with the src of the toy's image attribute and the class name "toy-avatar"
    p tag with how many likes that toy has
    button tag with a class "like-btn" and an id attribute set to the toy's id number
After all of that, the toy card should look something like this:

<div class="card">
  <h2>Woody</h2>
  <img src="[toy_image_url]" class="toy-avatar" />
  <p>4 Likes</p>
  <button class="like-btn" id="[toy_id]">Like ❤️</button>
</div>

3. Add a New Toy
When a user submits the toy form, two things should happen:
  A POST request should be sent to http://localhost:3000/toys and the new toy added to Andy's Toy Collection.
  If the post is successful, the toy should be added to the DOM without reloading the page.
  In order to send a POST request via fetch(), give the fetch() a second argument of an object. 
  This object should specify the method as POST and also provide the appropriate headers and the 
  JSON data for the request. The headers and body should look something like this:

headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body: JSON.stringify({
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
})

For examples, refer to the documentationLinks to an external site..

4. Increase a Toy's Likes
When a user clicks on a toy's like button, two things should happen:

  A patch request (i.e., method: "PATCH") should be sent to the server at 
  http://localhost:3000/toys/:id, updating the number of likes that the specific toy has
  If the patch is successful, the toy's like count should be updated in the DOM without reloading the page
  The patch request enables us to update an existing toy. The request will look very similar 
  to our "POST" request except that we need to include the id of the toy we're updating in the path.

To get this working, you will need to add an event listener to each toy's "Like" button. 
When the button is clicked for a toy, your code should:
  capture that toy's id,
  calculate the new number of likes,
  submit the patch request, and
  update the toy's card in the DOM based on the Response returned by the fetch request.
  The headers and body should look something like this:

headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body: JSON.stringify({
  "likes": newNumberOfLikes
})
*/
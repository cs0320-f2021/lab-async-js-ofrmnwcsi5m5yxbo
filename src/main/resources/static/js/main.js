// BEGIN REDACT
/**
 * Front end logic for providing real time autocorrect suggestions.
 */

//TODO: select the list where the suggestions should go, the input box where we're typing, and
// the loading text
//HINT: look at the hTML
const suggestionList = document.getElementById("suggestions");
const input = document.getElementById("autocorrect-input");
const loading = document.getElementById("loading");

input.addEventListener("keyup", async () => {
  //TODO: empty the suggestionList (you want new suggestions each time someone types something
  // new, hint, use .innerHTML)
  suggestionList.innerHTML = "";
  // TODO: show the loading text (HINT: set value of loading.style.display to "block" or "")
  loading.style.display = "";
  const postParameters = {
    //TODO: get the text inside the input box (hint: use input.value to get the value of the input field)
    text: input.value
  };
  //TODO: make a post request to the url to handle this request you set in your Main.java
  //HINT: check out the GET, POST, and JSON section of the lab
  let fetchedjson = fetch("/autocorrect", {method: 'post', body: JSON.stringify(postParameters)}).then(response => {
    console.log(response.status)
    return response.json()
  })
  //TODO: Parse the JSON in the response object
  //HINT: remember to get the specific field in the JSON you want to use
  //TODO: for each element in the set of results, append it to the suggestionList
  const results = await fetchedjson
  for (let i = 0; i < Object.keys(results).length; i++) {
    let result = results[i];
    suggestionList.innerHTML += `<li tabindex="0"><button class="aresult">${result}</button></li>`;
  }
  //document.getElementById("suggestions").addEventListener("click", function(){console.log("called")});
  //HINT: use innerHTML += to append to teh suggestions list
  //NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
  // make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
  // This makes each element selectable via screen reader.

  //TODO: add an click handler to each of the elements you added to the suggestionList
  // with a function which will replace whatever is in input with the suggestion that
  // was clicked
  let elements = document.getElementsByClassName("aresult")
  for (var i = 0; i < elements.length; i++) {
    let name = elements[i].innerHTML
    elements[i].addEventListener("click", function(){input.value = name});
  }

  //TODO: hide the loading text
});
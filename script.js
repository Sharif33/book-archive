
//result finding button
const foundResult = document.getElementById('found-result');

//search field
const searchBook = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  if (searchText === "") {
    foundResult.innerText = 'Search field can not be empty';
    return;
  };

  // clear data
  searchField.value = '';
  //load data
  const url = ` http://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data))
};
const displaySearchResult = books => {
  //show find result
  foundResult.innerText = `Showing result ${(books.docs.slice(0, 30)).length} out of ${books.numFound}`;

  //search result 
  const searchResult = document.getElementById('search-result');
  searchResult.textContent = '';

  //error handling
  if ((books.docs).length === 0) {
    foundResult.innerText = `No result found`;
  };

  //forEach loop
  books.docs.slice(0, 30)?.forEach(book => {
    console.log(book);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML =
      `
        <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0 ">
    <div class="col-md-4">
      <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg" class="img-fluid rounded-start" style="height: 15rem;" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title text-success">${book.title}</h4>
        <h6>Author: <span class="text-primary fw-bold">${book.author_name ? book.author_name[0] : ''}</span></h6>
        <h6>Publisher: <span class="fw-bold">${book.publisher ? book.publisher[0] : ''}</span></h6>
        <p class="card-text">First Published: <span class="fw-bold">${book.first_publish_year ? book.first_publish_year : ''}</span></p>
        
      </div>
    </div>
  </div>
</div>
        `
    searchResult.appendChild(div);
  });
};
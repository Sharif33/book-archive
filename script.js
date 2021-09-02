const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    //load data
    const url = ` http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs.slice(0, 30)))
};

const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books?.forEach(book => {
        // console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =
            `
        <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0 ">
    <div class="col-md-4">
      <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" style="height: 15rem;" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title text-success">${book.title}</h4>
        <h5 class="text-primary">Author: ${book.author_name[0] ? book.author_name[0] : 'Unknown'}</h5>
        <h5 class="">Publisher: ${book.publisher[0] ? book.publisher[0] : 'Unknown'}</h5>
        <h6 class="card-text text-warning">First Published: ${book.first_publish_year ? book.first_publish_year : ''}</h6>
        
      </div>
    </div>
  </div>
</div>
        `
        searchResult.appendChild(div);
    });// showing result

    const url = ` http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoundResult(data.numFound))

    const displayFoundResult = found => {
        const foundResult = document.getElementById('found-result');
        foundResult.innerText = `Showing result: ${found}`;
    };
};

/*  */
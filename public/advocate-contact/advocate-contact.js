const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const name = urlParams.get('name')
document.write(`<form class="p-3" method="POST" action="/advocate-sub?advocate_name=${name}">
  <div id="form">
  <h3>Contact ${name}</h3>
  <h4>The advocate will contact you soon for a meeting. They will use the email associated with your account along with the phone number you provide to contact you!</h4>

  <input name="number" id="number" placeholder="Phone Number"></input>


  <div class="form-group">
    <textarea class="form-control" id="bio" rows="20" placeholder="What will you need help with and short bio." name='bio'></textarea>
  </div>


  <button type="submit" id="sub"class="btn btn-primary">Submit</button>
  </div>
</form>`)

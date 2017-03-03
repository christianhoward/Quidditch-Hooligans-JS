// This is the base url to which all your requests will be made
var baseURL = window.location.origin;
$(document).ready(function(){
  $('#table').click(function(event) {
    // Generate the table
    // Using an JQuery AJAX GET request to get data form the server
    $.getJSON(baseURL+'/players', function(data) {
      generateTable(data, $('#container'));
    });
  });

  $('#form').click(function(event) {
    // Create an empty form
    generateForm(null, $('#container'));
  });
  // Handle table click event for delete
  $('#container').on('click', '.delete', function(event) {
    var id = $(this).val();
    // Using an JQuery AJAX DELETE request to delete record from the server
    $.ajax({
      url: `${baseURL}/players/${id}`,
      type: 'DELETE',
      success: function(data) {
        $.getJSON(baseURL+'/players', function(data) {
          generateTable(data, $('#container'));
        });
      }
    });
  });

  // Handle form submit event for both update & create
  // If the _id field is present the server would update the database otherwise the server would create a record in the database
  $('#container').on('submit', '#my-form', function(event) {
    var id = $('#_id').val();
    const formData = {};
    // Grab the field data from the form and make a JS object for POST/PATCH request to the database
    $.each($('#my-form').serializeArray(), function(_,kv) {
      if (formData.hasOwnProperty(kv.name)) {
        formData[kv.name] = $.makeArray(formData[kv.name]);
        formData[kv.name].push(kv.value);
      } else {
        formData[kv.name] = kv.value;
      }
    });
    // If id is not null, this is a PATCH request (update record)
    // If id is null, this is a POST request (create record)
    if (id != '') {
      event.preventDefault();
      $.ajax({
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(formData),
        url: `${baseURL}/players/${id}`,
        type: 'PATCH',
        success: function(data) {
          $.getJSON(baseURL+'/players', function(data) {
            generateTable(data, $('#container'));
          });
        }
      });
    } else {
      event.preventDefault();
      $.ajax({
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(formData),
        url: `${baseURL}/player`,
        type: 'POST',
        success: function(data) {
          $.getJSON(baseURL+'/players', function(data) {
            generateTable(data, $('#container'));
          });
        }
      });
    }
  });
  // Handle edit click event within the table
  // Generates form with prefilled values
  $('#container').on('click', '.edit', function(event) {
    // getting id to make the AJAX request
    var id = $(this).val();
    // Using an JQuery AJAX GET request to get data from the server to fill the form
    $.getJSON(`${baseURL}/players/${id}`, function(data) {
      generateForm(data, $('#container'));
    });
  });
  // Function to generate table
  function generateTable(data, target) {
    // Clear the container
    clearContainer(target);
    // Create the table
    var tableHtml = '<table><thead><tr><th>Name</th><th>Age</th><th>Position</th><th>Team</th><th>Delete</th><th>Edit</th></tr></thead>';
    // Populate the table
    $.each(data, function(index, val) {
      tableHtml += '<tr><td>'+val.playername+'</td><td>'+val.age+'</td><td>'+val.position+'</td><td>'+val.team+'</td><td><button class="delete" value="'+val._id+'">Delete</button></td><td><button class="edit" value="'+val._id+'">Edit</button></td></tr>';
    });
    // Close the table
    tableHtml += '</table>';
    // Append the table
    $(target).append(tableHtml);
  }
  // Function to generate form
  function generateForm(data, target){
    // Clear the container
    clearContainer(target);
    // Create the form
    $(target).append('<form id="my-form"></form>');
    var innerForm = '<fieldset><legend>Player Form</legend><p><label>Player Name: </label>'+'<input type="hidden" name="_id" id="_id"/>'+'<input type="text" name="playername" id="playername" /></p>' + '<p><label>Age: </label><input type="text" name="age" id="age" /></p>'+ '<p><label>Hometown: </label><input type="text" name="city" id="city" />'+ ' ' + '<input type="text" name="country" id="country" /></p>' + '<p><label>Gender: </label><input type="text" name="gender" id="gender" /></p>'+ '<p><label>Handedness: </label><input type="text" name="handedness" id="handedness" /></p>'+ '<p><label>Broom: </label><input type="text" name="broom" id="broom" /></p>'+ '<p><label>Position: </label><input type="text" name="position" id="position" /></p>'+ '<p><label>Team: </label><input type="text" name="team" id="team" /></p>'+ '<p><label>Favorite Color: </label><input type="text" name="favoritecolor" id="favoritecolor" /></p>'+ '<p><label>Headshot: </label><input type="text" name="headshot" id="headshot" /></p>'+ '<input type="submit"/>';
    // Append the form
    $('#my-form').append(innerForm);
    if(data instanceof Array){
      $.each(data, function(index, val) {
        $('#_id').val(val._id);
        $('#playername').val(val.playername);
        $('#age').val(val.age);
        $('#city').val(val.city);
        $('#country').val(val.country);
        $('#gender').val(val.gender);
        $('#handedness').val(val.handedness);
        $('#broom').val(val.broom);
        $('#position').val(val.position);
        $('#team').val(val.team);
        $('#favoritecolor').val(val.favoritecolor);
        $('#headshot').val(val.headshot);
      });
    } else if (typeof data === 'object') {
      $.each(data, function(key, value) {
        $('#' + key).val(value);
      });
    }
  }
  function clearContainer(container){
    container.html('');
  }
});

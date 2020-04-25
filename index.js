$(document).ready(function () {

  var counter = $('#doorSizesTable tbody tr').length ;


  $("#addRow").on("click", function () {
    var newRow = $("<tr>");
    var cols = "";

    cols += `<th scope="row">${counter+1}</th>`;
    cols += `<td><input type="text" class="form-control" id="${counter+1}profile" placeholder="Door, Drawer etc."></td>`;
    cols += `<td><input type="text" class="form-control" id="${counter+1}quantity"></td>`;

    if($("input[name='unitType']:checked").val() == 'imperial'){
      cols += `<td><input type="text" class="form-control inchRow" id="${counter+1}heightInches"></td>`;
      cols += `<td><input type="text" class="form-control inchRow" id="${counter+1}widthInches"></td>`;
      cols += `<td><input type="text" class="form-control mmRow" id="${counter+1}heightMm" disabled></td>`;
      cols += `<td><input type="text" class="form-control mmRow" id="${counter+1}widthMm" disabled></td>`;
    }else if($("input[name='unitType']:checked").val() == 'metric'){
      cols += `<td><input type="text" class="form-control inchRow" id="${counter+1}heightInches" disabled></td>`;
      cols += `<td><input type="text" class="form-control inchRow" id="${counter+1}widthInches" disabled></td>`;
      cols += `<td><input type="text" class="form-control mmRow" id="${counter+1}heightMm"></td>`;
      cols += `<td><input type="text" class="form-control mmRow" id="${counter+1}widthMm"></td>`;
    }

    cols += `<td><textarea class="form-control" rows="1" id="${counter+1}notes"></textarea></td>`;

    cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="X"></td>';
    newRow.append(cols);
    $("table.order-list").append(newRow);
    counter = $('#doorSizesTable tbody tr').length;

    for(var i=0; i < counter; i++){
      $("#doorSizesTable tbody")[0].rows[i].cells[0].innerHTML = `${i+1}`;
    }

    console.log($("input[name='unitType']:checked").val() == 'imperial');

  });


  //delete row
  $("table.order-list").on("click", ".ibtnDel", function (event) {
    $(this).closest("tr").remove();       
    counter = $('#doorSizesTable tbody tr').length;

    for(var i=0; i < counter; i++){
      $("#doorSizesTable tbody")[0].rows[i].cells[0].innerHTML = `${i+1}`;
    }
  });

  //switch between laminate and pvc
  $('input[type=radio][name=doorType]').change(function() {
    if (this.value == 'pvc') {
      $("#inputDoorStyle").attr('placeholder','Cypress, Aspen, Hibiscus etc.');
    }
    else if (this.value == 'laminate') {
      $("#inputDoorStyle").attr('placeholder','Square, Half Wrap, Tight Wrap etc.');
    }
  });

  
  //switch between metric and imperial
  $('input[type=radio][name=unitType]').change(function() {

    if (this.value == 'metric') {
        $(".inchRow").attr("disabled", true);
        $(".mmRow").attr("disabled", false);
    }
    else if (this.value == 'imperial') {
      $(".inchRow").attr("disabled", false);
      $(".mmRow").attr("disabled", true);
    }
  });


  var form = document.querySelector('form');

  document.querySelector('form').onsubmit = e => {

    e.preventDefault();

    let data = {};
    Array.from(form).map(input => (data[input.id] = input.value));
    console.log(data);




  };


});



$(document).ready(function () {
  var counter = $('#doorSizesTable tbody tr').length ;


  $("#addRow").on("click", function () {
    var newRow = $("<tr>");
    var cols = "";

    cols += `<th scope="row">${counter + 1}</th>`;
    cols += '<td><input type="text" class="form-control" id="" placeholder="Door, Drawer etc."></td>';
    cols += '<td><input type="text" class="form-control" id=""></td>';

    if($("input[name='unitType']:checked").val() == 'imperial'){
      cols += '<td><input type="text" class="form-control inchRow" id=""></td>';
      cols += '<td><input type="text" class="form-control inchRow" id=""></td>';
      cols += '<td><input type="text" class="form-control mmRow" id="" disabled></td>';
      cols += '<td><input type="text" class="form-control mmRow" id="" disabled></td>';
    }else if($("input[name='unitType']:checked").val() == 'metric'){
      cols += '<td><input type="text" class="form-control inchRow" id="" disabled></td>';
      cols += '<td><input type="text" class="form-control inchRow" id="" disabled></td>';
      cols += '<td><input type="text" class="form-control mmRow" id=""></td>';
      cols += '<td><input type="text" class="form-control mmRow" id=""></td>';
    }

    cols += '<td><textarea class="form-control" rows="1" id=""></textarea></td>';

    cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="X"></td>';
    newRow.append(cols);
    $("table.order-list").append(newRow);
    counter = $('#doorSizesTable tbody tr').length;

    for(var i=0; i < counter; i++){
      $("#doorSizesTable tbody")[0].rows[i].cells[0].innerHTML = `${i+1}`;
    }

    console.log($("input[name='unitType']:checked").val() == 'imperial');

  });

  $("table.order-list").on("click", ".ibtnDel", function (event) {
    $(this).closest("tr").remove();       
    counter = $('#doorSizesTable tbody tr').length;

    for(var i=0; i < counter; i++){
      $("#doorSizesTable tbody")[0].rows[i].cells[0].innerHTML = `${i+1}`;
    }
  });

  $('input[type=radio][name=doorType]').change(function() {
    if (this.value == 'pvc') {
      $("#inputDoorStyle").attr('placeholder','Cypress, Aspen, Hibiscus etc.');
    }
    else if (this.value == 'laminate') {
      $("#inputDoorStyle").attr('placeholder','Square, Half Wrap, Tight Wrap etc.');
    }
  });

  $('input[type=radio][name=unitType]').change(function() {
    console.log("Changed");

    if (this.value == 'metric') {
        $(".inchRow").attr("disabled", true);
        $(".mmRow").attr("disabled", false);
    }
    else if (this.value == 'imperial') {
      $(".inchRow").attr("disabled", false);
      $(".mmRow").attr("disabled", true);
    }
  });



});
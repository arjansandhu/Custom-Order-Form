$(document).ready(function () {

  var counter = $('#doorSizesTable tbody tr').length ;
  let orderData = {};

  $("#addRow").on("click", function () {
    var newRow = $("<tr>");
    var cols = "";

    cols += `<th scope="row">${counter+1}</th>`;
    cols += `<td><input type="text" class="form-control" id="${counter+1}profile" placeholder="Door, Drawer etc."></td>`;
    cols += `<td><input type="text" class="form-control" id="${counter+1}quantity"></td>`;

    if($("input[name='unitType']:checked").val() == 'Imperial'){
      cols += `<td><input type="text" class="form-control inchRow" id="${counter+1}heightInches"></td>`;
      cols += `<td><input type="text" class="form-control inchRow" id="${counter+1}widthInches"></td>`;
      cols += `<td><input type="text" class="form-control mmRow" id="${counter+1}heightMm" disabled></td>`;
      cols += `<td><input type="text" class="form-control mmRow" id="${counter+1}widthMm" disabled></td>`;
    }else if($("input[name='unitType']:checked").val() == 'Metric'){
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

  });


  //delete row
  $("table.order-list").on("click", ".ibtnDel", function (event) {
    $(this).closest("tr").remove();       
    counter = $('#doorSizesTable tbody tr').length;

    console.log($("#doorSizesTable tbody tr"));

    $("#doorSizesTable tbody tr").each(function(i){
      var currentRow=$(this);

      currentRow.find("td:eq(0)").innerHTML = `${i+1}`;
      currentRow.find("td:eq(1) input").attr("id", `${i+1}profile`);
  
      console.log(i);
    });

    for(var i=0; i < counter; i++){
      $("#doorSizesTable tbody")[0].rows[i].cells[0].innerHTML = `${i+1}`;
      $("#doorSizesTable tbody")[0].rows[i].cells[1].innerHTML = `<td><input type="text" class="form-control" id="${i+1}profile" placeholder="Door, Drawer etc."></td>`;
      $("#doorSizesTable tbody")[0].rows[i].cells[2].innerHTML = `<td><input type="text" class="form-control" id="${i+1}quantity"></td>`;

      //$("#doorSizesTable tbody")[0].rows[i].cells[2].children().attr(id, `${i+1}quantity`);
      //$("#doorSizesTable tbody")[0].rows[i].cells[2].

      //console.log($("#doorSizesTable tbody")[0].rows[i].cells[2]);

      if($("input[name='unitType']:checked").val() == 'Imperial'){
        $("#doorSizesTable tbody")[0].rows[i].cells[3].innerHTML = `<td><input type="text" class="form-control inchRow" id="${i+1}heightInches"></td>`;
        $("#doorSizesTable tbody")[0].rows[i].cells[4].innerHTML = `<td><input type="text" class="form-control inchRow" id="${i+1}widthInches"></td>`;
        $("#doorSizesTable tbody")[0].rows[i].cells[5].innerHTML = `<td><input type="text" class="form-control mmRow" id="${i+1}heightMm" disabled></td>`;
        $("#doorSizesTable tbody")[0].rows[i].cells[6].innerHTML = `<td><input type="text" class="form-control mmRow" id="${i+1}widthMm" disabled></td>`;
      }else if($("input[name='unitType']:checked").val() == 'Metric'){
        $("#doorSizesTable tbody")[0].rows[i].cells[3].innerHTML = `<td><input type="text" class="form-control inchRow" id="${i+1}heightInches" disabled></td>`;
        $("#doorSizesTable tbody")[0].rows[i].cells[4].innerHTML = `<td><input type="text" class="form-control inchRow" id="${i+1}widthInches" disabled></td>`;
        $("#doorSizesTable tbody")[0].rows[i].cells[5].innerHTML = `<td><input type="text" class="form-control mmRow" id="${i+1}heightMm"></td>`;
        $("#doorSizesTable tbody")[0].rows[i].cells[6].innerHTML = `<td><input type="text" class="form-control mmRow" id="${i+1}widthMm"></td>`;
      }

      $("#doorSizesTable tbody")[0].rows[i].cells[7].innerHTML = `<td><textarea class="form-control" rows="1" id="${i+1}notes"></textarea></td>`;
    }
  });

  //switch between laminate and pvc
  $('input[type=radio][name=doorType]').change(function() {
    if (this.value == 'PVC') {
      $("#inputDoorStyle").attr('placeholder','Cypress, Aspen, Hibiscus etc.');
    }
    else if (this.value == 'Laminate') {
      $("#inputDoorStyle").attr('placeholder','Square, Half Wrap, Tight Wrap etc.');
    }
  });

  
  //switch between metric and imperial
  $('input[type=radio][name=unitType]').change(function() {

    if (this.value == 'Metric') {
      $(".inchRow").attr("disabled", true);
      $(".mmRow").attr("disabled", false);
    }
    else if (this.value == 'Imperial') {
      $(".inchRow").attr("disabled", false);
      $(".mmRow").attr("disabled", true);
    }
  });


  //complete order
  var form = document.querySelector('form');
  document.querySelector('form').onsubmit = e => {

    e.preventDefault();

    let data = {};
    Array.from(form).map(input => (data[input.id] = input.value));
    console.log(data);

    orderData.rowCount = counter;
    orderData.type = $('#typeButtons input:radio:checked').val();
    orderData.units = $('#unitButtons input:radio:checked').val();
    orderData.company = data.inputCompany;
    orderData.contact = data.inputContact;
    orderData.email = data.inputEmail;
    orderData.phone = data.inputPhone;
    orderData.fax = data.inputFax;
    orderData.address = data.inputAddress;
    orderData.address2 = data.inputAddress2;
    orderData.city = data.inputCity;
    orderData.province = data.inputProvince;
    orderData.zip = data.inputZip;
    orderData.PO = data.inputPO;
    orderData.style = data.inputDoorStyle;
    orderData.rows = [];

    for(var row=1; row <= counter; row++){

      var rowData = {
        profileName : data[`${row}profile`],
        quantity : data[`${row}quantity`],
        heightInches :  data[`${row}heightInches`],
        widthInches : data[`${row}widthInches`],
        heightMm : data[`${row}heightMm`],
        widthMm : data[`${row}widthMm`],
        note : data[`${row}notes`]
      };

      orderData.rows.push(rowData);
    }

    console.log(orderData);

    $('#companyVal').text(orderData.company);
    $('#contactVal').text(orderData.contact);
    $('#emailVal').text(orderData.email);
    $('#phoneVal').text(orderData.phone);
    $('#faxVal').text(orderData.fax);
    $('#addressVal').text(orderData.address);
    $('#address2Val').text(orderData.address2);
    $('#cityVal').text(orderData.city);
    $('#provinceVal').text(orderData.province);
    $('#zipVal').text(orderData.zip);
    $('#POVal').text(orderData.PO);
    $('#typeVal').text(orderData.type);
    $('#styleVal').text(orderData.style);
    $('#unitsVal').text(orderData.units);

    $("#confirmationTable tbody tr").remove(); 
    for(var i=0; i < orderData.rows.length; i++){

      var currentRow = orderData.rows[i];
    
      var newRow = $("<tr>");
      var cols = "";

      cols += `<th scope="row">${i+1}</th>`;
      cols += `<td>${currentRow.profileName}</td>`;
      cols += `<td>${currentRow.quantity}</td>`;
      cols += `<td>${currentRow.heightInches}</td>`;
      cols += `<td>${currentRow.widthInches}</td>`;
      cols += `<td>${currentRow.heightMm}</td>`;
      cols += `<td>${currentRow.widthMm}</td>`;
      cols += `<td>${currentRow.note}</td>`;

      newRow.append(cols);
      $("#confirmationTable").append(newRow);
    }


    $('#confirmationModal').modal();
  };


});
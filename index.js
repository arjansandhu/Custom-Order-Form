$(document).ready(function () {

  var counter = $('#doorSizesTable tbody tr').length ;
  let orderData = {};

  $("#addRow").on("click", function () {
    var newRow = $("<tr>");
    var cols = "";

    cols += `<th scope="row">${counter+1}</th>`;
    cols += `<td><input type="text" class="form-control" id="${counter+1}profile" placeholder="Door, Drawer etc."></td>`;
    cols += `<td><input type="text" class="form-control" id="${counter+1}quantity"></td>`;
    cols += `<td><input type="text" class="form-control heightCol" id="${counter+1}height"></td>`;
    cols += `<td><input type="text" class="form-control widthCol" id="${counter+1}width"></td>`;
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

    $("#doorSizesTable tbody tr").each(function(i){
      var currentRow=$(this);
      currentRow.find("th").text(`${i+1}`);
      currentRow.find("td:eq(0) input").attr("id", `${i+1}profile`);
      currentRow.find("td:eq(1) input").attr("id", `${i+1}quantity`);
      currentRow.find("td:eq(2) input").attr("id", `${i+1}height`);
      currentRow.find("td:eq(3) input").attr("id", `${i+1}width`);
      currentRow.find("td:eq(4) textarea").attr("id", `${i+1}notes`);
    });
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
      $("#heightHeader").html("Height <br> (mm)");
      $("#widthHeader").html("Width <br> (mm)");
    }
    else if (this.value == 'Imperial') {
      $("#heightHeader").html("Height <br> (inches)");
      $("#widthHeader").html("Width <br> (inches)");
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
    orderData.colour = data.inputDoorColour;
    orderData.rows = [];

    for(var row=1; row <= counter; row++){
      var rowData = {
        profileName : data[`${row}profile`],
        quantity : data[`${row}quantity`],
        height :  data[`${row}height`],
        width : data[`${row}width`],
        note : data[`${row}notes`]
      };
      orderData.rows.push(rowData);
    }

    console.log(orderData);

    if (orderData.units == 'Metric') {
      $("#heightHeaderModal").html("Height <br> (mm)");
      $("#widthHeaderModal").html("Width <br> (mm)");
    }
    else if (orderData.units == 'Imperial') {
      $("#heightHeaderModal").html("Height <br> (inches)");
      $("#widthHeaderModal").html("Width <br> (inches)");
    }

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
    $('#colourVal').text(orderData.colour);
    $('#unitsVal').text(orderData.units);

    $("#confirmationTable tbody tr").remove(); 
    for(var i=0; i < orderData.rows.length; i++){

      var currentRow = orderData.rows[i];
      var newRow = $("<tr>");
      var cols = "";

      cols += `<th scope="row">${i+1}</th>`;
      cols += `<td>${currentRow.profileName}</td>`;
      cols += `<td>${currentRow.quantity}</td>`;
      cols += `<td>${currentRow.height}</td>`;
      cols += `<td>${currentRow.width}</td>`;
      cols += `<td>${currentRow.note}</td>`;

      newRow.append(cols);
      $("#confirmationTable").append(newRow);
    }

    $('#confirmationModal').modal();
  };



  $("#submitButton").on("click", function () {

    orderData.orderDate = Date().toString();

    //send orderData to lambda endpoint






  });


});
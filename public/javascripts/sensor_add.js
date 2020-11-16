$(function () {
  
  $("#num_of_pins").on('input', (ev) => {
    let nop = $("#num_of_pins").val();
    $("#pins_layout").empty();
    if (Number.isInteger(Number.parseInt(nop))) {
      for (let x = 0; x < nop; x++) {
        let pin_input_layout = `<div class='mdl-cell--4-col mdl-cell--3-col-desktop border-rc m2'>
          <div class='mdl-textfield mdl-js-textfield pin_labels'>
          <span style="top:4px; font-size:10px;"> Pin Label: </span>
          <input class='mdl-textfield__input mdl-cell--12-col' type='text' pattern='-?^[a-zA-Z0-9_]*?' placeholder='e.g.: SIGNAL' title="Use only characters, numbers or '_' !" name='pin_label' id='pin_label${x}' required> 
          </div>
          </div>`;
        $("#pins_layout").append(pin_input_layout);
      }
    }
  });

  $("#num_of_fields").on('input', (ev) => {
    let nop = $("#num_of_fields").val();
    $("#fields_layout").empty();
    if (Number.isInteger(Number.parseInt(nop))) {
      for (let x = 0; x < nop; x++) {
        let field_input_layout = `<div class='mdl-cell--4-col mdl-cell--3-col-desktop border-rc m2'>
          <div class='mdl-textfield mdl-js-textfield fields'>
          <span style="top:4px; font-size:10px;"> Field: </span>
          <input class='mdl-textfield__input mdl-cell--12-col' type='text' pattern='-?^[a-zA-Z0-9_]*?' placeholder='e.g.: PH' title="Use only characters, numbers or '_' !" name='field' id='field${x}' required> 
          <br>
          <select class="mdl-textfield__input" name='data_type' hint:'select data type from the list' data-required=true>
            <option value="boolean" selected>boolean</option>
            <option value="integer">integer</option>
            <option value="float">float</option>
            <option value="double">double</option>
            <option value="char">char</option>
            <option value="string">string</option>
          </select>
          </div>
          </div>`;
        $("#fields_layout").append(field_input_layout);
      }
    }
  });

});
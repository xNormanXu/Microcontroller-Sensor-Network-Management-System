$(function () {

  $("#num_of_pins").on('input', (ev) => {
    let nop = $("#num_of_pins").val();
    $("#pins_layout").empty();
    if (Number.isInteger(Number.parseInt(nop))) {
      for (let x = 0; x < nop; x++) {

        let pin_input_layout = `<div class='mdl-cell--4-col mdl-cell--3-col-desktop border-rc m2'>
            <div class='mdl-textfield mdl-js-textfield pin_labels'>
              <span style="top:4px; font-size:10px;"> Pin Label: </span>
              <input class='mdl-textfield__input mdl-cell--12-col' type='text' pattern='-?^[a-zA-Z0-9_]*?' placeholder='e.g.: GPIO_02' 
              title="Use only characters, numbers or '_' !" name='pin_label' id='pin_label${x}' required> 
            </div>
            <div class='mdl-textfield mdl-js-textfield pin_labels'>
              <span style="top:4px; font-size:10px;"> Pin number: </span>
              <input class='mdl-textfield__input' type='text' pattern='-?^[0-9]*?' placeholder='e.g.: 2' 
                title="Use numbers only !" name='pin_num' id='pin_num${x}' data-required=true>
            </div>
          </div>`;
        $("#pins_layout").append(pin_input_layout);
      }
    } else {

    }
  });


});
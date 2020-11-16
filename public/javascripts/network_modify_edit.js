$(function () {
  loadSensor();
});

function loadSensor() {
  var add_sensors_layout = document.getElementById("add_sensors_layout");
  var configuration = JSON.parse($("#configuration").val());
  var sensors = configuration.sensors;

  for (var i = 0; i < sensors.length; i++) {
    // sensor layout div
    var sensor_layout_div = document.createElement("div");
    sensor_layout_div.className = "mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--6-col-desktop border-rc m2";
    sensor_layout_div.name = "sensor_layout";
    sensor_layout_div.id = "sensor_layout";

    /**************** sensor name and type ****************/

    // sensor name and type div
    var sensor_name_type_div = document.createElement("div");
    sensor_name_type_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

    // sensor name type span
    var sensor_name_type_span = document.createElement("span");
    sensor_name_type_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    sensor_name_type_span.textContent = "Sensor name and type";

    // sensor name and type input
    var sensor_name_type_input = document.createElement("input");
    sensor_name_type_input.className = "mdl-textfield__input";
    sensor_name_type_input.type = "text";
    sensor_name_type_input.pattern = "-?^[a-zA-Z0-9 _]*?";
    sensor_name_type_input.name = "sensor_name_type";
    sensor_name_type_input.id = "sensor_name_type";
    sensor_name_type_input.value = sensors[i].name_type;
    sensor_name_type_input.readOnly = true;

    sensor_name_type_div.appendChild(sensor_name_type_span);
    sensor_name_type_div.appendChild(sensor_name_type_input);
    sensor_layout_div.appendChild(sensor_name_type_div);

    /**************** sensor location ****************/

    // sensor location div
    var sensor_location_div = document.createElement("div");
    sensor_location_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

    // sensor location span
    var sensor_location_span = document.createElement("span");
    sensor_location_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    sensor_location_span.textContent = "Sensor location";

    // sensor label input
    var sensor_location_input = document.createElement("input");
    sensor_location_input.className = "mdl-textfield__input";
    sensor_location_input.type = "text";
    sensor_location_input.pattern = "-?^[a-zA-Z0-9 _]*?";
    sensor_location_input.name = "sensor_location";
    sensor_location_input.id = "sensor_location";
    sensor_location_input.value = sensors[i].location;
    sensor_location_input.required = true;

    sensor_location_div.appendChild(sensor_location_span);
    sensor_location_div.appendChild(sensor_location_input);
    sensor_layout_div.appendChild(sensor_location_div);

    /**************** sampling frequency ****************/

    // sampling frequency div
    var sampling_freq_div = document.createElement("div");
    sampling_freq_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";
    
    // sampling frequency span
    var sampling_freq_span = document.createElement("span");
    sampling_freq_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    sampling_freq_span.textContent = "Sampling frequency (Hz)";

    // sampling frequency input
    var sampling_freq_input = document.createElement("input");
    sampling_freq_input.className = "mdl-textfield__input";
    sampling_freq_input.type = "number";
    sampling_freq_input.pattern = "-?^[0-9]*?";
    sampling_freq_input.name = "sampling_frequency";
    sampling_freq_input.id = "sampling_frequency";
    sampling_freq_input.value = sensors[i].sampling_frequency;
    sampling_freq_input.required = true;

    sampling_freq_div.appendChild(sampling_freq_span);
    sampling_freq_div.appendChild(sampling_freq_input);
    sensor_layout_div.appendChild(sampling_freq_div);

    /**************** number of pins (hidden) ****************/
    
    var num_of_pins_input = document.createElement("input");

    num_of_pins_input.type = "hidden";
    num_of_pins_input.name = "num_of_pins";
    num_of_pins_input.id = "num_of_pins";
    num_of_pins_input.value = sensors[i].sensor_pins.length;

    sensor_layout_div.appendChild(num_of_pins_input);
    
    for (var j = 0; j < sensors[i].sensor_pins.length; j++) {
      /**************** sensor pin (hidden) ****************/

      // sensor pin input
      var senor_pin_input = document.createElement("input");
      senor_pin_input.type = "hidden";
      senor_pin_input.name = "sensor_pin";
      senor_pin_input.id = "sensor_pin";
      senor_pin_input.value = sensors[i].sensor_pins[j];

      sensor_layout_div.appendChild(senor_pin_input);
      
      /**************** microcontroller pin ****************/

      // pin div
      var pin_div = document.createElement("div");
      pin_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

      // pin span
      var pin_span = document.createElement("span");
      pin_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
      pin_span.textContent = sensors[i].sensor_pins[j];

      // pin select
      var pin_select = document.createElement("select");
      pin_select.className = "mdl-textfield__input";
      pin_select.name = "microcontroller_pin";
      pin_select.id = "microcontroller_pin";
      pin_select.required = true;

      var checkValue = sensors[i].microcontroller_pins[j];
      
      // pin option
      let pin_labels = $("#pin_labels").val().split(",");
      for (var k = 0; k < pin_labels.length; k++) {
        pin_select.options[k] = new Option(pin_labels[k]);

        if (pin_select.options[k].value == checkValue) {
          pin_select.options[k].selected = true;
        }
      }

      pin_div.appendChild(pin_span);
      pin_div.appendChild(pin_select);
      sensor_layout_div.appendChild(pin_div);
    }
    
    /**************** number of fields (hidden) ****************/

    var num_of_fields_input = document.createElement("input");

    num_of_fields_input.type = "hidden";
    num_of_fields_input.name = "num_of_fields";
    num_of_fields_input.id = "num_of_fields";
    num_of_fields_input.value = sensors[i].field_name.length;

    sensor_layout_div.appendChild(num_of_fields_input);

    var field = [];

    for (var j = 0; j < sensors[i].field_name.length; j++) {
      /**************** field name (hidden) ****************/

      // field input
      var field_name_input = document.createElement("input");
      field_name_input.type = "hidden";
      field_name_input.name = "field_name";
      field_name_input.id = "field_name";
      field_name_input.value = sensors[i].field_name[j];

      sensor_layout_div.appendChild(field_name_input);
      field.push(field_name_input.value);

      /**************** data type (hidden) ****************/

      // data type input
      var data_type_input = document.createElement("input");
      data_type_input.type = "hidden";
      data_type_input.name = "data_type";
      data_type_input.id = "data_type";
      data_type_input.value = sensors[i].data_type[j];

      sensor_layout_div.appendChild(data_type_input);
    }
    
    /**************** break ****************/

    // br
    var br = document.createElement("br");
    sensor_layout_div.appendChild(br);

    /**************** drop down ****************/

    // drop down div
    var drop_down_div = document.createElement("div");
    drop_down_div.className = "drop-down";

    // drop down input
    var drop_down_input = document.createElement("input");
    drop_down_input.className = "drop-down-button";
    drop_down_input.type = "button";
    drop_down_input.value = "...";

    // drop down menu div
    var drop_down_menu_div = document.createElement("div");
    drop_down_menu_div.className = "drop-down-menu";

    // view a
    var view_a = document.createElement("a");
    view_a.onclick = function() { openWindowOfSensorDetail(added_sensor) };
    view_a.href = "#";
    view_a.textContent = "View";

    // delete a
    var delete_a = document.createElement("a");
    delete_a.onclick = function() { this.parentNode.parentNode.parentNode.remove() };
    delete_a.href = "#"
    delete_a.textContent = "Delete";

    drop_down_menu_div.appendChild(view_a);
    drop_down_menu_div.appendChild(delete_a);

    drop_down_div.appendChild(drop_down_input);
    drop_down_div.appendChild(drop_down_menu_div);

    sensor_layout_div.appendChild(drop_down_div);
    add_sensors_layout.appendChild(sensor_layout_div);
  }
}

$("#btnAdd").on("click", (ev) => {
  $.getJSON("../../api/sensor", function(data) {
    // get created add_sensors_layout
    var add_sensors_layout = document.getElementById("add_sensors_layout");

    // sensor layout div
    var sensor_layout_div = document.createElement("div");
    sensor_layout_div.className = "mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--6-col-desktop border-rc m2";
    sensor_layout_div.name = "sensor_layout";
    sensor_layout_div.id = "sensor_layout";

    /**************** sensor name and type ****************/

    // sensor name and type div
    var sensor_name_type_div = document.createElement("div");
    sensor_name_type_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

    // sensor name type span
    var sensor_name_type_span = document.createElement("span");
    sensor_name_type_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    sensor_name_type_span.textContent = "Sensor name and type";

    // sensor
    var selected_sensor = document.getElementById("selected_sensor");
    var sensor_name_type = selected_sensor.options[selected_sensor.selectedIndex].value;

    // sensor name and type input
    var sensor_name_type_input = document.createElement("input");
    sensor_name_type_input.className = "mdl-textfield__input";
    sensor_name_type_input.type = "text";
    sensor_name_type_input.pattern = "-?^[a-zA-Z0-9 _]*?";
    sensor_name_type_input.name = "sensor_name_type";
    sensor_name_type_input.id = "sensor_name_type";
    sensor_name_type_input.value = sensor_name_type;
    sensor_name_type_input.readOnly = true;

    sensor_name_type_div.appendChild(sensor_name_type_span);
    sensor_name_type_div.appendChild(sensor_name_type_input);
    sensor_layout_div.appendChild(sensor_name_type_div);

    /**************** sensor location ****************/

    // sensor location div
    var sensor_location_div = document.createElement("div");
    sensor_location_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

    // sensor location span
    var sensor_location_span = document.createElement("span");
    sensor_location_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    sensor_location_span.textContent = "Sensor location";

    // sensor label input
    var sensor_location_input = document.createElement("input");
    sensor_location_input.className = "mdl-textfield__input";
    sensor_location_input.type = "text";
    sensor_location_input.pattern = "-?^[a-zA-Z0-9 _]*?";
    sensor_location_input.name = "sensor_location";
    sensor_location_input.id = "sensor_location";
    sensor_location_input.required = true;

    sensor_location_div.appendChild(sensor_location_span);
    sensor_location_div.appendChild(sensor_location_input);
    sensor_layout_div.appendChild(sensor_location_div);

    /**************** sampling frequency ****************/

    // sampling frequency div
    var sampling_freq_div = document.createElement("div");
    sampling_freq_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";
    
    // sampling frequency span
    var sampling_freq_span = document.createElement("span");
    sampling_freq_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    sampling_freq_span.textContent = "Sampling frequency (Hz)";

    // sampling frequency input
    var sampling_freq_input = document.createElement("input");
    sampling_freq_input.className = "mdl-textfield__input";
    sampling_freq_input.type = "number";
    sampling_freq_input.pattern = "-?^[0-9]*?";
    sampling_freq_input.name = "sampling_frequency";
    sampling_freq_input.id = "sampling_frequency";
    sampling_freq_input.required = true;

    sampling_freq_div.appendChild(sampling_freq_span);
    sampling_freq_div.appendChild(sampling_freq_input);
    sensor_layout_div.appendChild(sampling_freq_div);

    /**************** get json of added sensor ****************/
    
    var added_sensor = {};

    for (var i = 0; i < data.sensors.length; i++) {
      var current_name_type = data.sensors[i].name + " " + "(" + data.sensors[i].model_type + ")";
      if (current_name_type === sensor_name_type) {
        added_sensor = data.sensors[i];
        break;
      }
    }

    /**************** number of pins (hidden) ****************/

    var num_of_pins_input = document.createElement("input");

    num_of_pins_input.type = "hidden";
    num_of_pins_input.name = "num_of_pins";
    num_of_pins_input.id = "num_of_pins";
    num_of_pins_input.value = added_sensor.num_of_pins;

    sensor_layout_div.appendChild(num_of_pins_input);

    /**************** sensor pin (hidden) ****************/

    for (var i = 0; i < added_sensor.pin_label.length; i++) {
      // sensor pin input
      var senor_pin_input = document.createElement("input");
      senor_pin_input.type = "hidden";
      senor_pin_input.name = "sensor_pin";
      senor_pin_input.id = "sensor_pin";
      senor_pin_input.value = added_sensor.pin_label[i];

      sensor_layout_div.appendChild(senor_pin_input);
    }

    /**************** microcontroller pin ****************/

    for (var i = 0; i < added_sensor.num_of_pins; i++) {
      // pin div
      var pin_div = document.createElement("div");
      pin_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

      // pin span
      var pin_span = document.createElement("span");
      pin_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
      pin_span.textContent = added_sensor.pin_label[i];

      // pin select
      var pin_select = document.createElement("select");
      pin_select.className = "mdl-textfield__input";
      pin_select.name = "microcontroller_pin";
      pin_select.id = "microcontroller_pin";
      pin_select.required = true;

      // pin option
      let pin_labels = $("#pin_labels").val().split(",");
      for (var j = 0; j < pin_labels.length; j++) {
        pin_select.options[j] = new Option(pin_labels[j]);
      }

      pin_div.appendChild(pin_span);
      pin_div.appendChild(pin_select);
      sensor_layout_div.appendChild(pin_div);
    }

    /**************** number of fields (hidden) ****************/

    var num_of_fields_input = document.createElement("input");

    num_of_fields_input.type = "hidden";
    num_of_fields_input.name = "num_of_fields";
    num_of_fields_input.id = "num_of_fields";
    num_of_fields_input.value = added_sensor.num_of_fields;

    sensor_layout_div.appendChild(num_of_fields_input);

    /**************** field name (hidden) ****************/

    for (var i = 0; i < added_sensor.field.length; i++) {
      // field input
      var field_name_input = document.createElement("input");
      field_name_input.type = "hidden";
      field_name_input.name = "field_name";
      field_name_input.id = "field_name";
      field_name_input.value = added_sensor.field[i];

      sensor_layout_div.appendChild(field_name_input);
    }

    /**************** data type (hidden) ****************/

    for (var i = 0; i < added_sensor.data_type.length; i++) {
      // data type input
      var data_type_input = document.createElement("input");
      data_type_input.type = "hidden";
      data_type_input.name = "data_type";
      data_type_input.id = "data_type";
      data_type_input.value = added_sensor.data_type[i];

      sensor_layout_div.appendChild(data_type_input);
    }

    /**************** break ****************/

    // br
    var br = document.createElement("br");
    sensor_layout_div.appendChild(br);

    /**************** drop down ****************/

    // drop down div
    var drop_down_div = document.createElement("div");
    drop_down_div.className = "drop-down";

    // drop down input
    var drop_down_input = document.createElement("input");
    drop_down_input.className = "drop-down-button";
    drop_down_input.type = "button";
    drop_down_input.value = "...";

    // drop down menu div
    var drop_down_menu_div = document.createElement("div");
    drop_down_menu_div.className = "drop-down-menu";

    // view a
    var view_a = document.createElement("a");
    view_a.onclick = function() { openWindowOfSensorDetail(added_sensor) };
    view_a.href = "#";
    view_a.textContent = "View";

    // delete a
    var delete_a = document.createElement("a");
    delete_a.onclick = function() { this.parentNode.parentNode.parentNode.remove() };
    delete_a.href = "#"
    delete_a.textContent = "Delete";

    drop_down_menu_div.appendChild(view_a);
    drop_down_menu_div.appendChild(delete_a);

    drop_down_div.appendChild(drop_down_input);
    drop_down_div.appendChild(drop_down_menu_div);

    sensor_layout_div.appendChild(drop_down_div);
    add_sensors_layout.appendChild(sensor_layout_div);
  });
});

function openWindowOfSensorDetail(added_sensor) {
  var sensor_window_div = document.getElementById("sensorWindow");
  sensor_window_div.style.display = "block";

  var sensor_window_body_div = document.getElementById("sensorWindowBody");
  
  var sensor_name_p = document.getElementById("sensor_name");
  sensor_name_p.textContent = "Name: " + added_sensor.name;
  sensor_window_body_div.appendChild(sensor_name_p);

  var sensor_type_p = document.getElementById("sensor_type");
  sensor_type_p.textContent = "Model type: " + added_sensor.model_type;
  sensor_window_body_div.appendChild(sensor_type_p);

  var sensor_field_p = document.getElementById("sensor_field");
  sensor_field_p.textContent = "Field: " + added_sensor.field.join();
  sensor_window_body_div.appendChild(sensor_field_p);
}

$('#close').on('click', function(){
  var sensor_window_div = document.getElementById("sensorWindow");
  sensor_window_div.style.display = "none";
});
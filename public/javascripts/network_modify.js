// $(function () {
//     loadMicrocontrollerLayout();

//   //   function uuidv4() {
//   //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//   //       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//   //       return v.toString(16);
//   //     });
//   //   }
// });

// function loadMicrocontrollerLayout() {
//   if (localStorage.getItem("network_microcontrollers")) {
//     // get created add_microcontrollers_layout
//     var add_microcontrollers_layout = document.getElementById("add_microcontrollers_layout");
//     var network_microcontrollers = JSON.parse(localStorage.getItem("network_microcontrollers"));

//     var network_sensors_input = document.getElementById("network_sensors");
//     var network_sensors = JSON.parse(network_sensors_input.value);

//     add_microcontrollers_layout.innerHTML = "";
    
//     for (var i = 0; i < network_microcontrollers.length; i++) {
//       // microcontroller layout div
//       var microcontroller_layout_div = document.createElement("div");
//       microcontroller_layout_div.className = "mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--6-col-desktop border-rc m2";
//       microcontroller_layout_div.name = "microcontroller_layout";
//       microcontroller_layout_div.id = "microcontroller_layout";

//       /**************** microcontroller name and type ****************/

//       // microcontroller name and type div
//       var microcontroller_name_type_div = document.createElement("div");
//       microcontroller_name_type_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

//       // microcontroller name and type span
//       var microcontroller_name_type_span = document.createElement("span");
//       microcontroller_name_type_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//       microcontroller_name_type_span.textContent = "Microcontroller name and type";

//       // microcontroller name and type input
//       var microcontroller_name_type_input = document.createElement("input");
//       microcontroller_name_type_input.className = "mdl-textfield__input";
//       microcontroller_name_type_input.type = "text";
//       microcontroller_name_type_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//       microcontroller_name_type_input.name = "microcontroller_name_type";
//       microcontroller_name_type_input.id = "microcontroller_name_type";
//       microcontroller_name_type_input.value = network_microcontrollers[i].microcontroller_name_type;
//       microcontroller_name_type_input.readOnly = true;

//       microcontroller_name_type_div.appendChild(microcontroller_name_type_span);
//       microcontroller_name_type_div.appendChild(microcontroller_name_type_input);
//       microcontroller_layout_div.appendChild(microcontroller_name_type_div);

//       /**************** mac address ****************/

//       // mac address div
//       var mac_address_div = document.createElement("div");
//       mac_address_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";
      
//       // mac address span
//       var mac_address_span = document.createElement("span");
//       mac_address_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//       mac_address_span.textContent = "Mac address";

//       // mac address input
//       var mac_address_input = document.createElement("input");

//       mac_address_input.className = "mdl-textfield__input";
//       mac_address_input.type = "text";
//       mac_address_input.pattern = "-?^[0-9]*?";
//       mac_address_input.name = "mac_address";
//       mac_address_input.id = "mac_address";
//       mac_address_input.value = network_microcontrollers[i].microcontroller_mac_address;
//       mac_address_input.readOnly = true;

//       mac_address_div.appendChild(mac_address_span);
//       mac_address_div.appendChild(mac_address_input);
//       microcontroller_layout_div.appendChild(mac_address_div);

//       /**************** microcontroller location ****************/

//       // microcontroller location div
//       var microcontroller_location_div = document.createElement("div");
//       microcontroller_location_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

//       // microcontroller location span
//       var microcontroller_location_span = document.createElement("span");
//       microcontroller_location_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//       microcontroller_location_span.textContent = "Microcontroller location";

//       // microcontroller location input
//       var microcontroller_location_input = document.createElement("input");

//       microcontroller_location_input.className = "mdl-textfield__input";
//       microcontroller_location_input.type = "text";
//       microcontroller_location_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//       microcontroller_location_input.name = "microcontroller_location";
//       microcontroller_location_input.id = "microcontroller_location";
//       microcontroller_location_input.value = network_microcontrollers[i].microcontroller_location;

//       microcontroller_location_div.appendChild(microcontroller_location_span);
//       microcontroller_location_div.appendChild(microcontroller_location_input);
//       microcontroller_layout_div.appendChild(microcontroller_location_div);

//       /**************** number of sensors ****************/

//       // number of sensors div
//       var num_of_sensors_div = document.createElement("div");
//       num_of_sensors_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

//       // number of sensors span
//       var num_of_sensors_span = document.createElement("span");
//       num_of_sensors_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//       num_of_sensors_span.textContent = "Number of sensors";

//       // number of sensors input
//       var num_of_sensors_input = document.createElement("input");

//       num_of_sensors_input.className = "mdl-textfield__input";
//       num_of_sensors_input.type = "text";
//       num_of_sensors_input.pattern = "-?^[0-9]*?";
//       num_of_sensors_input.name = "num_of_sensors";
//       num_of_sensors_input.id = "num_of_sensors";
//       num_of_sensors_input.value = network_microcontrollers[i].num_of_sensors;
//       num_of_sensors_input.readOnly = "true";

//       num_of_sensors_div.appendChild(num_of_sensors_span);
//       num_of_sensors_div.appendChild(num_of_sensors_input);
//       microcontroller_layout_div.appendChild(num_of_sensors_div);

//       /**************** sensor name and type ****************/

//       // sensor name and type div
//       var sensor_name_type_div = document.createElement("div");
//       sensor_name_type_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";

//       // sensor name and type span
//       var sensor_name_type_span = document.createElement("span");
//       sensor_name_type_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//       sensor_name_type_span.textContent = "Sensor name and type";

//       // sensor name and type input
//       var sensor_name_type_input = document.createElement("input");

//       sensor_name_type_input.className = "mdl-textfield__input";
//       sensor_name_type_input.type = "text";
//       sensor_name_type_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//       sensor_name_type_input.name = "sensor_name_type";
//       sensor_name_type_input.id = "sensor_name_type";
//       sensor_name_type_input.value = network_microcontrollers[i].sensor_name_type;
//       sensor_name_type_input.readOnly = "true";

//       sensor_name_type_div.appendChild(sensor_name_type_span);
//       sensor_name_type_div.appendChild(sensor_name_type_input);
//       microcontroller_layout_div.appendChild(sensor_name_type_div);

//       /**************** sensor location (hidden) ****************/

//       // sensor location div
//       var sensor_location_div = document.createElement("div");
//       sensor_location_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
//       sensor_location_div.style = "display: none";

//       // sensor location span
//       var sensor_location_span = document.createElement("span");
//       sensor_location_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//       sensor_location_span.textContent = "Sensor location";

//       // sensor location input
//       var sensor_location_input = document.createElement("input");

//       sensor_location_input.className = "mdl-textfield__input";
//       sensor_location_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//       sensor_location_input.name = "sensor_location";
//       sensor_location_input.id = "sensor_location";
//       sensor_location_input.value = network_microcontrollers[i].sensor_location;
//       sensor_location_input.readOnly = "true";

//       sensor_location_div.appendChild(sensor_location_span);
//       sensor_location_div.appendChild(sensor_location_input);
//       microcontroller_layout_div.appendChild(sensor_location_div);

//       /**************** sampling frequency (hidden) ****************/

//       // sampling frequency div
//       var sampling_frequency_div = document.createElement("div");
//       sampling_frequency_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
//       sampling_frequency_div.style = "display: none";

//       // sampling frequency span
//       var sampling_frequency_span = document.createElement("span");
//       sampling_frequency_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//       sampling_frequency_span.textContent = "Sampling frequency";

//       // sampling frequency input
//       var sampling_frequency_input = document.createElement("input");

//       sampling_frequency_input.className = "mdl-textfield__input";
//       sampling_frequency_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//       sampling_frequency_input.name = "sampling_frequency";
//       sampling_frequency_input.id = "sampling_frequency";
//       sampling_frequency_input.value = network_microcontrollers[i].sampling_frequency;
//       sampling_frequency_input.readOnly = "true";

//       sampling_frequency_div.appendChild(sampling_frequency_span);
//       sampling_frequency_div.appendChild(sampling_frequency_input);
//       microcontroller_layout_div.appendChild(sampling_frequency_div);

//       /**************** number of pins (hidden) ****************/

//       // num of pins div
//       var num_of_pins_div = document.createElement("div");
//       num_of_pins_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
//       num_of_pins_div.style = "display: none";

//       // num of pins span
//       var num_of_pins_span = document.createElement("span");
//       num_of_pins_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//       num_of_pins_span.textContent = "Number of pins";

//       // num of pins input
//       var num_of_pins_input = document.createElement("input");

//       num_of_pins_input.className = "mdl-textfield__input";
//       num_of_pins_input.pattern = "-?^[0-9]*?";
//       num_of_pins_input.name = "num_of_pins";
//       num_of_pins_input.id = "num_of_pins";
//       num_of_pins_input.value = network_microcontrollers[i].num_of_pins;
//       num_of_pins_input.readOnly = "true";

//       num_of_pins_div.appendChild(num_of_pins_span);
//       num_of_pins_div.appendChild(num_of_pins_input);
//       microcontroller_layout_div.appendChild(num_of_pins_div);

//       /**************** microcontroller pin (hidden) ****************/

//       // microcontroller pin div
//       var microcontroller_pin_div = document.createElement("div");
//       microcontroller_pin_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
//       microcontroller_pin_div.style = "display: none";

//       // microcontroller pin span
//       var microcontroller_pin_span = document.createElement("span");
//       microcontroller_pin_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//       microcontroller_pin_span.textContent = "Microcontroller pin";

//       // microcontroller pin input
//       var microcontroller_pin_input = document.createElement("input");

//       microcontroller_pin_input.className = "mdl-textfield__input";
//       microcontroller_pin_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//       microcontroller_pin_input.name = "microcontroller_pin";
//       microcontroller_pin_input.id = "microcontroller_pin";
//       microcontroller_pin_input.value = network_microcontrollers[i].microcontroller_pin;
//       microcontroller_pin_input.readOnly = "true";

//       microcontroller_pin_div.appendChild(microcontroller_pin_span);
//       microcontroller_pin_div.appendChild(microcontroller_pin_input);
//       microcontroller_layout_div.appendChild(microcontroller_pin_div);

//       /**************** sensor pin (hidden) ****************/

//       // sensor pin div
//       var sensor_pin_div = document.createElement("div");
//       sensor_pin_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
//       sensor_pin_div.style = "display: none";

//       // sensor pin span
//       var sensor_pin_span = document.createElement("span");
//       sensor_pin_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//       sensor_pin_span.textContent = "Microcontroller pin";

//       // sensor pin input
//       var sensor_pin_input = document.createElement("input");

//       sensor_pin_input.className = "mdl-textfield__input";
//       sensor_pin_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//       sensor_pin_input.name = "sensor_pin";
//       sensor_pin_input.id = "sensor_pin";
//       sensor_pin_input.value = network_microcontrollers[i].sensor_pin;
//       sensor_pin_input.readOnly = "true";

//       sensor_pin_div.appendChild(sensor_pin_span);
//       sensor_pin_div.appendChild(sensor_pin_input);
//       microcontroller_layout_div.appendChild(sensor_pin_div);

//       var microcontroller_name_type = network_sensors.name + " " + "(" + network_sensors.model_type + ")";
//       if (microcontroller_name_type == network_microcontrollers[i].microcontroller_name_type) {
//         if (network_sensors.hasOwnProperty("sensor_name_type")) {
//           sensor_name_type_input.value = network_sensors.sensor_name_type;
//           sensor_location_input.value = network_sensors.sensor_location;
//           sampling_frequency_input.value = network_sensors.sampling_frequency;
//           num_of_pins_input.value = network_sensors.num_of_pins;
//           microcontroller_pin_input.value = network_sensors.microcontroller_pin;
//           sensor_pin_input.value = network_sensors.sensor_pin;

//           network_microcontrollers[i].sensor_name_type = network_sensors.sensor_name_type;
//           network_microcontrollers[i].sensor_location = network_sensors.sensor_location;
//           network_microcontrollers[i].sampling_frequency = network_sensors.sampling_frequency;
//           network_microcontrollers[i].num_of_pins = network_sensors.num_of_pins;
//           network_microcontrollers[i].microcontroller_pin = network_sensors.microcontroller_pin;
//           network_microcontrollers[i].sensor_pin = network_sensors.sensor_pin;

//           num_of_sensors_input.value = "1";
//           network_microcontrollers[i].num_of_sensors = "1";

//           if (Array.isArray(network_sensors.sensor_name_type)) {
//             num_of_sensors_input.value = network_sensors.sensor_name_type.length;
//             network_microcontrollers[i].num_of_sensors = network_sensors.sensor_name_type.length;
//           }
//         }
//       }

//       /**************** drop down ****************/

//       // drop down div
//       var drop_down_div = document.createElement("div");
//       drop_down_div.className = "drop-down";

//       // drop down input
//       var drop_down_input = document.createElement("input");
//       drop_down_input.className = "drop-down-button";
//       drop_down_input.type = "button";
//       drop_down_input.value = "...";

//       // drop down menu div
//       var drop_down_menu_div = document.createElement("div");
//       drop_down_menu_div.className = "drop-down-menu";

//       // edit a
//       var edit_a = document.createElement("a");
//       edit_a.href = "/network/add/edit?mac=" + network_microcontrollers[i].microcontroller_mac_address;
//       edit_a.textContent = "Edit";

//       // view a
//       var view_a = document.createElement("a");
//       view_a.href = "/network/add/view?mac=" + network_microcontrollers[i].microcontroller_mac_address;
//       view_a.textContent = "View";

//       // delete a
//       var delete_a = document.createElement("a");
//       delete_a.onclick = function() { this.parentNode.parentNode.parentNode.remove() };
//       delete_a.href = "#"
//       delete_a.textContent = "Delete";

//       drop_down_menu_div.appendChild(edit_a);
//       drop_down_menu_div.appendChild(view_a);
//       drop_down_menu_div.appendChild(delete_a);

//       drop_down_div.appendChild(drop_down_input);
//       drop_down_div.appendChild(drop_down_menu_div);

//       microcontroller_layout_div.appendChild(drop_down_div);

//       // add all the elements into add_microcontrollers_layout
//       add_microcontrollers_layout.appendChild(microcontroller_layout_div);

//       localStorage.setItem("network_microcontrollers", JSON.stringify(network_microcontrollers));
//     }
//   } else {
    
//     // get old microcontrollers information
//     var network_microcontrollers = [];
//     var network_microcontroller = {};

//     var microcontroller_name_type_input = document.getElementsByName("microcontroller_name_type");
//     var mac_address_input = document.getElementsByName("mac_address");
//     var microcontroller_location_input = document.getElementsByName("microcontroller_location");
//     var num_of_sensors_input = document.getElementsByName("num_of_sensors");
//     var sensor_name_type_input = document.getElementsByName("sensor_name_type");
//     var sensor_location_input = document.getElementsByName("sensor_location");
//     var sampling_frequency_input = document.getElementsByName("sampling_frequency");
//     var num_of_pins_input = document.getElementsByName("num_of_pins");
//     var microcontroller_pin_input = document.getElementsByName("microcontroller_pin");
//     var sensor_pin_input = document.getElementsByName("sensor_pin");

//     for (var i = 0; i < microcontroller_name_type_input.length; i++) {
//       network_microcontroller.microcontroller_name_type = microcontroller_name_type_input[i].value;
//       network_microcontroller.microcontroller_mac_address = mac_address_input[i].value;
//       network_microcontroller.microcontroller_location = microcontroller_location_input[i].value;
//       network_microcontroller.num_of_sensors = num_of_sensors_input[i].value;
//       network_microcontroller.sensor_name_type = sensor_name_type_input[i].value;
//       network_microcontroller.sensor_location = sensor_location_input[i].value;
//       network_microcontroller.sampling_frequency = sampling_frequency_input[i].value;
//       network_microcontroller.num_of_pins = num_of_pins_input[i].value;
//       network_microcontroller.microcontroller_pin = microcontroller_pin_input[i].value;
//       network_microcontroller.sensor_pin = sensor_pin_input[i].value;

//       network_microcontrollers.push(network_microcontroller);
//     }
    
//     localStorage.setItem("network_microcontrollers", JSON.stringify(network_microcontrollers));
//   }
// }

// $("#btnAdd").on("click", (ev) => {
//   $.getJSON("../api/microcontroller", function(data) {
//     // get created add_microcontrollers_layout
//     var add_microcontrollers_layout = document.getElementById("add_microcontrollers_layout");
    
//     // microcontroller layout div
//     var microcontroller_layout_div = document.createElement("div");
//     microcontroller_layout_div.className = "mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--6-col-desktop border-rc m2";
//     microcontroller_layout_div.name = "microcontroller_layout";
//     microcontroller_layout_div.id = "microcontroller_layout";

//     /**************** microcontroller name and type ****************/

//     // microcontroller name and type div
//     var microcontroller_name_type_div = document.createElement("div");
//     microcontroller_name_type_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

//     // microcontroller name and type span
//     var microcontroller_name_type_span = document.createElement("span");
//     microcontroller_name_type_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//     microcontroller_name_type_span.textContent = "Microcontroller name and type";

//     // microcontroller
//     var selected_microcontroller = document.getElementById("selected_microcontroller");
//     var microcontroller_name_type = selected_microcontroller.options[selected_microcontroller.selectedIndex].value;

//     // microcontroller name and type input
//     var microcontroller_name_type_input = document.createElement("input");
//     microcontroller_name_type_input.className = "mdl-textfield__input";
//     microcontroller_name_type_input.type = "text";
//     microcontroller_name_type_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//     microcontroller_name_type_input.name = "microcontroller_name_type";
//     microcontroller_name_type_input.id = "microcontroller_name_type";
//     microcontroller_name_type_input.value = microcontroller_name_type;
//     microcontroller_name_type_input.readOnly = true;

//     microcontroller_name_type_div.appendChild(microcontroller_name_type_span);
//     microcontroller_name_type_div.appendChild(microcontroller_name_type_input);
//     microcontroller_layout_div.appendChild(microcontroller_name_type_div);

//     /**************** get json of added microcontroller ****************/

//     var network_microcontroller = {};

//     for (var i = 0; i < data.microcontrollers.length; i++) {
//       var current_name_type = data.microcontrollers[i].name + " " + "(" + data.microcontrollers[i].model_type + ")";
//       if (current_name_type === microcontroller_name_type) {
//         network_microcontroller = data.microcontrollers[i];
//         break;
//       }
//     }

//     /**************** mac address ****************/

//     // mac address div
//     var mac_address_div = document.createElement("div");
//     mac_address_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";
    
//     // mac address span
//     var mac_address_span = document.createElement("span");
//     mac_address_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//     mac_address_span.textContent = "Mac address";

//     // mac address input
//     var mac_address_input = document.createElement("input");
//     var mac_address = network_microcontroller.mac;

//     mac_address_input.className = "mdl-textfield__input";
//     mac_address_input.type = "text";
//     mac_address_input.pattern = "-?^[0-9]*?";
//     mac_address_input.name = "mac_address";
//     mac_address_input.id = "mac_address";
//     mac_address_input.value = mac_address;
//     mac_address_input.readOnly = true;

//     mac_address_div.appendChild(mac_address_span);
//     mac_address_div.appendChild(mac_address_input);
//     microcontroller_layout_div.appendChild(mac_address_div);

//     /**************** microcontroller location ****************/

//     // microcontroller location div
//     var microcontroller_location_div = document.createElement("div");
//     microcontroller_location_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

//     // microcontroller location span
//     var microcontroller_location_span = document.createElement("span");
//     microcontroller_location_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//     microcontroller_location_span.textContent = "Microcontroller location";

//     // microcontroller location input
//     var microcontroller_location_input = document.createElement("input");

//     microcontroller_location_input.className = "mdl-textfield__input";
//     microcontroller_location_input.type = "text";
//     microcontroller_location_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//     microcontroller_location_input.name = "microcontroller_location";
//     microcontroller_location_input.id = "microcontroller_location";
//     microcontroller_location_input.required = true;

//     microcontroller_location_div.appendChild(microcontroller_location_span);
//     microcontroller_location_div.appendChild(microcontroller_location_input);
//     microcontroller_layout_div.appendChild(microcontroller_location_div);

//     /**************** number of sensors ****************/

//     // number of sensors div
//     var num_of_sensors_div = document.createElement("div");
//     num_of_sensors_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

//     // number of sensors span
//     var num_of_sensors_span = document.createElement("span");
//     num_of_sensors_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//     num_of_sensors_span.textContent = "Number of sensors";

//     // number of sensors input
//     var num_of_sensors_input = document.createElement("input");

//     num_of_sensors_input.className = "mdl-textfield__input";
//     num_of_sensors_input.type = "text";
//     num_of_sensors_input.pattern = "-?^[0-9]*?";
//     num_of_sensors_input.name = "num_of_sensors";
//     num_of_sensors_input.id = "num_of_sensors";
//     num_of_sensors_input.value = "0";
//     num_of_sensors_input.readOnly = "true";

//     num_of_sensors_div.appendChild(num_of_sensors_span);
//     num_of_sensors_div.appendChild(num_of_sensors_input);
//     microcontroller_layout_div.appendChild(num_of_sensors_div);

//     /**************** sensor name and type ****************/

//     // sensors name and type div
//     var sensor_name_type_div = document.createElement("div");
//     sensor_name_type_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";

//     // sensor name and type span
//     var sensor_name_type_span = document.createElement("span");
//     sensor_name_type_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//     sensor_name_type_span.textContent = "Sensor name and type";

//     // sensor name and type input
//     var sensor_name_type_input = document.createElement("input");

//     sensor_name_type_input.className = "mdl-textfield__input";
//     sensor_name_type_input.type = "text";
//     sensor_name_type_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//     sensor_name_type_input.name = "sensor_name_type";
//     sensor_name_type_input.id = "sensor_name_type";
//     sensor_name_type_input.value = "none";
//     sensor_name_type_input.readOnly = "true";

//     sensor_name_type_div.appendChild(sensor_name_type_span);
//     sensor_name_type_div.appendChild(sensor_name_type_input);
//     microcontroller_layout_div.appendChild(sensor_name_type_div);

//     /**************** sensor location (hidden) ****************/

//     // sensor location div
//     var sensor_location_div = document.createElement("div");
//     sensor_location_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
//     sensor_location_div.style = "display: none";

//     // sensor location span
//     var sensor_location_span = document.createElement("span");
//     sensor_location_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//     sensor_location_span.textContent = "Sensor location";

//     // sensor location input
//     var sensor_location_input = document.createElement("input");

//     sensor_location_input.className = "mdl-textfield__input";
//     sensor_location_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//     sensor_location_input.name = "sensor_location";
//     sensor_location_input.id = "sensor_location";
//     sensor_location_input.value = "none";
//     sensor_location_input.readOnly = "true";

//     sensor_location_div.appendChild(sensor_location_span);
//     sensor_location_div.appendChild(sensor_location_input);
//     microcontroller_layout_div.appendChild(sensor_location_div);

//     /**************** sampling frequency (hidden) ****************/

//     // sampling frequency div
//     var sampling_frequency_div = document.createElement("div");
//     sampling_frequency_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
//     sampling_frequency_div.style = "display: none";

//     // sampling frequency span
//     var sampling_frequency_span = document.createElement("span");
//     sampling_frequency_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//     sampling_frequency_span.textContent = "Sampling frequency";

//     // sampling frequency input
//     var sampling_frequency_input = document.createElement("input");

//     sampling_frequency_input.className = "mdl-textfield__input";
//     sampling_frequency_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//     sampling_frequency_input.name = "sampling_frequency";
//     sampling_frequency_input.id = "sampling_frequency";
//     sampling_frequency_input.value = "none";
//     sampling_frequency_input.readOnly = "true";

//     sampling_frequency_div.appendChild(sampling_frequency_span);
//     sampling_frequency_div.appendChild(sampling_frequency_input);
//     microcontroller_layout_div.appendChild(sampling_frequency_div);

//     /**************** number of pins (hidden) ****************/

//     // num of pins div
//     var num_of_pins_div = document.createElement("div");
//     num_of_pins_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
//     num_of_pins_div.style = "display: none";

//     // num of pins span
//     var num_of_pins_span = document.createElement("span");
//     num_of_pins_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//     num_of_pins_span.textContent = "Number of pins";

//     // num of pins input
//     var num_of_pins_input = document.createElement("input");

//     num_of_pins_input.className = "mdl-textfield__input";
//     num_of_pins_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//     num_of_pins_input.name = "num_of_pins";
//     num_of_pins_input.id = "num_of_pins";
//     num_of_pins_input.value = "none";
//     num_of_pins_input.readOnly = "true";

//     num_of_pins_div.appendChild(num_of_pins_span);
//     num_of_pins_div.appendChild(num_of_pins_input);
//     microcontroller_layout_div.appendChild(num_of_pins_div);

//     /**************** microcontroller pin (hidden) ****************/

//     // microcontroller pin div
//     var microcontroller_pin_div = document.createElement("div");
//     microcontroller_pin_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
//     microcontroller_pin_div.style = "display: none";

//     // microcontroller pin span
//     var microcontroller_pin_span = document.createElement("span");
//     microcontroller_pin_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//     microcontroller_pin_span.textContent = "Microcontroller pin";

//     // microcontroller pin input
//     var microcontroller_pin_input = document.createElement("input");

//     microcontroller_pin_input.className = "mdl-textfield__input";
//     microcontroller_pin_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//     microcontroller_pin_input.name = "microcontroller_pin";
//     microcontroller_pin_input.id = "microcontroller_pin";
//     microcontroller_pin_input.value = "none";
//     microcontroller_pin_input.readOnly = "true";

//     microcontroller_pin_div.appendChild(microcontroller_pin_span);
//     microcontroller_pin_div.appendChild(microcontroller_pin_input);
//     microcontroller_layout_div.appendChild(microcontroller_pin_div);

//     /**************** sensor pin (hidden) ****************/

//     // sensor pin div
//     var sensor_pin_div = document.createElement("div");
//     sensor_pin_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
//     sensor_pin_div.style = "display: none";

//     // sensor pin span
//     var sensor_pin_span = document.createElement("span");
//     sensor_pin_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
//     sensor_pin_span.textContent = "Microcontroller pin";

//     // sensor pin input
//     var sensor_pin_input = document.createElement("input");

//     sensor_pin_input.className = "mdl-textfield__input";
//     sensor_pin_input.pattern = "-?^[a-zA-Z0-9 _]*?";
//     sensor_pin_input.name = "sensor_pin";
//     sensor_pin_input.id = "sensor_pin";
//     sensor_pin_input.value = "none";
//     sensor_pin_input.readOnly = "true";

//     sensor_pin_div.appendChild(sensor_pin_span);
//     sensor_pin_div.appendChild(sensor_pin_input);
//     microcontroller_layout_div.appendChild(sensor_pin_div);

//     /**************** drop down ****************/

//     // drop down div
//     var drop_down_div = document.createElement("div");
//     drop_down_div.className = "drop-down";

//     // drop down input
//     var drop_down_input = document.createElement("input");
//     drop_down_input.className = "drop-down-button";
//     drop_down_input.type = "button";
//     drop_down_input.value = "...";

//     // drop down menu div
//     var drop_down_menu_div = document.createElement("div");
//     drop_down_menu_div.className = "drop-down-menu";

//     var name = document.getElementById("name");

//     // edit a
//     var edit_a = document.createElement("a");
//     edit_a.href = "/network/modify/edit?mac=" + mac_address + "&network_name=" + name.value;
//     edit_a.textContent = "Edit";

//     // view a
//     var view_a = document.createElement("a");
//     view_a.href = "/network/modify/view?mac=" + mac_address + "&network_name=" + name.value;
//     view_a.textContent = "View";

//     // delete a
//     var delete_a = document.createElement("a");
//     delete_a.onclick = function() { this.parentNode.parentNode.parentNode.remove() };
//     delete_a.href = "#";
//     delete_a.textContent = "Delete";

//     drop_down_menu_div.appendChild(edit_a);
//     drop_down_menu_div.appendChild(view_a);
//     drop_down_menu_div.appendChild(delete_a);

//     drop_down_div.appendChild(drop_down_input);
//     drop_down_div.appendChild(drop_down_menu_div);

//     microcontroller_layout_div.appendChild(drop_down_div);

//     // add all the elements into add_microcontrollers_layout
//     add_microcontrollers_layout.appendChild(microcontroller_layout_div);

//     // save added microcontrollers information
//     var network_microcontrollers = [];
//     var network_microcontroller = {};

//     if (localStorage.getItem("network_microcontrollers")) {
//       network_microcontrollers = JSON.parse(localStorage.getItem("network_microcontrollers"));
//     }

//     network_microcontroller.microcontroller_name_type = microcontroller_name_type_input.value;
//     network_microcontroller.microcontroller_mac_address = mac_address_input.value;
//     network_microcontroller.microcontroller_location = microcontroller_location_input.value;
//     network_microcontroller.num_of_sensors = num_of_sensors_input.value;
//     network_microcontroller.sensor_name_type = sensor_name_type_input.value;
//     network_microcontroller.sensor_location = sensor_location_input.value;
//     network_microcontroller.sampling_frequency = sampling_frequency_input.value;
//     network_microcontroller.num_of_pins = num_of_pins_input.value;
//     network_microcontroller.microcontroller_pin = microcontroller_pin_input.value;
//     network_microcontroller.sensor_pin = sensor_pin_input.value;

//     network_microcontrollers.push(network_microcontroller);
//     localStorage.setItem("network_microcontrollers", JSON.stringify(network_microcontrollers));
//   });
// });

$(function () {
  loadMicrocontrollerLayout();

//   function uuidv4() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//       return v.toString(16);
//     });
//   }

});

function loadMicrocontrollerLayout() {
  if (localStorage.getItem("network_microcontrollers")) {
    // get created add_microcontrollers_layout
    var add_microcontrollers_layout = document.getElementById("add_microcontrollers_layout");
    var network_microcontrollers = JSON.parse(localStorage.getItem("network_microcontrollers"));

    var network_sensors_input = document.getElementById("network_sensors");
    var network_sensors = JSON.parse(network_sensors_input.value);

    for (var i = 0; i < network_microcontrollers.length; i++) {
      // microcontroller layout div
      var microcontroller_layout_div = document.createElement("div");
      microcontroller_layout_div.className = "mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--6-col-desktop border-rc m2";
      microcontroller_layout_div.name = "microcontroller_layout";
      microcontroller_layout_div.id = "microcontroller_layout";

      /**************** microcontroller name and type ****************/

      // microcontroller name and type div
      var microcontroller_name_type_div = document.createElement("div");
      microcontroller_name_type_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

      // microcontroller name and type span
      var microcontroller_name_type_span = document.createElement("span");
      microcontroller_name_type_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
      microcontroller_name_type_span.textContent = "Microcontroller name and type";

      // microcontroller name and type input
      var microcontroller_name_type_input = document.createElement("input");
      microcontroller_name_type_input.className = "mdl-textfield__input";
      microcontroller_name_type_input.type = "text";
      microcontroller_name_type_input.pattern = "-?^[a-zA-Z0-9 _]*?";
      microcontroller_name_type_input.name = "microcontroller_name_type";
      microcontroller_name_type_input.id = "microcontroller_name_type";
      microcontroller_name_type_input.value = network_microcontrollers[i].microcontroller_name_type;
      microcontroller_name_type_input.readOnly = true;

      microcontroller_name_type_div.appendChild(microcontroller_name_type_span);
      microcontroller_name_type_div.appendChild(microcontroller_name_type_input);
      microcontroller_layout_div.appendChild(microcontroller_name_type_div);

      /**************** mac address ****************/

      // mac address div
      var mac_address_div = document.createElement("div");
      mac_address_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";
      
      // mac address span
      var mac_address_span = document.createElement("span");
      mac_address_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
      mac_address_span.textContent = "Mac address";

      // mac address input
      var mac_address_input = document.createElement("input");

      mac_address_input.className = "mdl-textfield__input";
      mac_address_input.type = "text";
      mac_address_input.pattern = "-?^[0-9]*?";
      mac_address_input.name = "mac_address";
      mac_address_input.id = "mac_address";
      mac_address_input.value = network_microcontrollers[i].microcontroller_mac_address;
      mac_address_input.readOnly = true;

      mac_address_div.appendChild(mac_address_span);
      mac_address_div.appendChild(mac_address_input);
      microcontroller_layout_div.appendChild(mac_address_div);

      /**************** microcontroller location ****************/

      // microcontroller location div
      var microcontroller_location_div = document.createElement("div");
      microcontroller_location_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

      // microcontroller location span
      var microcontroller_location_span = document.createElement("span");
      microcontroller_location_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
      microcontroller_location_span.textContent = "Microcontroller location";

      // microcontroller location input
      var microcontroller_location_input = document.createElement("input");

      microcontroller_location_input.className = "mdl-textfield__input";
      microcontroller_location_input.type = "text";
      microcontroller_location_input.pattern = "-?^[a-zA-Z0-9 _]*?";
      microcontroller_location_input.name = "microcontroller_location";
      microcontroller_location_input.id = "microcontroller_location";

      microcontroller_location_div.appendChild(microcontroller_location_span);
      microcontroller_location_div.appendChild(microcontroller_location_input);
      microcontroller_layout_div.appendChild(microcontroller_location_div);

      /**************** number of sensors ****************/

      // number of sensors div
      var num_of_sensors_div = document.createElement("div");
      num_of_sensors_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

      // number of sensors span
      var num_of_sensors_span = document.createElement("span");
      num_of_sensors_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
      num_of_sensors_span.textContent = "Number of sensors";

      // number of sensors input
      var num_of_sensors_input = document.createElement("input");

      num_of_sensors_input.className = "mdl-textfield__input";
      num_of_sensors_input.type = "text";
      num_of_sensors_input.pattern = "-?^[0-9]*?";
      num_of_sensors_input.name = "num_of_sensors";
      num_of_sensors_input.id = "num_of_sensors";
      num_of_sensors_input.value = network_microcontrollers[i].num_of_sensors;
      num_of_sensors_input.readOnly = "true";

      num_of_sensors_div.appendChild(num_of_sensors_span);
      num_of_sensors_div.appendChild(num_of_sensors_input);
      microcontroller_layout_div.appendChild(num_of_sensors_div);

      /**************** sensor name and type ****************/

      // sensor name and type div
      var sensor_name_type_div = document.createElement("div");
      sensor_name_type_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";

      // sensor name and type span
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
      sensor_name_type_input.value = network_microcontrollers[i].sensor_name_type;
      sensor_name_type_input.readOnly = "true";

      sensor_name_type_div.appendChild(sensor_name_type_span);
      sensor_name_type_div.appendChild(sensor_name_type_input);
      microcontroller_layout_div.appendChild(sensor_name_type_div);

      /**************** sensor location (hidden) ****************/

      // sensor location div
      var sensor_location_div = document.createElement("div");
      sensor_location_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
      sensor_location_div.style = "display: none";

      // sensor location span
      var sensor_location_span = document.createElement("span");
      sensor_location_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
      sensor_location_span.textContent = "Sensor location";

      // sensor location input
      var sensor_location_input = document.createElement("input");

      sensor_location_input.className = "mdl-textfield__input";
      sensor_location_input.pattern = "-?^[a-zA-Z0-9 _]*?";
      sensor_location_input.name = "sensor_location";
      sensor_location_input.id = "sensor_location";
      sensor_location_input.value = network_microcontrollers[i].sensor_location;
      sensor_location_input.readOnly = "true";

      sensor_location_div.appendChild(sensor_location_span);
      sensor_location_div.appendChild(sensor_location_input);
      microcontroller_layout_div.appendChild(sensor_location_div);

      /**************** sampling frequency (hidden) ****************/

      // sampling frequency div
      var sampling_frequency_div = document.createElement("div");
      sampling_frequency_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
      sampling_frequency_div.style = "display: none";

      // sampling frequency span
      var sampling_frequency_span = document.createElement("span");
      sampling_frequency_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
      sampling_frequency_span.textContent = "Sampling frequency";

      // sampling frequency input
      var sampling_frequency_input = document.createElement("input");

      sampling_frequency_input.className = "mdl-textfield__input";
      sampling_frequency_input.pattern = "-?^[a-zA-Z0-9 _]*?";
      sampling_frequency_input.name = "sampling_frequency";
      sampling_frequency_input.id = "sampling_frequency";
      sampling_frequency_input.value = network_microcontrollers[i].sampling_frequency;
      sampling_frequency_input.readOnly = "true";

      sampling_frequency_div.appendChild(sampling_frequency_span);
      sampling_frequency_div.appendChild(sampling_frequency_input);
      microcontroller_layout_div.appendChild(sampling_frequency_div);

      /**************** number of pins (hidden) ****************/

      // num of pins div
      var num_of_pins_div = document.createElement("div");
      num_of_pins_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
      num_of_pins_div.style = "display: none";

      // num of pins span
      var num_of_pins_span = document.createElement("span");
      num_of_pins_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
      num_of_pins_span.textContent = "Number of pins";

      // num of pins input
      var num_of_pins_input = document.createElement("input");

      num_of_pins_input.className = "mdl-textfield__input";
      num_of_pins_input.pattern = "-?^[0-9]*?";
      num_of_pins_input.name = "num_of_pins";
      num_of_pins_input.id = "num_of_pins";
      num_of_pins_input.value = network_microcontrollers[i].num_of_pins;
      num_of_pins_input.readOnly = "true";

      num_of_pins_div.appendChild(num_of_pins_span);
      num_of_pins_div.appendChild(num_of_pins_input);
      microcontroller_layout_div.appendChild(num_of_pins_div);

      /**************** microcontroller pin (hidden) ****************/

      // microcontroller pin div
      var microcontroller_pin_div = document.createElement("div");
      microcontroller_pin_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
      microcontroller_pin_div.style = "display: none";

      // microcontroller pin span
      var microcontroller_pin_span = document.createElement("span");
      microcontroller_pin_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
      microcontroller_pin_span.textContent = "Microcontroller pin";

      // microcontroller pin input
      var microcontroller_pin_input = document.createElement("input");

      microcontroller_pin_input.className = "mdl-textfield__input";
      microcontroller_pin_input.pattern = "-?^[a-zA-Z0-9 _]*?";
      microcontroller_pin_input.name = "microcontroller_pin";
      microcontroller_pin_input.id = "microcontroller_pin";
      microcontroller_pin_input.value = network_microcontrollers[i].microcontroller_pin;
      microcontroller_pin_input.readOnly = "true";

      microcontroller_pin_div.appendChild(microcontroller_pin_span);
      microcontroller_pin_div.appendChild(microcontroller_pin_input);
      microcontroller_layout_div.appendChild(microcontroller_pin_div);

      /**************** sensor pin (hidden) ****************/

      // sensor pin div
      var sensor_pin_div = document.createElement("div");
      sensor_pin_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
      sensor_pin_div.style = "display: none";

      // sensor pin span
      var sensor_pin_span = document.createElement("span");
      sensor_pin_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
      sensor_pin_span.textContent = "Microcontroller pin";

      // sensor pin input
      var sensor_pin_input = document.createElement("input");

      sensor_pin_input.className = "mdl-textfield__input";
      sensor_pin_input.pattern = "-?^[a-zA-Z0-9 _]*?";
      sensor_pin_input.name = "sensor_pin";
      sensor_pin_input.id = "sensor_pin";
      sensor_pin_input.value = network_microcontrollers[i].sensor_pin;
      sensor_pin_input.readOnly = "true";

      sensor_pin_div.appendChild(sensor_pin_span);
      sensor_pin_div.appendChild(sensor_pin_input);
      microcontroller_layout_div.appendChild(sensor_pin_div);

      var microcontroller_name_type = network_sensors.name + " " + "(" + network_sensors.model_type + ")";

      if (microcontroller_name_type == network_microcontrollers[i].microcontroller_name_type) {
        num_of_sensors_input.value = network_sensors.sensors.length;
        network_microcontrollers[i].num_of_sensors = network_sensors.sensors.length;

        var sensor_name_types = [];
        var sensor_locations = [];
        var sampling_frequencies = [];
        var num_of_pins = [];
        var microcontroller_pins = [];
        var sensor_pins = [];

        for (var j = 0; j < network_sensors.sensors.length; j++) {
          var sensor = network_sensors.sensors[j];
          sensor_name_types.push(sensor.name_type);
          sensor_locations.push(sensor.location);
          sampling_frequencies.push(sensor.sampling_frequency);
          num_of_pins.push(sensor.sensor_pins.length);
          microcontroller_pins.push.apply(microcontroller_pins, sensor.microcontroller_pins);
          sensor_pins.push.apply(sensor_pins, sensor.sensor_pins);
        }

        sensor_name_type_input.value = sensor_name_types.join();
        sensor_location_input.value = sensor_locations.join();
        sampling_frequency_input.value = sampling_frequencies.join();
        num_of_pins_input.value = num_of_pins.join();
        microcontroller_pin_input.value = microcontroller_pins.join();
        sensor_pin_input.value = sensor_pins.join();

        network_microcontrollers[i].sensor_name_type = sensor_name_type_input.value;
        network_microcontrollers[i].sensor_location = sensor_location_input.value;
        network_microcontrollers[i].sampling_frequency = sampling_frequency_input.value;
        network_microcontrollers[i].num_of_pins = num_of_pins_input.value;
        network_microcontrollers[i].microcontroller_pin = microcontroller_pin_input.value;
        network_microcontrollers[i].sensor_pin = sensor_pin_input.value;
      }

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

      // edit a
      var edit_a = document.createElement("a");
      edit_a.href = "/network/modify/edit?mac_address=" + network_microcontrollers[i].microcontroller_mac_address;
      edit_a.textContent = "Edit";

      // view a
      var view_a = document.createElement("a");
      view_a.href = "/network/modify/view?mac_address=" + network_microcontrollers[i].microcontroller_mac_address;
      view_a.textContent = "View";

      // delete a
      var delete_a = document.createElement("a");
      delete_a.onclick = function() { 
        // also delete microcontroller saved in local storage
        var toDeleteMac = this.parentNode.parentNode.parentNode.querySelector("#mac_address").value;
        var toDeleteIndex = 0;

        for (var k = 0; k < network_microcontrollers.length; k++) {
          if (network_microcontrollers[k].microcontroller_mac_address == toDeleteMac) {
            toDeleteIndex = k;
            break;
          }
        }

        network_microcontrollers.splice(toDeleteIndex, 1);
        localStorage.setItem("network_microcontrollers", JSON.stringify(network_microcontrollers));
        this.parentNode.parentNode.parentNode.remove();
      };
      delete_a.href = "#";
      delete_a.textContent = "Delete";

      drop_down_menu_div.appendChild(edit_a);
      drop_down_menu_div.appendChild(view_a);
      drop_down_menu_div.appendChild(delete_a);

      drop_down_div.appendChild(drop_down_input);
      drop_down_div.appendChild(drop_down_menu_div);

      microcontroller_layout_div.appendChild(drop_down_div);

      // add all the elements into add_microcontrollers_layout
      add_microcontrollers_layout.appendChild(microcontroller_layout_div);

      localStorage.setItem("network_microcontrollers", JSON.stringify(network_microcontrollers));
    }
  }
}

$("#btnAdd").on("click", (ev) => {
  if (localStorage.getItem("network_microcontrollers") === null) {
    // no duplicate, add selected microcontroller
    addNewMicrocontroller();
  } else {
    var network_microcontrollers = JSON.parse(localStorage.getItem("network_microcontrollers"));
    var isDuplicate = false;

    // get selected microcontroller
    var selected_microcontroller = document.getElementById("selected_microcontroller");
    var microcontroller_name_type = selected_microcontroller.options[selected_microcontroller.selectedIndex].value;

    for (var i = 0; i < network_microcontrollers.length; i++) {
      if (network_microcontrollers[i].microcontroller_name_type == microcontroller_name_type) {
        isDuplicate = true;
      }
    }

    if (isDuplicate) {
      // duplicate alert
      alert(microcontroller_name_type + " has been added!");
    } else {
      // no duplicate, add selected microcontroller
      addNewMicrocontroller();
    }
  }
});

function addNewMicrocontroller () {
  $.getJSON("../api/microcontroller", function(data) {
    // get created add_microcontrollers_layout
    var add_microcontrollers_layout = document.getElementById("add_microcontrollers_layout");
      
    // microcontroller layout div
    var microcontroller_layout_div = document.createElement("div");
    microcontroller_layout_div.className = "mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--6-col-desktop border-rc m2";
    microcontroller_layout_div.name = "microcontroller_layout";
    microcontroller_layout_div.id = "microcontroller_layout";

    /**************** microcontroller name and type ****************/

    // microcontroller name and type div
    var microcontroller_name_type_div = document.createElement("div");
    microcontroller_name_type_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

    // microcontroller name and type span
    var microcontroller_name_type_span = document.createElement("span");
    microcontroller_name_type_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    microcontroller_name_type_span.textContent = "Microcontroller name and type";

    // microcontroller
    var selected_microcontroller = document.getElementById("selected_microcontroller");
    var microcontroller_name_type = selected_microcontroller.options[selected_microcontroller.selectedIndex].value;

    // microcontroller name and type input
    var microcontroller_name_type_input = document.createElement("input");
    microcontroller_name_type_input.className = "mdl-textfield__input";
    microcontroller_name_type_input.type = "text";
    microcontroller_name_type_input.pattern = "-?^[a-zA-Z0-9 _]*?";
    microcontroller_name_type_input.name = "microcontroller_name_type";
    microcontroller_name_type_input.id = "microcontroller_name_type";
    microcontroller_name_type_input.value = microcontroller_name_type;
    microcontroller_name_type_input.readOnly = true;

    microcontroller_name_type_div.appendChild(microcontroller_name_type_span);
    microcontroller_name_type_div.appendChild(microcontroller_name_type_input);
    microcontroller_layout_div.appendChild(microcontroller_name_type_div);

    /**************** get json of added microcontroller ****************/

    var network_microcontroller = {};

    for (var i = 0; i < data.microcontrollers.length; i++) {
      var current_name_type = data.microcontrollers[i].name + " " + "(" + data.microcontrollers[i].model_type + ")";
      if (current_name_type === microcontroller_name_type) {
        network_microcontroller = data.microcontrollers[i];
        break;
      }
    }

    /**************** mac address ****************/

    // mac address div
    var mac_address_div = document.createElement("div");
    mac_address_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";
    
    // mac address span
    var mac_address_span = document.createElement("span");
    mac_address_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    mac_address_span.textContent = "Mac address";

    // mac address input
    var mac_address_input = document.createElement("input");
    var mac_address = network_microcontroller.mac;

    mac_address_input.className = "mdl-textfield__input";
    mac_address_input.type = "text";
    mac_address_input.pattern = "-?^[0-9]*?";
    mac_address_input.name = "mac_address";
    mac_address_input.id = "mac_address";
    mac_address_input.value = mac_address;
    mac_address_input.readOnly = true;

    mac_address_div.appendChild(mac_address_span);
    mac_address_div.appendChild(mac_address_input);
    microcontroller_layout_div.appendChild(mac_address_div);

    /**************** microcontroller location ****************/

    // microcontroller location div
    var microcontroller_location_div = document.createElement("div");
    microcontroller_location_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

    // microcontroller location span
    var microcontroller_location_span = document.createElement("span");
    microcontroller_location_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    microcontroller_location_span.textContent = "Microcontroller location";

    // microcontroller location input
    var microcontroller_location_input = document.createElement("input");

    microcontroller_location_input.className = "mdl-textfield__input";
    microcontroller_location_input.type = "text";
    microcontroller_location_input.pattern = "-?^[a-zA-Z0-9 _]*?";
    microcontroller_location_input.name = "microcontroller_location";
    microcontroller_location_input.id = "microcontroller_location";
    microcontroller_location_input.required = true;

    microcontroller_location_div.appendChild(microcontroller_location_span);
    microcontroller_location_div.appendChild(microcontroller_location_input);
    microcontroller_layout_div.appendChild(microcontroller_location_div);

    /**************** number of sensors ****************/

    // number of sensors div
    var num_of_sensors_div = document.createElement("div");
    num_of_sensors_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--6-col-desktop";

    // number of sensors span
    var num_of_sensors_span = document.createElement("span");
    num_of_sensors_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    num_of_sensors_span.textContent = "Number of sensors";

    // number of sensors input
    var num_of_sensors_input = document.createElement("input");

    num_of_sensors_input.className = "mdl-textfield__input";
    num_of_sensors_input.type = "text";
    num_of_sensors_input.pattern = "-?^[0-9]*?";
    num_of_sensors_input.name = "num_of_sensors";
    num_of_sensors_input.id = "num_of_sensors";
    num_of_sensors_input.value = "0";
    num_of_sensors_input.readOnly = "true";

    num_of_sensors_div.appendChild(num_of_sensors_span);
    num_of_sensors_div.appendChild(num_of_sensors_input);
    microcontroller_layout_div.appendChild(num_of_sensors_div);

    /**************** sensor name and type ****************/

    // sensors name and type div
    var sensor_name_type_div = document.createElement("div");
    sensor_name_type_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";

    // sensor name and type span
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
    sensor_name_type_input.value = "none";
    sensor_name_type_input.readOnly = "true";

    sensor_name_type_div.appendChild(sensor_name_type_span);
    sensor_name_type_div.appendChild(sensor_name_type_input);
    microcontroller_layout_div.appendChild(sensor_name_type_div);

    /**************** sensor location (hidden) ****************/

    // sensor location div
    var sensor_location_div = document.createElement("div");
    sensor_location_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
    sensor_location_div.style = "display: none";

    // sensor location span
    var sensor_location_span = document.createElement("span");
    sensor_location_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    sensor_location_span.textContent = "Sensor location";

    // sensor location input
    var sensor_location_input = document.createElement("input");

    sensor_location_input.className = "mdl-textfield__input";
    sensor_location_input.pattern = "-?^[a-zA-Z0-9 _]*?";
    sensor_location_input.name = "sensor_location";
    sensor_location_input.id = "sensor_location";
    sensor_location_input.value = "none";
    sensor_location_input.readOnly = "true";

    sensor_location_div.appendChild(sensor_location_span);
    sensor_location_div.appendChild(sensor_location_input);
    microcontroller_layout_div.appendChild(sensor_location_div);

    /**************** sampling frequency (hidden) ****************/

    // sampling frequency div
    var sampling_frequency_div = document.createElement("div");
    sampling_frequency_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
    sampling_frequency_div.style = "display: none";

    // sampling frequency span
    var sampling_frequency_span = document.createElement("span");
    sampling_frequency_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    sampling_frequency_span.textContent = "Sampling frequency";

    // sampling frequency input
    var sampling_frequency_input = document.createElement("input");

    sampling_frequency_input.className = "mdl-textfield__input";
    sampling_frequency_input.pattern = "-?^[a-zA-Z0-9 _]*?";
    sampling_frequency_input.name = "sampling_frequency";
    sampling_frequency_input.id = "sampling_frequency";
    sampling_frequency_input.value = "none";
    sampling_frequency_input.readOnly = "true";

    sampling_frequency_div.appendChild(sampling_frequency_span);
    sampling_frequency_div.appendChild(sampling_frequency_input);
    microcontroller_layout_div.appendChild(sampling_frequency_div);

    /**************** number of pins (hidden) ****************/

    // num of pins div
    var num_of_pins_div = document.createElement("div");
    num_of_pins_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
    num_of_pins_div.style = "display: none";

    // num of pins span
    var num_of_pins_span = document.createElement("span");
    num_of_pins_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    num_of_pins_span.textContent = "Number of pins";

    // num of pins input
    var num_of_pins_input = document.createElement("input");

    num_of_pins_input.className = "mdl-textfield__input";
    num_of_pins_input.pattern = "-?^[a-zA-Z0-9 _]*?";
    num_of_pins_input.name = "num_of_pins";
    num_of_pins_input.id = "num_of_pins";
    num_of_pins_input.value = "none";
    num_of_pins_input.readOnly = "true";

    num_of_pins_div.appendChild(num_of_pins_span);
    num_of_pins_div.appendChild(num_of_pins_input);
    microcontroller_layout_div.appendChild(num_of_pins_div);

    /**************** microcontroller pin (hidden) ****************/

    // microcontroller pin div
    var microcontroller_pin_div = document.createElement("div");
    microcontroller_pin_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
    microcontroller_pin_div.style = "display: none";

    // microcontroller pin span
    var microcontroller_pin_span = document.createElement("span");
    microcontroller_pin_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    microcontroller_pin_span.textContent = "Microcontroller pin";

    // microcontroller pin input
    var microcontroller_pin_input = document.createElement("input");

    microcontroller_pin_input.className = "mdl-textfield__input";
    microcontroller_pin_input.pattern = "-?^[a-zA-Z0-9 _]*?";
    microcontroller_pin_input.name = "microcontroller_pin";
    microcontroller_pin_input.id = "microcontroller_pin";
    microcontroller_pin_input.value = "none";
    microcontroller_pin_input.readOnly = "true";

    microcontroller_pin_div.appendChild(microcontroller_pin_span);
    microcontroller_pin_div.appendChild(microcontroller_pin_input);
    microcontroller_layout_div.appendChild(microcontroller_pin_div);

    /**************** sensor pin (hidden) ****************/

    // sensor pin div
    var sensor_pin_div = document.createElement("div");
    sensor_pin_div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label p4 mdl-cell--4-col mdl-cell--12-col-desktop";
    sensor_pin_div.style = "display: none";

    // sensor pin span
    var sensor_pin_span = document.createElement("span");
    sensor_pin_span.style = "top: 4px; font-size: 10px; color: var(--accent-green);";
    sensor_pin_span.textContent = "Microcontroller pin";

    // sensor pin input
    var sensor_pin_input = document.createElement("input");

    sensor_pin_input.className = "mdl-textfield__input";
    sensor_pin_input.pattern = "-?^[a-zA-Z0-9 _]*?";
    sensor_pin_input.name = "sensor_pin";
    sensor_pin_input.id = "sensor_pin";
    sensor_pin_input.value = "none";
    sensor_pin_input.readOnly = "true";

    sensor_pin_div.appendChild(sensor_pin_span);
    sensor_pin_div.appendChild(sensor_pin_input);
    microcontroller_layout_div.appendChild(sensor_pin_div);

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

    // edit a
    var edit_a = document.createElement("a");
    edit_a.href = "/network/add/edit?mac_address=" + mac_address;
    edit_a.textContent = "Edit";

    // view a
    var view_a = document.createElement("a");
    view_a.href = "/network/add/view?mac_address=" + mac_address;
    view_a.textContent = "View";

    // delete a
    var delete_a = document.createElement("a");
    delete_a.onclick = function() { 
      // also delete microcontroller saved in local storage
      var toDeleteMac = this.parentNode.parentNode.parentNode.querySelector("#mac_address").value;
      var toDeleteIndex = 0;

      for (var i = 0; i < network_microcontrollers.length; i++) {
        if (network_microcontrollers[i].microcontroller_mac_address == toDeleteMac) {
          toDeleteIndex = i;
          break;
        }
      }

      network_microcontrollers.splice(toDeleteIndex, 1);
      localStorage.setItem("network_microcontrollers", JSON.stringify(network_microcontrollers));
      this.parentNode.parentNode.parentNode.remove();
    };
    delete_a.href = "#";
    delete_a.textContent = "Delete";

    drop_down_menu_div.appendChild(edit_a);
    drop_down_menu_div.appendChild(view_a);
    drop_down_menu_div.appendChild(delete_a);

    drop_down_div.appendChild(drop_down_input);
    drop_down_div.appendChild(drop_down_menu_div);

    microcontroller_layout_div.appendChild(drop_down_div);

    // add all the elements into add_microcontrollers_layout
    add_microcontrollers_layout.appendChild(microcontroller_layout_div);

    // save added microcontrollers information
    var network_microcontrollers = [];
    var network_microcontroller = {};

    if (localStorage.getItem("network_microcontrollers")) {
      network_microcontrollers = JSON.parse(localStorage.getItem("network_microcontrollers"));
    }

    network_microcontroller.microcontroller_name_type = microcontroller_name_type_input.value;
    network_microcontroller.microcontroller_mac_address = mac_address_input.value;
    network_microcontroller.microcontroller_location = microcontroller_location_input.value;
    network_microcontroller.num_of_sensors = num_of_sensors_input.value;
    network_microcontroller.sensor_name_type = sensor_name_type_input.value;
    network_microcontroller.sensor_location = sensor_location_input.value;
    network_microcontroller.sampling_frequency = sampling_frequency_input.value;
    network_microcontroller.num_of_pins = num_of_pins_input.value;
    network_microcontroller.microcontroller_pin = microcontroller_pin_input.value;

    network_microcontrollers.push(network_microcontroller);
    localStorage.setItem("network_microcontrollers", JSON.stringify(network_microcontrollers));
  });
}
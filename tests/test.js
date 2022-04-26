const { Builder, By, Key, until, Actions, WebElement } = require('selenium-webdriver');
const constants = require('../routes/constants');
const monk = require('monk');
require('chromedriver');

/********** drawer button **********/

async function test_drawer_button() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3001/');
    await driver.findElement(By.className('mdl-layout__drawer-button')).sendKeys(Key.RETURN);
    
    await new Promise(res => setTimeout(res, 1000));
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
}

/********** sensor/acuator section **********/

async function test_redirect_to_sensor_actuator_section() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3001/');
    await driver.findElement(By.linkText('Sensors/Actuators')).sendKeys(Key.RETURN);
    
    await new Promise(res => setTimeout(res, 1000));
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
}

async function test_add_sensor_actuator() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3001/');
    await driver.findElement(By.linkText('Sensors/Actuators')).sendKeys(Key.RETURN);
    await driver.findElement(By.name('Add new sensor')).sendKeys(Key.RETURN);
    
    await driver.findElement(By.id('name')).sendKeys('test_sensor');
    await driver.findElement(By.id('model_type')).sendKeys('button');
    await driver.findElement(By.id('description')).sendKeys('This is test sensor.');

    await driver.findElement(By.id('num_of_pins')).sendKeys('1');
    await driver.findElement(By.name('pin_label')).sendKeys('DATA');

    await driver.findElement(By.id('num_of_fields')).sendKeys('1');
    await driver.findElement(By.name('field')).sendKeys('Pressed');
    await driver.findElement(By.name('data_type')).sendKeys('integer');

    await driver.findElement(By.name('submit')).sendKeys(Key.RETURN);
    await new Promise(res => setTimeout(res, 1000));
  } catch (error) {
    console.error(error);
  } finally {
    // connect to MongoDB
    var mongodb = monk(constants.mongodburl);
    var collection = mongodb.get('sensor_collection');

    // query MongoDB to see if the sensor is added with the right parameters
    collection.findOne({name: 'test_sensor'}, {}, function(error, document) {
      if (document.name == 'test_sensor' &&
          document.model_type == 'button' &&
          document.description == 'This is test sensor.' &&
          document.num_of_pins == '1' &&
          document.pin_label == 'DATA' &&
          document.num_of_fields == '1' &&
          document.field == 'Pressed' &&
          document.data_type == 'integer') {
        console.log('Successfully add test_sensor!');
      } else {
        console.log(error);
      }
    });

    await driver.quit();
  }
};

async function test_edit_sensor_actuator() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3001/');
    await driver.findElement(By.linkText('Sensors/Actuators')).sendKeys(Key.RETURN);

    let click_edit = `
                        var grids = document.getElementById('grids');
                        var names = grids.getElementsByTagName('h5');
                        var buttons = grids.getElementsByTagName('button');
                        var options = grids.getElementsByTagName('a');

                        for (var i = 0; i < names.length; i++) {
                            var name = names[i].innerHTML.trim();

                            if (name.indexOf('test_sensor') != -1) {
                                $(buttons[i]).trigger('hover');
                                options[i * 2].click();
                                break;
                            }
                        }
                    `;
    
    await driver.executeScript(click_edit);

    await driver.findElement(By.id('description')).clear();
    await driver.findElement(By.id('description')).sendKeys('This is changed test sensor.');

    await driver.findElement(By.name('submit')).sendKeys(Key.RETURN);
    await new Promise(res => setTimeout(res, 1000));
  } catch (error) {
    console.error(error);
  } finally {
    // connect to MongoDB
    var mongodb = monk(constants.mongodburl);
    var collection = mongodb.get('sensor_collection');

    // query MongoDB to see if the sensor is edited with the right parameters
    collection.findOne({name: 'test_sensor'}, {}, function(error, document) {
      if (document.description == 'This is changed test sensor.') {
        console.log('Successfully edit test_sensor!');
      } else {
        console.log(error);
      }
    });

    await driver.quit();
  }
};

async function test_delete_sensor_actuator() {
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    await driver.get('http://localhost:3001/');
    await driver.findElement(By.linkText('Sensors/Actuators')).sendKeys(Key.RETURN);

    let click_delete = `
                        var grids = document.getElementById('grids');
                        var names = grids.getElementsByTagName('h5');
                        var buttons = grids.getElementsByTagName('button');
                        var options = grids.getElementsByTagName('a');

                        for (var i = 0; i < names.length; i++) {
                            var name = names[i].innerHTML.trim();

                            if (name.indexOf('test_sensor') != -1) {
                                $(buttons[i]).trigger('hover');
                                options[i * 2 + 1].click();
                                break;
                            }
                        }
                    `;
    
    await driver.executeScript(click_delete);

    await driver.switchTo().alert().accept();
    await new Promise(res => setTimeout(res, 1000));
  } catch (error) {
    console.error(error);
  } finally {
    // connect to MongoDB
    var mongodb = monk(constants.mongodburl);
    var collection = mongodb.get('sensor_collection');

    // query MongoDB to see if the sensor is deleted
    collection.findOne({name: 'test_sensor'}, {}, function(error, document) {
      if (document == null) {
        console.log('Successfully delete test_sensor!');
      } else {
        console.log(error);
      }
    });

    await driver.quit();
  }
};

/********** microcontroller section **********/

async function test_redirect_to_microcontroller_section() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3001/');
    await driver.findElement(By.linkText('Microcontrollers')).sendKeys(Key.RETURN);
    
    await new Promise(res => setTimeout(res, 1000));
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
};

async function test_add_microcontroller() {
  let driver = await new Builder().forBrowser('chrome').build();
    
  try {
    await driver.get('http://localhost:3001/');
    await driver.findElement(By.linkText('Microcontrollers')).sendKeys(Key.RETURN);
    await driver.findElement(By.name('Add new microcontroller')).sendKeys(Key.RETURN);

    await driver.findElement(By.id('name')).sendKeys('test_microcontroller');
    await driver.findElement(By.id('mac')).sendKeys('11:22:33:44:55:66');
    await driver.findElement(By.id('description')).sendKeys('This is test microcontroller.');

    await driver.findElement(By.id('num_of_pins')).sendKeys('1');
    await driver.findElement(By.name('pin_label')).sendKeys('GPIO_00');
    await driver.findElement(By.name('pin_num')).sendKeys('1');

    await driver.findElement(By.name('submit')).sendKeys(Key.RETURN);
    await new Promise(res => setTimeout(res, 1000));
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
};

async function test_edit_microcontroller() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3001/');
    await driver.findElement(By.linkText('Microcontrollers')).sendKeys(Key.RETURN);

    let click_edit = `
                       var grids = document.getElementById('grids');
                       var names = grids.getElementsByTagName('h5');
                       var buttons = grids.getElementsByTagName('button');
                       var options = grids.getElementsByTagName('a');

                       for (var i = 0; i < names.length; i++) {
                           var name = names[i].innerHTML.trim();

                           if (name.indexOf('test_microcontroller') != -1) {
                               $(buttons[i]).trigger('hover');
                               options[i * 2].click();
                               break;
                           }
                       }
                     `;
    
    await driver.executeScript(click_edit);

    await driver.findElement(By.id('description')).clear();
    await driver.findElement(By.id('description')).sendKeys('This is changed test microcontroller.');

    await driver.findElement(By.name('submit')).sendKeys(Key.RETURN);
    await new Promise(res => setTimeout(res, 1000));
        
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
}

async function test_delete_microcontroller() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3001/');
    await driver.findElement(By.linkText('Microcontrollers')).sendKeys(Key.RETURN);

    let click_delete = `
                       var grids = document.getElementById('grids');
                       var names = grids.getElementsByTagName('h5');
                       var buttons = grids.getElementsByTagName('button');
                       var options = grids.getElementsByTagName('a');

                       for (var i = 0; i < names.length; i++) {
                           var name = names[i].innerHTML.trim();

                           if (name.indexOf('test_microcontroller') != -1) {
                               $(buttons[i]).trigger('hover');
                               options[i * 2 + 1].click();
                               break;
                           }
                       }
                     `;
    
    await driver.executeScript(click_delete);

    await driver.switchTo().alert().accept();
    await new Promise(res => setTimeout(res, 1000));
        
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
}

/********** network section **********/

async function test_redirect_to_network_section() {
  let driver = await new Builder().forBrowser('chrome').build();
      
  try {
    await driver.get('http://localhost:3001/');
    await driver.findElement(By.linkText("IoT Network")).sendKeys(Key.RETURN);
    
    await new Promise(res => setTimeout(res, 1000));
        
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
}

async function test_add_network() {
  let driver = await new Builder().forBrowser('chrome').build();
      
  try {
    await driver.get('http://localhost:3001/');
    await driver.findElement(By.linkText("IoT Network")).sendKeys(Key.RETURN);
    await driver.findElement(By.name('Add new network')).sendKeys(Key.RETURN);

    await driver.findElement(By.id('name')).sendKeys('test_network');
    await driver.findElement(By.id('description')).sendKeys('This is test network.');

    await driver.findElement(By.name('submit')).sendKeys(Key.RETURN);
    await new Promise(res => setTimeout(res, 1000));
        
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
};

/********** drawer button **********/
// test_drawer_button();

/********** sensor/acuator section **********/
// test_redirect_to_sensor_actuator_section();
// test_add_sensor_actuator();
// test_edit_sensor_actuator();
// test_delete_sensor_actuator();

/********** microcontroller section **********/
// test_redirect_to_microcontroller_section();
// test_add_microcontroller();
// test_edit_microcontroller();
// test_delete_microcontroller();

/********** network section **********/
// test_redirect_to_network_section();
// test_add_network();
// test_edit_network();
// test_view_network();
// test_delete_network();
// test_view_sensor_data();

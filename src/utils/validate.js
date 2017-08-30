export function testFullSpace(value) {
  return /^[ ]+$/.test(value);
}
export function testName(value) {
  const reg = /^\s*[\u4e00-\u9fa5.·]+\s*$/;
  return reg.test(value);
}

export function testPwd(value) {
  const regTest = /^\d+$/g;
  if (value.length < 8 || value.length > 16) {
    return false;
  }
  if (regTest.test(value)) {
    return false;
  }
  const reg = /^[a-zA-Z]\w{5,17}$/;
  return reg.test(value);
}

// function checkStrong(value) {
//   let strength = 0;
//   if (value.length < 8 || value.length > 16) {
//     if (value.match(/^\d+$/)) {
//       return false;
//     }
//     if (value.match(/[a-z]+/)) {
//       strength++;
//     }
//     if (value.match(/[A-Z]+/)) {
//       strength++;
//     }
//     if (value.match(/[-/:;\(\)$&@"\.,\?!'\[\]\{\}#%\^\*\+=_\\|~<>]+/)) {
//       strength++;
//     }
//   }
//   if (strength >= 1) {
//     return true;
//   }
//   return false;
// }


export function testPinin(value) {
  const reg = /^[A-Za-z ]+$/;
  return reg.test(value) && !testFullSpace(value);
}
export function testEnName(value) {
  const reg = /^[A-Za-z,.\-_ ]+$/;
  return reg.test(value) && !testFullSpace(value);
}
export function testAddress(value) {
  const reg = /^[\u4e00-\u9fa5A-Za-z0-9#\-·._%+@ ,，/()（）]+$/;
  return reg.test(value) && !testFullSpace(value);
}
export function testEmployInfo(value) {
  const reg = /^[\u4e00-\u9fa5A-Za-z0-9#\-·._%+@ ]+$/;
  return reg.test(value) && !testFullSpace(value);
}
export function testTaxCountry(value) {
  const reg = /^[\u4e00-\u9fa5A-Za-z0-9#\-·._%+@ ]+$/;
  return reg.test(value) && !testFullSpace(value);
}
export function testCountry(value) {
  return /^[\u4e00-\u9fa5A-Za-z\-._ ]+$/.test(value) && !testFullSpace(value);
}
export function testId(value, region) {
  let reg;
  if (region === 1) {
    reg = /^\s*\d{17}[0-9xX]\s*$/;
  } else if (region === 2) {
    // reg = /^[A-Z]{1}[0-9]{6}\({1}[0-9A]{1}\){1}$/;
    reg = /^\s*[A-Z0-9()]+\s*$/i;
  }
  return reg.test(value);
}
export function testGender(value) {
  const reg = /^[\u7537\u5973]{1}\u6027?$|\u672a{1}\u77e5{1}$/;
  return reg.test(value);
}
export function testValidChar(value) {
  const reg = /^[\u4e00-\u9fa5A-Za-z0-9#\-·._%+@ ]+$/;
  return reg.test(value);
}

export function testEmail(value) {
  const reg = /^\s*[A-Z0-9._%+-]{1,30}@[A-Z0-9.-]{1,50}\.[A-Z]{2,10}\s*$/i;
  return reg.test(value);
}

export function testPhone(value) {
  const reg = /(^[ ]*(\+86)?1\d{10}[ ]*$)|(^[ ]*(\+852)?\d{8}[ ]*$)|(^[ ]*(\+8536|6){1}\d{7}[ ]*$)/;
  return reg.test(value);
}
export function testFixedPhone(value) {
  const reg = /^\s*(\(\d{3,4}\)|\d{3,4}-|\d{3,4}\s)?\d{7,8}(\(\d{1,6}\)|-\d{1,6}|\s\d{1,6})?\s*$/;
  return reg.test(value);
}

export function testAgeLegality(birth) {
  let date = new Date();
  let isLegality = false;
  const maxValue = new Date(date.getFullYear() - 18, date.getMonth(), 1);
  const minValue = new Date(date.getFullYear() - 65, date.getMonth(), 1);
  if (birth) {
    date = new Date(birth).setDate(1);
    isLegality = date <= maxValue && date >= minValue;
  }
  return isLegality;
}

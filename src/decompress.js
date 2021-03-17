const getNumberOfBitsToRepresent = (x) => {
  if (x < 2) {
    return 1;
  }
  
  if (x < 4) {
    return 2;
  }
  
  if (x < 8) {
    return 3;
  }
  
  if (x < 16) {
    return 4;
  }
  
  if (x < 32) {
    return 5;
  }
  
  if (x < 64) {
    return 6;
  }
  
  if (x < 128) {
    return 7;
  }
  
  if (x < 256) {
    return 8;
  }
  
  if (x < 512) {
    return 9;
  }
  
  if (x < 1024) {
    return 10;
  }
}

export const decompress = (data) => {
  console.log('decompress data', data);
  
  const dict = []
  const fullOut = []
  dict.push('a', 'b', 'c', 'd', 'r');
  
  // initialize decoder dictionary
  // for (let i = 0; i <= 0xFF; i++) {
      // dict.push(String.fromCharCode(i));
      // console.log('dict.push', i, String.fromCharCode(i))
  // }
  
  let coder = dict.length;
  let current = "";
  let output = "";
  
  for (let i = 0; i < data.length;)
  {
    let bitsToRead = getNumberOfBitsToRepresent(coder);
    let curData = ""
    for (let j = i; j < i + bitsToRead; j++) {
      curData += data[j];
    }
    i += bitsToRead;

    const datai = parseInt(curData, 2);
    console.log('read code', curData, datai);

    current += dict[datai];
    output += current;

    dict.push(current);
    fullOut.push({ binary: curData, code: datai, output: current })

    
    bitsToRead = getNumberOfBitsToRepresent(coder);
    if (i < data.length - bitsToRead - 1) {

      curData = ""
      for (let j = i; j < i + bitsToRead; j++) {
        curData += data[j];
      }
      
      let code = parseInt(curData, 2);
      dict[coder] += dict[code][0];
    }
    
    coder++;
    current = "";
  }
  
  console.log('output', output)
  
  const dictionary = []
  for (let i = 0; i < coder; i++) {
    dictionary[i] = { key: i, value: dict[i] }
  }
  
  return [ output, fullOut, dictionary];
}

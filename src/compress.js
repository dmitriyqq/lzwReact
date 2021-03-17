export const compress = (origData) => {
  const dict = new Map();
  const set = new Set()

  for (let i = 0; i <= 0xFF; i++) {
      dict.set(String.fromCharCode(i), dict.size);
  }
  
  for(const char of origData) {
    set.add(char);
  }
  //
  for (const char of Array.from(set).sort()) {
    dict.set(char, dict.size);
  }
  
  let outData = [];
  
  for (let i = 0; i < origData.length;) {
    
    const char = origData[i]
    let current_seq = char;

    let ii = i+1;
    
    while(dict.has(current_seq) && ii < origData.length)
    {
      current_seq += origData[ii];
      ii++;
    }

    i = ii-1;
    if (!dict.has(current_seq)) {

      const new_symbol = current_seq;
      dict.set(new_symbol, dict.size);
      
      current_seq = current_seq.substring(0, current_seq.length - 1);
      
      if (!dict.has(current_seq)) {

          throw new Error(`key ${current_seq} is not found in seq: ${Array.from(dict)}`);
      }

      outData.push(dict.get(current_seq));
    } else {

      outData.push(dict.get(current_seq));
      break;
    }
  }
  
  const array = Array.from(dict);
  array.sort((a, b) => a.value - b.value);
  
  return [outData.join(','), ]
}

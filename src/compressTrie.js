const createTrie = (code) => ({ code, trie: {} });

const createChildTrie = (parent, child, code) => {
  parent.trie[child] = createTrie(code);
}

const traverseTrie = (key, trie, dict) => {
  if (key !== '') {
    dict.set(key, trie.code);
  }
  
  for (const childKey in trie.trie) {
    traverseTrie(key + childKey, trie.trie[childKey], dict);
  }
}

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

const createOutRecord = (currentCode, maxCode, nextChar, source) => {
  return {
    nextChar,
    source,
    output: currentCode,
    dictSize: getNumberOfBitsToRepresent(maxCode),
    binary: currentCode.toString('2').padStart(getNumberOfBitsToRepresent(maxCode), '0')
  }
}


export const compressTrie = (data) => {
  const rootTrie = createTrie(0);
  let code = 0;
  
  const set = new Set();
  for(const char of "abrcd") {
    set.add(char);
  }

  const out = [];
  //
  // for (let i = 0; i <= 0xFF; i++) {
  //   // out.push({ charCode: String.fromCharCode(i), dictSize: getNumberOfBitsToRepresent(code) })
  //   createChildTrie(rootTrie, String.fromCharCode(i), code++);
  // }
  //
  for (const char of Array.from(set).sort()) {
    // out.push({ output: '', dictSize: getNumberOfBitsToRepresent(code), binary: ''})
    createChildTrie(rootTrie, char, code++);
  }
  
  let source = ""
  let nextCharIdx = 0;
  let nextChar = data[nextCharIdx];
  let currentTrie = rootTrie;
  
  while(nextCharIdx < data.length) {
    if (currentTrie.trie[nextChar] !== undefined) {
      currentTrie = currentTrie.trie[nextChar];
      nextCharIdx++;
      source += nextChar;
      nextChar = data[nextCharIdx];
    } else {
      out.push(createOutRecord(currentTrie.code, code, nextChar, source));
      createChildTrie(currentTrie, nextChar, code)
      code++;
      currentTrie = rootTrie;
      source = ""
    }
  }
  
  if (currentTrie !== rootTrie) {
    out.push(createOutRecord(currentTrie.code, code, nextChar, source));
  }
  
  const dict = new Map();
  traverseTrie('', rootTrie, dict);
  
  let outString = ''
  for (const r of out) {
    outString += r.binary;
  }
  
  let outIArray = []
  for (const r of out) {
    if (r.output !== '') {
      outIArray.push(Number(r.output));
    }
  }
  
  console.log('trie-> ', JSON.stringify(rootTrie, undefined, 2));
  console.log( Array.from(dict));
  return [
    outString,
    out,
    Array.from(dict), // .filter(([ key, value ]) => value > 255),
    outIArray
  ];
}

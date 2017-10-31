var a = [
    "We're up all night 'til the sun",
    "We're up all night to get some",
    "We're up all night for good fun",
    "We're up all night to get lucky"
  ];
  
  // These two assignments are equivalent:
  
  // Old-school:
  var a2 = a.map(function(s){ return s.length });
  console.log(a2);
  // ECMAscript 6 using arrow functions
  var a3 = a.map( s => s.length );
  console.log(a3);
  // both a2 and a3 will be equal to [31, 30, 31, 31]
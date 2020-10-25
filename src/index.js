module.exports = function toReadable (n) {
    strNumPositive = function(n) {
      let suffixes = ['', 'thousand', 'million'];
      let str = '';
      let numStrParts = [];
  
      for (let order = 0; order < 3; order += 1) {
        let logOrder = Math.round(Math.pow(10, order * 3));
        let numRounded = Math.floor(n / logOrder);
        let triplet = numRounded % 1000;
        let trNum = strNumTriple(triplet, order == 0);
        if (trNum == '') 
          continue;
  
        let suffix = suffixes[order];
        if (suffix != '')
          numStrParts.unshift(suffix);
        numStrParts.unshift(trNum);
      }
      return numStrParts.join(' ');
    }
  
    strNumTriple = function(n, allowZero) {
      let numerics = ['', 'one', 'two', 'three', 'four',
                      'five', 'six', 'seven', 'eight', 'nine', 
                      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
                      'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
      if (n == 0) return allowZero ? 'zero' : '';
      if (n < 20) return numerics[n];
      let hundreds = Math.floor(n / 100);
      let decimals = Math.floor((n - hundreds * 100) / 10);
      let lastNum = n - hundreds * 100 - decimals * 10;
      if (decimals == 1) lastNum += 10;
  
      
      let hundStr = hundreds > 0 ? numerics[hundreds] + ' hundred' : '';
      let decStr = '';
      if (decimals > 1) {
        let decStrs = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 
               'eighty', 'ninety'];
        decStr = decStrs[decimals];	
      }
      let numStr = numerics[lastNum]
      let numberStrParts = [hundStr, decStr, numStr];
      numberStrParts = numberStrParts.filter(s => s != '')
      return numberStrParts.join(' ');
    }

		let sign = n < 0 ? 'minus ' : '';
		n = n < 0 ? -n : n;
		let strNum = strNumPositive(n);
		return sign + strNum;
}
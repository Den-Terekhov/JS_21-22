var base = prompt('Введите основание степени', '');
var exp = prompt('Введите показатель степени', '');

if ( isNaN(parseFloat(base)) || isNaN(parseFloat(exp)) ) { //исключаем нечисловые значения и пустые строки
  alert ('Введите только положительные, отрицательные числа или 0!');
} else if ( (Math.floor(base) != base) || (Math.floor(exp) != exp) ) { //исключаем дробные числа
  alert ('Введите только целые числа или 0!');
} else {
  involution(base, exp);
}

function involution(base, exp) {
  var result = 1;
  for (var i = 0; i < Math.abs(exp); i++) {
    result *= base;
  }
  if (exp < 0) {
    result = 1/result;
  }
  console.log(result);
}
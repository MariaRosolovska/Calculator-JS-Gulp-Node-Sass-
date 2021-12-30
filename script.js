(function() {
	// "use strict";
		// let test = document.querySelector('.warning');
		// console.log(test);

	var el = function(element) {
		if (element.charAt(0) === "#") {  // Перевіряємо селектор на присутність символа "#", що значить треба відібрати атрибут id=""
			return document.querySelector(element); // ... повертаємо один елемент
		} 
			return document.querySelectorAll(element); // В іншому випадку повертаємо масив елементів
	};


	var viewer = el("#viewer"), // Екран калькулятора, де відображається результат
	equals = el("#equals"), // Кнопка рівності
	nums = el(".num"),      // Список номерів
	ops = el(".ops"),       // Список операторів
	theNum = "",            // Поточний номер
	oldNum = "",            // Перший номер
	resultNum,              // Результат
	operator;               // Оператор ( + - * /)


	// Функція, яка відбере цифру коли клікаємо по номеру
	var setNum = function() {

		if (resultNum) { // Якщо відображався результат, скидуємо номер
			theNum = this.getAttribute("data-num");
			resultNum = "";
		} else { // В іншому випадку додайте цифру до попереднього числа (це рядок!)
			theNum += this.getAttribute("data-num"); // Конструкція "+=" додасть і присвоїть значення (скорочений запис theNum = theNum + this.getAttribute("data-num");)
		}

		// if (theNum.charAt(0) == '0' && theNum.charAt(1) == '0') {
		// 	theNum = 0;
		// }

		viewer.innerHTML = theNum; // Відображення поточнї цифри. innerHTML властивість повністю заміняє вміст html елемента

	};


 	// Функція, яка відбере стару цифру і збереже оператор
	var moveNum = function() {
		oldNum = theNum;
		theNum = "";
		operator = this.getAttribute("data-ops");
		
		equals.setAttribute("data-result", "");
	}

	// При кліку на дорівнює обрахувати результат
	var displayNum = function() {
		oldNum = parseFloat(oldNum); 
		theNum = parseFloat(theNum);
	
	  // Вибір операції
		switch (operator) {
			case "plus":
				resultNum = oldNum + theNum;
			break;

			case "minus":
				resultNum = oldNum - theNum;
			break;

			case "times":
				resultNum = oldNum * theNum;
			break;

			case "divided by":
				resultNum = oldNum / theNum;
			break;

			// Якщо натиснуто дорівнює без оператора, збереже номер і продовжить
			default:
				resultNum = theNum;
		}

		// Перевірка на повернення NaN або Infinity
		if (!isFinite(resultNum)) {
			if (isNaN(resultNum)) { // Якщо результат не є числом; Наприклад, подвійним клацанням операторів
				resultNum = "Ви його зламали!";
			} else { // Якщо результат нескінченний, йдемо шляхом ділення на нуль
				resultNum = "Подивіться, що ви зробили";
				el("#calculator").classList.add("broken"); // Зупинити калькулятор
				el("#reset").classList.add("show"); // І показати кнопку скидання
			}
		}
			// Відображати результат
			viewer.innerHTML = resultNum;
			equals.setAttribute("data-result", resultNum);

			// Зберегти результат
			oldNum = "";
			theNum = resultNum;
	}


	// Подія кліку до кнопки очищення
	el("#clear").onclick = function() {
		oldNum = "";
		theNum = "";
		viewer.innerHTML = "0";
		equals.setAttribute("data-result", resultNum);
	};


	// Слідкуємо за подією натискання кліка на цифру
	for (var i = 0, l = nums.length; i < l; i++) {
		nums[i].onclick =  setNum; // При кліку будемо запускати функцію setNum
	}

	// Слідкуємо за подією натискання кліка на оператор
	for (var i = 0, l = ops.length; i < l; i++) {
		ops[i].onclick = moveNum;
	}

	
	// Додаємо подію кліку до знака дорівнює
	equals.onclick = displayNum;

	// Подія кліку до кнопки скидання
	el("#reset").onclick = function() {
		window.location = window.location;
	};


}()); // Чекаємо завантаження html сторінки і потім викликаємо наш код
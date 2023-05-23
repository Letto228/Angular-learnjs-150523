/**
 * @type {import('prettier').Config} // Импорт подсказок 
 */
module.exports = {
	trailingComma: 'all', // Запятые в конце объекта
	useTabs: true, // табы вместо пробелов
	tabWidth: 4, // длина таба в пробелах
	semi: true, // ; в конце каждой строки
	singleQuote: true, // замена " на '
	printWidth: 120, // максимальная длинна одной строки, больше - будет перенос
};

// Полный список - https://prettier.io/docs/en/options.html

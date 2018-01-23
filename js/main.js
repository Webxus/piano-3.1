'use strict';
/*
Задача 1. Пианино
В рамках домашнего задания к лекции «Объект события»
Описание
Реализовать виртуальное пианино из 5 клавиш. Каждая из клавиш при клике проигрывает свой звук:
Пианино
Пианино имеет 3 набора звуков: lower, middle и `higher.
Набор по умолчанию — middle.
При зажатой кнопке shift пианино работает в режиме lower.
При зажатой кнопке alt пианино работает в режиме `higher.
После того как кнопка alt или shift отпущена, пианино возвращается в режим middle.
Интерфейс
Для изменения режима, в котором находится пианино, следует менять класс на теге <ul class="set <mark>middle</mark>">.
В режиме lower класс .middle меняется на .lower. Для higher — аналогично.
Для изменения звука кнопок следует менять src у тегов audio внутри соответствующих кнопок.
*/

let mode = document.getElementsByTagName('ul')[0];
const audio = document.getElementsByTagName('audio');
const keys = document.getElementsByTagName('li');

const middleSound = ['sounds/middle/first.mp3', 'sounds/middle/second.mp3', 'sounds/middle/third.mp3', 'sounds/middle/fourth.mp3', 'sounds/middle/fifth.mp3'];

const lowerSound = ['sounds/lower/first.mp3', 'sounds/lower/second.mp3', 'sounds/lower/third.mp3', 'sounds/lower/fourth.mp3', 'sounds/lower/fifth.mp3'];

const higherSound = ['sounds/higher/first.mp3', 'sounds/higher/second.mp3', 'sounds/higher/third.mp3', 'sounds/higher/fourth.mp3', 'sounds/higher/fifth.mp3'];

let library = {
	middle: middleSound,
	lower: lowerSound,
	higher: higherSound
}


function searchNote(list) {
	for (let i = 0; i < audio.length; i++) {
		audio[i].src = library[list][i];
	}
}
function searchMode () {
	if (mode.classList.contains('middle')) {
		searchNote('middle');
	} else if (mode.classList.contains('lower')) {
		searchNote('lower');
	} else if (mode.classList.contains('higher')) {
		searchNote('higher');
	}
}
function play() {
	this.getElementsByTagName('audio')[0].play();
}
for (let i = 0; i < keys.length; i++) {
	keys[i].addEventListener('click', play);
}
searchMode();

function keyDown(event) {
	if (!event.repeat) {
		if (event.shiftKey) {
			mode.classList.remove('middle');
			mode.classList.add('lower');
			searchMode();
			document.addEventListener('keyup', shiftUp);
		} else if(event.altKey) {
			mode.classList.remove('middle');
			mode.classList.add('higher');
			searchMode();
			document.addEventListener('keyup', altUp);
		}
	}
}
function altUp(event) {
	if (!event.repeat) {
		if (!event.altKey) {
			mode.classList.remove('higher');
			mode.classList.add('middle');
			searchMode();
			document.removeEventListener('keyup', altUp);
		}
	}
}
function shiftUp(event) {
	if (!event.repeat) {
		if (!event.shiftKey) {
			mode.classList.remove('lower');
			mode.classList.add('middle');
			searchMode();
			document.removeEventListener('keyup', shiftUp);
		}
	}
}
document.addEventListener('keydown', keyDown);



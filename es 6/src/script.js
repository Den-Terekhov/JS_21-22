$(function() {
  "use strict";

  let testWithReplies = {
    "Javascript ...": {
      "это язык с динамической типизацией": true,
      "это язык со статической типизацией": false,
      "это язык с явной типизацией": false,
      "это язык с неявной типизацией": true
    },

    "Как скрипты Javascript можно встраивать в веб-страницу?": {
      "В теге &lt;head&gt; внутри тега &lt;script&gt;": true,
      "В разметке страницы внутри html-тегов": true,
      "В теге &lt;body&gt; внутри тега &lt;script&gt;": true,
      "Все варианты неверны": false
    },

    "Какое из утверждений верно?": {
      "Язык JavaScript произошел от Java": false,
      "Язык Java произошел от JavaScript": false,
      "Оба варианта неверны": true
    }
  };

  localStorage.setItem('testString', JSON.stringify(testWithReplies));
  let test = JSON.parse(localStorage.getItem('testString'));

  let rightAnswers = new Array; //создание массива ответов из объекта с вопросами

  let questions = Object.keys(test);

  for(let i = 0; i < questions.length; i++) {
    let answersObj = test[questions[i]];
    let answers = Object.keys(answersObj);

    let rightAnswersByNumber = new Array; //создание массива ответов для конкретного вопроса
      for(let j = 0; j < answers.length; j++) {
        let answerValue = answersObj[answers[j]];
        rightAnswersByNumber[j] = answerValue;
      }
    rightAnswers[i] = rightAnswersByNumber;
  };

  let html = $('#myTemplate').html();
  let content = tmpl(html, {
    data: test
  });
  $('body').append(content);

  $('.button').on('click', function(event) {
    event.preventDefault();
    let totalErrors = 0; //общее количество ошибок
    let questionError = 0; //количество вопросов, в которых сделаны ошибки
    let errorByIteration = 0; //вспомогательная переменная

    for(let i = 0; i < questions.length; i++) {
      
      for(let j = 0; j < $('.question').eq(i).children('.answer_list').children('li').length; j++) {
        let userAnswersByNumber = $('.question').eq(i).children('.answer_list').children('li').eq(j).children('label').children('input').prop('checked');

        if(userAnswersByNumber !== (rightAnswers[i])[j]) { //сравнение ответов пользователя с правильными ответами 
          totalErrors++;
        };

      };
      if(errorByIteration !== totalErrors) {
        questionError++;
        errorByIteration = totalErrors;
      };
    };
    showModal(totalErrors, questionError);
  });

  let overlay;
  let modal;

  function showModal(totalErrors, questionError) {
    overlay = $('<div class="overlay">');
    $('body').append(overlay);
    overlay.one('click', hideModal);

    if(totalErrors == 0) {
      modal = $('<div class="modal_window">Поздравляем! Вы успешно прошли тест!</div>')
    } else {  
      modal = $('<div class="modal_window">Вы сделали ' + totalErrors + ' ошибок в ' + questionError + ' вопросах!</div>')
    }
    $('body').append(modal);
  };

  function hideModal() {
    modal.remove();
    overlay.remove();
    $('input').prop('checked', false);
  };
});
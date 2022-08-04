/* 전역변수를 피하기 위해  즉시 실행 함수 않에 넣는것 ()()*/
/* 전역변수: 전역공간에 정의되는 것. 누구나 접근가능 -> 충돌가능 */
// ex)
/* 
  (function() {
    const a = 100;

    function foo() {
      console.log(a);
    }

    foo();

  })();
*/

(function() {
  const stageElem = document.querySelector('.stage');
  const houseElem = document.querySelector('.house');
  const barElem = document.querySelector('.progress-bar');
  const selectCharacterElem = document.querySelector('.select-character');
  const mousePos = { x: 0, y: 0};

  /* 현재 문서 높이 - 윈도우 높이 */
  let maxScrollValue;
  
  /* 창 크기 변경 시 스크롤 길이 다시 측정 */
  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight
  }

  window.addEventListener('scroll', function() {
    // console.log(pageYOffset); // scroll값 확인
    // console.log(maxScrollValue);
    // console.log(pageYOffset / maxScrollValue); // 스크롤 내린 비율
    const scrollPer = pageYOffset / maxScrollValue
    const zMove = scrollPer * 980 - 490;
    houseElem.style.transform = 'translateZ('+ zMove + 'vw)';

   /* progress bar */
    barElem.style.width = scrollPer * 100 + '%';
  });

   /* mouse move */
  window.addEventListener('mousemove', function(e) {
    console.log(e.clientX, e.clientY); // 마우스 위치

    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageElem.style.transform = 'rotateX(' + (mousePos.y) * 5 + 'deg) rotateY(' + (mousePos.x)*5 + 'deg)';

  });
    

  window.addEventListener('resize', resizeHandler);

  stageElem.addEventListener('click', function(e) {
    new Character({
        xPos: e.clientX / window.innerWidth * 100,
        speed: Math.random() * 0.5 + 0.2 // 아무리 느려도 최소 0.2
    });
  });

  selectCharacterElem.addEventListener('click', function(e) {
    const value = e.target.getAttribute('data-char');
    
    console.log(e.target.getAttribute('data-char'));
    document.body.setAttribute('data-char', value);
  })

  resizeHandler();

})();
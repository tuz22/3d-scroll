function Character(info) {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = ''
    + '<div class="character-face-con character-head">'
        + '<div class="character-face character-head-face face-front"></div>'
        + '<div class="character-face character-head-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-torso">'
        + '<div class="character-face character-torso-face face-front"></div>'
        + '<div class="character-face character-torso-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-arm character-arm-right">'
        + '<div class="character-face character-arm-face face-front"></div>'
        + '<div class="character-face character-arm-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-arm character-arm-left">'
        + '<div class="character-face character-arm-face face-front"></div>'
        + '<div class="character-face character-arm-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-leg character-leg-right">'
        + '<div class="character-face character-leg-face face-front"></div>'
        + '<div class="character-face character-leg-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-leg character-leg-left">'
        + '<div class="character-face character-leg-face face-front"></div>'
        + '<div class="character-face character-leg-face face-back"></div>'
    + '</div>';

    document.querySelector('.stage').appendChild(this.mainElem);
    console.log(info);
    this.mainElem.style.left = info.xPos + '%';
    this.scrollState = false; /* 스크롤 되고있는지 아닌지 확인 */
    this.lastScrollTop = 0; // 직전 스크롤 위치
    this.xPos = info.xPos; // xPos를 객체의 속성으로 줌
    this.speed = info.speed;
    this.direction; // 좌우 방향 체크
    this.runningState = false; // 좌우로 이동중인지 체크
    this.rafId; // requestAnimationFrame이 리턴하는 값을 저장

    this.init();
}

/* 프로토타입 객체에 메서드를 추가하는 방식 */
// Character.prototype.xxxxx = function() {
    
// };

/* 프로토타입 객체를 재정의하는 방식 */
// Character.prototype = {
//     constructor: Character,
//     xxxxx: function() {

//     }
// }

/* 3D 스크롤 20 강의 */
Character.prototype = {
    constructor: Character,
    init: function() {
        console.log(this);
        const self = this; // this = character

        window.addEventListener('scroll', function() { // function(): 이벤트 리스너 = 이벤트 헨들러
            clearTimeout(self.scrollState);
            
            if (!self.scrollState) {
                self.mainElem.classList.add('running');
                console.log('클래스 붙었음');
            }

            // console.log(this);
            // window 전역객체가 this로 잡힘
            // this.mainElem.classList.add('running');
            // 얻어야할 this는 캐릭터 생성자로 생성해낸 인스턴스 객체 -> 방법: 이 this(캐릭터 객체)를 다른 변수에 넣어두기

            // setTimeout: 일정 시간 후 함수 실행.
            self.scrollState = setTimeout(function() { // 값을 scrollState에 넣음 -> scrollState = true -> if문 실행안됨
                self.scrollState = false; // 스크롤이 멈추면
                self.mainElem.classList.remove('running'); // running클래스 삭제
            }, 300);
            console.log(self.scrollState);

            /* 이전 스크롤 위치와 현재 스크롤 위치를 비교 */
            
            if (self.lastScrollTop > pageYOffset) {
                // 스크롤 올림
                self.mainElem.setAttribute('data-direction', 'backward');
            } else {
                // 스크롤 내림
                self.mainElem.setAttribute('data-direction', 'forward');
            }
            
            console.log('lastScrollTop: ' + self.lastScrollTop);
            console.log('pageYOffset' + pageYOffset);
            self.lastScrollTop = pageYOffset;
        });
        
        window.addEventListener('keydown', function(e) {
            if (self.runningState) return;
            // keyCode: 키보드 키의 고유번호
            console.log(e.keyCode);
            if (e.keyCode == 37) {
                // 왼쪽
                self.direction = 'left';
                self.mainElem.setAttribute('data-direction', 'left');
                self.mainElem.classList.add('running');
                self.run(self);
                // self.run();
                self.runningState = true;
            } else if (e.keyCode == 39) {
                // 오른쪽
                self.direction = 'right';
                self.mainElem.setAttribute('data-direction', 'right');
                self.mainElem.classList.add('running');
                self.run(self);
                // self.run();
                self.runningState = true;
            }
        });

        window.addEventListener('keyup', function(e) {
            self.mainElem.classList.remove('running');
            cancelAnimationFrame(self.rafId);
            console.log(self.runningState);
            self.runningState = false; // runningState 초기화
        });
    },
    
    // this에 self말고 window객체가 잡힐때 방법1
    run: function(self) {
        if (self.direction == 'left') {
            self.xPos -= self.speed;
        } else if(self.direction == 'right') {
            self.xPos += self.speed;
        }

        if (self.xPos < 2) {
            self.xPos = 2;
        }

        if (self.xPos > 88) {
            self.xPos = 88;
        }
        // console.log(self);
        self.mainElem.style.left = self.xPos + '%';

        self.rafId = requestAnimationFrame(function() {
            self.run(self);
        });
    }

    // 방법2
    // run: function() {
    //     const self = this;

    //     if (self.direction == 'left') {
    //         self.xPos -= self.speed;
    //     } else if(self.direction == 'right') {
    //         self.xPos += self.speed;
    //     }
    //     // console.log(self);

    //     if (self.xPos < 2) {
    //         self.xPos = 2;
    //     }

    //     if (self.xPos > 88) {
    //         self.xPos = 88;
    //     }

    //     self.mainElem.style.left = self.xPos + '%';

    //     self.rafId = requestAnimationFrame(self.run.bind(self));
    // }
};
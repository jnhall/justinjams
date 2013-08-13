var app = angular.module('myApp', ['infinite-scroll']);

angular.module('myApp')
  .controller('MyCtrl', function ($scope, $timeout) {
    $ = window.$;

    var offsets = {
      about: $('#About').position().top,
      skills: $('#Skills').position().top,
      contact: $('#Contact').position().top
    },
     offset;
    $tail = $('#tail');
    $reel = $('#reel');
    $tail.css('height', $(window).height()/2);

    $.each(offsets, function(index) {
      offsets[index] -= 336;
    });

    $scope.viewing = {
      Top: 'active'
    };

    $('.navbar a').click(function(e) {
      e.preventDefault();
    });

    $scope.scrollTo = function(anchor) {
       $.smoothScroll({
        scrollTarget: '#'+anchor
      });
    };
    window.onscroll = function() {
      offset = $(window).scrollTop();
      if( offset > offsets.contact ) {
        $scope.viewing = {Contact: 'active'};
      } else if( offset > offsets.skills ) {
        $scope.viewing = {Skills: 'active'};
      } else if( offset > offsets.about ) {
        $scope.viewing = {About: 'active'};
      } else {
        $scope.viewing = {Top: 'active'};
      }
      $scope.$apply();
    };

    $scope.liveFree = function() {
      //el = document.createElement('div');
      //el.className = 'partyBlock';
      //el.style.height = '30px';
      //$reel.append(el);
    };

    var gameLoop = function() {
      //console.log(pos);
      pos.x += keys.x*v.x;
      $jetty.css('margin-left', pos.x+'px');
      pos.y = $(window).scrollTop();
      $(window).scrollTop(pos.y+keys.y);

      if(keys.firing || gun.cooling) {
        gun.shoot();
      }
      for(i=0;i<shots.length;i++) {
        shots[i].update();
      }
      if(!$('.x').length) {
        $('#congrats').html('You destroyed my homepage!<br />Thanks... I guess...');
      }
      $timeout(gameLoop, 5);
    };

    var keys = {x: 0, y: 0},
      pos = {x: -14, y: 0},
      v = {x: 1, y:0.1 },
      $jetty = $('#jetty i'),
      shots = [],
      Gun = function() {
        this.cooldown = 30, this.cooling = 0;
      },
      Shot = function(top, left) {
        var el = document.createElement('i');
        el.className = 'icon-rocket bullet';
        el.style.top = top+'px';
        el.style.left = (left+pos.x)+'px';
        this.pos = {y: top, x: left};
        this.el = el;
        this.hits = null;
        $('#reel').append(el);
      },
      i;

      Shot.prototype.update = function() {
        this.el.style.top = (this.pos.y-=2)+'px';
        this.hits = findIntersectors(this.el, '.x');
        if(this.hits.length) {
          this.el.remove();
          shots.splice(shots.indexOf(this), 1);
          this.hits[0].fadeTo(100, 0);
          this.hits[0].removeClass('x');
        }
      };

      Gun.prototype.shoot = function() {
        if(this.cooling) {
          this.cooling -= 1;
        } else {
          shots.push(
            new Shot($jetty.position().top, $jetty.position().left)
          );
          this.cooling = this.cooldown;
        }
      };

        gun = new Gun();
    $scope.playGame = function() {
      $.smoothScroll({
        scrollTarget: '#Game',
        afterScroll: function() {
          $('#gamePrompt').html('[<b>W</b>][<b>A</b>][<b>S</b>][<b>D</b>] moves, [<b>Space</b>] shoots');
           $('#gamePrompt').css('padding-top', '27px');
          $('#jetty i').css({
            textShadow: 'rgba(255, 0, 0, 0.8) 0px 0px 3px',
            position: 'fixed',
            left: '50%',
            top: $jetty.position().top-$(window).scrollTop()
          });
          $(window).keydown(function(e) {
            e.preventDefault();
            switch(e.which) {
              case 68:
                keys.x = 1;
                break;
              case 65:
                keys.x = -1;
                break;
              case 87:
                keys.y = -1;
                break;
              case 83:
                keys.y = 1;
                break;
              case 32:
                keys.firing = 1;
                break;
            }
          });
          $(window).keyup(function(e) {
            e.preventDefault();
            switch(e.which) {
              case 68:
                keys.x = Math.min(keys.x, 0);
                break;
              case 65:
                keys.x = Math.max(keys.x, 0);
                break;
              case 87:
                keys.y = Math.max(keys.y, 0);
                break;
              case 83:
                keys.y = Math.min(keys.y, 0);;
                break;
              case 32:
                keys.firing = 0;
                break;
            }
            //console.log(keys);
          });
          gameLoop();
        }
      });
      $scope.playGame = null;
    };
    function findIntersectors(targetSelector, intersectorsSelector) {
        var intersectors = [];

        var $target = $(targetSelector);
        var tAxis = $target.offset();
        var t_x = [tAxis.left, tAxis.left + $target.outerWidth()];
        var t_y = [tAxis.top, tAxis.top + $target.outerHeight()];

        $(intersectorsSelector).each(function() {
              var $this = $(this);
              var thisPos = $this.offset();
              var i_x = [thisPos.left, thisPos.left + $this.outerWidth()]
              var i_y = [thisPos.top, thisPos.top + $this.outerHeight()];

              if ( t_x[0] < i_x[1] && t_x[1] > i_x[0] &&
                   t_y[0] < i_y[1] && t_y[1] > i_y[0]) {
                  intersectors.push($this);
              }

        });
        return intersectors;
    }
  });
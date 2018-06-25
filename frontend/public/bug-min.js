var BugDispatch = {
    options: {
      minDelay: 2,
      maxDelay: 1e4,
      minBugs: 5,
      maxBugs: 20,
      minSpeed: 5,
      maxSpeed: 10,
      maxLargeTurnDeg: 150,
      maxSmallTurnDeg: 10,
      maxWiggleDeg: 5,
      bugWidth: 5,
      bugHeight: 6,
      zoom: 5
    },
    initialize: function(a) {
      this.options = mergeOptions(this.options, a);
      this.options.minBugs > this.options.maxBugs &&
        (this.options.minBugs = this.options.maxBugs);
      this.transform = null;
      this.transforms = {
        Moz: function(a) {
          this.bug.style.MozTransform = a;
        },
        webkit: function(a) {
          this.bug.style.webkitTransform = a;
        },
        O: function(a) {
          this.bug.style.OTransform = a;
        },
        ms: function(a) {
          this.bug.style.msTransform = a;
        },
        Khtml: function(a) {
          this.bug.style.KhtmlTransform = a;
        },
        w3c: function(a) {
          this.bug.style.transform = a;
        }
      };
      if ("transform" in document.documentElement.style)
        this.transform = this.transforms.w3c;
      else
        for (
          var b = ["Moz", "webkit", "O", "ms", "Khtml"], c = 0, c = 0;
          c < b.length;
          c++
        )
          if (b[c] + "Transform" in document.documentElement.style) {
            this.transform = this.transforms[b[c]];
            break;
          }
      if (this.transform) {
        this.bugs = [];
        for (
          var b =
              "multiply" === this.options.mouseOver
                ? this.options.minBugs
                : this.random(this.options.minBugs, this.options.maxBugs, !0),
            c = 0,
            d = this,
            c = 0;
          c < b;
          c++
        ) {
          a = this.options;
          var e = SpawnBug();
          a.wingsOpen = this.options.canFly
            ? 0.5 < Math.random()
              ? !0
              : !1
            : !0;
          a.walkSpeed = this.random(
            this.options.minSpeed,
            this.options.maxSpeed
          );
          e.initialize(this.transform, a);
          this.bugs.push(e);
        }
        this.spawnDelay = [];
        for (c = 0; c < b; c++)
          (a = this.random(this.options.minDelay, this.options.maxDelay, !0)),
            (e = this.bugs[c]),
            (this.spawnDelay[c] = setTimeout(
              (function(a) {
                return function() {
                  d.options.canFly ? a.flyIn() : a.walkIn();
                };
              })(e),
              a
            )),
            d.add_events_to_bug(e);
        this.options.monitorMouseMovement &&
          (window.onmousemove = function() {
            d.check_if_mouse_close_to_bug();
          });
      }
    },
    stop: function() {
      for (var a = 0; a < this.bugs.length; a++)
        this.spawnDelay[a] && clearTimeout(this.spawnDelay[a]),
          this.bugs[a].stop();
    },
    end: function() {
      for (var a = 0; a < this.bugs.length; a++)
        this.spawnDelay[a] && clearTimeout(this.spawnDelay[a]),
          this.bugs[a].stop(),
          this.bugs[a].remove();
    },
    reset: function() {
      this.stop();
      for (var a = 0; a < this.bugs.length; a++)
        this.bugs[a].reset(), this.bugs[a].walkIn();
    },
    add_events_to_bug: function(a) {
      var b = this;
      a.bug,
        function(c) {
          b.on_bug(a);
        };
    },
    random: function(a, b, c) {
      if (a == b) return c ? Math.round(a) : a;
      var d = a - 0.5 + Math.random() * (b - a + 1);
      d > b ? (d = b) : d < a && (d = a);
      return c ? Math.round(d) : d;
    }
  },
  BugController = function() {
    this.initialize.apply(this, arguments);
  };
BugController.prototype = BugDispatch;
var SpiderController = function() {
  this.options = mergeOptions(this.options, {
    imageSprite: "spider-sprite.png",
    bugWidth: 69,
    bugHeight: 90,
    num_frames: 7,
    zoom: 5,
    minDelay: 200,
    maxDelay: 3e3,
    minSpeed: 6,
    maxSpeed: 8,
    minBugs: 2,
    maxBugs: 2
  });
  this.initialize.apply(this, arguments);
};
SpiderController.prototype = BugDispatch;

var CaockroachController = function() {
  this.options = mergeOptions(this.options, {
    imageSprite: "roach.png",
    bugWidth: 80,
    bugHeight: 180,
    num_frames: 4,
    zoom: 8,
    minDelay: 200,
    maxDelay: 3e3,
    minSpeed: 8,
    maxSpeed: 10,
    minBugs: 3,
    maxBugs: 3
  });
  this.initialize.apply(this, arguments);
};
CaockroachController.prototype = BugDispatch;

var rat = function() {
  this.options = mergeOptions(this.options, {
    imageSprite: "rat1.png",
    bugWidth: 800,
    bugHeight: 500,
    num_frames: 1,
    zoom: 9,
    minDelay: 0,
    maxDelay: 0,
    minSpeed: 200,
    maxSpeed: 200,
    minBugs: 1,
    maxBugs: 1
  });
  this.initialize.apply(this, arguments);
};
rat.prototype = BugDispatch;

var Bug = {
    options: { walkSpeed: 5, edge_resistance: 50, zoom: 10 },
    initialize: function(a, b) {
      this.options = mergeOptions(this.options, b);
      this.NEAR_TOP_EDGE = 1;
      this.NEAR_BOTTOM_EDGE = 2;
      this.NEAR_LEFT_EDGE = 4;
      this.NEAR_RIGHT_EDGE = 8;
      this.directions = {};
      this.directions[this.NEAR_TOP_EDGE] = 270;
      this.directions[this.NEAR_BOTTOM_EDGE] = 90;
      this.directions[this.NEAR_LEFT_EDGE] = 0;
      this.directions[this.NEAR_RIGHT_EDGE] = 180;
      this.directions[this.NEAR_TOP_EDGE + this.NEAR_LEFT_EDGE] = 315;
      this.directions[this.NEAR_TOP_EDGE + this.NEAR_RIGHT_EDGE] = 225;
      this.directions[this.NEAR_BOTTOM_EDGE + this.NEAR_LEFT_EDGE] = 45;
      this.directions[this.NEAR_BOTTOM_EDGE + this.NEAR_RIGHT_EDGE] = 135;
      this.large_turn_angle_deg = this.angle_rad = this.angle_deg = 0;
      this.near_edge = !1;
      this.edge_test_counter = 10;
      this.toggle_stationary_counter = 50 * Math.random();
      this.zoom = this.random(this.options.zoom, 10) / 20;
      this.stationary = !1;
      this.bug = null;
      this.active = !0;
      this.wingsOpen = this.options.wingsOpen;
      this.transform = a;
      this.flyIndex = this.walkIndex = 0;
      this.alive = !0;
      this.twitchTimer = null;
      this.rad2deg_k = 180 / Math.PI;
      this.deg2rad_k = Math.PI / 180;
      this.makeBug();
      this.angle_rad = this.deg2rad(this.angle_deg);
      this.angle_deg = this.random(0, 360, !0);
    },
    go: function() {
      if (this.transform) {
        this.drawBug();
        var a = this;
        this.animating = !0;
        this.going = requestAnimFrame(function(b) {
          a.animate(b);
        });
      }
    },
    stop: function() {
      this.animating = !1;
      this.going && (clearTimeout(this.going), (this.going = null));
      this.flyperiodical &&
        (clearTimeout(this.flyperiodical), (this.flyperiodical = null));
      this.twitchTimer &&
        (clearTimeout(this.twitchTimer), (this.twitchTimer = null));
    },
    remove: function() {
      this.active = !1;
      this.inserted &&
        this.bug.parentNode &&
        (this.bug.parentNode.removeChild(this.bug), (this.inserted = !1));
    },
    reset: function() {
      this.active = this.alive = !0;
      this.bug.style.bottom = "";
      this.bug.style.top = 0;
      this.bug.style.left = 0;
    },
    animate: function(a) {
      if (this.animating && this.alive && this.active) {
        var b = this;
        this.going = requestAnimFrame(function(a) {
          b.animate(a);
        });
        "_lastTimestamp" in this || (this._lastTimestamp = a);

        var c = a - this._lastTimestamp;
        if (
          !(
            40 > c ||
            (200 < c && (c = 200),
            (this._lastTimestamp = a),
            0 >= --this.toggle_stationary_counter && this.toggleStationary(),
            this.stationary)
          )
        ) {
          if (
            0 >= --this.edge_test_counter &&
            this.bug_near_window_edge() &&
            ((this.angle_deg %= 360),
            0 > this.angle_deg && (this.angle_deg += 360),
            15 < Math.abs(this.directions[this.near_edge] - this.angle_deg))
          ) {
            a = this.directions[this.near_edge] - this.angle_deg;
            var d = 360 - this.angle_deg + this.directions[this.near_edge];
            this.large_turn_angle_deg = Math.abs(a) < Math.abs(d) ? a : d;
            this.edge_test_counter = 10;
            this.large_turn_counter = 100;
            this.small_turn_counter = 30;
          }
          0 >= --this.large_turn_counter &&
            ((this.large_turn_angle_deg = this.random(
              1,
              this.options.maxLargeTurnDeg,
              !0
            )),
            this.next_large_turn());
          if (0 >= --this.small_turn_counter)
            (this.angle_deg += this.random(1, this.options.maxSmallTurnDeg)),
              this.next_small_turn();
          else {
            a = this.random(1, this.options.maxWiggleDeg, !0);
            if (
              (0 < this.large_turn_angle_deg && 0 > a) ||
              (0 > this.large_turn_angle_deg && 0 < a)
            )
              a = -a;
            this.large_turn_angle_deg -= a;
            this.angle_deg += a;
          }
          this.angle_rad = this.deg2rad(this.angle_deg);
          this.moveBug(
            this.bug.left +
              (c / 100) * this.options.walkSpeed * Math.cos(this.angle_rad),
            this.bug.top +
              (c / 100) * this.options.walkSpeed * -Math.sin(this.angle_rad),
            90 - this.angle_deg
          );
          this.walkFrame();
        }
      }
    },
    makeBug: function() {
      if (!this.bug && this.active) {
        var a = this.wingsOpen ? "0" : "-" + this.options.bugHeight + "px",
          b = document.createElement("div");
        b.className = "bug";
        b.style.background =
          "transparent url(" + this.options.imageSprite + ") no-repeat 0 " + a;
        b.style.width = this.options.bugWidth + "px";
        b.style.height = this.options.bugHeight + "px";
        b.style.position = "fixed";
        b.style.top = 0;
        b.style.left = 0;
        b.style.zIndex = "9999999";
        this.bug = b;
        this.setPos();
      }
    },
    setPos: function(a, b) {
      this.bug.top =
        a ||
        this.random(
          this.options.edge_resistance,
          document.documentElement.clientHeight - this.options.edge_resistance
        );
      this.bug.left =
        b ||
        this.random(
          this.options.edge_resistance,
          document.documentElement.clientWidth - this.options.edge_resistance
        );
      this.moveBug(this.bug.left, this.bug.top, 90 - this.angle_deg);
    },
    moveBug: function(a, b, c) {
      this.bug.left = a;
      this.bug.top = b;
      a = "translate(" + parseInt(a) + "px," + parseInt(b) + "px)";
      c && (a += " rotate(" + c + "deg)");
      a += " scale(" + this.zoom + ")";
      this.transform(a);
    },
    drawBug: function(a, b) {
      this.bug || this.makeBug();
      this.bug &&
        (a && b ? this.setPos(a, b) : this.setPos(this.bug.top, this.bug.left),
        this.inserted ||
          ((this.inserted = !0), document.body.appendChild(this.bug)));
    },
    toggleStationary: function() {
      this.stationary = !this.stationary;
      this.next_stationary();
      var a = this.wingsOpen ? "0" : "-" + this.options.bugHeight + "px";
      this.bug.style.backgroundPosition = this.stationary
        ? "0 " + a
        : "-" + this.options.bugWidth + "px " + a;
    },
    walkFrame: function() {
      this.bug.style.backgroundPosition =
        -1 * this.walkIndex * this.options.bugWidth +
        "px " +
        (this.wingsOpen ? "0" : "-" + this.options.bugHeight + "px");
      this.walkIndex++;
      this.walkIndex >= this.options.num_frames && (this.walkIndex = 0);
    },

    walkIn: function() {
      this.bug || this.makeBug();
      if (this.bug) {
        this.stop();
        var a = Math.round(4 * Math.random() - 0.5),
          b = document,
          c = b.documentElement,
          d = b.getElementsByTagName("body")[0],
          b = window.innerWidth || c.clientWidth || d.clientWidth,
          c = window.innerHeight || c.clientHeight || d.clientHeight;
        3 < a && (a = 3);
        0 > a && (a = 0);
        0 === a
          ? ((a = -1.3 * this.options.bugHeight), (b *= Math.random()))
          : 1 === a
            ? ((a = Math.random() * c), (b += 0.3 * this.options.bugWidth))
            : 2 === a
              ? ((a = c + 0.3 * this.options.bugHeight), (b *= Math.random()))
              : ((a = Math.random() * c), (b = -1.3 * this.options.bugWidth));
        this.bug.style.backgroundPosition =
          -3 * this.options.bugWidth +
          "px " +
          (this.wingsOpen ? "0" : "-" + this.options.bugHeight + "px");
        this.bug.top = a;
        this.bug.left = b;
        this.drawBug();
        this.go();
      }
    },
    rad2deg: function(a) {
      return a * this.rad2deg_k;
    },
    deg2rad: function(a) {
      return a * this.deg2rad_k;
    },
    random: function(a, b, c) {
      if (a == b) return a;
      a = Math.round(a - 0.5 + Math.random() * (b - a + 1));
      return c ? (0.5 < Math.random() ? a : -a) : a;
    },
    next_small_turn: function() {
      this.small_turn_counter = Math.round(10 * Math.random());
    },
    next_large_turn: function() {
      this.large_turn_counter = Math.round(40 * Math.random());
    },
    next_stationary: function() {
      this.toggle_stationary_counter = this.random(50, 300);
    },
    bug_near_window_edge: function() {
      this.near_edge = 0;
      this.bug.top < this.options.edge_resistance
        ? (this.near_edge |= this.NEAR_TOP_EDGE)
        : this.bug.top >
            document.documentElement.clientHeight -
              this.options.edge_resistance &&
          (this.near_edge |= this.NEAR_BOTTOM_EDGE);
      this.bug.left < this.options.edge_resistance
        ? (this.near_edge |= this.NEAR_LEFT_EDGE)
        : this.bug.left >
            document.documentElement.clientWidth -
              this.options.edge_resistance &&
          (this.near_edge |= this.NEAR_RIGHT_EDGE);
      return this.near_edge;
    },
    getPos: function() {
      return this.inserted && this.bug && this.bug.style
        ? { top: parseInt(this.bug.top, 10), left: parseInt(this.bug.left, 10) }
        : null;
    }
  },
  SpawnBug = function() {
    var a = {},
      b;
    for (b in Bug) Bug.hasOwnProperty(b) && (a[b] = Bug[b]);
    return a;
  },
  mergeOptions = function(a, b, c) {
    "undefined" == typeof c && (c = !0);
    a = c ? cloneOf(a) : a;
    for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
    return a;
  },
  cloneOf = function(a) {
    if (null == a || "object" != typeof a) return a;
    var b = a.constructor(),
      c;
    for (c in a) a.hasOwnProperty(c) && (b[c] = cloneOf(a[c]));
    return b;
  };
window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(a, b) {
      window.setTimeout(a, 1e3 / 60);
    }
  );
})();

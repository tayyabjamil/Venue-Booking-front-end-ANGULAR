/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */
function ParticleSlider(t) {
    var e = this;
    if (e.sliderId = "particle-slider", e.color = "#fff", e.hoverColor = "#88f", e.width = 0, e.height = 0, e.ptlGap = 0, e.ptlSize = 1, e.slideDelay = 10, e.arrowPadding = 10, e.showArrowControls = !0, e.onNextSlide = null, e.onWidthChange = null, e.onHeightChange = null, e.onSizeChange = null, e.monochrome = !1, e.mouseForce = 1e4, e.restless = !0, e.imgs = [], t)
        for (var i = ["color", "hoverColor", "width", "height", "ptlGap", "ptlSize", "slideDelay", "arrowPadding", "sliderId", "showArrowControls", "onNextSlide", "monochrome", "mouseForce", "restless", "imgs", "onSizeChange", "onWidthChange", "onHeightChange"], n = 0, s = i.length; n < s; n++) t[i[n]] && (e[i[n]] = t[i[n]]);
    if (e.$container = e.$("#" + e.sliderId), e.$$children = e.$container.childNodes, e.$controlsContainer = e.$(".controls"), e.$$slides = e.$(".slide", e.$(".slides").childNodes, !0), e.$controlLeft = null, e.$controlRight = null, e.$canv = e.$(".draw"), e.$srcCanv = document.createElement("canvas"), e.$srcCanv.style.display = "none", e.$container.appendChild(e.$srcCanv), e.$prevCanv = document.createElement("canvas"), e.$prevCanv.style.display = "none", e.$container.appendChild(e.$prevCanv), e.$nextCanv = document.createElement("canvas"), e.$nextCanv.style.display = "none", e.$container.appendChild(e.$nextCanv), e.$overlay = document.createElement("p"), e.$container.appendChild(e.$overlay), e.imgControlPrev = null, e.imgControlNext = null, e.$$slides.length <= 1 && (e.showArrowControls = !1), e.$controlsContainer && e.$controlsContainer.childNodes && 1 == e.showArrowControls ? (e.$controlLeft = e.$(".left", e.$controlsContainer.childNodes), e.$controlRight = e.$(".right", e.$controlsContainer.childNodes), e.imgControlPrev = new Image, e.imgControlNext = new Image, e.imgControlPrev.onload = function() {
            e.$prevCanv.height = this.height, e.$prevCanv.width = this.width, e.loadingStep()
        }, e.imgControlNext.onload = function() {
            e.$nextCanv.height = this.height, e.$nextCanv.width = this.width, e.loadingStep()
        }, e.imgControlPrev.src = e.$controlLeft.getAttribute("data-src"), e.imgControlNext.src = e.$controlRight.getAttribute("data-src")) : e.showArrowControls = !1, e.width <= 0 && (e.width = e.$container.clientWidth), e.height <= 0 && (e.height = e.$container.clientHeight), e.mouseDownRegion = 0, e.colorArr = e.parseColor(e.color), e.hoverColorArr = e.parseColor(e.hoverColor), e.mx = -1, e.my = -1, e.swipeOffset = 0, e.cw = e.getCw(), e.ch = e.getCh(), e.frame = 0, e.nextSlideTimer = !1, e.currImg = 0, e.lastImg = 0, e.imagesLoaded = 0, e.pxlBuffer = {
            first: null
        }, e.recycleBuffer = {
            first: null
        }, e.ctx = e.$canv.getContext("2d"), e.srcCtx = e.$srcCanv.getContext("2d"), e.prevCtx = e.$prevCanv.getContext("2d"), e.nextCtx = e.$nextCanv.getContext("2d"), e.$canv.width = e.cw, e.$canv.height = e.ch, e.shuffle = function() {
            for (var t, e, i = 0, n = this.length; i < n; i++) e = Math.floor(Math.random() * n), t = this[i], this[i] = this[e], this[e] = t
        }, Array.prototype.shuffle = e.shuffle, e.$canv.onmouseout = function() {
            e.mx = -1, e.my = -1, e.mouseDownRegion = 0
        }, e.$canv.onmousemove = function(t) {
            function i(t) {
                var i = 0,
                    n = 0,
                    s = "string" == typeof t ? e.$(t) : t;
                if (s) {
                    i = s.offsetLeft, n = s.offsetTop;
                    for (var o = document.getElementsByTagName("body")[0]; s.offsetParent && s != o;) i += s.offsetParent.offsetLeft, n += s.offsetParent.offsetTop, s = s.offsetParent
                }
                this.x = i, this.y = n
            }
            var n = new i(e.$container);
            e.mx = t.clientX - n.x + document.body.scrollLeft + document.documentElement.scrollLeft, e.my = t.clientY - n.y + document.body.scrollTop + document.documentElement.scrollTop
        }, e.$canv.onmousedown = function() {
            if (e.imgs.length > 1) {
                var t = 0;
                e.mx >= 0 && e.mx < 2 * e.arrowPadding + e.$prevCanv.width ? t = -1 : e.mx > 0 && e.mx > e.cw - (2 * e.arrowPadding + e.$nextCanv.width) && (t = 1), e.mouseDownRegion = t
            }
        }, e.$canv.onmouseup = function() {
            if (e.imgs.length > 1) {
                var t = "";
                e.mx >= 0 && e.mx < 2 * e.arrowPadding + e.$prevCanv.width ? t = -1 : e.mx > 0 && e.mx > e.cw - (2 * e.arrowPadding + e.$nextCanv.width) && (t = 1), 0 != t && 0 != e.mouseDownRegion && (t != e.mouseDownRegion && (t *= -1), e.nextSlideTimer && clearTimeout(e.nextSlideTimer), e.nextSlide(t)), e.mouseDownRegion = 0
            }
        }, 0 == e.imgs.length)
        for (n = 0, s = e.$$slides.length; n < s; n++) {
            var o = new Image;
            e.imgs.push(o), o.src = e.$$slides[n].getAttribute("data-src")
        }
    e.imgs.length > 0 && (e.imgs[0].onload = function() {
        e.loadingStep()
    }), e.requestAnimationFrame(function() {
        e.nextFrame()
    })
}
var AppDevUnleash, psParticle = function(t) {
    this.ps = t, this.ttl = null, this.color = t.colorArr, this.next = null, this.prev = null, this.gravityX = 0, this.gravityY = 0, this.x = Math.random() * t.cw, this.y = Math.random() * t.ch, this.velocityX = 10 * Math.random() - 5, this.velocityY = 10 * Math.random() - 5
};

psParticle.prototype.move = function() {
        var t = this.ps,
            e = this;
        if (null != this.ttl && this.ttl-- <= 0) t.swapList(e, t.pxlBuffer, t.recycleBuffer), this.ttl = null;
        else {
            var i = this.gravityX + t.swipeOffset - this.x,
                n = this.gravityY - this.y,
                s = Math.sqrt(Math.pow(i, 2) + Math.pow(n, 2)),
                o = Math.atan2(n, i),
                r = .01 * s;
            1 == t.restless ? r += .1 * Math.random() - .05 : r < .01 && (this.x = this.gravityX + .25, this.y = this.gravityY + .25);
            var a = 0,
                l = 0;
            if (t.mx >= 0 && t.mouseForce) {
                var h = this.x - t.mx,
                    c = this.y - t.my;
                a = Math.min(t.mouseForce / (Math.pow(h, 2) + Math.pow(c, 2)), t.mouseForce), l = Math.atan2(c, h), "function" == typeof this.color && (l += Math.PI, a *= .001 + .1 * Math.random() - .05)
            } else a = 0, l = 0;
            this.velocityX += r * Math.cos(o) + a * Math.cos(l), this.velocityY += r * Math.sin(o) + a * Math.sin(l), this.velocityX *= .92, this.velocityY *= .92, this.x += this.velocityX, this.y += this.velocityY
        }
    }, ParticleSlider.prototype.Particle = psParticle, ParticleSlider.prototype.swapList = function(t, e, i) {
        var n = this;
        null == t ? t = new n.Particle(n) : e.first == t ? null != t.next ? (t.next.prev = null, e.first = t.next) : e.first = null : null == t.next ? t.prev.next = null : (t.prev.next = t.next, t.next.prev = t.prev), null == i.first ? (i.first = t, t.prev = null, t.next = null) : (t.next = i.first, i.first.prev = t, i.first = t, t.prev = null)
    }, ParticleSlider.prototype.parseColor = function(t) {
        var e;
        t = t.replace(" ", "");
        if (e = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(t)) e = [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)];
        else if (e = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(t)) e = [17 * parseInt(e[1], 16), 17 * parseInt(e[2], 16), 17 * parseInt(e[3], 16)];
        else if (e = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(t)) e = [+e[1], +e[2], +e[3], +e[4]];
        else {
            if (!(e = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(t))) return null;
            e = [+e[1], +e[2], +e[3]]
        }
        return isNaN(e[3]) && (e[3] = 1), e[3] *= 255, e
    }, ParticleSlider.prototype.loadingStep = function() {
        var t = this;
        t.imagesLoaded++, (t.imagesLoaded >= 3 || 0 == t.showArrowControls) && (t.resize(), t.slideDelay > 0 && (t.nextSlideTimer = setTimeout(function() {
            t.nextSlide()
        }, 1e3 * t.slideDelay)))
    }, ParticleSlider.prototype.$ = function(t, e, i) {
        var n = this;
        if ("." == t[0]) {
            var s = t.substr(1);
            e || (e = n.$$children);
            for (var o = [], r = 0, a = e.length; r < a; r++) e[r].className && e[r].className == s && o.push(e[r]);
            return 0 == o.length ? null : 1 != o.length || i ? o : o[0]
        }
        return document.getElementById(t.substr(1))
    }, ParticleSlider.prototype.nextFrame = function() {
        var t = this;
        1 == t.mouseDownRegion && t.mx < t.cw / 2 || -1 == t.mouseDownRegion && t.mx > t.cw / 2 ? t.swipeOffset = t.mx - t.cw / 2 : t.swipeOffset = 0;
        for (var e = t.pxlBuffer.first, i = null; null != e;) i = e.next, e.move(), e = i;
        if (t.drawParticles(), t.frame++ % 25 == 0 && (t.cw != t.getCw() || t.ch != t.getCh())) {
            var n = t.getCh(),
                s = t.getCw();
            t.ch != s && "function" == typeof t.onWidthChange && t.onWidthChange(t, s), t.ch != n && "function" == typeof t.onHeightChange && t.onHeightChange(t, n), "function" == typeof t.onSizeChange && t.onSizeChange(t, s, n), t.resize()
        }
        setTimeout(function() {
            t.requestAnimationFrame(function() {
                t.nextFrame()
            })
        }, 15)
    }, ParticleSlider.prototype.nextSlide = function(t) {
        var e = this;
        null != e.nextSlideTimer && e.imgs.length > 1 ? (e.currImg = (e.currImg + e.imgs.length + (t || 1)) % e.imgs.length, e.resize(), e.slideDelay > 0 && (e.nextSlideTimer = setTimeout(function() {
            e.nextSlide()
        }, 1e3 * e.slideDelay))) : e.slideDelay > 0 && (e.nextSlideTimer = setTimeout(function() {
            e.nextSlide()
        }, 1e3 * e.slideDelay)), "function" == typeof e.onNextSlide && e.onNextSlide(e.currImg)
    }, ParticleSlider.prototype.drawParticles = function() {
        for (var t, e, i, n, s, o, r = this, a = r.ctx.createImageData(r.cw, r.ch), l = a.data, h = r.pxlBuffer.first; null != h;) {
            for (e = ~~h.x, i = ~~h.y, n = e; n < e + r.ptlSize && n >= 0 && n < r.cw; n++)
                for (s = i; s < i + r.ptlSize && s >= 0 && s < r.ch; s++) t = 4 * (s * a.width + n), o = "function" == typeof h.color ? h.color() : h.color, l[t + 0] = o[0], l[t + 1] = o[1], l[t + 2] = o[2], l[t + 3] = o[3];
            h = h.next
        }
        a.data = l, r.ctx.putImageData(a, 0, 0)
    }, ParticleSlider.prototype.getPixelFromImageData = function(t, e, n) {
        for (var s = this, o = [], r = 0; r < t.width; r += s.ptlGap + 1)
            for (var a = 0; a < t.height; a += s.ptlGap + 1) i = 4 * (a * t.width + r), t.data[i + 3] > 0 && o.push({
                x: e + r,
                y: n + a,
                color: 1 == s.monochrome ? [s.colorArr[0], s.colorArr[1], s.colorArr[2], s.colorArr[3]] : [t.data[i], t.data[i + 1], t.data[i + 2], t.data[i + 3]]
            });
        return o
    }, ParticleSlider.prototype.init = function(t) {
        var e = this;
        if (e.imgs.length > 0) {
            e.$srcCanv.width = e.imgs[e.currImg].width, e.$srcCanv.height = e.imgs[e.currImg].height, e.srcCtx.clearRect(0, 0, e.$srcCanv.width, e.$srcCanv.height), e.srcCtx.drawImage(e.imgs[e.currImg], 0, 0);
            var i = e.getPixelFromImageData(e.srcCtx.getImageData(0, 0, e.$srcCanv.width, e.$srcCanv.height), ~~(e.cw / 2 - e.$srcCanv.width / 2), ~~(e.ch / 2 - e.$srcCanv.height / 2));
            if (1 == e.showArrowControls) {
                e.prevCtx.clearRect(0, 0, e.$prevCanv.width, e.$prevCanv.height), e.prevCtx.drawImage(e.imgControlPrev, 0, 0);
                for (var n = e.getPixelFromImageData(e.prevCtx.getImageData(0, 0, e.$prevCanv.width, e.$prevCanv.height), e.arrowPadding, ~~(e.ch / 2 - e.$prevCanv.height / 2)), s = 0, o = n.length; s < o; s++) n[s].color = function() {
                    return e.mx >= 0 && e.mx < 2 * e.arrowPadding + e.$prevCanv.width ? e.hoverColorArr : e.colorArr
                }, i.push(n[s]);
                e.nextCtx.clearRect(0, 0, e.$nextCanv.width, e.$nextCanv.height), e.nextCtx.drawImage(e.imgControlNext, 0, 0);
                var r = e.getPixelFromImageData(e.nextCtx.getImageData(0, 0, e.$nextCanv.width, e.$nextCanv.height), e.cw - e.arrowPadding - e.$nextCanv.width, ~~(e.ch / 2 - e.$nextCanv.height / 2));
                for (s = 0, o = r.length; s < o; s++) r[s].color = function() {
                    return e.mx > 0 && e.mx > e.cw - (2 * e.arrowPadding + e.$nextCanv.width) ? e.hoverColorArr : e.colorArr
                }, i.push(r[s])
            }
            e.currImg == e.lastImg && 1 != t || (i.shuffle(), e.lastImg = e.currImg);
            var a = e.pxlBuffer.first;
            for (s = 0, o = i.length; s < o; s++) {
                var l = null;
                null != a ? (l = a, a = a.next) : (e.swapList(e.recycleBuffer.first, e.recycleBuffer, e.pxlBuffer), l = e.pxlBuffer.first), l.gravityX = i[s].x, l.gravityY = i[s].y, l.color = i[s].color
            }
            for (; null != a;) a.ttl = ~~(10 * Math.random()), a.gravityY = ~~(e.ch * Math.random()), a.gravityX = ~~(e.cw * Math.random()), a = a.next;
            e.$overlay.innerHTML = e.$$slides[e.currImg].innerHTML
        }
    }, ParticleSlider.prototype.getCw = function() {
        var t = this;
        return Math.min(document.body.clientWidth, t.width, t.$container.clientWidth)
    }, ParticleSlider.prototype.getCh = function() {
        var t = this;
        return Math.min(document.body.clientHeight, t.height, t.$container.clientHeight)
    }, ParticleSlider.prototype.resize = function() {
        var t = this;
        t.cw = t.getCw(), t.ch = t.getCh(), t.$canv.width = t.cw, t.$canv.height = t.ch, t.init(!0)
    }, ParticleSlider.prototype.setColor = function(t) {
        var e = this;
        e.colorArr = e.parseColor(t)
    }, ParticleSlider.prototype.setHoverColor = function(t) {
        var e = this;
        e.hoverColorArr = e.parseColor(t)
    }, ParticleSlider.prototype.requestAnimationFrame = function(t) {
        (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
            window.setTimeout(t, 1e3 / 60)
        })(t)
    },

    
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";
        var e = window.Slick || {};
        (e = function() {
            var e = 0;
            return function(i, n) {
                var s, o = this;
                o.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(i),
                    appendDots: t(i),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                    nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(e, i) {
                        return t('<button type="button" />').text(i + 1)
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    focusOnChange: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, o.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, t.extend(o, o.initials), o.activeBreakpoint = null, o.animType = null, o.animProp = null, o.breakpoints = [], o.breakpointSettings = [], o.cssTransitions = !1, o.focussed = !1, o.interrupted = !1, o.hidden = "hidden", o.paused = !0, o.positionProp = null, o.respondTo = null, o.rowCount = 1, o.shouldClick = !0, o.$slider = t(i), o.$slidesCache = null, o.transformType = null, o.transitionType = null, o.visibilityChange = "visibilitychange", o.windowWidth = 0, o.windowTimer = null, s = t(i).data("slick") || {}, o.options = t.extend({}, o.defaults, n, s), o.currentSlide = o.options.initialSlide, o.originalSettings = o.options, void 0 !== document.mozHidden ? (o.hidden = "mozHidden", o.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (o.hidden = "webkitHidden", o.visibilityChange = "webkitvisibilitychange"), o.autoPlay = t.proxy(o.autoPlay, o), o.autoPlayClear = t.proxy(o.autoPlayClear, o), o.autoPlayIterator = t.proxy(o.autoPlayIterator, o), o.changeSlide = t.proxy(o.changeSlide, o), o.clickHandler = t.proxy(o.clickHandler, o), o.selectHandler = t.proxy(o.selectHandler, o), o.setPosition = t.proxy(o.setPosition, o), o.swipeHandler = t.proxy(o.swipeHandler, o), o.dragHandler = t.proxy(o.dragHandler, o), o.keyHandler = t.proxy(o.keyHandler, o), o.instanceUid = e++, o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, o.registerBreakpoints(), o.init(!0)
            }
        }()).prototype.activateADA = function() {
                this.$slideTrack.find(".slick-active").attr({
                    "aria-hidden": "false"
                }).find("a, input, button, select").attr({
                    tabindex: "0"
                })
            }, e.prototype.addSlide = e.prototype.slickAdd = function(e, i, n) {
                var s = this;
                if ("boolean" == typeof i) n = i, i = null;
                else if (i < 0 || i >= s.slideCount) return !1;
                s.unload(), "number" == typeof i ? 0 === i && 0 === s.$slides.length ? t(e).appendTo(s.$slideTrack) : n ? t(e).insertBefore(s.$slides.eq(i)) : t(e).insertAfter(s.$slides.eq(i)) : !0 === n ? t(e).prependTo(s.$slideTrack) : t(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, i) {
                    t(i).attr("data-slick-index", e)
                }), s.$slidesCache = s.$slides, s.reinit()
            }, e.prototype.animateHeight = function() {
                var t = this;
                if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.animate({
                        height: e
                    }, t.options.speed)
                }
            }, e.prototype.animateSlide = function(e, i) {
                var n = {},
                    s = this;
                s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
                    left: e
                }, s.options.speed, s.options.easing, i) : s.$slideTrack.animate({
                    top: e
                }, s.options.speed, s.options.easing, i) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), t({
                    animStart: s.currentLeft
                }).animate({
                    animStart: e
                }, {
                    duration: s.options.speed,
                    easing: s.options.easing,
                    step: function(t) {
                        t = Math.ceil(t), !1 === s.options.vertical ? (n[s.animType] = "translate(" + t + "px, 0px)", s.$slideTrack.css(n)) : (n[s.animType] = "translate(0px," + t + "px)", s.$slideTrack.css(n))
                    },
                    complete: function() {
                        i && i.call()
                    }
                })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? n[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : n[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(n), i && setTimeout(function() {
                    s.disableTransition(), i.call()
                }, s.options.speed))
            }, e.prototype.getNavTarget = function() {
                var e = this,
                    i = e.options.asNavFor;
                return i && null !== i && (i = t(i).not(e.$slider)), i
            }, e.prototype.asNavFor = function(e) {
                var i = this.getNavTarget();
                null !== i && "object" == typeof i && i.each(function() {
                    var i = t(this).slick("getSlick");
                    i.unslicked || i.slideHandler(e, !0)
                })
            }, e.prototype.applyTransition = function(t) {
                var e = this,
                    i = {};
                !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
            },
            e.prototype.autoPlay = function() {
                var t = this;
                t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
            }, e.prototype.autoPlayClear = function() {
                var t = this;
                t.autoPlayTimer && clearInterval(t.autoPlayTimer)
            }, e.prototype.autoPlayIterator = function() {
                var t = this,
                    e = t.currentSlide + t.options.slidesToScroll;
                t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e))
            }, e.prototype.buildArrows = function() {
                var e = this;
                !0 === e.options.arrows && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                    "aria-disabled": "true",
                    tabindex: "-1"
                }))
            }, e.prototype.buildDots = function() {
                var e, i, n = this;
                if (!0 === n.options.dots) {
                    for (n.$slider.addClass("slick-dotted"), i = t("<ul />").addClass(n.options.dotsClass), e = 0; e <= n.getDotCount(); e += 1) i.append(t("<li />").append(n.options.customPaging.call(this, n, e)));
                    n.$dots = i.appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active")
                }
            }, e.prototype.buildOut = function() {
                var e = this;
                e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, i) {
                    t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
                }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
            }, e.prototype.buildRows = function() {
                var t, e, i, n, s, o, r, a = this;
                if (n = document.createDocumentFragment(), o = a.$slider.children(), a.options.rows > 1) {
                    for (r = a.options.slidesPerRow * a.options.rows, s = Math.ceil(o.length / r), t = 0; t < s; t++) {
                        var l = document.createElement("div");
                        for (e = 0; e < a.options.rows; e++) {
                            var h = document.createElement("div");
                            for (i = 0; i < a.options.slidesPerRow; i++) {
                                var c = t * r + (e * a.options.slidesPerRow + i);
                                o.get(c) && h.appendChild(o.get(c))
                            }
                            l.appendChild(h)
                        }
                        n.appendChild(l)
                    }
                    a.$slider.empty().append(n), a.$slider.children().children().children().css({
                        width: 100 / a.options.slidesPerRow + "%",
                        display: "inline-block"
                    })
                }
            }, e.prototype.checkResponsive = function(e, i) {
                var n, s, o, r = this,
                    a = !1,
                    l = r.$slider.width(),
                    h = window.innerWidth || t(window).width();
                if ("window" === r.respondTo ? o = h : "slider" === r.respondTo ? o = l : "min" === r.respondTo && (o = Math.min(h, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                    for (n in s = null, r.breakpoints) r.breakpoints.hasOwnProperty(n) && (!1 === r.originalSettings.mobileFirst ? o < r.breakpoints[n] && (s = r.breakpoints[n]) : o > r.breakpoints[n] && (s = r.breakpoints[n]));
                    null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || i) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), a = s), e || !1 === a || r.$slider.trigger("breakpoint", [r, a])
                }
            }, e.prototype.changeSlide = function(e, i) {
                var n, s, o = this,
                    r = t(e.currentTarget);
                switch (r.is("a") && e.preventDefault(), r.is("li") || (r = r.closest("li")), n = o.slideCount % o.options.slidesToScroll != 0 ? 0 : (o.slideCount - o.currentSlide) % o.options.slidesToScroll, e.data.message) {
                    case "previous":
                        s = 0 === n ? o.options.slidesToScroll : o.options.slidesToShow - n, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide - s, !1, i);
                        break;
                    case "next":
                        s = 0 === n ? o.options.slidesToScroll : n, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide + s, !1, i);
                        break;
                    case "index":
                        var a = 0 === e.data.index ? 0 : e.data.index || r.index() * o.options.slidesToScroll;
                        o.slideHandler(o.checkNavigable(a), !1, i), r.children().trigger("focus");
                        break;
                    default:
                        return
                }
            }, e.prototype.checkNavigable = function(t) {
                var e, i;
                if (i = 0, t > (e = this.getNavigableIndexes())[e.length - 1]) t = e[e.length - 1];
                else
                    for (var n in e) {
                        if (t < e[n]) {
                            t = i;
                            break
                        }
                        i = e[n]
                    }
                return t
            }, e.prototype.cleanUpEvents = function() {
                var e = this;
                e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
            }, e.prototype.cleanUpSlideEvents = function() {
                var e = this;
                e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
            }, e.prototype.cleanUpRows = function() {
                var t, e = this;
                e.options.rows > 1 && ((t = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(t))
            }, e.prototype.clickHandler = function(t) {
                !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
            }, e.prototype.destroy = function(e) {
                var i = this;
                i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                    t(this).attr("style", t(this).data("originalStyling"))
                }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
            }, e.prototype.disableTransition = function(t) {
                var e = this,
                    i = {};
                i[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
            }, e.prototype.fadeSlide = function(t, e) {
                var i = this;
                !1 === i.cssTransitions ? (i.$slides.eq(t).css({
                    zIndex: i.options.zIndex
                }), i.$slides.eq(t).animate({
                    opacity: 1
                }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
                    opacity: 1,
                    zIndex: i.options.zIndex
                }), e && setTimeout(function() {
                    i.disableTransition(t), e.call()
                }, i.options.speed))
            }, e.prototype.fadeSlideOut = function(t) {
                var e = this;
                !1 === e.cssTransitions ? e.$slides.eq(t).animate({
                    opacity: 0,
                    zIndex: e.options.zIndex - 2
                }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
                    opacity: 0,
                    zIndex: e.options.zIndex - 2
                }))
            }, e.prototype.filterSlides = e.prototype.slickFilter = function(t) {
                var e = this;
                null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
            }, e.prototype.focusHandler = function() {
                var e = this;
                e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(i) {
                    i.stopImmediatePropagation();
                    var n = t(this);
                    setTimeout(function() {
                        e.options.pauseOnFocus && (e.focussed = n.is(":focus"), e.autoPlay())
                    }, 0)
                })
            }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
                return this.currentSlide
            }, e.prototype.getDotCount = function() {
                var t = this,
                    e = 0,
                    i = 0,
                    n = 0;
                if (!0 === t.options.infinite)
                    if (t.slideCount <= t.options.slidesToShow) ++n;
                    else
                        for (; e < t.slideCount;) ++n, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
                else if (!0 === t.options.centerMode) n = t.slideCount;
                else if (t.options.asNavFor)
                    for (; e < t.slideCount;) ++n, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
                else n = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
                return n - 1
            }, e.prototype.getLeft = function(t) {
                var e, i, n, s, o = this,
                    r = 0;
                return o.slideOffset = 0, i = o.$slides.first().outerHeight(!0), !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, s = -1, !0 === o.options.vertical && !0 === o.options.centerMode && (2 === o.options.slidesToShow ? s = -1.5 : 1 === o.options.slidesToShow && (s = -2)), r = i * o.options.slidesToShow * s), o.slideCount % o.options.slidesToScroll != 0 && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth * -1, r = (o.options.slidesToShow - (t - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, r = o.slideCount % o.options.slidesToScroll * i * -1))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, r = (t + o.options.slidesToShow - o.slideCount) * i), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, r = 0), !0 === o.options.centerMode && o.slideCount <= o.options.slidesToShow ? o.slideOffset = o.slideWidth * Math.floor(o.options.slidesToShow) / 2 - o.slideWidth * o.slideCount / 2 : !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), e = !1 === o.options.vertical ? t * o.slideWidth * -1 + o.slideOffset : t * i * -1 + r, !0 === o.options.variableWidth && (n = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow), e = !0 === o.options.rtl ? n[0] ? -1 * (o.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, !0 === o.options.centerMode && (n = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), e = !0 === o.options.rtl ? n[0] ? -1 * (o.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, e += (o.$list.width() - n.outerWidth()) / 2)), e
            }, e.prototype.getOption = e.prototype.slickGetOption = function(t) {
                return this.options[t]
            }, e.prototype.getNavigableIndexes = function() {
                var t, e = this,
                    i = 0,
                    n = 0,
                    s = [];
                for (!1 === e.options.infinite ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, n = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); i < t;) s.push(i), i = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
                return s
            }, e.prototype.getSlick = function() {
                return this
            }, e.prototype.getSlideCount = function() {
                var e, i, n = this;
                return i = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(s, o) {
                    if (o.offsetLeft - i + t(o).outerWidth() / 2 > -1 * n.swipeLeft) return e = o, !1
                }), Math.abs(t(e).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
            }, e.prototype.goTo = e.prototype.slickGoTo = function(t, e) {
                this.changeSlide({
                    data: {
                        message: "index",
                        index: parseInt(t)
                    }
                }, e)
            }, e.prototype.init = function(e) {
                var i = this;
                t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), e && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
            }, e.prototype.initADA = function() {
                var e = this,
                    i = Math.ceil(e.slideCount / e.options.slidesToShow),
                    n = e.getNavigableIndexes().filter(function(t) {
                        return t >= 0 && t < e.slideCount
                    });
                e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                    "aria-hidden": "true",
                    tabindex: "-1"
                }).find("a, input, button, select").attr({
                    tabindex: "-1"
                }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(i) {
                    var s = n.indexOf(i);
                    t(this).attr({
                        role: "tabpanel",
                        id: "slick-slide" + e.instanceUid + i,
                        tabindex: -1
                    }), -1 !== s && t(this).attr({
                        "aria-describedby": "slick-slide-control" + e.instanceUid + s
                    })
                }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
                    var o = n[s];
                    t(this).attr({
                        role: "presentation"
                    }), t(this).find("button").first().attr({
                        role: "tab",
                        id: "slick-slide-control" + e.instanceUid + s,
                        "aria-controls": "slick-slide" + e.instanceUid + o,
                        "aria-label": s + 1 + " of " + i,
                        "aria-selected": null,
                        tabindex: "-1"
                    })
                }).eq(e.currentSlide).find("button").attr({
                    "aria-selected": "true",
                    tabindex: "0"
                }).end());
                for (var s = e.currentSlide, o = s + e.options.slidesToShow; s < o; s++) e.$slides.eq(s).attr("tabindex", 0);
                e.activateADA()
            }, e.prototype.initArrowEvents = function() {
                var t = this;
                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
                    message: "previous"
                }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
                    message: "next"
                }, t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow.on("keydown.slick", t.keyHandler), t.$nextArrow.on("keydown.slick", t.keyHandler)))
            }, e.prototype.initDotEvents = function() {
                var e = this;
                !0 === e.options.dots && (t("li", e.$dots).on("click.slick", {
                    message: "index"
                }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
            }, e.prototype.initSlideEvents = function() {
                var e = this;
                e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
            }, e.prototype.initializeEvents = function() {
                var e = this;
                e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                    action: "start"
                }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                    action: "move"
                }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                    action: "end"
                }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                    action: "end"
                }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(e.setPosition)
            }, e.prototype.initUI = function() {
                var t = this;
                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
            }, e.prototype.keyHandler = function(t) {
                var e = this;
                t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
                    data: {
                        message: !0 === e.options.rtl ? "next" : "previous"
                    }
                }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
                    data: {
                        message: !0 === e.options.rtl ? "previous" : "next"
                    }
                }))
            }, e.prototype.lazyLoad = function() {
                function e(e) {
                    t("img[data-lazy]", e).each(function() {
                        var e = t(this),
                            i = t(this).attr("data-lazy"),
                            n = t(this).attr("data-srcset"),
                            s = t(this).attr("data-sizes") || o.$slider.attr("data-sizes"),
                            r = document.createElement("img");
                        r.onload = function() {
                            e.animate({
                                opacity: 0
                            }, 100, function() {
                                n && (e.attr("srcset", n), s && e.attr("sizes", s)), e.attr("src", i).animate({
                                    opacity: 1
                                }, 200, function() {
                                    e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                                }), o.$slider.trigger("lazyLoaded", [o, e, i])
                            })
                        }, r.onerror = function() {
                            e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), o.$slider.trigger("lazyLoadError", [o, e, i])
                        }, r.src = i
                    })
                }
                var i, n, s, o = this;
                if (!0 === o.options.centerMode ? !0 === o.options.infinite ? s = (n = o.currentSlide + (o.options.slidesToShow / 2 + 1)) + o.options.slidesToShow + 2 : (n = Math.max(0, o.currentSlide - (o.options.slidesToShow / 2 + 1)), s = o.options.slidesToShow / 2 + 1 + 2 + o.currentSlide) : (n = o.options.infinite ? o.options.slidesToShow + o.currentSlide : o.currentSlide, s = Math.ceil(n + o.options.slidesToShow), !0 === o.options.fade && (n > 0 && n--, s <= o.slideCount && s++)), i = o.$slider.find(".slick-slide").slice(n, s), "anticipated" === o.options.lazyLoad)
                    for (var r = n - 1, a = s, l = o.$slider.find(".slick-slide"), h = 0; h < o.options.slidesToScroll; h++) r < 0 && (r = o.slideCount - 1), i = (i = i.add(l.eq(r))).add(l.eq(a)), r--, a++;
                e(i), o.slideCount <= o.options.slidesToShow ? e(o.$slider.find(".slick-slide")) : o.currentSlide >= o.slideCount - o.options.slidesToShow ? e(o.$slider.find(".slick-cloned").slice(0, o.options.slidesToShow)) : 0 === o.currentSlide && e(o.$slider.find(".slick-cloned").slice(-1 * o.options.slidesToShow))
            }, e.prototype.loadSlider = function() {
                var t = this;
                t.setPosition(), t.$slideTrack.css({
                    opacity: 1
                }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
            }, e.prototype.next = e.prototype.slickNext = function() {
                this.changeSlide({
                    data: {
                        message: "next"
                    }
                })
            }, e.prototype.orientationChange = function() {
                var t = this;
                t.checkResponsive(), t.setPosition()
            }, e.prototype.pause = e.prototype.slickPause = function() {
                var t = this;
                t.autoPlayClear(), t.paused = !0
            }, e.prototype.play = e.prototype.slickPlay = function() {
                var t = this;
                t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
            }, e.prototype.postSlide = function(e) {
                var i = this;
                i.unslicked || (i.$slider.trigger("afterChange", [i, e]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), !0 === i.options.accessibility && (i.initADA(), i.options.focusOnChange && t(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()))
            }, e.prototype.prev = e.prototype.slickPrev = function() {
                this.changeSlide({
                    data: {
                        message: "previous"
                    }
                })
            }, e.prototype.preventDefault = function(t) {
                t.preventDefault()
            }, e.prototype.progressiveLazyLoad = function(e) {
                e = e || 1;
                var i, n, s, o, r, a = this,
                    l = t("img[data-lazy]", a.$slider);
                l.length ? (i = l.first(), n = i.attr("data-lazy"), s = i.attr("data-srcset"), o = i.attr("data-sizes") || a.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
                    s && (i.attr("srcset", s), o && i.attr("sizes", o)), i.attr("src", n).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, i, n]), a.progressiveLazyLoad()
                }, r.onerror = function() {
                    e < 3 ? setTimeout(function() {
                        a.progressiveLazyLoad(e + 1)
                    }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, i, n]), a.progressiveLazyLoad())
                }, r.src = n) : a.$slider.trigger("allImagesLoaded", [a])
            }, e.prototype.refresh = function(e) {
                var i, n, s = this;
                n = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > n && (s.currentSlide = n), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), i = s.currentSlide, s.destroy(!0), t.extend(s, s.initials, {
                    currentSlide: i
                }), s.init(), e || s.changeSlide({
                    data: {
                        message: "index",
                        index: i
                    }
                }, !1)
            }, e.prototype.registerBreakpoints = function() {
                var e, i, n, s = this,
                    o = s.options.responsive || null;
                if ("array" === t.type(o) && o.length) {
                    for (e in s.respondTo = s.options.respondTo || "window", o)
                        if (n = s.breakpoints.length - 1, o.hasOwnProperty(e)) {
                            for (i = o[e].breakpoint; n >= 0;) s.breakpoints[n] && s.breakpoints[n] === i && s.breakpoints.splice(n, 1), n--;
                            s.breakpoints.push(i), s.breakpointSettings[i] = o[e].settings
                        } s.breakpoints.sort(function(t, e) {
                        return s.options.mobileFirst ? t - e : e - t
                    })
                }
            }, e.prototype.reinit = function() {
                var e = this;
                e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
            }, e.prototype.resize = function() {
                var e = this;
                t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                    e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
                }, 50))
            }, e.prototype.removeSlide = e.prototype.slickRemove = function(t, e, i) {
                var n = this;
                if (t = "boolean" == typeof t ? !0 === (e = t) ? 0 : n.slideCount - 1 : !0 === e ? --t : t, n.slideCount < 1 || t < 0 || t > n.slideCount - 1) return !1;
                n.unload(), !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(t).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, n.reinit()
            }, e.prototype.setCSS = function(t) {
                var e, i, n = this,
                    s = {};
                !0 === n.options.rtl && (t = -t), e = "left" == n.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == n.positionProp ? Math.ceil(t) + "px" : "0px", s[n.positionProp] = t, !1 === n.transformsEnabled ? n.$slideTrack.css(s) : (s = {}, !1 === n.cssTransitions ? (s[n.animType] = "translate(" + e + ", " + i + ")", n.$slideTrack.css(s)) : (s[n.animType] = "translate3d(" + e + ", " + i + ", 0px)", n.$slideTrack.css(s)))
            }, e.prototype.setDimensions = function() {
                var t = this;
                !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
                    padding: "0px " + t.options.centerPadding
                }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({
                    padding: t.options.centerPadding + " 0px"
                })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
                var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
                !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
            }, e.prototype.setFade = function() {
                var e, i = this;
                i.$slides.each(function(n, s) {
                    e = i.slideWidth * n * -1, !0 === i.options.rtl ? t(s).css({
                        position: "relative",
                        right: e,
                        top: 0,
                        zIndex: i.options.zIndex - 2,
                        opacity: 0
                    }) : t(s).css({
                        position: "relative",
                        left: e,
                        top: 0,
                        zIndex: i.options.zIndex - 2,
                        opacity: 0
                    })
                }), i.$slides.eq(i.currentSlide).css({
                    zIndex: i.options.zIndex - 1,
                    opacity: 1
                })
            }, e.prototype.setHeight = function() {
                var t = this;
                if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.css("height", e)
                }
            }, e.prototype.setOption = e.prototype.slickSetOption = function() {
                var e, i, n, s, o, r = this,
                    a = !1;
                if ("object" === t.type(arguments[0]) ? (n = arguments[0], a = arguments[1], o = "multiple") : "string" === t.type(arguments[0]) && (n = arguments[0], s = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? o = "responsive" : void 0 !== arguments[1] && (o = "single")), "single" === o) r.options[n] = s;
                else if ("multiple" === o) t.each(n, function(t, e) {
                    r.options[t] = e
                });
                else if ("responsive" === o)
                    for (i in s)
                        if ("array" !== t.type(r.options.responsive)) r.options.responsive = [s[i]];
                        else {
                            for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[i].breakpoint && r.options.responsive.splice(e, 1), e--;
                            r.options.responsive.push(s[i])
                        } a && (r.unload(), r.reinit())
            }, e.prototype.setPosition = function() {
                var t = this;
                t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
            }, e.prototype.setProps = function() {
                var t = this,
                    e = document.body.style;
                t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
            }, e.prototype.setSlideClasses = function(t) {
                var e, i, n, s, o = this;
                if (i = o.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), o.$slides.eq(t).addClass("slick-current"), !0 === o.options.centerMode) {
                    var r = o.options.slidesToShow % 2 == 0 ? 1 : 0;
                    e = Math.floor(o.options.slidesToShow / 2), !0 === o.options.infinite && (t >= e && t <= o.slideCount - 1 - e ? o.$slides.slice(t - e + r, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = o.options.slidesToShow + t, i.slice(n - e + 1 + r, n + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - o.options.slidesToShow).addClass("slick-center") : t === o.slideCount - 1 && i.eq(o.options.slidesToShow).addClass("slick-center")), o.$slides.eq(t).addClass("slick-center")
                } else t >= 0 && t <= o.slideCount - o.options.slidesToShow ? o.$slides.slice(t, t + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= o.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (s = o.slideCount % o.options.slidesToShow, n = !0 === o.options.infinite ? o.options.slidesToShow + t : t, o.options.slidesToShow == o.options.slidesToScroll && o.slideCount - t < o.options.slidesToShow ? i.slice(n - (o.options.slidesToShow - s), n + s).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
                "ondemand" !== o.options.lazyLoad && "anticipated" !== o.options.lazyLoad || o.lazyLoad()
            }, e.prototype.setupInfinite = function() {
                var e, i, n, s = this;
                if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (i = null, s.slideCount > s.options.slidesToShow)) {
                    for (n = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - n; e -= 1) i = e - 1, t(s.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
                    for (e = 0; e < n + s.slideCount; e += 1) i = e, t(s.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
                    s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                        t(this).attr("id", "")
                    })
                }
            }, e.prototype.interrupt = function(t) {
                var e = this;
                t || e.autoPlay(), e.interrupted = t
            }, e.prototype.selectHandler = function(e) {
                var i = this,
                    n = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
                    s = parseInt(n.attr("data-slick-index"));
                s || (s = 0), i.slideCount <= i.options.slidesToShow ? i.slideHandler(s, !1, !0) : i.slideHandler(s)
            }, e.prototype.slideHandler = function(t, e, i) {
                var n, s, o, r, a, l = null,
                    h = this;
                if (e = e || !1, !(!0 === h.animating && !0 === h.options.waitForAnimate || !0 === h.options.fade && h.currentSlide === t))
                    if (!1 === e && h.asNavFor(t), n = t, l = h.getLeft(n), r = h.getLeft(h.currentSlide), h.currentLeft = null === h.swipeLeft ? r : h.swipeLeft, !1 === h.options.infinite && !1 === h.options.centerMode && (t < 0 || t > h.getDotCount() * h.options.slidesToScroll)) !1 === h.options.fade && (n = h.currentSlide, !0 !== i ? h.animateSlide(r, function() {
                        h.postSlide(n)
                    }) : h.postSlide(n));
                    else if (!1 === h.options.infinite && !0 === h.options.centerMode && (t < 0 || t > h.slideCount - h.options.slidesToScroll)) !1 === h.options.fade && (n = h.currentSlide, !0 !== i ? h.animateSlide(r, function() {
                    h.postSlide(n)
                }) : h.postSlide(n));
                else {
                    if (h.options.autoplay && clearInterval(h.autoPlayTimer), s = n < 0 ? h.slideCount % h.options.slidesToScroll != 0 ? h.slideCount - h.slideCount % h.options.slidesToScroll : h.slideCount + n : n >= h.slideCount ? h.slideCount % h.options.slidesToScroll != 0 ? 0 : n - h.slideCount : n, h.animating = !0, h.$slider.trigger("beforeChange", [h, h.currentSlide, s]), o = h.currentSlide, h.currentSlide = s, h.setSlideClasses(h.currentSlide), h.options.asNavFor && (a = (a = h.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(h.currentSlide), h.updateDots(), h.updateArrows(), !0 === h.options.fade) return !0 !== i ? (h.fadeSlideOut(o), h.fadeSlide(s, function() {
                        h.postSlide(s)
                    })) : h.postSlide(s), void h.animateHeight();
                    !0 !== i ? h.animateSlide(l, function() {
                        h.postSlide(s)
                    }) : h.postSlide(s)
                }
            }, e.prototype.startLoad = function() {
                var t = this;
                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
            }, e.prototype.swipeDirection = function() {
                var t, e, i, n, s = this;
                return t = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, i = Math.atan2(e, t), (n = Math.round(180 * i / Math.PI)) < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0 ? !1 === s.options.rtl ? "left" : "right" : n <= 360 && n >= 315 ? !1 === s.options.rtl ? "left" : "right" : n >= 135 && n <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
            }, e.prototype.swipeEnd = function() {
                var t, e, i = this;
                if (i.dragging = !1, i.swiping = !1, i.scrolling) return i.scrolling = !1, !1;
                if (i.interrupted = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
                if (!0 === i.touchObject.edgeHit && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) {
                    switch (e = i.swipeDirection()) {
                        case "left":
                        case "down":
                            t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.currentDirection = 0;
                            break;
                        case "right":
                        case "up":
                            t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.currentDirection = 1
                    }
                    "vertical" != e && (i.slideHandler(t), i.touchObject = {}, i.$slider.trigger("swipe", [i, e]))
                } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
            }, e.prototype.swipeHandler = function(t) {
                var e = this;
                if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
                    case "start":
                        e.swipeStart(t);
                        break;
                    case "move":
                        e.swipeMove(t);
                        break;
                    case "end":
                        e.swipeEnd(t)
                }
            }, e.prototype.swipeMove = function(t) {
                var e, i, n, s, o, r, a = this;
                return o = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!a.dragging || a.scrolling || o && 1 !== o.length) && (e = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== o ? o[0].pageX : t.clientX, a.touchObject.curY = void 0 !== o ? o[0].pageY : t.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && r > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = r), i = a.swipeDirection(), void 0 !== t.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, t.preventDefault()), s = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (s = a.touchObject.curY > a.touchObject.startY ? 1 : -1), n = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (n = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = e + n * s : a.swipeLeft = e + n * (a.$list.height() / a.listWidth) * s, !0 === a.options.verticalSwiping && (a.swipeLeft = e + n * s), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
            }, e.prototype.swipeStart = function(t) {
                var e, i = this;
                if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return i.touchObject = {}, !1;
                void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, i.dragging = !0
            }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
                var t = this;
                null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
            }, e.prototype.unload = function() {
                var e = this;
                t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
            }, e.prototype.unslick = function(t) {
                var e = this;
                e.$slider.trigger("unslick", [e, t]), e.destroy()
            }, e.prototype.updateArrows = function() {
                var t = this;
                Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
            }, e.prototype.updateDots = function() {
                var t = this;
                null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").end(), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"))
            }, e.prototype.visibility = function() {
                var t = this;
                t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
            }, t.fn.slick = function() {
                var t, i, n = this,
                    s = arguments[0],
                    o = Array.prototype.slice.call(arguments, 1),
                    r = n.length;
                for (t = 0; t < r; t++)
                    if ("object" == typeof s || void 0 === s ? n[t].slick = new e(n[t], s) : i = n[t].slick[s].apply(n[t].slick, o), void 0 !== i) return i;
                return n
            }
    }),
    function(t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.typer = e() : t.typer = e()
    }(window, function() {
        return function(t) {
            function e(n) {
                if (i[n]) return i[n].exports;
                var s = i[n] = {
                    i: n,
                    l: !1,
                    exports: {}
                };
                return t[n].call(s.exports, s, s.exports, e), s.l = !0, s.exports
            }
            var i = {};
            return e.m = t, e.c = i, e.d = function(t, i, n) {
                e.o(t, i) || Object.defineProperty(t, i, {
                    enumerable: !0,
                    get: n
                })
            }, e.r = function(t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(t, "__esModule", {
                    value: !0
                })
            }, e.t = function(t, i) {
                if (1 & i && (t = e(t)), 8 & i) return t;
                if (4 & i && "object" == typeof t && t && t.__esModule) return t;
                var n = Object.create(null);
                if (e.r(n), Object.defineProperty(n, "default", {
                        enumerable: !0,
                        value: t
                    }), 2 & i && "string" != typeof t)
                    for (var s in t) e.d(n, s, function(e) {
                        return t[e]
                    }.bind(null, s));
                return n
            }, e.n = function(t) {
                var i = t && t.__esModule ? function() {
                    return t["default"]
                } : function() {
                    return t
                };
                return e.d(i, "a", i), i
            }, e.o = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }, e.p = "", e(e.s = 0)
        }([function(t, e, i) {
            "use strict";

            function n(t, e, i) {
                return e in t ? Object.defineProperty(t, e, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = i, t
            }
            i(1);
            var s = function a(t) {
                    return t ? (t ^ 16 * Math.random() >> t / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a)
                },
                o = ["typer", "cursor-block", "cursor-soft", "cursor-hard", "no-cursor"],
                r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@$^*()".split("");
            t.exports = function(t, e) {
                function i(t) {
                    return {}.toString.call(t).slice(8, -1)
                }

                function a(t) {
                    var e = i(t);
                    if ("html" !== e.slice(0, 4).toLowerCase() && "String" !== e) throw "You need to provide a string selector, such as '.some-class', or an html element.";
                    return e
                }

                function l(t) {
                    var n = i(t);
                    if (void 0 === t) return _.speedSet ? e : 70;
                    if ("Number" === n && !isNaN(t)) return t;
                    if ("Object" === n) {
                        var s = t.hasOwnProperty("min"),
                            o = t.hasOwnProperty("max"),
                            r = t.hasOwnProperty("speed");
                        if (r && !isNaN(t.speed)) return t.speed;
                        if (s && o && t.min < t.max) return t;
                        if (!Object.keys(t).length && _.speedSet) return e;
                        if (!s && !o && !r) return e
                    }
                    throw "You have provided an invalid value for speed."
                }

                function h(e, i) {
                    _.style && _.style.remove(), _.newDiv && c(), t.removeAttribute("data-typer"), y.removeEventListener("killTyper", g), _.newDiv && _.newDiv.classList.add("white-space"), _.newDiv = "", "function" == typeof e ? e(t) : "function" == typeof i && i(t), !0 !== e && !0 !== i || y.dispatchEvent(new Event("typerFinished"))
                }

                function c() {
                    o.forEach(function(t) {
                        return _.newDiv.classList.remove(t)
                    })
                }

                function u(t, e, s) {
                    function o() {
                        var e, s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            o = arguments.length > 1 ? arguments[1] : void 0,
                            a = s.container,
                            h = s.totalTime,
                            c = s.military,
                            u = !o && ("String" === i(a) ? document.querySelector(a).textContent : a.textContent);
                        return n(e = {}, t, o || u), n(e, "speed", l(s)), n(e, "html", !1 !== s.html), n(e, "element", r ? s.element : null), n(e, "military", function(t) {
                            if (!t) return null;
                            if (+t) return {
                                speed: +t,
                                chars: 3
                            };
                            if ("Object" === i(t)) return {
                                speed: +t.speed || 50,
                                chars: +t.chars || 3
                            };
                            throw "You have provided an invalid value for military."
                        }(c)), n(e, "totalTime", h), e
                    }
                    var r = "line" === t,
                        a = "continue" === t;
                    if (e || s)
                        if ("Object" === i(e))(r || a && e.container) && _.push(o(e));
                        else if (isNaN(s)) _.push(o(s, e));
                    else {
                        var h;
                        _.push((n(h = {}, t, e), n(h, "speed", l(s)), n(h, "html", !0), h))
                    } else r && _.push({
                        line: 1
                    })
                }

                function d() {
                    if (_.item >= 0 || (_.item = 0), _.item === _.length) return _.complete = !0, y.removeEventListener("killTyper", g);
                    _.ks || (_.ks = !0, y.addEventListener("killTyper", g)), _.cursor || (_.cursor = "cursor-soft"), _.type = setInterval(function() {
                        if (!_.length) return clearInterval(_.type);
                        var i = _[_.item];
                        i.line ? p(i) : i["continue"] ? function(t) {
                            clearInterval(_.type), m(t)
                        }(i) : i.pause ? function(t) {
                            clearInterval(_.type), _.pause = setTimeout(function() {
                                _.pause = null, _.item++, d()
                            }, t.pause)
                        }(i) : i.emit ? function(t) {
                            clearInterval(_.type), t.el.dispatchEvent(new Event(t.emit)), _.item++, d()
                        }(i) : i.listen ? function(t) {
                            function e(t) {
                                _.listening = !1, i.removeEventListener(t.type, e), _.killed || (_.item++, d())
                            }
                            var i = t.el,
                                n = t.listen;
                            clearInterval(_.type), _.listening = !0, i.addEventListener(n, e), b = {
                                el: i,
                                type: n,
                                fxn: e
                            }
                        }(i) : i.back ? function(t) {
                            function i(t) {
                                var i = 0,
                                    r = function a(t) {
                                        var e = [],
                                            i = Array.from(t.childNodes);
                                        return i.length ? (i.forEach(function(t) {
                                            t.childNodes.length ? e = e.concat(a(t)) : e.push(t)
                                        }), e) : e
                                    }(t || _.newDiv).reverse();
                                return function l() {
                                    if (_.halt) return _.resume = function() {
                                        return _.goBack = setInterval(l, o || e)
                                    }, clearInterval(_.goBack);
                                    var a = r[0];
                                    _.voids.includes(a.nodeName) ? (a.remove(), r.shift()) : (a.textContent = a.textContent.slice(0, -1), a.length || r.shift()), t || ++i === s && (clearInterval(_.goBack), n(_.newDiv), _.item++, d())
                                }
                            }

                            function n(t) {
                                Array.from(t.childNodes).forEach(function(t) {
                                    _.voids.includes(t.nodeName) || (t.childNodes.length && n(t), "#text" === t.nodeName || t.innerHTML.length || t.remove(), "#text" !== t.nodeName || t.length || t.remove())
                                })
                            }
                            var s = t.back,
                                o = t.speed;
                            if (clearInterval(_.type), !_.newDiv || !_.newDiv.textContent) return _.item++, d();
                            var r = function u(t) {
                                    var e = 0;
                                    return Array.from(t.childNodes).forEach(function(t) {
                                        _.voids.includes(t.nodeName) && e++, t.childNodes.length && (e += u(t))
                                    }), e
                                }(_.newDiv),
                                a = _.newDiv.textContent.length;
                            if ("empty" === s) {
                                if (!o || o >= a) _.newDiv.innerHTML = "";
                                else {
                                    var l = _.newDiv.cloneNode(!0),
                                        h = i(l);
                                    o < 0 && (o += a);
                                    for (var c = 0; c < o; c++) h();
                                    n(l), _.newDiv.innerHTML = l.innerHTML
                                }
                                return _.item++, d()
                            }
                            s > a + r && (s = "all"), "all" === s && (s = a + r), s < 0 && (s = a + r - -1 * s), _.goBack = setInterval(i(), o || e)
                        }(i) : i.empty ? (t.innerHTML = "", p({
                            line: 1
                        })) : i.run ? function(e) {
                            var i = e.run;
                            clearInterval(_.type), i(t), _.item++, d()
                        }(i) : i.end && (clearInterval(_.type), _.cb())
                    }, 0)
                }

                function p(e) {
                    clearInterval(_.type), _.newDiv && (c(), _.newDiv.classList.add("white-space"), _.newDiv.innerHTML || (_.newDiv.innerHTML = " "));
                    var i = document.createElement(e.element || "div");
                    if (i.setAttribute("data-typer-child", _.uuid), i.className = "".concat(_.cursor, " typer white-space"), t.appendChild(i), _.newDiv = i, 1 === e.line) return _.item++, d();
                    m(e)
                }

                function f(t, e) {
                    var n = "Object" === i(t) ? function(t, e) {
                        return Math.floor(Math.random() * (e - t + 1) + t)
                    }(t.min, t.max) : t;
                    _.halt ? _.resume = function() {
                        return _.iterator = setTimeout(e, n)
                    } : _.iterator = setTimeout(e, n)
                }

                function m(t) {
                    function e() {
                        return r[Math.floor(Math.random() * r.length)]
                    }

                    function n(i, n, s) {
                        var o = 0,
                            r = t.military,
                            a = r.speed,
                            l = r.chars;
                        i.innerHTML += e(), _.military = setInterval(function() {
                            if (o === l) return i.innerHTML = i.innerHTML.slice(0, -1) + n, clearInterval(_.military), s();
                            i.innerHTML = i.innerHTML.slice(0, -1) + e(), o++
                        }, a)
                    }

                    function s() {
                        return clearInterval(_.iterator), _.item++, d()
                    }
                    var o = t.line || t["continue"],
                        a = document.createElement("div");
                    if (Array.isArray(o)) return function() {
                        var e = 0,
                            i = t.totalTime ? t.totalTime / o.length : t.speed;
                        f(i, function n() {
                            var r = o[e++];
                            a.textContent = r, _.newDiv.innerHTML += t.html ? r : a.innerHTML, e === o.length ? s() : f(i, n)
                        })
                    }();
                    a.innerHTML = o, t.html ? function() {
                        var e = function h(t, e) {
                                var i = [];
                                t = Array.from(t);
                                for (var n = 0; n < t.length; n++) {
                                    var s = t[n],
                                        o = s.nodeName;
                                    "#text" === o ? i.push({
                                        parent: e,
                                        content: s.textContent
                                    }) : s.childNodes.length ? function() {
                                        var t = document.createElement(o);
                                        Array.from(s.attributes).forEach(function(e) {
                                            t.setAttribute(e.name, e.value)
                                        }), i.push({
                                            parent: e,
                                            newNode: t
                                        }), i = i.concat(h(s.childNodes, t))
                                    }() : _.voids.includes(o) && i.push({
                                        parent: e,
                                        voidNode: s
                                    })
                                }
                                return i
                            }(a.childNodes, _.newDiv),
                            i = 0,
                            o = 0,
                            r = e[i++],
                            l = t.totalTime ? t.totalTime / r.content.length : t.speed;
                        f(l, function c() {
                            if (r.content && o === r.content.length && (o = 0, r = e[i++]), !r) return s();
                            if (r.content) {
                                if (t.military) return n(r.parent, r.content[o++], function() {
                                    f(l, c)
                                });
                                r.parent.innerHTML += r.content[o++]
                            } else r.parent.appendChild(r.voidNode || r.newNode), r = e[i++];
                            f(l, c)
                        })
                    }() : function() {
                        var e = 0,
                            r = t.totalTime ? t.totalTime / o.length : t.speed;
                        f(r, function l() {
                            if (e === o.length) return s();
                            var h = o[e];
                            if (t.military) return n(_.newDiv, h, function() {
                                e++, f(r, l)
                            });
                            "String" !== i(o) && (a.textContent = h, h = a.innerHTML), _.newDiv.innerHTML += h, e++, f(r, l)
                        })
                    }()
                }

                function g() {
                    return _.typing ? (b.el && b.el.removeEventListener(b.type, b.fxn), clearInterval(_.type), clearInterval(_.iterator), clearInterval(_.goBack), clearInterval(_.military), clearTimeout(_.pause), h(), v("kill")) : w
                }

                function v(t) {
                    function e(t) {
                        return console.warn(i, t), w
                    }
                    var i = 'WARNING: you tried to call ".%s" after ".'.concat(t, '" has already been called.\nThe public API has been nullified.');
                    return Object.keys(w).forEach(function(i) {
                        "kill" === i && "end" === t || (w[i] = e.bind(null, i))
                    }), "kill" === t && (_.killed && e(), _.killed = !0), w
                }
                var _ = [],
                    y = document.body,
                    b = {};
                if ("String" === a(t) && (t = document.querySelector(t)), t.getAttribute("data-typer")) throw "You've already called Typer on this element.";
                e = l(e), _.speedSet = !0, _.voids = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"], _.classNames = o, _.uuid = s(), t.setAttribute("data-typer", _.uuid);
                var w = {
                    cursor: function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        if (_.cursorRan) return console.warn('You can only call ".cursor" once.'), this;
                        if (_.cursorRan = !0, !1 === t) return _.cursor = "no-cursor", this;
                        var e = t.color,
                            i = t.blink,
                            n = t.block,
                            s = [];
                        return e && function(t, e) {
                            _.style = document.createElement("style"), _.style.appendChild(document.createTextNode("")), document.head.appendChild(_.style);
                            var i = document.styleSheets[document.styleSheets.length - 1];
                            "insertRule" in i ? i.insertRule("".concat(t, "{").concat(e, "}"), 0) : i.addRule(t, e)
                        }('[data-typer="'.concat(_.uuid, '"] .typer::after'), "background-color:".concat(e)), s.push("cursor-".concat("hard" === i ? "hard" : "soft")), !0 === n && s.push("cursor-block"), _.cursor = s.join(" "), this
                    },
                    line: function(t, e) {
                        return u("line", t, e), _.typing || (_.typing = !0, d()), this
                    },
                    "continue": function(t, e) {
                        return u("continue", t, e), this
                    },
                    military: function(t, e) {
                        return u("military", t, e), _.typing || (_.typing = !0, d()), this
                    },
                    pause: function(t) {
                        return _.push({
                            pause: +t || 500
                        }), this
                    },
                    emit: function(t, e) {
                        return e ? "String" === a(e) && (e = document.querySelector(e)) : e = y, _.push({
                            emit: t,
                            el: e
                        }), this
                    },
                    listen: function(t, e) {
                        return e ? "String" === a(e) && (e = document.querySelector(e)) : e = y, _.push({
                            listen: t,
                            el: e
                        }), this
                    },
                    back: function(t, e) {
                        return _.push({
                            back: t,
                            speed: e
                        }), this
                    },
                    empty: function() {
                        return _.push({
                            empty: !0
                        }), this
                    },
                    run: function(t) {
                        return _.push({
                            run: t
                        }), this
                    },
                    end: function(t, e) {
                        return _.push({
                            end: !0
                        }), _.cb = function() {
                            return h(t, e)
                        }, v("end")
                    },
                    halt: function() {
                        if (!_.typing) return this;
                        var t = 'You can\'t call ".halt" while Typer is in %s mode.';
                        return _.pause ? console.warn(t, "pause") : _.listening ? console.warn(t, "listen") : void(_.halt = !0)
                    },
                    resume: function() {
                        if (!_.typing) return this;
                        if (!_.complete) {
                            if (_.halt = !1, !_.resume) return console.warn('You called ".resume" before calling ".halt".');
                            _.resume(), _.resume = null
                        }
                    },
                    kill: g
                };
                return w
            }
        }, function() {}])
    }),
    function(t, e) {
        "use strict";

        function i(i, n, o, a, l) {
            function h() {
                k = t.devicePixelRatio > 1, o = c(o), n.delay >= 0 && setTimeout(function() {
                    u(!0)
                }, n.delay), (n.delay < 0 || n.combined) && (a.e = _(n.throttle, function(t) {
                    "resize" === t.type && (x = T = -1), u(t.all)
                }), a.a = function(t) {
                    t = c(t), o.push.apply(o, t)
                }, a.g = function() {
                    return o = s(o).filter(function() {
                        return !s(this).data(n.loadedName)
                    })
                }, a.f = function(t) {
                    for (var e = 0; e < t.length; e++) {
                        var i = o.filter(function() {
                            return this === t[e]
                        });
                        i.length && u(!1, i)
                    }
                }, u(), s(n.appendScroll).on("scroll." + l + " resize." + l, a.e))
            }

            function c(t) {
                for (var o = n.defaultImage, r = n.placeholder, a = n.imageBase, l = n.srcsetAttribute, h = n.loaderAttribute, c = n._f || {}, u = 0, d = (t = s(t).filter(function() {
                        var t = s(this),
                            i = g(this);
                        return !t.data(n.handledName) && (t.attr(n.attribute) || t.attr(l) || t.attr(h) || c[i] !== e)
                    }).data("plugin_" + n.name, i)).length; u < d; u++) {
                    var p = s(t[u]),
                        f = g(t[u]),
                        m = p.attr(n.imageBaseAttribute) || a;
                    f === D && m && p.attr(l) && p.attr(l, v(p.attr(l), m)), c[f] === e || p.attr(h) || p.attr(h, c[f]), f === D && o && !p.attr(A) ? p.attr(A, o) : f === D || !r || p.css(O) && "none" !== p.css(O) || p.css(O, "url('" + r + "')")
                }
                return t
            }

            function u(t, e) {
                if (o.length) {
                    for (var r = e || o, a = !1, l = n.imageBase || "", h = n.srcsetAttribute, c = n.handledName, u = 0; u < r.length; u++)
                        if (t || e || p(r[u])) {
                            var f = s(r[u]),
                                m = g(r[u]),
                                v = f.attr(n.attribute),
                                _ = f.attr(n.imageBaseAttribute) || l,
                                y = f.attr(n.loaderAttribute);
                            f.data(c) || n.visibleOnly && !f.is(":visible") || !((v || f.attr(h)) && (m === D && (_ + v !== f.attr(A) || f.attr(h) !== f.attr(M)) || m !== D && _ + v !== f.css(O)) || y) || (a = !0, f.data(c, !0), d(f, m, _, y))
                        } a && (o = s(o).filter(function() {
                        return !s(this).data(c)
                    }))
                } else n.autoDestroy && i.destroy()
            }

            function d(t, e, i, o) {
                ++w;
                var r = function() {
                    b("onError", t), y(), r = s.noop
                };
                b("beforeLoad", t);
                var a = n.attribute,
                    l = n.srcsetAttribute,
                    h = n.sizesAttribute,
                    c = n.retinaAttribute,
                    u = n.removeAttribute,
                    d = n.loadedName,
                    p = t.attr(c);
                if (o) {
                    var f = function() {
                        u && t.removeAttr(n.loaderAttribute), t.data(d, !0), b(C, t), setTimeout(y, 1), f = s.noop
                    };
                    t.off(P).one(P, r).one(S, f), b(o, t, function(e) {
                        e ? (t.off(S), f()) : (t.off(P), r())
                    }) || t.trigger(P)
                } else {
                    var m = s(new Image);
                    m.one(P, r).one(S, function() {
                        t.hide(), e === D ? t.attr(I, m.attr(I)).attr(M, m.attr(M)).attr(A, m.attr(A)) : t.css(O, "url('" + m.attr(A) + "')"), t[n.effect](n.effectTime), u && (t.removeAttr(a + " " + l + " " + c + " " + n.imageBaseAttribute), h !== I && t.removeAttr(h)), t.data(d, !0), b(C, t), m.remove(), y()
                    });
                    var g = (k && p ? p : t.attr(a)) || "";
                    m.attr(I, t.attr(h)).attr(M, t.attr(l)).attr(A, g ? i + g : null), m.complete && m.trigger(S)
                }
            }

            function p(t) {
                var e = t.getBoundingClientRect(),
                    i = n.scrollDirection,
                    s = n.threshold,
                    o = m() + s > e.top && -s < e.bottom,
                    r = f() + s > e.left && -s < e.right;
                return "vertical" === i ? o : "horizontal" === i ? r : o && r
            }

            function f() {
                return x >= 0 ? x : x = s(t).width()
            }

            function m() {
                return T >= 0 ? T : T = s(t).height()
            }

            function g(t) {
                return t.tagName.toLowerCase()
            }

            function v(t, e) {
                if (e) {
                    var i = t.split(",");
                    t = "";
                    for (var n = 0, s = i.length; n < s; n++) t += e + i[n].trim() + (n !== s - 1 ? "," : "")
                }
                return t
            }

            function _(t, e) {
                var s, o = 0;
                return function(r, a) {
                    function l() {
                        o = +new Date, e.call(i, r)
                    }
                    var h = +new Date - o;
                    s && clearTimeout(s), h > t || !n.enableThrottle || a ? l() : s = setTimeout(l, t - h)
                }
            }

            function y() {
                --w, o.length || w || b("onFinishedAll")
            }

            function b(t) {
                return !!(t = n[t]) && (t.apply(i, [].slice.call(arguments, 1)), !0)
            }
            var w = 0,
                x = -1,
                T = -1,
                k = !1,
                C = "afterLoad",
                S = "load",
                P = "error",
                D = "img",
                A = "src",
                M = "srcset",
                I = "sizes",
                O = "background-image";
            "event" === n.bind || r ? h() : s(t).on(S + "." + l, h)
        }

        function n(n, r) {
            var a = this,
                l = s.extend({}, a.config, r),
                h = {},
                c = l.name + "-" + ++o;
            return a.config = function(t, i) {
                return i === e ? l[t] : (l[t] = i, a)
            }, a.addItems = function(t) {
                return h.a && h.a("string" === s.type(t) ? s(t) : t), a
            }, a.getItems = function() {
                return h.g ? h.g() : {}
            }, a.update = function(t) {
                return h.e && h.e({}, !t), a
            }, a.force = function(t) {
                return h.f && h.f("string" === s.type(t) ? s(t) : t), a
            }, a.loadAll = function() {
                return h.e && h.e({
                    all: !0
                }, !0), a
            }, a.destroy = function() {
                return s(l.appendScroll).off("." + c, h.e), s(t).off("." + c), h = {}, e
            }, i(a, l, n, h, c), l.chainable ? n : a
        }
        var s = t.jQuery || t.Zepto,
            o = 0,
            r = !1;
        s.fn.Lazy = s.fn.lazy = function(t) {
            return new n(this, t)
        }, s.Lazy = s.lazy = function(t, i, o) {
            if (s.isFunction(i) && (o = i, i = []), s.isFunction(o)) {
                t = s.isArray(t) ? t : [t], i = s.isArray(i) ? i : [i];
                for (var r = n.prototype.config, a = r._f || (r._f = {}), l = 0, h = t.length; l < h; l++)(r[t[l]] === e || s.isFunction(r[t[l]])) && (r[t[l]] = o);
                for (var c = 0, u = i.length; c < u; c++) a[i[c]] = t[0]
            }
        }, n.prototype.config = {
            name: "lazy",
            chainable: !0,
            autoDestroy: !0,
            bind: "load",
            threshold: 500,
            visibleOnly: !1,
            appendScroll: t,
            scrollDirection: "both",
            imageBase: null,
            defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            placeholder: null,
            delay: -1,
            combined: !1,
            attribute: "data-src",
            srcsetAttribute: "data-srcset",
            sizesAttribute: "data-sizes",
            retinaAttribute: "data-retina",
            loaderAttribute: "data-loader",
            imageBaseAttribute: "data-imagebase",
            removeAttribute: !0,
            handledName: "handled",
            loadedName: "loaded",
            effect: "show",
            effectTime: 0,
            enableThrottle: !0,
            throttle: 250,
            beforeLoad: e,
            afterLoad: e,
            onError: e,
            onFinishedAll: e
        }, s(t).on("load", function() {
            r = !0
        })
    }(window), (AppDevUnleash = AppDevUnleash || {}).Helpers = {
        debounce: function(t, e, i) {
            var n;
            return function() {
                var s = this,
                    o = arguments,
                    r = function() {
                        n = null, i || t.apply(s, o)
                    },
                    a = i && !n;
                clearTimeout(n), n = setTimeout(r, e), a && t.apply(s, o)
            }
        },
        imageOnLoad: function(t, e) {
            if (t) {
                var i = new Image;
                i.onload = function() {
                    "function" == typeof e && e()
                }, i.src = t
            }
        },
        getBrowserWidth: function() {
            switch (!0) {
                case window.innerWidth < 768:
                    return "mobile";
                case window.innerWidth < 900:
                    return "tabletPortrait";
                case window.innerWidth <= 1024:
                    return "tablet";
                default:
                    return "desktop"
            }
        }
    }, (AppDevUnleash = AppDevUnleash || {}).DeviceAdapter = function() {
        var t, e = "data-device",
            i = "data-src",
            n = function() {
                t.each(function() {
                    var t = $(this),
                        e = t.attr(i);
                    t.attr("src", e)
                })
            };
        return {
            init: function() {
                t = $("[" + e + '*="' + AppDevUnleash.Helpers.getBrowserWidth() + '"]'), n()
            },
            lazyLoad: function(t, e) {
                AppDevUnleash.Helpers.getBrowserWidth() === e && t.map(AppDevUnleash.Helpers.imageOnLoad)
            }
        }
    }(), (AppDevUnleash = AppDevUnleash || {}).BackgroundAdapter = function() {
        var t, e, i, n, s, o, r, a = 50,
            l = 500,
            h = 75,
            c = "scene--bg",
            u = "section--bg",
            d = "data-bg",
            p = "data-bg-switch",
            f = "data-header-transparent",
            m = "",
            g = "",
            v = function(t) {
                var e = $(window).height(),
                    i = 0;
                switch (t.attr(p)) {
                    case "middle":
                        i = e / 2;
                        break;
                    case "bottom":
                        i = e
                }
                return t.offset().top - h - i
            },
            _ = function(t) {
                switch (t.attr(f)) {
                    case "half":
                        offset = t.outerHeight() / 2;
                        break;
                    case "third":
                        offset = t.outerHeight() / 3
                }
                return t.offset().top + offset - h
            },
            y = function() {
                s = [], o = [], i.each(function() {
                    var t = $(this),
                        e = t.attr(d);
                    s.push({
                        background: e,
                        position: v(t)
                    })
                }), n.each(function() {
                    o.push({
                        from: $(this).offset().top,
                        to: _($(this))
                    })
                })
            },
            b = function() {
                var t = AppDevUnleash.Helpers.debounce(k, l);
                i.each(function() {
                    var e = $(this);
                    e.addClass(u + "-" + $(this).attr(d)), e.find("img").each(function() {
                        AppDevUnleash.Helpers.imageOnLoad($(this).attr("src"), t)
                    })
                })
            },
            w = function() {
                for (var t = "", i = $(window).scrollTop(), n = 0, o = s.length; n < o; n++) {
                    var r = s[n],
                        a = s[n + 1],
                        l = i >= r.position,
                        h = a && i < a.position;
                    if (l && (a ? h : l)) {
                        t = s[n].background;
                        break
                    }
                }
                m !== t && (e.removeAttr("class").addClass(c + "-" + t), m = t)
            },
            x = function() {
                var e = $(window).scrollTop(),
                    i = $(window).height(),
                    n = $(document).height();
                t.css("display", e + i + h >= n ? "none" : "block")
            },
            T = function() {
                for (var e = $(window).scrollTop(), i = 0, n = o.length; i < n; i++) {
                    var s = "";
                    if (e >= o[0].from && e < o[0].to) {
                        s = "transparent";
                        break
                    }
                }
                g !== s && (t.css("background-color", s), g = s)
            },
            k = function() {
                y(), w(), x(), T()
            },
            C = function() {
                var t = $(window).scrollTop(),
                    e = !!(r && r > t);
                return r = t, e
            },
            S = function() {
                var t = "scroll-up";
                C() ? e.addClass(t) : e.removeClass(t)
            },
            P = function() {
                w(), x(), T(), S()
            };
        return {
            init: function() {
                t = $("header.page-header"), e = $("body"), i = $("[" + d + "]"), n = $("[" + f + "]"), /(home|works)/.test(e.data("page")) || (b(), k(), $(window).resize(AppDevUnleash.Helpers.debounce(k, a)), $(window).scroll(P))
            },
            onScroll: P,
            onResize: AppDevUnleash.Helpers.debounce(k, a)
        }
    }(), (AppDevUnleash = AppDevUnleash || {}).FormCheckbox = function() {
        var t = ".form-checkbox__input",
            e = function() {
                var t = $(this),
                    e = t.closest(".form-checkbox");
                t.is(":checked") ? (t.attr("value", "true"), e.addClass("form-checkbox--checked")) : (t.attr("value", "false"), e.removeClass("form-checkbox--checked"))
            };
        return {
            init: function() {
                $(t).change(e)
            }
        }
    }(), $(function() {
        // functuser-event-tracker.crazyegg.com
    }), $(document).ready(function() {
        function t() {
            e(), AppDevUnleash.FormCheckbox.init(), AppDevUnleash.BackgroundAdapter.init(), AppDevUnleash.DeviceAdapter.init(), n(), s(), /works/.test($("body").data("page")) && setTimeout(function() {
                window.scrollTo(0, 0)
            }, 2500)
        }

        function e() {
            if (o.length) {
                var t = o.data("page");
                if ("desktop" === AppDevUnleash.Helpers.getBrowserWidth()) {
                    var e = $("#first-slide").data("src");
                    AppDevUnleash.Helpers.imageOnLoad(e, function() {
                        var e = $.extend({
                            mouseForce: 500,
                            showArrowControls: !0
                        }, i(t));
                        r = new ParticleSlider(e), $(window).on("resize", function() {
                            r.height = o.height(), r.width = o.width()
                        })
                    })
                } else $(".particle-slider").addClass("particle-slider-mobile").removeAttr("id")
            }
        }

        function i(t) {
            switch (t) {
                case "company":
                    return {
                        ptlGap: 1, ptlSize: .75, width: 1e9, height: 1e9, mouseForce: 20
                    };
                default:
                    return {
                        ptlGap: 5, ptlSize: 2
                    }
            }
        }

        function n() {
            /(tabletPortrait|tablet|mobile)/.test(AppDevUnleash.Helpers.getBrowserWidth()) && $(".section--top-company, .section--top-home").css("min-height", window.innerHeight)
        }

        function s() {
            var t = $(".flow-artboard"),
                e = $(".anniversary__mobile");
            "desktop" === AppDevUnleash.Helpers.getBrowserWidth() ? e.remove() : (t.remove(), $(".section--anniversary").append('<div class="anniversary__mobile--bg"><div class="anniversary__mobile--dots"></div></div>'))
        }
        document.addEventListener("touchend", function() {}, !0);
        var o = $("#particle-slider"),
            r = null;
        t(), $(".build-scheme__title, .build-scheme__block").mouseenter(function() {
            $(".build-scheme__item").removeClass("build-scheme__item--open"), $(this).closest(".build-scheme__item").addClass("build-scheme__item--open")
        }), $(".architect-scheme__title-wrap").mouseenter(function() {
            $(".architect-scheme__item").removeClass("architect-scheme__item--open"), $(this).closest(".architect-scheme__item").addClass("architect-scheme__item--open")
        }), $(".list--process .list__item").click(function() {
            $(this).siblings(".list__item").removeClass("list__item--open"), $(this).hasClass("list__item--open") ? $(this).removeClass("list__item--open") : $(this).addClass("list__item--open")
        }), $(".quotes-wrap").slick({
            fade: !0
        })
    })
     

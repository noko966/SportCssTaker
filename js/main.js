! function (t) {
    "use strict";
    var n = "cuid",
        r = 0,
        e = 4,
        i = 36,
        o = Math.pow(i, e),
        u = function (t, n) {
            var r = "000000000" + t;
            return r.substr(r.length - n)
        },
        g = function () {
            return u((Math.random() * o << 0).toString(i), e)
        },
        a = function () {
            return r = r < o ? r : 0, r++, r - 1
        },
        c = function () {
            var t, n = "c",
                r = (new Date).getTime().toString(i),
                o = c.fingerprint(),
                l = g() + g();
            return t = u(a().toString(i), e), n + r + t + o + l
        };
    c.slug = function () {
        var t, n = (new Date).getTime().toString(36),
            r = c.fingerprint().slice(0, 1) + c.fingerprint().slice(-1),
            e = g().slice(-2);
        return t = a().toString(36).slice(-4), n.slice(-2) + t + r + e
    }, c.globalCount = function () {
        var t = function () {
            var t, n = 0;
            for (t in window) n++;
            return n
        }();
        return c.globalCount = function () {
            return t
        }, t
    }, c.fingerprint = function () {
        return u((navigator.mimeTypes.length + navigator.userAgent.length).toString(36) + c.globalCount().toString(36), 4)
    }, t.register ? t.register(n, c) : "undefined" != typeof module ? module.exports = c : t[n] = c
}(this.applitude || this);


function Neuron(bias) {
    this.id = cuid();

    this.bias = bias == undefined ? Math.random() * 2 - 1 : bias;
    this.squash;
    this.cost;

    this.incoming = {
        targets: {}, //new Map(),
        weights: {} //new Map()
    }
    this.outgoing = {
        targets: {}, // new Map(),
        weights: {} // new Map()
    }

    this._output; // f'(x)
    this.output; // f(x)

    this._error; // E(f(x))
    this.error; // E'(f(x))


    this.connect = function (neuron, weight) {
        this.outgoing.targets[neuron.id] = neuron;
        neuron.incoming.targets[this.id] = this;
        this.outgoing.weights[neuron.id] = neuron.incoming.weights[this.id] = weight == undefined ? Math.random() * 2 - 1 : weight;
    }

    this.activate = function (input) {
        const self = this;

        function sigmoid(x) {
            return 1 / (1 + Math.exp(-x))
        } // f(x)
        function _sigmoid(x) {
            return sigmoid(x) * (1 - sigmoid(x))
        } // f'(x)

        if (input != undefined) {
            this._output = 1; // f'(x)
            this.output = input; // f(x)
        } else {
            // Σ (x • w)
            const sum = Object.keys(this.incoming.targets).reduce(function (total, target, index) {
                return total += self.incoming.targets[target].output * self.incoming.weights[target];
            }, this.bias);

            this._output = _sigmoid(sum); // f'(x)
            this.output = sigmoid(sum); // f(x)
        }

        return this.output;
    }

    this.propagate = function (target, rate = 0.3) {
        const self = this;

        //𝛿E /𝛿squash
        const sum = target == undefined ? Object.keys(this.outgoing.targets).reduce(function (total, target, index) {
            // Δweight
            self.outgoing.targets[target].incoming.weights[self.id] = self.outgoing.weights[target] -= rate * self.outgoing.targets[target].error * self.output;

            return total += self.outgoing.targets[target].error * self.outgoing.weights[target];
        }, 0) : this.output - target;

        // 𝛿squash/𝛿sum
        this.error = sum * this._output

        // Δbias
        this.bias -= rate * this.error;

        return this.error;
    }
}


function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
    ] : null;
}


const dataset = [{
        inputs: hexToRgb('#000000'),
        outputs: [1]
    },
    {
        inputs: hexToRgb('#696969'),
        outputs: [1]
    },
    {
        inputs: hexToRgb('#808080'),
        outputs: [1]
    },
    {
        inputs: hexToRgb('#A9A9A9'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#C0C0C0'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#D3D3D3'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#DCDCDC'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#F5F5F5'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#FFFFFF'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#009900'),
        outputs: [1]
    },
    {
        inputs: hexToRgb('#f14100'),
        outputs: [1]
    },
    {
        inputs: hexToRgb('#00FF00'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#333333'),
        outputs: [1]
    },
    {
        inputs: hexToRgb('#2b2b2b'),
        outputs: [1]
    },
    {
        inputs: hexToRgb('#e6e6e6'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#ffffff'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#d6d6d6'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#d7d7d7'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#c3c3c3'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#adadad'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#c0d8b8'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#b8d8c7'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#faff85'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#f1d169'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#85f1ff'),
        outputs: [0]
    },
    {
        inputs: hexToRgb('#000000'),
        outputs: [1]
    },
    {
        inputs: hexToRgb('#ffb700'),
        outputs: [0]
    },

];

const inputs = [new Neuron(), new Neuron(), new Neuron()]; // Input Layer w/ 3 neurons
const hiddens = [new Neuron(), new Neuron(), new Neuron(), new Neuron(), new Neuron(), new Neuron()]; // Hiddent Layer w/ 6 neurons
const outputs = [new Neuron()]; // Output Layer w/ 1 neuron

// Connect Input Layer to Hidden Layer
inputs[0].connect(hiddens[0]);
inputs[0].connect(hiddens[1]);
inputs[0].connect(hiddens[2]);
inputs[0].connect(hiddens[3]);
inputs[0].connect(hiddens[4]);
inputs[0].connect(hiddens[5]);

inputs[1].connect(hiddens[0]);
inputs[1].connect(hiddens[1]);
inputs[1].connect(hiddens[2]);
inputs[1].connect(hiddens[3]);
inputs[1].connect(hiddens[4]);
inputs[1].connect(hiddens[5]);

inputs[2].connect(hiddens[0]);
inputs[2].connect(hiddens[1]);
inputs[2].connect(hiddens[2]);
inputs[2].connect(hiddens[3]);
inputs[2].connect(hiddens[4]);
inputs[2].connect(hiddens[5]);

// Connect Hidden Layer to Output Layer
hiddens[0].connect(outputs[0]);
hiddens[1].connect(outputs[0]);
hiddens[2].connect(outputs[0]);
hiddens[3].connect(outputs[0]);
hiddens[4].connect(outputs[0]);
hiddens[5].connect(outputs[0]);

const activate = (input) => {
    inputs.forEach((neuron, i) => neuron.activate(input[i]));
    hiddens.forEach(neuron => neuron.activate());
    return outputs.map(neuron => neuron.activate());
};

const propagate = (target) => {
    outputs.forEach((neuron, t) => neuron.propagate(target[t]));
    hiddens.forEach(neuron => neuron.propagate());
    return inputs.forEach(neuron => neuron.propagate());
};

const train = (iterations = 1) => {
    while (iterations > 0) {
        dataset.map(datum => {
            activate(datum.inputs);
            propagate(datum.outputs);
        });
        iterations--;
    }
};

// Train Network (10,000 Iterations)
train(10000);

function guessVisibleColor(hex, essence) {
    if (!hex) {
        console.log(essence + ' has no color');
        return 'write by hand'
    }
    let temp = activate(hexToRgb(hex));
    // console.log(temp);
    return temp > .5 ? "#fff" : "#000"
}


// TinyColor v1.4.2
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function (Math) {

    var trimLeft = /^\s+/,
        trimRight = /\s+$/,
        tinyCounter = 0,
        mathRound = Math.round,
        mathMin = Math.min,
        mathMax = Math.max,
        mathRandom = Math.random;

    function tinycolor(color, opts) {

        color = (color) ? color : '';
        opts = opts || {};

        // If input is already a tinycolor, return itself
        if (color instanceof tinycolor) {
            return color;
        }
        // If we are called as a function, call using new instead
        if (!(this instanceof tinycolor)) {
            return new tinycolor(color, opts);
        }

        var rgb = inputToRGB(color);
        this._originalInput = color,
            this._r = rgb.r,
            this._g = rgb.g,
            this._b = rgb.b,
            this._a = rgb.a,
            this._roundA = mathRound(100 * this._a) / 100,
            this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;

        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this._r < 1) {
            this._r = mathRound(this._r);
        }
        if (this._g < 1) {
            this._g = mathRound(this._g);
        }
        if (this._b < 1) {
            this._b = mathRound(this._b);
        }

        this._ok = rgb.ok;
        this._tc_id = tinyCounter++;
    }

    tinycolor.prototype = {
        isDark: function () {
            return this.getBrightness() < 128;
        },
        isLight: function () {
            return !this.isDark();
        },
        isValid: function () {
            return this._ok;
        },
        getOriginalInput: function () {
            return this._originalInput;
        },
        getFormat: function () {
            return this._format;
        },
        getAlpha: function () {
            return this._a;
        },
        getObjectFromString: function (color) {
            return stringInputToObject(color);
        },
        getBrightness: function () {
            //http://www.w3.org/TR/AERT#color-contrast
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        },
        getLuminance: function () {
            //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
            var rgb = this.toRgb();
            var RsRGB, GsRGB, BsRGB, R, G, B;
            RsRGB = rgb.r / 255;
            GsRGB = rgb.g / 255;
            BsRGB = rgb.b / 255;

            if (RsRGB <= 0.03928) {
                R = RsRGB / 12.92;
            } else {
                R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);
            }
            if (GsRGB <= 0.03928) {
                G = GsRGB / 12.92;
            } else {
                G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);
            }
            if (BsRGB <= 0.03928) {
                B = BsRGB / 12.92;
            } else {
                B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);
            }
            return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
        },
        setAlpha: function (value) {
            this._a = boundAlpha(value);
            this._roundA = mathRound(100 * this._a) / 100;
            return this;
        },
        toHsv: function () {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            return {
                h: hsv.h * 360,
                s: hsv.s,
                v: hsv.v,
                a: this._a
            };
        },
        toHsvString: function () {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            var h = mathRound(hsv.h * 360),
                s = mathRound(hsv.s * 100),
                v = mathRound(hsv.v * 100);
            return (this._a == 1) ?
                "hsv(" + h + ", " + s + "%, " + v + "%)" :
                "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
        },
        toHsl: function () {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            return {
                h: hsl.h * 360,
                s: hsl.s,
                l: hsl.l,
                a: this._a
            };
        },
        toHslString: function () {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            var h = mathRound(hsl.h * 360),
                s = mathRound(hsl.s * 100),
                l = mathRound(hsl.l * 100);
            return (this._a == 1) ?
                "hsl(" + h + ", " + s + "%, " + l + "%)" :
                "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
        },
        toHex: function (allow3Char) {
            return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function (allow3Char) {
            return '#' + this.toHex(allow3Char);
        },
        toHex8: function (allow4Char) {
            return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
        },
        toHex8String: function (allow4Char) {
            return '#' + this.toHex8(allow4Char);
        },
        toRgb: function () {
            return {
                r: mathRound(this._r),
                g: mathRound(this._g),
                b: mathRound(this._b),
                a: this._a
            };
        },
        toRgbString: function () {
            return (this._a == 1) ?
                "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
                "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function () {
            return {
                r: mathRound(bound01(this._r, 255) * 100) + "%",
                g: mathRound(bound01(this._g, 255) * 100) + "%",
                b: mathRound(bound01(this._b, 255) * 100) + "%",
                a: this._a
            };
        },
        toPercentageRgbString: function () {
            return (this._a == 1) ?
                "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
                "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
        },
        toName: function () {
            if (this._a === 0) {
                return "transparent";
            }

            if (this._a < 1) {
                return false;
            }

            return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function (secondColor) {
            var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
            var secondHex8String = hex8String;
            var gradientType = this._gradientType ? "GradientType = 1, " : "";

            if (secondColor) {
                var s = tinycolor(secondColor);
                secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
            }

            return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
        },
        toString: function (format) {
            var formatSet = !!format;
            format = format || this._format;

            var formattedString = false;
            var hasAlpha = this._a < 1 && this._a >= 0;
            var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

            if (needsAlphaFormat) {
                // Special case for "transparent", all other non-alpha formats
                // will return rgba when there is transparency.
                if (format === "name" && this._a === 0) {
                    return this.toName();
                }
                return this.toRgbString();
            }
            if (format === "rgb") {
                formattedString = this.toRgbString();
            }
            if (format === "prgb") {
                formattedString = this.toPercentageRgbString();
            }
            if (format === "hex" || format === "hex6") {
                formattedString = this.toHexString();
            }
            if (format === "hex3") {
                formattedString = this.toHexString(true);
            }
            if (format === "hex4") {
                formattedString = this.toHex8String(true);
            }
            if (format === "hex8") {
                formattedString = this.toHex8String();
            }
            if (format === "name") {
                formattedString = this.toName();
            }
            if (format === "hsl") {
                formattedString = this.toHslString();
            }
            if (format === "hsv") {
                formattedString = this.toHsvString();
            }

            return formattedString || this.toHexString();
        },
        clone: function () {
            return tinycolor(this.toString());
        },

        _applyModification: function (fn, args) {
            var color = fn.apply(null, [this].concat([].slice.call(args)));
            this._r = color._r;
            this._g = color._g;
            this._b = color._b;
            this.setAlpha(color._a);
            return this;
        },
        lighten: function () {
            return this._applyModification(lighten, arguments);
        },
        brighten: function () {
            return this._applyModification(brighten, arguments);
        },
        darken: function () {
            return this._applyModification(darken, arguments);
        },
        desaturate: function () {
            return this._applyModification(desaturate, arguments);
        },
        saturate: function () {
            return this._applyModification(saturate, arguments);
        },
        greyscale: function () {
            return this._applyModification(greyscale, arguments);
        },
        spin: function () {
            return this._applyModification(spin, arguments);
        },

        _applyCombination: function (fn, args) {
            return fn.apply(null, [this].concat([].slice.call(args)));
        },
        analogous: function () {
            return this._applyCombination(analogous, arguments);
        },
        complement: function () {
            return this._applyCombination(complement, arguments);
        },
        monochromatic: function () {
            return this._applyCombination(monochromatic, arguments);
        },
        splitcomplement: function () {
            return this._applyCombination(splitcomplement, arguments);
        },
        triad: function () {
            return this._applyCombination(triad, arguments);
        },
        tetrad: function () {
            return this._applyCombination(tetrad, arguments);
        }
    };

    // If input is an object, force 1 into "1.0" to handle ratios properly
    // String input requires "1.0" as input, so 1 will be treated as 1
    tinycolor.fromRatio = function (color, opts) {
        if (typeof color == "object") {
            var newColor = {};
            for (var i in color) {
                if (color.hasOwnProperty(i)) {
                    if (i === "a") {
                        newColor[i] = color[i];
                    } else {
                        newColor[i] = convertToPercentage(color[i]);
                    }
                }
            }
            color = newColor;
        }

        return tinycolor(color, opts);
    };

    // Given a string or object, convert that input to RGB
    // Possible string inputs:
    //
    //     "red"
    //     "#f00" or "f00"
    //     "#ff0000" or "ff0000"
    //     "#ff000000" or "ff000000"
    //     "rgb 255 0 0" or "rgb (255, 0, 0)"
    //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
    //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
    //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
    //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
    //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
    //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
    //
    function inputToRGB(color) {

        var rgb = {
            r: 0,
            g: 0,
            b: 0
        };
        var a = 1;
        var s = null;
        var v = null;
        var l = null;
        var ok = false;
        var format = false;

        if (typeof color == "string") {
            color = stringInputToObject(color);
        }

        if (typeof color == "object") {
            if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
                rgb = rgbToRgb(color.r, color.g, color.b);
                ok = true;
                format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
                s = convertToPercentage(color.s);
                v = convertToPercentage(color.v);
                rgb = hsvToRgb(color.h, s, v);
                ok = true;
                format = "hsv";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
                s = convertToPercentage(color.s);
                l = convertToPercentage(color.l);
                rgb = hslToRgb(color.h, s, l);
                ok = true;
                format = "hsl";
            }

            if (color.hasOwnProperty("a")) {
                a = color.a;
            }
        }

        a = boundAlpha(a);

        return {
            ok: ok,
            format: color.format || format,
            r: mathMin(255, mathMax(rgb.r, 0)),
            g: mathMin(255, mathMax(rgb.g, 0)),
            b: mathMin(255, mathMax(rgb.b, 0)),
            a: a
        };
    }


    // Conversion Functions
    // --------------------

    // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
    // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

    // `rgbToRgb`
    // Handle bounds / percentage checking to conform to CSS color spec
    // <http://www.w3.org/TR/css3-color/>
    // *Assumes:* r, g, b in [0, 255] or [0, 1]
    // *Returns:* { r, g, b } in [0, 255]
    function rgbToRgb(r, g, b) {
        return {
            r: bound01(r, 255) * 255,
            g: bound01(g, 255) * 255,
            b: bound01(b, 255) * 255
        };
    }

    // `rgbToHsl`
    // Converts an RGB color value to HSL.
    // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
    // *Returns:* { h, s, l } in [0,1]
    function rgbToHsl(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b),
            min = mathMin(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return {
            h: h,
            s: s,
            l: l
        };
    }

    // `hslToRgb`
    // Converts an HSL color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hslToRgb(h, s, l) {
        var r, g, b;

        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);

        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return {
            r: r * 255,
            g: g * 255,
            b: b * 255
        };
    }

    // `rgbToHsv`
    // Converts an RGB color value to HSV
    // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
    // *Returns:* { h, s, v } in [0,1]
    function rgbToHsv(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b),
            min = mathMin(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max == min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return {
            h: h,
            s: s,
            v: v
        };
    }

    // `hsvToRgb`
    // Converts an HSV color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hsvToRgb(h, s, v) {

        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);

        var i = Math.floor(h),
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            mod = i % 6,
            r = [v, q, p, p, t, v][mod],
            g = [t, v, v, q, p, p][mod],
            b = [p, p, t, v, v, q][mod];

        return {
            r: r * 255,
            g: g * 255,
            b: b * 255
        };
    }

    // `rgbToHex`
    // Converts an RGB color to hex
    // Assumes r, g, and b are contained in the set [0, 255]
    // Returns a 3 or 6 character hex
    function rgbToHex(r, g, b, allow3Char) {

        var hex = [
            pad2(mathRound(r).toString(16)),
            pad2(mathRound(g).toString(16)),
            pad2(mathRound(b).toString(16))
        ];

        // Return a 3 character hex if possible
        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }

        return hex.join("");
    }

    // `rgbaToHex`
    // Converts an RGBA color plus alpha transparency to hex
    // Assumes r, g, b are contained in the set [0, 255] and
    // a in [0, 1]. Returns a 4 or 8 character rgba hex
    function rgbaToHex(r, g, b, a, allow4Char) {

        var hex = [
            pad2(mathRound(r).toString(16)),
            pad2(mathRound(g).toString(16)),
            pad2(mathRound(b).toString(16)),
            pad2(convertDecimalToHex(a))
        ];

        // Return a 4 character hex if possible
        if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
        }

        return hex.join("");
    }

    // `rgbaToArgbHex`
    // Converts an RGBA color to an ARGB Hex8 string
    // Rarely used, but required for "toFilter()"
    function rgbaToArgbHex(r, g, b, a) {

        var hex = [
            pad2(convertDecimalToHex(a)),
            pad2(mathRound(r).toString(16)),
            pad2(mathRound(g).toString(16)),
            pad2(mathRound(b).toString(16))
        ];

        return hex.join("");
    }

    // `equals`
    // Can be called with any tinycolor input
    tinycolor.equals = function (color1, color2) {
        if (!color1 || !color2) {
            return false;
        }
        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
    };

    tinycolor.random = function () {
        return tinycolor.fromRatio({
            r: mathRandom(),
            g: mathRandom(),
            b: mathRandom()
        });
    };


    // Modification Functions
    // ----------------------
    // Thanks to less.js for some of the basics here
    // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

    function desaturate(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function saturate(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function greyscale(color) {
        return tinycolor(color).desaturate(100);
    }

    function lighten(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    function brighten(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var rgb = tinycolor(color).toRgb();
        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
        return tinycolor(rgb);
    }

    function darken(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
    // Values outside of this range will be wrapped into this range.
    function spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
    }

    // Combination Functions
    // ---------------------
    // Thanks to jQuery xColor for some of the ideas behind these
    // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

    function complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
    }

    function triad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({
                h: (h + 120) % 360,
                s: hsl.s,
                l: hsl.l
            }),
            tinycolor({
                h: (h + 240) % 360,
                s: hsl.s,
                l: hsl.l
            })
        ];
    }

    function tetrad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({
                h: (h + 90) % 360,
                s: hsl.s,
                l: hsl.l
            }),
            tinycolor({
                h: (h + 180) % 360,
                s: hsl.s,
                l: hsl.l
            }),
            tinycolor({
                h: (h + 270) % 360,
                s: hsl.s,
                l: hsl.l
            })
        ];
    }

    function splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({
                h: (h + 72) % 360,
                s: hsl.s,
                l: hsl.l
            }),
            tinycolor({
                h: (h + 216) % 360,
                s: hsl.s,
                l: hsl.l
            })
        ];
    }

    function analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;

        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];

        for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results;) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(tinycolor(hsl));
        }
        return ret;
    }

    function monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h,
            s = hsv.s,
            v = hsv.v;
        var ret = [];
        var modification = 1 / results;

        while (results--) {
            ret.push(tinycolor({
                h: h,
                s: s,
                v: v
            }));
            v = (v + modification) % 1;
        }

        return ret;
    }

    // Utility Functions
    // ---------------------

    tinycolor.mix = function (color1, color2, amount) {
        amount = (amount === 0) ? 0 : (amount || 50);

        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();

        var p = amount / 100;

        var rgba = {
            r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
            g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
            b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
            a: ((rgb2.a - rgb1.a) * p) + rgb1.a
        };

        return tinycolor(rgba);
    };


    // Readability Functions
    // ---------------------
    // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

    // `contrast`
    // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
    tinycolor.readability = function (color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
    };

    // `isReadable`
    // Ensure that foreground and background color combinations meet WCAG2 guidelines.
    // The third argument is an optional Object.
    //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
    //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
    // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

    // *Example*
    //    tinycolor.isReadable("#000", "#111") => false
    //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
    tinycolor.isReadable = function (color1, color2, wcag2) {
        var readability = tinycolor.readability(color1, color2);
        var wcag2Parms, out;

        out = false;

        wcag2Parms = validateWCAG2Parms(wcag2);
        switch (wcag2Parms.level + wcag2Parms.size) {
            case "AAsmall":
            case "AAAlarge":
                out = readability >= 4.5;
                break;
            case "AAlarge":
                out = readability >= 3;
                break;
            case "AAAsmall":
                out = readability >= 7;
                break;
        }
        return out;

    };

    // `mostReadable`
    // Given a base color and a list of possible foreground or background
    // colors for that base, returns the most readable color.
    // Optionally returns Black or White if the most readable color is unreadable.
    // *Example*
    //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
    //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
    //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
    //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
    tinycolor.mostReadable = function (baseColor, colorList, args) {
        var bestColor = null;
        var bestScore = 0;
        var readability;
        var includeFallbackColors, level, size;
        args = args || {};
        includeFallbackColors = args.includeFallbackColors;
        level = args.level;
        size = args.size;

        for (var i = 0; i < colorList.length; i++) {
            readability = tinycolor.readability(baseColor, colorList[i]);
            if (readability > bestScore) {
                bestScore = readability;
                bestColor = tinycolor(colorList[i]);
            }
        }

        if (tinycolor.isReadable(baseColor, bestColor, {
                "level": level,
                "size": size
            }) || !includeFallbackColors) {
            return bestColor;
        } else {
            args.includeFallbackColors = false;
            return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
        }
    };


    // Big List of Colors
    // ------------------
    // <http://www.w3.org/TR/css3-color/#svg-color>
    var names = tinycolor.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
    };

    // Make it easy to access colors via `hexNames[hex]`
    var hexNames = tinycolor.hexNames = flip(names);


    // Utilities
    // ---------

    // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
    function flip(o) {
        var flipped = {};
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                flipped[o[i]] = i;
            }
        }
        return flipped;
    }

    // Return a valid alpha value [0,1] with all invalid values being set to 1
    function boundAlpha(a) {
        a = parseFloat(a);

        if (isNaN(a) || a < 0 || a > 1) {
            a = 1;
        }

        return a;
    }

    // Take input from [0, n] and return it as [0, 1]
    function bound01(n, max) {
        if (isOnePointZero(n)) {
            n = "100%";
        }

        var processPercent = isPercentage(n);
        n = mathMin(max, mathMax(0, parseFloat(n)));

        // Automatically convert percentage into number
        if (processPercent) {
            n = parseInt(n * max, 10) / 100;
        }

        // Handle floating point rounding errors
        if ((Math.abs(n - max) < 0.000001)) {
            return 1;
        }

        // Convert into [0, 1] range if it isn't already
        return (n % max) / parseFloat(max);
    }

    // Force a number between 0 and 1
    function clamp01(val) {
        return mathMin(1, mathMax(0, val));
    }

    // Parse a base-16 hex value into a base-10 integer
    function parseIntFromHex(val) {
        return parseInt(val, 16);
    }

    // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
    // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
    function isOnePointZero(n) {
        return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
    }

    // Check to see if string passed in is a percentage
    function isPercentage(n) {
        return typeof n === "string" && n.indexOf('%') != -1;
    }

    // Force a hex value to have 2 characters
    function pad2(c) {
        return c.length == 1 ? '0' + c : '' + c;
    }

    // Replace a decimal with it's percentage value
    function convertToPercentage(n) {
        if (n <= 1) {
            n = (n * 100) + "%";
        }

        return n;
    }

    // Converts a decimal to a hex value
    function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
    }
    // Converts a hex value to a decimal
    function convertHexToDecimal(h) {
        return (parseIntFromHex(h) / 255);
    }

    var matchers = (function () {

        // <http://www.w3.org/TR/css3-values/#integers>
        var CSS_INTEGER = "[-\\+]?\\d+%?";

        // <http://www.w3.org/TR/css3-values/#number-value>
        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

        // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

        // Actual matching.
        // Parentheses and commas are optional, but not required.
        // Whitespace can take the place of commas or opening paren
        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

        return {
            CSS_UNIT: new RegExp(CSS_UNIT),
            rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
            rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
            hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
            hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
            hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
            hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
            hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
    })();

    // `isValidCSSUnit`
    // Take in a single string / number and check to see if it looks like a CSS unit
    // (see `matchers` above for definition).
    function isValidCSSUnit(color) {
        return !!matchers.CSS_UNIT.exec(color);
    }

    // `stringInputToObject`
    // Permissive string parsing.  Take in a number of formats, and output an object
    // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
    function stringInputToObject(color) {

        color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
        var named = false;
        if (names[color]) {
            color = names[color];
            named = true;
        } else if (color == 'transparent') {
            return {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
                format: "name"
            };
        }

        // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.
        var match;
        if ((match = matchers.rgb.exec(color))) {
            return {
                r: match[1],
                g: match[2],
                b: match[3]
            };
        }
        if ((match = matchers.rgba.exec(color))) {
            return {
                r: match[1],
                g: match[2],
                b: match[3],
                a: match[4]
            };
        }
        if ((match = matchers.hsl.exec(color))) {
            return {
                h: match[1],
                s: match[2],
                l: match[3]
            };
        }
        if ((match = matchers.hsla.exec(color))) {
            return {
                h: match[1],
                s: match[2],
                l: match[3],
                a: match[4]
            };
        }
        if ((match = matchers.hsv.exec(color))) {
            return {
                h: match[1],
                s: match[2],
                v: match[3]
            };
        }
        if ((match = matchers.hsva.exec(color))) {
            return {
                h: match[1],
                s: match[2],
                v: match[3],
                a: match[4]
            };
        }
        if ((match = matchers.hex8.exec(color))) {
            return {
                r: parseIntFromHex(match[1]),
                g: parseIntFromHex(match[2]),
                b: parseIntFromHex(match[3]),
                a: convertHexToDecimal(match[4]),
                format: named ? "name" : "hex8"
            };
        }
        if ((match = matchers.hex6.exec(color))) {
            return {
                r: parseIntFromHex(match[1]),
                g: parseIntFromHex(match[2]),
                b: parseIntFromHex(match[3]),
                format: named ? "name" : "hex"
            };
        }
        if ((match = matchers.hex4.exec(color))) {
            return {
                r: parseIntFromHex(match[1] + '' + match[1]),
                g: parseIntFromHex(match[2] + '' + match[2]),
                b: parseIntFromHex(match[3] + '' + match[3]),
                a: convertHexToDecimal(match[4] + '' + match[4]),
                format: named ? "name" : "hex8"
            };
        }
        if ((match = matchers.hex3.exec(color))) {
            return {
                r: parseIntFromHex(match[1] + '' + match[1]),
                g: parseIntFromHex(match[2] + '' + match[2]),
                b: parseIntFromHex(match[3] + '' + match[3]),
                format: named ? "name" : "hex"
            };
        }

        return false;
    }

    function validateWCAG2Parms(parms) {
        // return valid WCAG2 parms for isReadable.
        // If input parms are invalid, return {"level":"AA", "size":"small"}
        var level, size;
        parms = parms || {
            "level": "AA",
            "size": "small"
        };
        level = (parms.level || "AA").toUpperCase();
        size = (parms.size || "small").toLowerCase();
        if (level !== "AA" && level !== "AAA") {
            level = "AA";
        }
        if (size !== "small" && size !== "large") {
            size = "small";
        }
        return {
            "level": level,
            "size": size
        };
    }

    // Node: Export function
    if (typeof module !== "undefined" && module.exports) {
        module.exports = tinycolor;
    }
    // AMD/requirejs: Define the module
    else if (typeof define === 'function' && define.amd) {
        define(function () {
            return tinycolor;
        });
    }
    // Browser: Expose to window
    else {
        window.tinycolor = tinycolor;
    }

})(Math);


/*
main logick
*/



function verbalData(name) {
    let data = {};
    data.name = name;
    data.nameBg = data.name + "Bg";
    data.nameBg_g = data.nameBg + "_g";
    data.nameG = data.name + "G";
    data.nameRGBA = data.name + "RGBA";
    data.nameRGBA2 = data.name + "RGBA2";
    data.nameRGBA3 = data.name + "RGBA3";
    data.nameG2 = data.nameG + "2";
    data.nameBgHov = data.nameBg + "Hover";
    data.nameBg2 = data.nameBg + "2";
    data.nameBg2Hov = data.nameBg2 + "Hover";
    data.nameBg3 = data.nameBg + "3";
    data.nameBg3Hov = data.nameBg3 + "Hover";
    data.upperCaseName = data.name[0].toUpperCase() + data.name.substring(1);
    data.isName = "is" + data.upperCaseName + "Bg";
    data.isGradient = "is" + data.upperCaseName + "Gradient";
    data.isGradientReversed = data.isGradient + "Reversed";
    data.isDark = "is" + data.upperCaseName + "BgDark";

    data.nameTxt = data.name + "Txt";
    data.nameTxt2 = data.nameTxt + "2";
    data.nameTxt3 = data.nameTxt + "3";
    data.customTxt = "custom" + data.upperCaseName + "Txt";
    data.isCustomTxt = "isCustom" + data.upperCaseName + "Txt";
    data.isCustomTxtDark = "isCustom" + data.upperCaseName + "TxtDark";

    data.nameBorder = data.name + "Border";
    data.isCustomBorder = "isCustom" + data.upperCaseName + "Border";
    data.customBorder = "custom" + data.upperCaseName + "Border";

    data.nameAccent = data.name + "Accent";
    data.nameAccentTxt = data.name + "AccentTxt";
    data.isCustomAccent = "isCustom" + data.upperCaseName + "Accent";
    data.customAccent = "custom" + data.upperCaseName + "Accent";

    data.nameRadius = data.name + "Radius";
    data.isCustomRadius = "isCustom" + data.upperCaseName + "Radius";
    data.customRadius = "custom" + data.upperCaseName + "Radius";

    return data;
}


function getBgColor(el, essence) {
    let _essence = essence || "unknown";
    if (!el) {
        console.log(essence);
        return
    }
    let _el = el;
    let _style, _bg, _gr, _isGradient;

    _style = window.getComputedStyle(_el);
    _bg = _style.getPropertyValue('background-color');
    _gr = _style.getPropertyValue('background-image');

    if(_bg === "rgba(0, 0, 0, 0)" && _gr === "none") {
        _bg = "#ffffff";
    }

    _isGradient = _gr !== 'none';
    _bg = tinycolor(_bg).toHexString();

    // if(_bg === 'rgba(0, 0, 0, 0)'){
    //     console.log('no color applied');
    // }

    if (_isGradient) {
        let __bg = _gr.match(new RegExp(/rgba*\(.+?(?=\))/, 'ig'))[0] + ')';
        _bg = tinycolor(__bg).toHexString();
    } else {
        _gr = _bg;
    }




    let res = {
        bg: _bg,
        gr: _gr,
    }

    return res;

}

function getTxtColor(el) {
    if (!el) return
    let _el = el;
    let _bg;
    let _style = window.getComputedStyle(_el);
    _bg = _style.getPropertyValue('color');
    if (_bg === "rgba(0, 0, 0, 0)") {
        let _parent = _el.parentElement;
        return getTxtColor(_parent);
    } else {
        return tinycolor(_bg).toHexString();
    }
}

function getBorderColor(el) {
    if (!el) return
    let _el = el;
    let _borderColor, _borderStyle, result;
    let _style = window.getComputedStyle(_el);
    _borderColor = _style.getPropertyValue('border-color');
    _borderStyle = _style.getPropertyValue('border-style');

    return _borderStyle === 'none' ? false : tinycolor(_borderColor).toHexString();
}

function getBg(el, essence, shift) {
    let _el = el;
    let _shift = shift || 0;
    let _essence = essence || "body";
    let config = {};
    let data = verbalData(_essence);
    let isLight;
    config[data.nameBg] = getBgColor(_el, _essence).bg;
    config[data.nameG] = getBgColor(_el, _essence).gr;
    isLight = tinycolor(config[data.nameBg]).isLight();
    let txt = guessVisibleColor(config[data.nameBg], essence);
    config[data.nameTxt] = tinycolor(txt).setAlpha(0.9).toRgbString();
    config[data.nameTxt2] = tinycolor(config[data.nameTxt]).setAlpha(0.6).toRgbString();
    config[data.nameTxt3] = tinycolor(config[data.nameTxt]).setAlpha(0.4).toRgbString();
    if (isLight) {
        config[data.nameBg] = _shift ? tinycolor(config[data.nameBg]).darken(_shift).toString() : tinycolor(config[data.nameBg]).toString();
        config[data.nameBg2] = tinycolor(config[data.nameBg]).darken(10).toString();
        config[data.nameBg3] = tinycolor(config[data.nameBg]).darken(15).toString();
        config[data.nameBgHov] = tinycolor(config[data.nameBg]).darken(3).toString();
        config[data.nameBg2Hov] = tinycolor(config[data.nameBg2]).darken(3).toString();
        config[data.nameBg3Hov] = tinycolor(config[data.nameBg3]).darken(3).toString();
        config[data.nameRGBA] = tinycolor(config[data.nameBg]).setAlpha(0.7).toRgbString();
        config[data.nameRGBA2] = tinycolor(config[data.nameBg]).setAlpha(0.5).toRgbString();
        config[data.nameRGBA3] = tinycolor(config[data.nameBg]).setAlpha(0.3).toRgbString();
    } else {
        config[data.nameBg] = _shift ? tinycolor(config[data.nameBg]).lighten(_shift).toString() : tinycolor(config[data.nameBg]).toString();
        config[data.nameBg2] = tinycolor(config[data.nameBg]).lighten(10).toString();
        config[data.nameBg3] = tinycolor(config[data.nameBg]).lighten(15).toString();
        config[data.nameBgHov] = tinycolor(config[data.nameBg]).lighten(3).toString();
        config[data.nameBg2Hov] = tinycolor(config[data.nameBg2]).lighten(3).toString();
        config[data.nameBg3Hov] = tinycolor(config[data.nameBg3]).lighten(3).toString();
        config[data.nameRGBA] = tinycolor(config[data.nameBg]).setAlpha(0.7).toRgbString();
        config[data.nameRGBA2] = tinycolor(config[data.nameBg]).setAlpha(0.5).toRgbString();
        config[data.nameRGBA3] = tinycolor(config[data.nameBg]).setAlpha(0.3).toRgbString();
    }

    return config;
}


function getTxt(el, essence) {
    let _el = el;
    let _essence = essence || "accent";
    let config = {};
    let data = verbalData(_essence);
    let isLight;
    config[data.nameBg] = getTxtColor(_el);
    isLight = tinycolor(config[data.nameBg]).isLight();
    let txt = guessVisibleColor(config[data.nameBg], essence);
    config[data.nameTxt] = tinycolor(txt).setAlpha(0.9).toRgbString();
    config[data.nameTxt2] = tinycolor(config[data.nameTxt]).setAlpha(0.8).toRgbString();
    config[data.nameTxt3] = tinycolor(config[data.nameTxt]).setAlpha(0.6).toRgbString();
    if (isLight) {
        config[data.nameBg2] = tinycolor(config[data.nameBg]).darken(10).toString();
        config[data.nameBg3] = tinycolor(config[data.nameBg]).darken(15).toString();
        config[data.nameBgHov] = tinycolor(config[data.nameBg]).darken(3).toString();
        config[data.nameBg2Hov] = tinycolor(config[data.nameBg2]).darken(3).toString();
        config[data.nameBg3Hov] = tinycolor(config[data.nameBg3]).darken(3).toString();
        config[data.nameG] = config[data.nameBg];
        config[data.nameRGBA] = tinycolor(config[data.nameBg]).setAlpha(0.7).toRgbString();
        config[data.nameRGBA2] = tinycolor(config[data.nameBg]).setAlpha(0.5).toRgbString();
        config[data.nameRGBA3] = tinycolor(config[data.nameBg]).setAlpha(0.3).toRgbString();
    } else {
        config[data.nameBg2] = tinycolor(config[data.nameBg]).lighten(10).toString();
        config[data.nameBg3] = tinycolor(config[data.nameBg]).lighten(15).toString();
        config[data.nameBgHov] = tinycolor(config[data.nameBg]).lighten(3).toString();
        config[data.nameBg2Hov] = tinycolor(config[data.nameBg2]).lighten(3).toString();
        config[data.nameBg3Hov] = tinycolor(config[data.nameBg3]).lighten(3).toString();
        config[data.nameG] = config[data.nameBg];
        config[data.nameRGBA] = tinycolor(config[data.nameBg]).setAlpha(0.7).toRgbString();
        config[data.nameRGBA2] = tinycolor(config[data.nameBg]).setAlpha(0.5).toRgbString();
        config[data.nameRGBA3] = tinycolor(config[data.nameBg]).setAlpha(0.3).toRgbString();
    }

    return config;
}

function getPalette(color, essence, shift) {
    let _color = color;
    let _shift = shift || false;
    let _essence = essence || "body";
    let config = {};
    let data = verbalData(_essence);
    let isLight;
    config[data.nameBg] = _color;
    isLight = tinycolor(config[data.nameBg]).isLight();
    let txt = guessVisibleColor(config[data.nameBg]);
    config[data.nameTxt] = tinycolor(txt).setAlpha(0.9).toRgbString();
    config[data.nameTxt2] = tinycolor(config[data.nameTxt]).setAlpha(0.8).toRgbString();
    config[data.nameTxt3] = tinycolor(config[data.nameTxt]).setAlpha(0.6).toRgbString();
    if (isLight) {
        config[data.nameBg] = _shift ? tinycolor(config[data.nameBg]).darken(5).toString() : tinycolor(config[data.nameBg]).toString();
        config[data.nameBg2] = tinycolor(config[data.nameBg]).darken(10).toString();
        config[data.nameBg3] = tinycolor(config[data.nameBg]).darken(15).toString();
        config[data.nameBgHov] = tinycolor(config[data.nameBg]).darken(3).toString();
        config[data.nameBg2Hov] = tinycolor(config[data.nameBg2]).darken(3).toString();
        config[data.nameBg3Hov] = tinycolor(config[data.nameBg3]).darken(3).toString();
        config[data.nameG] = config[data.nameBg];
        config[data.nameRGBA] = tinycolor(config[data.nameBg]).setAlpha(0.7).toRgbString();
        config[data.nameRGBA2] = tinycolor(config[data.nameBg]).setAlpha(0.5).toRgbString();
        config[data.nameRGBA3] = tinycolor(config[data.nameBg]).setAlpha(0.3).toRgbString();

    } else {
        config[data.nameBg] = _shift ? tinycolor(config[data.nameBg]).lighten(5).toString() : tinycolor(config[data.nameBg]).toString();
        config[data.nameBg2] = tinycolor(config[data.nameBg]).lighten(10).toString();
        config[data.nameBg3] = tinycolor(config[data.nameBg]).lighten(15).toString();
        config[data.nameBgHov] = tinycolor(config[data.nameBg]).lighten(3).toString();
        config[data.nameBg2Hov] = tinycolor(config[data.nameBg2]).lighten(3).toString();
        config[data.nameBg3Hov] = tinycolor(config[data.nameBg3]).lighten(3).toString();
        config[data.nameG] = config[data.nameBg];
        config[data.nameRGBA] = tinycolor(config[data.nameBg]).setAlpha(0.7).toRgbString();
        config[data.nameRGBA2] = tinycolor(config[data.nameBg]).setAlpha(0.5).toRgbString();
        config[data.nameRGBA3] = tinycolor(config[data.nameBg]).setAlpha(0.3).toRgbString();
    }

    return config;
}


function getAccent(el, essence, shift) {
    let _shift = shift || false;
    let _el = el;
    let _essence = essence || "accent";
    let config = {};
    let data = verbalData(_essence);
    config[data.nameAccent] = getTxtColor(_el);
    config[data.nameAccent] = _shift ? tinycolor(config[data.nameAccent]).lighten(5).toString() : tinycolor(config[data.nameAccent]).lighten(0).toString();
    config[data.nameAccentTxt] = guessVisibleColor(config[data.nameAccent]);

    return config;
}

function getAccentFromColor(color, essence, shift) {
    let _shift = shift || false;
    let _color = color;
    let _essence = essence || "accent";
    let config = {};
    let data = verbalData(_essence);
    config[data.nameAccent] = _color;
    config[data.nameAccent] = _shift ? tinycolor(config[data.nameAccent]).lighten(5).toString() : tinycolor(config[data.nameAccent]).lighten(0).toString();
    config[data.nameAccentTxt] = guessVisibleColor(config[data.nameAccent]);

    return config;
}

function createMap() {
    let bodyEl = document.querySelector(".tg__subhead");
    let dominantEl = document.querySelector(".tg__left_menu_item.tg--flex.tg--align-center.tg__left_menu_item--lvl1");
    let accentEl = document.querySelector(".tg-ico.tg--ns.tg-clr-akcent2.tg_sidebar_text_akcent");
    let inputEl = document.querySelector(".tg_search_bg");
    let headerEl = document.querySelector(".gameContentTitle.tg_widget_header");
    let subHeaderEl = document.querySelector(".liHeading.tg__home_game_heading.tg_widget_heading");
    let eventEl = document.querySelector(".oneGame.tg__one_game");
    let eventParentEl = document.querySelector(".tg-bg-3.tg_widget_bg.tg--shadow.tg_border_rbl");
    let buttonEl = document.querySelector(".tg__btn.tg__btn-text.tg__btn-ternary.tg-100");
    let oddEl = document.querySelector(".l_od");
    let oddActiveEl = document.querySelector(".l_od.selectedOdd");
    let showMoreEl = document.querySelector(".tg__more.tg__home_game_more.tg--ns");
    let tabEl = document.querySelector(".dg_game_tabs .tab_selector:not(.tab_selector_active)");
    let tabActiveEl = document.querySelector(".dg_game_tabs .tab_selector.tab_selector_active");
    let menu_1El = document.querySelector(".tg__left_menu_item.tg--flex.tg--align-center.tg__left_menu_item--lvl1");
    let menu_2El = document.querySelector(".tg__left_menu_item.tg--flex.tg--align-center.tg__left_menu_item--lvl2");
    let menu_3El = document.querySelector(".tg__left_menu_item.tg--flex.tg--align-center.tg__left_menu_item--lvl3");

    let bodyAccentEl = document.querySelector(".tabSelectorHeading.tg_widget_tab_text");
    let dominantAccentEl = document.querySelector(".tg-ico.tg--ns.tg-clr-akcent2.tg_sidebar_text_akcent");
    let eventAccentEl = document.querySelector(".tg--tar.tg--ns.tg__one_game_score.tg--mar-r-8.tg-clr-akcent2.tg_widget_text_akcent");
    let tabBackground = window.getComputedStyle(tabEl).getPropertyValue('background-color');
    let activeTabBackground = window.getComputedStyle(tabActiveEl).getPropertyValue('background-color');

    let tabsColorsMatch = tabBackground === activeTabBackground;

    let map = {
        ...getBg(bodyEl, "body"),
        ...getBg(dominantEl, "dominant"),
        ...getTxt(accentEl, "accent"),
        ...getBg(inputEl, "input"),
        ...getBg(dominantEl, "inputSecondary", 5),
        ...getBg(headerEl, "header"),
        ...getBg(subHeaderEl, "subHeader"),
        ...getBg(eventEl, "event"),
        ...getBg(buttonEl, "button"),
        ...getBg(dominantEl, "buttonSecondary", 5),
        ...getPalette(prepareNegativeColor(this.accentBg), "modal"),
        ...getBg(oddEl, "odd"),
        ...getBg(oddActiveEl, "oddActive"),
        ...getBg(showMoreEl, "showMore"),
        ...getBg(tabEl, "tab"),
        ...(tabsColorsMatch ? getBg(tabActiveEl, "tabActive", 5) : getBg(tabActiveEl, "tabActive")),
        ...getBg(tabEl, "tabSecondaryActive", 5),
        ...getBg(dominantEl, "filter", 7),
        ...getBg(menu_1El, "menu_1"),
        ...getBg(menu_2El, "menu_2"),
        ...getBg(menu_3El, "menu_3"),
        ...getPalette("#e6e6e6", "tooltip"),

        ...getAccent(bodyAccentEl, "body"),
        ...getAccent(dominantAccentEl, "dominant"),
        ...getAccent(dominantAccentEl, "input"),
        ...getAccent(dominantAccentEl, "inputSecondary"),
        ...getAccent(dominantAccentEl, "header"),
        ...getAccent(dominantAccentEl, "subHeader"),
        ...getAccent(eventAccentEl, "event"),

        oddBorder: getBorderColor(oddEl),
        inputBorder: getBorderColor(inputEl),
        buttonBorder: getBorderColor(buttonEl),
        showMoreBorder: getBorderColor(showMoreEl),

    }

    return map;
}


function prepareNegativeColor(color) {
    let _color = color;
    let _res = {};
    let _saturation = 2;
    let _valueDark = 20;
    let _valueLight = 80;
    let hsl = tinycolor(_color).toHslString();
    let HSL = tinycolor(_color).getObjectFromString(hsl);
    let isLight = tinycolor(_color).isLight();
    let light = tinycolor(`hsv(${HSL.h}, ${_saturation}%, ${_valueLight}%)`).toHexString();
    let dark = tinycolor(`hsv(${HSL.h}, ${_saturation}%, ${_valueDark}%)`).toHexString();

    return isLight ? dark : light;

}


function createPartnerMap(config) {
    let _config = config;

    let _str = {
        /*body*/
        bodyBg: _config.bodyBg,
        bodyBg2: _config.bodyBg2,
        bodyBg3: _config.bodyBg3,
        bodyBgHover: _config.bodyBgHover,
        bodyBg2Hover: _config.bodyBg2Hover,
        bodyBg3Hover: _config.bodyBg3Hover,
        bodyTxt: _config.bodyTxt,
        bodyTxt2: _config.bodyTxt2,
        bodyTxt3: _config.bodyTxt3,
        bodyAccent: _config.bodyAccent,
        bodyAccentTxt: _config.bodyAccentTxt,
        bodyBorder: _config.bodyBgHover,
        bodyG: _config.bodyG,
        bodyRGBA: _config.bodyRGBA,
        bodyRGBA2: _config.bodyRGBA2,
        bodyRGBA3: _config.bodyRGBA3,


        /*dominant*/
        dominantBg: _config.dominantBg,
        dominantBg2: _config.dominantBg2,
        dominantBg3: _config.dominantBg3,
        dominantBgHover: _config.dominantBgHover,
        dominantBg2Hover: _config.dominantBg2Hover,
        dominantBg3Hover: _config.dominantBg3Hover,
        dominantTxt: _config.dominantTxt,
        dominantTxt2: _config.dominantTxt2,
        dominantTxt3: _config.dominantTxt3,
        dominantTxtInverse: tinycolor(_config.dominantTxt).isLight() ? "#262626" : "#fff",
        dominantAccent: _config.dominantAccent,
        dominantAccentTxt: _config.dominantAccentTxt,
        dominantBorder: _config.dominantBgHover,
        dominantG: _config.dominantG,
        dominantRGBA: _config.dominantRGBA,
        dominantRGBA2: _config.dominantRGBA2,
        dominantRGBA3: _config.dominantRGBA3,

        /*accent*/
        accentBg: _config.accentBg,
        accentBg2: _config.accentBg2,
        accentBg3: _config.accentBg3,
        accentBgHover: _config.accentBgHover,
        accentBg2Hover: _config.accentBg2Hover,
        accentBg3Hover: _config.accentBg3Hover,
        accentTxt: _config.accentTxt,
        accentTxt2: _config.accentTxt2,
        accentTxt3: _config.accentTxt3,
        accentBorder: _config.accentBgHover,
        accentG: _config.accentG,

        /*input*/
        inputBg: _config.inputBg,
        inputBg2: _config.inputBg2,
        inputBg3: _config.inputBg3,
        inputBgHover: _config.inputBgHover,
        inputBg2Hover: _config.inputBg2Hover,
        inputBg3Hover: _config.inputBg3Hover,
        inputTxt: _config.inputTxt,
        inputTxt2: _config.inputTxt2,
        inputTxt3: _config.inputTxt3,
        inputAccent: _config.inputAccent,
        inputAccentTxt: _config.inputAccentTxt,
        inputBorder: _config.inputBorder ? _config.inputBorder : _config.inputBgHover,
        inputG: _config.inputG,

        /*input secondary*/
        inputSecondaryBg: _config.inputSecondaryBg,
        inputSecondaryBg2: _config.inputSecondaryBg2,
        inputSecondaryBg3: _config.inputSecondaryBg3,
        inputSecondaryBgHover: _config.inputSecondaryBgHover,
        inputSecondaryBg2Hover: _config.inputSecondaryBg2Hover,
        inputSecondaryBg3Hover: _config.inputSecondaryBg3Hover,
        inputSecondaryTxt: _config.inputSecondaryTxt,
        inputSecondaryTxt2: _config.inputSecondaryTxt2,
        inputSecondaryTxt3: _config.inputSecondaryTxt3,
        inputSecondaryAccent: _config.inputSecondaryAccent,
        inputSecondaryAccentTxt: _config.inputSecondaryAccentTxt,
        dominantBorder: _config.dominantBgHover,
        inputSecondaryG: _config.inputSecondaryG,

        /*header*/
        headerBg: _config.headerBg,
        headerBg2: _config.headerBg2,
        headerBg3: _config.headerBg3,
        headerBgHover: _config.headerBgHover,
        headerBg2Hover: _config.headerBg2Hover,
        headerBg3Hover: _config.headerBg3Hover,
        headerTxt: _config.headerTxt,
        headerTxt2: _config.headerTxt2,
        headerTxt3: _config.headerTxt3,
        headerAccent: _config.headerAccent,
        headerAccentTxt: _config.headerAccentTxt,
        headerBorder: _config.headerBgHover,
        headerG: _config.headerG,

        /*subHeader*/
        subHeaderBg: _config.subHeaderBg,
        subHeaderBg2: _config.subHeaderBg2,
        subHeaderBg3: _config.subHeaderBg3,
        subHeaderBgHover: _config.subHeaderBgHover,
        subHeaderBg2Hover: _config.subHeaderBg2Hover,
        subHeaderBg3Hover: _config.subHeaderBg3Hover,
        subHeaderTxt: _config.subHeaderTxt,
        subHeaderTxt2: _config.subHeaderTxt2,
        subHeaderTxt3: _config.subHeaderTxt3,
        subHeaderAccent: _config.subHeaderAccent,
        subHeaderAccentTxt: _config.subHeaderAccentTxt,
        subHeaderBorder: _config.subHeaderBgHover,
        subHeaderG: _config.subHeaderG,

        /*event*/
        eventBg: _config.eventBg,
        eventBg2: _config.eventBg2,
        eventBg3: _config.eventBg3,
        eventBgHover: _config.eventBgHover,
        eventBg2Hover: _config.eventBg2Hover,
        eventBg3Hover: _config.eventBg3Hover,
        eventTxt: _config.eventTxt,
        eventTxt2: _config.eventTxt2,
        eventTxt3: _config.eventTxt3,
        eventAccent: _config.eventAccent,
        eventAccentTxt: _config.eventAccentTxt,
        eventBorder: _config.eventBgHover,
        eventG: _config.eventG,

        /*button*/
        buttonBg: _config.buttonBg,
        buttonBg2: _config.buttonBg2,
        buttonBg3: _config.buttonBg3,
        buttonBgHover: _config.buttonBgHover,
        buttonBg2Hover: _config.buttonBg2Hover,
        buttonBg3Hover: _config.buttonBg3Hover,
        buttonTxt: _config.buttonTxt,
        buttonTxt2: _config.buttonTxt2,
        buttonTxt3: _config.buttonTxt3,
        buttonAccent: _config.accentBg2,
        buttonAccentTxt: _config.accentTxt,
        buttonBorder: _config.buttonBorder ? _config.buttonBorder : _config.buttonBgHover,
        buttonG: _config.buttonG,

        /*button secondary*/
        buttonSecondaryBg: _config.buttonSecondaryBg,
        buttonSecondaryBg2: _config.buttonSecondaryBg2,
        buttonSecondaryBg3: _config.buttonSecondaryBg3,
        buttonSecondaryBgHover: _config.buttonSecondaryBgHover,
        buttonSecondaryBg2Hover: _config.buttonSecondaryBg2Hover,
        buttonSecondaryBg3Hover: _config.buttonSecondaryBg3Hover,
        buttonSecondaryTxt: _config.buttonSecondaryTxt,
        buttonSecondaryTxt2: _config.buttonSecondaryTxt2,
        buttonSecondaryTxt3: _config.buttonSecondaryTxt3,
        buttonSecondaryAccent: _config.accentBg2,
        buttonSecondaryAccentTxt: _config.accentTxt,
        buttonSecondaryBorder: _config.buttonSecondaryBgHover,
        buttonSecondaryG: _config.buttonSecondaryG,

        /*modal*/
        modalBg: _config.modalBg,
        modalBg2: _config.modalBg2,
        modalBg3: _config.modalBg3,
        modalBgHover: _config.modalBgHover,
        modalBg2Hover: _config.modalBg2Hover,
        modalBg3Hover: _config.modalBg3Hover,
        modalTxt: _config.modalTxt,
        modalTxt2: _config.modalTxt2,
        modalTxt3: _config.modalTxt3,
        modalAccent: _config.accentBg,
        modalAccentTxt: _config.accentTxt,
        modalBorder: _config.modalBgHover,
        modalG: _config.modalG,

        /*odd*/
        oddBg: _config.oddBg,
        oddBg2: _config.oddBg2,
        oddBg3: _config.oddBg3,
        oddBgHover: _config.oddBgHover,
        oddBg2Hover: _config.oddBg2Hover,
        oddBg3Hover: _config.oddBg3Hover,
        oddTxt: _config.oddTxt,
        oddTxt2: _config.oddTxt2,
        oddTxt3: _config.oddTxt3,
        oddAccent: _config.accentBg,
        oddAccentTxt: _config.accentTxt,
        oddBorder: _config.oddBorder ? _config.oddBorder : _config.oddBg,
        oddG: _config.oddG,

        /*odd active*/
        oddActiveBg: _config.oddActiveBg,
        oddActiveBg2: _config.oddActiveBg2,
        oddActiveBg3: _config.oddActiveBg3,
        oddActiveBgHover: _config.oddActiveBgHover,
        oddActiveBg2Hover: _config.oddActiveBg2Hover,
        oddActiveBg3Hover: _config.oddActiveBg3Hover,
        oddActiveTxt: _config.oddActiveTxt,
        oddActiveTxt2: _config.oddActiveTxt2,
        oddActiveTxt3: _config.oddActiveTxt3,
        oddActiveBorder: _config.oddActiveBorder ? _config.oddActiveBorder : _config.oddActiveBg,
        oddActiveG: _config.oddActiveG,

        /*show more*/
        showMoreBg: _config.showMoreBg,
        showMoreBg2: _config.showMoreBg2,
        showMoreBg3: _config.showMoreBg3,
        showMoreBgHover: _config.showMoreBgHover,
        showMoreBg2Hover: _config.showMoreBg2Hover,
        showMoreBg3Hover: _config.showMoreBg3Hover,
        showMoreTxt: _config.showMoreTxt,
        showMoreTxt2: _config.showMoreTxt2,
        showMoreTxt3: _config.showMoreTxt3,
        showMoreAccent: _config.accentBg,
        showMoreAccentTxt: _config.accentTxt,
        showMoreBorder: _config.showMoreBorder ? _config.showMoreBorder : _config.showMoreBg,
        showMoreG: _config.showMoreG,

        /*tab*/
        tabBg: _config.tabBg,
        tabBg2: _config.tabBg2,
        tabBg3: _config.tabBg3,
        tabBgHover: _config.tabBgHover,
        tabBg2Hover: _config.tabBg2Hover,
        tabBg3Hover: _config.tabBg3Hover,
        tabTxt: _config.tabTxt,
        tabTxt2: _config.tabTxt2,
        tabTxt3: _config.tabTxt3,
        tabAccent: _config.accentBg,
        tabAccentTxt: _config.accentTxt,
        tabBorder: _config.tabBgHover,
        tabG: _config.tabG,

        /*tab active*/
        tabActiveBg: _config.tabActiveBg,
        tabActiveBg2: _config.tabActiveBg2,
        tabActiveBg3: _config.tabActiveBg3,
        tabActiveBgHover: _config.tabActiveBgHover,
        tabActiveBg2Hover: _config.tabActiveBg2Hover,
        tabActiveBg3Hover: _config.tabActiveBg3Hover,
        tabActiveTxt: _config.tabActiveTxt,
        tabActiveTxt2: _config.tabActiveTxt2,
        tabActiveTxt3: _config.tabActiveTxt3,
        tabActiveAccent: _config.accentBg,
        tabActiveAccentTxt: _config.accentTxt,
        tabActiveBorder: _config.tabActiveBgHover,
        tabActiveG: _config.tabActiveG,

        /*secondary tab active*/
        tabSecondaryActiveBg: _config.tabSecondaryActiveBg,
        tabSecondaryActiveBg2: _config.tabSecondaryActiveBg2,
        tabSecondaryActiveBg3: _config.tabSecondaryActiveBg3,
        tabSecondaryActiveBgHover: _config.tabSecondaryActiveBgHover,
        tabSecondaryActiveBg2Hover: _config.tabSecondaryActiveBg2Hover,
        tabSecondaryActiveBg3Hover: _config.tabSecondaryActiveBg3Hover,
        tabSecondaryActiveTxt: _config.tabSecondaryActiveTxt,
        tabSecondaryActiveTxt2: _config.tabSecondaryActiveTxt2,
        tabSecondaryActiveTxt3: _config.tabSecondaryActiveTxt3,
        tabSecondaryAccent: _config.accentBg,
        tabSecondaryAccentTxt: _config.accentTxt,
        tabSecondaryBorder: _config.tabSecondaryBgHover,
        tabSecondaryActiveG: _config.tabSecondaryActiveG,

        /*filter*/
        filterBg: _config.filterBg,
        filterBg2: _config.filterBg2,
        filterBg3: _config.filterBg3,
        filterBgHover: _config.filterBgHover,
        filterBg2Hover: _config.filterBg2Hover,
        filterBg3Hover: _config.filterBg3Hover,
        filterTxt: _config.filterTxt,
        filterTxt2: _config.filterTxt2,
        filterTxt3: _config.filterTxt3,
        filterAccent: _config.accentBg,
        filterAccentTxt: _config.accentTxt,
        filterBorder: _config.filterBgHover,
        filterG: _config.filterG,

        /*menu 1*/
        menu_1Bg: _config.menu_1Bg,
        menu_1Bg2: _config.menu_1Bg2,
        menu_1Bg3: _config.menu_1Bg3,
        menu_1BgHover: _config.menu_1BgHover,
        menu_1Bg2Hover: _config.menu_1Bg2Hover,
        menu_1Bg3Hover: _config.menu_1Bg3Hover,
        menu_1Txt: _config.menu_1Txt,
        menu_1Txt2: _config.menu_1Txt2,
        menu_1Txt3: _config.menu_1Txt3,
        menu_1Accent: _config.accentBg,
        menu_1AccentTxt: _config.accentTxt,
        menu_1Border: _config.menu_1BgHover,
        menu_1G: _config.menu_1G,

        /*menu 2*/
        menu_2Bg: _config.menu_2Bg,
        menu_2Bg2: _config.menu_2Bg2,
        menu_2Bg3: _config.menu_2Bg3,
        menu_2BgHover: _config.menu_2BgHover,
        menu_2Bg2Hover: _config.menu_2Bg2Hover,
        menu_2Bg3Hover: _config.menu_2Bg3Hover,
        menu_2Txt: _config.menu_2Txt,
        menu_2Txt2: _config.menu_2Txt2,
        menu_2Txt3: _config.menu_2Txt3,
        menu_2Accent: _config.accentBg,
        menu_2AccentTxt: _config.accentTxt,
        menu_2Border: _config.menu_2BgHover,
        menu_2G: _config.menu_2G,

        /*menu 3*/
        menu_3Bg: _config.menu_3Bg,
        menu_3Bg2: _config.menu_3Bg2,
        menu_3Bg3: _config.menu_3Bg3,
        menu_3BgHover: _config.menu_3BgHover,
        menu_3Bg2Hover: _config.menu_3Bg2Hover,
        menu_3Bg3Hover: _config.menu_3Bg3Hover,
        menu_3Txt: _config.menu_3Txt,
        menu_3Txt2: _config.menu_3Txt2,
        menu_3Txt3: _config.menu_3Txt3,
        menu_3Accent: _config.accentBg,
        menu_3AccentTxt: _config.accentTxt,
        menu_3Border: _config.menu_3BgHover,
        menu_3G: _config.menu_3G,

        /*tooltip*/
        tooltipBg: _config.tooltipBg,
        tooltipBg2: _config.tooltipBg2,
        tooltipBg3: _config.tooltipBg3,
        tooltipBgHover: _config.tooltipBgHover,
        tooltipBg2Hover: _config.tooltipBg2Hover,
        tooltipBg3Hover: _config.tooltipBg3Hover,
        tooltipTxt: _config.tooltipTxt,
        tooltipTxt2: _config.tooltipTxt2,
        tooltipTxt3: _config.tooltipTxt3,
        tooltipAccent: _config.accentBg,
        tooltipAccentTxt: _config.accentTxt,
        tooltipBorder: _config.tooltipBgHover,
        tooltipG: _config.tooltipG,

    }

    return _str;
}


function createCssTxt(map) {
    let rootCssTxt = `:root {\n`;
    for (let key in map) {
        rootCssTxt += `--${key}:${map[key]};\n`;
    }
    rootCssTxt += `}`;

    return rootCssTxt;

}

let partnersIdArray = [1, 100, 105, 107, 109, 11, 110, 113, 114, 117, 118, 119, 120, 121, 122, 125, 126, 127, 128, 130, 131, 132, 134, 136, 137, 139, 14, 143, 144, 145, 146, 147, 148, 157, 163, 164, 165, 166, 167, 169, 170, 173, 179, 181, 182, 183, 185, 188, 189, 190, 191, 193, 197, 198, 200, 201, 205, 206, 209, 210, 211, 212, 213, 215, 217, 221, 222, 225, 226, 227, 228, 23, 230, 231, 233, 234, 235, 236, 237, 238, 240, 243, 245, 247, 248, 249, 250, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 264, 265, 266, 267, 268, 269, 271, 272, 273, 277, 279, 280, 281, 282, 283, 284, 285, 286, 29, 290, 291, 294, 295, 297, 299, 300, 301, 302, 303, 304, 305, 307, 308, 309, 310, 311, 312, 313, 314, 316, 317, 318, 319, 321, 322, 323, 324, 325, 326, 327, 328, 329, 331, 332, 333, 334, 335, 336, 337, 340, 341, 342, 343, 344, 346, 350, 355, 357, 358, 359, 360, 362, 369, 384, 385, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 40, 400, 401, 402, 403, 404, 407, 409, 41, 410, 412, 413, 414, 415, 416, 418, 419, 421, 422, 424, 425, 427, 428, 429, 43, 430, 433, 434, 435, 436, 439, 441, 444, 446, 449, 45, 451, 452, 455, 456, 457, 458, 46, 461, 464, 53, 54, 62, 63, 64, 65, 69, 71, 72, 76, 77, 79, 80, 81, 83, 89, 9, 90, 94, 95, 97, 98, 99]

// let partnersIdArray = [233];

// let partnersIdArray = [1, 11, 14, 69, 98, 107, 233, 341];

let sportMap = [];

function createTheme(id) {
    let map = createMap();
    let partnerMap = createPartnerMap(map);
    // let css = createCssTxt(partnerMap);
    partnerMap.id = id;
    if (tinycolor(partnerMap.bodyBg).isLight() && tinycolor(partnerMap.dominantBg).isLight() && tinycolor(partnerMap.eventBg).isLight()) {
        partnerMap.theme = 'light';
    } else {
        partnerMap.theme = 'dark';
    }
    sportMap.push(partnerMap);
    console.log(`partner style ${id} taken`);
    return partnerMap;
}

function attachPartnerStyle(id) {
    let partnerStyle = document.getElementById('partnerStyleCssLink');
    let href = `/Partners/${id}/Styles/web.css`;
    partnerStyle.setAttribute('href', href);
    console.log(`partner style ${id} attached`);
}

/*prepare european view*/
async function prepareEuropeanView() {
    let sideItem = document.querySelectorAll('.tg__left_menu_item.tg--flex.tg--align-center.tg__left_menu_item--lvl1.tg--pad-16.tg--cp.tg_widget_row.tg_sidebar_bg')
    let index = Math.floor(sideItem.length / 2);
    sideItem[index].click();

    let odds = document.querySelectorAll('#top_ten .l_od')
    let oddIndex = Math.floor(odds.length / 2);
    odds[oddIndex].click();

    let sideItem2 = await waitFor(sideItem[index].parentElement, '.tg__left_menu_item.tg__left_menu_item--lvl2');
    sideItem2.click()


}

function waitFor(element, selector) {
    return new Promise((resolve, reject) => {
        let count = 0;
        (function x() {
            const y = element.querySelector(selector);
            if (y) return resolve(y);
            else setTimeout(x);
        })();
    })
}

await prepareEuropeanView();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let delayMs = 600;

window.addEventListener('keypress', (e) => {
    if (e.code === "KeyA") {
        // make();
        (async function loop() {
            for (let i = 0; i < partnersIdArray.length; i++) {
                await delay(delayMs);
                attachPartnerStyle(partnersIdArray[i]);
                
                await delay(delayMs);
                createTheme(partnersIdArray[i]);
            }
        })();
    }
})

// window.addEventListener('keypress', (e) => {
//     if (e.code === "KeyQ") {
//         createTheme(11);
//     }
// })

function createOneConfig(config) {
    let _config = config;
    let map = {
        ...getPalette(_config.body, "body"),
        ...getPalette(_config.dominant, "dominant"),
        ...getPalette(_config.accent, "accent"),
        ...getPalette(_config.input, "input"),
        ...getPalette(_config.inputSecondary, "inputSecondary"),
        ...getPalette(_config.header, "header"),
        ...getPalette(_config.subHeader, "subHeader"),
        ...getPalette(_config.event, "event"),
        ...getPalette(_config.button, "button"),
        ...getPalette(_config.dominant, "buttonSecondary", true),
        ...getPalette(_config.modal, "modal"),
        ...getPalette(_config.odd, "odd"),
        ...getPalette(_config.oddActive, "oddActive"),
        ...getPalette(_config.showMore, "showMore"),
        ...getPalette(_config.tab, "tab"),
        ...getPalette(_config.tabActive, "tabActive"),
        ...getPalette(_config.tab, "tabSecondaryActive", true),
        ...getPalette(_config.dominant, "filter", true),
        ...getPalette(_config.menu_1, "menu_1"),
        ...getPalette(_config.menu_2, "menu_2"),
        ...getPalette(_config.menu_3, "menu_3"),
        ...getPalette("#e6e6e6", "tooltip"),

        ...getAccentFromColor(_config.bodyAccent, "body"),
        ...getAccentFromColor(_config.dominantAccent, "dominant"),
        ...getAccentFromColor(_config.dominantAccent, "input", true),
        ...getAccentFromColor(_config.dominantAccent, "inputSecondary", true),
        ...getAccentFromColor(_config.dominantAccent, "header", true),
        ...getAccentFromColor(_config.dominantAccent, "subHeader", true),
        ...getAccentFromColor(_config.eventAccent, "event"),

        oddBorder: _config.oddBorder,
        inputBorder: _config.inputBorder,
        buttonBorder: _config.buttonBorder,
        showMoreBorder: _config.showMoreBorder,
    }

    return map;
}


function createOnePartnerMap(config) {
    let map = createOneConfig(config);
    let partnerMap = createPartnerMap(map);
    partnerMap.id = config.id;
    if (tinycolor(partnerMap.bodyBg).isLight() && tinycolor(partnerMap.dominantBg).isLight() && tinycolor(partnerMap.eventBg).isLight()) {
        partnerMap.theme = 'light';
    } else {
        partnerMap.theme = 'dark';
    }
    console.log(partnerMap);
    return partnerMap;
}
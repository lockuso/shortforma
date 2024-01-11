// ==UserScript==
// @name         Shortforma
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Expands all the shortform and longform numbers in swarmsim.
// @author       lockuso
// @match        https://www.swarmsim.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=swarmsim.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /*
    Ng - nonagintillion (10 ^ 273)
    Ce - centillion (10 ^ 303)
    DcCe - decicentillion (10 ^ 333)
    UViCe - unviginticentillion(10 ^ 363)
    Du - Ducentillion (10 ^ 603)
    Tu - Trucentillion (10 ^ 903)
    Qu - Quadringentillion (10 ^ 1203)
    Qg - Quingentillion (10 ^ 1503)
    Ss - Sescentillion (10 ^ 1803)
    Sn - Septingentillion (10 ^ 2103)
    Ot - Octingentillion (10 ^ 2403)
    Nn - Nongentillion (10 ^ 2703)
    Mi - Millinillion (10 ^ 3003)
    QaNgDuMi - Milliaquattournonagintiducentillion (10^3885)
    */

    var originalShort = numberformat.Formats.standard.suffixGroups.short;
    var originalLong = numberformat.Formats.standard.suffixGroups.full;

    const hl = [
        {
            "full":" centillion",
            "modular":"cen"
        },

        {
            "full":" ducentillion",
            "modular":" ducen"
        },

        {
            "full":" trucentillion",
            "modular":" trucen"
        },

        {
            "full":" quadringentillion",
            "modular":" quadringen"
        },

        {
            "full":" quingentillion",
            "modular":" quingen"
        },

        {
            "full":" sescentillion",
            "modular":" sescen"
        },

        {
            "full":" septingentillion",
            "modular":" septingen"
        },

        {
            "full":" octingentillion",
            "modular":" octinngen"
        },

        {
            "full":" nongentillion",
            "modular":" nongen"
        }
    ]; // hundreds list

    const ml = [
        {
            "full":" milliatillion",
            "modular":"millia"
        },

        {
            "full":" duomilliatillion",
            "modular":"duomillia"
        },

        {
            "full":" tremilliatillion",
            "modular":"tremillia"
        },

        {
            "full":" quadrillillion",
            "modular":"quadrillia"
        },

        {
            "full":" quintilliillion",
            "modular":"quintillia"
        },

        {
            "full":" sextillillion",
            "modular":"sextillia"
        },

        {
            "full":" septillillion",
            "modular":"septillia"
        },

        {
            "full":" octillillion",
            "modular":"octillia"
        },

        {
            "full":" nonillillion",
            "modular":"nonillia"
        },

        {
            "full":" decillillion",
            "modular": "decillia"
        }
    ] // milliatillions

    const h0t10 = [
        "",
        "U",
        "D",
        "T",
        "Qa",
        "Qi",
        "Sx",
        "Sp",
        "Oc",
        "No"
    ]; // suffixes for zero to ten for milliatillions and centillions

    const fh0t99 = [
        "",
        "untillion",
        "dotillion",
        "tretillion",
        "quattourtillion",
        "quintillion",
        "sextillion",
        "septillion",
        "octillion",
        "nonillion",
        "decillion",
        "undecillion",
        "duodecillion",
        "tredecillion",
        "quattuordecillion",
        "quinquadecillion",
        "sedecillion",
        "septendecillion",
        "octodecillion",
        "novendecillion",
        "vigintillion",
        "unvigintillion",
        "duovigintillion",
        "tresvigintillion",
        "quattuorvigintillion",
        "quinquavigintillion",
        "sesvigintillion",
        "septemvigintillion",
        "octovigintillion",
        "novemvigintillion",
        "trigintillion",
        "untrigintillion",
        "duotrigintillion",
        "trestrigintillion",
        "quattuortrigintillion",
        "quinquatrigintillion",
        "sestrigintillion",
        "septentrigintillion",
        "octotrigintillion",
        "noventrigintillion",
        "quadragintillion",
        "unquadragintillion",
        "duoquadragintillion",
        "tresquadragintillion",
        "quattuorquadragintillion",
        "quinquaquadragintillion",
        "sesquadragintillion",
        "septenquadragintillion",
        "octoquadragintillion",
        "novenquadragintillion",
        "quinquagintillion",
        "unquinquagintillion",
        "duoquinquagintillion",
        "tresquinquagintillion",
        "quattuorquinquagintillion",
        "quinquaquinquagintillion",
        "sesquinquagintillion",
        "septenquinquagintillion",
        "octoquinquagintillion",
        "novenquinquagintillion",
        "sexagintillion",
        "unsexagintillion",
        "duosexagintillion",
        "tresexagintillion",
        "quattuorsexagintillion",
        "quinquasexagintillion",
        "sesexagintillion",
        "septensexagintillion",
        "octosexagintillion",
        "novensexagintillion",
        "septuagintillion",
        "unseptuagintillion",
        "duoseptuagintillion",
        "treseptuagintillion",
        "quattuorseptuagintillion",
        "quinquaseptuagintillion",
        "seseptuagintillion",
        "septenseptuagintillion",
        "octoseptuagintillion",
        "novenseptuagintillion",
        "octogintillion",
        "unoctogintillion",
        "duooctogintillion",
        "treoctogintillion",
        "quattouroctogintillion",
        "quinoctogintillion",
        "seoctogintillion",
        "septenoctogintillion",
        "octooctogintillion",
        "novenoctogintillion",
        "nonagintillion",
        "unononagintillion",
        "duononagintillion",
        "trenonagintillion",
        "quattournonagintillion",
        "quinquanonagintillion",
        "senonagintillion",
        "septenonagintillion",
        "octononagintillion",
        "novenonagintillion",
    ] // full suffixes for zero to 99 for milliatillions and centillions

    var extraShortSuffixes = [
        "Ng", "UNg", "DNg", "TNg", "QaNg", "QiNg", "SxNg", "SpNg", "ONg", "NNg", // nonagintillions
    ];

    var extraLongSuffixes = [
        // complete 80s

        " treoctogintillion",
        " quattouroctogintillion",
        " quinoctogintillion",
        " seoctogintillion",
        " septenoctogintillion",
        " octooctogintillion",
        " novenoctogintillion",

        // finish 80s
        // start 90s

        " nonagintillion",
        " unononagintillion",
        " duononagintillion",
        " trenonagintillion",
        " quattournonagintillion",
        " quinquanonagintillion",
        " senonagintillion",
        " septenonagintillion",
        " octononagintillion",
        " novenonagintillion",

        //  finish 90-99
    ];

    function a10t99(arr, hundreds) { // adds all the suffixes from 110 to 199
        var new_arr = []

        for (var i = 0; i < 10; i++) {
            new_arr.push(hundreds + h0t10[i]);
        }

        for (i = 11; i < 101; i++) {
            if (i <= 90) {
                new_arr.push(hundreds + originalShort[i]);
            } else {
                new_arr.push(hundreds + extraShortSuffixes[i - 91]);
            }
        }

        return arr.concat(new_arr);
    };

    function a100t999(arr, hundreds_arr) {
        var new_arr = arr;

        hundreds_arr.forEach((element) => {
            new_arr = a10t99(new_arr, element);
        });

        return arr.concat(new_arr);
    }

    function alfh(arr, hundreds_arr) {
        var new_arr = [];

        hundreds_arr.forEach((element) => {
            for (var i = 0; i < 100; i++) {
                if(fh0t99[i] == "") {
                    new_arr.push(element.full);
                } else {
                    new_arr.push(" " + element.modular + fh0t99[i]);
                }
            }
        });

        return arr.concat(new_arr);
    }

    function alfm(arr, mill_arr) {
        var new_arr = [];

        mill_arr.forEach((element) => {
            new_arr = alfh(new_arr, [element]);

            for (var i = 100; i < 1000; i++) {
                new_arr.push(" " + element.modular + arr[i].slice(1));
            }
        });

        return arr.concat(new_arr);
    }

    function a1kp(arr, milPrefixes) {
        // Adds nomenclature for milliatillion family. Arr. is an array of fully initialized 1-999 array

        // These should have the milliatillion term first.
        // Example numbers

        /*
        MaU - milliauntillion
        MaD - milliadotillion
        MaT - milliatretillion
        MaQ - milliaquattourtillion
        MaQi - milliaquintillion
        MaSx - milliasextillion
        MaSp - milliaseptillion
        MaOc - milliaoctillion
        MaNo - millianonillion

        Dm - duomillinillion
        Tm - tremillinillion
        Qr - quadrillillion
        Ql - quintillillion
        Sl - sextillillion
        Si - septillillion
        Ol - octillillion
        Nl - nonillillion
        Dl - decillillion (10 ^ 33003)

        10 TmTuDTg - 1e+10000
        */

        var new_arr = arr;

        milPrefixes.forEach((element) => {
            for (var i = 0; i < 10; i++) {
                new_arr.push(element + h0t10[i]); // MaU, etc
            }

            for (i = 11; i < 101; i++) {
                if (i <= 90) {
                    new_arr.push(element + originalShort[i]);
                } else {
                    new_arr.push(element + extraShortSuffixes[i - 91]);
                }
            }

            for (i = 101; i < 1001; i++) {
                new_arr.push(element + new_arr[i]); // MaCe
            }
        });

        return new_arr;
    }

    extraShortSuffixes = originalShort.concat(a100t999(extraShortSuffixes, [
        "Ce",
        "Du",
        "Tu",
        "Qu",
        "Qg",
        "Ss",
        "Sn",
        "Ot",
        "Nn"
    ]));

    extraLongSuffixes = alfh(originalLong.concat(extraLongSuffixes), hl);
    extraLongSuffixes = alfm(extraLongSuffixes, ml);

    extraShortSuffixes.splice(101, 10);

    extraShortSuffixes = a1kp(extraShortSuffixes, ["Ma", "Dm", "Tm", "Qr", "Ql", "Sl", "Si", "Ol", "Nl", "Dl"]);

    // Your code here...

    var appendSuffixes = function(short, long) {
        numberformat.Formats.standard.suffixGroups.short = short;
        numberformat.Formats.standard.suffixGroups.full = long;
    }

    window.setupPlugin = function() {
        appendSuffixes(extraShortSuffixes, extraLongSuffixes);

        angular.module("swarmApp").constant("numberSuffixesShort", numberformat.Formats.standard.suffixGroups.short);
        angular.module("swarmApp").constant("numberSuffixesLong", numberformat.Formats.standard.suffixGroups.full);

        console.log("Finished appending new suffixes to old ones");
    }

    while (true) {
        try {
            setupPlugin();
            break;
        } catch {
            ;
        }
    }
})();
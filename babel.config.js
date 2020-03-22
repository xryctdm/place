const presets = [
    [
    "@babel/env", {
        targets: {
            firefox: "60",
            chrome: "64",
            safari: "11.1",
            },
        },
    ],
];
module.exports = {presets};